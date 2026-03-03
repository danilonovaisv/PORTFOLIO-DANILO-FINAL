import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

/**
 * Reorganiza assets versionados (v2/...) em uma nova árvore (v3/<marca>/<projeto>/...),
 * mantendo o filename com hash.
 *
 * - NÃO deleta v2 (seguro para cutover gradual)
 * - Faz copy server-side (sem download/upload)
 * - Gera asset-map-v3.json com oldPath -> v3Path
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

const FROM_PREFIX = process.env.FROM_PREFIX || 'v2';
const TO_PREFIX = process.env.TO_PREFIX || 'v3';

// Pode limitar a quais buckets aplicar. Eu recomendo reorganizar apenas portfolio-media.
// site-assets normalmente é “site structure”, não “marca/projeto”.
const BUCKETS = ['portfolio-media']; // se quiser incluir: ['portfolio-media', 'site-assets']

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Faltam SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY no .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Corrigido: lê asset-map.json da mesma pasta
const assetMapPath = path.join(__dirname, 'asset-map.json');
if (!fs.existsSync(assetMapPath)) {
  console.error(`Não encontrei asset-map.json em: ${assetMapPath}`);
  process.exit(1);
}

const map = JSON.parse(fs.readFileSync(assetMapPath, 'utf-8'));

/** Normaliza string para slug seguro em path */
function slug(input) {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // espaços -> hífen
    .replace(/_+/g, '-') // _ -> -
    .replace(/[^a-z0-9-]/g, '-') // remove chars estranhos (inclui acentos virando '-')
    .replace(/-+/g, '-') // colapsa ---
    .replace(/^-|-$/g, ''); // trim de -
}

/**
 * Inferência de marca/projeto usando o oldPath.
 *
 * Casos suportados:
 * 1) "<marca>/projects/<projeto>/..."  -> marca=<marca>, projeto=<projeto>
 * 2) "projects/<projeto>/..."          -> marca via tabela projectToBrand, projeto=<projeto>
 *
 * >>>>>> EDITE projectToBrand para seu gosto. <<<<<<
 */
function inferBrandProject(oldPath) {
  const parts = oldPath.split('/');

  // Caso 1: "<marca>/projects/<projeto>/..."
  if (parts.length >= 3 && parts[1] === 'projects') {
    return { brand: slug(parts[0]), project: slug(parts[2]) };
  }

  // Caso 2: "projects/<projeto>/..."
  if (parts[0] === 'projects' && parts.length >= 2) {
    const projectRaw = parts[1];

    // >>>>>> AJUSTE AQUI <<<<<<
    // Se você quiser que tudo que é "projects/*" vire marca "danilo", deixe como está.
    // Se quiser atribuir por marca específica, ajuste os valores.
    const projectToBrand = {
      brand_video: 'glad', // por causa de "VIDEOMANIFESTOGLAD" no seu set
      advertising_video: 'danilo',
      'AI video': 'danilo',
      'brand-campaigns': 'danilo',
      campaign: 'danilo',
      animation: 'danilo',
      'creative-direction': 'danilo',
      'key-vision': 'danilo',
      key_vision: 'danilo',
      'key-visual': 'danilo',
      'print-design': 'danilo',
      rebranding: 'danilo',
      video: 'danilo',
      video_manifesto: 'danilo',
    };

    const brand = projectToBrand[projectRaw] ?? 'danilo';
    return { brand: slug(brand), project: slug(projectRaw) };
  }

  // fallback
  return { brand: 'danilo', project: 'misc' };
}

/**
 * Calcula o "tail" (subpastas) depois do projeto, para preservar gallery/, cover/, etc.
 * Mantém filename hash do v2.
 */
function buildV3Path(oldPath, v2DestPath) {
  const { brand, project } = inferBrandProject(oldPath);

  const oldParts = oldPath.split('/');

  let tailParts = [];
  // "projects/<proj>/..."
  if (oldParts[0] === 'projects') {
    tailParts = oldParts.slice(2); // remove 'projects', '<proj>'
  }
  // "<brand>/projects/<proj>/..."
  else if (oldParts.length >= 4 && oldParts[1] === 'projects') {
    tailParts = oldParts.slice(3); // remove '<brand>', 'projects', '<proj>'
  } else {
    // fallback: remove primeiro segmento
    tailParts = oldParts.slice(1);
  }

  const v2FileNameWithHash = path.posix.basename(v2DestPath); // mantém hash no nome
  const tailDir =
    tailParts.length > 1 ? tailParts.slice(0, -1).map(slug).join('/') : '';

  return path.posix.join(
    TO_PREFIX,
    brand,
    project,
    tailDir,
    v2FileNameWithHash
  );
}

function isAlreadyExistsError(msg) {
  const m = String(msg || '').toLowerCase();
  return (
    m.includes('already exists') ||
    m.includes('the resource already exists') ||
    m.includes('duplicate')
  );
}

async function main() {
  const entries = map
    .filter((r) => BUCKETS.includes(r.bucket))
    .filter(
      (r) =>
        typeof r.destPath === 'string' &&
        r.destPath.startsWith(`${FROM_PREFIX}/`)
    );

  console.log(`FROM: ${FROM_PREFIX}/  -> TO: ${TO_PREFIX}/`);
  console.log(`Buckets: ${BUCKETS.join(', ')}`);
  console.log(`Entries elegíveis: ${entries.length}`);

  const out = [];
  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const r of entries) {
    const bucket = r.bucket;
    const from = r.destPath;
    const to = buildV3Path(r.oldPath, r.destPath);

    // copy server-side (não baixa)
    const { error } = await supabase.storage
      .from(bucket)
      .copy(from, to, { upsert: false });

    if (error) {
      if (isAlreadyExistsError(error.message)) {
        skipped++;
        out.push({ ...r, v3Path: to, status: 'exists' });
        continue;
      }
      failed++;
      out.push({ ...r, v3Path: to, status: 'error', error: error.message });
      console.error('COPY error:', { bucket, from, to, error: error.message });
      continue;
    }

    ok++;
    out.push({ ...r, v3Path: to, status: 'copied' });
    console.log(`✔ ${bucket}: ${from} -> ${to}`);
  }

  const outPath = path.join(__dirname, 'asset-map-v3.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('\nResumo:');
  console.log(`copied: ${ok}, exists: ${skipped}, errors: ${failed}`);
  console.log(`Gerado: ${outPath}`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import path from 'path';
import { lookup as mimeLookup } from 'mime-types';
import fs from 'fs';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Faltam SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY no .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

const BUCKETS = ['site-assets', 'portfolio-media'];
// Prefixo “novo” onde tudo vai morar
const DEST_PREFIX = 'v2';
// Cache forte (1 ano)
const CACHE_CONTROL = 'public, max-age=31536000, immutable';

// paginação do list
const LIST_LIMIT = 1000;

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16); // curto e suficiente p/ cache-busting
}

function buildDestPath(oldPath, hash) {
  // Mantém a estrutura original, mas coloca em v2/ e injeta hash no filename
  const ext = path.extname(oldPath);
  const dir = path.posix.dirname(oldPath);
  const base = path.posix.basename(oldPath, ext);
  const safeDir = dir === '.' ? '' : dir;
  return path.posix.join(DEST_PREFIX, safeDir, `${base}.${hash}${ext}`);
}

async function listAllObjects(bucket, prefix = '') {
  const all = [];
  let offset = 0;
  while (true) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(prefix, {
        limit: LIST_LIMIT,
        offset,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (error) throw error;
    if (!data || data.length === 0) break;

    // list() retorna “pastas” como items com metadata null em alguns casos; tratamos abaixo.
    all.push(...data);
    if (data.length < LIST_LIMIT) break;
    offset += LIST_LIMIT;
  }
  return all;
}

async function walk(bucket, prefix = '') {
  // DFS simples: lista prefix e recursa em “pastas”
  const out = [];
  const items = await listAllObjects(bucket, prefix);

  for (const item of items) {
    // Em storage.list, “pastas” vêm com id null e/ou metadata null; regra prática:
    const isFolder = !item.metadata && item.name && !item.name.includes('.');
    const fullPath = prefix ? `${prefix}/${item.name}` : item.name;

    if (isFolder) {
      const children = await walk(bucket, fullPath);
      out.push(...children);
    } else {
      // arquivo
      out.push(fullPath);
    }
  }
  return out;
}

async function downloadObject(bucket, objectPath) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(objectPath);
  if (error) throw error;
  const arrayBuffer = await data.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadObject(bucket, destPath, buf, contentType) {
  const { error } = await supabase.storage.from(bucket).upload(destPath, buf, {
    upsert: false,
    cacheControl: CACHE_CONTROL,
    contentType,
  });
  if (error) throw error;
}

async function exists(bucket, objectPath) {
  // Checa existência tentando obter public URL não resolve; o jeito mais confiável é list no diretório
  const dir = path.posix.dirname(objectPath);
  const name = path.posix.basename(objectPath);
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(dir === '.' ? '' : dir, { limit: 1000 });
  if (error) return false;
  return (data || []).some((x) => x.name === name);
}

async function main() {
  const map = [];
  for (const bucket of BUCKETS) {
    console.log(`\n== Bucket: ${bucket} ==`);
    const paths = await walk(bucket, '');
    console.log(`Encontrados ${paths.length} objetos.`);

    for (let i = 0; i < paths.length; i++) {
      const oldPath = paths[i];

      // Evita reprocessar itens já em v2/
      if (oldPath.startsWith(`${DEST_PREFIX}/`)) continue;

      const buf = await downloadObject(bucket, oldPath);
      const hash = sha256(buf);
      const destPath = buildDestPath(oldPath, hash);

      const contentType = mimeLookup(oldPath) || 'application/octet-stream';

      // se já existe, pula (idempotência)
      const already = await exists(bucket, destPath);
      if (!already) {
        await uploadObject(bucket, destPath, buf, contentType);
        process.stdout.write(`✔ ${oldPath} -> ${destPath}\n`);
      } else {
        process.stdout.write(`↷ (já existe) ${oldPath} -> ${destPath}\n`);
      }

      map.push({ bucket, oldPath, destPath, contentType, bytes: buf.length });
    }
  }

  fs.writeFileSync('asset-map.json', JSON.stringify(map, null, 2));
  console.log('\nGerado asset-map.json com o mapeamento.');
}

main().catch((e) => {
  console.error('Erro:', e);
  process.exit(1);
});

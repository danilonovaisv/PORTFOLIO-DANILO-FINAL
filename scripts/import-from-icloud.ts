import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ICLOUD_BASE =
  '/Users/danilonovais/Library/Mobile Documents/com~apple~CloudDocs/ARQUIVOS PESSOAIS E PORTIFÓLIO/PROJETOS PARA COLOCAR NO PORTFOLIO';
const PACK_ROOT = path.resolve(process.cwd(), 'storage-pack');
const ASSETS_JSON = path.resolve(process.cwd(), 'assets.json');

const ALLOWED_EXTS = new Set([
  '.webp',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.gif',
  '.mp4',
  '.webm',
  '.glb',
  '.ttf',
  '.woff2',
]);

const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm', '.m4v']);
const IMAGE_EXTS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif']);

// Mapping from iCloud folder prefixes to destination project prefixes
const ROUTE_RULES: { icloudFolder: string; destPrefix: string }[] = [
  { icloudFolder: 'NESTLE', destPrefix: 'site-assets/landing-pages/nestle' },
  { icloudFolder: 'NESTLE', destPrefix: 'portfolio-media/nestle' },
  { icloudFolder: 'SWIFT/SWIF-WEEK', destPrefix: 'site-assets/landing-pages/swift-week' },
  { icloudFolder: 'SWIFT/SWIF-WEEK', destPrefix: 'portfolio-media/swift/swift-week' },
  { icloudFolder: 'SWIFT', destPrefix: 'site-assets/landing-pages/swift' },
  { icloudFolder: 'SWIFT', destPrefix: 'portfolio-media/swift' },
  { icloudFolder: 'TCOTTON', destPrefix: 'site-assets/landing-pages/tcotton' },
  { icloudFolder: 'TCOTTON', destPrefix: 'portfolio-media/tcotton' },
  { icloudFolder: 'TOPZ', destPrefix: 'site-assets/landing-pages/topz' },
  { icloudFolder: 'TOPZ', destPrefix: 'portfolio-media/topz' },
  { icloudFolder: 'SITE-ANTISSEMITISMO', destPrefix: 'site-assets/landing-pages/conid' },
  { icloudFolder: 'SITE-ANTISSEMITISMO', destPrefix: 'portfolio-media/conib' },
  { icloudFolder: 'PRONTOS-PARA-POST/ANIMALE', destPrefix: 'site-assets/landing-pages/animale' },
  { icloudFolder: 'PRONTOS-PARA-POST/ANIMALE', destPrefix: 'portfolio-media/animale' },
  { icloudFolder: 'PRONTOS-PARA-POST/CBRE', destPrefix: 'site-assets/landing-pages/cbre' },
  { icloudFolder: 'PRONTOS-PARA-POST/CBRE', destPrefix: 'portfolio-media/cbre' },
  { icloudFolder: 'PRONTOS-PARA-POST/DNTRO', destPrefix: 'site-assets/landing-pages/dntro' },
  { icloudFolder: 'PRONTOS-PARA-POST/DNTRO', destPrefix: 'portfolio-media/dntro' },
  { icloudFolder: 'PRONTOS-PARA-POST/DOLCE GUSTO', destPrefix: 'portfolio-media/dolce-gusto' },
  { icloudFolder: 'PRONTOS-PARA-POST/EUDORA', destPrefix: 'portfolio-media/eudora' },
  { icloudFolder: 'PRONTOS-PARA-POST/GLAD', destPrefix: 'site-assets/landing-pages/glad' },
  { icloudFolder: 'PRONTOS-PARA-POST/GLAD', destPrefix: 'portfolio-media/down-qu-mica' },
  { icloudFolder: 'PRONTOS-PARA-POST/HELLMAS', destPrefix: 'portfolio-media/hellmann-s' },
  { icloudFolder: 'PRONTOS-PARA-POST/HONDA', destPrefix: 'portfolio-media/civic' },
  { icloudFolder: 'PRONTOS-PARA-POST/MAPFRE', destPrefix: 'site-assets/landing-pages/mapfre' },
  { icloudFolder: 'PRONTOS-PARA-POST/MAPFRE', destPrefix: 'portfolio-media/fundaci-n-mapfre' },
  { icloudFolder: 'PRONTOS-PARA-POST/MERCADO PAGO', destPrefix: 'portfolio-media/mercado-livre' },
  { icloudFolder: 'PRONTOS-PARA-POST/AMBEV', destPrefix: 'portfolio-media/bees' },
  { icloudFolder: 'ZE-DELIVERY', destPrefix: 'site-assets/clients' },
  { icloudFolder: 'ZE-DELIVERY', destPrefix: 'portfolio-media/ze-delivery' },
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

interface Match {
  destKey: string;
  sourceFile: string;
  destFile: string;
  strategy: string;
}

async function runImport() {
  console.log('=================================================================');
  console.log('  Importador Automático: iCloud -> Storage Pack');
  console.log('=================================================================');

  if (!fs.existsSync(ICLOUD_BASE)) {
    console.error(`❌ Diretório iCloud não encontrado: ${ICLOUD_BASE}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(ASSETS_JSON, 'utf8'));
  const list = (raw[0]?.export_json || raw).filter(
    (x: any) => x.file_path && !x.file_path.endsWith('.emptyFolderPlaceholder')
  );

  console.log(`📋 Total de assets catalogados: ${list.length}`);

  // 1. Escanear arquivos no iCloud
  console.log('🔍 Indexando arquivos no iCloud...');
  const mediaFiles: { fullPath: string; fileName: string; relPath: string; ext: string }[] = [];

  function scan(dir: string) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.name === '.DS_Store') continue;
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          scan(full);
        } else if (e.isFile()) {
          let name = e.name;
          if (name.startsWith('.') && name.endsWith('.icloud')) {
            name = name.slice(1, -7);
          }
          const ext = path.extname(name).toLowerCase();
          if (ALLOWED_EXTS.has(ext)) {
            mediaFiles.push({
              fullPath: full,
              fileName: name,
              relPath: path.relative(ICLOUD_BASE, full),
              ext,
            });
          }
        }
      }
    } catch (err) {}
  }

  scan(ICLOUD_BASE);
  console.log(`📦 Encontrados ${mediaFiles.length} arquivos de mídia no iCloud.`);

  const matches: Match[] = [];
  const resolvedKeys = new Set<string>();

  for (const item of list) {
    const destKey = `${item.bucket || 'site-assets'}/${item.file_path}`;
    const destFullPath = path.join(PACK_ROOT, destKey);
    const destBaseName = path.basename(item.file_path);
    const destExt = path.extname(destBaseName).toLowerCase();
    const isDestVideo = VIDEO_EXTS.has(destExt);
    const isDestImage = IMAGE_EXTS.has(destExt);

    // Se já existe e tem tamanho > 0, marcar resolvido
    if (fs.existsSync(destFullPath) && fs.statSync(destFullPath).size > 0) {
      resolvedKeys.add(destKey);
      continue;
    }

    const matchingRules = ROUTE_RULES.filter((r) => destKey.startsWith(r.destPrefix));

    let candidates = mediaFiles;
    if (matchingRules.length > 0) {
      candidates = mediaFiles.filter((m) =>
        matchingRules.some((r) => m.relPath.startsWith(r.icloudFolder))
      );
    }

    if (isDestVideo) {
      candidates = candidates.filter((c) => VIDEO_EXTS.has(c.ext));
    } else if (isDestImage) {
      candidates = candidates.filter((c) => IMAGE_EXTS.has(c.ext));
    }

    // 1. Busca Exata
    const exact = candidates.find(
      (c) => c.fileName.toLowerCase() === destBaseName.toLowerCase()
    );
    if (exact) {
      matches.push({
        destKey,
        sourceFile: exact.fullPath,
        destFile: destFullPath,
        strategy: 'EXACT_NAME',
      });
      resolvedKeys.add(destKey);
      continue;
    }

    // 2. Busca por Hash (thumb-hellmanns-16-9.d08e71a295035fae.webp -> thumb-hellmanns-16-9)
    const hashMatch = destBaseName.match(/^(.+)\.[a-f0-9]{8,16}\.([a-z0-9]+)$/i);
    if (hashMatch) {
      const baseNameWithoutHash = hashMatch[1];
      const ext = hashMatch[2];

      const hashedCandidate = candidates.find((c) => {
        const cNoExt = path.basename(c.fileName, path.extname(c.fileName));
        const cName = c.fileName.toLowerCase();
        return (
          cNoExt.toLowerCase() === baseNameWithoutHash.toLowerCase() ||
          cName === `${baseNameWithoutHash}.${ext}`.toLowerCase() ||
          normalize(cNoExt) === normalize(baseNameWithoutHash)
        );
      });

      if (hashedCandidate) {
        matches.push({
          destKey,
          sourceFile: hashedCandidate.fullPath,
          destFile: destFullPath,
          strategy: 'HASH_STRIPPED_MATCH',
        });
        resolvedKeys.add(destKey);
        continue;
      }
    }

    // 3. Busca por Nome Normalizado dentro do mesmo projeto
    if (matchingRules.length > 0) {
      const destNorm = normalize(path.basename(destBaseName, destExt));
      const normalizedCandidate = candidates.find((c) => {
        const cNorm = normalize(path.basename(c.fileName, path.extname(c.fileName)));
        return cNorm === destNorm;
      });

      if (normalizedCandidate) {
        matches.push({
          destKey,
          sourceFile: normalizedCandidate.fullPath,
          destFile: destFullPath,
          strategy: 'NORMALIZED_PROJECT_MATCH',
        });
        resolvedKeys.add(destKey);
        continue;
      }
    }

    // 4. Mapeamento Específico de Grid Blocks (ex: TCOTTON book-_Page_XX.webp -> Block XX)
    if (destKey.includes('landing-pages/tcotton/master-v3-grid-block-')) {
      const blockMatch = destBaseName.match(/block-\d+-(\d+)-m/);
      if (blockMatch) {
        const blockNum = parseInt(blockMatch[1], 10);
        const pagePadded = blockNum.toString().padStart(2, '0');
        const pageCandidate = candidates.find((c) =>
          c.fileName.toLowerCase().includes(`page_${pagePadded}`)
        );
        if (pageCandidate) {
          matches.push({
            destKey,
            sourceFile: pageCandidate.fullPath,
            destFile: destFullPath,
            strategy: `TCOTTON_PAGE_BLOCK_${blockNum}`,
          });
          resolvedKeys.add(destKey);
          continue;
        }
      }
    }
  }

  console.log(`\n=================================================================`);
  console.log(`📊 Balanço do Mapeamento:`);
  console.log(`  - Já existiam no storage-pack: ${resolvedKeys.size - matches.length}`);
  console.log(`  - Novos encontrados no iCloud:  ${matches.length}`);
  console.log(`  - Total Coberto:               ${resolvedKeys.size} de ${list.length}`);
  console.log(`  - Pendentes restantes:         ${list.length - resolvedKeys.size}`);
  console.log(`=================================================================\n`);

  const isExecute = process.argv.includes('--execute');

  if (isExecute && matches.length > 0) {
    console.log(`🚀 Copiando e convertendo ${matches.length} arquivos para storage-pack/...`);
    let count = 0;

    for (const m of matches) {
      const destDir = path.dirname(m.destFile);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      const srcExt = path.extname(m.sourceFile).toLowerCase();
      const destExt = path.extname(m.destFile).toLowerCase();

      try {
        if (destExt === '.webp' && srcExt !== '.webp' && IMAGE_EXTS.has(srcExt)) {
          // Converter JPG/PNG para WebP via Sharp
          await sharp(m.sourceFile).webp({ quality: 85 }).toFile(m.destFile);
        } else {
          fs.copyFileSync(m.sourceFile, m.destFile);
        }
        count++;
        process.stdout.write(`\rCopiados: [${count}/${matches.length}] ${path.basename(m.destFile)}`);
      } catch (err: any) {
        console.error(`\n❌ Erro ao copiar ${m.destKey}:`, err.message);
      }
    }

    console.log(`\n\n✅ Sucesso! ${count} arquivos integrados com perfeição ao storage-pack.`);
  } else if (!isExecute) {
    console.log('💡 Para aplicar a cópia física dos arquivos, execute:');
    console.log('   pnpm exec tsx scripts/import-from-icloud.ts --execute\n');
  }
}

runImport().catch(console.error);

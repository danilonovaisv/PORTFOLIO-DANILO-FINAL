#!/usr/bin/env node
/**
 * ==============================================================================
 * Upload Storage Pack -> Cloudflare R2
 * ==============================================================================
 * Lê recursivamente todo o diretório `storage-pack/` e faz o upload via S3 API
 * para o bucket Cloudflare R2 (portfolio-assets).
 * Ignora arquivos de controle como _CHECKLIST.md, README.md, .DS_Store.
 * ==============================================================================
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const accountId =
  process.env.R2_ACCOUNT_ID ||
  process.env.CLOUDFLARE_ACCOUNT_ID ||
  'f48c066525478bcaf66928b32ed721d2';
const bucketName = process.env.R2_BUCKET_NAME || 'portfolio-assets';
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  console.error('❌ R2_ACCESS_KEY_ID ou R2_SECRET_ACCESS_KEY não encontrados em .env.local');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true,
});

const MIME_MAP: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
  '.html': 'text/html; charset=utf-8',
};

function getFilesRecursively(dir: string, baseDir: string): { fullPath: string; relPath: string }[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let results: { fullPath: string; relPath: string }[] = [];

  for (const entry of entries) {
    if (entry.name === '.DS_Store' || entry.name.endsWith('.md')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir));
    } else if (entry.isFile()) {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push({ fullPath, relPath });
    }
  }

  return results;
}

async function uploadPack() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log('=================================================================');
  console.log(`  Upload Storage Pack -> Cloudflare R2 (portfolio-assets)${isDryRun ? ' [DRY-RUN]' : ''}`);
  console.log('=================================================================');
  console.log(`Endpoint: https://${accountId}.r2.cloudflarestorage.com`);
  console.log(`Bucket:   ${bucketName}`);
  console.log('=================================================================');

  const packDir = path.resolve(process.cwd(), 'storage-pack');
  if (!fs.existsSync(packDir)) {
    console.error(`❌ Diretório não encontrado: ${packDir}`);
    console.error(`👉 Execute primeiro: pnpm run pack:generate`);
    process.exit(1);
  }

  const files = getFilesRecursively(packDir, packDir);
  console.log(`📦 Encontrados ${files.length} arquivos de mídia para envio.\n`);

  if (files.length === 0) {
    console.log('ℹ️  Nenhum arquivo de mídia encontrado no storage-pack/ ainda.');
    console.log('👉 Adicione seus arquivos nas pastas de storage-pack/ e execute novamente.');
    return;
  }

  let success = 0;
  let failed = 0;
  const concurrency = 6;

  for (let i = 0; i < files.length; i += concurrency) {
    const chunk = files.slice(i, i + concurrency);
    await Promise.all(
      chunk.map(async (file, idx) => {
        const fileIndex = i + idx + 1;
        const key = file.relPath;
        const ext = path.extname(file.fullPath).toLowerCase();
        const contentType = MIME_MAP[ext] || 'application/octet-stream';

        if (isDryRun) {
          console.log(`[DRY-RUN ${fileIndex}/${files.length}] Seria enviado: ${key} (${contentType})`);
          success++;
          return;
        }

        try {
          const fileBuffer = fs.readFileSync(file.fullPath);
          await s3.send(
            new PutObjectCommand({
              Bucket: bucketName,
              Key: key,
              Body: fileBuffer,
              ContentType: contentType,
              CacheControl: 'public, max-age=31536000, immutable',
            })
          );
          success++;
          console.log(`[${fileIndex}/${files.length}] ✅ Enviado: ${key} (${contentType})`);
        } catch (err: any) {
          failed++;
          console.error(`[${fileIndex}/${files.length}] ❌ Erro ao enviar ${key}:`, err.message);
        }
      })
    );
  }

  console.log('\n=================================================================');
  console.log(`🏁 Concluído: ${success} arquivos processados, ${failed} falhas.`);
  console.log('=================================================================');
}

uploadPack().catch(console.error);

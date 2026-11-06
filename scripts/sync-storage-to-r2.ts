#!/usr/bin/env node
/**
 * ==============================================================================
 * Sincronizador Node.js: Supabase Storage -> Cloudflare R2 (S3 API Nativa)
 * ==============================================================================
 * Faz o download dos assets de assets.json e upload via S3 API para o R2.
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
  console.error('❌ R2_ACCESS_KEY_ID ou R2_SECRET_ACCESS_KEY não configurados em .env.local');
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

async function syncAssets() {
  console.log('=================================================================');
  console.log('  Sincronizador S3: Supabase Storage -> Cloudflare R2');
  console.log('=================================================================');
  console.log(`Endpoint R2: https://${accountId}.r2.cloudflarestorage.com`);
  console.log(`R2 Bucket:   ${bucketName}`);
  console.log('=================================================================');

  const assetsFilePath = path.resolve(process.cwd(), 'assets.json');
  if (!fs.existsSync(assetsFilePath)) {
    console.error(`❌ Arquivo ${assetsFilePath} não encontrado.`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(assetsFilePath, 'utf8'));
  const list = rawData[0]?.export_json || rawData;

  const validItems = list.filter(
    (item: any) =>
      item.file_path && !item.file_path.endsWith('.emptyFolderPlaceholder')
  );

  console.log(`🚀 Processando catálogo de ${validItems.length} objetos...\n`);

  let successCount = 0;
  let failCount = 0;
  const concurrency = 6;

  for (let i = 0; i < validItems.length; i += concurrency) {
    const chunk = validItems.slice(i, i + concurrency);
    await Promise.all(
      chunk.map(async (item: any) => {
        const bucket = item.bucket || 'site-assets';
        const targetKey = `${bucket}/${item.file_path}`;
        const sourceUrl =
          item.file_url ||
          `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/${bucket}/${item.file_path}`;

        // 1. Verificar se existe cópia local antes de tentar rede
        const localCandidate = path.resolve(process.cwd(), 'public/site.assets', item.file_path);
        let buffer: Buffer | null = null;
        let contentType: string = 'application/octet-stream';

        if (fs.existsSync(localCandidate)) {
          buffer = fs.readFileSync(localCandidate);
          const ext = path.extname(localCandidate).toLowerCase();
          contentType = MIME_MAP[ext] || 'application/octet-stream';
        } else {
          try {
            const res = await fetch(sourceUrl);
            if (!res.ok) {
              console.warn(`[SKIP/FAIL] ${sourceUrl} -> HTTP ${res.status}`);
              failCount++;
              return;
            }
            const ab = await res.arrayBuffer();
            buffer = Buffer.from(ab);
            contentType = res.headers.get('content-type') || 'application/octet-stream';
          } catch (fetchErr: any) {
            console.error(`[FETCH ERROR] ${sourceUrl}:`, fetchErr.message);
            failCount++;
            return;
          }
        }

        try {
          await s3.send(
            new PutObjectCommand({
              Bucket: bucketName,
              Key: targetKey,
              Body: buffer,
              ContentType: contentType,
              CacheControl: 'public, max-age=31536000, immutable',
            })
          );
          successCount++;
          console.log(`[SYNCED] ${targetKey}`);
        } catch (s3Err: any) {
          failCount++;
          console.error(`[R2 ERROR] ${targetKey}:`, s3Err.message);
        }
      })
    );
  }

  console.log('\n=================================================================');
  console.log(`✅ Concluídos com sucesso: ${successCount}`);
  console.log(`⚠️  Falhas ou bloqueados pelo Supabase (402): ${failCount}`);
  console.log('=================================================================');
}

syncAssets().catch(console.error);

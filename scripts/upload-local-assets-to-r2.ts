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
  console.error(
    '❌ R2_ACCESS_KEY_ID ou R2_SECRET_ACCESS_KEY não encontrados em .env.local'
  );
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

function getFilesRecursively(
  dir: string,
  baseDir: string
): { fullPath: string; relPath: string }[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let results: { fullPath: string; relPath: string }[] = [];

  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
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

async function uploadLocalAssets() {
  console.log(
    '================================================================='
  );
  console.log('  Upload Local Assets -> Cloudflare R2 (portfolio-assets)');
  console.log(
    '================================================================='
  );
  console.log(`Endpoint: https://${accountId}.r2.cloudflarestorage.com`);
  console.log(`Bucket:   ${bucketName}`);
  console.log(
    '================================================================='
  );

  const baseDir = path.resolve(process.cwd(), 'public/site.assets');
  if (!fs.existsSync(baseDir)) {
    console.error(`❌ Diretório não encontrado: ${baseDir}`);
    process.exit(1);
  }

  const files = getFilesRecursively(baseDir, baseDir);
  console.log(
    `📦 Encontrados ${files.length} arquivos estáticos locais para upload.\n`
  );

  let success = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const { fullPath, relPath } = files[i];
    const key = `site-assets/${relPath}`;
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_MAP[ext] || 'application/octet-stream';

    try {
      const fileBuffer = fs.readFileSync(fullPath);
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
      console.log(
        `[${i + 1}/${files.length}] ✅ Upload: ${key} (${contentType})`
      );
    } catch (err: any) {
      failed++;
      console.error(
        `[${i + 1}/${files.length}] ❌ Erro ao enviar ${key}:`,
        err.message
      );
    }
  }

  console.log(
    '\n================================================================='
  );
  console.log(
    `🏁 Concluído: ${success} enviados com sucesso, ${failed} falhas.`
  );
  console.log(
    '================================================================='
  );
}

uploadLocalAssets().catch(console.error);

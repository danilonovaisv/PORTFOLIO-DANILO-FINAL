import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL;
const BUCKET = process.env.BUCKET || 'portfolio-media';
const PREFIX = process.env.PREFIX || 'v4';
const CACHE_EXPECTED = (
  process.env.CACHE_EXPECTED || 'public, max-age=31536000, immutable'
).trim();

const PNG_WARN_KB = Number(process.env.PNG_WARN_KB || 500);
const MP4_WARN_KB = Number(process.env.MP4_WARN_KB || 1500);

if (!DATABASE_URL) {
  console.error('Faltou DATABASE_URL no .env');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.join(__dirname, 'audit-out');
fs.mkdirSync(OUT_DIR, { recursive: true });

function toKB(bytes) {
  return Math.round((Number(bytes || 0) / 1024) * 10) / 10;
}

function looksMalformedCache(cc) {
  const s = String(cc || '')
    .trim()
    .toLowerCase();
  return s.includes('max-age=public') || s.startsWith('max-age=');
}

function isV4Path(name) {
  const parts = String(name || '').split('/');
  return parts.length >= 4 && parts[0] === PREFIX && !!parts[1] && !!parts[2];
}

function parseBrandProject(name) {
  const parts = String(name || '').split('/');
  if (parts[0] !== PREFIX) return { brand: null, project: null };
  return { brand: parts[1] || null, project: parts[2] || null };
}

function isSuspiciousMp4(name) {
  const n = String(name || '').toLowerCase();
  return (
    n.endsWith('.mp4') &&
    (n.includes('thumb') || n.includes('cover') || n.includes('hero'))
  );
}

async function main() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  // Puxa tudo do prefixo com metadata
  const { rows } = await client.query(
    `
    select
      bucket_id,
      name,
      metadata->>'mimetype' as mimetype,
      coalesce((metadata->>'size')::numeric,0) as size_bytes,
      metadata->>'cacheControl' as cache_control
    from storage.objects
    where bucket_id = $1
      and name like $2
    `,
    [BUCKET, `${PREFIX}/%`]
  );

  console.log(`Encontrados ${rows.length} objetos em ${BUCKET}/${PREFIX}/`);

  const badCache = [];
  const malformedCache = [];
  const nonStandardPaths = [];
  const suspiciousMp4 = [];
  const bigPng = [];
  const bigMp4 = [];
  const duplicatesKey = new Map();
  const summary = new Map();

  for (const r of rows) {
    const name = r.name;
    const mimetype = r.mimetype || 'unknown';
    const size = Number(r.size_bytes || 0);
    const cache = String(r.cache_control || '').trim();

    // summary por marca/projeto
    const { brand, project } = parseBrandProject(name);
    const key = `${brand || 'unknown'}|${project || 'unknown'}`;
    const prev = summary.get(key) || { brand, project, files: 0, bytes: 0 };
    prev.files += 1;
    prev.bytes += size;
    summary.set(key, prev);

    // path padrão
    if (!isV4Path(name)) nonStandardPaths.push({ name });

    // cache
    if (!cache) {
      badCache.push({ name, cache: '(null)', mimetype, size_kb: toKB(size) });
    } else {
      if (looksMalformedCache(cache)) {
        malformedCache.push({ name, cache, mimetype, size_kb: toKB(size) });
      }
      if (cache !== CACHE_EXPECTED) {
        badCache.push({
          name,
          cache,
          expected: CACHE_EXPECTED,
          mimetype,
          size_kb: toKB(size),
        });
      }
    }

    // mp4
    if (mimetype === 'video/mp4' || name.toLowerCase().endsWith('.mp4')) {
      if (toKB(size) >= MP4_WARN_KB)
        bigMp4.push({ name, cache, size_kb: toKB(size) });
      if (isSuspiciousMp4(name))
        suspiciousMp4.push({ name, cache, size_kb: toKB(size) });
    }

    // png
    if (mimetype === 'image/png' || name.toLowerCase().endsWith('.png')) {
      if (toKB(size) >= PNG_WARN_KB)
        bigPng.push({ name, cache, size_kb: toKB(size) });
    }

    // duplicates heuristic
    const dKey = `${mimetype}|${size}`;
    const arr = duplicatesKey.get(dKey) || [];
    arr.push(name);
    duplicatesKey.set(dKey, arr);
  }

  const duplicates = [];
  for (const [k, arr] of duplicatesKey.entries()) {
    if (arr.length >= 2) {
      const [mimetype, size] = k.split('|');
      duplicates.push({
        mimetype,
        size_bytes: Number(size),
        copies: arr.length,
        examples: arr.slice(0, 10),
      });
    }
  }
  duplicates.sort((a, b) => b.size_bytes - a.size_bytes);

  const summaryArr = Array.from(summary.values())
    .map((x) => ({
      brand: x.brand,
      project: x.project,
      files: x.files,
      total_mb: Math.round((x.bytes / 1024 / 1024) * 100) / 100,
    }))
    .sort(
      (a, b) =>
        (a.brand || '').localeCompare(b.brand || '') ||
        (a.project || '').localeCompare(b.project || '')
    );

  fs.writeFileSync(
    path.join(OUT_DIR, 'summary.json'),
    JSON.stringify(summaryArr, null, 2)
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'bad-cache.json'),
    JSON.stringify(badCache, null, 2)
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'malformed-cache.json'),
    JSON.stringify(malformedCache, null, 2)
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'non-standard-paths.json'),
    JSON.stringify(nonStandardPaths, null, 2)
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'suspicious-mp4.json'),
    JSON.stringify(suspiciousMp4, null, 2)
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'big-png.json'),
    JSON.stringify(bigPng, null, 2)
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'big-mp4.json'),
    JSON.stringify(bigMp4, null, 2)
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'duplicates.json'),
    JSON.stringify(duplicates, null, 2)
  );

  console.log('\nIssues:');
  console.log(`- badCache: ${badCache.length}`);
  console.log(`- malformedCache: ${malformedCache.length}`);
  console.log(`- nonStandardPaths: ${nonStandardPaths.length}`);
  console.log(`- suspiciousMp4: ${suspiciousMp4.length}`);
  console.log(`- bigPng (>= ${PNG_WARN_KB}KB): ${bigPng.length}`);
  console.log(`- bigMp4 (>= ${MP4_WARN_KB}KB): ${bigMp4.length}`);
  console.log(`- duplicates (mimetype+size): ${duplicates.length}`);

  console.log(`\nRelatórios em: ${OUT_DIR}`);

  await client.end();
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});

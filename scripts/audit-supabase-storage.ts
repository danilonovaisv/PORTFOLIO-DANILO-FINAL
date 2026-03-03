import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing SUPABASE_URL or keys in environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const BUCKET = 'portfolio-media';
const TARGET_CACHE_CONTROL = 'public, max-age=31536000, immutable';

let errorCount = 0;
let fileCount = 0;

async function listFolderRecursively(path: string = '') {
  const { data, error } = await supabase.storage.from(BUCKET).list(path, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.error(`Failed to list path "${path}":`, error);
    return;
  }

  for (const item of data) {
    if (item.name === '.emptyFolderPlaceholder') continue;
    const itemPath = path ? `${path}/${item.name}` : item.name;

    // Supabase returns null `id` for folders in standard list API behavior
    // Some versions return empty objects for folders, or we can check mimetype
    if (
      !item.id ||
      item.metadata === null ||
      item.metadata?.mimetype === null
    ) {
      await listFolderRecursively(itemPath);
    } else {
      fileCount++;
      const currentCacheControl = item.metadata?.cacheControl;

      // We are only strictly enforcing this on v3/ path for now
      if (itemPath.startsWith('v3/')) {
        if (currentCacheControl !== TARGET_CACHE_CONTROL) {
          console.error(
            `[Cache Error] ${itemPath} has wrong cacheControl: "${currentCacheControl}" (Expected: "${TARGET_CACHE_CONTROL}")`
          );
          errorCount++;
        }
      } else {
        // Log warning for files outside V3
        console.warn(`[Legacy Warning] File outside v3/: ${itemPath}`);
      }
    }
  }
}

async function run() {
  console.log(`Starting Supabase Storage Audit on bucket: ${BUCKET}...`);
  await listFolderRecursively('');
  console.log(`\nAudit completed! Checked ${fileCount} files.`);

  if (errorCount > 0) {
    console.error(
      `\n❌ FAILED: Found ${errorCount} v3 files with incorrect Cache-Control. Run a sync or re-upload them.`
    );
    process.exit(1);
  } else {
    console.log(`\n✅ PASSED: All v3 files follow the cache-control standard.`);
    process.exit(0);
  }
}

run();

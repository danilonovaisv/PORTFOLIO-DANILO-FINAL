#!/usr/bin/env node
/**
 * Pre-deploy guard: HEAD-check every critical Supabase Storage video declared in
 * src/lib/video-assets.ts. Fails on any 4xx/5xx so Firebase cannot ship a
 * broken-media build. Bypass with SKIP_ASSET_VERIFY=1.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

if (process.env.SKIP_ASSET_VERIFY === '1') {
  console.log('[verify-assets] skipped via SKIP_ASSET_VERIFY=1');
  process.exit(0);
}

const VIDEO_ASSETS_PATH = resolve('src/lib/video-assets.ts');
const source = readFileSync(VIDEO_ASSETS_PATH, 'utf8');
const URLS = Array.from(
  new Set(
    source.match(
      /https:\/\/[^'"\s]+\.supabase\.co\/storage\/v1\/object\/public\/[^'"\s]+\.mp4/g
    ) ?? []
  )
);

if (URLS.length === 0) {
  console.error(`[verify-assets] No Supabase MP4 URLs found in ${VIDEO_ASSETS_PATH}`);
  process.exit(1);
}

let failed = false;
for (const url of URLS) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) {
      console.error(`[verify-assets] FAIL ${res.status} ${url}`);
      failed = true;
    } else {
      console.log(`[verify-assets] OK   ${res.status} ${url}`);
    }
  } catch (err) {
    console.error(`[verify-assets] ERR  ${url} :: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error(
    '\n[verify-assets] One or more assets unreachable. ' +
      'Check Supabase Storage buckets, RLS policies, and CORS config. ' +
      'See docs/audits/supabase-cors-rls-fix.sql.'
  );
  process.exit(1);
}

console.log('\n[verify-assets] All checks passed.');
process.exit(0);

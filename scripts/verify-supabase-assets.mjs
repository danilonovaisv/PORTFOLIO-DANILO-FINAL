#!/usr/bin/env node
/**
 * Pre-deploy guard: HEAD-check critical Supabase Storage assets.
 * Fails (exit 1) on any 4xx/5xx — prevents shipping a broken-media build.
 * Bypass with SKIP_ASSET_VERIFY=1.
 */

if (process.env.SKIP_ASSET_VERIFY === '1') {
  console.log('[verify-assets] skipped via SKIP_ASSET_VERIFY=1');
  process.exit(0);
}

const URLS = [
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/video.manifesto.desk.mp4',
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/hero/about.hero.desktop.compress.mp4',
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/portfolio/hero/portfolio.hero_desktop_video.mp4',
];

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

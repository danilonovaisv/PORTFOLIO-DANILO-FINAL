import { NextResponse } from 'next/server';
import { getD1Database } from '@/lib/d1/client';
import { listSiteAssetsFromD1 } from '@/lib/d1/site-assets';
import { normalizeAssetList } from '@/lib/supabase/site-asset-utils';
import type { DbAsset } from '@/types/admin';
import staticAssetsSnapshot from '@/config/site-assets.json';

export const dynamic = 'force-dynamic';

function getStaticFallbackAssets() {
  const rawList =
    (staticAssetsSnapshot as { export_json?: unknown }[])?.[0]?.export_json ??
    (staticAssetsSnapshot as unknown) ??
    [];
  return normalizeAssetList((rawList ?? []) as DbAsset[], {
    onlyActive: true,
  });
}

export async function GET() {
  try {
    const db = await getD1Database();
    if (db) {
      const assets = await listSiteAssetsFromD1(db, { activeOnly: true });
      if (assets.length > 0) {
        return NextResponse.json(assets, {
          status: 200,
          headers: { 'x-asset-source': 'cloudflare-d1' },
        });
      }
    }

    const fallbackAssets = getStaticFallbackAssets();
    return NextResponse.json(fallbackAssets, {
      status: 200,
      headers: { 'x-asset-source': 'static-backup' },
    });
  } catch (err: unknown) {
    console.warn(
      '[api/site-assets] D1 fallback triggered:',
      err instanceof Error ? err.message : err
    );
    const fallbackAssets = getStaticFallbackAssets();
    return NextResponse.json(fallbackAssets, {
      status: 200,
      headers: { 'x-asset-source': 'static-backup' },
    });
  }
}

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { normalizeAssetList } from '@/lib/supabase/site-asset-utils';
import type { DbAsset } from '@/types/admin';
import staticAssetsSnapshot from '@/config/site-assets.json';

export const dynamic = 'force-dynamic';

function getStaticFallbackAssets() {
  const rawList =
    (staticAssetsSnapshot as any)?.[0]?.export_json ??
    (staticAssetsSnapshot as any) ??
    [];
  return normalizeAssetList((rawList ?? []) as DbAsset[], {
    onlyActive: true,
  });
}

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('site_assets')
      .select(
        'id, key, bucket, file_path, page, is_active, sort_order, asset_type'
      )
      .eq('is_active', true)
      .order('page', { ascending: true })
      .order('sort_order', { ascending: true, nullsFirst: false });

    if (error) {
      console.warn(
        '[api/site-assets] Supabase indisponível, servindo fallback estático site-assets.json:',
        error.message
      );
      const fallbackAssets = getStaticFallbackAssets();
      return NextResponse.json(fallbackAssets, {
        status: 200,
        headers: { 'x-asset-source': 'static-backup' },
      });
    }

    const assets = normalizeAssetList((data ?? []) as DbAsset[], {
      onlyActive: true,
    });

    return NextResponse.json(assets, { status: 200 });
  } catch (err: any) {
    console.warn(
      '[api/site-assets] Erro inesperado, servindo fallback estático:',
      err?.message || err
    );
    try {
      const fallbackAssets = getStaticFallbackAssets();
      return NextResponse.json(fallbackAssets, {
        status: 200,
        headers: { 'x-asset-source': 'static-backup' },
      });
    } catch {
      return NextResponse.json(
        { error: 'SYSTEM_ERR: INTERNAL_SERVER_ERROR' },
        { status: 500 }
      );
    }
  }
}

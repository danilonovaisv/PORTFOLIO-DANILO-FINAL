import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { normalizeAssetList } from '@/lib/supabase/site-asset-utils';
import type { DbAsset } from '@/types/admin';

export const dynamic = 'force-dynamic';

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
      console.error('[api/site-assets] Supabase error:', error);
      // Map safe status codes, but hide technical details in the response message
      const status =
        error.code === 'PGRST301' ? 401 : error.code === '42501' ? 403 : 500;
      return NextResponse.json(
        { error: 'SYSTEM_ERR: DATABASE_QUERY_FAILED' },
        { status }
      );
    }

    const assets = normalizeAssetList((data ?? []) as DbAsset[], {
      onlyActive: true,
    });

    return NextResponse.json(assets, { status: 200 });
  } catch (err) {
    console.error('[api/site-assets] Unexpected error:', err);
    return NextResponse.json(
      { error: 'SYSTEM_ERR: INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}

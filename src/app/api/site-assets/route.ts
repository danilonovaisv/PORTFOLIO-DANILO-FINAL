import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { normalizeAssetList } from '@/lib/supabase/site-asset-utils';
import type { DbAsset } from '@/types/admin';
import { getSupabasePublicKey, getSupabasePublicUrl } from '@/lib/supabase/env';

export const dynamic = 'force-dynamic';
export const revalidate = 30;

export async function GET() {
  const supabaseUrl = getSupabasePublicUrl() ?? process.env.SUPABASE_URL;
  const supabaseKey = getSupabasePublicKey();

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Missing Supabase credentials' },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from('site_assets')
    .select(
      'id, key, bucket, file_path, page, is_active, sort_order, asset_type'
    )
    .eq('is_active', true)
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('Supabase error:', error);
    const status =
      error.code === 'PGRST301' ? 401 : error.code === '42501' ? 403 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  const assets = normalizeAssetList((data ?? []) as DbAsset[], {
    onlyActive: true,
  });

  return NextResponse.json(assets, { status: 200 });
}

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { normalizeAssetList } from '@/lib/supabase/site-asset-utils';
import type { DbAsset } from '@/types/admin';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

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
    .select('id, key, bucket, file_path, page, is_active, sort_order, asset_type')
    .eq('is_active', true)
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('Supabase error:', error);
    const status =
      error.code === 'PGRST301'
        ? 401
        : error.code === '42501'
          ? 403
          : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  const assets = normalizeAssetList((data ?? []) as DbAsset[], {
    onlyActive: true,
  });

  return NextResponse.json(assets, { status: 200 });
}

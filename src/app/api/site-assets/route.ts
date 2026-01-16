import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY;

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
    .select('*')
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const assets = (data ?? []).map((asset) => {
    let publicUrl = asset.file_path;

    if (asset.bucket && asset.file_path) {
      const url = supabase.storage
        .from(asset.bucket)
        .getPublicUrl(asset.file_path);
      if (url.data?.publicUrl) {
        publicUrl = url.data.publicUrl;
      }
    }

    return {
      ...asset,
      publicUrl,
    };
  });

  return NextResponse.json(assets, { status: 200 });
}

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY;

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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '') ?? supabaseUrl;

  const assets = (data ?? []).map((asset) => ({
    ...asset,
    publicUrl:
      asset.file_path && baseUrl
        ? `${baseUrl}/storage/v1/object/public/${asset.bucket}/${asset.file_path}`
        : asset.file_path,
  }));

  return NextResponse.json(assets, { status: 200 });
}

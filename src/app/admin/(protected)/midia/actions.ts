"use server";

import { createClient } from '@/lib/supabase/server';

type AssetPayload = {
  key: string;
  page: string;
  asset_type: string;
  description?: string | null;
  sort_order?: number | null;
  file_path?: string | null;
  bucket?: string;
};

export async function upsertAsset(payload: AssetPayload) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('site_assets')
    .upsert(
      {
        ...payload,
        bucket: payload.bucket ?? 'site-assets',
        is_active: true,
      },
      { onConflict: 'key' }
    );
  if (error) throw error;
}

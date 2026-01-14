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

export async function removeAsset(payload: {
  id: string;
  bucket: string;
  file_path?: string | null;
}) {
  const supabase = await createClient();
  if (payload.file_path) {
    const { error: storageError } = await supabase
      .storage.from(payload.bucket)
      .remove([payload.file_path]);
    if (storageError) throw storageError;
  }
  const { error } = await supabase.from('site_assets').delete().eq('id', payload.id);
  if (error) throw error;
}

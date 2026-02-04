import { createClient } from '@/lib/supabase/server';
import type { DbAsset } from '@/types/admin';
import {
  normalizeAssetList,
  type NormalizedSiteAsset,
} from '@/lib/supabase/site-asset-utils';
import { normalizeStoragePath } from '@/lib/supabase/urls';

export async function listAssets(): Promise<NormalizedSiteAsset[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_assets')
    .select('*')
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return normalizeAssetList((data ?? []) as DbAsset[]);
}

export async function upsertAsset(payload: Partial<DbAsset>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_assets')
    .upsert(
      {
        ...payload,
        file_path: payload.file_path
          ? normalizeStoragePath(payload.file_path, payload.bucket)
          : payload.file_path,
      },
      { onConflict: 'id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as DbAsset;
}

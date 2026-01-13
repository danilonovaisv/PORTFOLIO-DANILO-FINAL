import { createClient } from '@/lib/supabase/server';
import type { DbAsset } from '@/types/admin';

export async function listAssets() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_assets')
    .select('*')
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as DbAsset[];
}

export async function upsertAsset(payload: Partial<DbAsset>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_assets')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;
  return data as DbAsset;
}

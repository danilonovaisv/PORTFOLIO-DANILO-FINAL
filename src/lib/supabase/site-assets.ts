import { createClient } from '@/lib/supabase/server';
import type { DbAsset } from '@/types/admin';
import {
  normalizeAssetList,
  type NormalizedSiteAsset,
} from '@/lib/supabase/site-asset-utils';

export type SiteAsset = NormalizedSiteAsset;

export async function getSiteAssets() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_assets')
    .select('*')
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  if (error) throw error;

  return normalizeAssetList((data ?? []) as DbAsset[], { onlyActive: true });
}

import { createClientComponentClient } from '@/lib/supabase/client';
import type { DbAsset } from '@/types/admin';

export type SiteAsset = DbAsset & { publicUrl: string };

export async function getClientSiteAssets() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from('site_assets')
    .select('*')
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  if (error) throw error;

  const baseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '') ?? '';

  const records = (data ?? []) as DbAsset[];
  return records.map((asset) => ({
    ...asset,
    publicUrl:
      asset.file_path && baseUrl
        ? `${baseUrl}/storage/v1/object/public/${asset.bucket}/${asset.file_path}`
        : (asset.file_path ?? ''),
  })) as SiteAsset[];
}

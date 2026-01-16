import type { DbAsset } from '@/types/admin';
import {
  buildSupabaseStorageUrl,
  normalizeStoragePath,
} from '@/lib/supabase/urls';

export type NormalizedSiteAsset = DbAsset & { publicUrl: string };

export function normalizeAssetRecord(asset: DbAsset): NormalizedSiteAsset {
  const bucket = ((asset.bucket || 'site-assets') as string)
    .replace(/^bucket:\s*/i, '')
    .replace(/^"+|"+$/g, '')
    .replace(/^'+|'+$/g, '')
    .replace(/^\/+|\/+$/g, '');
  const cleanPath = normalizeStoragePath(asset.file_path, bucket);

  const publicUrl =
    buildSupabaseStorageUrl(bucket, cleanPath) ||
    (asset.file_path?.startsWith('http') ? asset.file_path : '') ||
    '';

  return {
    ...asset,
    bucket,
    file_path: cleanPath,
    publicUrl,
  };
}

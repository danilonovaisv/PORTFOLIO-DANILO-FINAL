import type { DbAsset } from '@/types/admin';
import {
  buildSupabaseStorageUrl,
  normalizeStoragePath,
  validateExternalUrl,
} from '@/lib/supabase/urls';

export type NormalizedSiteAsset = DbAsset & { publicUrl: string; href?: string };

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

  // Processar href se existir
  let processedAsset = {
    ...asset,
    bucket,
    file_path: cleanPath,
    publicUrl,
  };

  if (asset.href) {
    const validatedHref = validateExternalUrl(asset.href);
    if (validatedHref) {
      processedAsset = {
        ...processedAsset,
        href: validatedHref
      };
    }
  }

  return processedAsset;
}
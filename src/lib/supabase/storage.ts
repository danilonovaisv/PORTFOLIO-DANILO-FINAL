import { createClientComponentClient } from '@/lib/supabase/client';
import { buildAssetFilePath } from '@/lib/supabase/asset-paths';
import { normalizeStoragePath } from '@/lib/supabase/urls';

type UploadBucket = 'portfolio-media' | 'site-assets';

function buildPath(base: string, slug: string) {
  const sanitizedBase = base.replace(/\/+$/g, '').replace(/^\/+/g, '');
  const basePath = sanitizedBase ? `${sanitizedBase}` : '';
  return basePath ? `${basePath}/${slug}` : slug;
}

export async function uploadToBucket(
  bucket: UploadBucket,
  basePath: string,
  identifier: string,
  file: File
) {
  const supabase = createClientComponentClient();
  const ext = file.name.split('.').pop();
  const name = ext ? `${identifier}.${ext}` : identifier;
  const path = buildPath(basePath, name);
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: true });

  if (error) throw error;
  return normalizeStoragePath(data.path, bucket);
}

export async function uploadSiteAsset({
  file,
  key,
  page,
  subPath,
  bucket = 'site-assets',
}: {
  file: File;
  key: string;
  page?: string | null;
  subPath?: string;
  bucket?: UploadBucket;
}) {
  const supabase = createClientComponentClient();
  const extension = file.name.split('.').pop() ?? 'bin';
  const path = buildAssetFilePath({
    page,
    key,
    subPath,
    extension,
  });

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: true });

  if (error) throw error;
  return normalizeStoragePath(data.path, bucket);
}

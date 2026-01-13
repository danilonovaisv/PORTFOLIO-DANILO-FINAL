import { createClient } from '@/lib/supabase/client';

type UploadBucket = 'portfolio-media' | 'site-assets';

function buildPath(base: string, slug: string, file: File) {
  const ext = file.name.split('.').pop() || 'dat';
  return `${base}/${slug}-${Date.now()}.${ext}`;
}

export async function uploadToBucket(
  bucket: UploadBucket,
  basePath: string,
  identifier: string,
  file: File
) {
  const supabase = createClient();
  const path = buildPath(basePath, identifier, file);
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: true });

  if (error) throw error;
  return data.path;
}

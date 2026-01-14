import { createClient } from '@/lib/supabase/client';

type UploadBucket = 'portfolio-media' | 'site-assets';

function buildPath(base: string, slug: string) {
  const ext = slug.split('.').pop() || '';
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
  const supabase = createClient();
  const ext = file.name.split('.').pop();
  const name = ext ? `${identifier}.${ext}` : identifier;
  const path = buildPath(basePath, name);
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: true });

  if (error) throw error;
  return data.path;
}

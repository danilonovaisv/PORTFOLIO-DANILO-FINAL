const normalizeUrl = (value: string) => value.replace(/\/+$/, '');

export function getSupabaseBaseUrl() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) return '';
  try {
    return normalizeUrl(url);
  } catch {
    return url;
  }
}

export function buildSupabaseStorageUrl(bucket: string, filePath?: string) {
  if (!filePath) return '';
  const baseUrl = getSupabaseBaseUrl();
  if (!baseUrl) return '';
  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  const cleanPath = filePath.replace(/^\/+|\/+$/g, '');
  return `${baseUrl}/storage/v1/object/public/${cleanBucket}/${cleanPath}`;
}

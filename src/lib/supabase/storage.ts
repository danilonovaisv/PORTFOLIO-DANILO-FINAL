import { buildAssetFilePath } from '@/lib/supabase/asset-paths';
import { normalizeStoragePath } from '@/lib/supabase/urls';

type UploadBucket = 'portfolio-media' | 'site-assets';

async function uploadThroughAdminRoute({
  bucket,
  path,
  file,
}: {
  bucket: UploadBucket;
  path: string;
  file: File;
}) {
  const formData = new FormData();
  formData.set('bucket', bucket);
  formData.set('path', path);
  formData.set('file', file);

  const response = await fetch('/api/admin/storage/upload', {
    method: 'POST',
    body: formData,
  });

  const payload = (await response.json().catch(() => ({}))) as {
    path?: string;
    error?: string;
  };

  if (!response.ok || !payload.path) {
    throw new Error(payload.error || 'Falha no upload do arquivo.');
  }

  return payload.path;
}

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
  const ext = file.name.split('.').pop();
  const name = ext ? `${identifier}.${ext}` : identifier;
  const path = buildPath(basePath, name);
  const uploadedPath = await uploadThroughAdminRoute({ bucket, path, file });
  return normalizeStoragePath(uploadedPath, bucket);
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
  const extension = file.name.split('.').pop() ?? 'bin';
  const path = buildAssetFilePath({
    page,
    key,
    subPath,
    extension,
  });

  const uploadedPath = await uploadThroughAdminRoute({ bucket, path, file });
  return normalizeStoragePath(uploadedPath, bucket);
}

import { buildAssetFilePath } from '@/lib/supabase/asset-paths';
import { normalizeStoragePath } from '@/lib/supabase/urls';

type UploadBucket = 'portfolio-media' | 'site-assets';

async function uploadThroughAdminRoute({
  bucket,
  path,
  file,
  brand,
  project,
  kind,
}: {
  bucket: UploadBucket;
  path?: string;
  file: File;
  brand?: string;
  project?: string;
  kind?: string;
}) {
  const formData = new FormData();
  formData.set('bucket', bucket);
  if (path) formData.set('path', path);
  formData.set('file', file);
  if (brand) formData.set('brand', brand);
  if (project) formData.set('project', project);
  if (kind) formData.set('kind', kind);

  const response = await fetch('/api/admin/storage/upload', {
    method: 'POST',
    body: formData,
  });

  const payload = (await response.json().catch(() => ({}))) as {
    path?: string;
    error?: string;
    message?: string;
    requestId?: string;
  };

  if (!response.ok) {
    const errorCode =
      payload.error || `SYSTEM_ERR: STORAGE_UPLOAD_HTTP_${response.status}`;
    const details = payload.message ? ` ${payload.message}` : '';
    const requestId = payload.requestId
      ? ` Request ID: ${payload.requestId}.`
      : '';
    throw new Error(`${errorCode}.${details}${requestId}`);
  }

  const returnedPath = payload.path || path;
  if (!returnedPath) {
    throw new Error(payload.error || 'SYSTEM_ERR: STORAGE_UPLOAD_EMPTY_PATH');
  }

  return returnedPath;
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
  file: File,
  metadata?: { brand: string; project: string; kind?: string }
) {
  if (bucket === 'portfolio-media' && metadata) {
    const uploadedPath = await uploadThroughAdminRoute({
      bucket,
      file,
      brand: metadata.brand,
      project: metadata.project,
      kind: metadata.kind || identifier,
    });
    return normalizeStoragePath(uploadedPath, bucket);
  }

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

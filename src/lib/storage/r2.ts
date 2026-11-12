import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  CopyObjectCommand,
  ListObjectsV2Command,
  type ListObjectsV2CommandOutput,
  HeadBucketCommand,
} from '@aws-sdk/client-s3';
import { getR2PublicUrl, normalizeStoragePath } from '@/lib/supabase/urls';

let cachedClient: S3Client | null = null;

export function getR2Config() {
  const accountId =
    process.env.R2_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID || '';
  const bucketName = process.env.R2_BUCKET_NAME || 'portfolio-assets';
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const publicBaseUrl =
    getR2PublicUrl() || 'https://assets.portfoliodanilo.com';

  return {
    accountId,
    bucketName,
    accessKeyId,
    secretAccessKey,
    publicBaseUrl,
  };
}

export function getR2Client(): S3Client {
  if (cachedClient) return cachedClient;

  const { accountId, accessKeyId, secretAccessKey } = getR2Config();

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      'SYSTEM_ERR: R2_CREDENTIALS_MISSING — R2_ACCOUNT_ID, R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY not configured on server.'
    );
  }

  cachedClient = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true,
  });

  return cachedClient;
}

/**
 * Resolves the absolute S3 object key inside the unified R2 bucket ('portfolio-assets').
 * Virtual buckets ('site-assets', 'portfolio-media') become the root key folder.
 */
export function resolveR2Key(bucket: string, rawPath: string): string {
  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  const normalized = normalizeStoragePath(rawPath, cleanBucket) || rawPath;
  const cleanPath = normalized.replace(/^\/+/, '');

  if (cleanPath.startsWith(`${cleanBucket}/`)) {
    return cleanPath;
  }

  return `${cleanBucket}/${cleanPath}`;
}

export function getR2AssetUrl(bucket: string, rawPath: string): string {
  const { publicBaseUrl } = getR2Config();
  const key = resolveR2Key(bucket, rawPath);
  const encodedKey = key
    .split('/')
    .map((seg) => {
      try {
        return encodeURIComponent(decodeURIComponent(seg));
      } catch {
        return encodeURIComponent(seg);
      }
    })
    .join('/');

  return `${publicBaseUrl.replace(/\/+$/, '')}/${encodedKey}`;
}

export async function uploadToR2({
  bucket,
  path,
  body,
  contentType,
  cacheControl = 'public, max-age=31536000, immutable',
}: {
  bucket: string;
  path: string;
  body: Uint8Array | Buffer;
  contentType?: string;
  cacheControl?: string;
}) {
  const client = getR2Client();
  const { bucketName } = getR2Config();
  const key = resolveR2Key(bucket, path);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType || 'application/octet-stream',
    CacheControl: cacheControl,
  });

  await client.send(command);

  return {
    key,
    path: path.startsWith(`${bucket}/`) ? path.slice(bucket.length + 1) : path,
    publicUrl: getR2AssetUrl(bucket, path),
  };
}

export async function deleteFromR2({
  bucket,
  path,
}: {
  bucket: string;
  path: string;
}) {
  const client = getR2Client();
  const { bucketName } = getR2Config();
  const key = resolveR2Key(bucket, path);

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  await client.send(command);
  return { deleted: true, key };
}

export async function deleteManyFromR2({
  bucket,
  paths,
}: {
  bucket: string;
  paths: string[];
}) {
  if (paths.length === 0) return { deletedCount: 0, failed: [] };

  const client = getR2Client();
  const { bucketName } = getR2Config();

  const keys = paths
    .map((p) => resolveR2Key(bucket, p))
    .filter((k): k is string => Boolean(k));

  const failed: string[] = [];
  let deletedCount = 0;

  // S3 DeleteObjects supports batches of up to 1000 items
  for (let i = 0; i < keys.length; i += 500) {
    const chunk = keys.slice(i, i + 500);
    try {
      const command = new DeleteObjectsCommand({
        Bucket: bucketName,
        Delete: {
          Objects: chunk.map((Key) => ({ Key })),
          Quiet: true,
        },
      });
      const response = await client.send(command);
      const errors = response.Errors || [];
      deletedCount += chunk.length - errors.length;
      if (errors.length > 0) {
        errors.forEach((err) => {
          if (err.Key) failed.push(err.Key);
        });
      }
    } catch (err: any) {
      console.error('[R2 Storage] DeleteObjects error:', err);
      failed.push(...chunk);
    }
  }

  return { deletedCount, failed };
}

export async function moveInR2({
  bucket,
  sourcePath,
  destinationPath,
}: {
  bucket: string;
  sourcePath: string;
  destinationPath: string;
}) {
  const client = getR2Client();
  const { bucketName } = getR2Config();

  const sourceKey = resolveR2Key(bucket, sourcePath);
  const destinationKey = resolveR2Key(bucket, destinationPath);

  if (sourceKey === destinationKey) {
    return { moved: true, key: destinationKey };
  }

  // S3 CopyObject requires CopySource = `${bucketName}/${encodeURIComponent(sourceKey)}`
  const copySource = `${bucketName}/${encodeURIComponent(sourceKey).replace(/%2F/g, '/')}`;

  const copyCommand = new CopyObjectCommand({
    Bucket: bucketName,
    CopySource: copySource,
    Key: destinationKey,
  });

  await client.send(copyCommand);

  const deleteCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: sourceKey,
  });

  await client.send(deleteCommand);

  return { moved: true, oldKey: sourceKey, newKey: destinationKey };
}

export async function listFromR2({
  bucket,
  prefix = '',
}: {
  bucket: string;
  prefix?: string;
}): Promise<string[]> {
  const client = getR2Client();
  const { bucketName } = getR2Config();
  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');

  let searchPrefix = `${cleanBucket}/`;
  if (prefix && prefix.trim()) {
    const rawNormalized = normalizeStoragePath(prefix, cleanBucket) || prefix;
    const cleanPrefix = rawNormalized.replace(/^\/+/, '');
    searchPrefix = cleanPrefix.startsWith(`${cleanBucket}/`)
      ? cleanPrefix
      : `${cleanBucket}/${cleanPrefix}`;
  }

  const files: string[] = [];
  let continuationToken: string | undefined = undefined;

  do {
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: searchPrefix,
      ContinuationToken: continuationToken,
    });

    const response: ListObjectsV2CommandOutput = await client.send(listCommand);
    if (response.Contents) {
      for (const item of response.Contents) {
        if (item.Key && !item.Key.endsWith('/')) {
          // Strip virtual bucket prefix if returning relative to bucket
          const relPath = item.Key.startsWith(`${cleanBucket}/`)
            ? item.Key.slice(cleanBucket.length + 1)
            : item.Key;
          files.push(relPath);
        }
      }
    }

    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  return files;
}

export async function checkR2Health(): Promise<{
  ok: boolean;
  message?: string;
  bucket?: string;
}> {
  try {
    const client = getR2Client();
    const { bucketName } = getR2Config();
    const command = new HeadBucketCommand({ Bucket: bucketName });
    await client.send(command);
    return { ok: true, bucket: bucketName };
  } catch (err: any) {
    return { ok: false, message: err?.message || 'R2 connection failed' };
  }
}

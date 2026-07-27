export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import {
  requireAdminAccess,
  AdminAccessError,
} from '@/lib/admin/server-access';

type UploadBucket = 'portfolio-media' | 'site-assets';

const ALLOWED_BUCKETS = new Set<UploadBucket>([
  'portfolio-media',
  'site-assets',
]);

const MAX_FILE_SIZE_BY_BUCKET: Record<UploadBucket, number> = {
  'portfolio-media': 25 * 1024 * 1024,
  'site-assets': 10 * 1024 * 1024,
};

import {
  buildV4Path,
  hashContent,
  CACHE_CONTROL_IMMUTABLE,
} from '@/lib/assets/storagePath';

function normalizePath(rawPath: string) {
  return rawPath
    .trim()
    .replace(/^\/+/, '')
    .replace(/\/{2,}/g, '/');
}

function invalidPath(path: string) {
  return path.length === 0 || path.includes('..');
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  try {
    const { supabase } = await requireAdminAccess({ requireServiceRole: true });

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (formErr) {
      console.error(
        '[API Admin Storage Upload] FormData parsing error:',
        formErr
      );
      return NextResponse.json(
        { error: 'SYSTEM_ERR: INVALID_FORM_DATA_PAYLOAD' },
        { status: 400 }
      );
    }

    const bucket = formData.get('bucket');
    const rawPath = formData.get('path');
    const file = formData.get('file');
    const brand = formData.get('brand');
    const project = formData.get('project');
    const kind = formData.get('kind');

    if (
      typeof bucket !== 'string' ||
      !ALLOWED_BUCKETS.has(bucket as UploadBucket)
    ) {
      return NextResponse.json(
        { error: 'SYSTEM_ERR: INVALID_BUCKET_SPECIFIED' },
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'SYSTEM_ERR: FILE_UPLOAD_REQUIRED' },
        { status: 400 }
      );
    }

    const maxFileSizeBytes = MAX_FILE_SIZE_BY_BUCKET[bucket as UploadBucket];
    if (file.size > maxFileSizeBytes) {
      const maxFileSizeMb = maxFileSizeBytes / 1024 / 1024;
      return NextResponse.json(
        {
          error: 'SYSTEM_ERR: FILE_SIZE_EXCEEDS_LIMIT',
          message: `File size (${(file.size / 1024 / 1024).toFixed(2)} MB) exceeds the ${maxFileSizeMb} MB limit for ${bucket}.`,
          requestId,
        },
        { status: 413 }
      );
    }

    const bytes = await file.arrayBuffer();
    const payload = new Uint8Array(bytes);

    let path = '';
    let cacheControl = '3600';
    let upsert = true;

    if (bucket === 'portfolio-media') {
      const hash = await hashContent(bytes);

      if (!brand || !project) {
        return NextResponse.json(
          {
            error: 'SYSTEM_ERR: BRAND_AND_PROJECT_REQUIRED_FOR_PORTFOLIO_MEDIA',
          },
          { status: 400 }
        );
      }

      path = buildV4Path({
        brand: brand as string,
        project: project as string,
        kind: (kind as string) || undefined,
        filename: file.name,
        ext: file.name.split('.').pop() || 'bin',
        hash,
      });
      cacheControl = CACHE_CONTROL_IMMUTABLE;
      upsert = false; // Hashes make it unique, upsert is unnecessary and prevents mutability bugs
    } else {
      if (typeof rawPath !== 'string') {
        return NextResponse.json(
          { error: 'SYSTEM_ERR: INVALID_PATH_SPECIFIED' },
          { status: 400 }
        );
      }
      path = normalizePath(rawPath);
      if (invalidPath(path)) {
        return NextResponse.json(
          { error: 'SYSTEM_ERR: INVALID_UPLOAD_PATH' },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, payload, {
        contentType: file.type || undefined,
        cacheControl,
        upsert,
      });

    if (error) {
      console.error('[API Admin Storage Upload] Supabase upload failed:', {
        requestId,
        bucket,
        path,
        error,
      });
      const alreadyExists = error.message
        .toLowerCase()
        .includes('already exists');

      if (bucket === 'portfolio-media' && alreadyExists) {
        return NextResponse.json({ path }, { status: 200 });
      }

      return NextResponse.json(
        {
          error: 'SYSTEM_ERR: SUPABASE_STORAGE_UPLOAD_ERROR',
          message: error.message || 'The storage provider rejected the upload.',
          requestId,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ path: data?.path || path }, { status: 200 });
  } catch (error) {
    if (error instanceof AdminAccessError) {
      const status = error.code === 'unauthorized' ? 401 : 403;
      return NextResponse.json({ error: error.message }, { status });
    }

    console.error('[API Admin Storage Upload] Critical unhandled failure:', {
      requestId,
      error,
    });
    return NextResponse.json(
      {
        error: 'SYSTEM_ERR: UPLOAD_FAILED',
        message: 'The upload could not be completed.',
        requestId,
      },
      { status: 500 }
    );
  }
}

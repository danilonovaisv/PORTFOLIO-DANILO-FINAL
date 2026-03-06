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

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAdminAccess({ requireServiceRole: true });
    const formData = await request.formData();

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
      return NextResponse.json({ error: 'Bucket inválido.' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Arquivo obrigatório.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const payload = Buffer.from(bytes);

    let path = '';
    let cacheControl = '3600';
    let upsert = true;

    if (bucket === 'portfolio-media') {
      const hash = hashContent(payload);

      if (!brand || !project) {
        return NextResponse.json(
          {
            error:
              'Marca (brand) e Projeto (project) são obrigatórios para portfolio-media.',
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
        return NextResponse.json({ error: 'Path inválido.' }, { status: 400 });
      }
      path = normalizePath(rawPath);
      if (invalidPath(path)) {
        return NextResponse.json(
          { error: 'Path inválido para upload.' },
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
      const alreadyExists = error.message
        .toLowerCase()
        .includes('already exists');

      if (bucket === 'portfolio-media' && alreadyExists) {
        return NextResponse.json({ path }, { status: 200 });
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ path: data.path }, { status: 200 });
  } catch (error) {
    if (error instanceof AdminAccessError) {
      const status = error.code === 'unauthorized' ? 401 : 403;
      return NextResponse.json({ error: error.message }, { status });
    }

    const message = error instanceof Error ? error.message : 'Falha no upload.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

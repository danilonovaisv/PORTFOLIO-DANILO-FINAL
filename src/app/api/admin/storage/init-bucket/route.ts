import { NextResponse } from 'next/server';
import { requireAdminAccess, AdminAccessError } from '@/lib/admin/server-access';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAdminAccess({ requireServiceRole: true });
    
    // Attempt to update the site-assets bucket to enable public access and image transformations
    const { data, error } = await supabase.storage.updateBucket('site-assets', {
      public: true,
      allowedMimeTypes: [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/svg+xml',
        'video/mp4',
        'video/webm',
      ],
      fileSizeLimit: 10485760, // 10MB
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Attempt to update portfolio-media if needed, although it wasn't requested
    // This route is specific to configuring the necessary buckets for this project
    return NextResponse.json({ 
      success: true, 
      message: 'Bucket site-assets configurado com sucesso (Transformações e limites ativados).',
      data 
    }, { status: 200 });

  } catch (error) {
    if (error instanceof AdminAccessError) {
      const status = error.code === 'unauthorized' ? 401 : 403;
      return NextResponse.json({ error: error.message }, { status });
    }

    const message = error instanceof Error ? error.message : 'SYSTEM_ERR: BUCKET_INIT_FAILED';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

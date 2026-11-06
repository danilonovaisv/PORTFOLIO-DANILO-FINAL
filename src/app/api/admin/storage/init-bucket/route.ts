import { NextResponse } from 'next/server';
import {
  requireAdminAccess,
  AdminAccessError,
} from '@/lib/admin/server-access';
import { checkR2Health } from '@/lib/storage/r2';

export async function POST(_request: Request) {
  try {
    await requireAdminAccess({
      requireServiceRole: false,
    });

    const health = await checkR2Health();

    if (!health.ok) {
      console.error(
        '[API Admin Storage InitBucket] Cloudflare R2 health check failed:',
        health.message
      );
      return NextResponse.json(
        {
          error: 'SYSTEM_ERR: R2_HEALTH_CHECK_FAILED',
          message: health.message,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          `Cloudflare R2 Bucket '${health.bucket}' conectado e operacional (Zero Egress).`,
        data: health,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AdminAccessError) {
      const status = error.code === 'unauthorized' ? 401 : 403;
      return NextResponse.json({ error: error.message }, { status });
    }

    console.error('[API Admin Storage InitBucket] Critical failure:', error);
    const message =
      error instanceof Error ? error.message : 'SYSTEM_ERR: BUCKET_INIT_FAILED';
    return NextResponse.json(
      {
        error: message,
        details: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    );
  }
}

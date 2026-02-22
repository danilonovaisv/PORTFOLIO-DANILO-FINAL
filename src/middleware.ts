import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Next.js Edge Middleware — Ghost System Security Layer
 *
 * This middleware intercepts ALL matched routes and delegates
 * auth/session validation to the Supabase SSR helper.
 *
 * IMPORTANT: Without this file, the helper at lib/supabase/middleware.ts
 * is never invoked by Next.js, leaving /admin routes unprotected.
 */
export async function middleware(request: NextRequest) {
    return updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Public assets (images, svg, etc.)
         */
        '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)',
    ],
};

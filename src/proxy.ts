/**
 * Next.js Edge Proxy — Ghost System Auth Layer
 *
 * Next.js 16 migrated the edge entrypoint from `middleware.ts` → `proxy.ts`
 * and the export name from `middleware` → `proxy`.
 *
 * Delegates session management and admin-route protection
 * to the Supabase middleware helper.
 *
 * @see src/lib/supabase/middleware.ts for the implementation detail.
 */
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run on all routes except:
     * - _next/static  (static assets)
     * - _next/image   (image optimisation)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public folder assets (fonts, 3D models, images, site assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|fonts/|models/|assets/|site.assets/).*)',
  ],
};

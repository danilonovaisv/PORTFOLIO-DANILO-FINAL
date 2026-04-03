/**
 * Next.js Edge Middleware — Ghost System Auth Layer
 *
 * This file is the official Next.js middleware entrypoint.
 * It delegates session management and admin-route protection
 * to the Supabase middleware helper.
 *
 * Location must be at: src/middleware.ts (with "src" dir layout)
 * or: /middleware.ts (at project root)
 *
 * @see src/lib/supabase/middleware.ts for the implementation.
 */
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run middleware on all routes except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public folder assets (fonts, images, 3D models)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|fonts/|models/|assets/|site.assets/).*)',
  ],
};

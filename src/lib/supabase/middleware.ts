import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isAdminUser, shouldEnforceAdminRole } from '@/lib/admin/authz';
import { getSupabasePublicKey, getSupabasePublicUrl } from '@/lib/supabase/env';

const SUPABASE_URL = getSupabasePublicUrl();
const SUPABASE_PUBLIC_KEY = getSupabasePublicKey();

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthCallbackRoute = pathname.startsWith('/auth/callback');

  if (isAuthCallbackRoute) {
    return supabaseResponse;
  }

  if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) {
    console.warn(
      '[Middleware] Missing Supabase credentials. Define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.'
    );
    if (isAdminRoute && !isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  let user = null;

  try {
    const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
      cookieOptions: {
        name: '__session',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options: _options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    console.error(
      '[Middleware] Auth verification error:',
      error instanceof Error ? error.message : error
    );
  }

  // Handle Auth Logic
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  // Protect /admin routes (except login)
  if (isAdminRoute && !isLoginPage) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    if (shouldEnforceAdminRole() && !isAdminUser(user)) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

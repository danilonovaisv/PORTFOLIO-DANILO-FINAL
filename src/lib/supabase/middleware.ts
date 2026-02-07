import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isAdminUser, shouldEnforceAdminRole } from '@/lib/admin/authz';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export async function updateSession(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Missing Supabase middleware credentials. Define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY).'
    );
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookieOptions: {
      // Firebase Hosting só encaminha o cookie "__session" para as Functions.
      name: '__session',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // request.cookies é imutável; apenas refletimos no response.
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Do not use auth.getSession() - it reads from cookies without validation
  // Use auth.getUser() which always validates the session with Supabase Auth server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthCallbackRoute = pathname.startsWith('/auth/callback');

  // Skip auth callback route
  if (isAuthCallbackRoute) {
    return supabaseResponse;
  }

  // If user is logged in and trying to access login page, redirect to dashboard
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    const redirectResponse = NextResponse.redirect(url);
    // Copy cookies from supabaseResponse to ensure session persistence
    const cookiesToSet = supabaseResponse.cookies.getAll();
    cookiesToSet.forEach((cookie) =>
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
    );
    return redirectResponse;
  }

  // Protect /admin routes (except login)
  if (isAdminRoute && !isLoginPage) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      const redirectResponse = NextResponse.redirect(url);
      // Copy cookies from supabaseResponse to ensure session persistence
      const cookiesToSet = supabaseResponse.cookies.getAll();
      cookiesToSet.forEach((cookie) =>
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
      );
      return redirectResponse;
    }

    if (shouldEnforceAdminRole() && !isAdminUser(user)) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

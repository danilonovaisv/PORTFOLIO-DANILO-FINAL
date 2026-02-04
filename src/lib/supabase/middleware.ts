import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Fallback URLs case env vars are not available (shouldn't happen with NEXT_PUBLIC_*)
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://umkmwbkwvulxtdodzmzf.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookieOptions: {
      // Firebase Hosting só encaminha o cookie "__session" para as Functions.
      name: '__session',
      sameSite: 'lax',
      secure: true,
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

    // Se precisar de papel admin, reative o check abaixo.
    // const userRole = user.app_metadata?.role || 'user';
    // if (userRole !== 'admin') {
    //   const url = request.nextUrl.clone();
    //   url.pathname = '/';
    //   return NextResponse.redirect(url);
    // }
  }

  return supabaseResponse;
}

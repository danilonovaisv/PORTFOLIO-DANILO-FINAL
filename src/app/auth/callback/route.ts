import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { buildAbsoluteAuthUrl, sanitizeNextPath } from '@/lib/auth/redirects';
import { getSupabasePublicKey, getSupabasePublicUrl } from '@/lib/supabase/env';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = sanitizeNextPath(searchParams.get('next'), '/admin');

  if (code) {
    const cookieStore = await cookies();

    const supabaseUrl = getSupabasePublicUrl();
    const supabaseKey = getSupabasePublicKey();

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.redirect(
        buildAbsoluteAuthUrl('/admin/login?error=missing_config')
      );
    }

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookieOptions: {
        name: '__session',
        sameSite: 'lax',
        secure: true,
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component
          }
        },
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(buildAbsoluteAuthUrl(next));
    }
  }

  // Something went wrong, redirect to login with error
  return NextResponse.redirect(
    buildAbsoluteAuthUrl('/admin/login?error=auth_callback_failed')
  );
}

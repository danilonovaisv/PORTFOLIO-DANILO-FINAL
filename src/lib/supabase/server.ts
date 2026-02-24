import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabasePublicKey, getSupabasePublicUrl } from '@/lib/supabase/env';
import type { Database } from '@/lib/supabase.types';

export async function createClient({ admin = false } = {}) {
  let cookieStore: Awaited<ReturnType<typeof cookies>> | undefined;
  try {
    cookieStore = await cookies();
  } catch {
    // During build/static generation, cookies() might not be available
  }

  const supabaseUrl = getSupabasePublicUrl();
  const supabaseKey = admin
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : getSupabasePublicKey();

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL não está definida no ambiente.');
  }

  if (!supabaseKey) {
    if (admin) {
      throw new Error(
        'SUPABASE_SERVICE_ROLE_KEY não está definida no ambiente.'
      );
    }
    throw new Error(
      'Defina NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY (ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY).'
    );
  }

  const globalHeaders = admin
    ? {
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    : {};

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookieOptions: {
      // Firebase Hosting (Functions/Frameworks) só encaminha "__session"
      name: '__session',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
    global: globalHeaders,
    cookies: {
      getAll() {
        return cookieStore?.getAll() ?? [];
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore?.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
        }
      },
    },
  });
}

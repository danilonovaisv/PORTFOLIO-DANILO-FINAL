import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabasePublicKey, getSupabasePublicUrl } from '@/lib/supabase/env';
import type { Database } from '@/lib/supabase.types';

export async function createClient() {
  let cookieStore: Awaited<ReturnType<typeof cookies>> | undefined;
  try {
    cookieStore = await cookies();
  } catch {
    // During build/static generation, cookies() might not be available
  }

  const supabaseUrl = getSupabasePublicUrl();
  const supabaseKey = getSupabasePublicKey();

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL não está definida no ambiente.');
  }

  if (!supabaseKey) {
    throw new Error(
      'Defina NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY (ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY).'
    );
  }

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookieOptions: {
      // Firebase Hosting (Functions/Frameworks) só encaminha "__session"
      name: '__session',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
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

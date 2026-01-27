import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  let cookieStore: Awaited<ReturnType<typeof cookies>> | undefined;
  try {
    cookieStore = await cookies();
  } catch {
    // During build/static generation, cookies() might not be available
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL não está definida no ambiente.');
  }

  if (!supabaseKey) {
    throw new Error(
      'Defina NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ou NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookieOptions: {
      // Firebase Hosting (Functions/Frameworks) só encaminha "__session"
      name: '__session',
      sameSite: 'lax',
      secure: true,
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

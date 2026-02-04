import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type CookieStore = Awaited<ReturnType<typeof cookies>>;

export const createClient = async (cookieStore?: CookieStore) => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase server credentials');
  }

  const store = cookieStore ?? (await cookies());

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            store.set(name, value, options)
          );
        } catch {
          // Server Components cannot mutate cookies; middleware should handle refresh.
        }
      },
    },
  });
};

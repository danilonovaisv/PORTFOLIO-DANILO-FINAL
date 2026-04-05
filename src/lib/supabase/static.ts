import { createClient } from '@supabase/supabase-js';
import { getSupabasePublicKey, getSupabasePublicUrl } from '@/lib/supabase/env';
import type { Database } from '@/lib/supabase.types';

/**
 * Creates a static Supabase client for SSG/ISR
 * bypassing Next.js cookies() access.
 */
export function createStaticClient() {
  if (process.env.PLAYWRIGHT_TEST) {
    const mockQuery = {
      eq: () => mockQuery,
      order: () => mockQuery,
      limit: () => mockQuery,
      returns: () => Promise.resolve({ data: [], error: null }),
      select: () => mockQuery,
      single: () => Promise.resolve({ data: null, error: null }),
    };
    return {
      from: () => mockQuery,
      storage: {
        from: () => ({
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any;
  }

  const supabaseUrl = getSupabasePublicUrl();
  const supabaseKey = getSupabasePublicKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY/PUBLISHABLE_KEY/ANON_KEY)'
    );
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}

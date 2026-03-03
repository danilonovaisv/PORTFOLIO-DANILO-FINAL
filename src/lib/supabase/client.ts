import { createBrowserClient } from '@supabase/ssr';
import { getSupabasePublicKey, getSupabasePublicUrl } from '@/lib/supabase/env';
import type { Database } from '@/lib/supabase.types';

let supabaseClient: any = null;

export function createClientComponentClient() {
  if (process.env.PLAYWRIGHT_TEST) {
    // ... (mock logic)
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
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
      },
      storage: {
        from: () => ({ getPublicUrl: () => ({ data: { publicUrl: '' } }) }),
      },
    } as any;
  }

  if (supabaseClient) return supabaseClient;

  const supabaseUrl = getSupabasePublicUrl();
  const supabaseKey = getSupabasePublicKey();

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase env vars missing. Client initialization deferred.');
    return null as any;
  }

  try {
    supabaseClient = createBrowserClient<Database>(supabaseUrl, supabaseKey, {
      cookieOptions: {
        name: '__session',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return supabaseClient;
  } catch (error) {
    console.error('Failed to instantiate Supabase Browser Client:', error);
    throw error;
  }
}

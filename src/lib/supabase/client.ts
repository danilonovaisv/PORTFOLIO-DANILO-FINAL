import { createBrowserClient } from '@supabase/ssr';

// Fallback credentials (hardcoded for production reliability)
const FALLBACK_SUPABASE_URL = 'https://umkmwbkwvulxtdodzmzf.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA';

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClientComponentClient() {
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
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      storage: {
        from: () => ({
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any;
  }

  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    FALLBACK_SUPABASE_ANON_KEY;

  supabaseClient = createBrowserClient(supabaseUrl, supabaseKey, {
    // Firebase Hosting só encaminha o cookie "__session" para as Functions.
    // Forçamos o Supabase a usar esse nome para persistir a sessão.
    cookieOptions: {
      name: '__session',
      sameSite: 'lax',
      secure: true,
    },
  });

  return supabaseClient;
}

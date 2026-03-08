'use client';

/**
 * @file src/lib/supabase/client.ts
 * @boundary CLIENT ONLY — Browser Supabase client.
 *
 * CONTRACT:
 * - ONLY import this file in Client Components (`'use client'`) or hooks.
 * - Do NOT import this file in Server Components, route handlers, or middleware.
 * - Use `@/lib/supabase/server.ts` for server-side usage.
 *
 * HMR NOTE:
 * - Do NOT use module-level singletons (`let client = null` at top level).
 * - Singleton is stored in `globalThis` to survive Turbopack HMR module re-evaluation.
 */
import { createBrowserClient } from '@supabase/ssr';
import { getSupabasePublicKey, getSupabasePublicUrl } from '@/lib/supabase/env';
import type { Database } from '@/lib/supabase.types';

// Use a robust singleton pattern for HMR persistence.
// We use a namespaced global variable to survive Turbopack HMR re-evaluation.
declare global {
  var __GHOST_SUPABASE_CLIENT: any;
}
let cachedClient: any;

/**
 * Returns the Supabase Browser Client (singleton, HMR-safe).
 *
 * Usage in Client Components:
 * ```tsx
 * 'use client';
 * const supabase = createClientComponentClient();
 * ```
 */
/**
 * Returns a lightweight mock client for SSR or Testing environments.
 */
function createMockClient() {
  const mockQuery = {
    eq: () => mockQuery,
    order: () => mockQuery,
    limit: () => mockQuery,
    returns: () =>
      Promise.resolve({
        data: [
          {
            id: 'mock-project-1',
            title: 'Mock Project E2E',
            slug: 'mock-project',
            client_name: 'E2E Client',
            project_type: 'Mock',
            is_published: true,
            featured_on_home: true,
          },
        ],
        error: null,
      }),
    select: () => mockQuery,
    single: () =>
      Promise.resolve({
        data: {
          id: 'mock-project-1',
          title: 'Mock Project E2E',
          slug: 'mock-project',
          client_name: 'E2E Client',
          project_type: 'Mock',
          is_published: true,
        },
        error: null,
      }),
  };
  return {
    from: () => mockQuery,
    auth: {
      getSession: () =>
        Promise.resolve({
          data: {
            session: {
              user: {
                id: 'e2e-mock-user',
                email: 'admin@test.com',
                app_metadata: { role: 'admin' },
              },
              access_token: 'mock-token',
            },
          },
          error: null,
        }),
      signInWithPassword: ({ email }: { email: string }) =>
        Promise.resolve({
          data: {
            session: {
              user: {
                id: 'e2e-mock-user',
                email: email,
                app_metadata: { role: 'admin' },
              },
              access_token: 'mock-token',
            },
          },
          error: null,
        }),
      signUp: ({ email }: { email: string }) =>
        Promise.resolve({
          data: {
            user: { id: 'e2e-mock-user', email },
            session: null,
          },
          error: null,
        }),
      signInWithOtp: () => Promise.resolve({ data: {}, error: null }),
      resetPasswordForEmail: () => Promise.resolve({ data: {}, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    storage: {
      from: () => ({ getPublicUrl: () => ({ data: { publicUrl: '' } }) }),
    },
    realtime: {
      setAuth: () => {},
    },
    channel: () => ({
      on: () => ({ on: () => ({ subscribe: () => {} }) }),
      subscribe: () => {},
    }),
    removeChannel: () => Promise.resolve(),
  } as unknown as ReturnType<typeof createBrowserClient<Database>>;
}

/**
 * Returns the Supabase Browser Client (singleton, HMR-safe).
 */
export function createClientComponentClient(): ReturnType<
  typeof createBrowserClient<Database>
> {
  // 1. Playwright test mock — lightweight override (check first)
  if (
    process.env.PLAYWRIGHT_TEST ||
    (typeof window !== 'undefined' && (window as any).__IS_PLAYWRIGHT_MOCK__)
  ) {
    return createMockClient();
  }

  // 2. SSR Guard — Next.js pre-renders Client Components on the server.
  // Instead of throwing, we return a mock client to allow the render to complete.
  if (typeof window === 'undefined') {
    return createMockClient();
  }

  // Return cached singleton (survives module re-evaluation if stored in global scope correctly)
  // We check both local variable and globalThis as a fallback for different HMR behaviours.
  if (cachedClient) return cachedClient;
  if (globalThis.__GHOST_SUPABASE_CLIENT) {
    cachedClient = globalThis.__GHOST_SUPABASE_CLIENT;
    return cachedClient;
  }

  const supabaseUrl = getSupabasePublicUrl();
  const supabaseKey = getSupabasePublicKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      '[Supabase Browser] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
        'Check your .env.local file.'
    );
  }

  let client;
  try {
    client = createBrowserClient<Database>(supabaseUrl, supabaseKey, {
      cookieOptions: {
        // Firebase Hosting only forwards "__session"
        name: '__session',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (err) {
    console.error('[Supabase Client] Failed to create factory:', err);
    throw err;
  }

  // Store in both places for maximum HMR resilience
  cachedClient = client;
  globalThis.__GHOST_SUPABASE_CLIENT = client;

  return client;
}

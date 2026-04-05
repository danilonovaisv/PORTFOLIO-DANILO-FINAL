/**
 * @file src/lib/supabase/server.ts
 * @boundary SERVER ONLY — SSR/RSC Supabase client.
 *
 * CONTRACT:
 * - ONLY use this in Server Components, Route Handlers, Server Actions, and Middleware.
 * - Do NOT import in Client Components or browser-only code.
 * - Use `@/lib/supabase/client.ts` for browser/client usage.
 */
import 'server-only';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabasePublicKey, getSupabasePublicUrl } from '@/lib/supabase/env';
import type { Database } from '@/lib/supabase.types';

export async function createClient({ admin = false } = {}) {
  // 1. Playwright Test Mock (Environment Check)
  // If we are running E2E tests, we return a mock client that bypasses real auth.
  if (process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST === 'true') {
    const mockQuery = {
      eq: () => mockQuery,
      neq: () => mockQuery,
      gt: () => mockQuery,
      gte: () => mockQuery,
      lt: () => mockQuery,
      lte: () => mockQuery,
      like: () => mockQuery,
      ilike: () => mockQuery,
      is: () => mockQuery,
      in: () => mockQuery,
      contains: () => mockQuery,
      containedBy: () => mockQuery,
      range: () => mockQuery,
      or: () => mockQuery,
      match: () => mockQuery,
      order: () => mockQuery,
      limit: () => mockQuery,
      select: () => mockQuery,
      single: () => Promise.resolve({ data: {}, error: null }),
      returns: () => Promise.resolve({ data: [], error: null }),
    };

    return {
      from: () => mockQuery,
      auth: {
        getUser: () =>
          Promise.resolve({
            data: {
              user: {
                id: 'e2e-mock-user',
                email: 'admin@test.com',
                app_metadata: { role: 'admin' },
                user_metadata: { role: 'admin' },
              },
            },
            error: null,
          }),
        getSession: () =>
          Promise.resolve({
            data: {
              session: {
                user: {
                  id: 'e2e-mock-user',
                  email: 'admin@test.com',
                  app_metadata: { role: 'admin' },
                },
              },
            },
            error: null,
          }),
      },
      storage: {
        from: () => ({ getPublicUrl: () => ({ data: { publicUrl: '' } }) }),
      },
    } as any;
  }

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

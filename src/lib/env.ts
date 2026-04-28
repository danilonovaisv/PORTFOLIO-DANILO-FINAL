import { z } from 'zod';

/**
 * Validates environment variables at runtime using Zod.
 * This ensures that critical keys are present and follow the expected format.
 *
 * Note: Next.js only exposes NEXT_PUBLIC_ variables to the browser.
 * Server-only variables like SUPABASE_SERVICE_ROLE_KEY will be undefined in the browser.
 */

const envSchema = z.object({
  // --- PUBLIC VARIABLES ---
  // These are available in both client and server
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'Supabase Anon Key is required'),
  NEXT_PUBLIC_SUPABASE_FALLBACK_URL: z.string().url().optional(),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .optional()
    .default('https://danilonovais.com'),

  // --- SERVER VARIABLES ---
  // These are only available on the server
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().optional(),

  // --- RUNTIME ---
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

// For client-side, we can only validate NEXT_PUBLIC_ variables
// For server-side, we can validate everything
const processEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_FALLBACK_URL:
    process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  const isServer = typeof window === 'undefined';
  const isBuild = process.env.NODE_ENV === 'production' || 
                  process.env.NEXT_PHASE === 'phase-production-build' ||
                  process.env.CI === 'true' ||
                  process.env.VALIDATE_ENV_WARN_ONLY === '1';

  if (isServer) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    
    // During build or in production, we log warnings but don't necessarily crash 
    // unless the user explicitly wants strict validation.
    if (isBuild || process.env.NODE_ENV === 'production' || process.env.VALIDATE_ENV_WARN_ONLY === '1') {
      console.warn(
        '⚠️ Environment validation failed. Proceeding with caution (Build/Prod/Warn-Only mode).'
      );
    } else {
      throw new Error('Invalid environment variables. Set VALIDATE_ENV_WARN_ONLY=1 to bypass.');
    }
  }
}

export const env = parsed.success
  ? parsed.data
  : (processEnv as unknown as z.infer<typeof envSchema>);

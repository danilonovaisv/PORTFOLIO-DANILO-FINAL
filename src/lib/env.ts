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
  NODE_ENV: process.env.NODE_ENV,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  const isServer = typeof window === 'undefined';
  const isProduction = process.env.NODE_ENV === 'production';
  const shouldBypass =
    process.env.VALIDATE_ENV_WARN_ONLY === '1' && !isProduction;

  if (isServer) {
    console.error('❌ Environment validation failed!');
    console.error('Details:', JSON.stringify(parsed.error.format(), null, 2));

    if (shouldBypass) {
      console.warn(
        '⚠️ WARNING: Proceeding with INVALID environment variables due to VALIDATE_ENV_WARN_ONLY=1.'
      );
      console.warn(
        'This may cause runtime errors in features relying on these variables.'
      );
    } else {
      console.error(
        '\nFATAL: Critical environment variables are missing or invalid.'
      );
      console.error(
        'To fix this: Add the missing keys to your .env file or environment settings.'
      );
      if (!isProduction) {
        console.error(
          'For local development, you can temporarily bypass this with: VALIDATE_ENV_WARN_ONLY=1\n'
        );
      }

      throw new Error(
        'Environment validation failed. Build/Process terminated.'
      );
    }
  }
}

export const env = parsed.success
  ? parsed.data
  : (processEnv as unknown as z.infer<typeof envSchema>);

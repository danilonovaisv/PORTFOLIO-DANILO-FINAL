import 'server-only';
import { z } from 'zod';

/**
 * Server-only environment variables.
 * Using 'server-only' ensures this module cannot be imported into Client Components.
 */

const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase Service Role Key is required'),
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API Key is required'),
});

const processEnv = {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

const parsed = serverEnvSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error('❌ Missing critical server environment variables:', parsed.error.format());
  
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Critical server environment variables are missing in production.');
  }
}

export const serverEnv = parsed.success 
  ? parsed.data 
  : (processEnv as z.infer<typeof serverEnvSchema>);

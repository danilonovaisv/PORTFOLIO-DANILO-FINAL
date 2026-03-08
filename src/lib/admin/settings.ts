import { createAdminClient, isServiceRoleConfigured } from '@/lib/supabase/admin';
import { extractLegacyTokenValue, getActiveTokenSecret } from '@/lib/admin/tokens';

export async function getOpenAIKey(): Promise<string | null> {
  const envKey = process.env.OPENAI_API_KEY;
  if (envKey) return envKey;

  try {
    const tokenSecret = await getActiveTokenSecret('openai');
    if (tokenSecret) return tokenSecret;

    if (!isServiceRoleConfigured()) return null;

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('site_settings')
      .select('value')
      .eq('key', 'openai_api_key')
      .maybeSingle();

    if (error || !data) return null;
    return extractLegacyTokenValue(data.value);
  } catch (err) {
    console.error('getOpenAIKey Error:', err);
  }

  return null;
}

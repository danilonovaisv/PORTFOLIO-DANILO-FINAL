import { requireAdminAccess } from '@/lib/admin/server-access';

export async function getOpenAIKey(): Promise<string | null> {
  const envKey = process.env.OPENAI_API_KEY;
  if (envKey) return envKey;

  try {
    const { supabase } = await requireAdminAccess({ requireServiceRole: true });
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'openai_api_key')
      .maybeSingle();

    if (error || !data) return null;

    // Handle string or { key: string } JSON formats
    if (typeof data.value === 'string') {
      return data.value;
    } else if (
      typeof data.value === 'object' &&
      data.value !== null &&
      'key' in (data.value as any)
    ) {
      return (data.value as any).key;
    }
  } catch (err) {
    console.error('getOpenAIKey Error:', err);
  }

  return null;
}

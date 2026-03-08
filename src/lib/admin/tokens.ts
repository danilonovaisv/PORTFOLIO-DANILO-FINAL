import { createAdminClient, isServiceRoleConfigured } from '@/lib/supabase/admin';
import type { Database } from '@/lib/supabase.types';

export const TOKEN_STATUSES = ['active', 'inactive'] as const;
export const TOKEN_ENVIRONMENTS = [
  'development',
  'staging',
  'production',
] as const;

export type AdminTokenStatus = (typeof TOKEN_STATUSES)[number];
export type AdminTokenEnvironment = (typeof TOKEN_ENVIRONMENTS)[number];
export type AdminTokenRow = Database['public']['Tables']['admin_tokens']['Row'];

export function normalizeTokenProvider(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_]+/g, '-');
}

export function maskTokenSecret(secret?: string | null): string {
  if (!secret) return 'Nao configurado';
  if (secret.length <= 8) return '••••••••';
  return `${secret.slice(0, 4)}••••••${secret.slice(-4)}`;
}

export function extractLegacyTokenValue(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) return value.trim();

  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    const candidate = [record.key, record.value, record.token].find(
      (entry): entry is string => typeof entry === 'string' && entry.trim().length > 0
    );
    return candidate?.trim() ?? null;
  }

  return null;
}

async function selectProviderTokens(provider: string) {
  if (!isServiceRoleConfigured()) return [];

  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from('admin_tokens')
    .select('*')
    .eq('provider', normalizeTokenProvider(provider))
    .eq('status', 'active');

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getActiveTokenSecret(
  provider: string,
  environment: AdminTokenEnvironment = 'production'
): Promise<string | null> {
  const tokens = await selectProviderTokens(provider);
  if (tokens.length === 0) return null;

  const exact = tokens.find((token) => token.environment === environment);
  const production = tokens.find((token) => token.environment === 'production');
  return exact?.secret ?? production?.secret ?? tokens[0]?.secret ?? null;
}

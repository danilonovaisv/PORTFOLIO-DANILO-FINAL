export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { getSupabasePublicKey } from '@/lib/supabase/env';
import { createAdminClient, isServiceRoleConfigured } from '@/lib/supabase/admin';
import { extractLegacyTokenValue, maskTokenSecret } from '@/lib/admin/tokens';
import { listAdminUsers } from '@/lib/admin/admin-users';
import { requireAdminAccess } from '@/lib/admin/server-access';
import { SettingsForm } from './SettingsForm';

const getSupabasePublicKeyStatus = () => {
  const key = getSupabasePublicKey();
  return key ? 'Configurado' : 'Ausente';
};

export default async function SettingsPage() {
  await requireAdminAccess();

  const hasServiceRole = isServiceRoleConfigured();
  let hasOpenAIKeyDb = false;
  let tokens: Array<{
    id: string;
    name: string;
    provider: string;
    description: string | null;
    status: 'active' | 'inactive';
    environment: 'development' | 'staging' | 'production';
    maskedSecret: string;
    createdAt: string;
    updatedAt: string;
  }> = [];
  let adminUsers: Array<{
    userId: string;
    email: string;
    fullName: string;
    role: 'owner' | 'editor';
    status: 'active' | 'disabled';
    createdAt: string;
    lastSignInAt: string | null;
  }> = [];

  if (hasServiceRole) {
    try {
      const adminClient = createAdminClient();
      const [{ data: tokenRows }, { data: legacySetting }, listedAdminUsers] =
        await Promise.all([
          adminClient
            .from('admin_tokens')
            .select('*')
            .order('provider', { ascending: true })
            .order('name', { ascending: true }),
          adminClient
            .from('site_settings')
            .select('value')
            .eq('key', 'openai_api_key')
            .maybeSingle(),
          listAdminUsers(),
        ]);

      tokens = (tokenRows ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        provider: row.provider,
        description: row.description,
        status: row.status as 'active' | 'inactive',
        environment: row.environment as 'development' | 'staging' | 'production',
        maskedSecret: maskTokenSecret(row.secret),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
      adminUsers = listedAdminUsers;
      hasOpenAIKeyDb =
        tokens.some(
          (token) => token.provider === 'openai' && token.status === 'active'
        ) || Boolean(extractLegacyTokenValue(legacySetting?.value));
    } catch (err) {
      console.warn('[Settings] Falha ao carregar tokens/admin users', err);
    }
  }

  const hasOpenAIKeyEnv = Boolean(process.env.OPENAI_API_KEY);

  const credentialFields = [
    {
      name: 'Supabase URL',
      status: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configurado' : 'Ausente',
    },
    {
      name: 'Supabase Key (public)',
      status: getSupabasePublicKeyStatus(),
    },
    {
      name: 'Supabase Service Role',
      status: isServiceRoleConfigured() ? 'Configurado' : 'Ausente',
    },
    {
      name: 'OpenAI API Key',
      status: hasOpenAIKeyEnv || hasOpenAIKeyDb ? 'Configurado' : 'Ausente',
    },
  ] as const;

  return (
    <div className="space-y-10 pb-20">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Settings
        </p>
        <h1 className="text-3xl font-semibold">Configurações do Sistema</h1>
        <p className="mt-2 text-sm text-slate-300">
          Tokens, acessos administrativos e status das integrações críticas do
          dashboard ADMIN.
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-medium text-white">
          Status de Integração
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {credentialFields.map((field) => (
            <div
              key={field.name}
              className="rounded-xl border border-white/5 bg-slate-900/40 p-4"
            >
              <p className="mb-1 text-xs uppercase tracking-wider text-slate-400">
                {field.name}
              </p>
              <p
                className={`text-sm font-medium ${
                  field.status === 'Configurado'
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}
              >
                {field.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium text-white">
          Gestão Administrativa
        </h2>
        <SettingsForm
          hasOpenAIKeyEnv={hasOpenAIKeyEnv}
          hasOpenAIKeyDb={hasOpenAIKeyDb}
          hasServiceRole={hasServiceRole}
          tokens={tokens}
          adminUsers={adminUsers}
        />
      </section>
    </div>
  );
}

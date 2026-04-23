export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { getSupabasePublicKey } from '@/lib/supabase/env';
import {
  createAdminClient,
  isServiceRoleConfigured,
} from '@/lib/supabase/admin';
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
        environment: row.environment as
          | 'development'
          | 'staging'
          | 'production',
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
    <div className="max-w-7xl space-y-12 py-6 pb-24">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-[#0048ff]/40" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0048ff]/60">
            System_Main_Frame
          </p>
        </div>
        <h1 className="font-mono text-4xl font-light tracking-tight text-white sm:text-5xl uppercase">
          Settings<span className="text-[#0048ff]">_</span>Panel<span className="text-[#0048ff]">.</span>
        </h1>
        <div className="flex items-center gap-6 font-mono text-[10px] text-white/40 uppercase tracking-widest">
          <span>Module: Configuration</span>
          <span>Security: High_Priority</span>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#0048ff]/50" />
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-white">
            Integration_Matrix
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {credentialFields.map((field) => (
            <div
              key={field.name}
              className="group rounded-xl border border-white/5 bg-white/[0.01] p-5 transition-all hover:border-white/10"
            >
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">
                {field.name}
              </p>
              <div className="flex items-center justify-between">
                <p
                  className={`font-mono text-xs uppercase tracking-tighter ${
                    field.status === 'Configurado'
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {field.status}
                </p>
                <div className={`h-1 w-1 rounded-full ${
                  field.status === 'Configurado' ? 'bg-emerald-500/40' : 'bg-rose-500/40'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#0048ff]/50" />
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-white">
            Administrative_Nexus
          </h2>
        </div>
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

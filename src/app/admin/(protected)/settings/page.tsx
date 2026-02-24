export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { getSupabasePublicKey } from '@/lib/supabase/env';
import { createClient } from '@/lib/supabase/server';
import { SettingsForm } from './SettingsForm';

const getSupabasePublicKeyStatus = () => {
  const key = getSupabasePublicKey();
  return key ? 'Configurado' : 'Ausente';
};

export default async function SettingsPage() {
  const supabase = await createClient({ admin: true });

  const { data: dbKey } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'openai_api_key')
    .maybeSingle();

  const hasOpenAIKeyEnv = Boolean(process.env.OPENAI_API_KEY);
  const hasOpenAIKeyDb = Boolean(dbKey?.value);

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
      status: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Configurado' : 'Ausente',
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
          Verifique o status das integrações e variáveis de ambiente necessárias
          para o funcionamento do CMS.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-medium text-white mb-4">
          Status de Integração
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {credentialFields.map((field) => (
            <div
              key={field.name}
              className="p-4 rounded-xl border border-white/5 bg-slate-900/40"
            >
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
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
        <h2 className="text-lg font-medium text-white mb-4">
          Chaves do Sistema
        </h2>
        <SettingsForm
          hasOpenAIKeyEnv={hasOpenAIKeyEnv}
          hasOpenAIKeyDb={hasOpenAIKeyDb}
        />
      </section>
    </div>
  );
}

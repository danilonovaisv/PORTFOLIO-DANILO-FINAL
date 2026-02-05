export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { createClient } from '@/lib/supabase/server';

const credentialFields = [
  {
    name: 'Supabase URL',
    value:
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      '',
  },
  {
    name: 'Supabase Key (public)',
    value:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
      '',
  },
  {
    name: 'OpenAI API Key',
    value: process.env.OPENAI_API_KEY || '',
  },
] as const;

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Settings
        </p>
        <h1 className="text-3xl font-semibold">Logins & Credenciais</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Painel operacional para validar sessão ativa e variáveis de integração
          críticas do CMS headless.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Sessão Atual
          </p>
          <p className="mt-2 text-sm text-slate-200">{user?.email ?? 'Sem sessão'}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
            UID
          </p>
          <p className="mt-2 break-all text-sm text-slate-200">{user?.id ?? '—'}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Providers
          </p>
          <p className="mt-2 text-sm text-slate-200">
            {user?.app_metadata?.providers?.join(', ') || 'email'}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-slate-900/60">
        <div className="border-b border-white/10 px-4 py-3">
          <h2 className="text-lg font-semibold">Saúde das Credenciais</h2>
          <p className="text-xs text-slate-400">
            Status mínimo para Admin, Realtime e ferramentas de IA.
          </p>
        </div>
        <ul className="divide-y divide-white/10">
          {credentialFields.map((item) => {
            const enabled = Boolean(item.value);
            return (
              <li
                key={item.name}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="text-sm text-slate-200">{item.name}</span>
                <span
                  className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                    enabled
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'bg-amber-500/15 text-amber-300'
                  }`}
                >
                  {enabled ? 'Ativo' : 'Ausente'}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  createAdminToken,
  createAdminUser,
  deleteAdminToken,
  deleteAdminUser,
  testAdminToken,
  updateAdminToken,
  updateAdminUser,
} from './actions';

type TokenSummary = {
  id: string;
  name: string;
  provider: string;
  description: string | null;
  status: 'active' | 'inactive';
  environment: 'development' | 'staging' | 'production';
  maskedSecret: string;
  createdAt: string;
  updatedAt: string;
};

type AdminUserSummary = {
  userId: string;
  email: string;
  fullName: string;
  role: 'owner' | 'editor';
  status: 'active' | 'disabled';
  createdAt: string;
  lastSignInAt: string | null;
};

type Props = {
  hasOpenAIKeyEnv: boolean;
  hasOpenAIKeyDb: boolean;
  hasServiceRole: boolean;
  tokens: TokenSummary[];
  adminUsers: AdminUserSummary[];
};

type TokenDraft = {
  name: string;
  provider: string;
  description: string;
  secret: string;
  status: 'active' | 'inactive';
  environment: 'development' | 'staging' | 'production';
};

type UserDraft = {
  email: string;
  fullName: string;
  role: 'owner' | 'editor';
  status: 'active' | 'disabled';
};

const emptyTokenDraft: TokenDraft = {
  name: '',
  provider: 'openai',
  description: '',
  secret: '',
  status: 'active',
  environment: 'production',
};

const emptyUserDraft: UserDraft = {
  email: '',
  fullName: '',
  role: 'editor',
  status: 'active',
};

const inputClasses =
  'w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50';
const labelClasses =
  'mb-1 block text-xs uppercase tracking-[0.18em] text-slate-400';

export function SettingsForm({
  hasOpenAIKeyEnv,
  hasOpenAIKeyDb,
  hasServiceRole,
  tokens,
  adminUsers,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingTokenId, setEditingTokenId] = useState<string | null>(null);
  const [tokenDraft, setTokenDraft] = useState<TokenDraft>(emptyTokenDraft);
  const [tokenMessage, setTokenMessage] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userDraft, setUserDraft] = useState<UserDraft>(emptyUserDraft);
  const [userMessage, setUserMessage] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  const canPersist = hasServiceRole;
  const activeOpenAIToken = useMemo(
    () =>
      tokens.find(
        (token) => token.provider === 'openai' && token.status === 'active'
      ) ?? null,
    [tokens]
  );

  const resetTokenForm = () => {
    setEditingTokenId(null);
    setTokenDraft(emptyTokenDraft);
  };

  const resetUserForm = () => {
    setEditingUserId(null);
    setUserDraft(emptyUserDraft);
  };

  const runTokenAction = (
    fn: () => Promise<{ ok: boolean; error?: string; message?: string }>
  ) => {
    startTransition(async () => {
      setTokenError(null);
      setTokenMessage(null);
      const result = await fn();
      if (!result.ok) {
        setTokenError(result.error || 'Falha ao processar token.');
        return;
      }
      setTokenMessage(result.message || 'Operacao concluida.');
      resetTokenForm();
      router.refresh();
    });
  };

  const runUserAction = (
    fn: () => Promise<{ ok: boolean; error?: string; message?: string }>
  ) => {
    startTransition(async () => {
      setUserError(null);
      setUserMessage(null);
      const result = await fn();
      if (!result.ok) {
        setUserError(result.error || 'Falha ao processar usuario ADMIN.');
        return;
      }
      setUserMessage(result.message || 'Operacao concluida.');
      resetUserForm();
      router.refresh();
    });
  };

  const handleTokenSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canPersist) return;

    const payload = {
      ...tokenDraft,
      name: tokenDraft.name.trim(),
      provider: tokenDraft.provider.trim(),
      description: tokenDraft.description.trim(),
      secret: tokenDraft.secret.trim(),
    };

    runTokenAction(() =>
      editingTokenId
        ? updateAdminToken(editingTokenId, payload)
        : createAdminToken(payload)
    );
  };

  const handleUserSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canPersist) return;

    const payload = {
      ...userDraft,
      email: userDraft.email.trim(),
      fullName: userDraft.fullName.trim(),
    };

    runUserAction(() =>
      editingUserId
        ? updateAdminUser(editingUserId, payload)
        : createAdminUser(payload)
    );
  };

  return (
    <div className="space-y-10">
      <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-white">
            Estado atual das credenciais
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            O dashboard agora prioriza tokens salvos em `admin_tokens`, com
            fallback legado para `site_settings.openai_api_key`.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              OpenAI via ENV
            </p>
            <p
              className={`mt-2 text-sm font-medium ${
                hasOpenAIKeyEnv ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              {hasOpenAIKeyEnv ? 'Ativo no deploy' : 'Nao configurado'}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              OpenAI via banco
            </p>
            <p
              className={`mt-2 text-sm font-medium ${
                hasOpenAIKeyDb ? 'text-emerald-400' : 'text-slate-300'
              }`}
            >
              {hasOpenAIKeyDb
                ? activeOpenAIToken
                  ? `${activeOpenAIToken.maskedSecret} (${activeOpenAIToken.environment})`
                  : 'Fallback legado ativo'
                : 'Nao configurado'}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Service Role
            </p>
            <p
              className={`mt-2 text-sm font-medium ${
                hasServiceRole ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {hasServiceRole
                ? 'Disponivel para CRUD seguro'
                : 'Ausente: CRUD administrativo bloqueado'}
            </p>
          </div>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr]">
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">CRUD de Tokens</h3>
            <p className="mt-1 text-sm text-slate-400">
              Provider livre, segredo mascarado na listagem e teste automatico
              para OpenAI.
            </p>
          </div>

          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className={labelClasses}>Nome</span>
                <input
                  className={inputClasses}
                  value={tokenDraft.name}
                  onChange={(event) =>
                    setTokenDraft((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                <span className={labelClasses}>Provider</span>
                <input
                  className={inputClasses}
                  value={tokenDraft.provider}
                  onChange={(event) =>
                    setTokenDraft((current) => ({
                      ...current,
                      provider: event.target.value,
                    }))
                  }
                  placeholder="openai"
                />
              </label>
            </div>

            <label>
              <span className={labelClasses}>Descricao</span>
              <input
                className={inputClasses}
                value={tokenDraft.description}
                onChange={(event) =>
                  setTokenDraft((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Uso no Copy Agent / Scene Generator Pro"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className={labelClasses}>
                  Valor do token{' '}
                  {editingTokenId ? '(preencha apenas para trocar)' : ''}
                </span>
                <input
                  type="password"
                  className={inputClasses}
                  value={tokenDraft.secret}
                  onChange={(event) =>
                    setTokenDraft((current) => ({
                      ...current,
                      secret: event.target.value,
                    }))
                  }
                  placeholder="sk-..."
                />
              </label>
              <label>
                <span className={labelClasses}>Ambiente</span>
                <select
                  className={inputClasses}
                  value={tokenDraft.environment}
                  onChange={(event) =>
                    setTokenDraft((current) => ({
                      ...current,
                      environment: event.target.value as
                        | 'development'
                        | 'staging'
                        | 'production',
                    }))
                  }
                >
                  <option value="development">development</option>
                  <option value="staging">staging</option>
                  <option value="production">production</option>
                </select>
              </label>
            </div>

            <label>
              <span className={labelClasses}>Status</span>
              <select
                className={inputClasses}
                value={tokenDraft.status}
                onChange={(event) =>
                  setTokenDraft((current) => ({
                    ...current,
                    status: event.target.value as 'active' | 'inactive',
                  }))
                }
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={!canPersist || isPending}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
              >
                {editingTokenId ? 'Atualizar token' : 'Criar token'}
              </button>
              {editingTokenId ? (
                <button
                  type="button"
                  onClick={resetTokenForm}
                  disabled={isPending}
                  className="rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancelar edicao
                </button>
              ) : null}
            </div>

            {tokenError ? (
              <p className="text-sm text-rose-400">{tokenError}</p>
            ) : null}
            {tokenMessage ? (
              <p className="text-sm text-emerald-400">{tokenMessage}</p>
            ) : null}
          </form>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
          <h3 className="text-lg font-medium text-white">Tokens cadastrados</h3>
          <div className="mt-4 space-y-3">
            {tokens.length === 0 ? (
              <div className="rounded-lg border border-dashed border-white/10 p-6 text-sm text-slate-500">
                Nenhum token cadastrado.
              </div>
            ) : (
              tokens.map((token) => (
                <div
                  key={token.id}
                  className="rounded-lg border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">
                        {token.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {token.provider} · {token.environment} · {token.status}
                      </p>
                      <p className="text-sm text-slate-300">
                        {token.maskedSecret}
                      </p>
                      {token.description ? (
                        <p className="text-sm text-slate-400">
                          {token.description}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTokenId(token.id);
                          setTokenDraft({
                            name: token.name,
                            provider: token.provider,
                            description: token.description ?? '',
                            secret: '',
                            status: token.status,
                            environment: token.environment,
                          });
                        }}
                        className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:bg-white/5"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          runTokenAction(() => testAdminToken(token.id))
                        }
                        className="rounded-md border border-cyan-400/30 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
                      >
                        Testar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            !window.confirm(`Excluir o token "${token.name}"?`)
                          )
                            return;
                          runTokenAction(() => deleteAdminToken(token.id));
                        }}
                        className="rounded-md border border-rose-400/30 px-3 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/10"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr]">
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">
              CRUD de Usuarios ADMIN
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Sincroniza `auth.users` com `public.admin_users`. Convites novos
              usam o fluxo nativo do Supabase Auth.
            </p>
          </div>

          <form onSubmit={handleUserSubmit} className="space-y-4">
            <label>
              <span className={labelClasses}>Nome</span>
              <input
                className={inputClasses}
                value={userDraft.fullName}
                onChange={(event) =>
                  setUserDraft((current) => ({
                    ...current,
                    fullName: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              <span className={labelClasses}>Email</span>
              <input
                type="email"
                className={inputClasses}
                value={userDraft.email}
                onChange={(event) =>
                  setUserDraft((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className={labelClasses}>Role</span>
                <select
                  className={inputClasses}
                  value={userDraft.role}
                  onChange={(event) =>
                    setUserDraft((current) => ({
                      ...current,
                      role: event.target.value as 'owner' | 'editor',
                    }))
                  }
                >
                  <option value="owner">owner</option>
                  <option value="editor">editor</option>
                </select>
              </label>
              <label>
                <span className={labelClasses}>Status</span>
                <select
                  className={inputClasses}
                  value={userDraft.status}
                  onChange={(event) =>
                    setUserDraft((current) => ({
                      ...current,
                      status: event.target.value as 'active' | 'disabled',
                    }))
                  }
                >
                  <option value="active">active</option>
                  <option value="disabled">disabled</option>
                </select>
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={!canPersist || isPending}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
              >
                {editingUserId ? 'Atualizar usuario' : 'Adicionar ADMIN'}
              </button>
              {editingUserId ? (
                <button
                  type="button"
                  onClick={resetUserForm}
                  disabled={isPending}
                  className="rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancelar edicao
                </button>
              ) : null}
            </div>

            {userError ? (
              <p className="text-sm text-rose-400">{userError}</p>
            ) : null}
            {userMessage ? (
              <p className="text-sm text-emerald-400">{userMessage}</p>
            ) : null}
          </form>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
          <h3 className="text-lg font-medium text-white">
            Usuarios ADMIN cadastrados
          </h3>
          <div className="mt-4 space-y-3">
            {adminUsers.length === 0 ? (
              <div className="rounded-lg border border-dashed border-white/10 p-6 text-sm text-slate-500">
                Nenhum usuario ADMIN encontrado.
              </div>
            ) : (
              adminUsers.map((adminUser) => (
                <div
                  key={adminUser.userId}
                  className="rounded-lg border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">
                        {adminUser.fullName}
                      </p>
                      <p className="text-sm text-slate-300">
                        {adminUser.email}
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {adminUser.role} · {adminUser.status}
                      </p>
                      <p className="text-xs text-slate-500">
                        Ultimo login:{' '}
                        {adminUser.lastSignInAt
                          ? new Date(adminUser.lastSignInAt).toLocaleString(
                              'pt-BR'
                            )
                          : 'nunca'}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingUserId(adminUser.userId);
                          setUserDraft({
                            email: adminUser.email,
                            fullName: adminUser.fullName,
                            role: adminUser.role,
                            status: adminUser.status,
                          });
                        }}
                        className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:bg-white/5"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            !window.confirm(
                              `Remover o acesso ADMIN de ${adminUser.email}?`
                            )
                          ) {
                            return;
                          }
                          runUserAction(() =>
                            deleteAdminUser(adminUser.userId)
                          );
                        }}
                        className="rounded-md border border-rose-400/30 px-3 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/10"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {!hasServiceRole ? (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
          Configure `SUPABASE_SERVICE_ROLE_KEY` no servidor para habilitar o
          CRUD seguro de tokens e usuarios ADMIN.
        </div>
      ) : null}
    </div>
  );
}

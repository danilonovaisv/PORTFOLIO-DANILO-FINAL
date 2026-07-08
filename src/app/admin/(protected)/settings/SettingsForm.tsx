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
  'w-full rounded-lg border border-white/5 bg-black/40 px-4 py-3 font-mono text-sm text-white placeholder:text-white/20 focus:border-blue-500/30 focus:outline-none transition-colors';
const labelClasses =
  'mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40';

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
        setTokenError(result.error || 'SYSTEM_ERR: TOKEN_PROCESS_FAILURE');
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
        setUserError(result.error || 'SYSTEM_ERR: ADMIN_USER_PROCESS_FAILURE');
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
    <div className="space-y-12">
      <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8">
        <div className="mb-8">
          <h2 className="font-mono text-sm uppercase tracking-widest text-white">
            Current_Status_Payload
          </h2>
          <p className="mt-2 font-mono text-[10px] text-white/30 uppercase tracking-tight">
            Prioritizing `admin_tokens` with legacy fallback to `site_settings`.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-black/20 p-5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">
              Source: Environment
            </p>
            <p
              className={`font-mono text-xs uppercase tracking-tighter ${
                hasOpenAIKeyEnv ? 'text-blue-400' : 'text-white/40'
              }`}
            >
              {hasOpenAIKeyEnv ? 'ACTIVE_ON_DEPLOY' : 'NOT_CONFIGURED'}
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-black/20 p-5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">
              Source: Database_Vault
            </p>
            <p
              className={`font-mono text-xs uppercase tracking-tighter ${
                hasOpenAIKeyDb ? 'text-emerald-400' : 'text-white/40'
              }`}
            >
              {hasOpenAIKeyDb
                ? activeOpenAIToken
                  ? `${activeOpenAIToken.maskedSecret} [${activeOpenAIToken.environment}]`
                  : 'LEGACY_FALLBACK_ACTIVE'
                : 'NOT_CONFIGURED'}
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-black/20 p-5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">
              Security: Service_Role
            </p>
            <p
              className={`font-mono text-xs uppercase tracking-tighter ${
                hasServiceRole ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {hasServiceRole
                ? 'SECURE_CRUD_ENABLED'
                : 'ADMIN_LOCKED: MISSING_KEY'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_1.2fr]">
        <section className="rounded-2xl border border-white/5 bg-white/[0.01] p-8">
          <div className="mb-8">
            <h3 className="font-mono text-sm uppercase tracking-widest text-white">
              Token_Operator
            </h3>
            <p className="mt-2 font-mono text-[10px] text-white/30 uppercase tracking-tight">
              Manage API providers and secure credentials.
            </p>
          </div>

          <form onSubmit={handleTokenSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClasses}>Entry_Name</label>
                <input
                  className={inputClasses}
                  value={tokenDraft.name}
                  onChange={(event) =>
                    setTokenDraft((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="e.g. GPT-4_Main"
                />
              </div>
              <div>
                <label className={labelClasses}>Provider_ID</label>
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
              </div>
            </div>

            <div>
              <label className={labelClasses}>Metadata_Description</label>
              <input
                className={inputClasses}
                value={tokenDraft.description || ''}
                onChange={(event) =>
                  setTokenDraft((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Technical usage context"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClasses}>
                  Secret_Payload {editingTokenId ? '(UPDATE_ONLY)' : ''}
                </label>
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
              </div>
              <div>
                <label className={labelClasses}>Environment_Scope</label>
                <select
                  aria-label="Environment Scope"
                  className={inputClasses}
                  value={tokenDraft.environment}
                  onChange={(event) =>
                    setTokenDraft((current) => ({
                      ...current,
                      environment: event.target.value as
                        'development' | 'staging' | 'production',
                    }))
                  }
                >
                  <option value="development">DEVELOPMENT</option>
                  <option value="staging">STAGING</option>
                  <option value="production">PRODUCTION</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Operational_Status</label>
              <select
                aria-label="Operational Status"
                className={inputClasses}
                value={tokenDraft.status}
                onChange={(event) =>
                  setTokenDraft((current) => ({
                    ...current,
                    status: event.target.value as 'active' | 'inactive',
                  }))
                }
              >
                <option value="active">ACTIVE</option>
                <option value="inactive">INACTIVE</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="submit"
                disabled={!canPersist || isPending}
                className="group relative overflow-hidden rounded-lg bg-blue-600 px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-500 disabled:opacity-50"
              >
                <span className="relative z-10">
                  {editingTokenId ? 'COMMIT_UPDATE' : 'INITIALIZE_TOKEN'}
                </span>
              </button>
              {editingTokenId && (
                <button
                  type="button"
                  onClick={resetTokenForm}
                  disabled={isPending}
                  className="rounded-lg border border-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-white/60 transition-colors hover:bg-white/5"
                >
                  ABORT_SESSION
                </button>
              )}
            </div>

            {tokenError && (
              <p className="font-mono text-[10px] uppercase text-rose-500 tracking-tight">
                ERROR: {tokenError}
              </p>
            )}
            {tokenMessage && (
              <p className="font-mono text-[10px] uppercase text-emerald-500 tracking-tight">
                SUCCESS: {tokenMessage}
              </p>
            )}
          </form>
        </section>

        <section className="rounded-2xl border border-white/5 bg-white/[0.01] p-8">
          <div className="mb-8">
            <h3 className="font-mono text-sm uppercase tracking-widest text-white">
              Vault_Registry
            </h3>
            <p className="mt-2 font-mono text-[10px] text-white/30 uppercase tracking-tight">
              Active credentials in the administrative matrix.
            </p>
          </div>

          <div className="space-y-4">
            {tokens.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/5 p-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">
                  NO_RECORDS_FOUND
                </p>
              </div>
            ) : (
              tokens.map((token) => (
                <div
                  key={token.id}
                  className="group rounded-xl border border-white/5 bg-black/20 p-5 transition-all hover:border-white/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <p className="font-mono text-xs font-medium text-white uppercase">
                        {token.name}
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                        {token.provider} // {token.environment} //{' '}
                        {token.status}
                      </p>
                      <p className="font-mono text-[10px] text-blue-500/60 tracking-widest">
                        {token.maskedSecret}
                      </p>
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
                        className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white/60 transition-colors hover:bg-white/10"
                      >
                        EDIT
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          runTokenAction(() => testAdminToken(token.id))
                        }
                        className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-blue-400 transition-colors hover:bg-blue-500/10"
                      >
                        TEST
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
                        className="rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-rose-400 transition-colors hover:bg-rose-500/10"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_1.2fr]">
        <section className="rounded-2xl border border-white/5 bg-white/[0.01] p-8">
          <div className="mb-8">
            <h3 className="font-mono text-sm uppercase tracking-widest text-white">
              Nexus_Authority
            </h3>
            <p className="mt-2 font-mono text-[10px] text-white/30 uppercase tracking-tight">
              Administrative personnel synchronization.
            </p>
          </div>

          <form onSubmit={handleUserSubmit} className="space-y-6">
            <div>
              <label className={labelClasses}>Full_Identity</label>
              <input
                className={inputClasses}
                value={userDraft.fullName}
                onChange={(event) =>
                  setUserDraft((current) => ({
                    ...current,
                    fullName: event.target.value,
                  }))
                }
                placeholder="Name"
              />
            </div>

            <div>
              <label className={labelClasses}>Electronic_Contact</label>
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
                placeholder="email@example.com"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClasses}>Access_Tier</label>
                <select
                  aria-label="Access Tier"
                  className={inputClasses}
                  value={userDraft.role}
                  onChange={(event) =>
                    setUserDraft((current) => ({
                      ...current,
                      role: event.target.value as 'owner' | 'editor',
                    }))
                  }
                >
                  <option value="owner">OWNER_ADMIN</option>
                  <option value="editor">EDITOR_ADMIN</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Deployment_Status</label>
                <select
                  aria-label="Deployment Status"
                  className={inputClasses}
                  value={userDraft.status}
                  onChange={(event) =>
                    setUserDraft((current) => ({
                      ...current,
                      status: event.target.value as 'active' | 'disabled',
                    }))
                  }
                >
                  <option value="active">ACTIVE</option>
                  <option value="disabled">DISABLED</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="submit"
                disabled={!canPersist || isPending}
                className="group relative overflow-hidden rounded-lg bg-blue-600 px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-500 disabled:opacity-50"
              >
                <span className="relative z-10">
                  {editingUserId ? 'UPDATE_ADMIN' : 'PROVISION_ADMIN'}
                </span>
              </button>
              {editingUserId && (
                <button
                  type="button"
                  onClick={resetUserForm}
                  disabled={isPending}
                  className="rounded-lg border border-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-white/60 transition-colors hover:bg-white/5"
                >
                  ABORT_SESSION
                </button>
              )}
            </div>

            {userError && (
              <p className="font-mono text-[10px] uppercase text-rose-500 tracking-tight">
                ERROR: {userError}
              </p>
            )}
            {userMessage && (
              <p className="font-mono text-[10px] uppercase text-emerald-500 tracking-tight">
                SUCCESS: {userMessage}
              </p>
            )}
          </form>
        </section>

        <section className="rounded-2xl border border-white/5 bg-white/[0.01] p-8">
          <div className="mb-8">
            <h3 className="font-mono text-sm uppercase tracking-widest text-white">
              Admin_Grid
            </h3>
            <p className="mt-2 font-mono text-[10px] text-white/30 uppercase tracking-tight">
              Verified administrative nodes in the system.
            </p>
          </div>

          <div className="space-y-4">
            {adminUsers.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/5 p-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">
                  NO_ENTITIES_DETECTED
                </p>
              </div>
            ) : (
              adminUsers.map((adminUser) => (
                <div
                  key={adminUser.userId}
                  className="group rounded-xl border border-white/5 bg-black/20 p-5 transition-all hover:border-white/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <p className="font-mono text-xs font-medium text-white uppercase">
                        {adminUser.fullName}
                      </p>
                      <p className="font-mono text-[10px] text-white/40">
                        {adminUser.email}
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-500/60">
                        {adminUser.role} // {adminUser.status}
                      </p>
                      <p className="font-mono text-[9px] uppercase text-white/20">
                        LAST_AUTH:{' '}
                        {adminUser.lastSignInAt
                          ? new Date(adminUser.lastSignInAt).toLocaleString(
                              'en-US',
                              { dateStyle: 'short', timeStyle: 'short' }
                            )
                          : 'PENDING'}
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
                        className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white/60 transition-colors hover:bg-white/10"
                      >
                        EDIT
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
                        className="rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-rose-400 transition-colors hover:bg-rose-500/10"
                      >
                        REVOKE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {!hasServiceRole && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
            <p className="font-mono text-[10px] uppercase leading-relaxed text-amber-200/60">
              WARNING: SUPABASE_SERVICE_ROLE_NOT_DETECTED.
              SECURE_CRUD_OPERATIONS_ARE_CURRENTLY_LOCKED.
              PLEASE_VERIFY_ENV_VARS.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

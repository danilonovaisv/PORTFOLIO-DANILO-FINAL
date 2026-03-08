'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase/client';
import { mapSupabaseAuthError } from '@/lib/supabase/auth-messages';

type RecoveryState = 'checking' | 'ready' | 'invalid' | 'saving' | 'success';

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClientComponentClient(), []);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [state, setState] = useState<RecoveryState>('checking');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let timer: number | undefined;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;

      if (event === 'PASSWORD_RECOVERY' || session) {
        setState('ready');
        setError(null);
      }
    });

    const bootstrap = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (session) {
        setState('ready');
        return;
      }

      timer = window.setTimeout(async () => {
        const {
          data: { session: lateSession },
        } = await supabase.auth.getSession();

        if (!isMounted) return;
        setState(lateSession ? 'ready' : 'invalid');
      }, 1500);
    };

    bootstrap();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      if (timer) window.clearTimeout(timer);
    };
  }, [supabase]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (password.length < 8) {
      setError('Use uma senha com pelo menos 8 caracteres.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('A confirmação da senha não confere.');
      return;
    }

    setState('saving');

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setState('ready');
      setError(mapSupabaseAuthError(updateError));
      return;
    }

    setState('success');
    setSuccessMsg('Senha atualizada com sucesso. Redirecionando para o painel.');

    window.setTimeout(() => {
      router.replace('/admin');
      router.refresh();
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Recuperação
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Redefinir senha</h1>
        <p className="mt-1 text-sm text-slate-400">
          Abra o link enviado por email e defina uma nova senha para continuar.
        </p>
      </div>

      {state === 'checking' ? (
        <p className="text-sm text-slate-300">
          Validando o link de recuperação...
        </p>
      ) : null}

      {state === 'invalid' ? (
        <div className="space-y-4">
          <p className="text-sm text-red-400" role="alert">
            O link de recuperação expirou ou já foi usado.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/5"
          >
            Voltar para o login
          </Link>
        </div>
      ) : null}

      {(state === 'ready' || state === 'saving' || state === 'success') && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Nova senha</span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Confirmar nova senha</span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </label>

          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          {successMsg ? (
            <p className="text-sm text-emerald-400" role="status">
              {successMsg}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-600 disabled:opacity-60"
            disabled={state === 'saving' || state === 'success'}
          >
            {state === 'saving' ? 'Salvando...' : 'Salvar nova senha'}
          </button>
        </form>
      )}
    </div>
  );
}

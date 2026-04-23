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
      setError('SYSTEM_ERR: PASSWORD_MIN_LENGTH_8');
      return;
    }

    if (password !== passwordConfirm) {
      setError('SYSTEM_ERR: PASSWORD_CONFIRMATION_MISMATCH');
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
    setSuccessMsg('SYSTEM_OK: PASSWORD_UPDATE_CONFIRMED — REDIRECTING_TO_PANEL');

    window.setTimeout(() => {
      router.replace('/admin');
      router.refresh();
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          System_Recovery_Protocol
        </p>
        <h1 className="mt-2 font-mono text-2xl font-light text-white">
          SYSTEM_RESET_CREDENTIAL<span className="text-[#0048ff]">.</span>
        </h1>
        <p className="mt-1 font-mono text-[11px] text-white/40 uppercase tracking-wide leading-relaxed">
          Open the link dispatched via email node and define a new access key to proceed.
        </p>
      </div>

      {state === 'checking' ? (
        <p className="font-mono text-[11px] text-white/40 uppercase tracking-widest animate-pulse">
          SYSTEM_VALIDATING_RECOVERY_TOKEN...
        </p>
      ) : null}

      {state === 'invalid' ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 px-4 py-3">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            <p className="font-mono text-[10px] uppercase text-rose-400" role="alert">
              SYSTEM_ERR: RECOVERY_LINK_EXPIRED_OR_CONSUMED
            </p>
          </div>
          <Link
            href="/admin/login"
            className="inline-flex rounded-md border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/60 transition hover:border-white/20 hover:bg-white/5"
          >
            SYSTEM_RETURN_TO_ACCESS_PORTAL
          </Link>
        </div>
      ) : null}

      {(state === 'ready' || state === 'saving' || state === 'success') && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              System_New_Credential
            </span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="rounded-md bg-white/[0.02] border border-white/10 px-3 py-2.5 font-mono text-sm text-white transition-all focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              System_Confirm_Credential
            </span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="rounded-md bg-white/[0.02] border border-white/10 px-3 py-2.5 font-mono text-sm text-white transition-all focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </label>

          {error ? (
            <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 px-4 py-3">
              <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
              <p className="font-mono text-[10px] uppercase text-rose-400" role="alert">
                {error}
              </p>
            </div>
          ) : null}

          {successMsg ? (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="font-mono text-[10px] uppercase text-emerald-400" role="status">
                {successMsg}
              </p>
            </div>
          ) : null}

          <button
            type="submit"
            className="group relative flex w-full items-center justify-center overflow-hidden rounded bg-[#0048ff] py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#0048ff]/90 active:scale-[0.98] disabled:opacity-50"
            disabled={state === 'saving' || state === 'success'}
          >
            <span className="relative z-10 flex items-center gap-2">
              {state === 'saving' ? (
                <>
                  <div className="h-2 w-2 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  SYSTEM_EXECUTING_CREDENTIAL_UPDATE...
                </>
              ) : (
                <>
                  SYSTEM_COMMIT_NEW_CREDENTIAL
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all" />
                </>
              )}
            </span>
          </button>
        </form>
      )}
    </div>
  );
}

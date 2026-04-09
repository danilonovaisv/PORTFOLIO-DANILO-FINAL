'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase/client';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';
import { buildAbsoluteAuthUrl } from '@/lib/auth/redirects';
import {
  isCaptchaErrorMessage,
  mapSupabaseAuthError,
} from '@/lib/supabase/auth-messages';
import { getTurnstileSiteKey } from '@/lib/turnstile';
import Script from 'next/script';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    onTurnstileSuccess?: (_token: string) => void;
    onTurnstileExpired?: () => void;
    onTurnstileError?: () => void;
    turnstile?: {
      reset: () => void;
    };
  }
}

type AuthMode = 'login' | 'signup';
type BusyAction =
  | 'login'
  | 'signup'
  | 'magic-link'
  | 'recovery'
  | 'google'
  | 'github'
  | null;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<BusyAction>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
      setError(null);
    };

    window.onTurnstileExpired = () => {
      setTurnstileToken(null);
      setError('A verificação expirou. Gere um novo captcha para continuar.');
    };

    window.onTurnstileError = () => {
      setTurnstileToken(null);
      setError(
        'Não foi possível carregar a verificação de segurança. Atualize a página e tente novamente.'
      );
    };

    const authError = searchParams.get('error');
    const authMsg = searchParams.get('message');
    if (authError) {
      setError(mapSupabaseAuthError(authError));
    }
    if (authMsg) {
      setSuccessMsg(authMsg);
    }

    return () => {
      window.onTurnstileSuccess = undefined;
      window.onTurnstileExpired = undefined;
      window.onTurnstileError = undefined;
    };
  }, [searchParams]);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClientComponentClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setIsRedirecting(true);
        router.push(ADMIN_NAVIGATION.dashboard);
        router.refresh();
      }
    };
    checkSession();
  }, [router]);

  const isBusy = busyAction !== null || isRedirecting;
  const authCallbackUrl = buildAbsoluteAuthUrl('/auth/callback?next=/admin');
  const passwordResetUrl = buildAbsoluteAuthUrl('/admin/reset-password');

  const resetTurnstile = () => {
    setTurnstileToken(null);
    window.turnstile?.reset();
  };

  const clearFeedback = () => {
    setError(null);
    setSuccessMsg(null);
  };

  const withBusyAction = async (
    action: Exclude<BusyAction, null>,
    callback: () => Promise<void>
  ) => {
    clearFeedback();
    setBusyAction(action);

    try {
      await callback();
    } catch (err) {
      console.error('[Admin Auth] Unexpected exception:', err);
      setError(mapSupabaseAuthError(err));
    } finally {
      setBusyAction(null);
    }
  };

  const requireEmail = () => {
    if (email.trim()) return true;
    setError('Informe seu email para continuar.');
    return false;
  };

  const requireCaptcha = () => {
    if (
      process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST === 'true' ||
      (typeof window !== 'undefined' && (window as any).__IS_PLAYWRIGHT_MOCK__)
    ) {
      return true;
    }
    if (turnstileToken) return true;
    setError('Por favor, complete a verificação de segurança.');
    return false;
  };

  const redirectToAdmin = () => {
    setIsRedirecting(true);
    router.refresh();
    window.location.assign(ADMIN_NAVIGATION.dashboard);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await withBusyAction(mode, async () => {
      const supabase = createClientComponentClient();

      if (!requireCaptcha()) return;

      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: authCallbackUrl,
            captchaToken: turnstileToken ?? undefined,
          },
        });

        if (signUpError) {
          if (isCaptchaErrorMessage(signUpError)) resetTurnstile();
          setError(mapSupabaseAuthError(signUpError));
          return;
        }

        if (data.session) {
          redirectToAdmin();
          return;
        }

        setSuccessMsg(
          'Cadastro enviado. Se a conta estiver habilitada, confirme o email para concluir o acesso.'
        );
        setMode('login');
        resetTurnstile();
        return;
      }

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
          options: {
            captchaToken: turnstileToken ?? undefined,
          },
        });

      if (signInError) {
        if (isCaptchaErrorMessage(signInError)) resetTurnstile();
        setError(mapSupabaseAuthError(signInError));
        return;
      }

      if (data.session) {
        redirectToAdmin();
        return;
      }

      setError('Falha ao estabelecer sessão. Tente novamente.');
    });
  };

  const handleMagicLink = async () => {
    await withBusyAction('magic-link', async () => {
      if (!requireEmail() || !requireCaptcha()) return;

      const supabase = createClientComponentClient();
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: authCallbackUrl,
          shouldCreateUser: false,
          captchaToken: turnstileToken ?? undefined,
        },
      });

      if (magicLinkError) {
        if (isCaptchaErrorMessage(magicLinkError)) resetTurnstile();
        setError(mapSupabaseAuthError(magicLinkError));
        return;
      }

      setSuccessMsg(
        'Se o email existir e estiver autorizado, enviamos um magic link para entrar no painel.'
      );
      resetTurnstile();
    });
  };

  const handlePasswordRecovery = async () => {
    await withBusyAction('recovery', async () => {
      if (!requireEmail() || !requireCaptcha()) return;

      const supabase = createClientComponentClient();
      const { error: recoveryError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: passwordResetUrl,
          captchaToken: turnstileToken ?? undefined,
        });

      if (recoveryError) {
        if (isCaptchaErrorMessage(recoveryError)) resetTurnstile();
        setError(mapSupabaseAuthError(recoveryError));
        return;
      }

      setSuccessMsg(
        'Se o email existir, enviamos um link seguro para redefinir sua senha.'
      );
      resetTurnstile();
    });
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    await withBusyAction(provider, async () => {
      const supabase = createClientComponentClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: authCallbackUrl,
        },
      });

      if (oauthError) {
        setError(mapSupabaseAuthError(oauthError));
      }
    });
  };

  const primaryButtonLabel = isRedirecting
    ? 'Redirecionando...'
    : busyAction === 'login'
      ? 'Entrando...'
      : busyAction === 'signup'
        ? 'Cadastrando...'
        : mode === 'login'
          ? 'Entrar'
          : 'Cadastrar';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Admin
          </p>
          <h1 className="text-2xl font-semibold mt-2">
            {mode === 'login' ? 'Entrar no painel' : 'Criar nova conta'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {mode === 'login'
              ? 'Use seu email e senha do Supabase Auth.'
              : 'Registre-se (sujeito a validação de acesso).'}
          </p>
        </div>
        <button
          className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login');
            clearFeedback();
          }}
          type="button"
        >
          {mode === 'login' ? 'Fazer Cadastro' : 'Já tenho conta'}
        </button>
      </div>

      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Senha</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {successMsg && (
          <div
            className="text-sm text-emerald-400"
            role="alert"
            aria-live="polite"
          >
            {successMsg}
          </div>
        )}
        {error && (
          <div className="text-sm text-red-400" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <div
          className="cf-turnstile min-h-[65px]"
          data-sitekey={getTurnstileSiteKey()}
          data-callback="onTurnstileSuccess"
          data-expired-callback="onTurnstileExpired"
          data-error-callback="onTurnstileError"
          data-theme="dark"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-600 disabled:opacity-60"
          disabled={isBusy}
        >
          {primaryButtonLabel}
        </button>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            className="rounded-md border border-white/15 px-3 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/5 disabled:opacity-60"
            onClick={() => handleOAuth('google')}
            disabled={isBusy}
          >
            {busyAction === 'google'
              ? 'Abrindo Google...'
              : 'Entrar com Google'}
          </button>
          <button
            type="button"
            className="rounded-md border border-white/15 px-3 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/5 disabled:opacity-60"
            onClick={() => handleOAuth('github')}
            disabled={isBusy}
          >
            {busyAction === 'github'
              ? 'Abrindo GitHub...'
              : 'Entrar com GitHub'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            className="rounded-md border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white disabled:opacity-60"
            onClick={handleMagicLink}
            disabled={isBusy}
          >
            {busyAction === 'magic-link'
              ? 'Enviando magic link...'
              : 'Receber magic link'}
          </button>
          <button
            type="button"
            className="rounded-md border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white disabled:opacity-60"
            onClick={handlePasswordRecovery}
            disabled={isBusy}
          >
            {busyAction === 'recovery'
              ? 'Enviando recuperação...'
              : 'Esqueci minha senha'}
          </button>
        </div>

        <p className="text-xs leading-5 text-slate-400">
          Produção usa callbacks em HTTPS. Google e GitHub retornam para{' '}
          <span className="font-mono text-slate-300">/auth/callback</span>. A
          recuperação de senha retorna para{' '}
          <span className="font-mono text-slate-300">
            /admin/reset-password
          </span>
          .
        </p>
      </form>
    </div>
  );
}

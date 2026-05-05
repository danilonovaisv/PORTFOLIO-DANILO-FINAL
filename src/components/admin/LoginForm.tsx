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
      setError(
        'SYSTEM_ERR: VERIFICATION_EXPIRED — GENERATE_NEW_CAPTCHA_TO_PROCEED'
      );
    };

    window.onTurnstileError = () => {
      setTurnstileToken(null);
      setError('SYSTEM_ERR: SECURITY_LOAD_FAILURE — REFRESH_PAGE_AND_RETRY');
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
    setError('SYSTEM_ERR: EMAIL_REQUIRED — PROVIDE_EMAIL_TO_CONTINUE');
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
    setError('SYSTEM_ERR: SECURITY_VERIFICATION_REQUIRED — COMPLETE_CAPTCHA');
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
          'SYSTEM_AUTH: REGISTRATION_SUBMITTED — CONFIRM_IDENTITY_VIA_INBOX'
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

      setError('SYSTEM_ERR: SESSION_ESTABLISH_FAILURE — RETRY');
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
        'SYSTEM_AUTH: OTP_DISPATCHED — CHECK_IDENTITY_INBOX_FOR_MAGIC_LINK'
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
        'SYSTEM_AUTH: RECOVERY_DISPATCHED — CHECK_IDENTITY_INBOX_FOR_KEY_RESET'
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
    ? 'SYSTEM_REDIRECTING...'
    : busyAction === 'login'
      ? 'ESTABLISHING_SESSION...'
      : busyAction === 'signup'
        ? 'REGISTERING_IDENTITY...'
        : mode === 'login'
          ? 'SYSTEM_LOGIN'
          : 'SYSTEM_REGISTER';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            System_Kernel
          </p>
          <h1 className="font-mono text-2xl font-light mt-2 tracking-tight">
            {mode === 'login' ? 'System_Access_Portal' : 'System_Registry_Init'}
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/20 mt-1">
            {mode === 'login'
              ? 'Enter_Credentials_To_Establish_Session'
              : 'Initialize_New_System_Operator_Account'}
          </p>
        </div>
        <button
          className="font-mono text-[10px] uppercase tracking-widest text-bluePrimary hover:text-bluePrimary underline underline-offset-4"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login');
            clearFeedback();
          }}
          type="button"
        >
          {mode === 'login' ? 'REGISTRY_UP' : 'BACK_TO_LOGIN'}
        </button>
      </div>

      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="identity-email" className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Identity_Email
          </span>
          <input
            id="identity-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            className="rounded border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder:text-white/10 focus:border-bluePrimary/50 focus:ring-1 focus:ring-bluePrimary/20 focus:outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="access-key" className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Access_Key_Shield
          </span>
          <input
            id="access-key"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white focus:border-bluePrimary/50 focus:ring-1 focus:ring-bluePrimary/20 focus:outline-none transition-all"
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
          className="w-full rounded bg-bluePrimary py-4 font-mono text-xs uppercase tracking-[0.2em] text-white shadow-lg shadow-bluePrimary/20 transition-all hover:bg-bluePrimary/80 active:scale-[0.98] disabled:opacity-50"
          disabled={isBusy}
        >
          {primaryButtonLabel}
        </button>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            className="rounded border border-white/10 bg-white/[0.02] px-3 py-3 font-mono text-[9px] uppercase tracking-widest text-white/60 transition-all hover:border-bluePrimary/30 hover:bg-bluePrimary/5 hover:text-white disabled:opacity-50"
            onClick={() => handleOAuth('google')}
            disabled={isBusy}
          >
            {busyAction === 'google' ? 'Google_Redirect...' : 'OAUTH_GOOGLE'}
          </button>
          <button
            type="button"
            className="rounded border border-white/10 bg-white/[0.02] px-3 py-3 font-mono text-[9px] uppercase tracking-widest text-white/60 transition-all hover:border-bluePrimary/30 hover:bg-bluePrimary/5 hover:text-white disabled:opacity-50"
            onClick={() => handleOAuth('github')}
            disabled={isBusy}
          >
            {busyAction === 'github' ? 'GitHub_Redirect...' : 'OAUTH_GITHUB'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            className="rounded border border-white/5 bg-white/[0.01] px-3 py-3 font-mono text-[9px] uppercase tracking-widest text-white/40 transition-all hover:border-white/20 hover:text-white/60 disabled:opacity-50"
            onClick={handleMagicLink}
            disabled={isBusy}
          >
            {busyAction === 'magic-link' ? 'SENDING_LINK...' : 'OTP_MAGIC_LINK'}
          </button>
          <button
            type="button"
            className="rounded border border-white/5 bg-white/[0.01] px-3 py-3 font-mono text-[9px] uppercase tracking-widest text-white/40 transition-all hover:border-white/20 hover:text-white/60 disabled:opacity-50"
            onClick={handlePasswordRecovery}
            disabled={isBusy}
          >
            {busyAction === 'recovery' ? 'RECOVERY_INIT...' : 'KEY_RECOVERY'}
          </button>
        </div>

        <p className="font-mono text-[9px] leading-5 text-white/20 uppercase tracking-tighter">
          Production_Environment: SSL/HTTPS_REQUIRED. Callbacks_Handled_Via{' '}
          <span className="text-bluePrimary">/auth/callback</span>.
          System_Recovery_Node_Located_At{' '}
          <span className="text-bluePrimary">/admin/reset-password</span>.
        </p>
      </form>
    </div>
  );
}

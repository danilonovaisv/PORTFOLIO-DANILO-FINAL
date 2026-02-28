'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase/client';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for auth errors from callback
  useEffect(() => {
    const authError = searchParams.get('error');
    const authMsg = searchParams.get('message');
    if (authError) {
      setError('Erro na autenticação. Por favor, tente novamente.');
    }
    if (authMsg) {
      setSuccessMsg(authMsg);
    }
  }, [searchParams]);

  // Check if already logged in on mount
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    startTransition(async () => {
      try {
        const supabase = createClientComponentClient();

        if (mode === 'signup') {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          });

          if (signUpError) {
            console.error('SignUp error:', signUpError);
            setError(signUpError.message);
            return;
          }

          if (data.session) {
            setIsRedirecting(true);
            router.refresh();
            setTimeout(() => {
              window.location.href = ADMIN_NAVIGATION.dashboard;
            }, 500);
          } else {
            setSuccessMsg(
              'Cadastro realizado. Se necessário, confirme seu email.'
            );
            setMode('login');
          }
          return;
        }

        // Login Mode
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (signInError) {
          console.error('SignIn error:', signInError);
          setError(signInError.message);
          return;
        }

        if (data.session) {
          setIsRedirecting(true);
          router.refresh();
          setTimeout(() => {
            window.location.href = ADMIN_NAVIGATION.dashboard;
          }, 500);
        } else {
          setError('Falha ao estabelecer sessão. Tente novamente.');
        }
      } catch (err) {
        console.error('Auth exception:', err);
        setError('Ocorreu um erro inesperado.');
      }
    });
  };

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
            setError(null);
            setSuccessMsg(null);
          }}
          type="button"
        >
          {mode === 'login' ? 'Fazer Cadastro' : 'Já tenho conta'}
        </button>
      </div>

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

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-600 disabled:opacity-60"
          disabled={isPending || isRedirecting}
        >
          {isRedirecting
            ? 'Redirecionando...'
            : isPending
              ? mode === 'login'
                ? 'Entrando...'
                : 'Cadastrando...'
              : mode === 'login'
                ? 'Entrar'
                : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

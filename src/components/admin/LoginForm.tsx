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
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for auth errors from callback
  useEffect(() => {
    const authError = searchParams.get('error');
    if (authError) {
      setError('Erro na autenticação. Por favor, tente novamente.');
    }
  }, [searchParams]);

  // Check if already logged in on mount
  useEffect(() => {
    // const checkSession = async () => {
    //   const supabase = createClientComponentClient();
    //   // Use getUser instead of getSession for better server consistency
    //   const {
    //     data: { user },
    //   } = await supabase.auth.getUser();
    //   if (user) {
    //     setIsRedirecting(true);
    //     // Ensure server sync before client navigation
    //     router.refresh();
    //     router.replace(ADMIN_NAVIGATION.dashboard);
    //   }
    // };
    // checkSession();
  }, [router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const supabase = createClientComponentClient();
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        if (data.session) {
          setIsRedirecting(true);
          // Important: Refresh ensures Next.js Server Components see the new cookies
          router.refresh();

          // Use a small delay and window.location.href for a full reload
          // This ensures cookies are properly picked up by the server on next load
          setTimeout(() => {
            window.location.href = ADMIN_NAVIGATION.dashboard;
          }, 500);
        } else {
          setError('Falha ao estabelecer sessão. Tente novamente.');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('Ocorreu um erro inesperado.');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Admin
        </p>
        <h1 className="text-2xl font-semibold mt-2">Entrar no painel</h1>
        <p className="text-sm text-slate-400 mt-1">
          Use seu email e senha do Supabase Auth.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Email</span>
          <input
            type="email"
            required
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
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <div className="text-sm text-red-400">{error}</div>}

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-600 disabled:opacity-60"
          disabled={isPending || isRedirecting}
        >
          {isRedirecting
            ? 'Redirecionando...'
            : isPending
              ? 'Entrando...'
              : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

// Client component for login
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase/client';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const supabase = createClientComponentClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
        // Force refresh to update server-side session state
        router.refresh();
        // Use hard navigation to ensure middleware sees the new cookie
        window.location.href = ADMIN_NAVIGATION.dashboard;
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
          disabled={isPending}
        >
          {isPending ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

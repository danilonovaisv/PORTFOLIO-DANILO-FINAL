'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const reportError = async () => {
      try {
        await fetch('/api/report-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            origem: 'Ghost System Portfolio (ADMIN)',
            erro_detectado: error.message,
            componente_afetado: 'src/app/admin',
            stack: error.stack,
            digest: error.digest,
            status: 'CRITICAL_ADMIN_FAILURE',
          }),
          keepalive: true,
        });
      } catch (err) {
        console.warn('Sentinel Prime: Fallback report failed', err);
      }
    };

    void reportError();
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center text-center p-8 bg-background text-text">
      <div className="mb-6 p-4 border border-redAccent/30 bg-redAccent/5 rounded-lg">
        <h2 className="text-xl font-bold text-redAccent flex items-center gap-2">
          <span>⚠️</span> Falha Crítica no Painel Admin
        </h2>
      </div>
      <p className="mb-8 text-textSecondary max-w-lg">
        Ocorreu um erro inesperado ao processar dados administrativos.
        Recomendamos recarregar a página ou verificar a conexão com o Supabase.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-redAccent px-6 py-3 font-bold text-text transition-all hover:bg-redAccent/80"
        >
          Tentar Novamente
        </button>
        <button
          onClick={() => (window.location.href = '/')}
          className="rounded-lg border border-text/20 px-6 py-3 font-bold text-text hover:bg-text/10"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}

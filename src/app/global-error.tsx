'use client';

import React, { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Custom global error boundary to avoid Next.js preview instability when prerendering the default fallback.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error boundary caught an error:', error);
  }, [error]);

  return (
    <html>
      <body className="bg-black text-white min-h-screen flex items-center justify-center px-6">
        <div className="max-w-xl text-center space-y-4">
          <p className="text-sm uppercase tracking-wide text-white/70">
            Algo deu errado
          </p>
          <h1 className="text-3xl font-semibold">
            Não foi possível carregar a página.
          </h1>
          {error?.digest && (
            <p className="text-xs text-white/60 break-all">
              Código: {error.digest}
            </p>
          )}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              Tentar novamente
            </button>
            <a
              href="/"
              className="px-4 py-2 rounded-lg border border-white/30 text-white hover:border-white transition"
            >
              Voltar ao início
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

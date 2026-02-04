'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body className="bg-background text-foreground">
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h2 className="mb-4 text-2xl font-bold text-destructive">
            Ops! Algo deu errado.
          </h2>
          <p className="mb-4 text-muted-foreground">
            {error.message || 'Ocorreu um erro na aplicação.'}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Tentar novamente
            </button>

            {/* Use Link instead of <a> tag */}
            <Link
              href="/"
              className="rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

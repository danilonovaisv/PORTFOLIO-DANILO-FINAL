'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SobreError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log técnico preservado exclusivamente para telemetria/observabilidade
    console.error('SobreRouteErrorBoundary:', error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-text">
      <div className="max-w-md space-y-6 text-center">
        <p className="text-small font-medium uppercase tracking-[0.2em] text-blueAccent">
          Ghost System · Recuperação
        </p>

        <h1 className="text-h2 font-bold tracking-tight text-text">
          Algo inesperado aconteceu
        </h1>

        <p className="text-body text-textSecondary leading-relaxed">
          Tivemos uma oscilação temporária ao carregar a página. Você pode tentar
          novamente ou continuar navegando pelas outras áreas.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-bluePrimary bg-bluePrimary/15 px-6 py-2.5 text-small font-medium text-text transition-all hover:bg-bluePrimary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bluePrimary cursor-pointer"
          >
            Tentar novamente
          </button>

          <Link
            href="/portfolio"
            className="rounded-full border border-white/20 px-6 py-2.5 text-small font-medium text-textSecondary transition-all hover:border-white/50 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Ver portfólio
          </Link>
        </div>
      </div>
    </div>
  );
}

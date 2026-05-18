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
            message: error.message,
            stack: error.stack,
            component: 'src/app/projects',
            url: window.location.href,
            metadata: {
              digest: error.digest,
              status: 'ERROR_BOUNDARY_TRIGGERED',
              origem: 'Ghost System Projects',
            },
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
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center text-center p-6 bg-background">
      <h2 className="mb-4 text-2xl font-sans text-redAccent">
        Erro no Projeto
      </h2>
      <p className="mb-8 text-textSecondary opacity-60 max-w-md">
        Não foi possível carregar os detalhes deste projeto. O erro foi
        reportado e estamos trabalhando nisso.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-bluePrimary px-8 py-4 font-bold text-text transition-all hover:opacity-90 active:opacity-80"
      >
        Tentar Novamente
      </button>
    </div>
  );
}

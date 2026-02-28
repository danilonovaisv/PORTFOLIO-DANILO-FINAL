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
    const reportarErroWeb = async () => {
      try {
        await fetch('/api/report-error', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            erroMensagem: error.message,
            stack: error.stack,
            digest: error.digest,
            componente: 'Client Error Boundary',
            url: window.location.href,
          }),
          keepalive: true,
        });
      } catch (err) {
        console.warn('Falha ao enviar erro para /api/report-error:', err);
      }
    };

    void reportarErroWeb();
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <h2 className="mb-4 text-2xl font-bold text-accentRed">
        Something went wrong!
      </h2>
      <p className="mb-8 text-textInverse/60">
        Our specific error reporting system has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-xl bg-bluePrimary px-6 py-3 font-bold text-white transition-all hover:bg-bluePrimary/90 active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}

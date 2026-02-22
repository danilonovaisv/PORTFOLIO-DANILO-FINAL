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
        // Report to Sentinel Prime API
        const reportError = async () => {
            try {
                await fetch('/api/report-error', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        origem: 'Ghost System Portfolio',
                        erro_detectado: error.message,
                        componente_afetado: 'src/app/portfolio',
                        stack: error.stack,
                        digest: error.digest,
                        status: 'ERROR_BOUNDARY_TRIGGERED'
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
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center text-center p-6">
            <h2 className="mb-4 text-2xl font-display text-accentRed">
                Erro na Galeria
            </h2>
            <p className="mb-8 text-textSecondary opacity-60 max-w-md">
                Ocorreu um problema ao carregar os projetos. Nosso sistema de monitoramento já foi notificado.
            </p>
            <button
                onClick={() => reset()}
                className="rounded-full bg-bluePrimary px-8 py-4 font-bold text-white transition-all hover:scale-105 active:scale-95"
            >
                Tentar Novamente
            </button>
        </div>
    );
}

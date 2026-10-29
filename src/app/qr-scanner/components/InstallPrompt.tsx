'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PWAInstallPrompt, BeforeInstallPromptEvent } from '@/app/qr-scanner/types';

interface InstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
}

export function InstallPrompt({ onInstall, onDismiss }: InstallPromptProps) {
  const [prompt, setPrompt] = useState<PWAInstallPrompt | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // Verificar se já foi dispensado nesta sessão
    if (sessionStorage.getItem('pwa-install-dismissed')) {
      return;
    }

    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPrompt({ event: e, canShow: true });
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!prompt) return;

    try {
      await prompt.event.prompt();
      const choice = await prompt.event.userChoice;
      if (choice.outcome === 'accepted') {
        onInstall?.();
        setDismissed(true);
        sessionStorage.setItem('pwa-install-installed', 'true');
      }
      setPrompt(null);
    } catch (err) {
      console.error('Erro ao instalar PWA:', err);
    }
  }, [prompt, onInstall]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem('pwa-install-dismissed', 'true');
    onDismiss?.();
  }, [onDismiss]);

  if (!prompt || dismissed || prompt.canShow === false) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-96 z-40 animate-slide-up">
      <div className="bg-ghost-surface rounded-2xl border border-ghost-deep-blue/30 p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-ghost-deep-blue/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-ghost-deep-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-ghost-text-primary">
              Instalar Scanner QR
            </h3>
            <p className="text-xs text-ghost-text-muted mt-0.5">
              Adicione à tela inicial para acesso rápido offline
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleInstall}
            className="flex-1 py-2 px-3 text-sm font-medium text-ghost-void-black bg-ghost-deep-blue rounded-lg hover:opacity-90 transition-opacity"
          >
            Instalar
          </button>
          <button
            onClick={handleDismiss}
            className="py-2 px-3 text-sm font-medium text-ghost-deep-blue bg-transparent border border-ghost-deep-blue/50 rounded-lg hover:bg-ghost-deep-blue/10 transition-colors"
          >
            Depois
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';

/**
 * Registra o Service Worker para PWA
 */
export function registerSW() {
  if (typeof window === 'undefined') return;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/qr-scanner/' })
        .then((registration) => {
          // Verificar atualizações de versão em segundo plano
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Notificar que nova versão foi instalada
                  window.dispatchEvent(new CustomEvent('pwa-update-available'));
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('[SW] Falha no registro:', error);
        });
    });
  }
}

/**
 * Hook para usar em componentes
 */
export function useSWRegistration() {
  useEffect(() => {
    registerSW();
  }, []);
}

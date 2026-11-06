'use client';

import { useEffect } from 'react';

/**
 * Registra o Service Worker para PWA
 */
export function registerSW() {
  if (typeof window === 'undefined') return;

  // Em desenvolvimento, desregistrar o Service Worker e limpar caches para evitar stale chunks
  if (process.env.NODE_ENV === 'development') {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
    if ('caches' in window) {
      caches.keys().then((keys) => {
        for (const key of keys) {
          caches.delete(key);
        }
      });
    }
    return;
  }

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
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
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

import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Verifica suporte a matchMedia
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    // Compatibilidade com Safari antigo
    try {
      mediaQuery.addEventListener('change', handleChange);
    } catch {
      try {
        mediaQuery.addListener(handleChange);
      } catch {
        console.warn('Media Query listener not supported');
      }
    }

    return () => {
      try {
        mediaQuery.removeEventListener('change', handleChange);
      } catch {
        try {
          mediaQuery.removeListener(handleChange);
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return prefersReducedMotion;
}

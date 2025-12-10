'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Combina o hook do Framer Motion com matchMedia para funcionar
// tanto em contextos com/sem AnimatePresence quanto no SSR.
export default function usePrefersReducedMotion(): boolean {
  const framerPrefersReduce = useReducedMotion();
  const [prefersReduce, setPrefersReduce] = useState<boolean>(
    framerPrefersReduce ?? false
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () =>
      setPrefersReduce(
        framerPrefersReduce !== undefined
          ? Boolean(framerPrefersReduce)
          : mediaQuery.matches
      );

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, [framerPrefersReduce]);

  return prefersReduce;
}

'use client';

import { useEffect, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onChange = () => {
      setReduced(mq.matches);
    };

    onChange();
    mq.addEventListener?.('change', onChange);

    return () => {
      mq.removeEventListener?.('change', onChange);
    };
  }, []);

  return reduced;
}

// hooks/useHeroScrollProgress.ts
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

export function useHeroScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // entra/saí da viewport
  });

  const intensity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 1, 0.2] // mais forte no meio
  );

  return { ref, scrollYProgress, intensity };
}

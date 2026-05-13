'use client';

import { m, useTransform } from 'motion/react';
import { beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefOverlay() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  // No keyframes GSAP: [{ opacity: 0.1 }, { opacity: 0 }]
  // Mapeamos o scroll total [0, 0.5, 1] para [0, 0.1, 0] para um efeito sutil de overlay durante a transição
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-black"
      style={{ 
        zIndex: beliefZIndex.overlay, 
        opacity: shouldReduceMotion ? 0.05 : opacity 
      }}
    />
  );
}

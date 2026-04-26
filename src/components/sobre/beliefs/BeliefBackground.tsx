'use client';

import {
  motion,
  cubicBezier,
} from 'motion/react';
import { GHOST_EASE_AMBIENT } from '@/config/motion';
import { useBeliefStore } from '@/store/beliefStore';

interface BeliefBackgroundProps {
  prefersReducedMotion?: boolean;
}

export function BeliefBackground({
  prefersReducedMotion,
}: BeliefBackgroundProps) {
  const bgColor = useBeliefStore((s) => s.bgColor);
  const ambientEase = cubicBezier(...GHOST_EASE_AMBIENT);

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      data-testid="beliefs-background"
      animate={{ backgroundColor: bgColor }}
      transition={{ 
        duration: 0.8, 
        ease: ambientEase 
      }}
      aria-hidden="true"
    />
  );
}

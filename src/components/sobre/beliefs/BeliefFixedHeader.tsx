'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';
import { MOTION_TOKENS } from '@/config/motion';

interface BeliefFixedHeaderProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

export function BeliefFixedHeader({
  scrollProgress,
  prefersReducedMotion,
}: BeliefFixedHeaderProps) {
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const x = useTransform(
    scrollProgress,
    [0, 0.1, 0.9, 1],
    [MOTION_TOKENS.distance.headerX, 0, 0, MOTION_TOKENS.distance.headerX]
  );

  return (
    <motion.header
      className="fixed top-[19vh] md:top-0 right-0 z-30 max-w-sm text-right p-6 md:p-12 pointer-events-none"
      data-testid="beliefs-header"
      style={{
        opacity,
        x: prefersReducedMotion ? 0 : x,
      }}
      aria-label="Acredito no design que muda o dia de alguém"
    >
      <p className="font-display text-sm md:text-base uppercase tracking-widest text-white/70 mb-2">
        Acredito no design que muda o dia de alguém.
      </p>
      <p className="font-h1 font-bold text-lg md:text-xl text-white">
        Não pelo choque, mas pela conexão.
      </p>
    </motion.header>
  );
}

'use client';

import {
  motion,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react';
import { useState } from 'react';
import { MOTION_TOKENS } from '@/config/motion';
import { AccessibleSplitText } from '@/components/motion/AccessibleSplitText';

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

  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(scrollProgress, 'change', (v) => {
    setIsActive(v > 0.05 && v < 0.95);
  });

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
      <div className="font-display text-sm md:text-base uppercase tracking-widest text-white/70 mb-2">
        <AccessibleSplitText
          text="Acredito no design que muda o dia de alguém."
          tag="p"
          trigger={isActive}
          stagger={0.02}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      <div className="font-h1 font-bold text-lg md:text-xl text-white">
        <AccessibleSplitText
          text="Não pelo choque, mas pela conexão."
          tag="p"
          trigger={isActive}
          stagger={0.03}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </motion.header>
  );
}

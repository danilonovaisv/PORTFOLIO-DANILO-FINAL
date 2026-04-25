'use client';

import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useEffect, useState } from 'react';
import { SplitText } from '@/lib/motion/split-text';
import { GHOST_EASE } from '@/config/motion';

interface BeliefFixedHeaderProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion?: boolean;
}

export const BeliefFixedHeader = ({
  scrollProgress,
  prefersReducedMotion = false,
}: BeliefFixedHeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const unsubscribe = scrollProgress.on('change', (value) => {
      setIsVisible(value <= 0.985);
    });

    return () => unsubscribe();
  }, [prefersReducedMotion, scrollProgress]);

  const opacity = useTransform(
    scrollProgress,
    [0, 0.04, 0.98, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [0, 0.06, 0.98, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [18, 0, 0, -12]
  );
  const blur = useTransform(
    scrollProgress,
    [0, 0.04, 0.98, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [8, 0, 0, 8]
  );
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.header
      className="fixed inset-x-0 top-[14vh] md:top-0 z-[var(--z-layer-header)] w-full py-8 pointer-events-none"
      style={{
        opacity: prefersReducedMotion ? 1 : isVisible ? opacity : 0,
        y: prefersReducedMotion ? 0 : isVisible ? y : -12,
        filter,
      }}
      aria-label="Acredito no design que muda o dia de alguém"
    >
      <div className="mx-auto flex w-full max-w-[1680px] justify-end px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-xs text-right md:max-w-sm lg:max-w-md">
          <p className="font-display text-sm md:text-base text-white/70 uppercase tracking-widest leading-relaxed">
            <SplitText
              text="Acredito no design que muda o dia de alguém."
              mode="words"
              transition={{ duration: 0.5, ease: GHOST_EASE }}
            />
          </p>

          <h2 className="mt-2 font-h1 text-lg font-bold leading-tight text-white md:text-xl">
            <SplitText
              text="Não pelo choque, mas pela conexão."
              mode="words"
              transition={{ duration: 0.5, ease: GHOST_EASE }}
            />
          </h2>
        </div>
      </div>
    </motion.header>
  );
};

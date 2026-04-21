'use client';

/**
 * BeliefManifesto — Layer 4 (z-50).
 * Texto final "ISSO É GHOST DESIGN." — clímax da seção.
 *
 * CRÍTICO: z-50 aqui é INTENCIONAL e CORRETO.
 * O GhostCanvas está em z-30. No clímax (scroll > 0.82), o manifesto
 * precisa aparecer ACIMA do Ghost — daí o z-50 exclusivo desta camada.
 *
 * • Reveal entre scrollProgress 0.82 → 0.90
 * • translateY: 18px → 0 (máximo do GDS)
 * • prefersReducedMotion: opacity estático 1, y estático 0
 * • position: fixed — flutua sobre o scroll no clímax final
 */

import { motion, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useState } from 'react';

interface BeliefManifestoProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion?: boolean;
}

export const BeliefManifesto = ({
  scrollProgress,
  prefersReducedMotion = false,
}: BeliefManifestoProps) => {
  const [isActive, setIsActive] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsActive(true);
      return;
    }

    const unsubscribe = scrollProgress.on('change', (value) => {
      setIsActive(value >= 0.82);
    });

    return () => unsubscribe();
  }, [prefersReducedMotion, scrollProgress]);

  const opacity = useTransform(
    scrollProgress,
    [0.82, 0.9, 1.0],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1]
  );

  const y = useTransform(
    scrollProgress,
    [0.82, 0.92],
    prefersReducedMotion ? [0, 0] : [18, 0]
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 w-full
                 flex items-center justify-center
                 pointer-events-none"
      style={{ opacity, y }}
      aria-live={isActive ? 'polite' : undefined}
      aria-atomic={isActive ? 'true' : undefined}
    >
      <div className="text-center px-4 md:px-6">
        <p
          className="font-display font-black text-white
                     tracking-[0.03em] leading-[0.82]"
          style={{ fontSize: 'clamp(3.5rem, 16vw, 12rem)' }}
        >
          ISSO É
          <br />
          GHOST
          <br />
          DESIGN
        </p>
      </div>
    </motion.div>
  );
};

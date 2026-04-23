'use client';

/**
 * BeliefManifesto — Layer 4 (z-50).
 * Texto final "ISSO É GHOST DESIGN." — clímax da seção.
 *
 * CRÍTICO: z-50 aqui é INTENCIONAL.
 * O manifesto ocupa o plano tipográfico do clímax, enquanto o Ghost da seção
 * permanece visualmente acima em z-70 para sobrepor a palavra "GHOST", como
 * nas imagens canônicas da seção 06.
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
      setIsActive(value >= 0.56);
    });

    return () => unsubscribe();
  }, [prefersReducedMotion, scrollProgress]);

  const opacity = useTransform(
    scrollProgress,
    [0.56, 0.68, 1.0],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1]
  );

  const y = useTransform(
    scrollProgress,
    [0.56, 0.72],
    prefersReducedMotion ? [0, 0] : [18, 0]
  );

  return (
    <motion.div
      data-testid="beliefs-manifesto"
      className="fixed inset-0 z-[var(--z-layer-overlay)] w-full
                 flex items-center justify-center
                 pointer-events-none"
      style={{ opacity, y }}
      aria-live={isActive ? 'polite' : undefined}
      aria-atomic={isActive ? 'true' : undefined}
    >
      <div className="mx-auto w-full max-w-[1680px] px-4 text-center md:px-6 lg:px-16 xl:px-24">
        <p
          className="font-display font-black text-white
                     tracking-[0.03em] leading-[0.82]"
          style={{ fontSize: 'clamp(4rem, 17vw, 13rem)' }}
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

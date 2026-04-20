'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

interface BeliefManifestoProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion?: boolean;
}

/**
 * Manifesto final "ISSO É GHOST DESIGN."
 * Renderizado em z-50 para ficar ACIMA do GhostCanvas (z-30).
 * Reveal entre scroll 0.85 e 1.0.
 */
export const BeliefManifesto = ({
  scrollProgress,
  prefersReducedMotion = false,
}: BeliefManifestoProps) => {
  const opacity = useTransform(
    scrollProgress,
    [0.82, 0.90, 1.0],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1]
  );
  const y = useTransform(
    scrollProgress,
    [0.82, 0.92],
    prefersReducedMotion ? [0, 0] : [18, 0]
  );

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-50 w-full flex items-center justify-center pb-[8vh] md:pb-[12vh] pointer-events-none"
      style={{ opacity, y }}
      aria-live="polite"
    >
      <div className="text-center">
        <p
          className="font-display font-black text-white tracking-[0.15em] leading-[0.95]"
          style={{ fontSize: 'clamp(1.75rem, 6vw, 4.5rem)' }}
        >
          ISSO É <span className="text-[#4fe6ff]">GHOST DESIGN.</span>
        </p>
      </div>
    </motion.div>
  );
};

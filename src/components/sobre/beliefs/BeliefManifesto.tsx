'use client';

import { motion, useTransform } from 'motion/react';
import { SplitText } from '@/lib/motion/split-text';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

/**
 * Manifesto final "ISSO É GHOST DESIGN."
 * Renderizado em z-50 para ficar ACIMA do GhostCanvas (z-30).
 * Reveal entre scroll 0.85 e 1.0.
 */
export const BeliefManifesto = () => {
  const { scrollYProgress: scrollProgress, prefersReducedMotion = false } =
    useBeliefsScrollContext();

  const opacity = useTransform(
    scrollProgress,
    [0.82, 0.9, 1.0],
    prefersReducedMotion ? [0, 1, 1] : [0, 1, 1]
  );
  const y = useTransform(
    scrollProgress,
    [0.82, 0.92],
    prefersReducedMotion ? [0, 0] : [18, 0]
  );
  const letterSpacing = useTransform(
    scrollProgress,
    [0.82, 0.96],
    prefersReducedMotion ? ['0.08em', '0.08em'] : ['0.18em', '0.08em']
  );

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-50 w-full flex items-center justify-center px-6 pb-[8vh] md:pb-[12vh] pointer-events-none"
      style={{ opacity, y, letterSpacing }}
      aria-live="polite"
    >
      <div className="text-center">
        <motion.p
          className="font-display font-black text-white leading-[0.95]"
          style={{ fontSize: 'clamp(1.75rem, 6vw, 4.5rem)' }}
        >
          <SplitText
            text="ISSO É"
            mode="chars"
            className="block"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
          <SplitText
            text="GHOST DESIGN."
            mode="chars"
            className="mt-2 block text-[#4fe6ff]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.p>
      </div>
    </motion.div>
  );
};

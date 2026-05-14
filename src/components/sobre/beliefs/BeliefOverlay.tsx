'use client';

import { useTransform, motion } from 'framer-motion';
import { beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefOverlay() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  // Recreate the keyframe-based opacity scrub [0 -> 0.1 -> 0]
  // Since scrollYProgress is [start start, end end], we map it across the section duration
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.1, 0]
  );

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-black"
      style={{
        zIndex: beliefZIndex.overlay,
        opacity: shouldReduceMotion ? 0.05 : opacity,
      }}
    />
  );
}

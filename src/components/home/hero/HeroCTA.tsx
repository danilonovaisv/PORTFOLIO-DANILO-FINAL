'use client';

import { motion, Variants } from 'framer-motion';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { HOME_CONTENT } from '@/config/content';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

import { useMotionGate } from '@/hooks/useMotionGate';

const itemAnimation: Variants = {
  initial: { opacity: 0, y: MOTION_TOKENS.offset.standard },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
      delay: 1.0,
    },
  },
};

export default function HeroCTA() {
  const shouldReduceMotion = useMotionGate();

  // isLoaded check removed for immediate LCP
  // if (!isLoaded) return null;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : 'initial'}
      animate={shouldReduceMotion ? { opacity: 1, y: 0 } : 'animate'}
      variants={itemAnimation}
      className="flex justify-center pointer-events-auto"
    >
      <AntigravityCTA
        href="/sobre"
        text={HOME_CONTENT.hero.cta}
        className="relative"
      />
    </motion.div>
  );
}

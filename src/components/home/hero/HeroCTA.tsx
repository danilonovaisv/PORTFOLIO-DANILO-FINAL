'use client';

import { motion, Variants } from 'framer-motion';
import HeroAntigravityCTA from '@/components/ui/HeroAntigravityCTA';

const itemAnimation: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 1.0,
    },
  },
};

export default function HeroCTA({ isLoaded = true }: { isLoaded?: boolean }) {
  if (!isLoaded) return null;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={itemAnimation}
      className="flex justify-center pointer-events-auto"
    >
      <HeroAntigravityCTA href="/sobre" text="step inside" />
    </motion.div>
  );
}

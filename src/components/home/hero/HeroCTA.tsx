'use client';

import { m } from 'motion/react';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { HOME_CONTENT } from '@/config/content';
import { ctaVariants } from '@/lib/motion';
import { useMotionGate } from '@/hooks/useMotionGate';

export default function HeroCTA() {
  const shouldReduceMotion = useMotionGate();

  // isLoaded check removed for immediate LCP
  // if (!isLoaded) return null;

  return (
    <m.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : 'initial'}
      animate={shouldReduceMotion ? { opacity: 1, y: 0 } : 'animate'}
      variants={ctaVariants}
      className="flex justify-center pointer-events-auto"
    >
      <AntigravityCTA
        href="/sobre"
        text={HOME_CONTENT.hero.cta}
        className="relative"
      />
    </m.div>
  );
}

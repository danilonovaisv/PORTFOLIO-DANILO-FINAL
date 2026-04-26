'use client';

import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useState } from 'react';
import { MOTION_TOKENS } from '@/config/motion';
import { SplitText } from '@/components/ui/SplitText';

interface BeliefManifestoProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

export function BeliefManifesto({
  scrollProgress,
  prefersReducedMotion,
}: BeliefManifestoProps) {
  const opacity = useTransform(scrollProgress, [0.82, 0.9, 1], [0, 1, 1]);
  const y = useTransform(
    scrollProgress,
    [0.82, 0.92, 1],
    [MOTION_TOKENS.distance.textY, 0, 0]
  );
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(scrollProgress, 'change', (value) => {
    setIsActive(value > 0.8);
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      data-testid="beliefs-manifesto"
      style={{ opacity, y: prefersReducedMotion ? 0 : y }}
      aria-live={isActive ? 'polite' : 'off'}
      aria-atomic={isActive ? 'true' : undefined}
    >
      <div
        className="text-center font-display font-black text-white tracking-[0.03em] leading-[0.82]"
        style={{ fontSize: 'clamp(3.5rem, 16vw, 12rem)' }}
      >
        {prefersReducedMotion ? (
          <>
            <span className="block">ISSO É</span>
            <span className="block">GHOST</span>
            <span className="block">DESIGN</span>
          </>
        ) : (
          <>
            <span className="block overflow-hidden"><SplitText text="ISSO É" trigger={isActive} stagger={0.05} /></span>
            <span className="block overflow-hidden"><SplitText text="GHOST" trigger={isActive} stagger={0.05} /></span>
            <span className="block overflow-hidden"><SplitText text="DESIGN" trigger={isActive} stagger={0.05} /></span>
          </>
        )}
      </div>
    </motion.div>
  );
}

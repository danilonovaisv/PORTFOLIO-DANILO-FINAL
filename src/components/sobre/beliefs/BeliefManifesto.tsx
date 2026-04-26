'use client';

import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useState } from 'react';
import { MOTION_TOKENS } from '@/config/motion';
import { AccessibleSplitText } from '@/components/motion/AccessibleSplitText';

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
      <blockquote
        className="text-center font-display font-black text-white tracking-[0.03em] leading-[0.82]"
        style={{ fontSize: 'clamp(3.5rem, 16vw, 12rem)' }}
      >
        <span className="block overflow-hidden">
          <AccessibleSplitText
            text="ISSO É"
            tag="span"
            trigger={isActive}
            stagger={0.05}
            prefersReducedMotion={prefersReducedMotion}
          />
        </span>
        <span className="block overflow-hidden">
          <AccessibleSplitText
            text="GHOST"
            tag="span"
            trigger={isActive}
            stagger={0.05}
            prefersReducedMotion={prefersReducedMotion}
          />
        </span>
        <span className="block overflow-hidden">
          <AccessibleSplitText
            text="DESIGN"
            tag="span"
            trigger={isActive}
            stagger={0.05}
            prefersReducedMotion={prefersReducedMotion}
          />
        </span>
      </blockquote>
    </motion.div>
  );
}

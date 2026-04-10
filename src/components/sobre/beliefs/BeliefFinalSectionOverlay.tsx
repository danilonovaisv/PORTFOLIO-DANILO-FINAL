'use client';

import React from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion';

interface BeliefFinalSectionOverlayProps {
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
  showProgress?: MotionValue<number>; // 0 → 1 as manifesto scrolls in
}

export const BeliefFinalSectionOverlay: React.FC<
  BeliefFinalSectionOverlayProps
> = ({ MotionDiv, prefersReducedMotion, showProgress }) => {
  const Container = MotionDiv ?? motion.div;

  // Scroll-driven entrance transforms derived from showProgress (0 → 1).
  // Runs only when the manifesto area is reached — not at mount.
  const staticProgress = useMotionValue(1);
  const progress = showProgress ?? staticProgress;

  const y = useTransform(progress, [0, 1], [48, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const filter = useTransform(progress, [0, 0.7], ['blur(14px)', 'blur(0px)']);

  const containerStyle = prefersReducedMotion ? {} : { y, scale, filter };

  return (
    <section className="flex h-full w-full items-center justify-center px-4 md:px-6 pointer-events-none">
      <Container
        className="flex w-full max-w-[100vw] flex-col items-center justify-center text-center font-display leading-[0.82] text-[#fcffff]"
        style={containerStyle}
      >
        <div className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight uppercase opacity-80">
          ISSO É
        </div>
        <div className="relative z-10 text-[clamp(6rem,19vw,17rem)] font-black tracking-[-0.085em] uppercase">
          GHOST
        </div>
        <div className="mt-[-1vw] text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight uppercase opacity-80">
          DESIGN
        </div>
      </Container>
    </section>
  );
};

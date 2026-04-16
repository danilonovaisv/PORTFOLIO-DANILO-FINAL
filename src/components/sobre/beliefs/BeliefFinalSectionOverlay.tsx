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
        className="flex w-full max-w-[98vw] flex-col items-center justify-center text-center font-display leading-[0.78] text-[#fcffff]"
        style={containerStyle}
      >
        {/* Line 1: ISSO É — large but secondary */}
        <div className="text-[16vw] md:text-[14rem] font-black tracking-[-0.085em] uppercase mix-blend-overlay opacity-80">
          ISSO É
        </div>

        {/* Line 2: GHOST — dominant element, fills viewport */}
        <div className="relative z-10 text-[30vw] md:text-[25rem] font-black tracking-[-0.085em] uppercase text-bluePrimary drop-shadow-[0_0_80px_rgba(0,72,255,0.6)] mix-blend-screen">
          GHOST
        </div>

        {/* Line 3: DESIGN — large but secondary */}
        <div className="mt-[-1vw] text-[24vw] md:text-[19rem] font-black tracking-[-0.085em] uppercase mix-blend-overlay opacity-80">
          DESIGN
        </div>
      </Container>
    </section>
  );
};

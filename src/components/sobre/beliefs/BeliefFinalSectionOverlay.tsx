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
  const opacity = useTransform(progress, [0, 0.15, 1], [0, 0, 1]);

  const containerStyle = prefersReducedMotion
    ? { opacity: 1 }
    : { y, scale, filter, opacity };

  return (
    <section className="pointer-events-none absolute inset-0 z-40 flex h-full w-full items-center justify-center px-4 md:px-6">
      <Container
        className="flex w-full max-w-[98vw] flex-col items-center justify-center text-center font-display leading-[0.8] text-[#fcffff]"
        style={containerStyle}
      >
        {/* Line 1: ISSO É — large but secondary */}
        <div className="text-[15vw] font-black uppercase tracking-[-0.08em] text-white/80 md:text-[11rem]">
          ISSO É
        </div>

        {/* Line 2: GHOST — dominant element, fills viewport */}
        <div className="relative z-10 text-[29vw] font-black uppercase tracking-[-0.09em] text-bluePrimary drop-shadow-[0_0_48px_rgba(0,72,255,0.35)] md:text-[18rem]">
          GHOST
        </div>

        {/* Line 3: DESIGN — large but secondary */}
        <div className="mt-[-0.6vw] text-[22vw] font-black uppercase tracking-[-0.085em] text-white/82 md:text-[14rem]">
          DESIGN
        </div>
      </Container>
    </section>
  );
};

'use client';

import React from 'react';
import { motion, cubicBezier } from 'framer-motion';
import { GHOST_EASE, viewportConfig } from '@/config/motion';

interface BeliefFinalSectionOverlayProps {
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

export const BeliefFinalSectionOverlay: React.FC<
  BeliefFinalSectionOverlayProps
> = ({ MotionDiv, prefersReducedMotion }) => {
  const ghostEase = cubicBezier(...GHOST_EASE);
  const Container = MotionDiv ?? motion.div;
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
        whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
        viewport: viewportConfig,
        transition: { duration: 0.8, ease: ghostEase },
      };
  return (
    <section className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 pointer-events-none">
      <Container
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.84] w-full max-w-[100vw]"
        {...motionProps}
      >
        <div className="text-[12vw] md:text-[10rem] tracking-[-0.08em] uppercase font-black text-white/80">
          ISSO É
        </div>
        <div className="text-[21vw] md:text-[17rem] font-black tracking-[-0.08em] uppercase relative z-10">
          GHOST
        </div>
        <div className="text-[17vw] md:text-[13rem] tracking-[-0.08em] uppercase font-black text-white/80">
          DESIGN
        </div>
      </Container>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BeliefFinalSectionOverlayProps {
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

export const BeliefFinalSectionOverlay: React.FC<
  BeliefFinalSectionOverlayProps
> = ({ MotionDiv }) => {
  const Container = MotionDiv ?? motion.div;
  return (
    <section className="flex h-full w-full items-center justify-center overflow-hidden px-4 md:px-6 pointer-events-none">
      <Container
        className="flex w-full max-w-[100vw] flex-col items-center justify-center text-center font-display leading-[0.82] text-white"
      >
        <div className="text-[12vw] md:text-[10rem] tracking-[-0.085em] uppercase font-black">
          ISSO É
        </div>
        <div className="relative z-10 text-[21vw] md:text-[17rem] font-black tracking-[-0.085em] uppercase">
          GHOST
        </div>
        <div className="text-[17vw] md:text-[13rem] tracking-[-0.085em] uppercase font-black">
          DESIGN.
        </div>
      </Container>
    </section>
  );
};

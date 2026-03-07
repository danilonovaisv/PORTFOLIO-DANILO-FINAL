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
    <section className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-4 pointer-events-none">
      <Container
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
        {...motionProps}
      >
        {/* 🟣 [CONFIG VISUAL]: "ISSO É" - Tamanho (16vw a 14rem), Cor branca (herdada), Opacidade 80% */}
        <div className="text-[16vw] md:text-[14rem] tracking-tighter uppercase font-black mix-blend-overlay opacity-80">
          ISSO É
        </div>
        {/* 🟣 [CONFIG VISUAL]: "GHOST" - Tamanho (30vw a 25rem), Cor branca (herdada) */}
        <div className="text-[30vw] md:text-[25rem] font-black tracking-tighter uppercase relative z-10">
          GHOST
        </div>
        {/* 🟣 [CONFIG VISUAL]: "DESIGN" - Tamanho (24vw a 19rem), Cor branca (herdada), Opacidade 80% */}
        <div className="text-[24vw] md:text-[19rem] tracking-tighter uppercase font-black mix-blend-overlay opacity-80">
          DESIGN
        </div>
      </Container>
    </section>
  );
};

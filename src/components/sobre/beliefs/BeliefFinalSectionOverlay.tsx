'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';

interface BeliefFinalSectionOverlayProps {
  visible: boolean;
  progress: number;
}

export const BeliefFinalSectionOverlay: React.FC<BeliefFinalSectionOverlayProps> = ({
  visible,
  progress,
}) => {
  const safeProgress = Math.max(0, Math.min(1, progress));
  const opacity = visible ? safeProgress : 0;
  const y = 24 - safeProgress * 24;
  const blur = `blur(${Math.max(0, 10 - safeProgress * 10)}px)`;

  return (
    <section className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-4 pointer-events-none">
      <motion.div
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
        animate={{ opacity, y, filter: blur }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-[16vw] text-white/85 md:text-[14rem] tracking-tighter uppercase font-black">
          ISSO É
        </div>
        <div
          className="text-[30vw] md:text-[25rem] font-black tracking-tighter uppercase relative z-10"
          style={{ color: BRAND.colors.bluePrimary }}
        >
          GHOST
        </div>
        <div className="text-[24vw] text-white/85 md:text-[19rem] tracking-tighter uppercase font-black">
          DESIGN
        </div>
      </motion.div>
    </section>
  );
};

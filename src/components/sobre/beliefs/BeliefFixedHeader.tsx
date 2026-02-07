'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface BeliefFixedHeaderProps {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
}

export function BeliefFixedHeader({
  opacity,
  progress,
}: BeliefFixedHeaderProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full p-6 z-50 pointer-events-none mix-blend-difference"
      style={{ opacity }}
    >
      <div className="flex justify-between items-center w-full max-w-[1920px] mx-auto text-white">
        <span className="text-sm uppercase tracking-widest font-bold opacity-80 backdrop-blur-sm bg-black/20 px-2 py-1 rounded-sm">
          MANIFESTO
        </span>
        <span className="text-sm uppercase tracking-widest opacity-60 backdrop-blur-sm bg-black/20 px-2 py-1 rounded-sm hidden md:block">
          {new Date().getFullYear()}
        </span>
      </div>

      {/* Top progress bar (optional visual cue) */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20">
        <motion.div
          className="h-full bg-white origin-left"
          style={{ scaleX: progress }}
        />
      </div>
    </motion.div>
  );
}

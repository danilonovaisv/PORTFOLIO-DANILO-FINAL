'use client';

import React, { useRef } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface BeliefFinalSectionProps {
  bgColor: string;
  scrollProgress?: MotionValue<number>;
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  bgColor,
  scrollProgress: _scrollProgress,
}) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      style={{ backgroundColor: bgColor }}
      className="w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      <motion.div
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.85] w-full max-w-[98vw]"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-[clamp(3.5rem,12vw,10rem)] font-bold tracking-[0.15em] uppercase leading-none drop-shadow-[0_0_40px_rgba(79,230,255,0.4)]">
          ISSO É
        </div>
        <div className="text-[clamp(3.5rem,12vw,10rem)] font-bold tracking-[0.15em] uppercase leading-none mt-1 md:mt-2 drop-shadow-[0_0_40px_rgba(79,230,255,0.4)]">
          GHOST
        </div>
        <div className="text-[clamp(3.5rem,12vw,10rem)] font-bold tracking-[0.15em] uppercase leading-none mt-1 md:mt-2 drop-shadow-[0_0_40px_rgba(79,230,255,0.4)]">
          DESIGN
        </div>
      </motion.div>
    </section>
  );
};

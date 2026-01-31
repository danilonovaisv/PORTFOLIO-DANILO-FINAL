'use client';

import React, { useRef } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface BeliefFinalSectionProps {
  bgColor: string;
  scrollProgress?: MotionValue<number>;
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  bgColor,
  scrollProgress,
}) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className={`w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 ${bgColor}`}
    >
      <motion.div
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-[16vw] md:text-[14rem] tracking-tighter uppercase font-black">
          ISSO É
        </div>
        <div className="text-[30vw] md:text-[25rem] font-black tracking-tighter uppercase">
          GHOST
        </div>
        <div className="text-[24vw] md:text-[19rem] tracking-tighter uppercase font-black">
          DESIGN
        </div>
      </motion.div>
    </section>
  );
};

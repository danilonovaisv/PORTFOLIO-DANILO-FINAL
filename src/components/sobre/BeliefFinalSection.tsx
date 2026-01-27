'use client';

import React, { useRef } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BeliefFinalSectionProps {
  bgColor: string;
  scrollProgress: MotionValue<number>;
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  bgColor,
  scrollProgress,
}) => {
  const ref = useRef<HTMLElement>(null);

  // Ranges de entrada do título final, sincronizados com a última frase e troca de cor
  const introStart = 0.8;
  const introEnd = 0.88;

  const opacity = useTransform(scrollProgress, [introStart, introEnd], [0, 1]);
  const scale = useTransform(scrollProgress, [introStart, introEnd], [0.9, 1]);
  const blur = useTransform(
    scrollProgress,
    [introStart, introEnd],
    ['blur(10px)', 'blur(0px)']
  );

  return (
    <section
      ref={ref}
      className={`w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 ${bgColor}`}
    >
      <motion.div
        style={{
          opacity,
          scale,
          filter: blur,
        }}
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
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

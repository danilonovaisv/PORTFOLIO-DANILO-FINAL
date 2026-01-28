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

  // Animação de entrada
  const introStart = 0.85;
  const introEnd = 0.95;

  const opacity = useTransform(scrollProgress, [introStart, introEnd], [0, 1]);
  const scale = useTransform(scrollProgress, [introStart, introEnd], [0.95, 1]);
  const blur = useTransform(
    scrollProgress,
    [introStart, introEnd],
    ['blur(10px)', 'blur(0px)']
  );

  return (
    <motion.section
      ref={ref}
      className="w-full h-screen overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        style={{
          opacity,
          scale,
          filter: blur,
        }}
        className="std-grid relative flex h-full w-full flex-col justify-center pointer-events-none z-20"
      >
        <div className="w-full flex flex-col space-y-0 md:-space-y-4 lg:-space-y-8 font-display font-black uppercase text-white leading-none">
          {/* Linha 1: ISSO É */}
          <div className="w-full flex justify-between items-center text-[18vw] md:text-[14vw] tracking-tighter">
            <span>I</span>
            <span>S</span>
            <span>S</span>
            <span>O</span>
            <span className="w-[0.5em] inline-block" /> {/* Espaço visual */}
            <span>É</span>
          </div>

          {/* Linha 2: GHOST */}
          <div className="w-full flex justify-between items-center text-[18vw] md:text-[14vw] tracking-tighter">
            <span>G</span>
            <span>H</span>
            <span>O</span>
            <span>S</span>
            <span>T</span>
          </div>

          {/* Linha 3: DESIGN. */}
          <div className="w-full flex justify-between items-center text-[18vw] md:text-[14vw] tracking-tighter">
            <span>D</span>
            <span>E</span>
            <span>S</span>
            <span>I</span>
            <span>G</span>
            <span>N</span>
            <span>.</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

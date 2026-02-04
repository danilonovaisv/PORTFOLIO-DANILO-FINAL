'use client';

import React from 'react';
import { motion, MotionValue, useTransform, cubicBezier } from 'framer-motion';

interface BeliefFixedHeaderProps {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
}

// Helper para encapsular a lógica de Morph (Blur + Opacity + Y)
const MorphText: React.FC<{
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}> = ({ children, progress, range, className }) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);
  const blur = useTransform(progress, range, ['blur(12px)', 'blur(0px)'], {
    ease: ghostEase,
  });
  const opacity = useTransform(progress, range, [0, 1], { ease: ghostEase });
  const y = useTransform(progress, range, [40, 0], { ease: ghostEase });

  return (
    <motion.span
      style={{ filter: blur, opacity, y }}
      className={`block ${className || ''}`}
    >
      {children}
    </motion.span>
  );
};

export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  opacity,
  progress,
}) => {
  return (
    <motion.header
      style={{ opacity }}
      className="sticky top-0 z-30 flex h-screen pointer-events-none"
    >
      {/* Container principal com espaço para Ghost (esquerda) e Texto (direita) */}
      <div className="w-full h-full flex items-center justify-end px-4 md:px-8 lg:px-16">
        {/* Texto principal - alinhado à direita, dando espaço para o Ghost à esquerda */}
        <div className="flex flex-col items-end text-right max-w-[55%] md:max-w-[500px] lg:max-w-[750px]">
          {/* Primeira parte: "ACREDITO NO..." - Uppercase, Bold */}
          <h1 className="text-white text-[clamp(1.5rem,4vw,3.8rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-2 md:mb-6 uppercase">
            <div className="overflow-visible">
              <MorphText progress={progress} range={[0.1, 0.2]}>
                ACREDITO NO
              </MorphText>
            </div>
            <div className="overflow-visible">
              <MorphText progress={progress} range={[0.12, 0.22]}>
                DESIGN QUE
              </MorphText>
            </div>
            <div className="overflow-visible">
              <MorphText progress={progress} range={[0.14, 0.24]}>
                MUDA O DIA
              </MorphText>
            </div>
            <div className="overflow-visible">
              <MorphText progress={progress} range={[0.16, 0.26]}>
                DE ALGUÉM.
              </MorphText>
            </div>
          </h1>

          {/* Segunda parte: "Não pelo choque..." - Normal case, menor */}
          <div className="flex flex-col items-end gap-0 text-right text-white text-[clamp(0.875rem,2vw,1.75rem)] font-medium leading-[1.3] tracking-normal">
            <div className="overflow-visible">
              <MorphText progress={progress} range={[0.22, 0.32]}>
                Não pelo choque,
              </MorphText>
            </div>
            <div className="overflow-visible">
              <MorphText progress={progress} range={[0.24, 0.34]}>
                mas pela conexão.
              </MorphText>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

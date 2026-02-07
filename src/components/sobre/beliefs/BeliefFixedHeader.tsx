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
      <div className="std-grid w-full h-full">
        <div className="flex h-full items-start md:items-center justify-end pt-32 md:pt-0 col-span-12">
          <div className="flex flex-col items-end text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[850px] pr-[5%] md:pr-0">
            {/* Primeira parte: "Acredito no..." */}
            <div className="flex flex-col items-end text-right w-full">
              {/* 🟣 [CONFIG VISUAL]: Define a cor do título principal e o tamanho da fonte (4xl a 7xl) */}
              <h2 className="text-white text-5xl md:text-5xl lg:text-6xl xl:text-8xl font-display leading-[1] tracking-tighter mb-4 md:mb-12 uppercase font-black mix-blend-difference whitespace-nowrap">
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.1, 0.2]}>
                    Acredito no
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.12, 0.22]}>
                    design que
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.14, 0.24]}>
                    muda o dia
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.16, 0.26]}>
                    de alguém.
                  </MorphText>
                </div>
              </h2>

              {/* Segunda parte: "Não pelo choque..." */}
              {/* 🟣 [CONFIG VISUAL]: Define a cor e tamanho do subtítulo (sm a 4xl) */}
              <div className="flex flex-col items-end gap-1 text-white text-sm md:text-4xl lg:text-6xl font-h1 leading-[1] tracking-normal font-bold whitespace-nowrap">
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
        </div>
      </div>
    </motion.header>
  );
};

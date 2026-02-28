'use client';

import React from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
  cubicBezier,
} from 'framer-motion';

interface BeliefFixedHeaderProps {
  scrollProgress?: MotionValue<number>;
  MotionHeader?: React.ElementType;
  prefersReducedMotion?: boolean;
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
  scrollProgress,
  MotionHeader,
  prefersReducedMotion,
}) => {
  const Header = MotionHeader ?? motion.header;
  const staticProgress = useMotionValue(1);
  const progress = scrollProgress ?? staticProgress;
  // Opacity for the header container itself
  // Fade IN: 0 -> 0.1
  // Visible: 0.1 -> 0.75
  // Fade OUT: 0.75 -> 0.9 (Changes to avoid overlap with Final Section)
  const opacity = useTransform(progress, [0, 0.04, 0.75, 0.9], [0, 1, 1, 0]);

  return (
    <Header
      style={prefersReducedMotion ? undefined : { opacity }}
      className="sticky top-0 z-50 mb-[-100vh] flex h-screen pointer-events-none"
    >
      <div className="std-grid w-full h-full">
        <div className="flex h-full items-start md:items-center justify-end pt-32 md:pt-0 col-span-12">
          <div className="flex flex-col items-end text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[850px] pr-[5%] md:pr-0">
            {/* Primeira parte: "Acredito no..." */}
            <div className="flex flex-col items-end text-right w-full">
              {/* 🟣 [CONFIG VISUAL]: Define a cor do título principal e o tamanho da fonte (4xl a 7xl) */}
              <h2 className="text-white text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1] tracking-tighter mb-4 md:mb-12 uppercase font-black mix-blend-difference whitespace-nowrap">
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.0, 0.1]}>
                    Acredito no
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.02, 0.12]}>
                    design que
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.04, 0.14]}>
                    muda o dia
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.06, 0.16]}>
                    de alguém.
                  </MorphText>
                </div>
              </h2>

              {/* Segunda parte: "Não pelo choque..." */}
              {/* 🟣 [CONFIG VISUAL]: Define a cor e tamanho do subtítulo (sm a 4xl) */}
              <div className="flex flex-col items-end gap-1 text-white text-[clamp(1.125rem,4.4vw,1.35rem)] md:text-3xl lg:text-4xl xl:text-5xl leading-[1.2] tracking-normal font-bold whitespace-nowrap">
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.08, 0.18]}>
                    Não pelo choque,
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={progress} range={[0.1, 0.2]}>
                    mas pela conexão.
                  </MorphText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

'use client';

import React from 'react';
import {
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';

interface BeliefFixedHeaderProps {
  scrollProgress?: MotionValue<number>;
  MotionHeader?: React.ElementType;
  prefersReducedMotion?: boolean;
}

export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  scrollProgress,
  MotionHeader,
  prefersReducedMotion,
}) => {
  const Header = MotionHeader ?? motion.header;
  const staticProgress = useMotionValue(1);
  const progress = scrollProgress ?? staticProgress;
  const textShadow =
    '0 2px 8px rgba(4, 0, 19, 0.45), 0 0 28px rgba(4, 0, 19, 0.28)';
  const opacity = useTransform(
    progress,
    [0.01, 0.035, 0.76, 0.84],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [0.01, 0.045], [18, 0]);

  return (
    <Header
      style={prefersReducedMotion ? undefined : { opacity, y }}
      className="sticky top-0 z-40 mb-[-100vh] flex h-screen pointer-events-none"
    >
      <div className="std-grid w-full h-full">
        <div className="flex h-full items-start pt-[20vh] md:items-center md:pt-0 justify-end col-span-12">
          <div className="flex flex-col items-end text-right w-full max-w-[85vw] sm:max-w-[280px] md:max-w-[500px] lg:max-w-[850px] pr-[5%] md:pr-0">
            {/* Primeira parte: "Acredito no..." */}
            <div className="flex flex-col items-end text-right w-full">
              {/* 🟣 [CONFIG VISUAL]: Define a cor do título principal e o tamanho da fonte (4xl a 7xl) */}
              <h2
                className="text-white text-[clamp(1.75rem,8vw,3rem)] md:text-[clamp(3rem,4.8vw,5.75rem)] lg:text-[clamp(3.5rem,5.2vw,6.5rem)] font-display leading-[0.98] tracking-[-0.045em] mb-4 md:mb-12 font-black"
                style={{ textShadow }}
              >
                <span className="block">Acredito no</span>
                <span className="block">design que</span>
                <span className="block">muda o dia</span>
                <span className="block">de alguém.</span>
              </h2>

              {/* Segunda parte: "Não pelo choque..." */}
              {/* 🟣 [CONFIG VISUAL]: Define a cor e tamanho do subtítulo (sm a 4xl) */}
              <div
                className="flex flex-col items-end gap-1 text-white text-[clamp(0.95rem,3.8vw,1.2rem)] md:text-[clamp(1.5rem,2.7vw,2.75rem)] lg:text-[clamp(2rem,3vw,3.5rem)] leading-[1.08] tracking-[-0.03em] font-bold"
                style={{ textShadow }}
              >
                <span className="block">Não pelo choque,</span>
                <span className="block">mas pela conexão.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

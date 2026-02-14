'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BeliefFixedHeaderProps {
  scrollProgress: MotionValue<number>;
}

import { MorphText } from '@/components/ui/MorphText';

interface BeliefFixedHeaderProps {
  scrollProgress: MotionValue<number>;
  opacity?: MotionValue<number>;
}

export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  scrollProgress,
  opacity: externalOpacity,
}) => {
  // Use external opacity if provided, otherwise calculate locally
  const localOpacity = useTransform(
    scrollProgress,
    [0, 0.1, 0.75, 0.9],
    [0, 1, 1, 0]
  );

  const opacity = externalOpacity || localOpacity;

  return (
    <motion.header
      style={{ opacity }}
      className="sticky top-0 z-20 flex h-screen pointer-events-none"
    >
      <div className="std-grid w-full h-full pointer-events-none">
        <div className="col-span-12 md:col-span-6 flex h-full items-center justify-start pointer-events-auto">
          <div className="flex flex-col items-start text-left w-full pl-[5%] md:pl-0">
            {/* Primeira parte: "Acredito no..." */}
            <div className="flex flex-col items-start text-left w-full">
              {/* 🟣 [CONFIG VISUAL]: Define a cor do título principal e o tamanho da fonte (4xl a 7xl) */}
              <h2 className="text-white text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-none tracking-tighter mb-4 md:mb-12 uppercase font-black mix-blend-difference whitespace-nowrap">
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.15, 0.25]}>
                    Acredito no
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.17, 0.27]}>
                    design que
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.19, 0.29]}>
                    muda o dia
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.21, 0.31]}>
                    de alguém.
                  </MorphText>
                </div>
              </h2>

              {/* Segunda parte: "Não pelo choque..." */}
              {/* 🟣 [CONFIG VISUAL]: Define a cor e tamanho do subtítulo (sm a 4xl) */}
              <div className="flex flex-col items-start gap-1 text-white text-[clamp(1.125rem,4.4vw,1.35rem)] md:text-3xl lg:text-4xl xl:text-5xl leading-[1.2] tracking-normal font-bold whitespace-nowrap">
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.22, 0.32]}>
                    Não pelo choque,
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.24, 0.34]}>
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

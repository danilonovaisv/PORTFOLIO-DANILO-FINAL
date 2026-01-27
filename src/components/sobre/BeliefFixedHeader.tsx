'use client';

import React from 'react';
import { motion, MotionValue, useTransform, cubicBezier } from 'framer-motion';

interface BeliefFixedHeaderProps {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
}

export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  opacity,
  progress,
}) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // Intervalo de entrada para o Header Fixo (sincronizado com o fade do container)
  const introRange = [0.14, 0.24];

  const y1 = useTransform(progress, introRange, [30, 0], { ease: ghostEase });
  const y2 = useTransform(progress, [0.16, 0.26], [30, 0], { ease: ghostEase });
  const y3 = useTransform(progress, [0.18, 0.28], [30, 0], { ease: ghostEase });
  const y4 = useTransform(progress, [0.2, 0.3], [30, 0], { ease: ghostEase });

  const h2Y = useTransform(progress, [0.26, 0.36], [20, 0], {
    ease: ghostEase,
  });
  const h2Opacity = useTransform(progress, [0.26, 0.36], [0, 0.8], {
    ease: ghostEase,
  });

  return (
    <motion.header
      style={{ opacity }}
      className="sticky top-0 z-30 flex h-screen items-center pointer-events-none"
    >
      <div className="std-grid w-full flex justify-end">
        <div className="flex flex-col items-end text-right w-full max-w-[320px] md:max-w-[480px] lg:max-w-[700px]">
          <h1 className="text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-display leading-[1.1] tracking-tighter mb-6 uppercase font-black">
            <div className="overflow-hidden">
              <motion.span style={{ y: y1 }} className="block">
                Acredito no
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span style={{ y: y2 }} className="block text-bluePrimary">
                design que
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span style={{ y: y3 }} className="block text-bluePrimary">
                muda o dia
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span style={{ y: y4 }} className="block">
                de alguém.
              </motion.span>
            </div>
          </h1>
          <motion.h2
            style={{ y: h2Y, opacity: h2Opacity }}
            className="text-white text-xs md:text-xl lg:text-4xl font-h2 leading-none tracking-normal font-bold"
          >
            Não pelo choque,
            <br />
            <span className="text-bluePrimary">mas pela conexão.</span>
          </motion.h2>
        </div>
      </div>
    </motion.header>
  );
};

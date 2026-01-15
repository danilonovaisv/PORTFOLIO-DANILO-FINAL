'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface BeliefFixedHeaderProps {
  opacity: MotionValue<number>;
}

export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  opacity,
}) => {
  return (
    <motion.header
      style={{ opacity }}
      className="fixed inset-0 z-100 flex items-center pointer-events-none"
    >
      <div className="std-grid w-full flex justify-end">
        <div className="flex flex-col items-end text-right w-full max-w-[320px] md:max-w-[500px] lg:max-w-[700px]">
          <h1 className="text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-display leading-[0.9] tracking-tighter mb-6 uppercase font-black">
            Acredito no
            <br />
            design que
            <br />
            muda o dia
            <br />
            de alguém.
          </h1>
          <h2 className="text-white text-xs md:text-xl lg:text-2xl font-h2 opacity-80 leading-none tracking-normal font-bold">
            Não pelo
            <br />
            choque, mas
            <br />
            pela conexão.
          </h2>
        </div>
      </div>
    </motion.header>
  );
};

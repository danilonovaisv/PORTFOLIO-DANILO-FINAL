'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface BeliefSectionProps {
  text: string;
  bgColor: string;
  isFirst?: boolean;
}

export const BeliefSection: React.FC<BeliefSectionProps> = ({
  text,
  bgColor,
  isFirst = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // X simplificado para 0 para garantir que o texto "nasça" com a cor, sem atraso de slide horizontal
  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ['0vw', '0vw', '0vw', '0vw']
  );

  // Y acompanha o scroll para dar a sensação de ancoragem na parte superior da cor
  const y = useTransform(scrollYProgress, [0.7, 0.95], ['0vh', '-100vh']);

  // Opacidade rápida na entrada para colar com o background
  // Adicionamos um DELAY na primeira para garantir que o manifesto fixo seja lido primeiro
  const opacityRange = isFirst ? [0.35, 0.45, 0.8, 0.95] : [0, 0.15, 0.8, 0.95];
  const opacity = useTransform(scrollYProgress, opacityRange, [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen flex items-start justify-start overflow-hidden pt-[25vh] md:pt-[20vh] lg:pt-[15vh] transition-colors duration-500 ease-linear ${bgColor}`}
    >
      <div className="std-grid max-w-none">
        <motion.div
          style={{ x, y, opacity }}
          className="w-full flex justify-start z-10"
        >
          <span className="text-[#4fe6ff] font-h2 text-4xl md:text-6xl lg:text-[5vw] xl:text-[6vw] leading-[0.9] tracking-[-0.04em] text-left whitespace-pre-line select-none font-black italic max-w-[60%] lg:max-w-[50%]">
            {text}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

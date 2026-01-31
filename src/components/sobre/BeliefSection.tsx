'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  cubicBezier,
  MotionValue,
} from 'framer-motion';

// Easing Ghost Padrão: cubic-bezier(0.22, 1, 0.36, 1)
const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

interface BeliefLineProps {
  line: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  animationRange: number[];
}

/**
 * Componente separado para cada linha do texto.
 * Isso permite usar hooks (useTransform) corretamente,
 * pois hooks não podem ser chamados dentro de loops/callbacks.
 */
const BeliefLine: React.FC<BeliefLineProps> = ({
  line,
  index,
  scrollYProgress,
  animationRange,
}) => {
  // Cada linha entra da esquerda para a direita (X: -100% -> 0)
  const lineX = useTransform(
    scrollYProgress,
    [animationRange[0] + index * 0.02, animationRange[1] + index * 0.02],
    ['-100%', '0%'],
    { ease: ghostEase }
  );

  return (
    <div className="overflow-visible mb-1 md:mb-2 w-full">
      <motion.span
        style={{ x: lineX }}
        className="block text-blueAccent font-h2 text-4xl md:text-5xl lg:text-[5.5vw] xl:text-[6.5vw] leading-none tracking-[-0.04em] text-left whitespace-pre-line select-none font-black italic max-w-fit pr-[0.15em] py-2"
      >
        {line}
      </motion.span>
    </div>
  );
};

interface BeliefSectionProps {
  text: string;
  bgColor: string; // Espera uma cor HEX
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

  // Intervalo de animação de entrada e saída:
  // Ajustado para garantir que o primeiro item já inicie visível ou entre suavemente.
  // [0, 0.3] para o primeiro garante que comece a animar cedo.
  const animationRange = isFirst ? [0, 0.3] : [0.22, 0.45];
  const exitRange = isFirst ? [0.9, 1.0] : [0.8, 0.95];

  const opacity = useTransform(
    scrollYProgress,
    [animationRange[0], animationRange[1], exitRange[0], exitRange[1]],
    [0, 1, 1, 0]
  );

  // Y acompanha o scroll para dar a sensação de ancoragem na parte superior da cor
  const yScroll = useTransform(scrollYProgress, [0.7, 0.95], ['0vh', '-100vh']);

  // Dividindo o texto por linhas para entrada staggered
  const lines = text.split('\n');

  return (
    <motion.section
      ref={containerRef}
      aria-label={text.replace(/\n/g, ' ')}
      style={{ backgroundColor: bgColor }}
      className={`relative w-full h-screen flex justify-start overflow-hidden ${isFirst
          ? 'items-center pt-0'
          : 'items-start pt-[20vh] md:pt-[20vh] lg:pt-[15vh]'
        }`}
    >
      <div className="std-grid max-w-none">
        <motion.div
          style={{ y: yScroll, opacity }}
          className="relative z-30 w-full flex flex-col justify-start"
        >
          {lines.map((line, i) => (
            <BeliefLine
              key={i}
              line={line}
              index={i}
              scrollYProgress={scrollYProgress}
              animationRange={animationRange}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

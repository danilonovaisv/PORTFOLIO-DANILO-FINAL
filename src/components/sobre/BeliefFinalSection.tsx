'use client';
import React, { useRef } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BeliefFinalSectionProps {
  bgColor: string;
  scrollProgress: MotionValue<number>; // Recebe o scrollProgress
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  bgColor,
  scrollProgress, // Recebe como prop
}) => {
  const ref = useRef<HTMLElement>(null);

  // Defina os ranges para a animação baseada no scroll
  // Assumindo que a transição para azul primário (cor final) começa em ~0.8 do scroll
  // e a animação do texto final deve começar nesse ponto ou logo após.
  const introStart = 0.8; // Ajuste conforme necessário para sincronizar com a última frase
  const introEnd = 0.88; // Duração da animação

  // Transformações baseadas no scroll
  const opacity = useTransform(scrollProgress, [introStart, introEnd], [0, 1]);
  const scale = useTransform(scrollProgress, [introStart, introEnd], [0.9, 1]);
  const blur = useTransform(
    scrollProgress,
    [introStart, introEnd],
    ['blur(10px)', 'blur(0px)']
  );

  return (
    <section
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
        className="std-grid flex h-full w-full items-center justify-center pointer-events-none"
      >
        <div className="flex flex-col items-center text-center text-white font-display leading-[0.9] tracking-tight uppercase font-black z-20">
          <span className="text-[clamp(2.5rem,5vw,4rem)]">ISSO É</span>
          <span className="text-[clamp(3.5rem,9vw,6rem)] text-bluePrimary">
            GHOST
          </span>
          <span className="text-[clamp(3rem,8vw,5.5rem)]">DESIGN.</span>
        </div>
      </motion.div>
    </section>
  );
};

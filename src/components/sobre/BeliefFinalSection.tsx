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

  // Opcional: Se desejar que o texto saia após um certo ponto, adicione mais ranges
  // const exitStart = 0.95;
  // const exitEnd = 1.0;
  // const opacity = useTransform(scrollProgress, [introStart, introEnd, exitStart, exitEnd], [0, 1, 1, 0]);
  // const scale = useTransform(scrollProgress, [introStart, introEnd, exitStart, exitEnd], [0.9, 1, 1, 0.95]);

  return (
    <section
      ref={ref}
      className={`w-full h-screen overflow-hidden ${bgColor}`}
    >
      <motion.div
        style={{
          opacity,
          scale,
          filter: blur,
        }}
        className="std-grid flex h-full w-full items-center"
      >
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="hidden lg:flex items-center justify-center" aria-hidden="true" />
          <div className="flex flex-col items-center text-center text-white font-display leading-[0.9] tracking-tight uppercase font-black lg:items-start lg:text-left">
            <span className="text-[clamp(2.5rem,5vw,4rem)]">ISSO É</span>
            <span className="text-[clamp(3.5rem,9vw,6rem)] text-bluePrimary">
              GHOST
            </span>
            <span className="text-[clamp(3rem,8vw,5.5rem)]">DESIGN.</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

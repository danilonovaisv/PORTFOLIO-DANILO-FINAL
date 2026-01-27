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
  const blur = useTransform(scrollProgress, [introStart, introEnd], ['blur(10px)', 'blur(0px)']);

  // Opcional: Se desejar que o texto saia após um certo ponto, adicione mais ranges
  // const exitStart = 0.95;
  // const exitEnd = 1.0;
  // const opacity = useTransform(scrollProgress, [introStart, introEnd, exitStart, exitEnd], [0, 1, 1, 0]);
  // const scale = useTransform(scrollProgress, [introStart, introEnd, exitStart, exitEnd], [0.9, 1, 1, 0.95]);

  return (
    <section
      ref={ref}
      className={`w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 ${bgColor}`}
    >
      <motion.div
        style={{
          opacity,
          scale,
          filter: blur,
        }}
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
        // Removido initial, whileInView, viewport e transition
      >
        <div className="text-[16vw] md:text-[14rem] tracking-tighter uppercase font-black">
          ISSO É
        </div>
        <div className="text-[30vw] md:text-[25rem] font-black tracking-tighter uppercase">
          GHOST
        </div>
        <div className="text-[24vw] md:text-[19rem] tracking-tighter uppercase font-black">
          DESIGN
        </div>
      </motion.div>
    </section>
  );
};

'use client';

import React from 'react';
import { BeliefSection } from './BeliefSection';
import { BeliefFinalSection } from './BeliefFinalSection';
import { BeliefFixedHeader } from './BeliefFixedHeader';

const PHRASES = [
  'Um vídeo\nque respira.',
  'Uma marca\n que se\n reconhece.',
  'Um detalhe\n que fica.',
  'Crio para\n gerar\n presença.',
  'Mesmo\n quando\n ninguém\npercebe\n o esforço.',
];

const COLORS = [
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
  'bg-pinkDetails', // Rosa Choque
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
];

const FINAL_COLOR = 'bg-bluePrimary'; // Azul Real

import { useScroll, useTransform, cubicBezier } from 'framer-motion';

export const AboutBeliefs: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Easing Ghost Padrão: cubic-bezier(0.22, 1, 0.36, 1)
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // Opacidade do Header Fixo:
  // Agora inicia a entrada assim que o container encosta no fundo da tela (start end)
  // Chega a 100% rapidamente para estabelecer a base de leitura.
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${COLORS[0]}`}
    >
      <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />

      {PHRASES.map((phrase, index) => (
        <BeliefSection
          key={index}
          text={phrase}
          bgColor={COLORS[index]}
          isFirst={index === 0}
        />
      ))}

      <BeliefFinalSection bgColor={FINAL_COLOR} />
    </section>
  );
};

export default AboutBeliefs;

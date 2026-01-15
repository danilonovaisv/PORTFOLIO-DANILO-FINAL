'use client';

import React from 'react';
import { BeliefSection } from './BeliefSection';
import { BeliefFinalSection } from './BeliefFinalSection';
import { BeliefFixedHeader } from './BeliefFixedHeader';

const PHRASES = [
  'Um vídeo\nque respira.',
  'Uma marca que\nse reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar\npresença.',
  'Mesmo quando ninguém\npercebe o esforço.',
];

const COLORS = [
  '#0048ff', // Azul Real
  '#8705f2', // Roxo Vibrante
  '#f501d3', // Rosa Choque
  '#0048ff', // Azul Real
  '#8705f2', // Roxo Vibrante
];

const FINAL_COLOR = '#0048ff'; // Azul Real

import { useScroll, useTransform } from 'framer-motion';

export const AboutBeliefs: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Opacidade do Header Fixo:
  // Agora inicia a entrada assim que o container encosta no fundo da tela (start end)
  // Chega a 100% rapidamente para estabelecer a base de leitura.
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: COLORS[0] }}
    >
      <BeliefFixedHeader opacity={headerOpacity} />

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

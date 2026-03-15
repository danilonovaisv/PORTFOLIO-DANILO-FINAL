'use client';

import React from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
  cubicBezier,
} from 'framer-motion';

// Easing Ghost Padrão: cubic-bezier(0.22, 1, 0.36, 1)
const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

interface MobileTextLayerProps {
  phrases: string[];
  scrollYProgress?: MotionValue<number>;
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

export const BeliefMobileTextLayer: React.FC<MobileTextLayerProps> = ({
  phrases,
  scrollYProgress,
  MotionDiv,
  prefersReducedMotion,
}) => {
  // Divisão do scroll total em segmentos para cada frase
  const totalPhrases = phrases.length;
  const staticProgress = useMotionValue(1);
  const progress = scrollYProgress ?? staticProgress;
  const Container = MotionDiv ?? motion.div;

  return (
    <div className="fixed inset-0 z-70 pointer-events-none md:hidden">
      {phrases.map((phrase, index) => (
        <MobilePhrase
          key={index}
          text={phrase}
          index={index}
          totalPhrases={totalPhrases}
          scrollYProgress={progress}
          MotionDiv={Container}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
};

interface MobilePhraseProps {
  text: string;
  index: number;
  totalPhrases: number;
  scrollYProgress: MotionValue<number>;
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

const MobilePhrase: React.FC<MobilePhraseProps> = ({
  text,
  index,
  totalPhrases,
  scrollYProgress,
  MotionDiv,
  prefersReducedMotion,
}) => {
  const Container = MotionDiv ?? motion.div;
  // O container pai usa (PHRASES.length + 2) * 100vh de altura. Para mobile,
  // cada frase ocupa uma "tela" na timeline e a última tela fica reservada
  // ao manifesto final. Esse mapeamento mantém a ordem estável em qualquer
  // viewport e evita saltos entre frases.
  const totalScreens = totalPhrases + 1;
  const segmentSize = 1 / totalScreens;
  const timelineOffset = 0.08;

  const startPoint = index * segmentSize + timelineOffset;
  const endPoint = startPoint + segmentSize;
  const entryStart = startPoint;
  const entryEnd = startPoint + segmentSize * 0.35;
  const exitStart = endPoint - segmentSize * 0.35;
  const exitEnd = endPoint;

  // Mobile: entra pela esquerda, estabiliza no centro e sai à direita.
  const x = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['-40px', '0px', '0px', '40px'],
    { ease: ghostEase }
  );

  // Opacity: Fade in com entrada, fade out antes da próxima
  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  // Blur suave para manter legibilidade e evitar pop brusco
  const blur = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'],
    { ease: ghostEase }
  );

  // Remover newlines para mobile — mostrar como frase corrida com quebras naturais
  const mobileText = text.replace(/\n/g, ' ');

  return (
    <Container
      style={prefersReducedMotion ? undefined : { x, opacity, filter: blur }}
      className="absolute bottom-[20vh] left-0 right-0 text-center pointer-events-none px-6"
    >
      {/* Mobile: frase corrida com quebra natural, sem disputa com o ghost/header. */}
      <span className="text-blueAccent italic font-bold text-[clamp(1.8rem,7vw,3rem)] leading-[1.3] tracking-tight block w-full mx-auto text-balance">
        {mobileText}
      </span>
    </Container>
  );
};

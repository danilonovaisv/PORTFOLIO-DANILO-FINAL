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
  const phraseZoneStart = 0.16;
  const phraseZoneEnd = 0.94;

  // MobilePhrase: Calcula seus próprios segmentos baseados no range útil
  // A timeline das frases começa apenas após entrada do header + Ghost.
  const phraseZoneSize = phraseZoneEnd - phraseZoneStart;
  const segmentSize = phraseZoneSize / totalPhrases;
  const startPoint = phraseZoneStart + index * segmentSize;
  const endPoint = startPoint + segmentSize;

  // Entry/Exit mais longos para evitar "piscar" e manter legibilidade.
  const entryStart = startPoint + segmentSize * 0.02;
  const entryEnd = startPoint + segmentSize * 0.34;
  const exitStart = endPoint - segmentSize * 0.34;
  const exitEnd = endPoint - segmentSize * 0.02;

  // Y: Entra de BAIXO, mantém centro, sai para CIMA.
  const y = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['18px', '0px', '0px', '-18px'],
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
    ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(6px)'],
    { ease: ghostEase }
  );

  // Remover newlines para mobile — mostrar como frase corrida com quebras naturais
  const mobileText = text.replace(/\n/g, ' ');

  return (
    <Container
      style={prefersReducedMotion ? undefined : { y, opacity, filter: blur }}
      className="absolute bottom-[20vh] left-0 right-0 text-center pointer-events-none px-6"
    >
      {/* 🟣 [CONFIG VISUAL]: Define cor e tamanho do texto (Mobile: clamp 1.8rem-3rem) */}
      <span className="text-blueAccent italic font-bold text-[clamp(1.8rem,7vw,3rem)] leading-[1.3] tracking-tight block w-full mx-auto">
        {mobileText}
      </span>
    </Container>
  );
};

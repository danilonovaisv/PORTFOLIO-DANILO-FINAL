'use client';

import React from 'react';
import { motion, MotionValue, useTransform, cubicBezier } from 'framer-motion';
// Import useIsMobile from BeliefSection to avoid duplication
import { useIsMobile } from './BeliefSection';

// Easing Ghost Padrão: cubic-bezier(0.22, 1, 0.36, 1)
const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

interface MobileTextLayerProps {
  phrases: string[];
  scrollYProgress: MotionValue<number>;
}

export const BeliefMobileTextLayer: React.FC<MobileTextLayerProps> = ({
  phrases,
  scrollYProgress,
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  // Divisão do scroll total em segmentos para cada frase
  const totalPhrases = phrases.length;
  const segmentSize = 1 / (totalPhrases + 1); // +1 para a seção final

  return (
    <>
      {phrases.map((phrase, index) => (
        <MobilePhrase
          key={index}
          text={phrase}
          index={index}
          totalPhrases={totalPhrases}
          segmentSize={segmentSize}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </>
  );
};

interface MobilePhraseProps {
  text: string;
  index: number;
  totalPhrases: number;
  segmentSize: number;
  scrollYProgress: MotionValue<number>;
}

const MobilePhrase: React.FC<MobilePhraseProps> = ({
  text,
  index,
  totalPhrases,
  scrollYProgress,
}) => {
  // MobilePhrase: Calcula seus próprios segmentos baseados no range útil [0.35 - 0.95]
  const usefulRangeStart = 0.35;
  const usefulRangeEnd = 0.95;
  const totalRange = usefulRangeEnd - usefulRangeStart;
  const adjustedSegmentSize = totalRange / totalPhrases;

  const startPoint = usefulRangeStart + index * adjustedSegmentSize;
  const endPoint = startPoint + adjustedSegmentSize;

  // Entry: 10% do segmento
  // Exit: 10% do segmento
  const entryStart = startPoint;
  const entryEnd = startPoint + adjustedSegmentSize * 0.15;
  const exitStart = endPoint - adjustedSegmentSize * 0.15;
  const exitEnd = endPoint;

  // X: Entra da DIREITA (+24px), mantém centro (0px), sai para a ESQUERDA (-24px)
  const x = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['24px', '0px', '0px', '-24px'],
    { ease: ghostEase }
  );

  // Opacity: Fade in com entrada, fade out antes da próxima
  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  // Blur: 10px na entrada/saída, 0 no centro
  const blur = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'],
    { ease: ghostEase }
  );

  return (
    <motion.div
      style={{ x, opacity, filter: blur }}
      className="fixed bottom-[25%] left-0 right-0 z-40 text-center pointer-events-none px-8"
    >
      {/* 🟣 [CONFIG VISUAL]: Define cor e tamanho do texto (Mobile: clamp 2rem-3.5rem) */}
      <span className="text-blueAccent italic font-bold text-[clamp(2rem,6vw,3.5rem)] leading-[1.4] tracking-widest block w-full mx-auto">
        {text}
      </span>
    </motion.div>
  );
};

'use client';

import React from 'react';
import { motion, MotionValue, useTransform, cubicBezier } from 'framer-motion';
// Import useIsMobile from BeliefSection to avoid duplication

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
  // useIsMobile removed as we use CSS for visibility control now

  // !isMobile check removed to avoid hydration mismatch. Handled via CSS.

  // Divisão do scroll total em segmentos para cada frase
  const totalPhrases = phrases.length;
  const segmentSize = 1 / (totalPhrases + 1); // +1 para a seção final

  return (
    <div className="block md:hidden" >
      {
        phrases.map((phrase, index) => (
          <MobilePhrase
            key={index}
            text={phrase}
            index={index}
            totalPhrases={totalPhrases}
            segmentSize={segmentSize}
            scrollYProgress={scrollYProgress}
          />
        ))
      }
    </div >
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
  // MobilePhrase: Calcula seus próprios segmentos baseados no range útil [0.15 - 0.95]
  // Ajustado para 0.15 para eliminar gap entre header e primeira frase
  const usefulRangeStart = 0.15;
  const usefulRangeEnd = 0.95;
  const totalRange = usefulRangeEnd - usefulRangeStart;
  const adjustedSegmentSize = totalRange / totalPhrases;

  const startPoint = usefulRangeStart + index * adjustedSegmentSize;
  const endPoint = startPoint + adjustedSegmentSize;

  // Adjusted ranges for contiguous visibility
  const entryStart = startPoint;
  const entryEnd = startPoint + adjustedSegmentSize * 0.2; // 20% fade in
  const exitStart = endPoint - adjustedSegmentSize * 0.2;  // 20% fade out
  const exitEnd = endPoint;

  // X: Entra da DIREITA (+24px), mantém centro (0px), sai para a ESQUERDA (-24px)
  // Adjusted values for smoother mobile feel
  // X: Entra da ESQUERDA (-24px), mantém centro (0px), sai para a DIREITA (+24px)
  // [FIX] Invertido para seguir descrição textual: "Entra pela esquerda"
  const x = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['-24px', '0px', '0px', '24px'],
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
      className="fixed bottom-[20%] left-0 right-0 z-50 text-center pointer-events-none px-8"
    >
      {/* 🟣 [CONFIG VISUAL]: Define cor e tamanho do texto (Mobile: clamp 2rem-3.5rem) */}
      <span className="text-blueAccent italic font-bold text-[clamp(2rem,6vw,3.5rem)] leading-[1.4] tracking-widest block w-full mx-auto">
        {text}
      </span>
    </motion.div>
  );
};

'use client';

import React from 'react';
import { motion, MotionValue, useTransform, cubicBezier } from 'framer-motion';
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
  const [activePhraseIndex, setActivePhraseIndex] = React.useState(-1);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Range útil: 0.35 a 0.95
      const start = 0.35;
      const end = 0.95;
      const total = end - start;
      const step = total / phrases.length;

      if (latest < start) {
        setActivePhraseIndex(-1);
        return;
      }

      const relativeProgress = latest - start;
      const index = Math.floor(relativeProgress / step);
      setActivePhraseIndex(Math.min(Math.max(0, index), phrases.length - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress, phrases.length]);

  if (!isMobile) return null;

  const totalPhrases = phrases.length;
  const segmentSize = 1 / (totalPhrases + 1);

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
          isActive={index === activePhraseIndex}
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
  isActive: boolean;
}

const MobilePhrase: React.FC<MobilePhraseProps> = ({
  text,
  index,
  totalPhrases,
  scrollYProgress,
  isActive,
}) => {
  // MobilePhrase: Calcula seus próprios segmentos baseados no range útil [0.35 - 0.95]
  const usefulRangeStart = 0.35;
  const usefulRangeEnd = 0.95;
  const totalRange = usefulRangeEnd - usefulRangeStart;
  const adjustedSegmentSize = totalRange / totalPhrases;

  const startPoint = usefulRangeStart + index * adjustedSegmentSize;
  const endPoint = startPoint + adjustedSegmentSize;

  // Ajuste de Timing para ciclo ~4.2s
  const entryDuration = adjustedSegmentSize * 0.15;
  const exitDuration = adjustedSegmentSize * 0.15;

  const entryStart = startPoint;
  const entryEnd = startPoint + entryDuration;
  const exitStart = endPoint - exitDuration;
  const exitEnd = endPoint;

  // X: Entra pela ESQUERDA (-24px -> 0), sai para a DIREITA (0 -> 24px)
  // Fluxo visual: L -> C -> R (entrada pela esquerda, saída pela direita)
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
      data-ghost-target={isActive ? 'true' : 'false'}
      style={{ x, opacity, filter: blur }}
      // Fixed at bottom 20% relative to viewport.
      // Width full, centered text.
      className="fixed bottom-[20%] left-0 w-full z-60 flex items-center justify-center pointer-events-none px-4"
    >
      <span className="text-blueAccent italic font-bold text-[clamp(1.8rem,5vw,2.5rem)] leading-[1.2] text-center tracking-wide block w-full">
        {text}
      </span>
    </motion.div>
  );
};

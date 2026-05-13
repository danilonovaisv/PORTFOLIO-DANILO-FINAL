'use client';

import { useMemo } from 'react';
import { m, useTransform, type MotionValue } from 'motion/react';
import { BELIEF_PHRASE_ITEMS, beliefColors, beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

/**
 * Mobile Phrase Component
 * Encapsula a lógica de animação individual para cada frase no Mobile
 */
function MobilePhrase({ 
  phrase, 
  index, 
  total, 
  scrollYProgress 
}: { 
  phrase: typeof BELIEF_PHRASE_ITEMS[0], 
  index: number, 
  total: number, 
  scrollYProgress: MotionValue<number> 
}) {
  const segmentSize = 1 / total;
  const startPoint = index * segmentSize;
  const endPoint = (index + 1) * segmentSize;
  
  // Janelas de entrada e saída (25% do segmento cada)
  const entryEnd = startPoint + segmentSize * 0.25;
  const exitStart = endPoint - segmentSize * 0.25;

  const y = useTransform(
    scrollYProgress, 
    [startPoint, entryEnd, exitStart, endPoint], 
    [24, 0, 0, -24]
  );
  
  const opacity = useTransform(
    scrollYProgress, 
    [startPoint, entryEnd, exitStart, endPoint], 
    [0, 1, 1, 0]
  );
  
  const blur = useTransform(
    scrollYProgress, 
    [startPoint, entryEnd, exitStart, endPoint], 
    ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']
  );

  return (
    <m.div 
      className="mobile-phrase absolute bottom-0 left-0 right-0 flex justify-center"
      style={{
        opacity,
        y,
        filter: blur,
      }}
    >
      <span 
        className="block text-center italic font-semibold select-none whitespace-pre-line"
        style={{
          color: beliefColors.blueAccent,
          fontSize: 'clamp(2.15rem, 8vw, 3.25rem)',
          lineHeight: 1.1,
          textShadow: `0 4px 20px rgba(79,230,255,0.25)`,
          letterSpacing: '-0.01em'
        }}
      >
        {phrase.text}
      </span>
    </m.div>
  );
}

export function BeliefMobileTextLayer() {
  const { scrollYProgress, isMobile } = useBeliefsScrollContext();

  // Memoize para evitar re-calculo da lista se não houver mudança
  const phrases = useMemo(() => BELIEF_PHRASE_ITEMS, []);

  if (!isMobile) return null;

  return (
    <div 
      className="col-span-full row-start-1 col-start-1 pointer-events-none flex items-end justify-center pb-[16vh] h-full"
      style={{ zIndex: beliefZIndex.scrollText }}
    >
      <div className="relative w-full max-w-[90vw]">
        {phrases.map((phrase, index) => (
          <MobilePhrase 
            key={phrase.id}
            phrase={phrase}
            index={index}
            total={phrases.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import { motion, useTransform } from 'framer-motion';
import {
  BELIEF_PHRASE_ITEMS,
  beliefColors,
  beliefLayout,
  beliefMotion,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { GHOST_EASE } from '@/config/motion';

interface BeliefPhraseSectionProps {
  text: string;
  index: number;
  totalPhrases: number;
}

function BeliefPhraseSection({ text, index, totalPhrases }: BeliefPhraseSectionProps) {
  const { isMobile, shouldReduceMotion, scrollYProgress } = useBeliefsScrollContext();

  // Define the scroll range for this phrase based on the climax point (0.82)
  const CLIMAX_START = 0.82;
  const sectionStep = CLIMAX_START / totalPhrases;
  
  const start = index * sectionStep;
  const end = (index + 1) * sectionStep;
  const middle = (start + end) / 2;

  // Animation values linked to scroll
  // We add a small horizontal plateu in the middle [middle - 0.04, middle + 0.04] 
  // to give the reader time to see the phrase clearly
  const opacity = useTransform(
    scrollYProgress,
    [start, middle - 0.04, middle + 0.04, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, middle, end],
    [shouldReduceMotion ? 0 : 18, 0, shouldReduceMotion ? 0 : -18]
  );

  const blurValue = useTransform(
    scrollYProgress,
    [start, middle, end],
    [8, 0, 8]
  );
  const filter = useTransform(blurValue, (v: number) => `blur(${v}px)`);

  return (
    <section
      className="belief-scroll-section relative"
      data-index={index}
      style={{ height: beliefLayout.phraseSectionHeight }}
    >
      <div
        className={[
          'pointer-events-none sticky top-0 flex h-dvh',
          isMobile
            ? 'items-end justify-center text-center px-6'
            : 'items-center justify-start text-left',
        ].join(' ')}
        style={{
          paddingLeft: isMobile ? undefined : beliefLayout.desktopPhraseLeft,
          paddingBottom: isMobile ? beliefLayout.mobilePhraseBottom : undefined,
        }}
      >
        <motion.h3
          data-testid="belief-phrase"
          data-animation-contract="scroll-coupled"
          aria-label={text}
          style={{
            opacity,
            y,
            filter,
            color: beliefColors.blueAccent,
            maxWidth: isMobile ? '100%' : beliefLayout.desktopPhraseMaxWidth,
            fontSize: isMobile
              ? 'clamp(2.0rem, 8vw, 3.0rem)'
              : 'clamp(2.8rem, 5.8vw, 6.3rem)',
            textShadow: '0 1px 12px rgba(0, 0, 0, 0.18)',
            whiteSpace: 'pre-line', // respects \n in phrase strings
          }}
          className="font-medium italic leading-[0.9] tracking-[-0.045em] will-change-[transform,opacity,filter] z-[var(--z-layer-cta)]"
        >
          {text}
        </motion.h3>
      </div>
    </section>
  );
}

export function BeliefScrollText() {
  const totalPhrases = BELIEF_PHRASE_ITEMS.length;

  return (
    <div
      data-testid="beliefs-scroll-text"
      className="relative z-[var(--z-layer-cta)]"
    >
      {BELIEF_PHRASE_ITEMS.map((phrase, index) => (
        <BeliefPhraseSection 
          key={phrase.id} 
          text={phrase.text} 
          index={index} 
          totalPhrases={totalPhrases}
        />
      ))}
    </div>
  );
}


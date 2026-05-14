'use client';

import { m, useReducedMotion } from 'motion/react';
import {
  BELIEF_PHRASE_ITEMS,
  beliefColors,
  beliefLayout,
  beliefZIndex,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

// Matches the Motion for JS source reference: [0.17, 0.55, 0.55, 1]
const GHOST_EASE = [0.17, 0.55, 0.55, 1] as [number, number, number, number];

function BeliefPhraseSection({ text, index }: { text: string; index: number }) {
  const { isMobile, activeIndex } = useBeliefsScrollContext();
  const prefersReducedMotion = useReducedMotion();

  // Variants for flow: Left-to-Right entry, Left-to-Right exit (Mobile specified: enter left, exit right)
  const variants = {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, x: isMobile ? -32 : -100 },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, x: 0 },
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, x: isMobile ? 32 : 100 },
  };

  const isActive = index === activeIndex;
  const isPast = index < activeIndex;

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
        <m.h3
          data-testid="belief-phrase"
          data-animation-contract="viewport-x-opacity"
          aria-label={text}
          initial="initial"
          animate={isActive ? 'animate' : isPast ? 'exit' : 'initial'}
          variants={variants}
          // once: false — scroll storytelling page (replay on re-enter is intentional)
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 0.9,
            ease: GHOST_EASE,
          }}
          className="font-medium italic leading-[0.9] tracking-[-0.045em]"
          style={{
            zIndex: beliefZIndex.scrollText,
            color: beliefColors.blueAccent,
            maxWidth: isMobile ? '100%' : beliefLayout.desktopPhraseMaxWidth,
            fontSize: isMobile
              ? 'clamp(2.0rem, 8vw, 3.0rem)'
              : 'clamp(2.8rem, 5.8vw, 6.3rem)',
            textShadow: '0 1px 12px rgba(0, 0, 0, 0.18)',
            whiteSpace: 'pre-line', // respects \n in phrase strings
            willChange: 'transform, opacity',
          }}
        >
          {text}
        </m.h3>
      </div>
    </section>
  );
}

export function BeliefScrollText() {
  return (
    <div
      data-testid="beliefs-scroll-text"
      className="relative"
      style={{ zIndex: beliefZIndex.scrollText }}
    >
      {BELIEF_PHRASE_ITEMS.map((phrase, index) => (
        <BeliefPhraseSection key={phrase.id} text={phrase.text} index={index} />
      ))}
    </div>
  );
}

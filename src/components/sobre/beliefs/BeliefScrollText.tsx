'use client';

import { useInView, m } from 'framer-motion';
import { useRef } from 'react';
import {
  BELIEF_PHRASE_ITEMS,
  beliefColors,
  beliefLayout,
  beliefMotion,
  beliefZIndex,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

function BeliefPhraseSection({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.55 });
  const { isMobile, shouldReduceMotion } = useBeliefsScrollContext();

  return (
    <section
      ref={ref}
      className="belief-scroll-section relative"
      data-index={index}
      style={{ height: beliefLayout.phraseSectionHeight }}
    >
      <div
        className={[
          'pointer-events-none sticky top-0 flex h-dvh px-6 md:px-12 lg:px-16',
          isMobile
            ? 'items-end justify-center pb-[20vh] text-center'
            : 'items-center justify-start text-left',
        ].join(' ')}
      >
        <m.h3
          data-testid="belief-phrase"
          data-animation-contract="viewport-x-opacity"
          aria-label={text}
          className="font-bold italic leading-[0.95] tracking-[-0.03em]"
          style={{
            zIndex: beliefZIndex.scrollText,
            color: beliefColors.blueAccent,
            maxWidth: isMobile ? '100%' : beliefLayout.desktopPhraseMaxWidth,
            fontSize: isMobile
              ? 'clamp(2rem, 8vw, 3rem)'
              : 'clamp(2.8rem, 5.8vw, 6.3rem)',
            textShadow: '0 2px 24px rgba(0, 0, 0, 0.28)',
          }}
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 18,
            filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)',
          }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: shouldReduceMotion ? 0 : isInView ? 0 : -18,
            filter: shouldReduceMotion
              ? 'blur(0px)'
              : isInView
                ? 'blur(0px)'
                : 'blur(6px)',
          }}
          transition={{
            duration: isInView
              ? beliefMotion.revealDuration
              : beliefMotion.exitDuration,
            ease: beliefMotion.ambientEase,
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

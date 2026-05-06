'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import { BELIEF_PHRASES } from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollProvider';
import { GHOST_EASE } from '@/config/motion';

export function BeliefScrollText() {
  const { phraseProgress, prefersReducedMotion } = useBeliefsScrollContext();
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(phraseProgress, 'change', (latest) => {
    const rounded = Math.round(latest);
    if (
      rounded !== activeIndex &&
      rounded >= 0 &&
      rounded < BELIEF_PHRASES.length
    ) {
      setActiveIndex(rounded);
    }
  });

  const activePhrase = BELIEF_PHRASES[activeIndex];

  return (
    <div
      data-testid="beliefs-scroll-text"
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-cta)] flex flex-col justify-end pb-[20vh] md:justify-center md:pb-0"
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12 lg:px-16 text-center md:text-left">
        <div aria-live="polite" className="sr-only">
          {activePhrase}
        </div>

        <div className="relative h-[4em] md:h-[2em] w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.h3
              key={activeIndex}
              aria-hidden="true"
              data-testid="belief-phrase"
              data-animation-contract="inview-y-opacity-blur"
              className="absolute inset-x-0 bottom-0 md:top-1/2 md:-translate-y-1/2 font-medium leading-[1.1] text-white/90"
              style={{
                fontSize: 'clamp(2.5rem, 14vw, 5.5rem)', // phraseMobile
              }}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 18, filter: 'blur(6px)' }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -18, filter: 'blur(6px)' }
              }
              transition={{ duration: 0.6, ease: GHOST_EASE }}
            >
              {activePhrase}
            </motion.h3>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

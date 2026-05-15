'use client';

import { animate, inView } from 'motion';
import { useEffect } from 'react';
import {
  BELIEF_PHRASE_ITEMS,
  beliefMotion,
  beliefColors,
  beliefLayout,
  beliefZIndex,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefScrollText() {
  const { shouldReduceMotion, isMobile } = useBeliefsScrollContext();

  useEffect(() => {
    const stop = inView(
      '#o-que-me-move [data-belief-phrase]',
      (el) => {
        const element = el as HTMLElement;

        if (shouldReduceMotion) {
          const controls = animate(
            element,
            { opacity: 1, x: 0 },
            { duration: 0.16, ease: 'ease-out' }
          );
          return () => controls.stop();
        }

        const enterX = isMobile ? -48 : -100;

        const enterControls = animate(
          element,
          { opacity: 1, x: [enterX, 0] },
          {
            duration: beliefMotion.textRevealDuration,
            ease: beliefMotion.referenceEase as [number, number, number, number],
          }
        );

        return () => {
          enterControls.stop();
          animate(
            element,
            { opacity: 0, x: enterX },
            {
              duration: beliefMotion.textExitDuration,
              ease: beliefMotion.referenceEase as [number, number, number, number],
            }
          );
        };
      },
      { amount: 0.55 }
    );

    return () => stop();
  }, [isMobile, shouldReduceMotion]);

  return (
    <div
      data-testid="beliefs-scroll-text"
      className="relative"
      style={{ zIndex: beliefZIndex.scrollText }}
    >
      {BELIEF_PHRASE_ITEMS.map((phrase, index) => (
        <section
          key={phrase.id}
          data-belief-section
          data-index={index}
          className="relative flex items-center"
          style={{ height: beliefLayout.phraseSectionHeight }}
        >
          <div className="pointer-events-none ml-[clamp(1.5rem,6vw,6rem)] max-w-[38vw] text-left max-md:fixed max-md:bottom-[20vh] max-md:left-1/2 max-md:ml-0 max-md:w-[min(86vw,28rem)] max-md:-translate-x-1/2 max-md:text-center">
            <p
              data-belief-phrase
              className="select-none font-h1 text-[clamp(2.8rem,5.8vw,6.3rem)] font-bold italic leading-[1.05] tracking-[-0.03em] opacity-0 will-change-transform max-md:text-[clamp(2rem,8vw,3rem)]"
              style={{ color: beliefColors.blueAccent }}
            >
              {phrase.text}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}

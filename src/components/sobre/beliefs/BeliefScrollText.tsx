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
          element.style.opacity = '1';
          return () => {
            element.style.opacity = '0';
          };
        }

        // Entrance: from left — desktop -100, mobile -48
        const enterX = isMobile ? -48 : -100;

        const enterControls = animate(
          element,
          { opacity: 1, x: [enterX, 0] },
          {
            duration: beliefMotion.textRevealDuration,
            ease: beliefMotion.referenceEase as any,
          }
        );

        return () => {
          enterControls.stop();

          animate(
            element,
            { opacity: 0, x: enterX },
            {
              duration: beliefMotion.textExitDuration,
              ease: beliefMotion.referenceEase as any,
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
          <div
            className={[
              'pointer-events-none',
              isMobile
                ? 'fixed bottom-[20vh] left-1/2 w-[min(86vw,28rem)] -translate-x-1/2 text-center'
                : 'ml-[clamp(1.5rem,6vw,6rem)] max-w-[38vw] text-left',
            ].join(' ')}
          >
            <p
              data-belief-phrase
              className="select-none font-h1 font-bold italic leading-[1.05] tracking-[-0.03em] opacity-0 will-change-transform"
              style={{
                color: beliefColors.blueAccent,
                fontSize: isMobile
                  ? 'clamp(2rem, 8vw, 3rem)'
                  : 'clamp(2.8rem, 5.8vw, 6.3rem)',
              }}
            >
              {phrase.text}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}

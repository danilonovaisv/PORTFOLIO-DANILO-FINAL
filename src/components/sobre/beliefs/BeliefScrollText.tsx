'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import {
  BELIEF_PHRASE_ITEMS,
  beliefMotion,
  beliefColors,
  beliefLayout,
  beliefZIndex,
} from '@/config/beliefTokens';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

// NOTE: blueAccent (#4fe6ff) over pink (#f501d3) — contrast ratio ~2.3:1, below AA (4.5:1).
// Mitigated by textShadow: '0 2px 24px rgba(0,0,0,0.28)'. Documented per T-011.

gsap.registerPlugin(ScrollTrigger);

export function BeliefScrollText() {
  const { containerRef, shouldReduceMotion, isMobile } =
    useBeliefsScrollContext();

  useEffect(() => {
    if (!containerRef.current) return;

    const enterX = isMobile ? -48 : -100;

    const ctx = gsap.context(() => {
      const phrases = containerRef.current!.querySelectorAll(
        '[data-belief-phrase]'
      );

      // Set all phrases to hidden initially
      gsap.set(phrases, { opacity: 0, x: enterX });

      phrases.forEach((element) => {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => {
            gsap.to(element, {
              opacity: 1,
              x: 0,
              duration: shouldReduceMotion
                ? 0.16
                : beliefMotion.textRevealDuration,
              ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            });
          },
          onLeave: () => {
            gsap.to(element, {
              opacity: 0,
              x: shouldReduceMotion ? 0 : enterX,
              duration: shouldReduceMotion
                ? 0.16
                : beliefMotion.textExitDuration,
              ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            });
          },
          onLeaveBack: () => {
            gsap.to(element, {
              opacity: 0,
              x: shouldReduceMotion ? 0 : enterX,
              duration: shouldReduceMotion
                ? 0.16
                : beliefMotion.textExitDuration,
              ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, [containerRef, isMobile, shouldReduceMotion]);

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
              data-testid="belief-phrase"
              data-animation-contract="viewport-x-opacity"
              className="select-none font-h1 text-[clamp(2.8rem,5.8vw,6.3rem)] font-medium italic leading-[1.05] tracking-[-0.03em] opacity-0 will-change-transform max-md:text-[clamp(2rem,8vw,3rem)]"
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

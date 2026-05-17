'use client';

import gsap from 'gsap';
import { useEffect } from 'react';
import type { CSSProperties } from 'react';
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

export function BeliefScrollText() {
  const { activeIndex, shouldReduceMotion, isMobile } =
    useBeliefsScrollContext();

  useEffect(() => {
    const enterX = isMobile ? -48 : -100;
    const phrases = document.querySelectorAll('[data-belief-phrase]');
    if (phrases.length === 0) return;

    phrases.forEach((element, index) => {
      gsap.to(element, {
        opacity: index === activeIndex ? 1 : 0,
        x: index === activeIndex ? 0 : shouldReduceMotion ? 0 : enterX,
        duration:
          index === activeIndex
            ? shouldReduceMotion
              ? 0.16
              : beliefMotion.textRevealDuration
            : shouldReduceMotion
              ? 0.16
              : beliefMotion.textExitDuration,
        ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
        overwrite: 'auto',
      });
    });
  }, [activeIndex, isMobile, shouldReduceMotion]);

  return (
    <div
      data-testid="beliefs-scroll-text"
      className="relative"
      style={{ zIndex: beliefZIndex.scrollText }}
    >
      <div
        data-testid="beliefs-phrase-stage"
        className="pointer-events-none fixed z-[40] min-h-[3.3em] md:min-h-[2.35em]"
        style={
          {
            left: isMobile ? '50%' : 'clamp(2rem, 8vw, 9rem)',
            bottom: isMobile ? beliefLayout.mobilePhraseBottom : 'auto',
            top: isMobile ? 'auto' : beliefLayout.desktopPhraseTop,
            width: isMobile
              ? beliefLayout.mobilePhraseWidth
              : beliefLayout.desktopPhraseWidth,
            transform: isMobile
              ? 'translateX(-50%)'
              : 'translateY(-50%)',
            textAlign: isMobile ? 'center' : 'left',
          } as CSSProperties
        }
      >
        {BELIEF_PHRASE_ITEMS.map((phrase) => (
          <p
            key={phrase.id}
            data-belief-phrase
            data-testid="belief-phrase"
            data-animation-contract="viewport-x-opacity"
            className="absolute inset-0 select-none text-balance font-h1 text-[clamp(2rem,8vw,3rem)] font-medium italic leading-[0.98] tracking-[-0.035em] opacity-0 will-change-transform md:text-[clamp(3rem,5.6vw,6.15rem)]"
            style={{ color: beliefColors.blueAccent }}
          >
            {phrase.text}
          </p>
        ))}
      </div>

      {BELIEF_PHRASE_ITEMS.map((phrase, index) => (
        <section
          key={phrase.id}
          data-belief-section
          data-index={index}
          className="relative flex items-center"
          style={{ height: beliefLayout.phraseSectionHeight }}
        />
      ))}
    </div>
  );
}

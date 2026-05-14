'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BELIEF_PHRASE_ITEMS,
  beliefColors,
  beliefLayout,
  beliefZIndex,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function BeliefPhraseSection({ text, index }: { text: string; index: number }) {
  const { isMobile, shouldReduceMotion } = useBeliefsScrollContext();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const ctx = gsap.context(() => {
      // Initial state: Hidden and offset to the left
      gsap.set(textEl, {
        opacity: 0,
        x: shouldReduceMotion ? 0 : -80,
      });

      ScrollTrigger.create({
        trigger: section,
        // Triggering when the section enters/leaves the central part of the viewport
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => {
          gsap.to(textEl, {
            opacity: 1,
            x: 0,
            duration: shouldReduceMotion ? 0.4 : 1.2,
            ease: GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
        },
        onLeave: () => {
          gsap.to(textEl, {
            opacity: 0,
            x: shouldReduceMotion ? 0 : 80, // Exit to the right
            duration: 0.8,
            ease: 'power3.in',
            overwrite: 'auto',
          });
        },
        onEnterBack: () => {
          gsap.to(textEl, {
            opacity: 1,
            x: 0,
            duration: shouldReduceMotion ? 0.4 : 1.2,
            ease: GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          gsap.to(textEl, {
            opacity: 0,
            x: shouldReduceMotion ? 0 : -80, // Exit back to the left
            duration: 0.8,
            ease: 'power3.in',
            overwrite: 'auto',
          });
        },
      });
    });

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
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
        <h3
          ref={textRef}
          data-testid="belief-phrase"
          data-animation-contract="viewport-x-opacity"
          aria-label={text}
          className="font-medium italic leading-[0.9] tracking-[-0.045em] will-change-transform"
          style={{
            zIndex: beliefZIndex.scrollText,
            color: beliefColors.blueAccent,
            maxWidth: isMobile ? '100%' : beliefLayout.desktopPhraseMaxWidth,
            fontSize: isMobile
              ? 'clamp(2.0rem, 8vw, 3.0rem)'
              : 'clamp(2.8rem, 5.8vw, 6.3rem)',
            textShadow: '0 1px 12px rgba(0, 0, 0, 0.18)',
            whiteSpace: 'pre-line', // respects \n in phrase strings
          }}
        >
          {text}
        </h3>
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

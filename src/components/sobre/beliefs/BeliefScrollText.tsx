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
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function BeliefPhraseSection({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { isMobile, shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    const section = ref.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.set(heading, {
        autoAlpha: 0,
        y: shouldReduceMotion ? 0 : 18,
        filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)',
      });

      ScrollTrigger.create({
        trigger: section,
        start: isMobile ? 'top 82%' : 'top 66%',
        onEnter: () => {
          gsap.to(heading, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: shouldReduceMotion ? 0.2 : 0.9,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
        },
        onEnterBack: () => {
          gsap.to(heading, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: shouldReduceMotion ? 0.2 : 0.6,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
        },
        onLeave: () => {
          gsap.to(heading, {
            autoAlpha: 0,
            y: shouldReduceMotion ? 0 : -18,
            filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)',
            duration: shouldReduceMotion ? 0.2 : 0.5,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          gsap.to(heading, {
            autoAlpha: 0,
            y: shouldReduceMotion ? 0 : 18,
            filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)',
            duration: shouldReduceMotion ? 0.2 : 0.5,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile, shouldReduceMotion]);

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
            ? 'items-end justify-center pb-[16vh] text-center'
            : 'items-center justify-start text-left',
        ].join(' ')}
      >
        <h3
          ref={headingRef}
          data-testid="belief-phrase"
          data-animation-contract="viewport-x-opacity"
          aria-label={text}
          className="font-bold italic leading-[0.9] tracking-[-0.045em] opacity-0"
          style={{
            zIndex: beliefZIndex.scrollText,
            color: beliefColors.blueAccent,
            maxWidth: isMobile ? '100%' : beliefLayout.desktopPhraseMaxWidth,
            fontSize: isMobile
              ? 'clamp(2.05rem, 8vw, 3.15rem)'
              : 'clamp(2.35rem, 5vw, 5.25rem)',
            textShadow: '0 2px 24px rgba(0, 0, 0, 0.28)',
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

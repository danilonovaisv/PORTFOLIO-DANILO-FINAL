'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { BELIEF_PHRASES } from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollProvider';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { MOTION_TOKENS } from '@/config/motion';

export function BeliefScrollText() {
  const { sectionRef, prefersReducedMotion } = useBeliefsScrollContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRefs = useRef<(HTMLSpanElement | null)[][]>([]);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !containerRef.current)
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5, // Ghost editorial smoothness
        },
      });

      const start = 0.08;
      const end = 0.76;
      const step = (end - start) / BELIEF_PHRASES.length;

      BELIEF_PHRASES.forEach((_, i) => {
        const words = wordsRefs.current[i];
        if (!words || words.length === 0) return;

        const phraseStart = start + i * step;
        const phraseEnd = phraseStart + step;
        const revealDuration = step * 0.4;
        const exitDuration = step * 0.4;

        // Entry animation with stagger for words
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: MOTION_TOKENS.offset.standard,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.05,
            duration: revealDuration,
            ease: GSAP_GHOST_EASE,
          },
          phraseStart
        );

        // Exit animation
        tl.to(
          words,
          {
            opacity: 0,
            y: -MOTION_TOKENS.offset.standard,
            filter: 'blur(12px)',
            stagger: 0.03,
            duration: exitDuration,
            ease: GSAP_GHOST_EASE,
          },
          phraseEnd - exitDuration
        );
      });
    });

    return () => ctx.revert();
  }, [sectionRef, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      data-testid="beliefs-scroll-text"
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-cta)] flex flex-col justify-end pb-[20vh] md:justify-center md:pb-0"
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12 lg:px-16 text-center md:text-left">
        <div className="relative h-[4em] md:h-[2em] w-full max-w-4xl">
          {BELIEF_PHRASES.map((phrase, i) => (
            <h3
              key={i}
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 md:top-1/2 md:-translate-y-1/2 font-medium leading-[1.1] text-white/90"
              style={{
                fontSize: 'clamp(2.5rem, 14vw, 5.5rem)',
              }}
            >
              {phrase.split(' ').map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  ref={(el) => {
                    if (!wordsRefs.current[i]) wordsRefs.current[i] = [];
                    wordsRefs.current[i][wordIndex] = el;
                  }}
                  className="inline-block will-change-[transform,opacity,filter]"
                  style={{ opacity: 0 }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
}

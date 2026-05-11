'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { BELIEF_PHRASES, beliefLayers } from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
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



  return (
    <div
      ref={containerRef}
      data-testid="beliefs-scroll-text"
      className="pointer-events-none fixed inset-0 flex flex-col justify-end pb-[15vh] md:justify-center md:pb-0"
      style={{ zIndex: beliefLayers.phrases }}
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12 lg:px-16">
        <div className="flex flex-row items-center gap-4 md:block">
          {/* Mobile spacer for Ghost (Ghost is on the left) */}
          <div className="w-[35%] shrink-0 md:hidden" aria-hidden="true" />

          <div className="relative h-[6em] md:h-[2.5em] flex-1">
            {BELIEF_PHRASES.map((phrase, i) => (
              <h3
                key={i}
                aria-hidden="true"
                data-testid="belief-phrase"
                data-animation-contract="inview-y-opacity-blur"
                className="absolute inset-x-0 bottom-0 md:top-1/2 md:-translate-y-1/2 font-medium leading-[1.1] text-white/90"
                style={{
                  fontSize: 'clamp(2.5rem, 10vw, 5.5rem)',
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
                    style={{ opacity: prefersReducedMotion ? 0.9 : 0 }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

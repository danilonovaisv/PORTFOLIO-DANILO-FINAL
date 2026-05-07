'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  BELIEF_MANIFESTO_LINES,
  BELIEF_SCROLL_THRESHOLDS,
} from './belief.constants';
import { SplitGhostText } from './SplitGhostText';
import { useBeliefsScrollContext } from './BeliefsScrollProvider';

export function BeliefManifesto() {
  const { sectionRef } = useBeliefsScrollContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Manifesto appears after phrases
      // Start: thresholds.climaxStart (0.56)
      // Peak: thresholds.climaxEnd (0.72)
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power3.out',
          duration: 0.2, // Relative to timeline scrub
        },
        BELIEF_SCROLL_THRESHOLDS.climaxStart
      );

      // Final lock
      tl.to(
        containerRef.current,
        {
          scale: 1.05,
          duration: 0.1,
          ease: 'power2.inOut',
        },
        BELIEF_SCROLL_THRESHOLDS.finalLock
      );
    });

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div
      ref={containerRef}
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-overlay)] flex items-center justify-center px-6"
      aria-label="ISSO É GHOST DESIGN"
      style={{ opacity: 0 }} // Initial state for GSAP
    >
      <div className="mx-auto w-full max-w-[1680px] text-center">
        {BELIEF_MANIFESTO_LINES.map((line) => (
          <SplitGhostText
            key={line}
            as="h2"
            text={line}
            splitType="words"
            textAlign="center"
            className="block font-extrabold uppercase leading-[0.88] text-white"
          />
        ))}
      </div>
    </div>
  );
}

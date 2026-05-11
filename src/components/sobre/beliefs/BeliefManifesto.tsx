'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  BELIEF_MANIFESTO_LINES,
  BELIEF_SCROLL_THRESHOLDS,
  SPLIT_TEXT_CONFIG,
  beliefLayers,
} from './belief.constants';
import { SplitGhostText } from './SplitGhostText';
import { useBeliefsScrollContext } from './BeliefsScrollProvider';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { MOTION_TOKENS } from '@/config/motion';

export function BeliefManifesto() {
  const { sectionRef, prefersReducedMotion } = useBeliefsScrollContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const { manifesto } = SPLIT_TEXT_CONFIG;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !containerRef.current)
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Manifesto container appears after phrases
      // Start: thresholds.climaxStart (0.56)
      // Peak: thresholds.climaxEnd (0.72)
      tl.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: MOTION_TOKENS.offset.standard,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: GSAP_GHOST_EASE,
          duration: 0.2,
        },
        BELIEF_SCROLL_THRESHOLDS.climaxStart
      );

      // Stagger each manifesto line with editorial rhythm
      const lines = containerRef.current?.querySelectorAll(
        '[data-manifesto-line]'
      );
      if (lines && lines.length > 0) {
        lines.forEach((line, i) => {
          tl.fromTo(
            line,
            { opacity: 0, x: -18, filter: 'blur(8px)' },
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              duration: 0.06,
              ease: GSAP_GHOST_EASE,
            },
            BELIEF_SCROLL_THRESHOLDS.climaxStart + 0.04 + i * 0.03
          );
        });
      }

      // Final lock — opacity-only hold (scale is forbidden on content/UI)
      tl.to(
        containerRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: GSAP_GHOST_EASE,
        },
        BELIEF_SCROLL_THRESHOLDS.finalLock
      );
    });

    return () => ctx.revert();
  }, [sectionRef, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      className="pointer-events-none fixed inset-0 flex items-center justify-center px-6"
      aria-label="ISSO É GHOST DESIGN"
      style={{
        opacity: prefersReducedMotion ? 1 : 0,
        zIndex: beliefLayers.manifesto,
      }}
    >
      <div className="mx-auto w-full max-w-[1680px] text-center">
        {BELIEF_MANIFESTO_LINES.map((line) => (
          <div
            key={line}
            data-manifesto-line
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            <SplitGhostText
              as="h2"
              text={line}
              splitType={manifesto.splitType}
              delay={manifesto.delay}
              duration={manifesto.duration}
              from={manifesto.from}
              to={manifesto.to}
              ease={GSAP_GHOST_EASE}
              textAlign="center"
              className="block font-extrabold uppercase leading-[0.88] text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

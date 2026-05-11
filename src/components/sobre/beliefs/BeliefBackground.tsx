'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { BELIEF_COLOR_STOPS } from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';

export function BeliefBackground() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const grainRef = useRef<HTMLDivElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);
  const { sectionRef, prefersReducedMotion } = useBeliefsScrollContext();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !bgRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Distribute colors across the timeline with Ghost atmospheric easing
      BELIEF_COLOR_STOPS.forEach((color) => {
        tl.to(bgRef.current, {
          backgroundColor: color,
          duration: 1,
          ease: GSAP_GHOST_EASE,
        });
      });

      // Animate grain intensity: subtle at start, more pronounced at climax
      if (grainRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          })
          .fromTo(
            grainRef.current,
            { opacity: 0.03 },
            { opacity: 0.08, duration: 0.5, ease: 'none' },
            0
          )
          .to(
            grainRef.current,
            { opacity: 0.04, duration: 0.5, ease: 'none' },
            0.5
          );
      }

      // Vignette intensifies with scroll progress
      if (vignetteRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          })
          .fromTo(
            vignetteRef.current,
            { opacity: 0.3 },
            { opacity: 0.7, duration: 0.6, ease: GSAP_GHOST_EASE },
            0.1
          )
          .to(
            vignetteRef.current,
            { opacity: 0.4, duration: 0.4, ease: GSAP_GHOST_EASE },
            0.7
          );
      }
    });

    return () => ctx.revert();
  }, [sectionRef, prefersReducedMotion]);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      data-testid="beliefs-background"
      className="absolute inset-0 z-[var(--z-layer-base)] bg-background"
    >
      {/* Radial Vignette — intensifies during scroll */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, transparent 30%, color-mix(in oklab, var(--color-background) 60%, transparent) 100%)',
          opacity: 0.3,
        }}
      />

      {/* Ethereal Grain Overlay — variable intensity */}
      <div
        ref={grainRef}
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

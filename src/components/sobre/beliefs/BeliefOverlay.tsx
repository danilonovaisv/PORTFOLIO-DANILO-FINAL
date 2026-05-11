'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useBeliefsScrollContext } from './BeliefsScrollProvider';
import { BELIEF_SCROLL_THRESHOLDS } from './belief.constants';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';

export function BeliefOverlay() {
  const { sectionRef, prefersReducedMotion } = useBeliefsScrollContext();
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !overlayRef.current || !sectionRef.current)
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

      // Overlay reacts to scroll: subtle at entry, peaks at climax, fades at exit
      tl.fromTo(
        overlayRef.current,
        { opacity: 0.05 },
        { opacity: 0.15, duration: 0.3, ease: 'none' },
        0.05
      );

      // Climax intensity — matches manifesto reveal
      tl.to(
        overlayRef.current,
        { opacity: 0.35, duration: 0.2, ease: GSAP_GHOST_EASE },
        BELIEF_SCROLL_THRESHOLDS.climaxStart
      );

      // Sustain through climax
      tl.to(
        overlayRef.current,
        { opacity: 0.3, duration: 0.1, ease: 'none' },
        BELIEF_SCROLL_THRESHOLDS.climaxEnd
      );

      // Fade at final lock
      tl.to(
        overlayRef.current,
        { opacity: 0.1, duration: 0.18, ease: GSAP_GHOST_EASE },
        BELIEF_SCROLL_THRESHOLDS.finalLock
      );
    });

    return () => ctx.revert();
  }, [sectionRef, prefersReducedMotion]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-glass)] bg-background/10 mix-blend-overlay"
      style={{
        opacity: prefersReducedMotion ? 0.2 : 0.05,
        backgroundImage:
          'radial-gradient(circle at center, transparent 0%, color-mix(in oklab, var(--color-background) 40%, transparent) 100%)',
      }}
    />
  );
}

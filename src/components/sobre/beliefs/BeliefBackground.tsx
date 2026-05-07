'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { BELIEF_COLOR_STOPS } from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollProvider';

export function BeliefBackground() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const grainRef = useRef<HTMLDivElement | null>(null);
  const { sectionRef } = useBeliefsScrollContext();

  useLayoutEffect(() => {
    if (!bgRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Distribute colors across the timeline with ethereal easing
      BELIEF_COLOR_STOPS.forEach((color) => {
        tl.to(bgRef.current, {
          backgroundColor: color,
          duration: 1,
          ease: 'power1.inOut', // Soft atmospheric transition
        });
      });

      // Animate grain opacity for dynamic "vibration"
      if (grainRef.current) {
        gsap.to(grainRef.current, {
          opacity: 0.07,
          repeat: -1,
          yoyo: true,
          duration: 0.1,
          ease: 'none',
        });
      }
    });

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      data-testid="beliefs-background"
      className="fixed inset-0 z-[var(--z-layer-base)] bg-[#040013]"
    >
      {/* Ethereal Grain Overlay */}
      <div
        ref={grainRef}
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

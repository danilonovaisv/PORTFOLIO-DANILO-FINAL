'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

gsap.registerPlugin(ScrollTrigger);

export function BeliefOverlay() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { containerRef, shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    if (!ref.current || !containerRef.current) return;

    if (shouldReduceMotion) {
      gsap.set(ref.current, { opacity: 0.06 });
      return;
    }

    const ctx = gsap.context(() => {
      // Scrub opacity: [0.04, 0.08, 0.1, 0.08, 0.04] across scroll progress
      // mapped to [0%, 18%, 50%, 82%, 100%] of section height
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: 'top end',
        end: 'bottom end',
        scrub: 0.85,
        onUpdate: (self) => {
          const p = self.progress;
          let opacity: number;

          if (p <= 0.18) {
            opacity = gsap.utils.mapRange(0, 0.18, 0.04, 0.08, p);
          } else if (p <= 0.5) {
            opacity = gsap.utils.mapRange(0.18, 0.5, 0.08, 0.1, p);
          } else if (p <= 0.82) {
            opacity = gsap.utils.mapRange(0.5, 0.82, 0.1, 0.08, p);
          } else {
            opacity = gsap.utils.mapRange(0.82, 1, 0.08, 0.04, p);
          }

          gsap.set(ref.current!, { opacity });
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-black"
      style={{
        zIndex: beliefZIndex.overlay,
        opacity: 0.06,
      }}
    />
  );
}

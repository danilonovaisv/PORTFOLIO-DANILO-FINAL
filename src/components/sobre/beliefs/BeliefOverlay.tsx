'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BeliefOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const { containerRef, shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    const overlay = ref.current;
    const container = containerRef.current;
    if (!overlay || !container) return;

    if (shouldReduceMotion) {
      gsap.set(overlay, { opacity: 0.05 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(overlay, { opacity: 0 });

      gsap.to(overlay, {
        keyframes: [{ opacity: 0.1 }, { opacity: 0 }],
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.85,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-black"
      style={{ zIndex: 10, opacity: shouldReduceMotion ? 0.05 : 0 }}
    />
  );
}

'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useBeliefsScrollContext } from './BeliefsScrollProvider';

export function BeliefOverlay() {
  const { prefersReducedMotion } = useBeliefsScrollContext();
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.1 },
        {
          opacity: 0.3,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-glass)] bg-black/10 mix-blend-overlay"
      style={{
        opacity: prefersReducedMotion ? 0.3 : 0.1,
        backgroundImage:
          'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
      }}
    />
  );
}

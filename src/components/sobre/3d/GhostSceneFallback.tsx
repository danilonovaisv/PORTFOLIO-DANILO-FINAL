'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useBeliefsScrollContext } from '../beliefs/BeliefsScrollContext';

export function GhostSceneFallback() {
  const { sectionRef, prefersReducedMotion } = useBeliefsScrollContext();
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Map progress to opacity: [0.1, 0.2, 0.85, 0.95] -> [0, 1, 1, 0]
      tl.set(svgRef.current, { opacity: 0 });

      tl.to(
        svgRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: 'none',
        },
        0.1
      );

      tl.to(
        svgRef.current,
        {
          opacity: 1,
          duration: 0.65,
          ease: 'none',
        },
        0.2
      );

      tl.to(
        svgRef.current,
        {
          opacity: 0,
          duration: 0.1,
          ease: 'none',
        },
        0.85
      );
    });

    return () => ctx.revert();
  }, [sectionRef, prefersReducedMotion]);

  return (
    <div
      data-testid="ghost-fallback"
      data-ghost-scene
      className="pointer-events-none absolute inset-0 z-[var(--z-layer-3d)] flex items-center justify-center"
    >
      <svg
        ref={svgRef}
        role="img"
        aria-label="Silhueta do Ghost"
        viewBox="0 0 200 240"
        className="h-[44vh] w-auto md:h-[58vh]"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        fill="none"
      >
        <path
          d="M100 12c-39 0-70 31-70 70v118c0 8 9 12 15 7l18-14c4-3 9-3 13 0l18 14c4 3 10 3 14 0l18-14c4-3 9-3 13 0l18 14c6 5 15 1 15-7V82c0-39-31-70-72-70Z"
          fill="var(--color-text)"
        />
        <ellipse
          cx="78"
          cy="100"
          rx="9"
          ry="13"
          fill="var(--color-background)"
        />
        <ellipse
          cx="122"
          cy="100"
          rx="9"
          ry="13"
          fill="var(--color-background)"
        />
        <path
          d="M40 70h120l-6-22a18 18 0 0 0-17-13H63a18 18 0 0 0-17 13L40 70Z"
          fill="var(--color-background)"
        />
        <rect
          x="40"
          y="68"
          width="120"
          height="6"
          fill="var(--color-redAccent)"
        />
      </svg>
    </div>
  );
}

'use client';

import { useContext } from 'react';
import { m, useTransform, useMotionValue } from 'motion/react';
import { BeliefsScrollContext } from '../beliefs/BeliefsScrollProvider';
import { Z_INDEX } from '@/config/z-indices';

export function GhostSceneFallback() {
  // Safe: works both inside and outside BeliefsScrollProvider
  // (needed when used as Suspense/ErrorBoundary fallback prop)
  const context = useContext(BeliefsScrollContext);
  const fallbackProgress = useMotionValue(0);
  const scrollYProgress = context?.scrollYProgress ?? fallbackProgress;
  const prefersReducedMotion = context?.prefersReducedMotion ?? false;

  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  return (
    <div
      data-testid="ghost-fallback"
      data-ghost-scene
      className="pointer-events-none fixed inset-0 flex items-center justify-center"
      style={{ zIndex: Z_INDEX.beliefs.ghost }}
    >
      <m.svg
        role="img"
        aria-label="Silhueta do Ghost"
        viewBox="0 0 200 240"
        className="h-[44vh] w-auto md:h-[58vh]"
        style={prefersReducedMotion ? { opacity: 1 } : { opacity }}
        fill="none"
      >
        <path
          d="M100 12c-39 0-70 31-70 70v118c0 8 9 12 15 7l18-14c4-3 9-3 13 0l18 14c4 3 10 3 14 0l18-14c4-3 9-3 13 0l18 14c6 5 15 1 15-7V82c0-39-31-70-72-70Z"
          fill="#ffffff"
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
        <rect x="40" y="68" width="120" height="6" fill="#e10b1a" />
      </m.svg>
    </div>
  );
}

'use client';

import { m, useTransform } from 'framer-motion';
import {
  BELIEF_COLOR_STOPS,
  BELIEF_SCROLL_THRESHOLDS,
} from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefBackground() {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();

  // Fade in background, hold during phrases, slight fade/transition for manifesto
  const opacity = useTransform(
    scrollYProgress,
    [
      0,
      BELIEF_SCROLL_THRESHOLDS.entryStart,
      BELIEF_SCROLL_THRESHOLDS.entryEnd,
      BELIEF_SCROLL_THRESHOLDS.climaxEnd,
      BELIEF_SCROLL_THRESHOLDS.finalLock,
    ],
    [0, 0, 0.9, 0.9, 0.35] // Smoother max opacity for better Ghost visibility
  );

  // Distribute colors across the timeline
  const colorOffsets = BELIEF_COLOR_STOPS.map(
    (_, i) => i / Math.max(1, BELIEF_COLOR_STOPS.length - 1)
  );
  const backgroundColor = useTransform(scrollYProgress, colorOffsets, [
    ...BELIEF_COLOR_STOPS,
  ]);

  // Animate grain intensity: very subtle (Ghost System editorial style)
  const grainOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.02, 0.04, 0.03]
  );

  // Vignette intensifies with scroll progress
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.7, 1],
    [0.2, 0.5, 0.3]
  );

  return (
    <m.div
      aria-hidden="true"
      data-testid="beliefs-background"
      className="absolute inset-0 z-[var(--z-layer-base)] bg-background"
      style={prefersReducedMotion ? {} : { opacity, backgroundColor }}
    >
      {/* Radial Vignette — intensifies during scroll */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, transparent 40%, color-mix(in oklab, var(--color-background) 50%, transparent) 100%)',
          opacity: prefersReducedMotion ? 0.2 : vignetteOpacity,
        }}
      />

      {/* Ethereal Grain Overlay — variable intensity */}
      <m.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: prefersReducedMotion ? 0.02 : grainOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </m.div>
  );
}

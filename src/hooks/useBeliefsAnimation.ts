'use client';
import { useTransform, MotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BRAND } from '@/config/brand';

/* ────────────────────────────────────────────────────────
   CONSTANTS & CONFIG
   ──────────────────────────────────────────────────────── */

/**
 * Per-section background colors — each BeliefSection gets its own solid color.
 * Order matches the PHRASES array in AboutBeliefs.tsx.
 * CSS `transition-colors` handles the smooth blending between sections.
 */
export const BELIEF_COLORS = [
  BRAND.colors.bluePrimary,   // #0048ff
  BRAND.colors.purpleDetails, // #8705f2
  BRAND.colors.pinkDetails,   // #f501d3
  BRAND.colors.bluePrimary,   // #0048ff
  BRAND.colors.purpleDetails, // #8705f2
  BRAND.colors.pinkDetails,   // #f501d3
];

export const BELIEF_INTRO_END = 0.1;
export const BELIEF_PHRASE_ZONE_END = 0.82;
export const BELIEF_FINAL_START = 0.86;

export function getBeliefSegment(index: number, totalPhrases: number) {
  const span = (BELIEF_PHRASE_ZONE_END - BELIEF_INTRO_END) / totalPhrases;
  const start = BELIEF_INTRO_END + span * index;
  const end = start + span;
  return { start, end, span };
}

interface UseBeliefsAnimationProps {
  scrollYProgress: MotionValue;
  totalPhrases: number;
}

/**
 * useBeliefsAnimation — Simplified hook for "O Que Me Move" section.
 *
 * Architecture (per spec):
 * - Background color is now per-section via BELIEF_COLORS (no interpolation)
 * - Ghost intensity scales 0→1 over scroll
 * - Final manifesto opacity gate at BELIEF_FINAL_START
 * - Header opacity fades in/out
 */
export function useBeliefsAnimation({
  scrollYProgress,
  totalPhrases,
}: UseBeliefsAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const segment = (BELIEF_PHRASE_ZONE_END - BELIEF_INTRO_END) / totalPhrases;

  const currentSection = useTransform(scrollYProgress, (progress) => {
    if (progress <= BELIEF_INTRO_END || progress >= BELIEF_PHRASE_ZONE_END) {
      return -1;
    }

    return Math.min(
      totalPhrases - 1,
      Math.floor((progress - BELIEF_INTRO_END) / segment)
    );
  });

  const ghostIntensity = useTransform(scrollYProgress, (progress) => {
    if (progress <= 0.03 || prefersReducedMotion) return 0;
    if (progress >= BELIEF_FINAL_START) return 1;

    const normalized = Math.min(
      1,
      Math.max(0, progress - 0.03) / (BELIEF_FINAL_START - 0.03)
    );
    return Math.pow(normalized, 1.2);
  });

  const showFinalManifesto = useTransform(scrollYProgress, (progress) => {
    if (progress < BELIEF_FINAL_START) return 0;
    return Math.min(1, (progress - BELIEF_FINAL_START) / 0.14);
  });

  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  return {
    currentSection,
    ghostIntensity,
    showFinalManifesto,
    headerOpacity,
    prefersReducedMotion,
  };
}

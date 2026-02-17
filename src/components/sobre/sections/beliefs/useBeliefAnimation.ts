'use client';

import { useState } from 'react';
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

/* ────────────────────────────────────────────────────────
   CONSTANTS
   ──────────────────────────────────────────────────────── */

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Phrases for the section — exported for RotatingText to consume.
 * Per spec Section 7: rotation order.
 */
export const PHRASES: readonly string[] = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

/**
 * Color palette in HSL — sequential order per spec Section 3.1.
 * Using HSL avoids the "muddy brown" transitions that RGB lerp produces.
 *
 * Index 0 = initial void (#040013)
 * Then: bluePrimary → purpleDetails → pinkDetails (repeating)
 */
interface HSLColor {
  h: number;
  s: number;
  l: number;
}

const COLORS_HSL: readonly HSLColor[] = [
  { h: 250, s: 100, l: 4 }, // #040013 (void background)
  { h: 223, s: 100, l: 50 }, // bluePrimary  (#0048ff)
  { h: 270, s: 97, l: 48 }, // purpleDetails (#8705f2)
  { h: 310, s: 98, l: 48 }, // pinkDetails (#f501d3)
  { h: 223, s: 100, l: 50 }, // bluePrimary
  { h: 270, s: 97, l: 48 }, // purpleDetails
  { h: 310, s: 98, l: 48 }, // pinkDetails
  { h: 223, s: 100, l: 50 }, // bluePrimary (final / manifesto)
];

/**
 * Ghost easing — power2.inOut approximation for smooth color transitions.
 */
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * HSL interpolation — produces natural, vibrant color transitions.
 * Uses shortest-path hue interpolation to avoid jumping through the color wheel.
 */
function lerpHSL(a: HSLColor, b: HSLColor, t: number): string {
  const eased = easeInOut(clamp01(t));

  // Shortest-path hue interpolation
  let dh = b.h - a.h;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;

  const h = (((a.h + dh * eased) % 360) + 360) % 360;
  const s = a.s + (b.s - a.s) * eased;
  const l = a.l + (b.l - a.l) * eased;

  return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
}

/* ────────────────────────────────────────────────────────
   HOOK — BG Color + Overlay + Manifesto Progress ONLY
   
   Per spec separation of concerns:
   - BG: useScroll + HSL interpolation (this hook)
   - Texto: inView + animate (RotatingText component)  
   - Ghost: R3F, seguindo scrollYProgress (GhostScene)
   ──────────────────────────────────────────────────────── */

interface UseBeliefAnimationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useBeliefAnimation({ containerRef }: UseBeliefAnimationProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // --- Motion Values (Reactive, no re-renders) ---
  const phraseCount = PHRASES.length;
  const finalStart = 0.82; // Static constant for transform
  const segment = finalStart / phraseCount;

  const baseColor = useTransform(scrollYProgress, (v: number) => {
    const value = clamp01(v);

    // 1. Reset / Start
    if (value <= 0.001) {
      return lerpHSL(COLORS_HSL[0], COLORS_HSL[0], 0);
    }

    // 2. Final Manifesto (82% -> 100%)
    if (value >= finalStart) {
      const local = (value - finalStart) / Math.max(1 - finalStart, 0.0001);
      return lerpHSL(
        COLORS_HSL[COLORS_HSL.length - 2],
        COLORS_HSL[COLORS_HSL.length - 1],
        local // Interpolate to final color
      );
    }

    // 3. Phrase Segments
    const index = Math.min(phraseCount - 1, Math.floor(value / segment));
    const localProgress = clamp01((value - index * segment) / segment);

    // "Color reaches 60% at 40% text visibility" -> slightly accelerated
    // Text enters [0.15, 0.85]. Color should be active there.
    const colorT = clamp01(localProgress * 1.5); // 0 -> 0.66 progress maps to 0->1 color completion

    return lerpHSL(COLORS_HSL[index], COLORS_HSL[index + 1], colorT);
  });

  const overlayOpacity = useTransform(scrollYProgress, (v: number) => {
    const value = clamp01(v);
    if (value <= 0.001 || value >= finalStart) return 0;

    const index = Math.floor(value / segment);
    const localProgress = (value - index * segment) / segment;

    // Overlay logic: ramp up during first 40%, down during last 30%
    const overlayIn = clamp01(localProgress / 0.4);
    const overlayOut = clamp01((1 - localProgress) / 0.3);
    return Math.min(overlayIn, overlayOut) * 0.25;
  });

  const overlayColor = useTransform(scrollYProgress, (v: number) => {
    const value = clamp01(v);
    if (value >= finalStart) return lerpHSL(COLORS_HSL[1], COLORS_HSL[1], 0); // Default/Safe

    const index = Math.min(phraseCount - 1, Math.floor(value / segment));
    // Overlay is "next color" usually, or current target
    return lerpHSL(COLORS_HSL[index + 1], COLORS_HSL[index + 1], 0);
  });

  // Final Progress State (keep as state if used for conditional rendering logic elsewhere, 
  // currently used for 'finalVisible' boolean which toggles components)
  // We can keep this state update but check if it's strictly needed.
  // BeliefsSection uses `finalVisible` to remove Ghost/RotatingText? 
  // No, `finalProgress > 0.06`.
  // Let's keep finalProgress in state for React conditional rendering, 
  // but colors are now optimized.

  // Actually, let's optimize the simple state update to reduce frequency
  const [finalProgress, setFinalProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v: number) => {
    const value = clamp01(v);
    if (value >= finalStart) {
      const local = (value - finalStart) / Math.max(1 - finalStart, 0.0001);
      if (Math.abs(local - finalProgress) > 0.05) {
        setFinalProgress(local);
      }
    } else if (finalProgress !== 0) {
      setFinalProgress(0);
    }
  });

  return {
    scrollYProgress,
    baseColor,
    overlayColor,
    overlayOpacity,
    finalProgress,
  };
}

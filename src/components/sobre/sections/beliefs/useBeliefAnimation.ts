'use client';

import { useMemo, useRef, useState, useCallback } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

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
  { h: 250, s: 100, l: 4 },   // #040013 (void background)
  { h: 223, s: 100, l: 50 },  // bluePrimary  (#0048ff)
  { h: 270, s: 97, l: 48 },   // purpleDetails (#8705f2)
  { h: 310, s: 98, l: 48 },   // pinkDetails (#f501d3)
  { h: 223, s: 100, l: 50 },  // bluePrimary
  { h: 270, s: 97, l: 48 },   // purpleDetails
  { h: 310, s: 98, l: 48 },   // pinkDetails
  { h: 223, s: 100, l: 50 },  // bluePrimary (final / manifesto)
];

/**
 * Ghost easing — power2.inOut approximation for smooth color transitions.
 */
function easeInOut(t: number): number {
  return t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2;
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

  const h = ((a.h + dh * eased) % 360 + 360) % 360;
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
  // --- State for React renders (background + manifesto) ---
  const [baseColor, setBaseColor] = useState(lerpHSL(COLORS_HSL[0], COLORS_HSL[0], 0));
  const [overlayColor, setOverlayColor] = useState(lerpHSL(COLORS_HSL[1], COLORS_HSL[1], 0));
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [finalProgress, setFinalProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const phraseCount = PHRASES.length;
  const finalStart = useMemo(() => 0.82, []); // Manifesto starts at 82%
  const segment = useMemo(() => finalStart / phraseCount, [finalStart, phraseCount]);

  // Refs for previous values to avoid unnecessary state updates
  const prevState = useRef({
    baseColor: '',
    overlayColor: '',
    overlayOpacity: -1,
    finalProgress: -1,
  });

  useMotionValueEvent(scrollYProgress, 'change', (rawValue) => {
    const value = clamp01(rawValue);

    // ──── RESET STATE (scroll returns to top) ────
    // Per spec Section 5: reset total ao sair da sessão
    if (value <= 0.001) {
      const resetColor = lerpHSL(COLORS_HSL[0], COLORS_HSL[0], 0);
      if (prevState.current.baseColor !== resetColor) {
        setBaseColor(resetColor);
        setOverlayColor(lerpHSL(COLORS_HSL[1], COLORS_HSL[1], 0));
        setOverlayOpacity(0);
        setFinalProgress(0);
        prevState.current.baseColor = resetColor;
        prevState.current.overlayOpacity = 0;
        prevState.current.finalProgress = 0;
      }
      return;
    }

    // ──── FINAL MANIFESTO (82% → 100%) ────
    if (value >= finalStart) {
      const local = (value - finalStart) / Math.max(1 - finalStart, 0.0001);
      const lastColor = lerpHSL(
        COLORS_HSL[COLORS_HSL.length - 2],
        COLORS_HSL[COLORS_HSL.length - 1],
        1,
      );
      const roundedFinal = Math.round(clamp01(local) * 100) / 100;

      if (prevState.current.finalProgress !== roundedFinal) {
        setBaseColor(lastColor);
        setOverlayOpacity(0);
        setFinalProgress(roundedFinal);
        prevState.current.baseColor = lastColor;
        prevState.current.overlayOpacity = 0;
        prevState.current.finalProgress = roundedFinal;
      }
      return;
    }

    // ──── PHRASE SEGMENTS (0% → 82%) ────
    const index = Math.min(phraseCount - 1, Math.floor(value / segment));
    const localProgress = clamp01((value - index * segment) / segment);

    // ─── Color interpolation (HSL, continuous, bidirectional) ───
    // Per spec: "When text is 40% visible, color reaches 60% interpolation"
    const colorT = clamp01(localProgress * 1.5);
    const currentColor = lerpHSL(COLORS_HSL[index], COLORS_HSL[index + 1], colorT);

    // ─── Overlay crossfade: ramps up during first 40%, down during last 30% ───
    const overlayIn = clamp01(localProgress / 0.4);
    const overlayOut = clamp01((1 - localProgress) / 0.3);
    const overlayMix = Math.min(overlayIn, overlayOut) * 0.25; // Subtle
    const roundedOverlay = Math.round(overlayMix * 100) / 100;

    // Only update state if values actually changed
    if (
      prevState.current.baseColor !== currentColor ||
      prevState.current.overlayOpacity !== roundedOverlay
    ) {
      setBaseColor(currentColor);
      setOverlayColor(lerpHSL(COLORS_HSL[index + 1], COLORS_HSL[index + 1], 0));
      setOverlayOpacity(roundedOverlay);
      setFinalProgress(0);

      prevState.current.baseColor = currentColor;
      prevState.current.overlayColor = '';
      prevState.current.overlayOpacity = roundedOverlay;
      prevState.current.finalProgress = 0;
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

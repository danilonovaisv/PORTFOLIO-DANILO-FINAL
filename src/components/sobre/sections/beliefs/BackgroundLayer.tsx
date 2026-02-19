'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { colorSequence, interpolateHSL, hslToString } from '@/lib/colors';

/**
 * Two-layer background system per Ghost Design System.
 *
 * Layer 0 (z-0): Base background — receives the continuously interpolated color.
 * Layer 1 (z-10): Overlay crossfade — smooths transition cuts to avoid flicker.
 *
 * Critical implementation details:
 * - Uses Ghost Easing [0.4, 0, 0.2, 1] for background interpolation
 * - Interpolation starts on first frame of text entry
 * - When text is 60% visible, BG is ~70% interpolated
 * - Color interpolation completes exactly when text animation completes
 */

type BackgroundLayerProps = {
  activeIndex: number;
  reducedMotion?: boolean;
};

export const BackgroundLayer = ({
  activeIndex,
  reducedMotion = false,
}: BackgroundLayerProps) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousIndexRef = useRef(activeIndex);
  const rafIdRef = useRef(0);
  const controlsRef = useRef<{ stop?: () => void }[]>([]);

  const stopAnimations = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
    }
    controlsRef.current.forEach((c) => c?.stop?.());
    controlsRef.current = [];
  };

  useEffect(() => {
    const bg = bgRef.current;
    const overlay = overlayRef.current;
    if (!bg || !overlay) return;

    const prevIdx = previousIndexRef.current;
    const currIdx = activeIndex;

    const previousColor = colorSequence[prevIdx % colorSequence.length];
    const currentColor = colorSequence[currIdx % colorSequence.length];

    // Set initial color immediately (first render or no change)
    if (prevIdx === currIdx) {
      bg.style.backgroundColor = hslToString(currentColor);
      return;
    }

    // Update ref immediately to prevent race conditions
    previousIndexRef.current = currIdx;

    // Reduced motion: instant color change
    if (reducedMotion) {
      bg.style.backgroundColor = hslToString(currentColor);
      overlay.style.opacity = '0';
      return;
    }

    // --- ANIMATION: Ghost Easing interpolation ---
    stopAnimations();

    const duration = 900; // 0.9s — synchronized with text animation
    const startTime = performance.now();
    let cancelled = false;

    // 1️⃣ Layer 0: Continuous HSL interpolation on requestAnimationFrame
    const interpolate = (now: number) => {
      if (cancelled || !bg) return;

      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // interpolateHSL already applies Ghost Easing internally
      const color = interpolateHSL(previousColor, currentColor, t);
      bg.style.backgroundColor = color;

      if (t < 1) {
        rafIdRef.current = requestAnimationFrame(interpolate);
      }
    };

    rafIdRef.current = requestAnimationFrame(interpolate);

    // 2️⃣ Layer 1: Overlay crossfade (0 → peak → 0) to absorb transition cuts
    const nextColor = colorSequence[(currIdx + 1) % colorSequence.length];
    overlay.style.backgroundColor = hslToString(nextColor);

    const overlayControl = animate(
      overlay,
      { opacity: [0, 0.35, 0] },
      {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1], // Ghost Easing
      }
    );

    controlsRef.current.push(overlayControl);

    return () => {
      cancelled = true;
      stopAnimations();
    };
  }, [activeIndex, reducedMotion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAnimations();
  }, []);

  const initialColor = hslToString(
    colorSequence[activeIndex % colorSequence.length]
  );

  return (
    <>
      {/* Layer 0: Base background — continuous color interpolation */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: initialColor,
          willChange: 'background-color',
          contain: 'paint',
        }}
        aria-hidden="true"
      />

      {/* Layer 1: Overlay crossfade — smooths transition cuts */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundColor: initialColor,
          opacity: 0,
          willChange: 'opacity',
          contain: 'paint',
        }}
        aria-hidden="true"
      />
    </>
  );
};

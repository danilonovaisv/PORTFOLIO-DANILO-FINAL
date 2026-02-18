'use client';
import { motion, MotionValue } from 'framer-motion';

interface BeliefsBackgroundProps {
  baseColor: MotionValue;
  overlayColor: MotionValue;
  overlayOpacity: MotionValue;
}

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
export function BeliefsBackground({
  baseColor,
  overlayColor,
  overlayOpacity,
}: BeliefsBackgroundProps) {
  return (
    <>
      {/* Layer 0: Base background — continuous color interpolation */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: baseColor,
          willChange: 'background-color',
          contain: 'paint',
        }}
        aria-hidden="true"
      />

      {/* Layer 1: Overlay crossfade — smooths transition cuts */}
      <motion.div
        className="fixed inset-0 z-10"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          willChange: 'opacity',
          contain: 'paint',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    </>
  );
}
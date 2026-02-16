'use client';

import React from 'react';

interface BeliefsBackgroundProps {
  baseColor: string;
  overlayColor: string;
  overlayOpacity: number;
}

/**
 * Two-layer background system per spec Section 3.
 * Layer 0: Base color — receives the continuously interpolated color.
 * Layer 1: Overlay crossfade — fades in/out to smooth transitions and avoid flicker.
 * 
 * Uses `will-change` and `contain: paint` for performance on Safari/Android.
 */
export function BeliefsBackground({
  baseColor,
  overlayColor,
  overlayOpacity,
}: BeliefsBackgroundProps) {
  return (
    <>
      {/* Layer 0: Base background — continuous color interpolation */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: baseColor,
          willChange: 'background-color',
          contain: 'paint',
        }}
        aria-hidden="true"
      />
      {/* Layer 1: Overlay crossfade — smooths transition cuts */}
      <div
        className="absolute inset-0 z-1"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          willChange: 'opacity',
          contain: 'paint',
        }}
        aria-hidden="true"
      />
    </>
  );
}

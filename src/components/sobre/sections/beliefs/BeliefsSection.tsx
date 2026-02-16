'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { BeliefFixedHeader } from '../../beliefs/BeliefFixedHeader';
import { BeliefFinalSectionOverlay } from '../../beliefs/BeliefFinalSectionOverlay';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useBeliefAnimation } from './useBeliefAnimation';
import { BeliefsBackground } from './BeliefsBackground';
import { RotatingText } from './RotatingText';

const GhostScene = dynamic(() => import('./GhostScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-transparent" aria-hidden="true" />
  ),
});

/**
 * BeliefsSection — "O Que Me Move"
 *
 * Architecture (6 layers per spec Section 2):
 * - Layer 0 (z-0):  Base Background — continuous HSL color interpolation via useScroll
 * - Layer 1 (z-1):  Overlay crossfade — smooth transition buffer (anti-flicker)
 * - Layer 5 (z-10): Ghost 3D Canvas — above BG, below everything else (R3F + scrollYProgress)
 * - Layer 3 (z-15): RotatingText — inView + animate triggered phrases
 * - Layer 2 (z-20): BeliefFixedHeader — sticky "Acredito no design..."
 * - Layer 4 (z-50): Final Manifesto — "ISSO É GHOST DESIGN" (inView + animate)
 *
 * Separation of concerns (per spec):
 * - BG: useScroll + HSL interpolation (useBeliefAnimation hook)
 * - Texto: inView + animate (RotatingText component)
 * - Ghost: R3F, seguindo scrollYProgress (GhostScene)
 *
 * Height: ~140vh desktop (each phrase is min-h-screen = ~6 screens + manifesto)
 */
export function BeliefsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();

  const {
    scrollYProgress,
    baseColor,
    overlayColor,
    overlayOpacity,
    finalProgress,
  } = useBeliefAnimation({ containerRef });

  const finalVisible = finalProgress > 0.06;

  return (
    <section
      ref={containerRef}
      id="beliefs-section"
      aria-labelledby="beliefs-heading"
      className="relative w-full"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 0 & 1: Backgrounds — continuous color interpolation */}
        <BeliefsBackground
          baseColor={baseColor}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
        />

        {/* Layer 2: Fixed intro header — z-20, above BG & text */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <BeliefFixedHeader scrollProgress={scrollYProgress} />
        </div>

        {/* Layer 5: Ghost 3D — z-10 (above BG, below header & text & manifesto) */}
        {/* Per spec: Ghost positioned to the right side, text to the left */}
        {!prefersReducedMotion && (
          <div className="absolute inset-y-0 right-0 w-full md:w-[60%] z-10 pointer-events-none">
            <div className="w-full h-full">
              <GhostScene scrollProgress={scrollYProgress} />
            </div>
          </div>
        )}

        {/* Layer 4: Final Manifesto Overlay — z-50 (topmost content) */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          <BeliefFinalSectionOverlay
            visible={finalVisible}
            progress={finalProgress}
          />
        </div>
      </div>

      {/* Layer 3: Rotating Phrases — inView + animate triggered
          Each phrase is a min-h-screen block that scrolls through the section.
          They are NOT inside the sticky container — they control the scroll height. */}
      <div className="relative z-15">
        <RotatingText
          finalProgress={finalProgress}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </section>
  );
}

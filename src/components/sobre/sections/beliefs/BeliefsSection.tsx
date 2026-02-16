'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { BeliefFixedHeader } from '../../beliefs/BeliefFixedHeader';
import { BeliefFinalSectionOverlay } from '../../beliefs/BeliefFinalSectionOverlay';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useBeliefAnimation, PHRASES } from './useBeliefAnimation';
import { BeliefsBackground } from './BeliefsBackground';
import { RotatingText } from './RotatingText';

const GhostScene = dynamic(() => import('./GhostScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-transparent" aria-hidden="true" />
  ),
});

/**
 * BeliefsSection — "O Que Me Move" (Seção 06)
 *
 * Architecture (layered, per spec 06-O-QUE-ME-MOVE-AJUSTE.md Section 4.1):
 *
 * The section uses a tall container (N phrases × 100vh + manifesto space)
 * with a sticky viewport. Inside the sticky viewport:
 *
 * - Layer 0 (z-0):   Background Layer — continuous HSL color interpolation
 * - Layer 1 (z-[1]): Overlay crossfade — anti-flicker buffer
 * - Layer 2 (z-10):  BeliefFixedHeader — "Acredito no design..." (sticky)
 * - Layer 3 (z-20):  RotatingText — scroll-triggered phrases
 * - Layer 4 (z-30):  Final Manifesto — "ISSO É GHOST DESIGN"
 * - Layer 5 (z-40):  Ghost 3D Canvas — R3F + scrollYProgress (topmost visual)
 *
 * CRITICAL ARCHITECTURE:
 * - The outer section has a tall explicit height to create scroll space
 * - The sticky container holds ALL visual layers
 * - RotatingText uses scroll-progress state to determine which phrase to show
 *   (inView won't work inside a sticky container because it's always in viewport)
 * - Ghost is on z-40, it visually "invades" text for the cross-layer effect
 *   visible in the reference images (Ghost overlapping "GHOST" in manifesto)
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

  // Total height: each phrase gets ~100vh of scroll, plus 30vh for manifesto
  const totalHeight = `${(PHRASES.length + 1) * 100 + 30}vh`;

  return (
    // eslint-disable-next-line react-dom/no-unsafe-inline-style
    <section
      ref={containerRef}
      id="beliefs-section"
      aria-labelledby="beliefs-heading"
      style={{
        '--section-height': totalHeight,
      } as React.CSSProperties}
      className="relative w-full h-(--section-height)"
    >
      {/* Sticky viewport container — holds ALL visual layers */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 0 & 1: Backgrounds — continuous color interpolation (z-0, z-[1]) */}
        <BeliefsBackground
          baseColor={baseColor}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
        />

        {/* Layer 2: Fixed intro header — z-10, above BG */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <BeliefFixedHeader scrollProgress={scrollYProgress} />
        </div>

        {/* Layer 3: Rotating Phrases — z-20, above header */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <RotatingText
            scrollYProgress={scrollYProgress}
            finalProgress={finalProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Layer 4: Final Manifesto Overlay — z-30 */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <BeliefFinalSectionOverlay
            visible={finalVisible}
            progress={finalProgress}
          />
        </div>

        {/* Layer 5: Ghost 3D — z-40 (topmost, per spec 4.1, interacts with mouse/scroll) */}
        {!prefersReducedMotion && (
          <div className="absolute inset-y-0 right-0 w-full md:w-[60%] z-40 pointer-events-none">
            <div className="w-full h-full">
              <GhostScene scrollProgress={scrollYProgress} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

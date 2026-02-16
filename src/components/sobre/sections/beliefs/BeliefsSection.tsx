'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { BeliefFixedHeader, BeliefFinalSectionOverlay } from '../../beliefs';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useBeliefAnimation } from './useBeliefAnimation';
import { BeliefsBackground } from './BeliefsBackground';
import { RotatingText } from './RotatingText';

const GhostScene = dynamic(() => import('./GhostScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

export function BeliefsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();

  const {
    scrollYProgress,
    baseColor,
    overlayColor,
    overlayOpacity,
    activePhraseIndex,
    phraseProgress,
    finalProgress,
  } = useBeliefAnimation({ containerRef });

  const finalVisible = finalProgress > 0.06;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[170vh] md:h-[180vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 0 & 1: Backgrounds */}
        <BeliefsBackground
          baseColor={baseColor}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
        />

        {/* Layer 2: fixed intro header - Z-index 20 */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <BeliefFixedHeader scrollProgress={scrollYProgress} />
        </div>

        {/* Layer 5: Ghost 3D */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 z-5 pointer-events-none">
            <div className="w-full h-full pointer-events-auto flex md:items-center md:justify-center items-end justify-start">
              <div className="w-full h-full md:absolute md:inset-0 relative">
                <GhostScene scrollProgress={scrollYProgress} />
              </div>
            </div>
          </div>
        )}

        {/* Layer 3: Rotating Phrase */}
        <RotatingText
          activePhraseIndex={activePhraseIndex}
          phraseProgress={phraseProgress}
          finalProgress={finalProgress}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Layer 4: Final Manifesto - Z-index 82 */}
        <div className="absolute inset-0 z-82 pointer-events-none">
          <BeliefFinalSectionOverlay
            visible={finalVisible}
            progress={finalProgress}
          />
        </div>
      </div>
    </section>
  );
}

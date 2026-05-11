'use client';

import { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import { BeliefsScrollProvider } from '../beliefs/BeliefsScrollProvider';
import { BeliefBackground } from '../beliefs/BeliefBackground';
import { BeliefOverlay } from '../beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '../beliefs/BeliefScrollText';
import { BeliefManifesto } from '../beliefs/BeliefManifesto';
import { GhostErrorBoundary } from '../3d/GhostErrorBoundary';
import { GhostSceneFallback } from '../3d/GhostSceneFallback';

const GhostScene = dynamic(
  () => import('../3d/GhostScene').then((m) => m.GhostScene),
  {
    ssr: false,
  }
);

import { MOTION_TOKENS } from '@/config/motion';

function AboutBeliefsContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="beliefs"
      data-testid="beliefs-section"
      aria-label="Manifesto e Crenças"
      className="beliefs-section relative overflow-clip bg-background text-text"
      style={{ height: MOTION_TOKENS.layout.sectionMinHeight }}
    >
      <h2 className="sr-only">Manifesto de Design Ghost</h2>

      <BeliefBackground />
      <BeliefOverlay />

      <div
        ref={containerRef}
        className="beliefs-container sticky top-0 h-dvh overflow-hidden"
      >
        <BeliefFixedHeader />

        <GhostErrorBoundary fallback={<GhostSceneFallback />}>
          <Suspense fallback={<GhostSceneFallback />}>
            <GhostScene />
          </Suspense>
        </GhostErrorBoundary>

        <BeliefManifesto />
        <BeliefScrollText />
      </div>
    </section>
  );
}

export function AboutBeliefs() {
  return (
    <BeliefsScrollProvider>
      <AboutBeliefsContent />
    </BeliefsScrollProvider>
  );
}

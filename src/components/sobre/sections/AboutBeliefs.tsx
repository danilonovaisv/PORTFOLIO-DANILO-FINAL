'use client';

import { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import { beliefLayout } from '@/config/beliefTokens';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
import { BeliefsScrollProvider } from '../beliefs/BeliefsScrollContext';
import { BeliefBackground } from '../beliefs/BeliefBackground';
import { BeliefOverlay } from '../beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefMobileTextLayer } from '../beliefs/BeliefMobileTextLayer';
import { BeliefDesktopTextLayer } from '../beliefs/BeliefDesktopTextLayer';
import { BeliefManifesto } from '../beliefs/BeliefManifesto';
import { GhostErrorBoundary } from '../3d/GhostErrorBoundary';
import { GhostSceneFallback } from '../3d/GhostSceneFallback';

const GhostScene = dynamic(
  () => import('../3d/GhostScene').then((mod) => mod.GhostScene),
  { ssr: false }
);

export function AboutBeliefs() {
  const containerRef = useRef<HTMLElement>(null);
  const scroll = useBeliefsScroll(containerRef);

  return (
    <BeliefsScrollProvider
      value={{
        containerRef,
        scrollYProgress: scroll.scrollYProgress,
        isMobile: scroll.isMobile,
        shouldReduceMotion: scroll.shouldReduceMotion,
        activeIndex: scroll.activeIndex,
        isClimax: scroll.isClimax,
      }}
    >
      <section
        ref={containerRef}
        id="o-que-me-move"
        data-testid="beliefs-section"
        data-belief-active-index={scroll.activeIndex}
        data-belief-climax={scroll.isClimax ? 'true' : 'false'}
        data-ghost-parallax="true"
        aria-labelledby="o-que-me-move-title"
        className="relative overflow-clip bg-[#040013] text-white"
        style={{ minHeight: beliefLayout.sectionMinHeight }}
      >
        <h2 id="o-que-me-move-title" className="sr-only">
          O que me move
        </h2>

        <BeliefBackground />
        <BeliefOverlay />

        <div className="sticky top-0 grid h-dvh grid-cols-12 overflow-hidden std-grid">
          <BeliefFixedHeader />

          <GhostErrorBoundary fallback={<GhostSceneFallback />}>
            <Suspense fallback={<GhostSceneFallback />}>
              <GhostScene />
            </Suspense>
          </GhostErrorBoundary>

          <BeliefMobileTextLayer />
          <BeliefDesktopTextLayer />
          <BeliefManifesto />
        </div>

        {/* Trigger sections for scroll-triggered animations */}
        <div className="relative">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              data-index={i}
              className="belief-scroll-section h-[80vh] w-full pointer-events-none"
              aria-hidden="true"
            />
          ))}
          {/* Extra space for the final manifesto climax */}
          <div 
            data-index={6}
            className="belief-scroll-section h-[120vh] w-full pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </section>
    </BeliefsScrollProvider>
  );
}

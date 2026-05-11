'use client';

import { Suspense, useRef, useState, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import { useScroll, useReducedMotion, useMotionValueEvent } from 'motion/react';
import { BeliefsScrollProvider } from '../beliefs/BeliefsScrollContext';
import { BeliefBackground } from '../beliefs/BeliefBackground';
import { BeliefOverlay } from '../beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '../beliefs/BeliefScrollText';
import { BeliefManifesto } from '../beliefs/BeliefManifesto';
import { GhostErrorBoundary } from '../3d/GhostErrorBoundary';
import { GhostSceneFallback } from '../3d/GhostSceneFallback';
import { BELIEF_PHRASES, BELIEF_SCROLL_THRESHOLDS } from '../beliefs/belief.constants';
import { MOTION_TOKENS } from '@/config/motion';

const GhostScene = dynamic(
  () => import('../3d/GhostScene').then((m) => m.GhostScene),
  {
    ssr: false,
  }
);

function AboutBeliefsContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // States derived from scroll for immediate reactive updates if needed
  const [activePhraseIndex, setActivePhraseIndex] = useState(-1);
  const [isClimax, setIsClimax] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const prefersReducedMotion = Boolean(useReducedMotion());

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Climax detection
    setIsClimax(latest >= BELIEF_SCROLL_THRESHOLDS.climaxStart && latest <= BELIEF_SCROLL_THRESHOLDS.finalLock);

    // activePhraseIndex calculation
    const start = 0.08;
    const end = 0.76;
    if (latest < start) {
      if (activePhraseIndex !== -1) setActivePhraseIndex(-1);
    } else if (latest > end) {
      if (activePhraseIndex !== BELIEF_PHRASES.length - 1) setActivePhraseIndex(BELIEF_PHRASES.length - 1);
    } else {
      const step = (end - start) / BELIEF_PHRASES.length;
      const index = Math.floor((latest - start) / step);
      if (activePhraseIndex !== index) setActivePhraseIndex(index);
    }
  });

  // Handle mobile detection
  useLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contextValue = {
    sectionRef,
    containerRef,
    scrollYProgress,
    isMobile,
    shouldReduceMotion: prefersReducedMotion,
    prefersReducedMotion,
    activePhraseIndex,
    isClimax,
    thresholds: BELIEF_SCROLL_THRESHOLDS,
  };

  return (
    <BeliefsScrollProvider value={contextValue}>
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
          className="beliefs-container relative sticky top-0 isolate h-dvh overflow-hidden"
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
    </BeliefsScrollProvider>
  );
}

export function AboutBeliefs() {
  return <AboutBeliefsContent />;
}

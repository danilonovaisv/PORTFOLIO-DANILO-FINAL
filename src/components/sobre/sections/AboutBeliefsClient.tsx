'use client';

import { useEffect } from 'react';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
import { useBeliefStore } from '@/store/beliefStore';
import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '@/components/sobre/beliefs/BeliefScrollText';
import { BeliefManifesto } from '@/components/sobre/beliefs/BeliefManifesto';
import { GhostScene } from '@/components/sobre/3d/GhostScene';
import { GhostErrorBoundary } from '@/components/sobre/3d/GhostErrorBoundary';

export function AboutBeliefsClient() {
  const { containerRef, scrollYProgress } = useBeliefsScroll();
  const setScrollProgress = useBeliefStore((s) => s.setScrollProgress);
  const isMobile = useBeliefStore((s) => s.isMobile);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
    });

    return () => unsub();
  }, [scrollYProgress, setScrollProgress]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600vh] bg-[#040013]"
      data-testid="beliefs-section"
      aria-label="O que me move — manifesto Ghost Design"
    >
      <BeliefBackground scrollProgress={scrollYProgress} />
      <BeliefOverlay scrollProgress={scrollYProgress} />

      <div
        className="scroll-section absolute top-0 h-[100vh] w-full pointer-events-none"
        data-index="0"
      />
      <div
        className="scroll-section absolute top-[100vh] h-[100vh] w-full pointer-events-none"
        data-index="1"
      />
      <div
        className="scroll-section absolute top-[200vh] h-[100vh] w-full pointer-events-none"
        data-index="2"
      />
      <div
        className="scroll-section absolute top-[300vh] h-[100vh] w-full pointer-events-none"
        data-index="3"
      />
      <div
        className="scroll-section absolute top-[400vh] h-[100vh] w-full pointer-events-none"
        data-index="4"
      />
      <div
        className="scroll-section absolute top-[500vh] h-[100vh] w-full pointer-events-none"
        data-index="5"
      />

      <BeliefFixedHeader
        scrollProgress={scrollYProgress}
        prefersReducedMotion={prefersReducedMotion}
      />
      <BeliefScrollText
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />
      <GhostErrorBoundary>
        <GhostScene scrollProgress={scrollYProgress} />
      </GhostErrorBoundary>
      <BeliefManifesto
        scrollProgress={scrollYProgress}
        prefersReducedMotion={prefersReducedMotion}
      />
    </section>
  );
}

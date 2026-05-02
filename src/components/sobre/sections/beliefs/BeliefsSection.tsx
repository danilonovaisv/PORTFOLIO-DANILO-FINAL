'use client';

import { useEffect } from 'react';
import { useInView, motion } from 'motion/react';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
import { useBeliefStore } from '@/store/beliefStore';
import { BeliefBackground } from '@/components/sobre/sections/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/sections/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/sections/beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '@/components/sobre/sections/beliefs/BeliefScrollText';
import { BeliefSection } from '@/components/sobre/sections/beliefs/BeliefSection';
import { BeliefManifesto } from '@/components/sobre/sections/beliefs/BeliefManifesto';
import { GhostCanvasClient } from '@/components/sobre/sections/beliefs/3d/GhostCanvasClient';
import { GhostErrorBoundary } from '@/components/sobre/sections/beliefs/3d/GhostErrorBoundary';
import { ABOUT_CONTENT } from '@/config/content';

const PHRASES = ABOUT_CONTENT.beliefs.map((belief) => ({
  title: 'O que me move',
  text: belief.text,
}));

export function BeliefsSection() {
  const { containerRef, scrollYProgress } = useBeliefsScroll();
  const setScrollProgress = useBeliefStore((s) => s.setScrollProgress);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);
  const isInView = useInView(containerRef);

  useEffect(() => {
    if (!isInView) {
      setScrollProgress(0);
    }
  }, [isInView, setScrollProgress]);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
    });

    return () => unsub();
  }, [scrollYProgress, setScrollProgress]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600vh] bg-[#040013] overflow-clip"
      data-testid="beliefs-section"
      aria-labelledby="beliefs-section-heading"
    >
      <div
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{
          visibility: isInView ? 'visible' : 'hidden',
          pointerEvents: isInView ? 'auto' : 'none',
        }}
      >
        <BeliefBackground
          scrollProgress={scrollYProgress}
          prefersReducedMotion={prefersReducedMotion}
        />

        <motion.div
          className="relative z-10 w-full h-full"
          initial={false}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <BeliefOverlay scrollProgress={scrollYProgress} />

          <BeliefFixedHeader
            scrollProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />

          <BeliefScrollText
            scrollProgress={scrollYProgress}
            phrases={PHRASES}
            prefersReducedMotion={prefersReducedMotion}
          />

          <div className="absolute inset-0 z-[70] pointer-events-none">
            <GhostErrorBoundary>
              <GhostCanvasClient scrollProgress={scrollYProgress} />
            </GhostErrorBoundary>
          </div>

          <BeliefManifesto
            scrollProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full pointer-events-none">
        {PHRASES.map((_, i) => (
          <BeliefSection key={i} />
        ))}
        <BeliefSection />
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/beliefs/BeliefOverlay';
import { BeliefDesktopTextLayer } from '@/components/sobre/beliefs/BeliefDesktopTextLayer';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefFinalSectionOverlay } from '@/components/sobre/beliefs/BeliefFinalSectionOverlay';
import { BeliefMobileTextLayer } from '@/components/sobre/beliefs/BeliefMobileTextLayer';
import { GhostCanvas } from '@/components/sobre/3d/GhostCanvas';
import { useBeliefsAnimation } from '@/hooks/useBeliefsAnimation';

const PHRASES = [
  'Um vídeo que respira.',
  'Uma marca que se reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar presença.',
  'Mesmo quando não estou ali.',
  'Mesmo quando ninguém percebe o esforço.',
];

export function AboutBeliefs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollRange = Math.max(rect.height - viewportHeight, 1);
      const nextProgress = Math.min(
        1,
        Math.max(0, -rect.top / scrollRange)
      );
      scrollYProgress.set(nextProgress);
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress]);

  const { ghostIntensity, showFinalManifesto, prefersReducedMotion } =
    useBeliefsAnimation({
      scrollYProgress,
      totalPhrases: PHRASES.length,
    });

  return (
    <section
      id="06-o-que-me-move"
      data-testid="about-beliefs-section"
      aria-label="O Que Me Move"
      className="relative"
    >
      <div
        ref={containerRef}
        className="relative min-h-[760vh] md:min-h-[820vh] lg:min-h-[900vh]"
      >
        <div className="sr-only">
          <h2>Manifesto: O Que Me Move</h2>
          <ul>
            {PHRASES.map((phrase) => (
              <li key={phrase}>{phrase}</li>
            ))}
            <li>ISSO É GHOST DESIGN.</li>
          </ul>
        </div>

        <BeliefBackground scrollYProgress={scrollYProgress} />
        <BeliefOverlay scrollYProgress={scrollYProgress} />

        <div className="relative sticky top-0 h-screen grid grid-cols-12 overflow-hidden">
          <BeliefFixedHeader
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
          <BeliefDesktopTextLayer
            phrases={PHRASES}
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
          <BeliefMobileTextLayer
            phrases={PHRASES}
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
          <BeliefFinalSectionOverlay
            prefersReducedMotion={prefersReducedMotion}
            showProgress={showFinalManifesto}
          />
          {!prefersReducedMotion ? (
            <GhostCanvas
              scrollProgress={scrollYProgress}
              ghostIntensity={ghostIntensity}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion, useScroll, MotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import dynamic from 'next/dynamic';

// Sub-components
import {
  BeliefSection,
  BeliefDesktopTextLayer,
  BeliefMobileTextLayer,
  BeliefFinalSection,
  BeliefFinalSectionOverlay,
  BeliefFixedHeader,
} from '@/components/sobre/beliefs';

import {
  useBeliefsAnimation,
  BELIEF_COLORS,
} from '@/hooks/useBeliefsAnimation';
import { BRAND } from '@/config/brand';

// Dynamic 3D scene — client-only, no SSR
const GhostScene = dynamic<{
  scrollProgress: MotionValue<number>;
  ghostIntensity: MotionValue<number>;
}>(
  () =>
    import('../3d/GhostScene').then((mod: any) => {
      return mod.GhostScene || mod.default;
    }),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />,
  }
);

const PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

export function AboutBeliefs() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const prefersReduced = !!prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const { ghostIntensity, showFinalManifesto, headerOpacity } =
    useBeliefsAnimation({
      scrollYProgress,
      totalPhrases: PHRASES.length,
    });

  return (
    <section
      ref={containerRef}
      data-testid="about-beliefs-section"
      aria-label="O Que Me Move"
      className="relative w-full"
    >
      {/* SR-Only Manifesto for Accessibility */}
      <div className="sr-only">
        <h2>Manifesto: O Que Me Move</h2>
        <ul>
          {PHRASES.map((phrase, i) => (
            <li key={i}>{phrase}</li>
          ))}
          <li>ISSO É GHOST DESIGN.</li>
        </ul>
      </div>

      {/* ═══════════════════════════════════════════════════
          LAYER 1: Backgrounds coloridos
          ═══════════════════════════════════════════════════ */}
      <div className="relative pointer-events-none z-10 w-full">
        <BeliefFixedHeader
          scrollProgress={prefersReduced ? undefined : scrollYProgress}
          headerOpacity={prefersReduced ? undefined : headerOpacity}
          MotionHeader={prefersReduced ? 'header' : motion.header}
          prefersReducedMotion={prefersReduced}
        />

        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            index={index}
            text={phrase}
            bgColor={BELIEF_COLORS[index] || BELIEF_COLORS[0]}
            isFirst={index === 0}
          />
        ))}

        <BeliefFinalSection
          scrollProgress={prefersReduced ? undefined : scrollYProgress}
          bgColor={BRAND.colors.bluePrimary}
          MotionDiv={prefersReduced ? 'div' : motion.div}
          prefersReducedMotion={prefersReduced}
        />
      </div>

      {/* ═══════════════════════════════════════════════════
          LAYER 2: Texto Mobile Fixed no Footer
          ═══════════════════════════════════════════════════ */}
      <BeliefMobileTextLayer
        phrases={PHRASES}
        scrollYProgress={prefersReduced ? undefined : scrollYProgress}
        MotionDiv={prefersReduced ? 'div' : motion.div}
        prefersReducedMotion={prefersReduced}
      />

      {/* ═══════════════════════════════════════════════════
          LAYER 2B: Texto Desktop (hidden on mobile via md:block inside component)
          ═══════════════════════════════════════════════════ */}
      <BeliefDesktopTextLayer
        phrases={PHRASES}
        scrollYProgress={prefersReduced ? undefined : scrollYProgress}
        MotionDiv={prefersReduced ? 'div' : motion.div}
        prefersReducedMotion={prefersReduced}
      />

      {/* ═══════════════════════════════════════════════════
          LAYER 3: Final Manifesto Overlay
          ═══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-50"
        style={prefersReduced ? undefined : { opacity: showFinalManifesto }}
      >
        <BeliefFinalSectionOverlay
          MotionDiv={prefersReduced ? 'div' : motion.div}
          prefersReducedMotion={prefersReduced}
          showProgress={prefersReduced ? undefined : showFinalManifesto}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          LAYER 4: Canvas 3D (Sticky - Top Layer)
          Ghost positioned: RIGHT on desktop, full on mobile
          ═══════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        aria-hidden
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none flex items-center justify-center md:justify-start">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 md:left-auto md:right-0 md:w-1/2">
              {!prefersReducedMotion ? (
                <GhostScene
                  scrollProgress={scrollYProgress}
                  ghostIntensity={ghostIntensity}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

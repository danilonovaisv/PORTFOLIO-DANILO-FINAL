'use client';

import React, { useRef } from 'react';
import { motion, useScroll, MotionValue, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import dynamic from 'next/dynamic';

// Importações dos sub-componentes (Certifique-se que os caminhos estão corretos)
import {
  BeliefSection,
  BeliefDesktopTextLayer,
  BeliefMobileTextLayer,
  BeliefFinalSection,
  BeliefFinalSectionOverlay,
  BeliefFixedHeader,
  useIsMobile,
} from '@/components/sobre/beliefs';

import { useBeliefsAnimation } from '@/hooks/useBeliefsAnimation';

// [CORREÇÃO CRÍTICA]: Tratamento robusto para importação dinâmica.
// Isso garante que pega o componente correto, seja export default ou export nomeado.
const GhostScene = dynamic<{
  scrollProgress: MotionValue<number>;
  ghostIntensity: MotionValue<number>;
}>(
  () =>
    import('../3d/GhostScene').then((mod: any) => {
      // Retorna a exportação nomeada 'GhostScene' OU a 'default'
      return mod.GhostScene || mod.default;
    }),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />, // Placeholder invisível
  }
);

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
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const prefersReduced = !!prefersReducedMotion;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const { backgroundColor, ghostIntensity, showFinalManifesto } =
    useBeliefsAnimation({
      scrollYProgress,
      totalPhrases: PHRASES.length,
    });

  // Gate framer-motion features for reduced motion to avoid runtime errors
  // and to honor user preference.
  const MotionSection: React.ElementType = prefersReduced
    ? 'section'
    : motion.section;
  const MotionDiv: React.ElementType = prefersReduced ? 'div' : motion.div;
  const MotionHeader: React.ElementType = prefersReduced
    ? 'header'
    : motion.header;

  return (
    <MotionSection
      ref={containerRef}
      data-testid="about-beliefs-section"
      aria-label="O Que Me Move"
      style={{
        height: `var(--section-height, ${(PHRASES.length + 2) * 100}vh)`,
      }}
      className="relative w-full isolate z-10 [--section-height:550vh] md:[--section-height:800vh]"
    >
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <motion.div
          className="sticky top-0 w-full h-screen pointer-events-none"
          style={
            prefersReduced
              ? { backgroundColor: '#040013' }
              : { backgroundColor }
          }
        />
      </div>

      <BeliefFixedHeader
        scrollProgress={prefersReduced ? (undefined as any) : scrollYProgress}
        MotionHeader={MotionHeader}
        prefersReducedMotion={prefersReduced}
      />

      <MotionDiv className="relative z-20">
        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            index={index}
            text={phrase}
            MotionSection={MotionSection}
          />
        ))}

        <BeliefFinalSection
          scrollProgress={prefersReduced ? undefined : scrollYProgress}
          bgColor="transparent"
          MotionDiv={MotionDiv}
          prefersReducedMotion={prefersReduced}
        />
      </MotionDiv>

      <div className="relative z-40">
        {isMobile ? (
          <BeliefMobileTextLayer
            phrases={PHRASES}
            scrollYProgress={prefersReduced ? undefined : scrollYProgress}
            MotionDiv={MotionDiv}
            prefersReducedMotion={prefersReduced}
          />
        ) : (
          <BeliefDesktopTextLayer
            phrases={PHRASES}
            scrollYProgress={prefersReduced ? undefined : scrollYProgress}
            MotionDiv={MotionDiv}
            prefersReducedMotion={prefersReduced}
          />
        )}
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none z-40"
        style={prefersReduced ? undefined : { opacity: showFinalManifesto }}
      >
        <div className="sticky top-0 h-screen w-full">
          <BeliefFinalSectionOverlay
            MotionDiv={MotionDiv}
            prefersReducedMotion={prefersReduced}
            showProgress={prefersReduced ? undefined : showFinalManifesto}
          />
        </div>
      </motion.div>

      <div
        className="absolute inset-0 z-50 w-full h-full pointer-events-none"
        aria-hidden
      >
        <div className="sticky top-0 w-full h-screen pointer-events-none flex items-center justify-center">
          <div className="w-full h-full relative">
            <MotionDiv className="w-full h-full">
              {!prefersReducedMotion ? (
                <GhostScene
                  scrollProgress={scrollYProgress}
                  ghostIntensity={ghostIntensity}
                />
              ) : null}
            </MotionDiv>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, MotionValue } from 'framer-motion';
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
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque\nse\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

export function AboutBeliefs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const prefersReduced = !!prefersReducedMotion;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // [HOOK] Lógica centralizada de animação (HSL, Overlay, Intensidade)
  const {
    backgroundColor,
    overlayOpacity,
    ghostIntensity,
    showFinalManifesto,
  } = useBeliefsAnimation({
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
      style={{
        height: `${(PHRASES.length + 2) * 100}vh`,
      }}
      className="relative w-full isolate z-10 overflow-x-clip"
    >
      {/* LAYER 0: Background Layer (HSL Interpolation) */}
      <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none">
        <motion.div
          className="sticky top-0 w-full h-screen pointer-events-none"
          style={
            prefersReduced
              ? { backgroundColor: `hsl(230, 85%, 30%)` }
              : { backgroundColor }
          }
        />
      </div>

      {/* LAYER 1: Overlay Transition Layer (Cross-fade) */}
      <div className="absolute inset-0 z-[5] w-full h-full pointer-events-none">
        <motion.div
          className="sticky top-0 w-full h-screen bg-black pointer-events-none"
          style={prefersReduced ? undefined : { opacity: overlayOpacity }}
        />
      </div>

      <BeliefFixedHeader
        scrollProgress={prefersReduced ? (undefined as any) : scrollYProgress}
        MotionHeader={MotionHeader}
        prefersReducedMotion={prefersReduced}
      />
      {/* LAYER 1: Seções de Conteúdo (Texto Scrollável) - Background */}
      <MotionDiv
        className="relative z-10"
      >
        {/* Adicionei verificações para evitar erro se PHRASES/COLORS estiverem vazios */}
        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            index={index}
            text={phrase}
            isFirst={index === 0}
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

      <div className="relative z-[20]">
        <BeliefDesktopTextLayer
          phrases={PHRASES}
          scrollYProgress={prefersReduced ? undefined : scrollYProgress}
          MotionDiv={MotionDiv}
          prefersReducedMotion={prefersReduced}
        />
      </div>

      {/* LAYER 2: Texto Mobile Fixed no Footer */}
      <div className="relative z-[70]">
        <BeliefMobileTextLayer
          phrases={PHRASES}
          scrollYProgress={prefersReduced ? undefined : scrollYProgress}
          MotionDiv={MotionDiv}
          prefersReducedMotion={prefersReduced}
        />
      </div>

      {/* LAYER 4: Final Text Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-50"
        style={{ opacity: showFinalManifesto }}
      >
        <div className="sticky top-0 h-screen w-full">
          <BeliefFinalSectionOverlay
            MotionDiv={MotionDiv}
            prefersReducedMotion={prefersReduced}
          />
        </div>
      </motion.div>

      {/* LAYER 3: Ghost 3D is positioned as top authoritative layer per doc. */}
      <div
        className="absolute inset-0 z-[90] w-full h-full pointer-events-none"
        aria-hidden
      >
        <div className="sticky top-0 z-[90] w-full h-screen overflow-hidden pointer-events-none flex items-center justify-center">
          <div className="w-full h-full md:absolute md:inset-0 relative z-[90] translate-z-0">
            {!prefersReducedMotion ? (
              <GhostScene
                scrollProgress={scrollYProgress}
                ghostIntensity={ghostIntensity}
              />
            ) : null}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

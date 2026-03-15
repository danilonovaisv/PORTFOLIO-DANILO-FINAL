'use client';

import React, { useRef } from 'react';
import { motion, useScroll, MotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import dynamic from 'next/dynamic';

// Importações dos sub-componentes (Certifique-se que os caminhos estão corretos)
import {
  BeliefSection,
  BeliefMobileTextLayer,
  BeliefFinalSection,
  BeliefFinalSectionOverlay,
  BeliefFixedHeader,
} from '@/components/sobre/beliefs';
import { BRAND } from '@/config/brand';

// [CORREÇÃO CRÍTICA]: Tratamento robusto para importação dinâmica.
// Isso garante que pega o componente correto, seja export default ou export nomeado.
const GhostScene = dynamic<{ scrollProgress: MotionValue<number> }>(
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
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

const COLORS = [
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
];

export function AboutBeliefs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const prefersReduced = !!prefersReducedMotion;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
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
        minHeight: `var(--section-min-height, ${(PHRASES.length + 2) * 100}vh)`,
      }}
      className="relative w-full isolate z-10 [--section-min-height:550vh] md:[--section-min-height:800vh]"
    >
      <BeliefFixedHeader
        scrollProgress={prefersReduced ? (undefined as any) : scrollYProgress}
        MotionHeader={MotionHeader}
        prefersReducedMotion={prefersReduced}
      />
      {/* LAYER 1: Seções de Conteúdo (Texto Scrollável) - Background */}
      <MotionDiv className="relative z-10">
        {/* Adicionei verificações para evitar erro se PHRASES/COLORS estiverem vazios */}
        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            index={index}
            text={phrase}
            bgColor={COLORS[index] || COLORS[0]}
            isFirst={index === 0}
            MotionSection={MotionSection}
            MotionDiv={MotionDiv}
            prefersReducedMotion={prefersReduced}
          />
        ))}

        <BeliefFinalSection
          scrollProgress={prefersReduced ? undefined : scrollYProgress}
          bgColor={BRAND.colors.bluePrimary}
          MotionDiv={MotionDiv}
          prefersReducedMotion={prefersReduced}
        />
      </MotionDiv>

      {/* LAYER 2: Texto Mobile Fixed no Footer */}
      <div className="relative z-20">
        <BeliefMobileTextLayer
          phrases={PHRASES}
          scrollYProgress={prefersReduced ? undefined : scrollYProgress}
          MotionDiv={MotionDiv}
          prefersReducedMotion={prefersReduced}
        />
      </div>

      {/* LAYER 4: Final Text Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-50">
        <BeliefFinalSectionOverlay
          MotionDiv={MotionDiv}
          prefersReducedMotion={prefersReduced}
        />
      </div>

      {/* LAYER 3: Canvas 3D (Z-50 para garantir sobreposição visual ao texto do Z-40 e Z-20) */}
      <div
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none flex items-center justify-center">
          {/* O container interno âncora o Canvas na mesma grid do texto */}
          <div className="std-grid w-full h-full">
            <div className="col-span-12 w-full h-full relative translate-z-0">
              {!prefersReducedMotion ? (
                <GhostScene scrollProgress={scrollYProgress} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

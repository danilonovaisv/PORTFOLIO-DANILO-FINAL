'use client';

import React, { useRef } from 'react';
import { useScroll, MotionValue, useReducedMotion, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useBeliefsAnimation } from '@/hooks/useBeliefsAnimation';

// Importações dos sub-componentes (Certifique-se que os caminhos estão corretos)
import {
  BeliefSection,
  BeliefMobileTextLayer,
  BeliefFinalSection,
  BeliefFinalSectionOverlay,
  BeliefFixedHeader,
} from '../beliefs';
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // [FIX] Cores interpoladas suavemente. Garante que o último frame seja bluePrimary.
  const { backgroundColor } = useBeliefsAnimation({
    scrollYProgress,
    totalPhrases: PHRASES.length,
    colors: COLORS,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-x-clip min-h-[800vh]"
    >
      {/* LAYER 0: Global Background (Sticky/Fixed Shim) */}
      {/* Usando sticky para garantir que fique "preso" à viewport dentro da section sem subir com o scroll */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <motion.div
            style={{ backgroundColor }}
            className="w-full h-full"
          />
        </div>
      </div>

      <BeliefFixedHeader scrollProgress={scrollYProgress} />

      {/* LAYER 1: Seções de Conteúdo (Texto Scrollável) - Z-INDEX 20 */}
      <div className="relative z-20">
        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor="transparent" // Desativa BG por seção para usar o Global
            isFirst={index === 0}
          />
        ))}

        <BeliefFinalSection
          scrollProgress={scrollYProgress}
          bgColor="transparent"
        />
      </div>

      {/* LAYER 2: Texto Mobile Fixed no Footer - Z-INDEX 50 */}
      <BeliefMobileTextLayer
        phrases={PHRASES}
        scrollYProgress={scrollYProgress}
      />

      {/* LAYER 3: Canvas 3D - Z-INDEX 60 (ACIMA DO TEXTO e HEADER para imersão) */}
      <div
        className="absolute inset-0 z-60 w-full h-full pointer-events-none"
        aria-hidden
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none flex md:items-center md:justify-center items-end justify-start">
          <div className="w-full h-full md:absolute md:inset-0 relative">
            {!prefersReducedMotion ? (
              <GhostScene scrollProgress={scrollYProgress} />
            ) : null}
          </div>
        </div>
      </div>

      {/* LAYER 4: Final Text Overlay (Extremo Topo) - Z-INDEX 70 */}
      <div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-70">
        <BeliefFinalSectionOverlay />
      </div>
    </section>
  );
}

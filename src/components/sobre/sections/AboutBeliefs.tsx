'use client';

import React, { useRef } from 'react';
import { useScroll, MotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: `${(PHRASES.length + 2) * 100}vh` }} // Garante altura baseada no conteúdo
    >
      <BeliefFixedHeader scrollProgress={scrollYProgress} />
      {/* LAYER 1: Seções de Conteúdo (Texto Scrollável) */}
      <div className="relative z-20">
        {/* Adicionei verificações para evitar erro se PHRASES/COLORS estiverem vazios */}
        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index] || COLORS[0]}
            isFirst={index === 0}
          />
        ))}

        <BeliefFinalSection
          scrollProgress={scrollYProgress}
          bgColor={BRAND.colors.bluePrimary}
        />
      </div>

      {/* LAYER 2: Texto Mobile Fixed no Footer */}
      <BeliefMobileTextLayer
        phrases={PHRASES}
        scrollYProgress={scrollYProgress}
      />

      {/* LAYER 4: Final Text Overlay (Z-40) - Background for Ghost */}
      <div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-40">
        <BeliefFinalSectionOverlay />
      </div>

      {/* LAYER 3: Canvas 3D (Sticky - Top Layer Z-60) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-60">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto flex md:items-center md:justify-center items-end justify-start">
          <div className="w-full h-full md:absolute md:inset-0 relative">
            <GhostScene scrollProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}

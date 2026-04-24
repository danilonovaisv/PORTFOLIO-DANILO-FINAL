'use client';

/**
 * AboutBeliefs — Orquestrador da Seção 06 "O Que Me Move".
 *
 * Stack de camadas (Ghost Design System — tokens globais + exceção local aprovada):
 *   base     → BeliefBackground
 *   glass    → BeliefOverlay
 *   cta      → BeliefScrollText
 *   overlay  → BeliefManifesto
 *   lightbox → GhostScene (acima do manifesto por decisão editorial da seção)
 *
 * Ajuste desta rodada:
 * • composição interna alinhada ao max-width 1680px sem quebrar full-bleed
 * • overlay agora responde ao scroll como camada governada
 * • motion DOM padronizado em opacity + blur + translateY
 * • comentários reconciliados com estado real da seção
 *
 * Referências: audit 2026-04-16, userMemories, Blueprint reconciliado.
 */

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { motion, useTransform } from 'motion/react';

import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '@/components/sobre/beliefs/BeliefScrollText';
import { BeliefManifesto } from '@/components/sobre/beliefs/BeliefManifesto';
import { CustomCursor } from '@/components/sobre/beliefs/CustomCursor';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';

// SSR guard: R3F + hooks de scroll não devem executar no servidor.
// O placeholder mantém o espaço (evita CLS) mas não bloqueia a main thread.
const GhostScene = dynamic(
  () =>
    import('@/components/sobre/3d/GhostScene').then((mod) => mod.GhostScene),
  {
    ssr: false,
    loading: () => (
      <div
        className="sticky top-[14vh] md:top-0 h-[100dvh] w-full z-[var(--z-layer-lightbox)] pointer-events-none"
        aria-hidden="true"
      />
    ),
  }
);

// Frases fora do componente — referência estável, sem re-criação por render
const PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;

export const AboutBeliefs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, prefersReducedMotion, isMobile } =
    useBeliefsScroll(containerRef);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.62, 0.74, 0.84],
    [1, 1, 0.18, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative isolate w-full overflow-hidden bg-background"
      data-testid="beliefs-section"
      aria-label="O que me move — manifesto Ghost Design"
    >
      <CustomCursor
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* ── z-0: Fundo com transição de cores via inView + climax via scrollProgress ── */}
      <BeliefBackground scrollProgress={scrollYProgress} />

      {/* ── z-10: Overlay cross-fade anti-banding ── */}
      <BeliefOverlay scrollProgress={scrollYProgress} />

      {/* ── header editorial fixo durante toda a narrativa ── */}
      <BeliefFixedHeader
        scrollProgress={scrollYProgress}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* ── Ghost 3D acima do manifesto no clímax ── */}
      <GhostScene
        scrollProgress={scrollYProgress}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* ── manifesto final abaixo do Ghost, preso ao clímax da seção ── */}
      <BeliefManifesto
        scrollProgress={scrollYProgress}
        prefersReducedMotion={prefersReducedMotion}
      />

      <motion.div
        className="relative z-[var(--z-layer-cta)] w-full pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <BeliefScrollText
          phrases={PHRASES}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      </motion.div>
    </section>
  );
};

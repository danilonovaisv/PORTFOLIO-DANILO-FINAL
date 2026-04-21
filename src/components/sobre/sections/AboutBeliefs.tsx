'use client';

/**
 * AboutBeliefs — Orquestrador da Seção 06 "O Que Me Move".
 *
 * Stack de camadas (Ghost Design System — imutável até revisão do MKM):
 *   z-0  → BeliefBackground  (HSL via useTransform — scroll-driven)
 *   z-10 → BeliefOverlay     (cross-fade anti-banding OLED)
 *   z-30 → BeliefFixedHeader (sticky, slide-in da direita)
 *   z-40 → BeliefScrollText  (frases rotatórias, desktop+mobile)
 *   z-50 → BeliefManifesto   (clímax final — scroll out)
 *   z-70 → GhostScene        (sticky, R3F frameloop="demand" - no topo absoluto)
 *
 * CORREÇÕES v2 aplicadas neste arquivo:
 * • GhostScene refatorado para sticky z-[70]
 * • useBeliefsScroll (offset corrigido: ['start end', 'end end'])
 * • GhostScene via dynamic({ssr:false}) — previne erro de hydration
 * • PHRASES como readonly const fora do componente (sem re-criação por render)
 * • aria-label na section para acessibilidade semântica
 *
 * Referências: audit 2026-04-16, userMemories, Blueprint reconciliado.
 */

import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '@/components/sobre/beliefs/BeliefScrollText';
import { BeliefManifesto } from '@/components/sobre/beliefs/BeliefManifesto';
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
        className="sticky md:top-0 top-[20vh] h-[100dvh] w-full z-[70] pointer-events-none"
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

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      data-testid="beliefs-section"
      aria-label="O que me move — manifesto Ghost Design"
    >
      {/* ── z-0: Fundo com transição de cores via inView ── */}
      <BeliefBackground />

      {/* ── z-10: Overlay cross-fade anti-banding ── */}
      <BeliefOverlay scrollProgress={scrollYProgress} />

      {/* ── z-30: Header sticky (direita, desktop) ── */}
      <BeliefFixedHeader />

      {/* ── z-30: Ghost 3D (fixed, R3F, SSR-safe) ── */}
      <GhostScene
        scrollProgress={scrollYProgress}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />

      <div className="relative z-40 w-full pointer-events-none">
        <BeliefScrollText
          phrases={PHRASES}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      {/* ── z-50: Manifesto final (acima do Ghost no clímax) ── */}
      <BeliefManifesto
        scrollProgress={scrollYProgress}
        prefersReducedMotion={prefersReducedMotion}
      />
    </section>
  );
};

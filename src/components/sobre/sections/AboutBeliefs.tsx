'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '@/components/sobre/beliefs/BeliefScrollText';
import { BeliefManifesto } from '@/components/sobre/beliefs/BeliefManifesto';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';

const GhostScene = dynamic(
  () =>
    import('@/components/sobre/3d/GhostScene').then((mod) => mod.GhostScene),
  {
    ssr: false,
    loading: () => (
      <div
        data-testid="ghost-figure"
        className="fixed inset-0 z-30 pointer-events-none bg-transparent"
        aria-hidden="true"
      />
    ),
  }
);

const PHRASES: ReadonlyArray<string> = [
  'Um vídeo que respira.',
  'Uma marca que se reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar presença.',
  'Mesmo quando não estou ali.',
  'Mesmo quando ninguém percebe o esforço.',
];

/**
 * Seção 06 — "O Que Me Move" (AboutBeliefs)
 *
 * Stack de camadas (Ghost Design System):
 *   z-0  → BeliefBackground (HSL via useTransform)
 *   z-10 → BeliefOverlay (cross-fade)
 *   z-20 → conteúdo scrollável
 *   z-30 → BeliefFixedHeader (sticky) + GhostScene (fixed)
 *   z-40 → BeliefScrollText (frases rotatórias)
 *   z-50 → BeliefManifesto (clímax — ACIMA do Ghost)
 *
 * Correções aplicadas (audits 2026-04-16 + 2026-02-22):
 *   • offset ['start end', 'end end']
 *   • Ghost em z-30, manifesto em z-50
 *   • useTransform para cor do BG (não animate())
 *   • AnimatePresence mode="wait" no mobile
 *   • GLB path via Supabase URL — path canônico validado
 *   • SSR guard via dynamic + ssr:false
 */
export const AboutBeliefs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, prefersReducedMotion, isMobile } =
    useBeliefsScroll(containerRef);

  return (
    <section
      ref={containerRef}
      id="06-o-que-me-move"
      className="relative w-full min-h-[400vh] overflow-hidden"
      data-testid="about-beliefs-section"
      aria-label="O que me move — manifesto"
    >
      <BeliefBackground scrollProgress={scrollYProgress} />
      <BeliefOverlay scrollProgress={scrollYProgress} />

      <BeliefFixedHeader />

      <div className="relative z-40 w-full min-h-full flex flex-col justify-center pointer-events-none">
        <BeliefScrollText
          phrases={[...PHRASES]}
          scrollProgress={scrollYProgress}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      <GhostScene scrollProgress={scrollYProgress} isMobile={isMobile} />

      <BeliefManifesto
        scrollProgress={scrollYProgress}
        prefersReducedMotion={prefersReducedMotion}
      />
    </section>
  );
};

'use client';

import { useEffect } from 'react';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
import { useBeliefStore } from '@/store/beliefStore';
import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '@/components/sobre/beliefs/BeliefScrollText';
import { BeliefSection } from '@/components/sobre/beliefs/BeliefSection';
import { BeliefManifesto } from '@/components/sobre/beliefs/BeliefManifesto';
import { GhostScene } from '@/components/sobre/3d/GhostScene';
import { GhostErrorBoundary } from '@/components/sobre/3d/GhostErrorBoundary';

const PHRASES = [
  {
    title: 'PRECISÃO',
    text: 'O design não é sobre o que se vê, mas sobre o que se sente através da funcionalidade absoluta.',
    color: '#0048ff',
  },
  {
    title: 'ESSÊNCIA',
    text: 'Remover o ruído até que reste apenas a verdade estrutural do produto.',
    color: '#040013',
  },
  {
    title: 'MOVIMENTO',
    text: 'A fluidez é a linguagem da vida. Interfaces estáticas são interfaces mortas.',
    color: '#0a0026',
  },
  {
    title: 'IMPACTO',
    text: 'Criar experiências que permanecem na memória muito depois da tela se apagar.',
    color: '#0048ff',
  },
  {
    title: 'VISÃO',
    text: 'Antecipar o futuro através de tecnologia de ponta e estética atemporal.',
    color: '#040013',
  },
];

export function AboutBeliefsClient() {
  const { containerRef, scrollYProgress } = useBeliefsScroll();
  const setScrollProgress = useBeliefStore((s) => s.setScrollProgress);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
    });

    return () => unsub();
  }, [scrollYProgress, setScrollProgress]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600vh] bg-[#040013]"
      data-testid="beliefs-section"
      aria-label="O que me move — manifesto Ghost Design"
    >
      <BeliefBackground prefersReducedMotion={prefersReducedMotion} />

      <div className="relative z-10 w-full">
        <BeliefFixedHeader
          scrollProgress={scrollYProgress}
          prefersReducedMotion={prefersReducedMotion}
        />

        <BeliefScrollText
          scrollProgress={scrollYProgress}
          phrases={PHRASES}
          prefersReducedMotion={prefersReducedMotion}
        />

        <div className="fixed inset-0 z-20 pointer-events-none">
          <GhostErrorBoundary>
            <GhostScene scrollProgress={scrollYProgress} />
          </GhostErrorBoundary>
        </div>

        <div className="relative">
          {PHRASES.map((phrase, i) => (
            <BeliefSection key={i} index={i} bgColor={phrase.color} />
          ))}
          <BeliefSection index={PHRASES.length} bgColor="#040013" />
        </div>

        <BeliefManifesto
          scrollProgress={scrollYProgress}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </section>
  );
}

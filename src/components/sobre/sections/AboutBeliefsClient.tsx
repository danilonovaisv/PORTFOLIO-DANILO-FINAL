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
    title: 'Acredito no design que é invisível até que você precise dele.',
    text: 'Remover o ruído até que reste apenas a verdade estrutural do produto.',
    color: '#f501d3', // Pink
  },
  {
    title: 'A fluidez é a linguagem da vida.',
    text: 'Interfaces estáticas são interfaces mortas. O movimento comunica intenção.',
    color: '#8705f2', // Purple
  },
  {
    title: 'Tecnologia como extensão humana.',
    text: 'Antecipar o futuro através de tecnologia de ponta e estética atemporal.',
    color: '#0048ff', // Blue
  },
  {
    title: 'Impacto que permanece.',
    text: 'Criar experiências que permanecem na memória muito depois da tela se apagar.',
    color: '#8705f2', // Purple (Back towards blue/pink)
  },
  {
    title: 'VISÃO GHOST',
    text: 'O design não é sobre o que se vê, mas sobre o que se sente através da funcionalidade absoluta.',
    color: '#0048ff', // Final Blue
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
      <BeliefBackground scrollProgress={scrollYProgress} />

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
          {PHRASES.map((_, i) => (
            <BeliefSection key={i} index={i} />
          ))}
          <BeliefSection index={PHRASES.length} />
        </div>

        <BeliefManifesto
          scrollProgress={scrollYProgress}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </section>
  );
}

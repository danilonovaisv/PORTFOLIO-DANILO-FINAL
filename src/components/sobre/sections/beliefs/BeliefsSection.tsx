'use client';

import { useEffect } from 'react';
import { useInView } from 'motion/react';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
import { useBeliefStore } from '@/store/beliefStore';
import { BeliefBackground } from '@/components/sobre/sections/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/sections/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/sections/beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '@/components/sobre/sections/beliefs/BeliefScrollText';
import { BeliefSection } from '@/components/sobre/sections/beliefs/BeliefSection';
import { BeliefManifesto } from '@/components/sobre/sections/beliefs/BeliefManifesto';
import { GhostCanvas } from '@/components/sobre/sections/beliefs/3d/GhostCanvas';
import { GhostErrorBoundary } from '@/components/sobre/sections/beliefs/3d/GhostErrorBoundary';

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

export function BeliefsSection() {
  const { containerRef, scrollYProgress } = useBeliefsScroll();
  const setScrollProgress = useBeliefStore((s) => s.setScrollProgress);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);
  const isInView = useInView(containerRef);

  useEffect(() => {
    if (!isInView) {
      setScrollProgress(0);
    }
  }, [isInView, setScrollProgress]);

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
        <BeliefOverlay scrollProgress={scrollYProgress} />

        <BeliefFixedHeader
          scrollProgress={scrollYProgress}
          prefersReducedMotion={prefersReducedMotion}
        />

        <BeliefScrollText
          scrollProgress={scrollYProgress}
          phrases={PHRASES}
          prefersReducedMotion={prefersReducedMotion}
        />

        <div className="fixed inset-0 z-50 pointer-events-none">
          <GhostErrorBoundary>
            <GhostCanvas scrollProgress={scrollYProgress} />
          </GhostErrorBoundary>
        </div>

        <div className="relative">
          {PHRASES.map((_, i) => (
            <BeliefSection key={i} />
          ))}
          <BeliefSection />
        </div>

        <BeliefManifesto
          scrollProgress={scrollYProgress}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </section>
  );
}

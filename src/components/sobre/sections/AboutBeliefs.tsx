'use client';

import { useEffect, useRef, useState } from 'react';
import { inView } from 'motion';
import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefPhrases } from '@/components/sobre/beliefs/BeliefPhrases';
import { BeliefManifesto } from '@/components/sobre/beliefs/BeliefManifesto';
import { GhostCanvas } from '@/components/sobre/3d/GhostCanvas';
import { useBeliefScroll } from '@/hooks/useBeliefScroll';

const PHRASES = [
  'Um vídeo que respira.',
  'Uma marca que se reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar presença.',
  'Mesmo quando não estou ali.',
  'Mesmo quando ninguém percebe o esforço.',
];

export function AboutBeliefs() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useBeliefScroll(containerRef);
  const [isCanvasActive, setIsCanvasActive] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const stop = inView(
      containerRef.current,
      () => {
        setIsCanvasActive(true);
        return () => setIsCanvasActive(false);
      },
      { margin: '-10% 0px -10% 0px' }
    );

    return () => stop();
  }, []);

  return (
    <section
      ref={containerRef}
      id="06-o-que-me-move"
      data-testid="about-beliefs-section"
      aria-label="O Que Me Move"
      className="relative min-h-[700vh] overflow-hidden"
    >
      <div className="sr-only">
        <h2>Manifesto: O Que Me Move</h2>
        <ul>
          {PHRASES.map((phrase) => (
            <li key={phrase}>{phrase}</li>
          ))}
          <li>ISSO É GHOST DESIGN.</li>
        </ul>
      </div>

      <BeliefBackground containerRef={containerRef} />
      <BeliefOverlay scrollYProgress={scrollYProgress} />

      <div className="sticky top-0 h-screen grid grid-cols-12 overflow-hidden">
        <BeliefFixedHeader containerRef={containerRef} />
        <BeliefPhrases />
        <BeliefManifesto containerRef={containerRef} />
      </div>

      {isCanvasActive ? <GhostCanvas /> : null}
    </section>
  );
}

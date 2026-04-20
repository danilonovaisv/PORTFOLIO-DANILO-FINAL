'use client';

import { useRef } from 'react';
import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefManifesto } from '@/components/sobre/beliefs/BeliefManifesto';
import { BeliefScrollText } from '@/components/sobre/beliefs/BeliefScrollText';
import { GhostScene } from '@/components/sobre/3d/GhostScene';
import { BeliefsScrollProvider } from '@/components/sobre/beliefs/BeliefsScrollContext';

const PHRASES = [
  'Um vídeo que respira.',
  'Uma marca que se reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar presença.',
  'Mesmo quando não estou ali.',
  'Mesmo quando ninguém percebe o esforço.',
];

export function AboutBeliefs() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="06-o-que-me-move"
      data-testid="about-beliefs-section"
      aria-label="O Que Me Move"
      className="relative"
    >
      <div
        ref={containerRef}
        className="relative min-h-[760vh] md:min-h-[820vh] lg:min-h-[900vh]"
      >
        <BeliefsScrollProvider containerRef={containerRef}>
          <div className="sr-only">
            <h2>Manifesto: O Que Me Move</h2>
            <ul>
              {PHRASES.map((phrase) => (
                <li key={phrase}>{phrase}</li>
              ))}
              <li>ISSO É GHOST DESIGN.</li>
            </ul>
          </div>

          <BeliefBackground />
          <BeliefOverlay />

          <div className="relative sticky top-0 h-screen grid grid-cols-12 overflow-hidden">
            <BeliefFixedHeader />
            <BeliefScrollText phrases={PHRASES} />
            <BeliefManifesto />
            <AboutBeliefsScene />
          </div>
        </BeliefsScrollProvider>
      </div>
    </section>
  );
}

/**
 * Componente interno para lidar com a condicional do GhostScene
 * dentro do provider, mantendo o AboutBeliefs limpo.
 */
function AboutBeliefsScene() {
  // Nota: GhostScene e outros agora pegam o scroll via contexto internamente
  return <GhostScene />;
}

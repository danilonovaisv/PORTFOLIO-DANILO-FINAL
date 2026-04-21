'use client';

/**
 * BeliefBackground — Layer 0 (z-0).
 * Transição de cor de fundo ativada por scroll via inView e animate.
 *
 * CORREÇÃO v3:
 * Removido scrollProgress para evitar erro de serialização do Next.js.
 * Utiliza scroll-triggered animations conforme tutorial JS oficial da Motion.
 */

import { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';

const COLOR_STOPS = [
  '#040013', // Deep Void — intro
  '#0048ff', // bluePrimary — frase 1
  '#8705f2', // purpleDetails — frase 2
  '#f501d3', // pinkDetails — frase 3
  '#0048ff', // bluePrimary — frase 4
  '#8705f2', // purpleDetails — frase 5
  '#f501d3', // pinkDetails — frase 6
  '#040013', // Deep Void — clímax/saída
] as const;

export const BeliefBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect elements with the class 'scroll-section' entering the viewport
    const stop = inView('.scroll-section', (element) => {
      const indexAttr = element.getAttribute('data-index');
      if (!indexAttr) return;

      const index = Number(indexAttr);
      if (Number.isNaN(index)) return;

      const targetColor =
        COLOR_STOPS[index + 1] ?? COLOR_STOPS[COLOR_STOPS.length - 1];

      if (bgRef.current) {
        animate(
          bgRef.current,
          { backgroundColor: targetColor },
          { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
        );
      }
    });

    return () => stop();
  }, []);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: COLOR_STOPS[0] }}
      aria-hidden="true"
    />
  );
};

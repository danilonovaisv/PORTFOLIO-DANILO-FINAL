'use client';

import { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import { BELIEF_BACKGROUND_STOPS, beliefMotion, beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    const background = ref.current;
    if (!background) return;

    if (shouldReduceMotion) {
      background.style.backgroundColor = BELIEF_BACKGROUND_STOPS[0];
      return;
    }

    // Inicializa com a primeira cor
    background.style.backgroundColor = BELIEF_BACKGROUND_STOPS[0];

    // Configuração do trigger via inView (Motion DOM)
    // Conforme especificação v4 e tutorial motion.dev
    const stop = inView(
      '.belief-scroll-section',
      (element) => {
        const index = Number.parseInt(element.getAttribute('data-index') ?? '0', 10);
        
        // Mapeia o índice para a cor correspondente
        // BELIEF_BACKGROUND_STOPS tem 8 cores: Void -> Phrase1-6 -> Climax
        const targetColor = BELIEF_BACKGROUND_STOPS[index + 1] || BELIEF_BACKGROUND_STOPS[0];

        animate(
          background,
          { backgroundColor: targetColor },
          {
            duration: index === 6 ? 0.4 : beliefMotion.revealDuration, // Transição mais rápida para o climax
            ease: beliefMotion.ambientEase as any,
          }
        );
      },
      { amount: 0.4 } // Ativa quando 40% da seção de scroll estiver visível
    );

    return () => stop();
  }, [shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="beliefs-background"
      data-belief-background
      className="absolute inset-0 bg-[#040013]"
      style={{ zIndex: beliefZIndex.background }}
    />
  );
}

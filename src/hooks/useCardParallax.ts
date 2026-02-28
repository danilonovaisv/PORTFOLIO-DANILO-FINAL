'use client';

import { useEffect, useRef } from 'react';

/**
 * Applies a continuous parallax translation to card image wrappers.
 * The wrapper must have class `.card-image-wrapper` and height > card.
 */
export const useCardParallax = (
  cardRefs: React.RefObject<(HTMLElement | null)[]>,
  enabled = true
) => {
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const applyParallax = () => {
      cardRefs.current?.forEach((card) => {
        if (!card) return;

        const wrapper = card.querySelector<HTMLElement>('.card-image-wrapper');
        if (!wrapper) return;

        const diff = card.offsetHeight - wrapper.offsetHeight;
        const { top } = card.getBoundingClientRect();
        const progress = top / window.innerHeight;
        const yPos = diff * progress;

        wrapper.style.transform = `translateY(${yPos}px)`;
      });

      rafId.current = requestAnimationFrame(applyParallax);
    };

    rafId.current = requestAnimationFrame(applyParallax);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, cardRefs]);
};

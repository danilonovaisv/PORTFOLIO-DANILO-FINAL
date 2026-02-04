'use client';

import { useEffect } from 'react';

import * as THREE from 'three';

/**
 * Hook para sincronizar o efeito de revelação 2D com a posição do ghost 3D
 * @param ghostRef - Referência ao grupo do ghost no mundo 3D
 * @param revealRef - Referência ao elemento HTML do overlay de revelação
 * @param enabled - Se o efeito está ativado (desktop com WebGL)
 */
export function useGhostReveal(
  ghostRef: React.RefObject<THREE.Group | null> | undefined,
  revealRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled || !ghostRef?.current || !revealRef.current) return;

    let rafId: number;

    const updateRevealPosition = () => {
      if (!ghostRef.current || !revealRef.current) return;

      const ghostPos = ghostRef.current.position;
      const overlay = revealRef.current;

      // Converte posição 3D world-space para coordenadas 2D viewport
      // Ghost se move aproximadamente de -10 a +10 em X e -7 a +7 em Y
      const x = ((ghostPos.x + 10) / 20) * 100; // Normaliza para 0-100%
      const y = ((ghostPos.y + 7) / 14) * 100; // Normaliza para 0-100%
      const invertedY = 100 - y;

      // Atualiza a posição do overlay usando CSS transform
      overlay.style.transform = `translate(calc(${x}vw - 50%), calc(${invertedY}vh - 50%))`;

      // Seta variáveis no documento/root para uso em classes CSS (ex: mask-image)
      document.documentElement.style.setProperty('--ghost-x', `${x}vw`);
      document.documentElement.style.setProperty('--ghost-y', `${invertedY}vh`);

      rafId = requestAnimationFrame(updateRevealPosition);
    };

    // Inicia o loop de atualização
    rafId = requestAnimationFrame(updateRevealPosition);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ghostRef, revealRef, enabled]);
}

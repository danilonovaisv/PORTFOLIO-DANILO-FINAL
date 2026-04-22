'use client';

/**
 * CustomCursor — Layer de Cursor Global.
 * Renderiza um dot (ponto fixo) e um ring (com inércia) no pointer.
 * Atualiza coordenadas globais (cursorX, cursorY) no beliefStore para uso do R3F.
 */

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { cursorX, cursorY } from '@/store/beliefStore';

interface CustomCursorProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export const CustomCursor = ({ isMobile, prefersReducedMotion }: CustomCursorProps) => {

  // Coordenadas absolutas na tela para o dot
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Inércia suave para o ring
  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.7 });

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const onMove = (e: PointerEvent) => {
      // Atualiza Posição Visual
      x.set(e.clientX);
      y.set(e.clientY);

      // Normalizado -1 → 1 para o GhostScene
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1; // y invertido para 3D
      cursorX.set(normX);
      cursorY.set(normY);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y, isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#0048ff] rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#0048ff]/40 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      />
    </div>
  );
};

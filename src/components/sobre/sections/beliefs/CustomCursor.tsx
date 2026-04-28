'use client';

/**
 * CustomCursor — Layer de Cursor Global.
 * Renderiza um dot (ponto fixo) e um ring (com inércia) no pointer.
 * Cursor editorial legado da página Sobre. A experiência v3 do manifesto
 * mantém cursor e Ghost 3D isolados para não acoplar camadas DOM/WebGL.
 */

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface CustomCursorProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export const CustomCursor = ({
  isMobile,
  prefersReducedMotion,
}: CustomCursorProps) => {
  // Coordenadas absolutas na tela para o dot
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Inércia suave para o ring — Física "sticky" premium (Awwwards level)
  const ringX = useSpring(x, { stiffness: 400, damping: 40, mass: 1 });
  const ringY = useSpring(y, { stiffness: 400, damping: 40, mass: 1 });

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const onMove = (e: PointerEvent) => {
      // Atualiza Posição Visual
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y, isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[var(--z-layer-cursor)] overflow-hidden">
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-bluePrimary"
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
        className="fixed top-0 left-0 h-8 w-8 rounded-full border border-bluePrimary/40"
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

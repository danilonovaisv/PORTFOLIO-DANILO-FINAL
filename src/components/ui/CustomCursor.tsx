'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface CustomCursorProps {
  color?: string;
  size?: number;
}

export default function CustomCursor({
  color = '#0048ff',
  size = 20,
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Posicionamento bruto
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Física da Mola (stiffness: 300, damping: 40 aprovado no plano)
  const springConfig = { stiffness: 300, damping: 40 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  const motionGate = useMotionGate();
  const supportsFinePointer = useMediaQuery(
    '(hover: hover) and (pointer: fine)'
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], input, textarea, select')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], input, textarea, select')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  if (motionGate || !supportsFinePointer) return null;

  return (
    <motion.div
      ref={cursorRef}
      initial={{
        scale: 1,
        backgroundColor: color,
        border: `0px solid ${color}`,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'transparent' : color,
        border: isHovering ? `1px solid ${color}` : `0px solid ${color}`,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      aria-hidden="true"
    />
  );
}

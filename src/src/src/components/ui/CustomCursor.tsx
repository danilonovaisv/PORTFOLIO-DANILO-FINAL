'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export interface CustomCursorProps {
  color?: string;
  size?: number;
}

export default function CustomCursor({
  color = '#0048ff',
  size = 20,
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      aria-hidden="true"
    />
  );
}

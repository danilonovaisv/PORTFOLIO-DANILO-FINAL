'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type GhostWanderProps = {
  size?: number;
  intervalMs?: number;
  travelSeconds?: number;
  className?: string;
};

export function GhostWander({
  size = 220,
  intervalMs = 2600,
  travelSeconds = 1.5,
  className,
}: GhostWanderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [position, setPosition] = useState({ x: 40, y: 40 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const ghost = ghostRef.current;
    if (!container || !ghost) return;

    const moveGhost = () => {
      const maxX = container.clientWidth - ghost.clientWidth;
      const maxY = container.clientHeight - ghost.clientHeight;

      setPosition({
        x: Math.random() * Math.max(0, maxX),
        y: Math.random() * Math.max(0, maxY),
      });
    };

    moveGhost();
    const interval = setInterval(moveGhost, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className ?? ''}`}
      aria-hidden
    >
      <motion.div
        ref={ghostRef}
        animate={prefersReducedMotion ? {} : position}
        transition={{ duration: travelSeconds, ease: 'easeInOut' }}
        style={{ width: size, height: size }}
        className="absolute will-change-transform"
      >
        <img
          src="/ghost/ghost.png"
          alt=""
          draggable={false}
          className="h-full w-full select-none opacity-90"
        />
      </motion.div>
    </div>
  );
}

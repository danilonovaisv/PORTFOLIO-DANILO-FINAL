'use client';

/**
 * GhostScrollText — Marquee de velocidade para o Ghost Design System
 *
 * Uso básico:
 *   <ScrollText>Ghost System · Danilo Novais ·&nbsp;</ScrollText>
 *
 * Com scroll-dependent:
 *   <ScrollText baseVelocity={-5} scrollDependent>texto ·&nbsp;</ScrollText>
 *
 * Props:
 *   children        — string  — texto que repete em loop
 *   baseVelocity    — number  — velocidade base (neg = esquerda, pos = direita). default: -5
 *   className       — string  — classes extras no wrapper
 *   scrollDependent — boolean — reage ao scroll da página. default: false
 *   delay           — number  — delay em ms para iniciar. default: 0
 */

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScrollTextProps {
  children: string;
  baseVelocity?: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
}

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export function ScrollText({
  children,
  baseVelocity = -5,
  className,
  scrollDependent = false,
  delay = 0,
}: ScrollTextProps) {
  const shouldReduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const directionFactor = useRef<number>(1);
  const started = useRef(false);
  const startTime = useRef<number | null>(null);

  // Calcula quantas repetições são necessárias para cobrir a largura
  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;
    if (textWidth === 0) return;
    const reps = Math.ceil((containerWidth * 2) / textWidth) + 2;
    setRepetitions(Math.max(reps, 4));
  }, [children]);

  useAnimationFrame((t, delta) => {
    // Respeita delay
    if (!started.current) {
      if (startTime.current === null) startTime.current = t;
      if (t - startTime.current < delay) return;
      started.current = true;
    }

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000) * 60;

    if (scrollDependent) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
    }

    baseX.set(baseX.get() + moveBy);
  });

  // Wrap do translateX para loop perfeito
  const x = useTransform(
    baseX,
    (v) => `${wrap(-100 / repetitions, 0, v / repetitions)}%`
  );

  if (shouldReduce) {
    return (
      <div
        className={cn('overflow-hidden whitespace-nowrap py-3', className)}
        aria-label={`Marquee: ${children}`}
      >
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#a1a3a3] px-4">
          {children}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden whitespace-nowrap', className)}
      aria-hidden="true"
    >
      <motion.div className="flex" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? textRef : undefined}
            className="block shrink-0"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default ScrollText;

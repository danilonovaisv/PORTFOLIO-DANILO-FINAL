'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { GHOST_EASE } from '@/config/motion';

type RotatingHighlightsProps = {
  items: string[];
  maxVisible?: number;
  intervalMs?: number;
  className?: string;
};

function shuffle(values: string[]) {
  const next = [...values];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function getWindow(values: string[], offset: number, size: number) {
  if (!values.length) return [];
  return Array.from({ length: size }, (_, idx) => {
    const cursor = (offset + idx) % values.length;
    return values[cursor];
  });
}

export default function RotatingHighlights({
  items,
  maxVisible = 3,
  intervalMs = 4800,
  className,
}: RotatingHighlightsProps) {
  const reduceMotion = useMotionGate();
  const normalized = useMemo(
    () =>
      Array.from(
        new Set(
          items
            .map((item) => item.trim())
            .filter(Boolean)
        )
      ),
    [items]
  );
  const [ordered, setOrdered] = useState<string[]>(normalized);
  const windowSize = Math.min(maxVisible, ordered.length);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOrdered(shuffle(normalized));
  }, [normalized]);

  useEffect(() => {
    setOffset(0);
  }, [ordered]);

  useEffect(() => {
    if (reduceMotion || ordered.length <= windowSize || ordered.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setOffset((prev) => (prev + 1) % ordered.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, ordered.length, reduceMotion, windowSize]);

  if (!ordered.length) return null;

  const visibleHighlights = getWindow(ordered, offset, windowSize);

  return (
    <motion.ul
      key={`${offset}-${visibleHighlights.join('|')}`}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: GHOST_EASE as any }}
      aria-live="off"
    >
      {visibleHighlights.map((item, index) => (
        <li key={`${item}-${index}`} className="text-muted-foreground">
          {item}
        </li>
      ))}
    </motion.ul>
  );
}

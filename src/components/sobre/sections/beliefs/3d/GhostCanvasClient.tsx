'use client';

import dynamic from 'next/dynamic';
import { motion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { GhostFallback } from '@/components/sobre/sections/beliefs/3d/GhostFallback';

interface GhostCanvasClientProps {
  scrollProgress: MotionValue<number>;
}

const DynamicGhostCanvas = dynamic(
  () =>
    import('@/components/sobre/sections/beliefs/3d/GhostCanvas').then(
      (mod) => mod.GhostCanvas
    ),
  {
    ssr: false,
    loading: () => <GhostFallback mode="loading" />,
  }
);

export function GhostCanvasClient({ scrollProgress }: GhostCanvasClientProps) {
  const opacity = useTransform(
    scrollProgress,
    [0, 0.05, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="w-full h-full pointer-events-none"
    >
      <DynamicGhostCanvas scrollProgress={scrollProgress} />
    </motion.div>
  );
}

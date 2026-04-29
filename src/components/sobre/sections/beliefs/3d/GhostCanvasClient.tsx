'use client';

import dynamic from 'next/dynamic';
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
  return <DynamicGhostCanvas scrollProgress={scrollProgress} />;
}

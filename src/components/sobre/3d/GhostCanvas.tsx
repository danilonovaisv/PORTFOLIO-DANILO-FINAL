'use client';

import type { MotionValue } from 'framer-motion';
import GhostScene from '@/components/sobre/3d/GhostScene';

interface GhostCanvasProps {
  scrollProgress: MotionValue<number>;
  ghostIntensity: MotionValue<number>;
}

export function GhostCanvas({
  scrollProgress,
  ghostIntensity,
}: GhostCanvasProps) {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      <GhostScene
        scrollProgress={scrollProgress}
        ghostIntensity={ghostIntensity}
      />
    </div>
  );
}

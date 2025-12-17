'use client';

import { Canvas } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import GlassSceneLighting from './GlassSceneLighting';
import OrbModel from './OrbModel';

export default function HeroOrbLayer({
  mouse,
  scroll,
}: {
  mouse: { x: number; y: number };
  scroll: MotionValue<number>;
}) {
  return (
    <div className="absolute inset-0 z-[30] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <GlassSceneLighting />
        <OrbModel mouse={mouse} scroll={scroll} />
      </Canvas>
    </div>
  );
}

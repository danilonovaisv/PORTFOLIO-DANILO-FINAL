// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import Ghost from './Ghost';
import AtmosphereVeil from './AtmosphereVeil';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AnalogDecayPass from './postprocessing/AnalogDecayPass';

function MouseFollower({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const ghostRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reducedMotion, size]);

  useFrame(() => {
    if (reducedMotion || !ghostRef.current) return;
    // Smooth follow with 0.05 speed as per spec
    ghostRef.current.position.x +=
      (mouseRef.current.x * 6 - ghostRef.current.position.x) * 0.05;
    ghostRef.current.position.y +=
      (mouseRef.current.y * 3 - ghostRef.current.position.y) * 0.05;
  });

  return <group ref={ghostRef}>{children}</group>;
}

export default function GhostCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
      className="absolute inset-0 z-0"
    >
      <color attach="background" args={['#050505']} />

      <ambientLight intensity={0.1} color="#0a0a2e" />

      <AtmosphereVeil />

      <MouseFollower>
        <Ghost />
        <Particles count={60} />
      </MouseFollower>

      <Fireflies count={15} />

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <AnalogDecayPass />
        <Vignette offset={0.3} darkness={0.5} />
      </EffectComposer>
    </Canvas>
  );
}

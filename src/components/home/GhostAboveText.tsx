'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import * as THREE from 'three';
import Ghost from './webgl/Ghost';
import AnalogDecayPass from './webgl/postprocessing/AnalogDecayPass';

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
    ghostRef.current.position.x +=
      (mouseRef.current.x * 8 - ghostRef.current.position.x) * 0.05;
    ghostRef.current.position.y +=
      (mouseRef.current.y * 5 - ghostRef.current.position.y) * 0.05;
  });

  return <group ref={ghostRef}>{children}</group>;
}

function GhostScene() {
  return (
    <>
      <ambientLight intensity={0.08} color="#0a0a2e" />
      
      <MouseFollower>
        <Ghost />
      </MouseFollower>

      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.85}
          radius={0.5}
        />
        <AnalogDecayPass />
      </EffectComposer>
    </>
  );
}

export default function GhostAboveText() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ 
        antialias: false, 
        alpha: true,
        depth: false  // Disable depth buffer to allow proper blending
      }}
      className="absolute inset-0 z-30 pointer-events-none"
      style={{ 
        mixBlendMode: 'screen',  // This allows the ghost to blend with the text below
      }}
    >
      <GhostScene />
    </Canvas>
  );
}
// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import Ghost from './Ghost';
import AtmosphereVeil from './AtmosphereVeil';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AnalogDecayPass from './postprocessing/AnalogDecayPass';

// Ghost Scene Orchestrator - now uses window scroll directly
function GhostScene() {
  const reducedMotion = usePrefersReducedMotion();
  const ghostGroupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const ghostPosRef = useRef(new THREE.Vector3(0, 0, 0));
  const { size } = useThree();

  useEffect(() => {
    if (reducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
    };

    const handleScroll = () => {
      // Calculate scroll progress (0 to 1 based on first 200vh)
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 2; // 200vh
      scrollRef.current = Math.min(scrollY / maxScroll, 1);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion, size]);

  useFrame(() => {
    if (!ghostGroupRef.current) return;

    // Calculate Scroll Offset
    const scroll = scrollRef.current;
    const scrollY = scroll * -15; // Move up out of screen
    const scrollX = scroll * 8; // Move right
    const scrollScale = 1 - scroll * 0.4;

    // Base Positioning (Offset to the left)
    const baseLX = -4;

    // Calculate Mouse Offset
    const targetMouseX = reducedMotion ? 0 : mouseRef.current.x * 4;
    const targetMouseY = reducedMotion ? 0 : mouseRef.current.y * 2;

    // Apply Smooth Interpolation to Ghost Group
    ghostGroupRef.current.position.x +=
      (baseLX + targetMouseX + scrollX - ghostGroupRef.current.position.x) *
      0.05;
    ghostGroupRef.current.position.y +=
      (targetMouseY + scrollY - ghostGroupRef.current.position.y) * 0.05;
    ghostGroupRef.current.scale.setScalar(scrollScale);

    // Sync World Position to Ghost Pos Ref for Veil
    ghostPosRef.current.copy(ghostGroupRef.current.position);
  });

  return (
    <>
      <AtmosphereVeil ghostPosRef={ghostPosRef} />
      <group ref={ghostGroupRef}>
        <Ghost />
        <Particles count={60} />
      </group>
    </>
  );
}

export default function GhostCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      className="absolute inset-0 z-0"
    >
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.1} color="#0a0a2e" />
      <GhostScene />
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

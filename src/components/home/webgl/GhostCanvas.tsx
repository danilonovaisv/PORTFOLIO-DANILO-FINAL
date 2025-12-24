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

    // Base Positioning (Centered - no offset per reference)
    const baseLX = 0;

    // Calculate Mouse Offset (stronger follow per reference: 11x, 7y)
    const targetMouseX = reducedMotion ? 0 : mouseRef.current.x * 11;
    const targetMouseY = reducedMotion ? 0 : mouseRef.current.y * 7;

    // Apply Smooth Interpolation to Ghost Group (slower for "ethereal" feel)
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
      camera={{ position: [1, 0, 20], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      className="absolute inset-0"
      style={{ background: 'transparent' }}
    >
      {/* No solid background - fully transparent canvas */}
      <ambientLight intensity={0.01} color="#020214" />
      {/* Rim lights for ghost glow (per reference) */}
      <directionalLight
        position={[-8, 6, -4]}
        intensity={0.8}
        color="#b9e24a"
      />
      <directionalLight
        position={[8, -4, -6]}
        intensity={1.3}
        color="#ed1cdf"
      />
      <GhostScene />
      <Fireflies count={35} />
      <EffectComposer>
        <Bloom
          intensity={3.8}
          luminanceThreshold={0.4}
          luminanceSmoothing={1.4}
        />
        <AnalogDecayPass />
        <Vignette offset={0.11} darkness={0.6} />
      </EffectComposer>
    </Canvas>
  );
}

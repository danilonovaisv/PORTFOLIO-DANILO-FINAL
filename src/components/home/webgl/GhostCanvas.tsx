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

// Ghost Scene Orchestrator
function GhostScene() {
  const reducedMotion = usePrefersReducedMotion();
  const ghostGroupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ghostPosRef = useRef(new THREE.Vector3(0, 0, 0));
  const ghostSpeedRef = useRef(0);
  const lastGhostPosRef = useRef(new THREE.Vector3(0, 0, 0));
  const { size, camera } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  // Set initial anchor so the ghost starts leading the text on the left
  useEffect(() => {
    if (ghostGroupRef.current) {
      ghostGroupRef.current.position.set(-8, 3.5, 0);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (reducedMotion) {
      return () => window.removeEventListener('resize', checkMobile);
    }

    const handleMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        mouseRef.current.x = (e.clientX / size.width) * 2 - 1;
        mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [reducedMotion, size]);

  useFrame((state, delta) => {
    if (!ghostGroupRef.current) return;
    const t = state.clock.elapsedTime;

    let targetX = 0;
    let targetY = 0;

    if (isMobile) {
      // Automatic organic movement for mobile (Sine/Cosine loop - slower for ethereal feel)
      targetX = Math.sin(t * 0.2) * 6; // Reduced speed and distance
      targetY = Math.cos(t * 0.15) * 4;
    } else {
      // Mouse tracking for desktop
      targetX = mouseRef.current.x * 8;
      targetY = mouseRef.current.y * 6;
    }

    const anchorX = -8;
    const anchorY = 3.5;

    // Smooth dampening
    ghostGroupRef.current.position.x +=
      (anchorX + targetX - ghostGroupRef.current.position.x) * 0.06;
    ghostGroupRef.current.position.y +=
      (anchorY + targetY - ghostGroupRef.current.position.y) * 0.06;

    // Scale adjustment for mobile
    const baseScale = isMobile ? 0.8 : 1.3;
    ghostGroupRef.current.scale.setScalar(baseScale);

    // Sync Ref for Veil
    ghostPosRef.current.copy(ghostGroupRef.current.position);

    // Track ghost velocity for reactive eyes/particles
    if (lastGhostPosRef.current.lengthSq() === 0) {
      lastGhostPosRef.current.copy(ghostGroupRef.current.position);
    }

    const distanceMoved = ghostGroupRef.current.position
      .clone()
      .sub(lastGhostPosRef.current).length();
    const velocity = delta > 0 ? distanceMoved / delta : 0;
    const clampedVelocity = Math.min(velocity, 40);
    ghostSpeedRef.current = THREE.MathUtils.lerp(
      ghostSpeedRef.current,
      clampedVelocity,
      0.08
    );
    lastGhostPosRef.current.copy(ghostGroupRef.current.position);

    // PROJECT POSITION TO SCREEN FOR MASKING
    // Convert 3D position to Screen Coordinates (0-100%)
    const vector = ghostGroupRef.current.position.clone();
    vector.project(camera);

    // Convert (-1 to 1) to (0% to 100%)
    const screenX = (vector.x * 0.5 + 0.5) * 100;
    const screenY = (1 - (vector.y * 0.5 + 0.5)) * 100;

    // Update CSS variables for DOM text masking
    document.documentElement.style.setProperty('--gx', `${screenX}%`);
    document.documentElement.style.setProperty('--gy', `${screenY}%`);
  });

  return (
    <>
      <AtmosphereVeil ghostPosRef={ghostPosRef} />
      <group ref={ghostGroupRef}>
        <Ghost speedRef={ghostSpeedRef} />
        <Particles count={isMobile ? 80 : 160} speedRef={ghostSpeedRef} />
      </group>
    </>
  );
}

export default function GhostCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine DPR based on device and reduced motion preferences
  const dpr = reducedMotion ? 1 : (isMobile ? [1, 1.25] : [1, 2]);

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 75 }}
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: 'high-performance',
      }}
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.02} color="#020214" />
      <directionalLight
        position={[-8, 6, -4]}
        intensity={1.5}
        color="#4a90e2"
      />
      <directionalLight position={[8, -4, -6]} intensity={2} color="#0057ff" />

      <GhostScene />
      <Fireflies count={48} />

      <EffectComposer>
        <Bloom
          intensity={3.2}
          luminanceThreshold={0.08}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
        <AnalogDecayPass />
        <Vignette offset={0.12} darkness={0.78} />
      </EffectComposer>
    </Canvas>
  );
}

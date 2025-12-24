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
  const { size, camera } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (reducedMotion) return;

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

  useFrame((state) => {
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
      targetX = mouseRef.current.x * 12;
      targetY = mouseRef.current.y * 8;
    }

    // Smooth dampening
    ghostGroupRef.current.position.x +=
      (targetX - ghostGroupRef.current.position.x) * 0.05;
    ghostGroupRef.current.position.y +=
      (targetY - ghostGroupRef.current.position.y) * 0.05;

    // Scale adjustment for mobile
    const baseScale = isMobile ? 0.8 : 1.3;
    ghostGroupRef.current.scale.setScalar(baseScale);

    // Sync Ref for Veil
    ghostPosRef.current.copy(ghostGroupRef.current.position);

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
        <Ghost />
        <Particles count={isMobile ? 30 : 60} />
      </group>
    </>
  );
}

export default function GhostCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      className="absolute inset-0"
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
      <Fireflies count={40} />

      <EffectComposer>
        <Bloom
          intensity={4.0}
          luminanceThreshold={0.15}
          luminanceSmoothing={1.2}
          mipmapBlur
        />
        <AnalogDecayPass />
        <Vignette offset={0.1} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}

'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

import Ghost from './Ghost';
import GhostEyes from './GhostEyes';
import Particles from './Particles';
import AtmosphereVeil from './AtmosphereVeil';
import AnalogDecay from './postprocessing/AnalogDecayPass';

interface GhostCanvasProps {
  active?: boolean;
  onCreated?: () => void;
  ghostRef?: React.RefObject<THREE.Group | null>;
}

function GhostLightFollower({
  ghostRef,
  lightRef,
}: {
  ghostRef: React.RefObject<THREE.Group | null>;
  lightRef: React.RefObject<THREE.PointLight | null>;
}) {
  useFrame(() => {
    if (!lightRef.current || !ghostRef.current) return;
    const target = ghostRef.current.position
      .clone()
      .add(new THREE.Vector3(0, 0, 2.5));
    lightRef.current.position.lerp(target, 0.08);
  });

  return null;
}

export default function GhostCanvas({
  ghostRef: propGhostRef,
}: GhostCanvasProps) {
  const localRef = useRef<THREE.Group>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const ghostRef =
    (propGhostRef as React.RefObject<THREE.Group | null>) || localRef;
  const [dpr, setDpr] = React.useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 20], fov: 40 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 10 }}
    >
      <PerformanceMonitor
        onChange={({ factor }) => setDpr(0.5 + 1.5 * factor)}
      />
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} color="#0a0a2e" />
        <directionalLight
          position={[-8, 6, -4]}
          intensity={2.0}
          color="#66e3ff"
        />
        <directionalLight
          position={[8, -4, -6]}
          intensity={1.5}
          color="#50e3c2"
        />
        <pointLight
          ref={glowLightRef}
          position={[-2, 0, 6]}
          intensity={55}
          distance={140}
          decay={2}
          color="#5fb5ff"
        />
        <GhostLightFollower ghostRef={ghostRef} lightRef={glowLightRef} />

        <AtmosphereVeil ghostRef={ghostRef} />

        <Ghost ref={ghostRef}>
          <GhostEyes />
        </Ghost>

        <Particles count={35} />

        <EffectComposer enableNormalPass={false}>
          <Bloom
            luminanceThreshold={0.3}
            mipmapBlur
            intensity={1.25}
            radius={0.0}
          />
          <Noise opacity={0.15} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <AnalogDecay intensity={0.5} jitter={0.2} scanlines={0.3} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

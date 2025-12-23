'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import { GhostSphere } from './ghost/GhostSphere';
import { AtmosphereVeil } from './AtmosphereVeil';
import { Particles } from './Particles';
import { Fireflies } from './Fireflies';
import { AnalogDecayEffect } from './postprocessing/AnalogDecayPass';
import { GhostParams } from './ghost/GhostParams';

export default function GhostCanvas() {
  const ghostPosRef = useRef(new THREE.Vector3(0, 0, 0));
  const [isGhostMoving, setIsGhostMoving] = useState(false);
  const [movementSpeed, setMovementSpeed] = useState(0);

  const handleMovementUpdate = (moving: boolean, speed: number) => {
    setIsGhostMoving(moving);
    setMovementSpeed(speed);
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
      >
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.08} color="#0a0a2e" />
          <directionalLight
            position={[-8, 6, -4]}
            intensity={GhostParams.rimLightIntensity}
            color="#4a90e2"
          />
          <directionalLight
            position={[8, -4, -6]}
            intensity={GhostParams.rimLightIntensity * 0.7}
            color="#50e3c2"
          />
          {/* Scene Components */}
          <GhostSphere
            positionRef={ghostPosRef}
            onMovementUpdate={handleMovementUpdate}
          />
          <AtmosphereVeil ghostPosition={ghostPosRef} />
          <Particles
            ghostPosition={ghostPosRef}
            isGhostMoving={isGhostMoving}
            movementSpeed={movementSpeed}
          />
          <Fireflies />
          {/* Post Processing */}
          <EffectComposer enableNormalPass={false}>
            <Bloom
              luminanceThreshold={0.0}
              mipmapBlur
              intensity={0.3}
              radius={0.5} // Ajuste fino pode ser necessário aqui
            />
            <AnalogDecayEffect />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

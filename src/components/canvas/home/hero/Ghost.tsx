'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
  ShaderPass,
} from 'three-stdlib';

import { AnalogDecayShader } from '@/components/canvas/shaders/AnalogShader';
import { GHOST_CONFIG } from '@/config/ghostConfig';

import { GhostFireflies } from './GhostFireflies';
import { GhostParticles } from './GhostParticles';
import { GhostBody } from './ghost/GhostBody';
import { GhostEyes3D } from './ghost/GhostEyes3D';
import { useGhostMovement } from './ghost/useGhostMovement';

// Extender para usar no React Three Fiber
extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass });

export function Ghost({
  particleCount: _particleCount = 100,
  ghostRef,
}: {
  particleCount?: number;
  ghostRef?: React.RefObject<THREE.Group | null>;
}) {
  const internalRef = useRef<THREE.Group>(null!);
  const groupRef = ghostRef || internalRef;
  const eyesRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);

  const composerRef = useRef<EffectComposer | null>(null);
  const analogPassRef = useRef<ShaderPass | null>(null);

  const { camera, scene, gl, size } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);

  const prevPositionRef = useRef(new THREE.Vector3());
  const currentMovementRef = useRef(0);

  // Inicializar o compositor de efeitos
  useEffect(() => {
    if (!gl || !scene || !camera) return;

    gl.setClearColor(0x000000, 0);

    const composer = new EffectComposer(gl);
    composer.setSize(size.width, size.height);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.3,
      1.15,
      0.5
    );
    composer.addPass(bloomPass);

    const analogPass = new ShaderPass(AnalogDecayShader);
    analogPass.uniforms.uResolution.value.set(size.width, size.height);
    composer.addPass(analogPass);
    analogPassRef.current = analogPass;

    composerRef.current = composer;
    setIsLoaded(true);

    return () => {
      composer.dispose();
      setIsLoaded(false);
    };
  }, [gl, scene, camera, size]);

  // Hook de movimento e animações
  useGhostMovement({
    groupRef,
    bodyRef,
    eyesRef,
    prevPositionRef,
    currentMovementRef,
    analogPassRef,
  });

  // Loop de renderização final com efeitos
  useFrame(() => {
    if (composerRef.current && isLoaded) {
      composerRef.current.render();
    }
  }, 1);

  return (
    <>
      <GhostFireflies />
      <GhostParticles
        ghostGroup={groupRef}
        movementRef={currentMovementRef}
        count={_particleCount}
      />
      <group ref={groupRef} name="ghost" scale={GHOST_CONFIG.ghostScale}>
        <GhostBody bodyRef={bodyRef} />
        <GhostEyes3D eyesRef={eyesRef} groupRef={groupRef} />
      </group>
    </>
  );
}

export default Ghost;

'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import Ghost from './Ghost';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Scanline,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// ============================================================================
// CONFIGURAÇÃO CRÍTICA: A COR DO FUNDO DEVE SER IDÊNTICA À COR DA MÁSCARA
// ============================================================================
const BACKGROUND_COLOR = '#06071f';

function GhostCssSync({
  ghostRef,
}: {
  ghostRef: React.RefObject<THREE.Group | null>;
}) {
  const { camera, size } = useThree();
  const projectedPosition = useMemo(() => new THREE.Vector3(), []);
  const worldPosition = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const body = document.body;
    if (!body) return;

    const initialRadius = Math.max(size.width, size.height) * 0.18;
    body.style.setProperty('--ghost-x', `${size.width / 2}px`);
    body.style.setProperty('--ghost-y', `${size.height / 2}px`);
    body.style.setProperty('--ghost-radius', `${initialRadius.toFixed(2)}px`);

    return () => {
      body.style.removeProperty('--ghost-x');
      body.style.removeProperty('--ghost-y');
      body.style.removeProperty('--ghost-radius');
    };
  }, [size.height, size.width]);

  useFrame(() =>
    // Atualiza variáveis CSS globais com a posição de tela do Ghost
    {
      if (!ghostRef.current || !document.body) return;

      ghostRef.current.getWorldPosition(worldPosition);
      projectedPosition.copy(worldPosition).project(camera);

      const x = (projectedPosition.x * 0.5 + 0.5) * size.width;
      const y = (-projectedPosition.y * 0.5 + 0.5) * size.height;
      const radius = Math.max(size.width, size.height) * (size.width < 768 ? 0.2 : 0.16);

      document.body.style.setProperty('--ghost-x', `${x.toFixed(2)}px`);
      document.body.style.setProperty('--ghost-y', `${y.toFixed(2)}px`);
      document.body.style.setProperty('--ghost-radius', `${radius.toFixed(2)}px`);

      const planarDistance = worldPosition.length();
      const energy = THREE.MathUtils.clamp(1.4 - planarDistance * 0.12, 0.35, 1.4);
      document.body.style.setProperty('--ghost-energy', energy.toFixed(3));
    }
  );

  return null;
}

export default function GhostCanvas() {
  const dpr: [number, number] = [1, 2];

  const ghostRef = useRef<THREE.Group>(null);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <color attach="background" args={[BACKGROUND_COLOR]} />

      <Suspense fallback={null}>
        <GhostCssSync ghostRef={ghostRef} />
        <AtmosphereVeil />

        {/* Ghost (Z ~ 0) */}
        <Ghost ref={ghostRef} scale={0.22} position={[0, -0.2, 0]} />

        {/* Partículas decorativas */}
        <Particles />
        <Fireflies />

        {/* Post-processing (Ghost Atmosphere Spine) */}
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            luminanceThreshold={0.15}
            mipmapBlur
            intensity={2.8}
            radius={0.4}
          />
          <ChromaticAberration
            offset={[0.0015, 0.0015]}
            radialModulation={true}
            modulationOffset={0.5}
            blendFunction={BlendFunction.SCREEN}
          />
          <Scanline density={1.4} opacity={0.1} />
          <Noise
            opacity={0.08}
            premultiply
            blendFunction={BlendFunction.OVERLAY}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

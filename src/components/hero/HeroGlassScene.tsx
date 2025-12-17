/ HeroGlassScene.tsx
'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  MeshRefractionMaterial,
  useEnvironment,
} from '@react-three/drei';
import { useControls } from 'leva';
import GlassSceneLighting from './GlassSceneLighting';

function GlassObject({
  reduceMotion,
  mouse,
}: {
  reduceMotion: boolean;
  mouse: { x: number; y: number };
}) {
  const group = useRef<THREE.Group>(null);

  const envMap = useEnvironment({ preset: 'city' });

  const config = useControls('Glass', {
    materialType: {
      value: 'transmission',
      options: ['transmission', 'refraction'],
    },

    // transform
    scale: { value: 1.4, min: 0.6, max: 3, step: 0.01 },
    y: { value: 0.7, min: -1.5, max: 2, step: 0.01 },
    spin: { value: 0.25, min: 0, max: 2, step: 0.01 },
    mouseStrength: { value: 0.35, min: 0, max: 1, step: 0.01 },

    // transmission/refraction core
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },

    chromaticAberration: { value: 0.06, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },

    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: '#ffffff',
    color: '#ffffff',

    // refraction specific-ish
    fresnel: { value: 0.15, min: 0, max: 2, step: 0.01 },
    aberrationStrength: { value: 0.02, min: 0, max: 0.2, step: 0.001 },
  });

  useFrame((_, dt) => {
    if (!group.current) return;
    if (!reduceMotion) {
      group.current.rotation.y += dt * config.spin;
    }

    // parallax mouse
    const targetX = mouse.y * config.mouseStrength;
    const targetY = mouse.x * config.mouseStrength;

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.08);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.08);
  });

  const material = useMemo(() => {
    if (config.materialType === 'refraction') {
      return (
        <MeshRefractionMaterial
          envMap={envMap}
          ior={config.ior}
          fresnel={config.fresnel}
          aberrationStrength={config.aberrationStrength}
          color={config.color}
        />
      );
    }

    return (
      <MeshTransmissionMaterial
        transmission={config.transmission}
        roughness={config.roughness}
        thickness={config.thickness}
        ior={config.ior}
        chromaticAberration={config.chromaticAberration}
        anisotropy={config.anisotropy}
        distortion={config.distortion}
        distortionScale={config.distortionScale}
        temporalDistortion={config.temporalDistortion}
        clearcoat={config.clearcoat}
        attenuationDistance={config.attenuationDistance}
        attenuationColor={config.attenuationColor}
        color={config.color}
      />
    );
  }, [config, envMap]);

  return (
    <group ref={group} position={[0, config.y, 0]} scale={config.scale}>
      {/* torus provisório: troque por seu GLTF se quiser */}
      <mesh>
        <torusGeometry args={[1, 0.35, 128, 256]} />
        {material}
      </mesh>
    </group>
  );
}

export default function HeroGlassScene({
  reduceMotion,
  mouse,
}: {
  reduceMotion: boolean;
  mouse: { x: number; y: number };
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <GlassSceneLighting reduceMotion={reduceMotion} />
      <GlassObject reduceMotion={reduceMotion} mouse={mouse} />
    </Canvas>
  );
}

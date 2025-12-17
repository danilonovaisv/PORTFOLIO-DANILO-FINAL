'use client';

import * as React from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { CubeCamera, useGLTF } from '@react-three/drei';
import type { MotionValue } from 'framer-motion';
import { useOrbInteraction } from './hooks/useOrbInteraction';
import GlassRefractionMaterial from './materials/GlassRefractionMaterial';

type Props = {
  modelUrl: string;
  materialVariant?: 'transmission' | 'refraction';
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
};

type ExtractedMesh = {
  geometry: THREE.BufferGeometry;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
};

export default function GlassOrb({
  modelUrl,
  materialVariant = 'transmission',
  mouseX,
  mouseY,
  scrollYProgress,
  reducedMotion,
}: Props) {
  const group = React.useRef<THREE.Group>(null!);
  const meshRef = React.useRef<THREE.Mesh>(null!);
  const materialRef = React.useRef<any>(null);

  const gltf = useGLTF(modelUrl);
  const { viewport } = useThree();

  const extracted = React.useMemo<ExtractedMesh>(() => {
    let found: THREE.Mesh | null = null;
    gltf.scene.traverse((o) => {
      if (!found && (o as any).isMesh) found = o as THREE.Mesh;
    });

    if (!found?.geometry) {
      const fallback = new THREE.TorusGeometry(1, 0.35, 64, 128);
      fallback.computeVertexNormals();
      fallback.computeBoundingSphere();
      return {
        geometry: fallback,
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
      };
    }

    const geometry = found.geometry.clone();
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();

    // Preserve node transform from GLB (important for fidelity)
    const position = found.position?.clone?.() ?? new THREE.Vector3();
    const rotation = found.rotation?.clone?.() ?? new THREE.Euler();
    const scale = found.scale?.clone?.() ?? new THREE.Vector3(1, 1, 1);

    return { geometry, position, rotation, scale };
  }, [gltf.scene]);

  const baseScale = React.useMemo(() => {
    // Responsive scale similar ao tutorial do Olivier (viewport-based)
    const s = viewport.width / 3.6;
    return THREE.MathUtils.clamp(s, 0.72, 1.25);
  }, [viewport.width]);

  const basePosition = React.useMemo(() => {
    // viewport.width (em units) muda conforme camera e tela.
    // Heurística: em mobile, centraliza; em desktop, desloca para a direita.
    const isMobileish = viewport.width < 6;
    return {
      x: isMobileish ? 0 : viewport.width * 0.16,
      y: 0.05,
      z: 0,
    };
  }, [viewport.width]);

  const interaction = useOrbInteraction({ mouseX, mouseY, scrollYProgress });

  useFrame((state, delta) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;

    const rotX = reducedMotion ? 0 : interaction.rotX.get();
    const rotY = reducedMotion ? 0 : interaction.rotY.get();
    const scrollRot = interaction.scrollRot.get();
    const parX = reducedMotion ? 0 : interaction.parallaxX.get();
    const parY = reducedMotion ? 0 : interaction.parallaxY.get();

    // Smooth, "Lo and Behold"-ish motion
    const idleX = reducedMotion ? 0 : Math.sin(t * 0.6) * 0.06;
    const idleY = reducedMotion ? 0 : Math.cos(t * 0.45) * 0.08;
    const spin = reducedMotion ? 0 : t * 0.18;

    const targetRotX = rotX + idleX;
    const targetRotY = rotY + idleY + spin + scrollRot * 0.55;
    const targetRotZ = reducedMotion ? 0 : Math.sin(t * 0.4) * 0.04;

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetRotX,
      7.5,
      delta
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetRotY,
      7.5,
      delta
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      targetRotZ,
      7.5,
      delta
    );

    const targetX = basePosition.x + parX * 0.55;
    const targetY = basePosition.y + parY * 0.4;

    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      targetX,
      7.5,
      delta
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      targetY,
      7.5,
      delta
    );
    group.current.position.z = basePosition.z;

    const scrollScale = interaction.scrollScale.get();
    const targetScale = baseScale * scrollScale;
    const currentScale = group.current.scale.x;
    const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 8, delta);
    group.current.scale.setScalar(nextScale);

    // Subtle scroll-driven material modulation (distortion / chroma)
    if (materialRef.current && materialVariant === 'transmission') {
      const sprog = interaction.scrollYProgress.get();
      const chromaBase = 0.045;
      const distBase = 0.28;

      materialRef.current.chromaticAberration = chromaBase + sprog * 0.03;
      materialRef.current.distortion = distBase + sprog * 0.08;
      materialRef.current.temporalDistortion = reducedMotion ? 0 : 0.12;
    }
  });

  // Render path: Transmission = simple mesh + MeshTransmissionMaterial
  if (materialVariant === 'transmission') {
    return (
      <group ref={group} renderOrder={2}>
        <mesh
          ref={meshRef}
          geometry={extracted.geometry}
          position={extracted.position}
          rotation={extracted.rotation}
          scale={extracted.scale}
        >
          <GlassRefractionMaterial
            ref={materialRef}
            variant="transmission"
            transmission={1}
            thickness={0.42}
            roughness={0.06}
            ior={1.18}
            chromaticAberration={0.045}
            anisotropy={0.15}
            anisotropicBlur={0.12}
            distortion={0.28}
            distortionScale={0.7}
            temporalDistortion={0.12}
            samples={10}
            backside
            transparent
            envMapIntensity={1.1}
            color="#ffffff"
          />
        </mesh>
      </group>
    );
  }

  // Render path: Refraction = CubeCamera + MeshRefractionMaterial
  // (mais caro, mas refração "diamond-like" + aberração)
  return (
    <group ref={group} renderOrder={2}>
      <CubeCamera resolution={256} frames={reducedMotion ? 1 : 60}>
        {(envMap) => (
          <mesh
            ref={meshRef}
            geometry={extracted.geometry}
            position={extracted.position}
            rotation={extracted.rotation}
            scale={extracted.scale}
          >
            <GlassRefractionMaterial
              variant="refraction"
              envMap={envMap}
              ior={2.05}
              fresnel={0.12}
              aberrationStrength={0.012}
              bounces={2}
              color="#ffffff"
              toneMapped
            />
          </mesh>
        )}
      </CubeCamera>
    </group>
  );
}

useGLTF.preload('/media/torus_dan.glb');

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

type GLTFResult = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
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
  const materialRef = React.useRef<any>(null);

  // Load GLTF
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult;
  const { viewport } = useThree();

  // Robust geometry extraction
  const geometry = React.useMemo(() => {
    const candidates = ['Torus', 'torus', 'Mesh_0', 'Mesh001', 'Object_0'];
    for (const key of candidates) {
      if (nodes[key]?.geometry) return nodes[key].geometry;
    }
    // Fallback: finding first mesh
    const firstMesh = Object.values(nodes).find((node) => node.isMesh);
    if (firstMesh?.geometry) return firstMesh.geometry;

    // Fallback: creates a Torus
    const fallback = new THREE.TorusGeometry(1, 0.35, 64, 80);
    return fallback;
  }, [nodes]);

  // Ensure geometry is centered
  React.useLayoutEffect(() => {
    if (geometry) {
      geometry.center();
      geometry.computeVertexNormals();
    }
  }, [geometry]);

  const baseScale = React.useMemo(() => {
    // Increased divisor to match reference scale
    const s = viewport.width / 7.4;
    return THREE.MathUtils.clamp(s, 0.5, 1.2);
  }, [viewport.width]);

  const basePosition = React.useMemo(() => {
    const isMobileish = viewport.width < 10;
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
      8.5,
      delta
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetRotY,
      8.5,
      delta
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      targetRotZ,
      4.5,
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
      const chromaBase = 0.18;
      const distBase = 0.25;

      materialRef.current.chromaticAberration = chromaBase + sprog * 0.03;
      materialRef.current.distortion = distBase + sprog * 0.08;
      materialRef.current.temporalDistortion = reducedMotion ? 0 : 0.2;
    }
  });

  // Responsive samples
  const samples = React.useMemo(() => {
    if (reducedMotion) return 2;
    return viewport.width < 6 ? 4 : 16;
  }, [viewport.width, reducedMotion]);

  if (materialVariant === 'transmission') {
    return (
      <group ref={group} renderOrder={2}>
        <mesh geometry={geometry} castShadow receiveShadow>
          <GlassRefractionMaterial
            ref={materialRef}
            variant="transmission"
            transmission={1}
            thickness={0.65}
            roughness={0.1}
            ior={1.18}
            chromaticAberration={0.18}
            anisotropy={0.2}
            anisotropicBlur={0.12}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={reducedMotion ? 0 : 0.2}
            samples={samples}
            resolution={1024}
            backside
            transparent
            envMapIntensity={1.3}
            color="#ffffff"
            iridescence={0.8}
            iridescenceIOR={1.1}
            iridescenceThicknessRange={[50, 300]}
            attenuationColor="#91c9ff"
            attenuationDistance={0.8}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={group} renderOrder={2}>
      <CubeCamera resolution={1200} frames={reducedMotion ? 1 : 30}>
        {(envMap) => (
          <mesh geometry={geometry}>
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

useGLTF.preload('/models/torus_dan.glb');

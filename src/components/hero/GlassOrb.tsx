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
    // Aggressive scale increase as requested
    const s = viewport.width / 10.2;
    return THREE.MathUtils.clamp(s, 60.5, 80.0);
  }, [viewport.width]);

  const basePosition = React.useMemo(() => {
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

    const rotX = reducedMotion ? 3 : interaction.rotX.get();
    const rotY = reducedMotion ? 3 : interaction.rotY.get();
    const scrollRot = interaction.scrollRot.get();
    const parX = reducedMotion ? 2 : interaction.parallaxX.get();
    const parY = reducedMotion ? 2 : interaction.parallaxY.get();

    // Smooth, "Lo and Behold"-ish motion
    const idleX = reducedMotion ? 2 : Math.sin(t * 0.6) * 0.06;
    const idleY = reducedMotion ? 2 : Math.cos(t * 0.45) * 0.08;
    const spin = reducedMotion ? 2 : t * 0.18;

    const targetRotX = rotX + idleX;
    const targetRotY = rotY + idleY + spin + scrollRot * 0.55;
    const targetRotZ = reducedMotion ? 0 : Math.sin(t * 0.4) * 0.04;

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetRotX,
      10.5,
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
      const chromaBase = 1.18;
      const distBase = 0.25;

      materialRef.current.chromaticAberration = chromaBase + sprog * 0.5;
      materialRef.current.distortion = distBase + sprog * 1;
      materialRef.current.temporalDistortion = reducedMotion ? 0 : 1;
    }
  });

  // Responsive samples
  const samples = React.useMemo(() => {
    if (reducedMotion) return 6;
    return viewport.width < 8 ? 6 : 16;
  }, [viewport.width, reducedMotion]);

  if (materialVariant === 'transmission') {
    return (
      <group ref={group} renderOrder={8}>
        <mesh geometry={geometry} castShadow receiveShadow>
          <GlassRefractionMaterial
            ref={materialRef}
            variant="transmission"
            transmission={1}
            thickness={6.65}
            roughness={0.09}
            ior={2.18}
            chromaticAberration={0.03}
            anisotropy={1.2}
            anisotropicBlur={1.12}
            distortion={2.25}
            distortionScale={0.4}
            temporalDistortion={reducedMotion ? 1 : 0.2}
            samples={samples}
            resolution={1020}
            backside={true}
            transparent={true}
            envMapIntensity={20.3}
            
            color="#ffffff"
            iridescence={0.9}
            iridescenceIOR={0.9}
            iridescenceThicknessRange={[30, 900]}
            attenuationColor="#b8eaff"
            attenuationDistance={2.8}
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
              meshPhysicalMaterial={false}
              transmissionSampler={false}
              envMap={envMap}
              ior={5.05}
              fresnel={1.12}
              aberrationStrength={0.012}
              bounces={1}
              color="#bb78ff"
              toneMapped
            />
          </mesh>
        )}
      </CubeCamera>
    </group>
  );
}

useGLTF.preload('/models/torus_dan.glb');

import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

const Mesh = 'mesh' as any;

const GHOST_URL = 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';
const MESH_ROTATION: [number, number, number] = [-Math.PI / 2, 0, 0];

const GhostModel: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const internalRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  const { nodes, materials } = useGLTF(GHOST_URL) as any;

  const ghostMaterial = useMemo(() => {
    const material = materials.Ghost_White.clone();
    material.color = new THREE.Color('#f6f8ff');
    material.emissive = new THREE.Color('#d9e4ff');
    material.emissiveIntensity = 0.06;
    material.roughness = 0.5;
    material.metalness = 0.02;
    return material;
  }, [materials.Ghost_White]);

  const eyesMaterial = useMemo(() => {
    const material = materials.Eyes.clone();
    material.color = new THREE.Color('#121212');
    material.roughness = 0.32;
    material.metalness = 0.01;
    return material;
  }, [materials.Eyes]);

  const hatMaterial = useMemo(() => {
    const material = materials.Hat_Black.clone();
    material.color = new THREE.Color('#06080d');
    material.roughness = 0.42;
    material.metalness = 0.16;
    material.emissive = new THREE.Color('#040915');
    material.emissiveIntensity = 0.1;
    return material;
  }, [materials.Hat_Black]);

  const rimMaterial = useMemo(() => {
    const material = materials.Rim_Red.clone();
    material.color = new THREE.Color('#ff3246');
    material.emissive = new THREE.Color('#ff2b57');
    material.emissiveIntensity = 0.22;
    material.roughness = 0.36;
    material.metalness = 0.08;
    return material;
  }, [materials.Rim_Red]);

  useEffect(() => {
    return () => {
      ghostMaterial.dispose();
      eyesMaterial.dispose();
      hatMaterial.dispose();
      rimMaterial.dispose();
    };
  }, [eyesMaterial, ghostMaterial, hatMaterial, rimMaterial]);

  useFrame((state) => {
    if (!group.current || !internalRef.current) return;

    const t = state.clock.getElapsedTime();
    const scrollOffset = scroll.offset;

    const floatY = prefersReducedMotion ? 0 : Math.sin(t * 1.18) * 0.055;
    const floatX = prefersReducedMotion ? 0 : Math.cos(t * 0.8) * 0.018;
    const scrollLift = prefersReducedMotion
      ? 0
      : THREE.MathUtils.clamp(scrollOffset * 0.16, 0, 0.16);

    internalRef.current.position.y = THREE.MathUtils.lerp(
      internalRef.current.position.y,
      floatY + scrollLift,
      0.08
    );
    internalRef.current.position.x = THREE.MathUtils.lerp(
      internalRef.current.position.x,
      floatX,
      0.08
    );
    internalRef.current.position.z = THREE.MathUtils.lerp(
      internalRef.current.position.z,
      0,
      0.08
    );
    internalRef.current.rotation.x = 0;
    internalRef.current.rotation.y = 0;
    internalRef.current.rotation.z = 0;

    const targetY = THREE.MathUtils.lerp(-1.0, 3.2, scrollOffset);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.1);

    const horizontalShift = Math.sin(scrollOffset * Math.PI) * 0.5;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, horizontalShift, 0.05);
    group.current.rotation.x = 0;
    group.current.rotation.y = 0;
    group.current.rotation.z = 0;
    state.camera.lookAt(0, group.current.position.y, 0);
  });

  const responsiveScale = Math.min(viewport.width / 4.2, 1.3);

  return (
    <group
      ref={group}
      scale={responsiveScale}
      dispose={null}
    >
      <group ref={internalRef}>
        <Mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_Ghost_White_0.geometry}
          material={ghostMaterial}
          position={[0, 1.558, 0]}
          rotation={MESH_ROTATION}
        />
        <Mesh
          castShadow
          receiveShadow
          geometry={nodes.Eyes_Eyes_0.geometry}
          material={eyesMaterial}
          position={[0, 1.558, 0]}
          rotation={MESH_ROTATION}
        />
        <Mesh
          castShadow
          receiveShadow
          geometry={nodes.Hat_Hat_Black_0.geometry}
          material={hatMaterial}
          position={[0, 2.991, 0]}
          rotation={MESH_ROTATION}
        />
        <Mesh
          castShadow
          receiveShadow
          geometry={nodes.Rim_Rim_Red_0.geometry}
          material={rimMaterial}
          position={[0, 2.354, 0]}
          rotation={MESH_ROTATION}
        />
      </group>
    </group>
  );
};

useGLTF.preload(GHOST_URL);

export default GhostModel;

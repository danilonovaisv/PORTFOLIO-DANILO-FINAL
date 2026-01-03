'use client';

import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';

// ============================================================================
// CONFIGURAÇÃO DO GHOST
// ============================================================================
const GHOST_CONFIG = {
  bodyColor: '#0f2027', // Dark body
  glowColor: '#0080ff', // Blue glow
  emissiveIntensity: 5.8, // High intensity
  ghostOpacity: 0.88,
  floatSpeed: 1.6,
  followSpeed: 0.05,
  wobbleAmount: 0.35,
};

const Ghost = forwardRef<
  Group,
  React.JSX.IntrinsicElements['group'] & { active?: boolean }
>(({ active = true, children, ...props }, ref) => {
  const group = useRef<Group>(null);
  const bodyMesh = useRef<Mesh>(null);
  const bodyMaterial = useRef<MeshStandardMaterial>(null);

  useImperativeHandle(ref, () => group.current as Group);

  const { viewport } = useThree();
  const targetPosition = useRef(new Vector3(0, 0, 0));
  const startTime = useRef<number | null>(null);

  // Geometria orgânica
  const ghostGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const positionAttribute = geometry.getAttribute('position');
    const positions = positionAttribute.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      // Deformar a "cauda" do fantasma
      if (y < -0.2) {
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useFrame((state) => {
    if (!group.current || !bodyMesh.current) return;

    // Se inativo, esconde/reseta
    if (!active) {
      if (bodyMaterial.current) {
        bodyMaterial.current.opacity = 0;
        bodyMaterial.current.emissiveIntensity = 0;
      }
      bodyMesh.current.scale.setScalar(0.98);
      startTime.current = null;
      return;
    }

    if (startTime.current === null) {
      startTime.current = state.clock.getElapsedTime();
    }

    const t = state.clock.getElapsedTime() - startTime.current;

    // Timeline de Animação (Entrance)
    let currentOpacity = 0;
    let currentScale = 0.98;
    let currentEmissive = 0;

    if (t < 0.8) {
      currentOpacity = 0;
    } else if (t < 2.0) {
      const progress = (t - 0.8) / 1.2;
      currentOpacity = THREE.MathUtils.lerp(0, 0.35, progress);
      currentScale = THREE.MathUtils.lerp(0.98, 1.0, progress);
      currentEmissive = THREE.MathUtils.lerp(
        0,
        GHOST_CONFIG.emissiveIntensity * 0.4,
        progress
      );
    } else if (t < 3.4) {
      const progress = (t - 2.0) / 1.4;
      currentOpacity = THREE.MathUtils.lerp(
        0.35,
        GHOST_CONFIG.ghostOpacity * 0.85,
        progress
      );
      currentScale = 1.0;
      currentEmissive = THREE.MathUtils.lerp(
        GHOST_CONFIG.emissiveIntensity * 0.4,
        GHOST_CONFIG.emissiveIntensity * 0.7,
        progress
      );
    } else {
      // Estado final estável
      currentOpacity = GHOST_CONFIG.ghostOpacity;
      currentScale = 1.0;

      // Pulso de respiração (Breathe)
      const pulse = Math.sin(t * 1.6) * 0.6;
      const breathe = Math.sin(t * 0.6) * 0.12;
      currentEmissive = GHOST_CONFIG.emissiveIntensity + pulse + breathe;
    }

    if (bodyMaterial.current) {
      bodyMaterial.current.opacity = currentOpacity;
      bodyMaterial.current.emissiveIntensity = currentEmissive;
      bodyMaterial.current.color.set(GHOST_CONFIG.bodyColor);
      bodyMaterial.current.emissive.set(GHOST_CONFIG.glowColor);
    }

    bodyMesh.current.scale.setScalar(currentScale);

    // Movimento
    const movementInfluence = THREE.MathUtils.clamp((t - 2.0) / 2.0, 0, 1);
    const pointer = state.pointer;

    // Interativo no desktop
    const xTarget = pointer.x * (viewport.width / 3);
    const yTarget = pointer.y * (viewport.height / 3);

    targetPosition.current.set(xTarget, yTarget, 0);
    group.current.position.lerp(
      targetPosition.current,
      GHOST_CONFIG.followSpeed * movementInfluence
    );

    // Float e Wobble
    const floatY =
      Math.sin(t * GHOST_CONFIG.floatSpeed) * 0.2 * movementInfluence;
    bodyMesh.current.position.y = floatY;

    const moveX = targetPosition.current.x - group.current.position.x;
    const tiltStrength = 0.1 * GHOST_CONFIG.wobbleAmount;

    bodyMesh.current.rotation.z = -moveX * tiltStrength * movementInfluence;
    bodyMesh.current.rotation.y =
      Math.sin(t * 1.4) * 0.05 * GHOST_CONFIG.wobbleAmount * movementInfluence;
  });

  return (
    <group ref={group} {...props}>
      {/* Rim Lights */}
      <directionalLight
        position={[-8, 6, -4]}
        intensity={1.8}
        color="#4a90e2"
      />
      <directionalLight
        position={[8, -4, -6]}
        intensity={1.26}
        color="#50e3c2"
      />

      <mesh ref={bodyMesh} geometry={ghostGeometry}>
        <meshStandardMaterial
          ref={bodyMaterial}
          transparent
          roughness={0.02}
          metalness={0.0}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
        {/* Render children inside mesh to follow rotation */}
        {children}
      </mesh>
    </group>
  );
});

Ghost.displayName = 'Ghost';
export default Ghost;

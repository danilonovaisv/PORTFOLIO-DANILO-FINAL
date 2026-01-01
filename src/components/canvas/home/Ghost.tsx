'use client';

import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';

const GHOST_CONFIG = {
  bodyColor: '#e0f7fa',
  glowColor: '#00ffff',
  eyeColor: '#ffffff',
  emissiveIntensity: 3.5,
  floatSpeed: 1.8,
  followSpeed: 0.08,
};

const Ghost = forwardRef<Group, any>((props, ref) => {
  const group = useRef<Group>(null);
  const bodyMesh = useRef<Mesh>(null);
  const bodyMaterial = useRef<MeshStandardMaterial>(null);
  const leftEyeMat = useRef<any>(null);
  const rightEyeMat = useRef<any>(null);

  // Expõe a ref corretamente para o RevealText funcionar
  useImperativeHandle(ref, () => group.current as Group);

  const { viewport, size } = useThree();
  const prevPosition = useRef(new Vector3(0, 0, 0));
  const targetPosition = useRef(new Vector3(0, 0, 0));

  const ghostGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const positionAttribute = geometry.getAttribute('position');
    const positions = positionAttribute.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
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

    const t = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // Detecção Mobile simples
    const isMobile = size.width < 768;

    let xTarget, yTarget;

    if (isMobile) {
      // Movimento automático Mobile (Loop amplo)
      xTarget = Math.sin(t * 0.6) * (viewport.width * 0.35);
      yTarget = Math.cos(t * 0.9) * 0.6;
    } else {
      // Movimento Desktop (Mouse)
      xTarget = pointer.x * (viewport.width / 3.5);
      yTarget = pointer.y * (viewport.height / 3.5);
    }

    targetPosition.current.set(xTarget, yTarget, 0);
    group.current.position.lerp(
      targetPosition.current,
      GHOST_CONFIG.followSpeed
    );

    const currentDist = group.current.position.distanceTo(prevPosition.current);
    prevPosition.current.copy(group.current.position);
    const isMoving = currentDist > (isMobile ? 0.0 : 0.005);
    const targetEyeOpacity = isMoving ? 1 : 0.3;

    if (leftEyeMat.current && rightEyeMat.current) {
      leftEyeMat.current.opacity +=
        (targetEyeOpacity - leftEyeMat.current.opacity) * 0.1;
      rightEyeMat.current.opacity = leftEyeMat.current.opacity;
    }

    if (bodyMaterial.current) {
      const pulse = Math.sin(t * 2.5) * 0.3;
      bodyMaterial.current.emissiveIntensity =
        GHOST_CONFIG.emissiveIntensity + pulse;
    }

    const floatY = Math.sin(t * GHOST_CONFIG.floatSpeed) * 0.2;
    bodyMesh.current.position.y = floatY;

    const moveX = targetPosition.current.x - group.current.position.x;
    bodyMesh.current.rotation.z = -moveX * 0.15;
    bodyMesh.current.rotation.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={group} {...props}>
      <directionalLight position={[-8, 6, -4]} intensity={3} color="#00ffff" />
      <directionalLight position={[8, -4, -6]} intensity={3} color="#d400ff" />

      <mesh ref={bodyMesh} geometry={ghostGeometry}>
        <meshStandardMaterial
          ref={bodyMaterial}
          color={GHOST_CONFIG.bodyColor}
          emissive={GHOST_CONFIG.glowColor}
          emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
          transparent
          opacity={0.92}
          roughness={0.0}
          metalness={0.1}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
        <group position={[0, 0, 0]}>
          <group position={[-0.7, 0.6, 1.8]} rotation={[0, -0.2, 0]}>
            <mesh position={[0, 0, -0.1]}>
              <sphereGeometry args={[0.45, 16, 16]} />
              <meshBasicMaterial color="black" />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial
                ref={leftEyeMat}
                color={GHOST_CONFIG.eyeColor}
                transparent
                opacity={0.3}
                toneMapped={false}
              />
            </mesh>
          </group>
          <group position={[0.7, 0.6, 1.8]} rotation={[0, 0.2, 0]}>
            <mesh position={[0, 0, -0.1]}>
              <sphereGeometry args={[0.45, 16, 16]} />
              <meshBasicMaterial color="black" />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial
                ref={rightEyeMat}
                color={GHOST_CONFIG.eyeColor}
                transparent
                opacity={0.3}
                toneMapped={false}
              />
            </mesh>
          </group>
        </group>
      </mesh>
    </group>
  );
});

Ghost.displayName = 'Ghost';
export default Ghost;

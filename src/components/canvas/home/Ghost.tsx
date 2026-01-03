'use client';

import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';

// ============================================================================
// CONFIGURAÇÃO DO GHOST
// ============================================================================
const GHOST_CONFIG = {
  bodyColor: '#e0f7fa',
  glowColor: '#00ffff',
  eyeColor: '#ffffff',
  emissiveIntensity: 3.5,
  floatSpeed: 1.8,
  followSpeed: 0.08,
};

// ============================================================================
// Ghost Component (forwardRef para expor posição ao RevealingText)
// ============================================================================
const Ghost = forwardRef<
  Group,
  React.JSX.IntrinsicElements['group'] & { active?: boolean }
>(({ active = true, ...props }, ref) => {
  const group = useRef<Group>(null);
  const bodyMesh = useRef<Mesh>(null);
  const bodyMaterial = useRef<MeshStandardMaterial>(null);
  const leftEyeMat = useRef<THREE.MeshBasicMaterial>(null);
  const rightEyeMat = useRef<THREE.MeshBasicMaterial>(null);

  // Expor o group.current via ref
  useImperativeHandle(ref, () => group.current as Group);

  const { viewport, size } = useThree();
  const prevPosition = useRef(new Vector3(0, 0, 0));
  const targetPosition = useRef(new Vector3(0, 0, 0));
  const startTime = useRef<number | null>(null);

  // Geometria do Ghost (modificada para ficar orgânica na base)
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

    if (!active) {
      if (bodyMaterial.current) {
        bodyMaterial.current.opacity = 0;
        bodyMaterial.current.emissiveIntensity = 0;
      }
      if (bodyMesh.current) bodyMesh.current.scale.setScalar(0.98);
      // Reset start time so it's fresh when active becomes true
      startTime.current = null;
      return;
    }

    // Set start time on first active frame
    if (startTime.current === null) {
      startTime.current = state.clock.getElapsedTime();
    }

    const t = state.clock.getElapsedTime() - startTime.current;

    // ======================================================================
    // TIMELINE DE ANIMAÇÃO CANÔNICA (PROMPT HERO GHOST)
    // ======================================================================
    // 0ms   -> 800ms  : Invisible
    // 800ms -> 2000ms : Phantom (Opacity 0 -> 0.35, Scale 0.98 -> 1.0)
    // 2000ms-> 3400ms : Presence (Opacity 0.35 -> 0.75)
    // 3400ms-> 4200ms : Anchor (Opacity 0.75 -> 1.0)
    // > 4200ms        : Idle State
    // ======================================================================

    let currentOpacity = 0;
    let currentScale = 0.98;
    let currentEmissive = 0;

    // Fases de entrada
    if (t < 0.8) {
      // Invisible
      currentOpacity = 0;
      currentScale = 0.98;
      currentEmissive = 0;
    } else if (t < 2.0) {
      // Phantom Phase (800ms -> 2000ms)
      const progress = (t - 0.8) / 1.2; // 0 to 1
      currentOpacity = THREE.MathUtils.lerp(0, 0.35, progress);
      currentScale = THREE.MathUtils.lerp(0.98, 1.0, progress);
      currentEmissive = THREE.MathUtils.lerp(
        0,
        GHOST_CONFIG.emissiveIntensity * 0.4,
        progress
      );
    } else if (t < 3.4) {
      // Presence Phase (2000ms -> 3400ms)
      const progress = (t - 2.0) / 1.4;
      currentOpacity = THREE.MathUtils.lerp(0.35, 0.75, progress);
      currentScale = 1.0;
      currentEmissive = THREE.MathUtils.lerp(
        GHOST_CONFIG.emissiveIntensity * 0.4,
        GHOST_CONFIG.emissiveIntensity * 0.7,
        progress
      );
    } else if (t < 4.2) {
      // Anchor Phase (3400ms -> 4200ms)
      const progress = (t - 3.4) / 0.8;
      currentOpacity = THREE.MathUtils.lerp(0.75, 0.92, progress);
      currentScale = 1.0;
      currentEmissive = THREE.MathUtils.lerp(
        GHOST_CONFIG.emissiveIntensity * 0.7,
        GHOST_CONFIG.emissiveIntensity,
        progress
      );
    } else {
      // Fully Present
      currentOpacity = 0.92;
      currentScale = 1.0;

      // Idle Glow Oscillation (Duration 4-6s)
      const idleTime = t - 4.2;
      const glowSine = Math.sin(idleTime * 1.5) * 0.5 + 0.5; // 0..1
      currentEmissive = THREE.MathUtils.lerp(
        GHOST_CONFIG.emissiveIntensity * 0.8,
        GHOST_CONFIG.emissiveIntensity * 1.1,
        glowSine
      );
    }

    // Aplicar transformações
    if (bodyMaterial.current) {
      bodyMaterial.current.opacity = currentOpacity;
      bodyMaterial.current.emissiveIntensity = currentEmissive;
      // Simulate focus with roughness?
      // bodyMaterial.current.roughness = THREE.MathUtils.lerp(0.6, 0.0, Math.min(Math.max((t - 0.8) / 3.4, 0), 1));
    }

    bodyMesh.current.scale.setScalar(currentScale);

    // Movimento (Idle e Mouse Follow) só começa suavemente após a fase Phantom
    const movementInfluence = THREE.MathUtils.clamp((t - 2.0) / 2.0, 0, 1);

    const pointer = state.pointer;
    const { width } = size;
    const isMobile = width < 768;

    let xTarget: number;
    let yTarget: number;

    if (isMobile) {
      const amplitude = viewport.width * 0.4;
      xTarget = Math.sin(t * 0.5) * amplitude;
      yTarget = Math.sin(t * 0.8) * 0.5;
    } else {
      xTarget = pointer.x * (viewport.width / 3.5);
      yTarget = pointer.y * (viewport.height / 3.5);
    }

    // Aplicar movimento com influência controlada
    targetPosition.current.set(xTarget, yTarget, 0);
    group.current.position.lerp(
      targetPosition.current,
      GHOST_CONFIG.followSpeed * movementInfluence
    );

    // Idle vertical float
    const floatY =
      Math.sin(t * GHOST_CONFIG.floatSpeed) * 0.2 * movementInfluence;
    bodyMesh.current.position.y = floatY;

    // Olhos e Rotação
    const moveX = targetPosition.current.x - group.current.position.x;
    bodyMesh.current.rotation.z = -moveX * 0.15 * movementInfluence;
    bodyMesh.current.rotation.y = Math.sin(t * 0.5) * 0.1 * movementInfluence;

    // Olhos flicker/opacity
    if (leftEyeMat.current && rightEyeMat.current) {
      const eyeBaseOpacity = movementInfluence * 0.8; // Olhos só aparecem quando fantasma se revela
      leftEyeMat.current.opacity = eyeBaseOpacity;
      rightEyeMat.current.opacity = eyeBaseOpacity;
    }
  });

  return (
    <group ref={group} {...props}>
      {/* Iluminação direcional que acompanha o Ghost */}
      <directionalLight position={[-8, 6, -4]} intensity={3} color="#00ffff" />
      <directionalLight position={[8, -4, -6]} intensity={3} color="#d400ff" />

      {/* Corpo do Ghost */}
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

        {/* Olhos do Ghost */}
        <group position={[0, 0, 0]}>
          {/* Olho esquerdo */}
          <group position={[-0.7, 0.6, 1.8]} rotation={[0, -0.2, 0]}>
            {/* Socket (fundo preto) */}
            <mesh position={[0, 0, -0.1]}>
              <sphereGeometry args={[0.45, 16, 16]} />
              <meshBasicMaterial color="black" />
            </mesh>
            {/* Brilho do olho */}
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

          {/* Olho direito */}
          <group position={[0.7, 0.6, 1.8]} rotation={[0, 0.2, 0]}>
            {/* Socket (fundo preto) */}
            <mesh position={[0, 0, -0.1]}>
              <sphereGeometry args={[0.45, 16, 16]} />
              <meshBasicMaterial color="black" />
            </mesh>
            {/* Brilho do olho */}
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

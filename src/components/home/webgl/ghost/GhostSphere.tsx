'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GhostParams } from './GhostParams';
import { Eyes } from '../Eyes';

interface GhostSphereProps {
  positionRef: React.MutableRefObject<THREE.Vector3>;
  onMovementUpdate: (_isMoving: boolean, _speed: number) => void;
}

export function GhostSphere({
  positionRef,
  onMovementUpdate,
}: GhostSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();

  // Estado para controle de brilho dos olhos
  const [eyeOpacity, setEyeOpacity] = useState(0);
  const currentMovementRef = useRef(0);

  // Criar geometria deformada uma única vez
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 40, 40);
    const positions = geo.attributes.position.array;

    // Aplicar deformação "wavy" na parte inferior
    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        positions[i + 1] = -2.0 + (noise1 + noise2 + noise3);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, _delta) => {
    if (!groupRef.current || !meshRef.current) return;

    const time = state.clock.elapsedTime;

    // --- Movimento (Mouse Follow) ---
    // Converter pointer (-1 a 1) para coordenadas do mundo baseadas no viewport
    // Ajuste os multiplicadores (11 e 7 no original) conforme o tamanho do seu viewport
    const targetX = pointer.x * (viewport.width / 2) * 0.8;
    const targetY = pointer.y * (viewport.height / 2) * 0.8;

    const prevPos = groupRef.current.position.clone();

    // Lerp suave para posição do mouse
    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * GhostParams.followSpeed;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * GhostParams.followSpeed;

    // Atualizar ref global para outros componentes (atmosfera, partículas)
    positionRef.current.copy(groupRef.current.position);

    // --- Flutuação ---
    const float1 = Math.sin(time * GhostParams.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(time * GhostParams.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(time * GhostParams.floatSpeed * 2.3) * 0.008;
    groupRef.current.position.y += float1 + float2 + float3;

    // --- Rotação e Tilt ---
    const mouseDirection = new THREE.Vector2(
      targetX - groupRef.current.position.x,
      targetY - groupRef.current.position.y
    ).normalize();

    const tiltStrength = 0.1 * GhostParams.wobbleAmount;
    const tiltDecay = 0.95;

    meshRef.current.rotation.z =
      meshRef.current.rotation.z * tiltDecay +
      -mouseDirection.x * tiltStrength * (1 - tiltDecay);
    meshRef.current.rotation.x =
      meshRef.current.rotation.x * tiltDecay +
      mouseDirection.y * tiltStrength * (1 - tiltDecay);
    meshRef.current.rotation.y =
      Math.sin(time * 1.4) * 0.05 * GhostParams.wobbleAmount;

    // --- Escala (Respiração) ---
    const pulse1 =
      Math.sin(time * GhostParams.pulseSpeed) * GhostParams.pulseIntensity;
    const scaleVariation =
      1 +
      Math.sin(time * 2.1) * 0.025 * GhostParams.wobbleAmount +
      pulse1 * 0.015;
    const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
    const finalScale = scaleVariation * scaleBreath;
    meshRef.current.scale.set(finalScale, finalScale, finalScale);

    // --- Material Pulsing ---
    const breathe = Math.sin(time * 0.6) * 0.12;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = GhostParams.emissiveIntensity + pulse1 + breathe;

    // --- Eye Logic ---
    const movementAmount = prevPos.distanceTo(groupRef.current.position);
    currentMovementRef.current =
      currentMovementRef.current * GhostParams.eyeGlowDecay +
      movementAmount * (1 - GhostParams.eyeGlowDecay);

    const isMoving = currentMovementRef.current > GhostParams.movementThreshold;
    const targetGlow = isMoving ? 1.0 : 0.0;
    const glowChangeSpeed = isMoving
      ? GhostParams.eyeGlowResponse * 2
      : GhostParams.eyeGlowResponse;

    setEyeOpacity((prev) => prev + (targetGlow - prev) * glowChangeSpeed);

    // Notificar pai sobre movimento para partículas
    onMovementUpdate(isMoving, movementAmount * 100); // Scale up movement for logic
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={GhostParams.bodyColor}
          transparent
          opacity={GhostParams.ghostOpacity}
          emissive={GhostParams.glowColor}
          emissiveIntensity={GhostParams.emissiveIntensity}
          roughness={0.02}
          metalness={0.0}
          side={THREE.DoubleSide}
          alphaTest={0.1}
        />
      </mesh>
      <Eyes eyeOpacity={eyeOpacity} />
    </group>
  );
}

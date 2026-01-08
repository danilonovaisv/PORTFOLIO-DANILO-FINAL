// src/components/canvas/Ghost.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG, resolveFluorescentColor } from '@/config/ghostConfig';

// Configurações de escala do mouse (CodePen multipliers)
export const GHOST_SCREEN_MULTIPLIER = { x: 11, y: 7 };

const Ghost = ({ mousePosition }: { mousePosition: [number, number] }) => {
  const group = useRef<THREE.Group>(null!);
  const ghostBody = useRef<THREE.Mesh>(null!);
  const leftEye = useRef<THREE.Mesh>(null!);
  const rightEye = useRef<THREE.Mesh>(null!);
  const leftGlow = useRef<THREE.Mesh>(null!);
  const rightGlow = useRef<THREE.Mesh>(null!);

  // Parâmetros ajustáveis com base na configuração
  const params = useMemo(
    () => ({
      followSpeed: GHOST_CONFIG.followSpeed,
      wobbleAmount: GHOST_CONFIG.wobbleAmount,
      floatSpeed: GHOST_CONFIG.floatSpeed,
      emissiveIntensity: GHOST_CONFIG.emissiveIntensity,
      pulseSpeed: GHOST_CONFIG.pulseSpeed,
      pulseIntensity: GHOST_CONFIG.pulseIntensity,
      eyeGlowIntensity: GHOST_CONFIG.eyeGlowIntensity,
      eyeGlowDecay: GHOST_CONFIG.eyeGlowDecay,
      eyeGlowResponse: GHOST_CONFIG.eyeGlowResponse,
      movementThreshold: GHOST_CONFIG.movementThreshold,
      baseColor: new THREE.Color(
        resolveFluorescentColor(GHOST_CONFIG.bodyColor)
      ),
      glowColor: new THREE.Color(
        resolveFluorescentColor(GHOST_CONFIG.glowColor)
      ),
      eyeGlowColor: new THREE.Color(
        resolveFluorescentColor(GHOST_CONFIG.eyeGlowColor)
      ),
    }),
    []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (
      !group.current ||
      !ghostBody.current ||
      !leftEye.current ||
      !rightEye.current
    )
      return;

    const [mouseX, mouseY] = mousePosition;
    const targetX = mouseX * GHOST_SCREEN_MULTIPLIER.x;
    const targetY = mouseY * GHOST_SCREEN_MULTIPLIER.y;

    // Movimento suave do grupo
    group.current.position.x +=
      (targetX - group.current.position.x) * params.followSpeed;
    group.current.position.y +=
      (targetY - group.current.position.y) * params.followSpeed;

    // Animação de flutuação (baseada no CodePen)
    const float1 = Math.sin(time * params.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(time * params.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(time * params.floatSpeed * 2.3) * 0.008;
    group.current.position.y += float1 + float2 + float3;

    // Pulsos e respiração no brilho (baseado no CodePen)
    const pulse1 = Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
    const pulse2 =
      Math.cos(time * params.pulseSpeed * 1.4) * params.pulseIntensity * 0.6; // Adicionado segundo pulso
    const breathe = Math.sin(time * 0.6) * 0.12;
    const currentEmissiveIntensity =
      params.emissiveIntensity + pulse1 + pulse2 + breathe;
    (
      ghostBody.current.material as THREE.MeshStandardMaterial
    ).emissiveIntensity = currentEmissiveIntensity;

    // Animações do corpo (baseado no CodePen)
    const mouseDirection = new THREE.Vector2(
      targetX - group.current.position.x,
      targetY - group.current.position.y
    ).normalize();
    const tiltStrength = 0.1 * GHOST_CONFIG.wobbleAmount; // Usando o valor do config
    const tiltDecay = 0.95; // Valor fixo do CodePen
    ghostBody.current.rotation.z =
      ghostBody.current.rotation.z * tiltDecay +
      -mouseDirection.x * tiltStrength * (1 - tiltDecay);
    ghostBody.current.rotation.x =
      ghostBody.current.rotation.x * tiltDecay +
      mouseDirection.y * tiltStrength * (1 - tiltDecay);
    ghostBody.current.rotation.y =
      Math.sin(time * 1.4) * 0.05 * GHOST_CONFIG.wobbleAmount; // Usando o valor do config

    // Variação de escala (baseado no CodePen)
    const scaleVariation =
      1 +
      Math.sin(time * 2.1) * 0.025 * GHOST_CONFIG.wobbleAmount +
      pulse1 * 0.015; // Usando o valor do config
    const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
    const finalScale = scaleVariation * scaleBreath;
    ghostBody.current.scale.set(finalScale, finalScale, finalScale);

    // Animação dos olhos (baseado no CodePen)
    // Simulando a lógica de `currentMovement` e `isMouseMoving` simplificadamente
    const normalizedMouseSpeed =
      Math.sqrt((mouseX * 10) ** 2 + (mouseY * 10) ** 2) * 0.1; // Aproximação
    const isMoving = normalizedMouseSpeed > params.movementThreshold;
    const targetGlow = isMoving ? 1.0 : 0.0;
    const glowChangeSpeed = isMoving
      ? params.eyeGlowResponse * 2 // Usando o valor do config
      : params.eyeGlowResponse; // Usando o valor do config

    if (leftEye.current.material && rightEye.current.material) {
      const leftMat = leftEye.current.material as THREE.MeshBasicMaterial;
      const rightMat = rightEye.current.material as THREE.MeshBasicMaterial;
      const leftGlowMat = leftGlow.current.material as THREE.MeshBasicMaterial;
      const rightGlowMat = rightGlow.current
        .material as THREE.MeshBasicMaterial;

      // Gradual change (baseado no CodePen)
      const newOpacity =
        leftMat.opacity + (targetGlow - leftMat.opacity) * glowChangeSpeed;
      leftMat.opacity = newOpacity;
      rightMat.opacity = newOpacity; // Igual ao esquerdo
      leftGlowMat.opacity = newOpacity * 0.3;
      rightGlowMat.opacity = newOpacity * 0.3;
    }
  });

  // Geometria do Ghost (baseada no CodePen)
  const ghostGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 40, 40); // Valores do CodePen
    const positions = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1];
      if (y < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Material do Ghost (baseado no CodePen)
  const ghostMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: params.baseColor,
      transparent: true,
      opacity: GHOST_CONFIG.ghostOpacity,
      emissive: params.glowColor,
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02, // Valor do CodePen
      metalness: 0.0, // Valor do CodePen
      side: THREE.DoubleSide, // Valor do CodePen
      alphaTest: 0.1, // Valor do CodePen
    });
  }, [params.baseColor, params.glowColor, params.emissiveIntensity]);

  return (
    <group ref={group} scale={GHOST_CONFIG.ghostScale}>
      {' '}
      {/* Aplica a escala global do config */}
      {/* Corpo do Ghost */}
      <mesh ref={ghostBody} geometry={ghostGeometry} material={ghostMaterial} />
      {/* Grupo dos Olhos */}
      <group>
        {/* Olhos - Sockets pretos */}
        <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color={0x000000} />
        </mesh>
        <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color={0x000000} />
        </mesh>

        {/* Olhos - Brilho Interno */}
        <mesh ref={leftEye} position={[-0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />{' '}
          {/* Tamanho aumentado em 50% do CodePen */}
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh ref={rightEye} position={[0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />{' '}
          {/* Tamanho aumentado em 50% do CodePen */}
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
          />
        </mesh>

        {/* Olhos - Brilho Externo */}
        <mesh ref={leftGlow} position={[-0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} />{' '}
          {/* Tamanho aumentado em 50% do CodePen */}
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh ref={rightGlow} position={[0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} />{' '}
          {/* Tamanho aumentado em 50% do CodePen */}
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Ghost;

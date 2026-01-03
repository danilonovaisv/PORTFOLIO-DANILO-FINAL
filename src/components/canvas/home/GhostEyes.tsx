'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Configuração dos olhos (CodePen)
const EYE_PARAMS = {
  socketColor: '#000000',
  eyeGlowColor: '#8a2be2', // Violet (CodePen standard)
  eyeGlowDecay: 0.95,
  eyeGlowResponse: 0.31,
};

export default function GhostEyes() {
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const leftOuterGlow = useRef<THREE.Mesh>(null);
  const rightOuterGlow = useRef<THREE.Mesh>(null);

  const { mouse } = useThree();
  const [blink, setBlink] = useState(false);

  // Estado de movimento para o brilho dinâmico
  const prevMouse = useRef(new THREE.Vector2());
  const mouseSpeed = useRef(new THREE.Vector2());
  const currentEyeOpacity = useRef(0);

  // Lógica de piscar aleatório
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const timeout = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      timer = setTimeout(timeout, nextBlink);
    };
    timer = setTimeout(timeout, 3000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((_state) => {
    if (!leftEye.current || !rightEye.current) return;

    // 1. Calcular velocidade do mouse para o brilho (Glow Response)
    // CodePen: normalizedMouseSpeed * 8
    mouseSpeed.current.set(
      mouse.x - prevMouse.current.x,
      mouse.y - prevMouse.current.y
    );
    prevMouse.current.copy(mouse);

    const speed = mouseSpeed.current.length() * 8;
    const targetGlow = speed > 0.05 ? 1.0 : 0.0;

    // Lerp opacity
    const glowChangeSpeed =
      speed > 0.05
        ? EYE_PARAMS.eyeGlowResponse * 2
        : EYE_PARAMS.eyeGlowResponse;

    currentEyeOpacity.current +=
      (targetGlow - currentEyeOpacity.current) * glowChangeSpeed;

    // Aplicar opacidade aos materiais (precisa ser MeshBasicMaterial)
    if (leftEye.current.material instanceof THREE.MeshBasicMaterial) {
      // Base glow + dynamic glow
      const baseOpacity = 0.8; // Increased for visibility
      const finalOpacity = baseOpacity + currentEyeOpacity.current * 0.4;

      leftEye.current.material.opacity = finalOpacity;
      rightEye.current.material.opacity = finalOpacity;

      if (leftOuterGlow.current && rightOuterGlow.current) {
        (leftOuterGlow.current.material as THREE.MeshBasicMaterial).opacity =
          finalOpacity * 0.3;
        (rightOuterGlow.current.material as THREE.MeshBasicMaterial).opacity =
          finalOpacity * 0.3;
      }
    }

    // 2. Movimento dos olhos (Look At)
    const eyeMovementRange = 0.12;
    const targetX = mouse.x * eyeMovementRange;
    const targetY = mouse.y * eyeMovementRange;

    // Posições base relativas ao grupo dos olhos
    const leftBase = new THREE.Vector3(-0.7, 0.6, 2.0);
    const rightBase = new THREE.Vector3(0.7, 0.6, 2.0);

    // Como estamos dentro do Ghost (que já move), o movimento dos olhos deve ser sutil e local.
    // Ajustado para escala do React Three Fiber (Ghost é scale 0.22 no Canvas, mas aqui é local space)
    // O CodePen usa geometria Sphere(2), aqui usamos geometria relativa no <Ghost>.
    // No CodePen, eyesGroup é added to GhostGroup.

    // No R3F, GhostEyes é children de Ghost.
    // Vamos usar posições locais compatíveis com a geometria do Ghost.
    // Ghost R3F radius ~2.

    // Sockets positions (CodePen): -0.7, 0.6, 1.9 relative to center.
    // Eyes: -0.7, 0.6, 2.0.

    // Interpolação suave de posição
    const lerpFactor = 0.1;

    leftEye.current.position.x = THREE.MathUtils.lerp(
      leftEye.current.position.x,
      leftBase.x + targetX * 3,
      lerpFactor
    );
    leftEye.current.position.y = THREE.MathUtils.lerp(
      leftEye.current.position.y,
      leftBase.y + targetY * 3,
      lerpFactor
    );

    rightEye.current.position.x = THREE.MathUtils.lerp(
      rightEye.current.position.x,
      rightBase.x + targetX * 3,
      lerpFactor
    );
    rightEye.current.position.y = THREE.MathUtils.lerp(
      rightEye.current.position.y,
      rightBase.y + targetY * 3,
      lerpFactor
    );

    // Piscar (Scale Y)
    const targetScaleY = blink ? 0.05 : 1;
    leftEye.current.scale.y = THREE.MathUtils.lerp(
      leftEye.current.scale.y,
      targetScaleY,
      0.4
    );
    rightEye.current.scale.y = THREE.MathUtils.lerp(
      rightEye.current.scale.y,
      targetScaleY,
      0.4
    );
  });

  return (
    <group>
      {/* Sockets (Buracos escuros) */}
      <mesh position={[-0.7, 0.6, 2.1]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.7, 0.6, 2.1]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Eyes (Brilho principal) */}
      <mesh ref={leftEye} position={[-0.7, 0.6, 2.25]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial
          color={EYE_PARAMS.eyeGlowColor}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh ref={rightEye} position={[0.7, 0.6, 2.25]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial
          color={EYE_PARAMS.eyeGlowColor}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Outer Glow (Halo suave - Backside) */}
      <mesh ref={leftOuterGlow} position={[-0.7, 0.6, 2.2]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial
          color={EYE_PARAMS.eyeGlowColor}
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh ref={rightOuterGlow} position={[0.7, 0.6, 2.2]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial
          color={EYE_PARAMS.eyeGlowColor}
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

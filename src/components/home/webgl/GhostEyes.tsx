'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function GhostEyes() {
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Estado para piscar
  const [blink, setBlink] = useState(false);

  // Lógica de piscar aleatório
  useEffect(() => {
    const timeout = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150); // Olhos fechados por 150ms

      // Próximo piscar entre 2s e 6s
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(timeout, nextBlink);
    };

    const timer = setTimeout(timeout, 3000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((_state) => {
    if (!leftEye.current || !rightEye.current) return;

    // Calcular posição alvo baseada no mouse (com limite de rotação)
    // O fantasma está em 0,0,0. Os olhos devem olhar para o mouse.
    // Mouse x/y vai de -1 a 1.

    const eyeMovementRange = 0.15; // O quanto os olhos se movem dentro da "orbita"
    const targetX = mouse.x * eyeMovementRange;
    const targetY = mouse.y * eyeMovementRange;

    // Interpolação suave (Lerp)
    leftEye.current.position.x = THREE.MathUtils.lerp(
      leftEye.current.position.x,
      -0.3 + targetX,
      0.1
    );
    leftEye.current.position.y = THREE.MathUtils.lerp(
      leftEye.current.position.y,
      0.1 + targetY,
      0.1
    );

    rightEye.current.position.x = THREE.MathUtils.lerp(
      rightEye.current.position.x,
      0.3 + targetX,
      0.1
    );
    rightEye.current.position.y = THREE.MathUtils.lerp(
      rightEye.current.position.y,
      0.1 + targetY,
      0.1
    );

    // Escala para piscar (scale Y vai a 0.1)
    const targetScaleY = blink ? 0.1 : 1;
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

  // Material muito brilhante para o Bloom pegar bem
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' });

  return (
    <group position={[0, 0, 0.8]}>
      {' '}
      {/* Posicionado na frente do fantasma */}
      <mesh
        ref={leftEye}
        position={[-0.3, 0.1, 0]}
        geometry={new THREE.SphereGeometry(0.06, 16, 16)}
        material={eyeMaterial}
      />
      <mesh
        ref={rightEye}
        position={[0.3, 0.1, 0]}
        geometry={new THREE.SphereGeometry(0.06, 16, 16)}
        material={eyeMaterial}
      />
    </group>
  );
}

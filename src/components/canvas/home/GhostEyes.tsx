'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Define a prop de cor e parâmetros de glow
export default function GhostEyes({
  color = '#ffffff', // Definindo branco como padrão pois é melhor para glow
  eyeGlowIntensity = 4.5,
  eyeGlowDecay = 0.95,
  eyeGlowResponse = 0.31,
}: {
  color?: string;
  eyeGlowIntensity?: number;
  eyeGlowDecay?: number;
  eyeGlowResponse?: number;
}) {
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const glowLeft = useRef<THREE.Mesh>(null);
  const glowRight = useRef<THREE.Mesh>(null);

  const pointerRef = useRef(new THREE.Vector2(0, 0));
  const speedRef = useRef(0);
  const [blink, setBlink] = useState(false);

  // Materiais (Memoizados para não recriar a cada render se a cor não mudar)
  const materials = useMemo(() => {
    return {
      eye: new THREE.MeshBasicMaterial({ color: color }), // Usa a cor da prop
      glow: new THREE.MeshBasicMaterial({
        color: '#4fa8ff', // Glow mantém-se azulado ou pode ser prop também
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    };
  }, [color]);

  // Piscar aleatório
  useEffect(() => {
    const timeout = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(timeout, nextBlink);
    };
    const timer = setTimeout(timeout, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handlePointer = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Lógica de velocidade para brilho
      const prevX = pointerRef.current.x;
      const prevY = pointerRef.current.y;
      const dx = x - prevX;
      const dy = y - prevY;
      const delta = Math.sqrt(dx * dx + dy * dy);

      // Use eyeGlowResponse for interpolation speed (inverse or direct map)
      speedRef.current = THREE.MathUtils.lerp(
        speedRef.current,
        delta * 30, // Multiplier for sensitivity
        eyeGlowResponse
      );

      pointerRef.current.set(x, y);
    };
    window.addEventListener('mousemove', handlePointer);
    return () => window.removeEventListener('mousemove', handlePointer);
  }, [eyeGlowResponse]);

  useFrame(() => {
    if (!leftEye.current || !rightEye.current) return;

    // Decay speed
    speedRef.current *= eyeGlowDecay;

    const eyeMovementRange = 0.08;
    const targetX = pointerRef.current.x * eyeMovementRange;
    const targetY = pointerRef.current.y * eyeMovementRange;

    // Interpolação de posição
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

    // Piscar
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

    // Glow reativo
    // Usa eyeGlowIntensity como multiplicador máximo
    const glowStrength = THREE.MathUtils.clamp(speedRef.current, 0, 1);
    const scale = 1 + glowStrength * 0.6;
    const opacity = 0.15 + glowStrength * (eyeGlowIntensity * 0.1);

    if (glowLeft.current && glowRight.current) {
      glowLeft.current.scale.set(scale, scale, scale);
      glowRight.current.scale.set(scale, scale, scale);

      // Acessa material diretamente para performance
      (glowLeft.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      (glowRight.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <group position={[0.05, 0.05, 1.05]}>
      <mesh
        ref={leftEye}
        position={[-0.55, 0.15, 0]}
        geometry={new THREE.SphereGeometry(0.32, 20, 20)}
        material={materials.eye}
      />
      <mesh
        ref={rightEye}
        position={[0.55, 0.15, 0]}
        geometry={new THREE.SphereGeometry(0.32, 20, 20)}
        material={materials.eye}
      />
      <mesh
        ref={glowLeft}
        position={[-0.55, 0.15, -0.08]}
        geometry={new THREE.SphereGeometry(0.52, 14, 14)}
        material={materials.glow}
      />
      <mesh
        ref={glowRight}
        position={[0.55, 0.15, -0.08]}
        geometry={new THREE.SphereGeometry(0.52, 14, 14)}
        material={materials.glow}
      />
    </group>
  );
}

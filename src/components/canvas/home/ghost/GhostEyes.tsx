'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function GhostEyes({ color = '#ffffff' }: { color?: string }) {
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const [blink, setBlink] = useState(false);

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

  useFrame(() => {
    if (!leftEye.current || !rightEye.current) return;

    const eyeMovementRange = 0.15;
    const targetX = mouse.x * eyeMovementRange;
    const targetY = mouse.y * eyeMovementRange;

    // Lerp para suavidade
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

  // Material básico para reagir fortemente ao Bloom
  return (
    <group position={[0, 0, 0.8]}>
      <mesh ref={leftEye} position={[-0.3, 0.1, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={rightEye} position={[0.3, 0.1, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

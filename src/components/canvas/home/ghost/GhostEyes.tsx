'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, type Mesh } from 'three';

export default function GhostEyes({ color = '#ffffff' }: { color?: string }) {
  const leftEye = useRef<Mesh>(null);
  const rightEye = useRef<Mesh>(null);
  const { mouse } = useThree();
  const [blink, setBlink] = useState(false);

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

  useFrame(() => {
    if (!leftEye.current || !rightEye.current) return;

    const eyeMovementRange = 0.15;
    const targetX = mouse.x * eyeMovementRange;
    const targetY = mouse.y * eyeMovementRange;

    // Lerp para suavidade
    leftEye.current.position.x = MathUtils.lerp(
      leftEye.current.position.x,
      -0.3 + targetX,
      0.1
    );
    leftEye.current.position.y = MathUtils.lerp(
      leftEye.current.position.y,
      0.1 + targetY,
      0.1
    );

    rightEye.current.position.x = MathUtils.lerp(
      rightEye.current.position.x,
      0.3 + targetX,
      0.1
    );
    rightEye.current.position.y = MathUtils.lerp(
      rightEye.current.position.y,
      0.1 + targetY,
      0.1
    );

    const targetScaleY = blink ? 0.1 : 1;
    leftEye.current.scale.y = MathUtils.lerp(
      leftEye.current.scale.y,
      targetScaleY,
      0.4
    );
    rightEye.current.scale.y = MathUtils.lerp(
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

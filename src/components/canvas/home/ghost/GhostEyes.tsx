'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, type Mesh, MeshBasicMaterial, Vector2 } from 'three';
import { GHOST_CONFIG, FLUORESCENT_COLORS } from '@/config/ghostConfig';

export default function GhostEyes({ color = '#ffffff' }: { color?: string }) {
  const leftEye = useRef<Mesh>(null);
  const rightEye = useRef<Mesh>(null);
  const leftMat = useRef<MeshBasicMaterial>(null);
  const rightMat = useRef<MeshBasicMaterial>(null);
  const { mouse } = useThree();
  const [blink, setBlink] = useState(false);

  // Track previous mouse position for velocity calculation
  const prevMouse = useRef(new Vector2(0, 0));
  const glowIntensity = useRef(GHOST_CONFIG.eyeGlowIntensity * 0.1); // Initial low intensity

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

    // Calculate mouse velocity for glow intensity
    const mouseVelocity = Math.sqrt(
      Math.pow(mouse.x - prevMouse.current.x, 2) +
        Math.pow(mouse.y - prevMouse.current.y, 2)
    );
    prevMouse.current.set(mouse.x, mouse.y);

    // Glow intensity based on movement (using config values)
    const targetGlow =
      mouseVelocity > 0.001
        ? Math.min(
            GHOST_CONFIG.eyeGlowIntensity * 0.1 + mouseVelocity * 20,
            GHOST_CONFIG.eyeGlowIntensity
          )
        : GHOST_CONFIG.eyeGlowIntensity * 0.1;

    glowIntensity.current = MathUtils.lerp(
      glowIntensity.current,
      targetGlow,
      GHOST_CONFIG.eyeGlowResponse
    );

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

    // Update eye glow based on movement using config values
    if (leftMat.current && rightMat.current) {
      leftMat.current.opacity = glowIntensity.current;
      rightMat.current.opacity = glowIntensity.current;
    }
  });

  // Resolve color name to actual hex value if needed
  const resolvedColor =
    FLUORESCENT_COLORS[color as keyof typeof FLUORESCENT_COLORS] || color;

  // Material básico para reagir fortemente ao Bloom
  return (
    <group position={[0, 0, 0.8]}>
      <mesh ref={leftEye} position={[-0.3, 0.1, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          ref={leftMat}
          color={resolvedColor}
          transparent
          opacity={GHOST_CONFIG.eyeGlowIntensity * 0.1}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={rightEye} position={[0.3, 0.1, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          ref={rightMat}
          color={resolvedColor}
          transparent
          opacity={GHOST_CONFIG.eyeGlowIntensity * 0.1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

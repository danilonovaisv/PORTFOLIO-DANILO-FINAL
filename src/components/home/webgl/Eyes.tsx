// src/components/home/webgl/Eyes.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Eyes() {
  const reducedMotion = usePrefersReducedMotion();
  const { camera } = useThree();
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouseSpeedRef = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const currentMovement = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;

      const mousePos = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };

      mouseSpeedRef.current.x = Math.abs(mousePos.x - lastMousePos.current.x);
      mouseSpeedRef.current.y = Math.abs(mousePos.y - lastMousePos.current.y);
      lastMousePos.current = mousePos;

      currentMovement.current =
        currentMovement.current * 0.95 +
        (mouseSpeedRef.current.x + mouseSpeedRef.current.y) * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (reducedMotion) return;

    // Eye glow based on movement speed
    const glowIntensity = Math.min(currentMovement.current * 5, 1);

    if (leftEyeRef.current) {
      (leftEyeRef.current.material as THREE.MeshBasicMaterial).opacity =
        glowIntensity;
      leftEyeRef.current.lookAt(camera.position);
    }
    if (rightEyeRef.current) {
      (rightEyeRef.current.material as THREE.MeshBasicMaterial).opacity =
        glowIntensity;
      rightEyeRef.current.lookAt(camera.position);
    }
  });

  return (
    <group>
      {/* Eye sockets */}
      <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#270296" />
      </mesh>
      <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#270296" />
      </mesh>

      {/* Glowing eyes */}
      <mesh ref={leftEyeRef} position={[-0.7, 0.6, 2.2]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial color="#ff03b3" transparent opacity={0} />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial color="#ff03b3" transparent opacity={0} />
      </mesh>
    </group>
  );
}

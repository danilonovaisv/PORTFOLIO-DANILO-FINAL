'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { GHOST_CONFIG } from '@/config/ghostConfig';

export function Ghost() {
  const groupRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);
  const { viewport, mouse } = useThree();
  const { quality } = usePerformanceAdaptive();

  const segments = useMemo(() => {
    return quality === 'low' ? 32 : quality === 'medium' ? 64 : 128;
  }, [quality]);

  // Criar geometria deformada (saia ondulada)
  useEffect(() => {
    if (!bodyRef.current) return;

    // Garantir que a geometria é acessível
    const geo = bodyRef.current.geometry as THREE.SphereGeometry;
    if (!geo) return;

    const pos = geo.attributes.position;
    const array = pos.array as Float32Array;

    // Deformar vértices inferiores
    for (let i = 0; i < array.length; i += 3) {
      const y = array[i + 1];

      if (y < -0.2) {
        const x = array[i];
        const z = array[i + 2];

        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;

        array[i + 1] = -2.0 + noise1 + noise2 + noise3;
      }
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
  }, []);

  // Animação de seguir mouse + flutuação
  useFrame(({ clock }) => {
    if (!groupRef.current || !bodyRef.current) return;

    const t = clock.getElapsedTime();

    // Flutuação suave baseada na config
    const floatY =
      Math.sin(t * GHOST_CONFIG.floatSpeed) * 0.05 +
      Math.cos(t * (GHOST_CONFIG.floatSpeed * 0.6)) * 0.03;

    const wobbleMultiplier = GHOST_CONFIG.wobbleAmount ?? 1;

    const targetX =
      (mouse.x ?? 0) * viewport.width * 0.4 * wobbleMultiplier * 0.5;
    const targetY =
      (mouse.y ?? 0) * viewport.height * 0.35 * wobbleMultiplier * 0.6 + floatY;

    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * GHOST_CONFIG.followSpeed;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * GHOST_CONFIG.followSpeed;

    // Pulsar emissive
    const pulse =
      Math.sin(t * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity +
      Math.sin(t * 0.6) * 0.12;

    if (bodyRef.current.material instanceof THREE.MeshStandardMaterial) {
      bodyRef.current.material.emissiveIntensity =
        GHOST_CONFIG.emissiveIntensity + pulse;
    }
  });

  return (
    <group ref={groupRef} name="ghost" scale={GHOST_CONFIG.ghostScale}>
      {/* Corpo principal */}
      <mesh ref={bodyRef}>
        <sphereGeometry args={[2, segments, segments]} />
        <meshStandardMaterial
          color={GHOST_CONFIG.bodyColor}
          roughness={0.02}
          metalness={0}
          transparent
          opacity={GHOST_CONFIG.ghostOpacity}
          emissive={GHOST_CONFIG.glowColor}
          emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
        />
      </mesh>

      {/* Olhos (opcionais - podem ter animação de blink) */}
      <group>
        <mesh position={[-0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial
            color={GHOST_CONFIG.eyeGlowColor}
            transparent
            opacity={0.77}
          />
        </mesh>
        <mesh position={[0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial
            color={GHOST_CONFIG.eyeGlowColor}
            transparent
            opacity={0.77}
          />
        </mesh>
      </group>
    </group>
  );
}

// Default export for dynamic imports
export default Ghost;

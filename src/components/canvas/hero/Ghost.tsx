'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { GHOST_CONFIG } from '@/config/ghostConfig';

export function Ghost() {
  const groupRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const leftEyeGroupRef = useRef<THREE.Group>(null!);
  const rightEyeGroupRef = useRef<THREE.Group>(null!);

  const { viewport, mouse } = useThree();
  const { quality } = usePerformanceAdaptive();

  const segments = useMemo(() => {
    return quality === 'low' ? 32 : quality === 'medium' ? 64 : 128;
  }, [quality]);

  // Shader customization via onBeforeCompile
  const onBeforeCompile = useMemo(
    () => (shader: any) => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
      #include <begin_vertex>
      
      // Ghost Skirt Deformation
      if (position.y < -0.2) {
        float noise1 = sin(position.x * 5.0) * 0.35;
        float noise2 = cos(position.z * 4.0) * 0.25;
        float noise3 = sin((position.x + position.z) * 3.0) * 0.15;
        float combinedNoise = noise1 + noise2 + noise3;
        
        transformed.y = -2.0 + combinedNoise;
      }
      `
      );
    },
    []
  );

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

    // --- Physics: Organic Tilt (Agente 6) ---
    if (bodyRef.current) {
      const mouseX = (mouse.x ?? 0) * viewport.width * 0.4;
      const mouseY = (mouse.y ?? 0) * viewport.height * 0.35;

      const dx = mouseX - groupRef.current.position.x;
      const dy = mouseY - groupRef.current.position.y;

      // Calculate tilt based on "drag" (velocity)
      const tiltStrength = 0.05; // Ajuste fino
      const targetRotationZ = -dx * tiltStrength;
      const targetRotationX = dy * tiltStrength;

      // Lerp rotation for smoothness
      bodyRef.current.rotation.z +=
        (targetRotationZ - bodyRef.current.rotation.z) * 0.1;
      bodyRef.current.rotation.x +=
        (targetRotationX - bodyRef.current.rotation.x) * 0.1;
    }
    // ----------------------------------------

    // Pulsar emissive
    const pulse =
      Math.sin(t * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity +
      Math.sin(t * 0.6) * 0.12;

    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        GHOST_CONFIG.emissiveIntensity + pulse;
    }

    // Eye Pulse Animation (Reference: Keyframes scale 1 -> 1.3)
    // Using a sin wave normalized to [1, 1.3] range
    // Frequency matches CSS "2s ease-in-out infinite" -> freq approx 3.14
    const eyePulse = 1 + (Math.sin(t * 3.14) * 0.5 + 0.5) * 0.3;

    if (leftEyeGroupRef.current) {
      leftEyeGroupRef.current.scale.setScalar(eyePulse);
    }
    if (rightEyeGroupRef.current) {
      // Right eye has 0.1s delay in reference.
      // t * 3.14 is phase. 0.1s delay roughly -0.3 phase shift
      const rightEyePulse = 1 + (Math.sin(t * 3.14 - 0.3) * 0.5 + 0.5) * 0.3;
      rightEyeGroupRef.current.scale.setScalar(rightEyePulse);
    }
  });

  return (
    <group ref={groupRef} name="ghost" scale={GHOST_CONFIG.ghostScale}>
      {/* Corpo principal */}
      <mesh ref={bodyRef}>
        <sphereGeometry args={[2, segments, segments]} />
        <meshStandardMaterial
          ref={materialRef}
          color={GHOST_CONFIG.bodyColor}
          roughness={0.4}
          metalness={0.85}
          transparent
          opacity={GHOST_CONFIG.ghostOpacity}
          emissive={GHOST_CONFIG.glowColor}
          emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>

      {/* Olhos (Core + Glow) */}
      <group>
        {/* Olho Esquerdo */}
        <group ref={leftEyeGroupRef} position={[-0.7, 0.6, 2.0]}>
          <mesh>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshBasicMaterial
              color={GHOST_CONFIG.eyeGlowColor}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Glow Esquerdo */}
          <mesh>
            <sphereGeometry args={[0.525, 12, 12]} />
            <meshBasicMaterial
              color={GHOST_CONFIG.eyeGlowColor}
              transparent
              opacity={0.3}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Olho Direito */}
        <group ref={rightEyeGroupRef} position={[0.7, 0.6, 2.0]}>
          <mesh>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshBasicMaterial
              color={GHOST_CONFIG.eyeGlowColor}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Glow Direito */}
          <mesh>
            <sphereGeometry args={[0.525, 12, 12]} />
            <meshBasicMaterial
              color={GHOST_CONFIG.eyeGlowColor}
              transparent
              opacity={0.3}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Default export for dynamic imports
export default Ghost;

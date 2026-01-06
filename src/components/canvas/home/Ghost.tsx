// src/components/canvas/home/Ghost.tsx
'use client';

import React, { useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

type GhostProps = {
  children?: React.ReactNode;
};

const Ghost = forwardRef<THREE.Group, GhostProps>((props, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const bodyMeshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useImperativeHandle(ref, () => localRef.current!);

  // Parameters from reference
  const params = {
    followSpeed: 0.05,
    wobbleAmount: 0.35,
    floatSpeed: 0.06,
    rotationDamping: 0.05,
  };

  // Geometry Procedural (Exact Match from CodePen)
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 40, 40); // Reference uses 40 segments
    const posAttribute = geo.getAttribute('position');
    const positions = posAttribute.array;

    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        // Combined noise exactly as in reference
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!localRef.current || !bodyMeshRef.current) return;

    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    // 1. Mouse Tracking (Reference constants: 11 and 7)
    const targetX = pointer.x * 11;
    const targetY = pointer.y * 7;

    // 2. Movement Layout
    localRef.current.position.x +=
      (targetX - localRef.current.position.x) * params.followSpeed;
    localRef.current.position.y +=
      (targetY - localRef.current.position.y) * params.followSpeed;

    // 3. Floating (Exact sine/cos mix from Ref)
    const float1 = Math.sin(time * params.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(time * params.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(time * params.floatSpeed * 2.3) * 0.008;
    localRef.current.position.y += float1 + float2 + float3;

    // 4. Tilt Physics
    const dx = targetX - localRef.current.position.x;
    const dy = targetY - localRef.current.position.y;

    // Normalize direction roughly
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dirX = dist > 0 ? dx / dist : 0;
    const dirY = dist > 0 ? dy / dist : 0; // Fixed: was using dist to 0

    const tiltStrength = 0.1 * params.wobbleAmount;

    // Tilt Decay logic from reference
    bodyMeshRef.current.rotation.z =
      bodyMeshRef.current.rotation.z * params.rotationDamping +
      -dirX * tiltStrength * (1 - params.rotationDamping) * dist;
    bodyMeshRef.current.rotation.x =
      bodyMeshRef.current.rotation.x * params.rotationDamping +
      dirY * tiltStrength * (1 - params.rotationDamping) * dist;

    // Base Wobble
    bodyMeshRef.current.rotation.y =
      Math.sin(time * 1.4) * 0.05 * params.wobbleAmount;

    // 5. Pulsing & Breathing
    const pulse1 = Math.sin(time * 0.6) * 0.6; // Speed 1.6, intensity 0.6
    const breathe = Math.sin(time * 0.6) * 0.12;

    // Scale Variations (Breathing)
    // Scale varies with wobble and pulse
    const scaleVariation =
      1 + Math.sin(time * 2.1) * 0.025 * params.wobbleAmount + pulse1 * 0.015;
    const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
    const finalScale = scaleVariation * scaleBreath;

    bodyMeshRef.current.scale.set(finalScale, finalScale, finalScale);

    // Update Material Pulse
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 8.5 + pulse1 + breathe;
    }
  });

  return (
    <group ref={localRef}>
      <mesh ref={bodyMeshRef} geometry={geometry}>
        <meshStandardMaterial
          ref={materialRef}
          color="#0f2027"
          emissive="#0080ff"
          emissiveIntensity={8.5}
          roughness={0.02}
          metalness={0.0}
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
          alphaTest={0.1}
        />
      </mesh>
      {props.children}
    </group>
  );
});

Ghost.displayName = 'Ghost';
export default Ghost;

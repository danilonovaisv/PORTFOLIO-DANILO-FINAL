// src/components/canvas/home/GhostEyes.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function GhostEyes() {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftGlowRef = useRef<THREE.Mesh>(null);
  const rightGlowRef = useRef<THREE.Mesh>(null);

  // Track movement for glow intensity
  const currentMovement = useRef(0);
  const lastPos = useRef(new THREE.Vector3());

  // Materials & Geometries from reference
  const {
    eyesMaterial,
    glowMaterial,
    socketMaterial,
    eyeGeo,
    socketGeo,
    glowGeo,
  } = useMemo(() => {
    // Eye Glow Color (Violet from reference)
    const glowColor = new THREE.Color(0x8a2be2);

    const socketMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

    // Core Eye (White/Violet mix)
    const eyeMat = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0, // Starts invisible
    });

    // Outer Glow
    const glowMat = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    });

    // Geometries (Scaled up 50% from original reference calculations)
    // Original ref: Eye 0.2 -> 0.3, Socket 0.45, Glow 0.525
    return {
      socketMaterial: socketMat,
      eyesMaterial: eyeMat,
      glowMaterial: glowMat,
      socketGeo: new THREE.SphereGeometry(0.45, 16, 16),
      eyeGeo: new THREE.SphereGeometry(0.3, 12, 12),
      glowGeo: new THREE.SphereGeometry(0.525, 12, 12),
    };
  }, []);

  useFrame((_state) => {
    if (!groupRef.current) return;

    // 1. Calculate movement speed for glow intensity
    // We need world position of the parent ghost group to know real speed
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);

    const dist = worldPos.distanceTo(lastPos.current);
    lastPos.current.copy(worldPos);

    // Smooth movement value
    currentMovement.current = currentMovement.current * 0.95 + dist * 0.05;

    // Threshold for glow
    const isMoving = currentMovement.current > 0.005; // ADJUSTED SENSITIVITY
    const targetOpacity = isMoving ? 1.0 : 0.0;

    // Smooth transition for opacity
    if (leftEyeRef.current) {
      // Lerp opacity
      const currentOp = leftEyeRef.current.material.opacity;
      const newOp = THREE.MathUtils.lerp(currentOp, targetOpacity, 0.1);

      leftEyeRef.current.material.opacity = newOp;
      if (rightEyeRef.current) rightEyeRef.current.material.opacity = newOp;

      // Outer glow is softer (30% of core)
      if (leftGlowRef.current)
        leftGlowRef.current.material.opacity = newOp * 0.3;
      if (rightGlowRef.current)
        rightGlowRef.current.material.opacity = newOp * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Left Eye Setup */}
      <group position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <mesh geometry={socketGeo} material={socketMaterial} />
      </group>
      <mesh
        ref={leftEyeRef}
        geometry={eyeGeo}
        material={eyesMaterial}
        position={[-0.7, 0.6, 2.0]}
      />
      <mesh
        ref={leftGlowRef}
        geometry={glowGeo}
        material={glowMaterial}
        position={[-0.7, 0.6, 1.95]}
      />

      {/* Right Eye Setup */}
      <group position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <mesh geometry={socketGeo} material={socketMaterial} />
      </group>
      <mesh
        ref={rightEyeRef}
        geometry={eyeGeo}
        material={eyesMaterial}
        position={[0.7, 0.6, 2.0]}
      />
      <mesh
        ref={rightGlowRef}
        geometry={glowGeo}
        material={glowMaterial}
        position={[0.7, 0.6, 1.95]}
      />
    </group>
  );
}

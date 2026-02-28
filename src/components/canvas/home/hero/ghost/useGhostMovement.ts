'use client';

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

interface GhostMovementProps {
  groupRef: React.RefObject<THREE.Group | null>;
  bodyRef: React.RefObject<THREE.Mesh | null>;
  eyesRef: React.RefObject<THREE.Group | null>;
  prevPositionRef: React.RefObject<THREE.Vector3>;
  currentMovementRef: React.MutableRefObject<number>;
  analogPassRef: React.RefObject<any>;
}

export function useGhostMovement({
  groupRef,
  bodyRef,
  eyesRef,
  prevPositionRef,
  currentMovementRef,
  analogPassRef,
}: GhostMovementProps) {
  const { viewport, mouse } = useThree();

  useFrame(({ clock }) => {
    if (!groupRef.current || !bodyRef.current) return;

    const t = clock.getElapsedTime();

    // 1. Analog Decay Update
    if (analogPassRef.current && analogPassRef.current.uniforms) {
      analogPassRef.current.uniforms.uTime.value = t;
    }

    // 2. Follow Mouse
    const targetX = mouse.x * viewport.width * 0.3;
    const targetY = mouse.y * viewport.height * 0.3;

    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * GHOST_CONFIG.followSpeed;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * GHOST_CONFIG.followSpeed;

    // 3. Float Animation
    const floatY =
      Math.sin(t * GHOST_CONFIG.floatSpeed * 0.5) * 0.03 +
      Math.cos(t * GHOST_CONFIG.floatSpeed * 0.7) * 0.018;
    groupRef.current.position.y += floatY;

    // 4. Pulse
    const pulse =
      Math.sin(t * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity;
    if (bodyRef.current.material instanceof THREE.MeshStandardMaterial) {
      bodyRef.current.material.emissiveIntensity =
        GHOST_CONFIG.emissiveIntensity + pulse;
    }

    // 5. Rotation/Tilt
    const velocityX = targetX - groupRef.current.position.x;
    const velocityY = targetY - groupRef.current.position.y;

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -velocityX * 0.05,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      velocityY * 0.02,
      0.02
    );

    // 6. Eye Glow
    if (eyesRef.current && eyesRef.current.userData?.leftEyeMaterial) {
      const prevPos = prevPositionRef.current;
      const movement = prevPos.distanceTo(groupRef.current.position);

      currentMovementRef.current =
        currentMovementRef.current * GHOST_CONFIG.eyeGlowDecay +
        movement * (5 - GHOST_CONFIG.eyeGlowDecay);

      prevPos.copy(groupRef.current.position);

      const isMoving =
        currentMovementRef.current > GHOST_CONFIG.movementThreshold;
      const targetOpacity = isMoving ? 1.0 : 0.0;
      const lerpFactor = isMoving
        ? GHOST_CONFIG.eyeGlowResponse
        : GHOST_CONFIG.eyeGlowResponse * 0.5;

      const {
        leftEyeMaterial,
        rightEyeMaterial,
        leftOuterMaterial,
        rightOuterMaterial,
      } = eyesRef.current.userData;

      leftEyeMaterial.opacity = THREE.MathUtils.lerp(
        leftEyeMaterial.opacity,
        targetOpacity,
        lerpFactor
      );
      rightEyeMaterial.opacity = leftEyeMaterial.opacity;
      leftOuterMaterial.opacity = leftEyeMaterial.opacity * 0.63;
      rightOuterMaterial.opacity = leftEyeMaterial.opacity * 0.63;
    }
  }, 0.5);
}

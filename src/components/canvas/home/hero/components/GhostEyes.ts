/**
 * Ghost Eyes Component
 * Creates and animates the ghost's glowing eyes
 */

import * as THREE from 'three';
import { DEFAULT_GHOST_PARAMS, FLUORESCENT_COLORS } from '../utils/constants';

export interface EyeMaterials {
  leftEyeMaterial: THREE.MeshBasicMaterial;
  rightEyeMaterial: THREE.MeshBasicMaterial;
  leftOuterGlowMaterial: THREE.MeshBasicMaterial;
  rightOuterGlowMaterial: THREE.MeshBasicMaterial;
}

/**
 * Creates the ghost eyes with sockets and glow effects
 */
export function createEyes(
  ghostGroup: THREE.Group,
  params = DEFAULT_GHOST_PARAMS
): EyeMaterials {
  const eyeGroup = new THREE.Group();
  ghostGroup.add(eyeGroup);

  // Eye Sockets (black holes)
  const socketGeometry = new THREE.SphereGeometry(0.45, 16, 16);
  const socketMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

  const leftSocket = new THREE.Mesh(socketGeometry, socketMaterial);
  leftSocket.position.set(-0.7, 0.6, 1.9);
  leftSocket.scale.set(1.1, 1.0, 0.6);
  eyeGroup.add(leftSocket);

  const rightSocket = new THREE.Mesh(socketGeometry, socketMaterial);
  rightSocket.position.set(0.7, 0.6, 1.9);
  rightSocket.scale.set(1.1, 1.0, 0.6);
  eyeGroup.add(rightSocket);

  // Eye Glow (inner)
  const eyeGeometry = new THREE.SphereGeometry(0.3, 12, 12);

  const leftEyeMaterial = new THREE.MeshBasicMaterial({
    color: FLUORESCENT_COLORS[params.eyeGlowColor],
    transparent: true,
    opacity: 0,
  });
  const leftEye = new THREE.Mesh(eyeGeometry, leftEyeMaterial);
  leftEye.position.set(-0.7, 0.6, 2.0);
  eyeGroup.add(leftEye);

  const rightEyeMaterial = new THREE.MeshBasicMaterial({
    color: FLUORESCENT_COLORS[params.eyeGlowColor],
    transparent: true,
    opacity: 0,
  });
  const rightEye = new THREE.Mesh(eyeGeometry, rightEyeMaterial);
  rightEye.position.set(0.7, 0.6, 2.0);
  eyeGroup.add(rightEye);

  // Outer Glow (halo effect)
  const outerGlowGeometry = new THREE.SphereGeometry(0.525, 12, 12);

  const leftOuterGlowMaterial = new THREE.MeshBasicMaterial({
    color: FLUORESCENT_COLORS[params.eyeGlowColor],
    transparent: true,
    opacity: 0,
    side: THREE.BackSide,
  });
  const leftOuterGlow = new THREE.Mesh(
    outerGlowGeometry,
    leftOuterGlowMaterial
  );
  leftOuterGlow.position.set(-0.7, 0.6, 1.95);
  eyeGroup.add(leftOuterGlow);

  const rightOuterGlowMaterial = new THREE.MeshBasicMaterial({
    color: FLUORESCENT_COLORS[params.eyeGlowColor],
    transparent: true,
    opacity: 0,
    side: THREE.BackSide,
  });
  const rightOuterGlow = new THREE.Mesh(
    outerGlowGeometry,
    rightOuterGlowMaterial
  );
  rightOuterGlow.position.set(0.7, 0.6, 1.95);
  eyeGroup.add(rightOuterGlow);

  return {
    leftEyeMaterial,
    rightEyeMaterial,
    leftOuterGlowMaterial,
    rightOuterGlowMaterial,
  };
}

/**
 * Updates eye glow based on ghost movement
 */
export function updateEyeGlow(
  eyes: EyeMaterials,
  currentMovement: number,
  params = DEFAULT_GHOST_PARAMS
): void {
  const isMoving = currentMovement > params.movementThreshold;
  const targetGlow = isMoving ? 1.0 : 0.0;
  const glowChangeSpeed = isMoving
    ? params.eyeGlowResponse * 2
    : params.eyeGlowResponse;

  const newOpacity =
    eyes.leftEyeMaterial.opacity +
    (targetGlow - eyes.leftEyeMaterial.opacity) * glowChangeSpeed;

  eyes.leftEyeMaterial.opacity = newOpacity;
  eyes.rightEyeMaterial.opacity = newOpacity;
  eyes.leftOuterGlowMaterial.opacity = newOpacity * 0.3;
  eyes.rightOuterGlowMaterial.opacity = newOpacity * 0.3;
}

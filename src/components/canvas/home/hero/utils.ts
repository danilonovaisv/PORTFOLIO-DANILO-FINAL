import * as THREE from 'three';
import { FLUORESCENT_COLORS } from './types';

export function createEyes(ghostGroup: THREE.Group, eyeGlowColor: string) {
  const eyeGroup = new THREE.Group();
  ghostGroup.add(eyeGroup);
  
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

  const eyeGeometry = new THREE.SphereGeometry(0.3, 12, 12);
  const leftEyeMaterial = new THREE.MeshBasicMaterial({
    color: FLUORESCENT_COLORS[eyeGlowColor],
    transparent: true,
    opacity: 0,
  });
  const leftEye = new THREE.Mesh(eyeGeometry, leftEyeMaterial);
  leftEye.position.set(-0.7, 0.6, 2.0);
  eyeGroup.add(leftEye);

  const rightEyeMaterial = new THREE.MeshBasicMaterial({
    color: FLUORESCENT_COLORS[eyeGlowColor],
    transparent: true,
    opacity: 0,
  });
  const rightEye = new THREE.Mesh(eyeGeometry, rightEyeMaterial);
  rightEye.position.set(0.7, 0.6, 2.0);
  eyeGroup.add(rightEye);

  const outerGlowGeometry = new THREE.SphereGeometry(0.525, 12, 12);
  const leftOuterGlowMaterial = new THREE.MeshBasicMaterial({
    color: FLUORESCENT_COLORS[eyeGlowColor],
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
    color: FLUORESCENT_COLORS[eyeGlowColor],
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
    eyeGroup,
    leftEyeMaterial,
    rightEyeMaterial,
    leftOuterGlowMaterial,
    rightOuterGlowMaterial,
  };
}

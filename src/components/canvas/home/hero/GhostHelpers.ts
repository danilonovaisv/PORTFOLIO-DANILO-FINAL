import * as THREE from 'three';

export function createGhostEyes(params: any, colors: any) {
  const eyeGroup = new THREE.Group();

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
  const eyeColor =
    colors[params.eyeGlowColor as keyof typeof colors] || 0x8a2be2;

  const leftEyeMaterial = new THREE.MeshBasicMaterial({
    color: eyeColor,
    transparent: true,
    opacity: 0,
  });
  const leftEye = new THREE.Mesh(eyeGeometry, leftEyeMaterial);
  leftEye.position.set(-0.7, 0.6, 2.0);
  eyeGroup.add(leftEye);

  const rightEyeMaterial = new THREE.MeshBasicMaterial({
    color: eyeColor,
    transparent: true,
    opacity: 0,
  });
  const rightEye = new THREE.Mesh(eyeGeometry, rightEyeMaterial);
  rightEye.position.set(0.7, 0.6, 2.0);
  eyeGroup.add(rightEye);

  const outerGlowGeometry = new THREE.SphereGeometry(0.525, 12, 12);
  const leftOuterGlowMaterial = new THREE.MeshBasicMaterial({
    color: eyeColor,
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
    color: eyeColor,
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
    materials: {
      leftEyeMaterial,
      rightEyeMaterial,
      leftOuterGlowMaterial,
      rightOuterGlowMaterial,
    },
  };
}

export function createFirefly(params: any) {
  const fireflyGeom = new THREE.SphereGeometry(0.02, 2, 2);
  const fireflyMat = new THREE.MeshBasicMaterial({
    color: 0xffff44,
    transparent: true,
    opacity: 0.9,
  });
  const firefly = new THREE.Mesh(fireflyGeom, fireflyMat);

  const glowGeom = new THREE.SphereGeometry(0.08, 8, 8);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffff88,
    transparent: true,
    opacity: 0.4,
    side: THREE.BackSide,
  });
  const glow = new THREE.Mesh(glowGeom, glowMat);
  firefly.add(glow);

  const light = new THREE.PointLight(0xffff44, 0.8, 3, 2);
  firefly.add(light);

  firefly.userData = {
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * params.fireflySpeed,
      (Math.random() - 0.5) * params.fireflySpeed,
      (Math.random() - 0.5) * params.fireflySpeed
    ),
    phase: Math.random() * Math.PI * 2,
    pulseSpeed: 2 + Math.random() * 3,
    glowMat,
    fireflyMat,
    light,
  };

  return firefly;
}

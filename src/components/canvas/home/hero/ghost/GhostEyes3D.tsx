'use client';

import { useEffect } from 'react';
import * as THREE from 'three';
import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';

interface GhostEyes3DProps {
  eyesRef: React.RefObject<THREE.Group | null>;
  groupRef: React.RefObject<THREE.Group | null>;
}

export function GhostEyes3D({ eyesRef, groupRef }: GhostEyes3DProps) {
  useEffect(() => {
    if (!eyesRef.current) return;

    const eyeColorHex = getConfigColorHex(GHOST_CONFIG.eyeGlowColor);

    // 1. Sockets
    const socketGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const socketMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const leftSocket = new THREE.Mesh(socketGeo, socketMat);
    leftSocket.position.set(-0.7, 0.6, 1.9);
    leftSocket.scale.set(1.1, 1.0, 0.6);

    const rightSocket = new THREE.Mesh(socketGeo, socketMat);
    rightSocket.position.set(0.7, 0.6, 1.9);
    rightSocket.scale.set(1.1, 1.0, 0.6);

    // 2. Eyes
    const eyeGeo = new THREE.SphereGeometry(0.3, 12, 12);
    const outerGeo = new THREE.SphereGeometry(0.525, 12, 12);

    const eyeMat = new THREE.MeshBasicMaterial({
      color: eyeColorHex,
      transparent: true,
      opacity: 0.0,
    });

    const outerMat = new THREE.MeshBasicMaterial({
      color: eyeColorHex,
      transparent: true,
      opacity: 0.0,
      side: THREE.BackSide,
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    const leftOuter = new THREE.Mesh(outerGeo, outerMat.clone());
    const rightOuter = new THREE.Mesh(outerGeo, outerMat.clone());

    leftEye.position.set(-0.7, 0.6, 2.0);
    rightEye.position.set(0.7, 0.6, 2.0);
    leftOuter.position.set(-0.7, 0.6, 1.95);
    rightOuter.position.set(0.7, 0.6, 1.95);

    eyesRef.current.clear();
    eyesRef.current.add(
      leftSocket,
      rightSocket,
      leftEye,
      rightEye,
      leftOuter,
      rightOuter
    );

    eyesRef.current.userData = {
      leftEyeMaterial: leftEye.material as THREE.MeshBasicMaterial,
      rightEyeMaterial: rightEye.material as THREE.MeshBasicMaterial,
      leftOuterMaterial: leftOuter.material as THREE.MeshBasicMaterial,
      rightOuterMaterial: rightOuter.material as THREE.MeshBasicMaterial,
    };

    if (groupRef.current) {
      groupRef.current.add(eyesRef.current);
    }
  }, [groupRef, eyesRef]);

  return <group ref={eyesRef} />;
}

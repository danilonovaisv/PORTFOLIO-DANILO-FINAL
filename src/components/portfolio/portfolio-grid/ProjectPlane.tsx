'use client';

import { useRef } from 'react';
import { Image, useScroll, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import type { Group } from 'three';

type InteractionRef = MutableRefObject<{
  hover: number;
  tiltX: number;
  tiltY: number;
}>;

type ProjectPlaneProps = {
  textureUrl: string;
  interactionRef: InteractionRef;
  parallaxDepth?: number;
};

export function ProjectPlane({
  textureUrl,
  interactionRef,
  parallaxDepth = 0.22,
}: ProjectPlaneProps) {
  const groupRef = useRef<Group>(null);
  useTexture.preload(textureUrl);
  const scroll = useScroll();
  const texture = useTexture(textureUrl);
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const { hover, tiltX, tiltY } = interactionRef.current;
    const targetRotX = THREE.MathUtils.degToRad((tiltX ?? 0) * 0.6);
    const targetRotY = THREE.MathUtils.degToRad((tiltY ?? 0) * 0.6);

    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      targetRotX,
      6,
      delta
    );
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotY,
      6,
      delta
    );

    const targetZ = hover > 0 ? 0.18 : 0.02;
    group.position.z = THREE.MathUtils.damp(
      group.position.z,
      targetZ,
      4.2,
      delta
    );

    const offset = scroll?.offset ?? 0;
    const yParallax = (offset - 0.5) * parallaxDepth;
    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      yParallax,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <Image
        url={textureUrl}
        scale={[1.1, 1.42]}
        toneMapped={false}
      />
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[1.12, 1.44]} />
        <meshBasicMaterial color="#0b1224" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

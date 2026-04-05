import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MotionValue } from 'framer-motion';

interface GhostModelProps {
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
}

const bodyMaterial = new THREE.MeshStandardMaterial({
  color: '#f7f8ff',
  roughness: 0.3,
  metalness: 0.02,
});

const hatMaterial = new THREE.MeshStandardMaterial({
  color: '#0f0f1a',
  roughness: 0.5,
  metalness: 0.15,
});

const rimMaterial = new THREE.MeshStandardMaterial({
  color: '#ff496c',
  roughness: 0.4,
  metalness: 0.08,
});

const eyeMaterial = new THREE.MeshStandardMaterial({
  color: '#090a10',
  roughness: 0.7,
  metalness: 0.02,
});

const GhostModel: React.FC<GhostModelProps> = ({
  scrollProgress,
  isMobile,
}) => {
  const group = useRef<THREE.Group>(null);
  const time = useRef(0);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current) return;

    const scroll = THREE.MathUtils.clamp(scrollProgress.get(), 0, 1);
    const phraseProgress = THREE.MathUtils.clamp(scroll / 0.82, 0, 1);
    const finalPhase = THREE.MathUtils.clamp((scroll - 0.82) / 0.16, 0, 1);
    const enterProgress = THREE.MathUtils.clamp((scroll - 0.02) / 0.1, 0, 1);

    time.current += state.clock.getDelta();

    const intensity = 1 + phraseProgress * 0.75;
    const floatX = Math.cos(time.current * 1.1) * 0.08 * intensity;
    const floatY = Math.sin(time.current * 1.35) * 0.12 * intensity;

    const mobileStartX = -viewport.width * 0.22;
    const mobileStartY = viewport.height * 0.22;
    const desktopStartY = -0.45;

    const targetX = THREE.MathUtils.lerp(
      isMobile ? mobileStartX : 0,
      0,
      finalPhase
    ) + floatX;

    const targetY = THREE.MathUtils.lerp(
      isMobile ? mobileStartY : desktopStartY,
      -0.04,
      finalPhase
    ) + floatY;

    const targetZ = Math.cos(time.current * 0.6) * 0.12;
    const baseScale = isMobile ? 0.68 : 0.9;
    const targetScale =
      THREE.MathUtils.lerp(0.42, baseScale, enterProgress) *
      (1 + finalPhase * 0.12) +
      Math.sin(time.current * 1.05) * 0.015;

    const targetRotX = isMobile
      ? Math.sin(scroll * Math.PI * 2.2) * 0.08
      : -state.mouse.y * 0.14 + Math.sin(time.current * 0.8) * 0.05;
    const targetRotY = isMobile
      ? 0.24 + Math.sin(scroll * Math.PI * 1.4) * 0.2
      : 0.18 + state.mouse.x * 0.32 + Math.cos(time.current * 0.55) * 0.05;
    const targetRotZ = isMobile
      ? Math.sin(time.current * 0.9) * 0.035
      : -state.mouse.x * 0.06 + Math.sin(time.current * 1.1) * 0.04;

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      0.08
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      0.08
    );
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      0.08
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      0.09
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY,
      0.09
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetRotZ,
      0.09
    );

    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.09)
    );
  });

  return (
    <group ref={group} scale={isMobile ? 0.68 : 0.9} dispose={null}>
      <group position={[0, 0.1, 0]}>
        <mesh
          castShadow
          receiveShadow
          position={[0, 1.1, 0]}
          material={bodyMaterial}
        >
          <sphereGeometry args={[0.92, 48, 48]} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0, 0.1, 0]}
          scale={[1.05, 1.28, 0.96]}
          material={bodyMaterial}
        >
          <sphereGeometry args={[0.84, 48, 48]} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[-0.46, -0.76, 0]}
          material={bodyMaterial}
        >
          <sphereGeometry args={[0.34, 32, 32]} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0, -0.9, 0]}
          material={bodyMaterial}
        >
          <sphereGeometry args={[0.42, 32, 32]} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0.46, -0.76, 0]}
          material={bodyMaterial}
        >
          <sphereGeometry args={[0.34, 32, 32]} />
        </mesh>

        <mesh position={[-0.22, 1.08, 0.68]} material={eyeMaterial}>
          <sphereGeometry args={[0.08, 20, 20]} />
        </mesh>
        <mesh position={[0.22, 1.08, 0.68]} material={eyeMaterial}>
          <sphereGeometry args={[0.08, 20, 20]} />
        </mesh>

        <mesh
          castShadow
          receiveShadow
          position={[0, 2.16, 0]}
          material={hatMaterial}
        >
          <cylinderGeometry args={[1.04, 1.04, 0.12, 48]} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0, 2.52, 0]}
          material={hatMaterial}
        >
          <cylinderGeometry args={[0.56, 0.74, 0.72, 48]} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0, 2.2, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={rimMaterial}
        >
          <torusGeometry args={[0.72, 0.08, 24, 48]} />
        </mesh>
      </group>
    </group>
  );
};

export default GhostModel;

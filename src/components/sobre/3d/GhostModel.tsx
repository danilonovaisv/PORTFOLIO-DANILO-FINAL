
import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { MotionValue } from 'framer-motion';

type GLTFResult = GLTF & {
  nodes: {
    Body_Ghost_White_0: THREE.Mesh;
    Eyes_Eyes_0: THREE.Mesh;
    Hat_Hat_Black_0: THREE.Mesh;
    Rim_Rim_Red_0: THREE.Mesh;
  };
  materials: {
    Ghost_White: THREE.MeshStandardMaterial;
    Eyes: THREE.MeshStandardMaterial;
    Hat_Black: THREE.MeshStandardMaterial;
    Rim_Red: THREE.MeshStandardMaterial;
  };
};

const GHOST_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';

interface GhostModelProps {
  scrollProgress: MotionValue<number>;
}

const GhostModel: React.FC<GhostModelProps> = ({ scrollProgress }) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const { nodes, materials } = useGLTF(GHOST_URL) as unknown as GLTFResult;

  const scrollConfig = useMemo(
    () => ({
      startY: -1.5,
      endY: 4.5,
      curveIntensity: 1.5,
      rotationSpeed: Math.PI * 4,
    }),
    []
  );

  useFrame((state) => {
    if (!group.current) return;

    const scrollOffset = scrollProgress.get(); // Use MotionValue

    // Animations
    const targetY = THREE.MathUtils.lerp(
      scrollConfig.startY,
      scrollConfig.endY,
      scrollOffset
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      0.1
    );

    const targetX =
      Math.sin(scrollOffset * Math.PI * 1.5) * scrollConfig.curveIntensity;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      0.05
    );

    const targetZ = Math.cos(scrollOffset * Math.PI) * 1;
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      0.05
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      scrollOffset * scrollConfig.rotationSpeed,
      0.05
    );

    const targetTiltX = state.mouse.y * 0.2;
    const targetTiltZ = -state.mouse.x * 0.2;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetTiltX,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetTiltZ,
      0.1
    );

    state.camera.lookAt(0, group.current.position.y, 0);
  });

  const responsiveScale = Math.min(viewport.width / 3.5, 1.6);

  return (
    <group ref={group} scale={responsiveScale} dispose={null}>
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <group>
          <mesh
            name="Body_Ghost_White_0"
            castShadow
            receiveShadow
            geometry={nodes.Body_Ghost_White_0.geometry}
            material={materials.Ghost_White}
            position={[0, 1.5578, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Eyes_Eyes_0"
            castShadow
            receiveShadow
            geometry={nodes.Eyes_Eyes_0.geometry}
            material={materials.Eyes}
            position={[0, 1.5578, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Hat_Hat_Black_0"
            castShadow
            receiveShadow
            geometry={nodes.Hat_Hat_Black_0.geometry}
            material={materials.Hat_Black}
            position={[0, 2.9913, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Rim_Rim_Red_0"
            castShadow
            receiveShadow
            geometry={nodes.Rim_Rim_Red_0.geometry}
            material={materials.Rim_Red}
            position={[0, 2.3541, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </Float>
    </group>
  );
};

useGLTF.preload(GHOST_URL);

export default GhostModel;

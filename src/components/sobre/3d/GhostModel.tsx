'use client';

import * as THREE from 'three';
import {
  createContext,
  type ComponentType,
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { Merged, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { GLTF } from 'three-stdlib';
import type { MotionValue } from 'framer-motion';

const GHOST_MODEL_PATH = '/site.assets/3d/ghost.glb';

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

type GhostMeshProps = ComponentPropsWithoutRef<'mesh'>;

type GhostInstances = {
  BodyGhostWhite: ComponentType<GhostMeshProps>;
  EyesEyes: ComponentType<GhostMeshProps>;
  HatHatBlack: ComponentType<GhostMeshProps>;
  RimRimRed: ComponentType<GhostMeshProps>;
};

type GhostModelProps = ComponentPropsWithoutRef<'group'> & {
  intensity?: number | MotionValue<number>;
  scrollProgress?: MotionValue<number>;
  isMobile?: boolean;
};

const GhostInstancesContext = createContext<GhostInstances | null>(null);

function GhostInstancesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { nodes } = useGLTF(GHOST_MODEL_PATH) as unknown as GLTFResult;

  const meshes = useMemo(
    () => ({
      BodyGhostWhite: nodes.Body_Ghost_White_0,
      EyesEyes: nodes.Eyes_Eyes_0,
      HatHatBlack: nodes.Hat_Hat_Black_0,
      RimRimRed: nodes.Rim_Rim_Red_0,
    }),
    [nodes]
  );

  return (
    <Merged meshes={meshes}>
      {(instances) => (
        <GhostInstancesContext.Provider
          value={instances as unknown as GhostInstances}
        >
          {children}
        </GhostInstancesContext.Provider>
      )}
    </Merged>
  );
}

const GhostLayout = forwardRef<THREE.Group, ComponentPropsWithoutRef<'group'>>(
function GhostLayout(props, ref) {
  const instances = useContext(GhostInstancesContext);

  if (!instances) {
    return null;
  }

  return (
    <group ref={ref} {...props} dispose={null}>
      <instances.BodyGhostWhite
        name="Body_Ghost_White_0"
        position={[0, 1.6, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <instances.EyesEyes
        name="Eyes_Eyes_0"
        position={[0, 1.6, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <instances.HatHatBlack
        name="Hat_Hat_Black_0"
        position={[0, 3, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <instances.RimRimRed
        name="Rim_Rim_Red_0"
        position={[0, 2.4, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

const GhostModel = ({
  intensity = 0,
  scrollProgress: _scrollProgress,
  isMobile: _isMobile,
  ...props
}: GhostModelProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const currentIntensity =
      typeof intensity === 'number' ? intensity : intensity.get();

    const t = state.clock.getElapsedTime();
    const floatAmplitude = 0.08 + currentIntensity * 0.06;
    const floatSpeed = 0.6 + currentIntensity * 0.55;
    const sway = 0.035 + currentIntensity * 0.025;

    groupRef.current.position.y = Math.sin(t * floatSpeed) * floatAmplitude;
    groupRef.current.rotation.y = Math.sin(t * 0.35) * sway;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * sway * 0.42;
  });

  return (
    <GhostInstancesProvider>
      <GhostLayout ref={groupRef} {...props} />
    </GhostInstancesProvider>
  );
};

useGLTF.preload(GHOST_MODEL_PATH);

export { GHOST_MODEL_PATH, GhostInstancesProvider, GhostLayout };
export default GhostModel;

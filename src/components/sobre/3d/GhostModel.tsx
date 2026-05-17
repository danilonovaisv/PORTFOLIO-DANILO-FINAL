import { useGLTF, Merged } from '@react-three/drei';
import { useFrame, ThreeElements } from '@react-three/fiber';
import React, {
  useMemo,
  useRef,
  useContext,
  createContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { GHOST_MATERIAL_CONFIG } from '../beliefs/belief.constants';

const MODEL_PATH =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb?v=1.0.1';

if (typeof window !== 'undefined') {
  useGLTF.preload(MODEL_PATH);
}

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

const context = createContext<any>(null);

function Instances({ children, ...props }: any) {
  const { nodes, materials } = useGLTF(MODEL_PATH) as unknown as GLTFResult;

  useLayoutEffect(() => {
    if (materials) {
      // Hat
      if (materials.Hat_Black) {
        materials.Hat_Black.color.set(GHOST_MATERIAL_CONFIG.hat.color);
        materials.Hat_Black.roughness = GHOST_MATERIAL_CONFIG.hat.roughness;
      }

      // Rim
      if (materials.Rim_Red) {
        materials.Rim_Red.color.set(GHOST_MATERIAL_CONFIG.rim.color);
        materials.Rim_Red.emissive.set(GHOST_MATERIAL_CONFIG.rim.emissive);
        materials.Rim_Red.emissiveIntensity =
          GHOST_MATERIAL_CONFIG.rim.emissiveIntensity;
      }

      // Body
      if (materials.Ghost_White) {
        materials.Ghost_White.color.set(GHOST_MATERIAL_CONFIG.body.color);
        materials.Ghost_White.emissive.set(GHOST_MATERIAL_CONFIG.body.emissive);
        materials.Ghost_White.emissiveIntensity =
          GHOST_MATERIAL_CONFIG.body.emissiveIntensity;
        materials.Ghost_White.roughness = GHOST_MATERIAL_CONFIG.body.roughness;
        materials.Ghost_White.metalness = GHOST_MATERIAL_CONFIG.body.metalness;
      }
    }
  }, [materials]);

  const instances = useMemo(
    () => ({
      BodyGhostWhite: nodes.Body_Ghost_White_0,
      EyesEyes: nodes.Eyes_Eyes_0,
      HatHatBlack: nodes.Hat_Hat_Black_0,
      RimRimRed: nodes.Rim_Rim_Red_0,
    }),
    [nodes]
  );

  if (
    !instances.BodyGhostWhite ||
    !instances.EyesEyes ||
    !instances.HatHatBlack ||
    !instances.RimRimRed
  ) {
    console.warn(
      'Waiting for GLTF nodes to be fully loaded...',
      Object.keys(nodes)
    );
    return null;
  }

  return (
    <Merged meshes={instances} {...props}>
      {(instancesData: any) => (
        <context.Provider value={instancesData} children={children} />
      )}
    </Merged>
  );
}

const GhostSceneNodes = React.forwardRef<THREE.Group, ThreeElements['group']>(
  (props, ref) => {
    const instances = useContext(context);
    return (
      <group {...props} ref={ref} dispose={null}>
        <group
          name="RootNode"
          rotation={[0, 0, 0]}
          scale={0.01}
          userData={{ name: 'RootNode' }}
        >
          <group
            name="Eyes"
            position={[0, 155.8, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
            userData={{ name: 'Eyes' }}
          >
            <instances.EyesEyes
              name="Eyes_Eyes_0"
              userData={{ name: 'Eyes_Eyes_0' }}
            />
          </group>
          <instances.BodyGhostWhite
            name="Body_Ghost_White_0"
            position={[0, 155.8, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
            userData={{ name: 'Body_Ghost_White_0' }}
          />
          <instances.HatHatBlack
            name="Hat_Hat_Black_0"
            position={[0, 299.1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
            userData={{ name: 'Hat_Hat_Black_0' }}
          />
          <instances.RimRimRed
            name="Rim_Rim_Red_0"
            position={[0, 235.4, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
            userData={{ name: 'Rim_Rim_Red_0' }}
          />
        </group>
      </group>
    );
  }
);

GhostSceneNodes.displayName = 'GhostSceneNodes';

type GhostModelProps = {
  isMobile: boolean;
  shouldReduceMotion: boolean;
  scrollYProgress: { get: () => number };
  pointerX: { get: () => number };
  pointerY: { get: () => number };
};

export function GhostModel({
  isMobile,
  shouldReduceMotion,
  scrollYProgress,
  pointerX,
  pointerY,
}: GhostModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const initialized = useRef(false);
  const gltf = useGLTF(MODEL_PATH) as unknown as GLTFResult;

  useEffect(() => {
    return () => {
      Object.values(gltf.nodes).forEach((node) => {
        if (node instanceof THREE.Mesh) {
          node.geometry?.dispose();
        }
      });

      Object.values(gltf.materials).forEach((material) => {
        material?.dispose();
      });

      useGLTF.clear(MODEL_PATH);
    };
  }, [gltf.materials, gltf.nodes]);

  useFrame((state: any) => {
    if (!groupRef.current) return;

    const progress = scrollYProgress.get();
    const isClimax = progress > 0.85;

    // Smooth scale boost as progress approaches climax
    const scaleBoost =
      progress > 0.8 ? THREE.MathUtils.mapLinear(progress, 0.8, 1, 1, 1.15) : 1;

    // Floating animation — DISABLED when reduced motion is active
    const floatFreq = isClimax ? 1.5 : 1.0;
    const floatAmp = isClimax ? 0.15 : 0.22;
    const floating = shouldReduceMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * floatFreq) * floatAmp;

    // Rotation — DISABLED when reduced motion is active
    const rotSpeed = 0.6;
    const rotBoost =
      progress > 0.8 ? THREE.MathUtils.mapLinear(progress, 0.8, 1, 1, 2) : 1;
    const rotationY = shouldReduceMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * rotSpeed * rotBoost) *
        (0.05 + progress * 0.05);

    // Pointer parallax — desktop only, ZEROED on mobile and reduced motion
    const px = shouldReduceMotion || isMobile ? 0 : pointerX.get();
    const py = shouldReduceMotion || isMobile ? 0 : pointerY.get();

    // Desktop: Ghost RIGHT (1.0), drifts to center (0.3) at climax
    // Mobile: Ghost LEFT (-0.8), centers at climax
    const targetX = isMobile
      ? isClimax
        ? 0
        : -0.8
      : isClimax
        ? 0.3 + px * 0.15
        : 1.0 + px * 0.3;

    const targetY = isMobile ? (isClimax ? -0.35 : -0.15) : 0.0 + py * 0.25;

    const baseScale = isMobile ? 0.48 : 0.72;
    const targetScale = baseScale * scaleBoost;

    // Snap on first frame: frameloop="demand" fires frames only per scroll/mousemove event,
    // so lerp from x=0 takes many events to converge — ghost appears centered until then.
    if (!initialized.current) {
      groupRef.current.position.x = targetX;
      groupRef.current.position.y = targetY;
      groupRef.current.scale.setScalar(targetScale);
      initialized.current = true;
    }

    const lerpAlpha = 0.08;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      lerpAlpha
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY + floating,
      lerpAlpha
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotationY,
      lerpAlpha
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      isMobile ? -0.05 : -0.02,
      0.08
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpAlpha)
    );
  });

  return (
    <Instances>
      <GhostSceneNodes ref={groupRef} />
    </Instances>
  );
}

import { useGLTF, Merged } from '@react-three/drei';
import { useFrame, ThreeElements } from '@react-three/fiber';
import React, {
  useMemo,
  useRef,
  useContext,
  createContext,
  useLayoutEffect,
} from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import { GHOST_MATERIAL_CONFIG } from '../beliefs/belief.constants';

const MODEL_PATH = 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb';

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

  useFrame((state: any) => {
    if (!groupRef.current) return;

    const progress = scrollYProgress.get();
    const isClimax = progress > 0.85;

    // Smooth scale boost as progress approaches climax
    const scaleBoost =
      progress > 0.8 ? THREE.MathUtils.mapLinear(progress, 0.8, 1, 1, 1.15) : 1;

    // Animation constants for wow factor
    const floatFreq = isClimax ? 1.5 : 1.0;
    const floatAmp = isClimax ? 0.15 : 0.22;
    const floating = Math.sin(state.clock.elapsedTime * floatFreq) * floatAmp;

    const rotSpeed = 0.6;
    const rotBoost =
      progress > 0.8 ? THREE.MathUtils.mapLinear(progress, 0.8, 1, 1, 2) : 1;
    const rotationY = shouldReduceMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * rotSpeed * rotBoost) *
        (0.05 + progress * 0.05);

    // Dynamic positioning
    // Desktop: Ghost stays right (1.2) and drifts toward center (0.6) at climax
    // to create the "invade levemente" overlap effect with the Manifesto text.
    // Desktop: ghost is center-stage (x≈0), matching reference DESKTOP-INICIAL.jpg.
    // Climax: slight drift toward center as manifesto "invades".
    const targetX = isMobile
      ? isClimax
        ? 0
        : -0.15 // Mobile: closer to center
      : isClimax
        ? 0.0 + pointerX.get() * 0.15 // Desktop climax: stay center
        : shouldReduceMotion
          ? 0.0
          : 0.0 + pointerX.get() * 0.3; // Desktop default: center-stage

    const targetY = isMobile
      ? isClimax
        ? -0.35 // Mobile Climax: lowered
        : -0.15 // Mobile: lowered to stay in viewport
      : shouldReduceMotion
        ? 0.0
        : 0.0 + pointerY.get() * 0.25;

    const baseScale = isMobile ? 0.48 : 0.72;
    const targetScale = baseScale * scaleBoost;
    const lerpAlpha = 0.08; // Softer lerp for more fluid motion

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

if (typeof window !== 'undefined') {
  useGLTF.preload(MODEL_PATH);
}

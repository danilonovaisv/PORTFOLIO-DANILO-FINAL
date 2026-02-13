// GhostModel.tsx
import * as THREE from 'three';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { MotionValue } from 'framer-motion';
import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

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
  isMobile: boolean;
}

const GhostModel: React.FC<GhostModelProps> = ({
  scrollProgress,
  isMobile,
}) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const { asset } = useRealtimeAsset(SITE_ASSET_KEYS.about.beliefs.ghostModel);
  const modelUrl = asset?.publicUrl || GHOST_URL;

  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult;

  const config = useMemo(
    () => ({
      baseX: isMobile ? -viewport.width / 3 : 0,
      startY: isMobile ? viewport.height * 0.17 : 0,
      baseScale: isMobile ? 0.22 : 0.585,
      modelOffsetY: isMobile ? 0 : -1.9,
      scaleBoost: 0.1, // 10% boost at end
    }),
    [isMobile, viewport.width, viewport.height]
  );

  const [hovered, setHover] = useState(false);
  const isFinalPhase = useRef(false);

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (val) => {
      // Logic for phases if needed outside useFrame
      if (val > 0.8 && !isFinalPhase.current) {
        isFinalPhase.current = true;
      } else if (val <= 0.8 && isFinalPhase.current) {
        isFinalPhase.current = false;
      }
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  useFrame((state) => {
    if (!group.current) return;

    // 1. Scroll Progress
    const scroll = scrollProgress.get();
    const t = Math.min(1, Math.max(0, scroll));

    // 2. Base Transforms (LERP)
    // Scale Logic: Base -> Boost at >0.8
    const finalScaleBoost = t > 0.8 ? (t - 0.8) * 5 * config.scaleBoost : 0; // 0 to 0.1
    const targetScale = config.baseScale * (1 + finalScaleBoost);

    // Use LERP menor quando t >= 0.95 para manter valores finais
    const lerpFactor = t >= 0.95 ? 0.02 : 0.1;
    group.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      lerpFactor
    );

    // Position Logic
    let targetX = config.baseX;
    let targetY = config.startY;
    let targetZ = 0;

    // Mobile specific override
    if (isMobile) {
      // Mobile: Ghost stays left
    } else {
      // Desktop: Follow cursor logic
      const mouseX = state.mouse.x * 2; // -1 to 1 range (roughly)
      const mouseY = state.mouse.y * 2;

      // LERP Mouse follow
      targetX += mouseX * 0.5; // Move slightly with mouse
      targetY += mouseY * 0.5;
    }

    // Scroll Sync: Z-approach at end
    if (t > 0.8) {
      // Move closer by +2 units at end, scaled by remaining scroll
      const zBoost = (t - 0.8) * 5 * 2;
      targetZ += zBoost;
    }

    // Direct component LERP to avoid Vector3 allocation per frame (Rule #21)
    // Use LERP menor quando t >= 0.95 para manter posição final
    const posLerpFactor = t >= 0.95 ? 0.02 : 0.05;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      posLerpFactor
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      posLerpFactor
    );
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      posLerpFactor
    );

    // 3. Rotation Logic
    // Base rotation Y starts at -PI/2 or similar? GLTFs differ. Assuming 0 is front.
    // Scroll creates slow Y rotation
    const scrollRotY = t * Math.PI * 0.5; // Rotate 90deg over scroll

    // Mouse Tilt (Desktop only)
    const tiltX = isMobile ? 0 : state.mouse.y * 0.2;
    const tiltY = isMobile ? 0 : state.mouse.x * 0.2;

    // Wobble (Hover or Final Phase)
    const time = state.clock.getElapsedTime();
    const isWobbling = (hovered && !isMobile) || t > 0.8;
    const wobbleIntensity = isWobbling ? 0.2 : 0.05;
    const wobbleX = Math.sin(time * 3) * wobbleIntensity;
    const wobbleZ = Math.cos(time * 2) * wobbleIntensity;

    const targetRotX = tiltX + wobbleX * 0.5;
    const targetRotY = scrollRotY + tiltY + wobbleX;
    const targetRotZ = wobbleZ * 0.5;

    // Apply Rotation Lerp (Direct)
    // Use LERP menor quando t >= 0.95 para manter rotação final
    const rotLerpFactor = t >= 0.95 ? 0.02 : 0.1;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      rotLerpFactor
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY,
      rotLerpFactor
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetRotZ,
      rotLerpFactor
    );
  });

  return (
    <group
      ref={group}
      dispose={null}
      onPointerOver={() => !isMobile && setHover(true)}
      onPointerOut={() => !isMobile && setHover(false)}
    >
      <group position={[0, config.modelOffsetY, 0]}>
        <Float
          speed={hovered ? 4 : 2} // Faster float on hover
          rotationIntensity={hovered ? 1.5 : 0.5}
          floatIntensity={hovered ? 1.5 : 0.5}
        >
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
        </Float>
      </group>
    </group>
  );
};

// Only preload in browser environment
if (typeof window !== 'undefined') {
  useGLTF.preload(GHOST_URL);
}

export default GhostModel;

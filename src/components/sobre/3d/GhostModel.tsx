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
      scaleBoost: 0.1, // Exactly 10% boost at end
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
    // "aumentar 10% do tamanho anterior"
    const progressInFinalPhase = t > 0.8 ? (t - 0.8) * 5 : 0; // 0 to 1
    const finalScaleBoost = progressInFinalPhase * config.scaleBoost;
    const targetScale = config.baseScale * (1 + finalScaleBoost);

    // Use LERP consistente para garantir reset suave
    const lerpFactor = 0.1;
    group.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      lerpFactor
    );

    // Position Logic
    let targetX = config.baseX;
    let targetY = config.startY;
    let targetZ = 0;

    // "quando ele vai para o centro e dança"
    // Move X to 0 (Center) during final phase
    if (progressInFinalPhase > 0) {
      targetX = THREE.MathUtils.lerp(
        config.baseX,
        0, // Target Center X
        progressInFinalPhase
      );
    }

    if (!isMobile) {
      // Desktop: Follow cursor logic
      const mouseX = state.mouse.x * 2;
      const mouseY = state.mouse.y * 2;

      targetX += mouseX * 0.5;
      targetY += mouseY * 0.5;
    }

    // Scroll Sync: Z-approach at end
    if (progressInFinalPhase > 0) {
      // Move closer by +2 units at end
      const zBoost = progressInFinalPhase * 2;
      targetZ += zBoost;
    }

    // Direct component LERP
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      0.05
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      0.05
    );
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      0.05
    );

    // 3. Rotation Logic
    const scrollRotY = t * Math.PI * 0.5;

    const tiltX = isMobile ? 0 : state.mouse.y * 0.2;
    const tiltY = isMobile ? 0 : state.mouse.x * 0.2;

    // Wobble (Hover or Final Phase)
    const time = state.clock.getElapsedTime();
    const isWobbling = (hovered && !isMobile) || t > 0.8;
    const wobbleIntensity = isWobbling ? 0.2 : 0.05;

    // Reset wobble smoothly implies reducing intensity if not wobbling, handled by ternary
    const wobbleX = Math.sin(time * 3) * wobbleIntensity;
    const wobbleZ = Math.cos(time * 2) * wobbleIntensity;

    const targetRotX = tiltX + wobbleX * 0.5;
    const targetRotY = scrollRotY + tiltY + wobbleX;
    const targetRotZ = wobbleZ * 0.5;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      0.1
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetRotZ,
      0.1
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
          speed={hovered ? 4 : 2}
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

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';

const GhostModel = ({
  activeIndex,
  totalSections,
  isMobile,
}: {
  activeIndex: number;
  totalSections: number;
  isMobile: boolean;
}) => {
  const { scene } = useGLTF(MODEL_URL);
  const modelRootRef = useRef<THREE.Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const { model, center, maxDimension } = useMemo(() => {
    const clonedModel = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clonedModel);
    const centerPoint = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(centerPoint);
    box.getSize(size);

    return {
      model: clonedModel,
      center: centerPoint,
      maxDimension: Math.max(size.x, size.y, size.z) || 1,
    };
  }, [scene]);

  useEffect(() => {
    if (isMobile) return;

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [isMobile]);

  useFrame((state, delta) => {
    const root = modelRootRef.current;
    if (!root) return;

    const isFinalSection = activeIndex >= totalSections - 1;
    const normalizedProgress = Math.min(
      activeIndex / Math.max(totalSections - 1, 1),
      1
    );
    const wobble =
      0.035 * Math.sin(state.clock.elapsedTime * 1.8 + normalizedProgress * 2);

    const desiredSize = isMobile
      ? isFinalSection
        ? 1.25
        : 0.72
      : isFinalSection
        ? 1.62
        : 0.92;

    const scaleTarget = desiredSize / maxDimension;
    const xTarget = isMobile
      ? isFinalSection
        ? -0.04
        : -0.34
      : isFinalSection
        ? -0.02
        : -0.88;
    const yTarget = isMobile
      ? isFinalSection
        ? -0.02
        : -0.3
      : isFinalSection
        ? -0.04
        : -0.22;

    const rotationInfluenceX = isMobile ? 0 : pointerRef.current.x * 0.08;
    const rotationInfluenceY = isMobile ? 0 : pointerRef.current.y * 0.05;

    root.position.x = THREE.MathUtils.lerp(
      root.position.x,
      xTarget,
      delta * 4.2
    );
    root.position.y = THREE.MathUtils.lerp(
      root.position.y,
      yTarget + wobble,
      delta * 4.2
    );
    root.position.z = 0;

    root.scale.x = THREE.MathUtils.lerp(root.scale.x, scaleTarget, delta * 4.2);
    root.scale.y = THREE.MathUtils.lerp(root.scale.y, scaleTarget, delta * 4.2);
    root.scale.z = THREE.MathUtils.lerp(root.scale.z, scaleTarget, delta * 4.2);

    root.rotation.x = THREE.MathUtils.lerp(
      root.rotation.x,
      -rotationInfluenceY,
      delta * 3.6
    );
    root.rotation.y = THREE.MathUtils.lerp(
      root.rotation.y,
      0.08 * Math.sin(state.clock.elapsedTime * 0.7) + rotationInfluenceX,
      delta * 3.6
    );
    root.rotation.z = THREE.MathUtils.lerp(
      root.rotation.z,
      rotationInfluenceX * -0.16,
      delta * 3.6
    );
  });

  return (
    <group ref={modelRootRef} position={[0, 0, 0]}>
      <primitive object={model} position={[-center.x, -center.y, -center.z]} />
    </group>
  );
};

export const Ghost3D = ({
  activeIndex,
  totalSections,
}: {
  activeIndex: number;
  totalSections: number;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobileState = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    updateMobileState();
    window.addEventListener('resize', updateMobileState);
    return () => window.removeEventListener('resize', updateMobileState);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.8], fov: 40 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[3, 4, 6]} intensity={1.3} />
        <directionalLight
          position={[-3, 1.5, 4]}
          intensity={0.45}
          color="#dbe6ff"
        />
        <GhostModel
          activeIndex={activeIndex}
          totalSections={totalSections}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
};

useGLTF.preload(MODEL_URL);

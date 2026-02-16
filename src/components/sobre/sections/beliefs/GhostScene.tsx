'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

function GhostModel() {
  // Asset moved to public/models/ghost.glb
  const { scene } = useGLTF('/models/ghost.glb');

  useEffect(() => {
    // Optional: Traverse logic if needed for shadows or materials
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

// Preload the asset
useGLTF.preload('/models/ghost.glb');

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

export default function GhostScene({
  scrollProgress: _scrollProgress,
}: GhostSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none"
    >
      <Suspense fallback={null}>
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={1}
          floatingRange={[-0.1, 0.1]}
        >
          {/* 
            Adjust rotation/position to face camera comfortably.
            The user requested "Align Ghost to center of active text",
            but since text is centered or fixed, we center the ghost in the canvas 
            and let the canvas positioning handle the "follow" or placement.
           */}
          <group position={[0, -0.5, 0]} rotation={[0, 0.3, 0]}>
            <GhostModel />
          </group>
        </Float>

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
      </Suspense>
    </Canvas>
  );
}

'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';
import * as THREE from 'three';

/**
 * GLB Asset: Use local public path (works in both dev and production builds).
 * The file exists at /public/models/ghost.glb
 * 
 * Supabase fallback (if needed):
 * https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb
 */
const GHOST_GLB_URL = '/models/ghost.glb';

function GhostModel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const { scene } = useGLTF(GHOST_GLB_URL);
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  // Pre-allocated objects for useFrame (Zero Allocation in Loop per rule 21)
  const targetRotation = useRef(new THREE.Euler(0, 0.3, 0));
  const targetScale = useRef(1);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useMotionValueEvent(scrollProgress, 'change', (v) => {
    scrollRef.current = v;
  });

  useFrame(() => {
    if (!groupRef.current) return;
    const t = scrollRef.current;

    // Rotation: light Y rotation influenced by scroll
    targetRotation.current.set(0, 0.3 + t * 0.5, 0);

    // Scale: after 80% scroll, grow to 1.1
    const scaleT = t > 0.8 ? 1 + (t - 0.8) * 0.5 : 1;
    targetScale.current = scaleT;

    // Apply with LERP for smooth transitions
    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.z += (targetRotation.current.z - groupRef.current.rotation.z) * 0.08;

    const currentScale = groupRef.current.scale.x;
    const newScale = currentScale + (targetScale.current - currentScale) * 0.08;
    groupRef.current.scale.setScalar(newScale);
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} rotation={[0, 0.3, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Preload both paths to ensure availability
useGLTF.preload(GHOST_GLB_URL);

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

/**
 * Ghost 3D Canvas — Layer 5 per spec.
 * 
 * Key behaviors:
 * - Float animation for constant gentle motion ("Ghost nunca para")
 * - Scroll-synced Y rotation
 * - Scale intensification after 80% scroll progress  
 * - position/rotation respond to scroll via useFrame (no re-renders)
 * 
 * WebGL fallback: renders empty transparent div if WebGL fails.
 */
export default function GhostScene({ scrollProgress }: GhostSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      className="pointer-events-none"
      aria-label="Ilustração 3D de um fantasma estilizado representando o conceito Ghost Design."
      onCreated={({ gl }) => {
        // Ensure transparent background
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={1}
          floatingRange={[-0.1, 0.1]}
        >
          <GhostModel scrollProgress={scrollProgress} />
        </Float>

        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
      </Suspense>
    </Canvas>
  );
}

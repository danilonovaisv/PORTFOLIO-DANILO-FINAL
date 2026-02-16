'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';
import * as THREE from 'three';

const GHOST_GLB_URL = '/models/ghost.glb';

function GhostModel({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const { scene } = useGLTF(GHOST_GLB_URL);
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);
  const isMobileRef = useRef(false);

  // Pre-allocated objects for clean loop
  const targetRotation = useRef(new THREE.Euler(0, 0.3, 0));
  const targetScale = useRef(1);
  const mouseLerp = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    // Check mobile once on mount
    const checkMobile = () => {
      isMobileRef.current = window.matchMedia('(max-width: 768px)').matches;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = scrollRef.current;

    /**
     * ROTATION LOGIC
     * - Base: slight offset (0.3 rad) + scroll influence
     * - Desktop: Mouse follow (pointer x/y)
     * - Mobile: Idle only (no mouse follow)
     */
    let mouseX = 0;
    let mouseY = 0;

    if (!isMobileRef.current) {
      // Smooth lerp for mouse input
      mouseLerp.current.x = THREE.MathUtils.lerp(
        mouseLerp.current.x,
        state.pointer.x,
        0.1
      );
      mouseLerp.current.y = THREE.MathUtils.lerp(
        mouseLerp.current.y,
        state.pointer.y,
        0.1
      );

      mouseX = mouseLerp.current.x * 0.5; // Sensitivity
      mouseY = mouseLerp.current.y * 0.2;
    }

    // Spec 5.1 Desktop: "Ghost: Segue levemente o cursor"
    // Spec 5.2 Mobile: "Ghost: ... sem follow mouse"
    targetRotation.current.set(
      mouseY * 0.5, // Look up/down slightly
      0.3 + t * 2.5 + mouseX, // Rotate Y with scroll + mouse
      0 // Minimal Z tilt
    );

    /**
     * SCALE LOGIC
     * - Trigger starts at 82% scroll
     */
    const scaleT = t > 0.82 ? 1 + (t - 0.82) * 1.5 : 1;
    targetScale.current = scaleT;

    /**
     * POSITION LOGIC (NEW)
     * - Desktop: Start Left (x: -1.5) to clear Right Text. animate to Center (x: 0) on Manifesto.
     * - Mobile: Always Center (x: 0), slightly lower y.
     */
    const TARGET_X_DESKTOP = -1.5;

    // Calculate Target Position
    let targetX = 0;
    let targetY = -0.5;

    if (isMobileRef.current) {
      // Mobile Spec: Top-Left, 20% down.
      // R3F Coords approx: x=-1.2 (Left), y=1.3 (Top).
      // Scale adjusted to 0.7 to fit comfortably without overwhelming text.
      targetX = -1.2;
      targetY = 1.3;
      targetScale.current = 0.7; // Override scaleT for mobile base size?
      // Actually scaleT is dynamic based on scroll. Let's multiply or just set base.
      // If we want the scale animation (manifesto) to still work, we should apply it to 'scaleT'.
      // But scaleT is calculated above. Let's adjust scaleT for mobile.
      const mobileScaleT = t > 0.82 ? 0.7 + (t - 0.82) * 1.5 : 0.7;
      targetScale.current = mobileScaleT;
    } else {
      // Desktop:
      // t < 0.8: x = -1.5 (Left)
      // t > 0.8: Lerp to x = 0 (Center)
      const transitionProgress = t > 0.8 ? (t - 0.8) / 0.2 : 0;
      // Clamp transition to 0-1
      const clampedTransition = Math.min(Math.max(transitionProgress, 0), 1);
      targetX = THREE.MathUtils.lerp(TARGET_X_DESKTOP, 0, clampedTransition);
      targetY = -0.5;
    }

    // Apply smooth lerp to position
    const ease = 0.08;
    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * ease;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * ease;

    // Apply Rotation & Scale
    groupRef.current.rotation.x +=
      (targetRotation.current.x - groupRef.current.rotation.x) * ease;
    groupRef.current.rotation.y +=
      (targetRotation.current.y - groupRef.current.rotation.y) * ease;
    groupRef.current.rotation.z +=
      (targetRotation.current.z - groupRef.current.rotation.z) * ease;

    const currentScale = groupRef.current.scale.x;
    const newScale = currentScale + (targetScale.current - currentScale) * ease;
    groupRef.current.scale.setScalar(newScale);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0, 0.3, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(GHOST_GLB_URL);

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

export default function GhostScene({ scrollProgress }: GhostSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      className="pointer-events-none"
      aria-label="Ilustração 3D de um fantasma estilizado."
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>
        <Float
          speed={2.5}
          rotationIntensity={0.2}
          floatIntensity={1.5}
          floatingRange={[-0.1, 0.1]}
        >
          <GhostModel scrollProgress={scrollProgress} />
        </Float>

        {/* Cinematic Lighting matching Ghost Atmosphere - Boosted for visibility */}
        <ambientLight intensity={0.6} color="#ccccff" />
        <spotLight
          position={[5, 5, 5]}
          angle={0.5}
          penumbra={1}
          intensity={1.5}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#0048ff" />
        <RimLight />
      </Suspense>
    </Canvas>
  );
}

// Extra rim light for style
function RimLight() {
  return (
    <spotLight
      position={[0, 5, -5]}
      intensity={2}
      color="#4fe6ff" // blueAccent
      distance={10}
    />
  );
}

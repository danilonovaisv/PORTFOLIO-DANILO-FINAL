'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
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
  const mouseRef = useRef(new THREE.Vector2(0, 0)); // Global mouse tracker

  // Pre-allocated objects for clean loop
  const targetRotation = useRef(new THREE.Euler(0, 0.3, 0));
  const targetScale = useRef(1);
  const mouseLerp = useRef(new THREE.Vector2(0, 0));

  // Simulation Time for floating
  const time = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Check mobile once on mount
    const checkMobile = () => {
      isMobileRef.current = window.matchMedia('(max-width: 768px)').matches;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Mouse listener: works even if Canvas handles pointer-events poorly
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.set(x, y);
    };

    if (!isMobileRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = scrollRef.current;

    // Constant time flow for floating (never stops)
    time.current += delta;

    // --- ENTRY FADE (1.2s) ---
    const elapsed = Date.now() - startTime.current;
    const entryProgress = Math.min(elapsed / 1200, 1);
    // Smooth easing for entry
    const entryEase = 1 - Math.pow(1 - entryProgress, 3);

    // --- ENERGY SYSTEM ---
    // Phrases are approx 0 -> 0.82.
    // 6 Phrases. Each adds energy.
    // Base: 1. Max (Manifesto): 2.5.
    const phraseProgress = Math.min(t / 0.82, 1);
    const intensity = 1 + phraseProgress * 1.5;

    // "Última frase ... movimento mais intenso"
    // At end of phrases (t ~ 0.8), boost speed
    const movementSpeed = 1.0 * intensity;
    const movementAmp = 0.1 * intensity;

    // "Flutuação constante" + "Movimento lateral leve"
    const floatY = Math.sin(time.current * movementSpeed) * movementAmp;
    const floatX = Math.cos(time.current * movementSpeed * 0.7) * (movementAmp * 0.6);

    // "Responde ao cursor (desktop)" vs "Responde ao scroll (mobile)"
    let rotationY = 0.3; // Base rotation
    let rotationX = 0;

    if (isMobileRef.current) {
      // Mobile: Scroll influence on rotation to feel "alive"
      rotationY += t * 2.0;
    } else {
      // Desktop: Mouse/Cursor influence
      // Smooth lerp for mouse
      mouseLerp.current.x = THREE.MathUtils.lerp(mouseLerp.current.x, mouseRef.current.x, 0.1);
      mouseLerp.current.y = THREE.MathUtils.lerp(mouseLerp.current.y, mouseRef.current.y, 0.1);

      rotationY += mouseLerp.current.x * 0.5;
      rotationX = -mouseLerp.current.y * 0.2;
    }

    // Apply Rotation (with floating tilt)
    // "Nunca completamente parado" -> Add noise/sway
    targetRotation.current.set(
      rotationX + floatY * 0.2, // Tilt based on vertical float
      rotationY + Math.sin(time.current * 0.3) * 0.1, // Slow breathe rotate
      Math.sin(time.current * 0.5) * 0.05 // Subtle Z sway
    );

    // --- POSITIONING LOGIC ---
    let targetX = 0;
    let targetY = 0; // Center default (0,0,0)

    if (isMobileRef.current) {
      // Mobile: Sticky Top-Left (20% top). 
      // At z=6 camera, 20% top is approx y=1.5
      // X=-1.0 puts it on left edge
      const mobileStartX = -1.0;
      const mobileStartY = 1.5;

      // "Vai para o centro da pagina na ultima sessão" (Manifesto > 0.82)
      if (t > 0.82) { // Manifesto Transition
        const transition = (t - 0.82) / 0.18; // 0..1 in final section
        const easeTransition = Math.min(transition, 1);

        targetX = THREE.MathUtils.lerp(mobileStartX, 0, easeTransition);
        targetY = THREE.MathUtils.lerp(mobileStartY, 0, easeTransition);
      } else {
        targetX = mobileStartX;
        targetY = mobileStartY;
      }
    } else {
      // Desktop: "Posicionado centralizado no eixo horizontal e vertical"
      // Container is now w-full, so x=0 is true center.
      // y=-0.5 aligns with visual center better
      targetX = 0;
      targetY = -0.5;
    }

    // Add float offsets
    targetX += floatX;
    targetY += floatY;

    // --- SCALE LOGIC ---
    // Reduced Base Scale (User: "Muito grande")
    // Entry: 0.75 -> 0.8 (Fade handled by opacity/scale mix)
    let baseScale = 0.75 + (0.05 * entryEase);

    if (t > 0.82) {
      // "Escala +10%" -> 0.88
      const transition = Math.min((t - 0.82) / 0.1, 1);
      baseScale = 0.8 + (0.08 * transition);
    }

    // Add "Breathing"
    // "Cada nova frase aumenta levemente energia" -> Breath gets deeper
    const breath = Math.sin(time.current * movementSpeed) * (0.02 * intensity);
    targetScale.current = baseScale + breath;

    // --- INTERPOLATION ---
    const ease = 0.08;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * ease;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * ease;

    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * ease;
    groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * ease;
    groupRef.current.rotation.z += (targetRotation.current.z - groupRef.current.rotation.z) * ease;

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
        <GhostModel scrollProgress={scrollProgress} />

        {/* Cinematic Lighting matching Ghost Atmosphere - Boosted for visibility */}
        <ambientLight intensity={1.5} color="#ccccff" />
        <spotLight
          position={[5, 5, 5]}
          angle={0.5}
          penumbra={1}
          intensity={3.0}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-5, -5, -5]} intensity={2.0} color="#0048ff" />
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

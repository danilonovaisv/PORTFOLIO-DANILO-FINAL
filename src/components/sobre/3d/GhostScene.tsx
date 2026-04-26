'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef, Suspense } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'motion/react';
import type { BufferGeometry, Group, Material, Mesh, Object3D } from 'three';
import { useBeliefStore } from '@/store/beliefStore';

const LOCAL_GHOST_GLB_URL = '/site.assets/3d/ghost-v1.glb';
const SUPABASE_GHOST_GLB_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL
    ? `${(
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL ||
        ''
      ).replace(
        /\/$/,
        ''
      )}/storage/v1/object/public/site-assets/3d/ghost-v1.glb`
    : LOCAL_GHOST_GLB_URL;

if (typeof window !== 'undefined') {
  useGLTF.preload(SUPABASE_GHOST_GLB_URL);
}

interface GhostModelProps {
  scrollProgress: MotionValue<number>;
}

function GhostModel({ scrollProgress }: GhostModelProps) {
  const { scene } = useGLTF(SUPABASE_GHOST_GLB_URL);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const meshRef = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);
  const isMobile = useBeliefStore((s) => s.isMobile);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);

  // Ref-based subscription for ghostIntensity — avoids getState() per frame
  const ghostIntensityRef = useRef(0);
  useEffect(() => {
    // Initialize
    ghostIntensityRef.current = useBeliefStore.getState().ghostIntensity;
    // Subscribe to changes only
    const unsub = useBeliefStore.subscribe((state) => {
      ghostIntensityRef.current = state.ghostIntensity;
    });
    return unsub;
  }, []);

  // Motion Values for Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring Physics configured for high-fidelity responsiveness
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 30 });
  const smoothScroll = useSpring(scrollProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubScroll = smoothScroll.on('change', () => invalidate());
    const unsubX = smoothMouseX.on('change', () => invalidate());
    const unsubY = smoothMouseY.on('change', () => invalidate());

    return () => {
      unsubScroll();
      unsubX();
      unsubY();
    };
  }, [invalidate, smoothScroll, smoothMouseX, smoothMouseY]);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleMove = (e: PointerEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set(-(e.clientY / window.innerHeight) * 2 + 1);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });

    return () => window.removeEventListener('pointermove', handleMove);
  }, [isMobile, prefersReducedMotion, mouseX, mouseY]);

  useEffect(() => {
    return () => {
      clonedScene.traverse((obj: Object3D) => {
        const mesh = obj as Object3D & {
          geometry?: BufferGeometry;
          material?: Material | Material[];
        };

        mesh.geometry?.dispose();

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material?.dispose();
        }
      });
    };
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const p = ghostIntensityRef.current;
    const isClimax = p > 0.85;
    const targetX = isClimax ? 0 : isMobile ? -1.2 : 0;
    const targetY = isClimax ? 0 : isMobile ? 1.5 : 0;
    const lerpFactor = Math.min(delta * 8, 0.15);

    // Parallax via Springs instead of raw mouse values
    const parallaxX =
      !prefersReducedMotion && !isMobile ? smoothMouseX.get() * 0.4 : 0;
    const parallaxY =
      !prefersReducedMotion && !isMobile ? smoothMouseY.get() * 0.2 : 0;

    meshRef.current.position.x +=
      (targetX + parallaxX - meshRef.current.position.x) * lerpFactor;
    meshRef.current.position.y +=
      (targetY + parallaxY - meshRef.current.position.y) * lerpFactor;

    // Scroll rotation mapping
    const s = smoothScroll.get();
    const baseRotationY = s * Math.PI * 0.5; // Rotate 90deg over the full scroll range

    if (!prefersReducedMotion) {
      const floatSpeed = 0.6 + p * 0.6;
      const floatAmp = 0.036 + p * 0.03;
      meshRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmp;
      meshRef.current.rotation.y =
        baseRotationY +
        Math.sin(state.clock.elapsedTime * 0.4 * (0.4 + p * 0.4)) *
          (0.06 + p * 0.04);
    } else {
      meshRef.current.rotation.y = baseRotationY;
    }

    const targetScale = isClimax
      ? isMobile
        ? 1
        : 1.05
      : isMobile
        ? 0.9
        : 0.95;
    meshRef.current.scale.x +=
      (targetScale - meshRef.current.scale.x) * lerpFactor;
    meshRef.current.scale.y = meshRef.current.scale.x;
    meshRef.current.scale.z = meshRef.current.scale.x;

    // Manifesto phase fade-out (FP-04): reduce Ghost opacity when manifesto takes over
    if (p > 0.82) {
      const manifestoFade = Math.max(0, 1 - (p - 0.82) / 0.18);
      meshRef.current.traverse((child: Object3D) => {
        const mesh = child as Mesh;
        if (mesh.material && 'opacity' in mesh.material) {
          mesh.material.opacity = manifestoFade;
          mesh.material.transparent = true;
        }
      });
    }
  });

  return <primitive object={clonedScene} ref={meshRef} />;
}

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

export function GhostScene({ scrollProgress }: GhostSceneProps) {
  const isMobile = useBeliefStore((s) => s.isMobile);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);

  // Mobile + reduced motion: skip entire 3D scene for performance
  if (isMobile && prefersReducedMotion) return null;

  return (
    <div
      className="sticky md:top-0 top-[20vh] h-[100dvh] w-full z-[70] pointer-events-none"
      data-testid="beliefs-ghost-scene"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, isMobile ? 1 : 1.5]}
        camera={{ position: [0, 0, isMobile ? 7 : 6], fov: 35 }}
        frameloop="demand"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: true,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <GhostModel scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

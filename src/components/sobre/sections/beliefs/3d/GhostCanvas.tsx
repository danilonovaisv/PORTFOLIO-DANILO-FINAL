'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense,
  type ReactNode,
} from 'react';
import { useSpring, type MotionValue } from 'motion/react';
import {
  MathUtils,
  type BufferGeometry,
  type Group,
  type Material,
  type Mesh,
  type Object3D,
} from 'three';
import { useBeliefStore } from '@/store/beliefStore';
import { GhostFallback } from '@/components/sobre/sections/beliefs/3d/GhostFallback';
import { useWebGLAvailable } from '@/components/sobre/sections/beliefs/3d/useWebGLAvailable';

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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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

  const smoothScroll = useSpring(scrollProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubScroll = smoothScroll.on('change', () => invalidate());
    const handleScroll = () => invalidate();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      unsubScroll();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [invalidate, smoothScroll]);

  useEffect(() => {
    const query = window.matchMedia('(hover: none), (pointer: coarse)');
    const syncTouchMode = () => setIsTouchDevice(query.matches);

    syncTouchMode();
    query.addEventListener('change', syncTouchMode);

    return () => query.removeEventListener('change', syncTouchMode);
  }, []);

  useEffect(() => {
    if (isMobile || isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = () => invalidate();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [invalidate, isMobile, isTouchDevice, prefersReducedMotion]);

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

  useFrame((state) => {
    if (!meshRef.current) return;

    const p = ghostIntensityRef.current;
    const isClimax = p > 0.85;
    const s = smoothScroll.get();

    // Ghost-System v3.0: Responsive Positioning
    // Mobile: Centered horizontally (0) and shifted up (0.8) to sit below the top header
    // Desktop: Shift left (-0.8) to balance between the left animated text and right fixed text
    const targetX = isClimax ? 0 : isMobile ? 0 : -0.8;
    const targetY =
      (isClimax ? 0 : isMobile ? 0.8 : 0) +
      (isMobile || isTouchDevice ? s * 0.8 : 0);
    const pointerTrackingEnabled =
      !prefersReducedMotion && !isMobile && !isTouchDevice;
    const baseRotationY = s * Math.PI * 0.5; // Rotate 90deg over the full scroll range

    if (prefersReducedMotion) {
      meshRef.current.position.x = targetX;
      meshRef.current.position.y = targetY;
      meshRef.current.rotation.y = baseRotationY;
    } else {
      const pointerTargetX = pointerTrackingEnabled
        ? targetX + state.pointer.x * 2
        : targetX;

      meshRef.current.position.x = MathUtils.lerp(
        meshRef.current.position.x,
        pointerTargetX,
        pointerTrackingEnabled ? 0.05 : 0.08
      );
      meshRef.current.position.y = MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        0.08
      );
      meshRef.current.rotation.y = MathUtils.lerp(
        meshRef.current.rotation.y,
        baseRotationY,
        0.08
      );
    }

    const targetScale = isClimax
      ? isMobile
        ? 1.2
        : 1.35
      : isMobile
        ? 0.95
        : 1.05;

    if (prefersReducedMotion) {
      meshRef.current.scale.setScalar(targetScale);
    } else {
      meshRef.current.scale.x = MathUtils.lerp(
        meshRef.current.scale.x,
        targetScale,
        0.08
      );
    }

    meshRef.current.scale.y = meshRef.current.scale.x;
    meshRef.current.scale.z = meshRef.current.scale.x;

    // Manifesto phase fade-out (FP-04): reduce Ghost opacity when manifesto takes over
    const manifestoFade = p > 0.82 ? Math.max(0, 1 - (p - 0.82) / 0.18) : 1;

    meshRef.current.traverse((child: Object3D) => {
      const mesh = child as Mesh;
      if (!mesh.material) return;

      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      materials.forEach((material) => {
        material.opacity = manifestoFade;
        material.transparent = manifestoFade < 1;
      });
    });
  });

  return (
    <Float
      speed={2}
      floatIntensity={prefersReducedMotion ? 0 : 1.5}
      rotationIntensity={prefersReducedMotion ? 0 : 0.5}
      autoInvalidate={!prefersReducedMotion}
    >
      <primitive object={clonedScene} ref={meshRef} />
    </Float>
  );
}

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

function GhostSceneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="sticky md:top-0 top-[20vh] h-[100dvh] w-full z-[70] pointer-events-none"
      data-testid="beliefs-ghost-scene"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export function GhostCanvas({ scrollProgress }: GhostSceneProps) {
  const isMobile = useBeliefStore((s) => s.isMobile);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);
  const webGLAvailable = useWebGLAvailable();

  // Mobile + reduced motion: skip entire 3D scene for performance
  if (isMobile && prefersReducedMotion) {
    return (
      <GhostSceneFrame>
        <GhostFallback />
      </GhostSceneFrame>
    );
  }

  if (webGLAvailable === null) {
    return (
      <GhostSceneFrame>
        <GhostFallback mode="loading" />
      </GhostSceneFrame>
    );
  }

  if (!webGLAvailable) {
    return (
      <GhostSceneFrame>
        <GhostFallback />
      </GhostSceneFrame>
    );
  }

  return (
    <GhostSceneFrame>
      <Canvas
        dpr={[1, isMobile ? 1 : 1.5]}
        camera={{ position: [0, 0, isMobile ? 7 : 6], fov: 35 }}
        frameloop="demand"
        onCreated={({ gl }) => {
          // Detect if major performance caveat or failure
          if (gl.getContext().isContextLost()) {
            console.warn(
              'Ghost System: WebGL context lost or slow. Fallback triggered.'
            );
          }
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <GhostModel scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </GhostSceneFrame>
  );
}

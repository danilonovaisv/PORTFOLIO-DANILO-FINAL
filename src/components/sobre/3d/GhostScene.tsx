'use client';

/**
 * GhostScene — Canvas R3F da Seção 06 "O Que Me Move".
 *
 * CORREÇÕES v3:
 * • z-70 (NÃO z-50) — GhostScene z-70 > Manifesto z-50 (Ghost permanece ACIMA do Manifesto).
 * • Cursor Parallax consumido globalmente via beliefStore (CustomCursor).
 * • Neutralização da influência do cursor durante o clímax (p > 0.85).
 * • position: fixed + inset-0 — modelo permanece centralizado durante scroll.
 * • frameloop="demand" + invalidate via scrollProgress.on('change') — 0 frames
 *   desperdiçados quando a seção não está ativa.
 * • GLB path via getAssetUrl() — fonte única em @/lib/utils (KI-001, KI-005).
 * • Lerp determinístico no useFrame (sem Math.random, sem stutter acumulado).
 * • Cleanup: scene.traverse → dispose geometry + material ao desmontar.
 * • Mobile: posição topo-esquerda (x: -1.2, y: 1.5) → centro no clímax final.
 *
 * Fonte: R3F docs — frameloop demand, disposal, useFrame best practices.
 */

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { BufferGeometry, Group, Material, Object3D } from 'three';
import { getAssetUrl } from '@/lib/utils';
import { GhostErrorBoundary } from '@/components/sobre/3d/GhostErrorBoundary';
import { cursorX, cursorY } from '@/store/beliefStore';

// Path validado contra Supabase Storage (Task 1).
const GHOST_GLB_URL = getAssetUrl('site-assets/3d/ghost-v1.glb', {
  isVideo: true,
});

// Preload fora do render tree para não re-disparar em re-mounts
useGLTF.preload(GHOST_GLB_URL);

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface GhostModelProps {
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

// ─── GhostModel ───────────────────────────────────────────────────────────────
const GhostModel = ({
  scrollProgress,
  isMobile,
  prefersReducedMotion,
}: GhostModelProps) => {
  const { scene } = useGLTF(GHOST_GLB_URL);
  const groupRef = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  // Re-renderiza sob demanda ao mudar o scrollProgress ou o cursor global
  useEffect(() => {
    const unsubScroll = scrollProgress.on('change', () => invalidate());
    const unsubX = cursorX.on('change', () => invalidate());
    const unsubY = cursorY.on('change', () => invalidate());
    return () => {
      unsubScroll();
      unsubX();
      unsubY();
    };
  }, [scrollProgress, invalidate]);

  // Cleanup de memória ao desmontar (previne WebGL memory leak)
  useEffect(() => {
    return () => {
      scene.traverse((obj: Object3D) => {
        const mesh = obj as Object3D & {
          geometry?: BufferGeometry;
          material?: Material | Material[];
        };
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material?.dispose();
        }
      });
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const p = scrollProgress.get();
    const lerpFactor = Math.min(delta * 8, 0.15); // cap para 60fps estáveis

    // ── Scale ──────────────────────────────────────────────────────────────
    // Mobile: base 90%, clímax +10%. Desktop: base 95%, clímax +5%.
    // No clímax (p > 0.85), adicionamos +10% de boost como exigido na Task 5.
    const baseScale = isMobile ? 0.9 : 0.95;
    const scaleBoost = p > 0.85 ? 0.1 : 0;
    const targetScale = baseScale + scaleBoost;

    const currentScale = groupRef.current.scale;
    currentScale.x += (targetScale - currentScale.x) * lerpFactor;
    currentScale.y += (targetScale - currentScale.y) * lerpFactor;
    currentScale.z += (targetScale - currentScale.z) * lerpFactor;

    // ── Posição ────────────────────────────────────────────────────────────
    const cX = cursorX.get();
    const cY = cursorY.get();

    // Suaviza a influência do cursor no clímax (p > 0.85) até neutralizar em 0 no final
    const cursorMultiplier =
      p > 0.85 ? Math.max(0, 1 - (p - 0.85) * (1 / 0.15)) : 1;

    const targetX =
      isMobile || prefersReducedMotion
        ? p > 0.85
          ? 0
          : -1.2
        : cX * cursorMultiplier;

    const baseTargetY =
      isMobile || prefersReducedMotion
        ? p > 0.85
          ? 0
          : 1.5
        : cY * cursorMultiplier;

    // ── Intensificação Orientada a Scroll (Task 5) ─────────────────────────
    const floatSpeed = 0.6 + p * 0.6; // Velocidade aumenta com o scroll
    const floatAmplitude = 0.036 + p * 0.03; // Amplitude aumenta com o scroll

    const floatY = prefersReducedMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude;

    const currentPosition = groupRef.current.position;
    currentPosition.x += (targetX - currentPosition.x) * lerpFactor;
    currentPosition.y +=
      (baseTargetY + floatY - currentPosition.y) * lerpFactor;

    // ── Float determinístico (sem Math.random) ─────────────────────────────
    const rotSpeed = 0.4 + p * 0.4;
    const rotAmplitude = 0.06 + p * 0.04;
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * rotSpeed) * rotAmplitude;
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} dispose={null} />
      </group>
    </Center>
  );
};

// ─── GhostScene (Canvas wrapper) ──────────────────────────────────────────────
interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

export const GhostScene = ({
  scrollProgress,
  isMobile,
  prefersReducedMotion,
}: GhostSceneProps) => {
  const resolvedIsMobile = isMobile ?? false;
  const resolvedPrefersReducedMotion = prefersReducedMotion ?? false;
  return (
    <motion.div
      className="sticky md:top-0 top-[20vh] h-[100dvh] w-full z-[70] pointer-events-none"
      aria-hidden="true"
      role="presentation"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <GhostErrorBoundary>
        <Canvas
          frameloop="demand"
          dpr={[1, resolvedIsMobile ? 1 : 2]}
          camera={{ position: [0, 0, resolvedIsMobile ? 7 : 6], fov: 35 }}
          performance={{ min: 0.5, max: 1, debounce: 200 }}
          gl={{
            antialias: !resolvedIsMobile,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 4, 4]} intensity={1.2} />
          <pointLight position={[0, 2, 3]} color="#4fe6ff" intensity={0.4} />
          <Suspense fallback={null}>
            <GhostModel
              scrollProgress={scrollProgress}
              isMobile={resolvedIsMobile}
              prefersReducedMotion={resolvedPrefersReducedMotion}
            />
          </Suspense>
        </Canvas>
      </GhostErrorBoundary>
    </motion.div>
  );
};

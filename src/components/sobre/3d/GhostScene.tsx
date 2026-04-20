'use client';

/**
 * GhostScene — Canvas R3F da Seção 06 "O Que Me Move".
 *
 * CORREÇÕES v2 (2026-04-16):
 * • z-30 (NÃO z-50) — ManifestoFinal em z-50 deve ficar acima do Ghost no clímax.
 * • position: fixed + inset-0 — modelo permanece centralizado durante scroll.
 * • frameloop="demand" + invalidate via scrollProgress.on('change') — 0 frames
 *   desperdiçados quando a seção não está ativa.
 * • GLB path via getAssetUrl() — fonte única em @/lib/utils (KI-001, KI-005).
 * • Lerp determinístico no useFrame (sem Math.random, sem stutter acumulado).
 * • Cleanup: scene.traverse → dispose geometry + material ao desmontar.
 * • Mobile: posição topo-esquerda (x: -1.2, y: 1.5) → centro no clímax final.
 * • Desktop: cursor parallax ±15px reduzido — caráter editorial preservado.
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

// ─── Configuração do asset ────────────────────────────────────────────────────
// Path resolvido no PASSO 0 e validado contra Supabase Storage.
// NUNCA usar ghost-transformed.glb (path inválido — userMemories 2026-04-16).
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
  const cursorRef = useRef({ x: 0, y: 0 });
  const invalidate = useThree((s) => s.invalidate);

  // Re-renderiza sob demanda ao mudar o scrollProgress
  useEffect(() => {
    const unsub = scrollProgress.on('change', () => invalidate());
    return () => unsub();
  }, [scrollProgress, invalidate]);

  // Cursor parallax — desktop only
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handler = (e: MouseEvent) => {
      // Normalizado -1 → 1, amplitude máx ±0.4 (reduzido para editorial)
      cursorRef.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.4;
      cursorRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1) * 0.4;
      invalidate();
    };

    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [invalidate, isMobile, prefersReducedMotion]);

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
    const baseScale = isMobile ? 0.9 : 0.95;
    const scaleBoost = isMobile ? (p > 0.85 ? 0.1 : 0) : p > 0.85 ? 0.05 : 0;
    const targetScale = baseScale + scaleBoost + Math.min(p, 0.1) * 0.5;

    const currentScale = groupRef.current.scale;
    currentScale.x += (targetScale - currentScale.x) * lerpFactor;
    currentScale.y += (targetScale - currentScale.y) * lerpFactor;
    currentScale.z += (targetScale - currentScale.z) * lerpFactor;

    // ── Posição ────────────────────────────────────────────────────────────
    const targetX =
      isMobile || prefersReducedMotion
        ? p > 0.85
          ? 0
          : -1.2
        : cursorRef.current.x;

    const baseTargetY =
      isMobile || prefersReducedMotion
        ? p > 0.85
          ? 0
          : 1.5
        : cursorRef.current.y;

    const floatY = prefersReducedMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * 0.6) * 0.036;

    const currentPosition = groupRef.current.position;
    currentPosition.x += (targetX - currentPosition.x) * lerpFactor;
    currentPosition.y +=
      (baseTargetY + floatY - currentPosition.y) * lerpFactor;

    // ── Float determinístico (sem Math.random) ─────────────────────────────
    // Padrão senoidal puro — sem acumulação de estado = sem stutter
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
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
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
      role="presentation"
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

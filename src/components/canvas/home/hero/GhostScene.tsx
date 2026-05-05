'use client';

import { useEffect, useRef } from 'react';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { useParticleSystem } from './hooks/useParticleSystem';
import { usePreloader } from './hooks/usePreloader';
import { useGhostScene } from './hooks/useGhostScene';
import { useGhostInput } from './hooks/useGhostInput';
import { useGhostAnimate } from './hooks/useGhostAnimate';
import { useGhostParams } from './hooks/useGhostParams';
import { Preloader } from './components/Preloader';
import './GhostScene.css';

/**
 * GhostScene Component
 * Renders the main 3D interactive hero experience.
 * Modularized to comply with file size and architectural standards.
 */
export default function GhostScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const performanceConfig = usePerformanceAdaptive();

  // 1. Initialize Parameters
  const params = useGhostParams(performanceConfig);

  // 2. Setup Hooks
  const preloader = usePreloader();
  const input = useGhostInput();

  const sceneManager = useGhostScene(
    mountRef,
    params,
    performanceConfig,
    preloader.updateProgress
  );

  const particleSystem = useParticleSystem(params);

  // 3. Animation Logic
  const hasInitializedRef = useRef(false);

  // 3. Animation Logic
  const animator = useGhostAnimate(
    params,
    sceneManager.scene,
    sceneManager.cameraRef,
    sceneManager.rendererRef,
    sceneManager.composerRef,
    sceneManager.ghostGroup,
    sceneManager.ghostMaterialRef,
    sceneManager.atmosphereMaterialRef,
    sceneManager.analogDecayPassRef,
    sceneManager.eyesRef,
    sceneManager.sharedFireflyLightRef,
    particleSystem,
    input,
    performanceConfig
  );

  const updateRef = useRef(animator.update);
  useEffect(() => {
    updateRef.current = animator.update;
  }, [animator.update]);

  // 4. Lifecycle Management
  const cleanupRefs = useRef<{
    animationId?: number;
    observer?: IntersectionObserver;
  }>({});

  useEffect(() => {
    if (!mountRef.current || hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    // Initialize Scene and Particles using requestIdleCallback for TBT reduction
    const initialize = () => {
      if (!mountRef.current) return;

      // Phase 1: Basic Scene Setup
      sceneManager.init();

      // Phase 3: Particle System (Staggered if needed, but here just after)
      particleSystem.init(sceneManager.scene);

      // Visibility Observer (Performance Optimization)
      let isInView = true;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isInView = entry.isIntersecting;
          });
        },
        { rootMargin: '200px' }
      );
      observer.observe(mountRef.current);

      // Pre-render warmup
      if (sceneManager.composerRef.current) {
        const warmupFrames = performanceConfig.quality === 'low' ? 0 : 1;
        for (let i = 0; i < warmupFrames; i++) {
          sceneManager.composerRef.current.render(0);
        }
      }

      if (sceneManager.rendererRef.current) {
        preloader.complete(sceneManager.rendererRef.current.domElement);
      }

      // Start Main Animation Loop only after init
      let animationId = 0;
      const animate = (timestamp: number) => {
        animationId = requestAnimationFrame(animate);
        if (!isInView) return;
        updateRef.current(timestamp);
      };

      animate(0);

      // Store cleanup refs
      cleanupRefs.current = { animationId, observer };
    };

    let idleHandle: number | null = null;
    let warmupHandle: ReturnType<typeof setTimeout> | null = null;

    if ('requestIdleCallback' in window) {
      idleHandle = (window as any).requestIdleCallback(() => initialize(), {
        timeout: 1000,
      });
    } else {
      warmupHandle = setTimeout(initialize, 200);
    }

    // Cleanup
    return () => {
      if (cleanupRefs.current.animationId)
        cancelAnimationFrame(cleanupRefs.current.animationId);
      if (cleanupRefs.current.observer)
        cleanupRefs.current.observer.disconnect();
      if (idleHandle !== null) (window as any).cancelIdleCallback(idleHandle);
      if (warmupHandle !== null) clearTimeout(warmupHandle);
      sceneManager.cleanup();
      hasInitializedRef.current = false;
    };
  }, []); // Only on mount

  return (
    <>
      <Preloader
        preloaderRef={preloader.preloaderRef}
        progressBarRef={preloader.progressBarRef}
      />
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 h-full w-full"
        data-testid="ghost-hero-scene"
      />
    </>
  );
}

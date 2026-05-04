'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [isInitialized, setIsInitialized] = useState(false);

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
  useEffect(() => {
    if (!mountRef.current || hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    // Initialize Scene and Particles
    sceneManager.init();
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
    const forceInitialRender = () => {
      if (sceneManager.composerRef.current) {
        for (let i = 0; i < 3; i++) sceneManager.composerRef.current.render(0);
      }
      setIsInitialized(true);
      if (sceneManager.rendererRef.current) {
        preloader.complete(sceneManager.rendererRef.current.domElement);
      }
    };

    const warmupTimeout = setTimeout(forceInitialRender, 100);

    // Main Animation Loop
    let animationId: number;
    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);

      // Only update if isInView
      // We check for renderer internally in animator.update
      if (!isInView) return;

      updateRef.current(timestamp);
    };

    animate(0);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(warmupTimeout);
      observer.disconnect();
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

'use client';

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Lightformer } from '@react-three/drei';
import useIsMobile from '@/hooks/useIsMobile';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const TorusDan = lazy(() => import('./TorusDan'));

type HeroGlassCanvasProps = {
  className?: string;
  reduceMotion?: boolean;
  scale?: number;
};

/* Removed unused ProgressObserver component */

const HeroGlassCanvas: React.FC<HeroGlassCanvasProps> = ({
  className,
  reduceMotion = false,
  scale = 3.2,
}) => {
  const [mounted, setMounted] = useState(false);
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>();
  /* Removed unused state: preloaderProgress */
  /* Removed unused state */
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceMotion = reduceMotion || prefersReducedMotion;

  /* Removed unused callback: handleProgressUpdate */

  // Limit DPR as requested: [1, 1.5] generally, or [1, 1.2] for mobile to save battery/perf
  // Original was [0.85, 1.1] mobile, [1, 1.6] desktop.
  // Prompt asks for [1, 1.5] explicitly.
  const devicePixelRatio: [number, number] = isMobile ? [1, 1.2] : [1, 1.5];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      setEventSource(heroElement);
    } else if (containerRef.current) {
      setEventSource(containerRef.current);
    } else {
      setEventSource(document.body);
    }
  }, [mounted]);

  /* Removed unused overlayUnmounted effect */

  const containerClassName = `relative flex h-full w-full items-center justify-center pointer-events-none ${className ?? ''}`;

  // Visual Fallback faithful to layout (Gradient Orb)
  const FallbackVisual = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-600/30 blur-3xl animate-pulse" />
    </div>
  );

  if (!mounted) {
    return (
      <div className={containerClassName}>
        <FallbackVisual />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={containerClassName}>
      <Suspense fallback={<FallbackVisual />}>
        <Canvas
          // Prompt suggested evaluating 'demand'. Since we have a rotation animation in TorusDan,
          // 'demand' would stop it unless we invalidate frames manually or use on demand rendering only when scrolling.
          // However, for "smooth" continuous rotation, 'always' is required.
          // We can use 'demand' if we accept the orb stops spinning when idle.
          // Let's stick to 'always' for the animation, but we optimized DPR and use performance scaling.
          frameloop={shouldReduceMotion ? 'demand' : 'always'}
          dpr={devicePixelRatio}
          gl={{
            alpha: true,
            antialias: !shouldReduceMotion && !isMobile, // Disable antialias on mobile for perf
            powerPreference: 'high-performance',
            toneMappingExposure: 1.05,
          }}
          camera={{ position: [0, 0, 3.5], fov: 42 }}
          eventSource={eventSource}
          eventPrefix="client"
        >
          <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={42} />

          {/* Lights designed to enhance glass reflection/refraction */}
          {/* @ts-ignore */}
          <ambientLight intensity={0.42} />
          {/* @ts-ignore */}
          <spotLight
            position={[10, 10, 10]}
            angle={0.18}
            penumbra={1}
            intensity={0.85}
          />
          {/* @ts-ignore */}
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.8}
            color="#0057FF"
          />

          <Suspense fallback={null}>
            <TorusDan
              reduceMotion={shouldReduceMotion}
              isMobile={isMobile}
              scale={scale}
            />

            {/* Environment for realistic reflections */}
            <Environment preset="city" background={false} blur={0.9}>
              {!shouldReduceMotion && (
                // @ts-ignore
                <group rotation={[-Math.PI / 2, 0, 0]}>
                  <Lightformer
                    intensity={3.6}
                    rotation-x={Math.PI / 2}
                    position={[0, 5, -9]}
                    scale={[10, 10, 1]}
                  />
                  <Lightformer
                    intensity={1.8}
                    rotation-y={Math.PI / 2}
                    position={[-5, 1, -1]}
                    scale={[20, 0.1, 1]}
                  />
                  <Lightformer
                    intensity={1.8}
                    rotation-y={Math.PI / 2}
                    position={[-5, -1, -1]}
                    scale={[20, 0.5, 1]}
                  />
                  <Lightformer
                    intensity={1.8}
                    rotation-y={-Math.PI / 2}
                    position={[10, 1, 0]}
                    scale={[20, 1, 1]}
                  />
                </group>
              )}
            </Environment>
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default HeroGlassCanvas;

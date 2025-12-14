'use client';

import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  PerspectiveCamera,
  Lightformer,
  useProgress,
} from '@react-three/drei';
import useIsMobile from '../hooks/useIsMobile';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const TorusDan = lazy(() => import('./TorusDan'));

type HeroGlassCanvasProps = {
  className?: string;
  reduceMotion?: boolean;
};

type ProgressObserverProps = {
  onProgress: (_value: number) => void;
};

const ProgressObserver: React.FC<ProgressObserverProps> = ({ onProgress }) => {
  const { progress } = useProgress();

  useEffect(() => {
    onProgress(progress);
  }, [progress, onProgress]);

  return null;
};

const HeroGlassCanvas: React.FC<HeroGlassCanvasProps> = ({
  className,
  reduceMotion = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>();
  const [preloaderProgress, setPreloaderProgress] = useState(0);
  const [overlayUnmounted, setOverlayUnmounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceMotion = reduceMotion || prefersReducedMotion;
  const handleProgressUpdate = useCallback((value: number) => {
    setPreloaderProgress(value);
  }, []);

  const devicePixelRatio: [number, number] = isMobile ? [0.85, 1.1] : [1, 1.6];

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

  useEffect(() => {
    if (preloaderProgress >= 100) {
      const timer = setTimeout(() => setOverlayUnmounted(true), 600);
      return () => clearTimeout(timer);
    }
    setOverlayUnmounted(false);
    return undefined;
  }, [preloaderProgress]);

  const containerClassName = `relative flex h-full w-full items-center justify-center pointer-events-none ${className ?? ''}`;

  if (!mounted) {
    return (
      <div className={containerClassName}>
        <div className="absolute inset-0 bg-transparent" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={containerClassName}>
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70 bg-transparent">
            Carregando orb 3D...
          </div>
        }
      >
        <Canvas
          frameloop={shouldReduceMotion ? 'demand' : 'always'}
          dpr={devicePixelRatio}
          gl={{
            alpha: true,
            antialias: !shouldReduceMotion && !isMobile,
            powerPreference: 'high-performance',
            toneMappingExposure: 1.05,
          }}
          camera={{ position: [0, 0, 3.5], fov: 42 }}
          eventSource={eventSource}
          eventPrefix="client"
        >
          <ProgressObserver onProgress={handleProgressUpdate} />
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

          <Suspense
            fallback={
              <mesh>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                  color="#9dbdff"
                  transparent
                  opacity={0.15}
                />
              </mesh>
            }
          >
            <TorusDan reduceMotion={shouldReduceMotion} isMobile={isMobile} />

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
      {!overlayUnmounted && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#050509]/90 to-transparent text-white transition-opacity duration-500 ${
            preloaderProgress >= 100 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/80">
            carregando orb 3D
          </span>
          <span className="text-sm font-medium tracking-wide">
            {Math.min(Math.max(Math.round(preloaderProgress), 0), 100)}%
          </span>
          <div className="h-[2px] w-28 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{
                width: `${Math.min(Math.max(preloaderProgress, 0), 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroGlassCanvas;

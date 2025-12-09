'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  PerspectiveCamera,
  PerformanceMonitor,
} from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import TorusDan from './TorusDan';

interface HeroGlassCanvasProps {
  className?: string;
  eventSource?: React.RefObject<HTMLElement | null>;
  scrollYProgress?: MotionValue<number>;
  prefersReducedMotion?: boolean;
}

type ResponsiveTorusProps = {
  scrollYProgress?: MotionValue<number>;
  prefersReducedMotion?: boolean;
  lowRenderMode?: boolean;
};

const ResponsiveTorus = ({
  scrollYProgress,
  prefersReducedMotion,
  lowRenderMode,
}: ResponsiveTorusProps) => {
  const orbitRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 4.5;
  const scale = isMobile ? 1.4 : 2.2;

  useFrame((_, delta) => {
    if (orbitRef.current && !prefersReducedMotion) {
      orbitRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={orbitRef} scale={[scale, scale, scale]}>
      <TorusDan
        scrollYProgress={scrollYProgress}
        prefersReducedMotion={prefersReducedMotion}
        lowRenderMode={lowRenderMode}
        isMobile={isMobile}
      />
    </group>
  );
};

const HeroGlassCanvas: React.FC<HeroGlassCanvasProps> = ({
  className,
  eventSource,
  scrollYProgress,
  prefersReducedMotion,
}) => {
  const [dpr, setDpr] = useState(1.5);
  const [lowRenderMode, setLowRenderMode] = useState(false);
  const eventSourceNode = eventSource?.current ?? undefined;

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        eventSource={eventSourceNode}
        eventPrefix="client"
        dpr={dpr}
        gl={{ alpha: true, antialias: true, toneMappingExposure: 1.05 }}
      >
        <PerformanceMonitor
          onDecline={({ factor }) => {
            setDpr((prev) => Math.max(0.75, prev - (factor ?? 0.15)));
            setLowRenderMode(true);
          }}
          onIncline={({ factor }) => {
            setDpr((prev) => Math.min(2, prev + (factor ?? 0.1)));
            setLowRenderMode(false);
          }}
        />
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={32} />

        <ambientLight intensity={0.3} color="#f8fafc" />
        <directionalLight
          position={[4, 6, 8]}
          intensity={0.65}
          color="#ffffff"
        />
        <spotLight
          position={[-6, -4, -5]}
          intensity={0.4}
          angle={0.6}
          penumbra={0.5}
          color="#aacfff"
        />
        <hemisphereLight
          color="#ffffff"
          groundColor="#0f172a"
          intensity={0.15}
        />

        <Suspense fallback={null}>
          <ResponsiveTorus
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
            lowRenderMode={lowRenderMode}
          />

          <Environment preset="city" blur={1} background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroGlassCanvas;

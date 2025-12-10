'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  PerspectiveCamera,
  PerformanceMonitor,
  Preload,
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
  const { size } = useThree();

  // Responsividade:
  // Mobile: Modelo menor e deslocado para cima ou centro (não bloqueia texto quebre)
  // Desktop wide: Modelo à direita
  // 3xl screens: Centralizado e maior

  const isMobile = size.width < 768; 
  const isTablet = size.width >= 768 && size.width < 1024;
  
  // Escala base do modelo
  let scale = 2.4;
  if (isMobile) scale = 1.6;
  if (isTablet) scale = 2.0;

  // Posição base do modelo [x, y, z]
  let position: [number, number, number] = [3, 0, 0];
  if (isMobile) position = [0, 1.5, 0]; // Mobile: mais acima
  if (isTablet) position = [2, 0, 0];

  useFrame((_, delta) => {
    if (orbitRef.current && !prefersReducedMotion) {
      orbitRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={orbitRef} scale={[scale, scale, scale]} position={position}>
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
  const [dpr, setDpr] = useState(1);
  const [lowRenderMode, setLowRenderMode] = useState(false);
  const eventSourceNode = eventSource?.current ?? undefined;

  // Set initial DPR safely on mount
  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 2));
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        eventSource={eventSourceNode}
        eventPrefix="client"
        dpr={dpr}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      >
        <PerformanceMonitor
          onDecline={() => {
            setDpr(1); // Downgrade resolution
            setLowRenderMode(true);
          }}
        />
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={30} />

        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight
          position={[5, 10, 7.5]}
          intensity={1.2}
          castShadow
        />
        
        {/* Fill light from opposite side */}
        <spotLight
          position={[-5, 0, -5]}
          intensity={0.5}
          color="#0057FF"
        />

        <Suspense fallback={null}>
          <ResponsiveTorus
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
            lowRenderMode={lowRenderMode}
          />

          <Environment preset="city" blur={0.8} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroGlassCanvas;

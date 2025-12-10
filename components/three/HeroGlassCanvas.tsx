'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerformanceMonitor, Preload } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import TorusDan from './TorusDan';

interface HeroGlassCanvasProps {
  className?: string;
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
  scrollYProgress,
  prefersReducedMotion,
}) => {
  const [dpr, setDpr] = useState<[number, number] | number>(() => [
    1,
    1.5,
  ]);
  const [lowRenderMode, setLowRenderMode] = useState(false);
  const eventSourceNode =
    typeof window !== 'undefined' ? document.body : undefined;

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={dpr}
        eventPrefix="client"
        eventSource={eventSourceNode}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <PerformanceMonitor
          onDecline={() => {
            setDpr(1); // Downgrade resolution
            setLowRenderMode(true);
          }}
        />
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[5, 10, 7.5]} intensity={1.2} castShadow />

        {/* Fill light from opposite side */}
        <spotLight position={[-5, 0, -5]} intensity={0.5} color="#0057FF" />

        <Suspense fallback={null}>
          <ResponsiveTorus
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
            lowRenderMode={lowRenderMode}
          />

          <Environment preset="city" blur={1} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroGlassCanvas;

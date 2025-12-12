'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import TorusDan from './TorusDan';

type HeroGlassCanvasProps = {
  className?: string;
  reduceMotion?: boolean;
};

const HeroGlassCanvas: React.FC<HeroGlassCanvasProps> = ({
  className,
  reduceMotion = false,
}) => {
  const torus = useMemo(
    () => <TorusDan reduceMotion={reduceMotion} />,
    [reduceMotion]
  );

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center ${className ?? ''}`}
    >
      <Canvas
        frameloop={reduceMotion ? 'demand' : 'always'}
        dpr={[1, reduceMotion ? 1.5 : 2]}
        gl={{ alpha: true, antialias: !reduceMotion, toneMappingExposure: 1.1 }}
      >
        <Suspense fallback={<div className="text-primary">Carregando...</div>}>
          {/* Lights designed to enhance glass reflection/refraction */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 2, 5]} intensity={1.2} />
          <Environment preset="studio" background={false} />
          {torus}
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default HeroGlassCanvas;

"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Float } from '@react-three/drei';
import TorusDan from './Torus_dan';

const HeroGlassCanvas: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 2]} // Otimiza pixel ratio para performance
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

          {/* Iluminação para realçar o vidro */}
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#0057FF" /> {/* Um toque de azul no reflexo */}

          {/* O Modelo Flutuando suavemente */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <TorusDan />
          </Float>

          {/* Ambiente para reflexos realistas */}
          <Environment preset="warehouse" background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroGlassCanvas;
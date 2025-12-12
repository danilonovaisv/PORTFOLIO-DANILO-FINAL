'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Lightformer,
} from '@react-three/drei';
import TorusDan from './TorusDan';

type HeroGlassCanvasProps = {
  className?: string;
  reduceMotion?: boolean;
};

const HeroGlassCanvas: React.FC<HeroGlassCanvasProps> = ({
  className,
  reduceMotion = false,
}) => {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center ${className ?? ''}`}
    >
      <Canvas
        frameloop={reduceMotion ? 'demand' : 'always'}
        dpr={[1, reduceMotion ? 1.5 : 2]}
        gl={{ alpha: true, antialias: !reduceMotion, toneMappingExposure: 1.1 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={30} />

        {/* Lights designed to enhance glass reflection/refraction */}
        {/* @ts-ignore */}
        <ambientLight intensity={0.45} />
        {/* @ts-ignore */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.18}
          penumbra={1}
          intensity={0.9}
        />
        {/* @ts-ignore */}
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.9}
          color="#0057FF"
        />

        <Suspense fallback={null}>
          <TorusDan reduceMotion={reduceMotion} />

          {/* Environment for realistic reflections */}
          <Environment preset="city" background={false} blur={0.9}>
            {!reduceMotion && (
              // @ts-ignore
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <Lightformer
                  intensity={4}
                  rotation-x={Math.PI / 2}
                  position={[0, 5, -9]}
                  scale={[10, 10, 1]}
                />
                <Lightformer
                  intensity={2}
                  rotation-y={Math.PI / 2}
                  position={[-5, 1, -1]}
                  scale={[20, 0.1, 1]}
                />
                <Lightformer
                  intensity={2}
                  rotation-y={Math.PI / 2}
                  position={[-5, -1, -1]}
                  scale={[20, 0.5, 1]}
                />
                <Lightformer
                  intensity={2}
                  rotation-y={-Math.PI / 2}
                  position={[10, 1, 0]}
                  scale={[20, 1, 1]}
                />
              </group>
            )}
          </Environment>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default HeroGlassCanvas;

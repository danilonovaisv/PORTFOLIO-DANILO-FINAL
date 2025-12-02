import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import TorusDan from './TorusDan';

const HeroGlassCanvas: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        
        {/* @ts-ignore */}
        <ambientLight intensity={0.5} />
        {/* @ts-ignore */}
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        
        <TorusDan />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default HeroGlassCanvas;
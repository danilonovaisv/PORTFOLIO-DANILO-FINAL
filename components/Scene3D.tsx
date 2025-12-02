import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { Mesh } from 'three';

const AnimatedShape = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <TorusKnot ref={meshRef} args={[1, 0.35, 128, 32]} position={[0, 0, 0]}>
         {/* @ts-ignore */}
         <meshPhysicalMaterial 
            color="#ffffff"
            roughness={0.15} 
            metalness={0.1}
            transmission={0.9} 
            thickness={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.5}
         />
      </TorusKnot>
    </Float>
  );
};

const Scene3D: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        {/* @ts-ignore */}
        <ambientLight intensity={0.5} />
        {/* @ts-ignore */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        {/* @ts-ignore */}
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <AnimatedShape />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
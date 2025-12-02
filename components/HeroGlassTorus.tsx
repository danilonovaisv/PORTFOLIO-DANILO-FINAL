// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial, Environment, Float, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

// Type definition for the GLTF result
type GLTFResult = {
  nodes: {
    Retopo_Cube001?: THREE.Mesh;
    [key: string]: any;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

const TorusModel = () => {
  const { nodes } = useGLTF('/media/torus_dan.glb') as unknown as GLTFResult;
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Animation based on the PDF tutorial: Constant rotation
      // adjusted slightly for smooth framerate independence using delta
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const geometry = nodes.Retopo_Cube001?.geometry;

  if (!geometry) return null;

  return (
    // Responsive scaling based on viewport width as per tutorial
    // Increased scale from 3.5 to 2.8 for larger appearance as requested
    <group scale={viewport.width / 2.8}>
      <mesh 
        ref={meshRef}
        geometry={geometry}
        rotation={[0, 0, 0]}
      >
        {/* Material Settings based on the "3D Glass Effect" tutorial */}
        <MeshTransmissionMaterial 
           backside={true}
           samples={16}
           resolution={512}
           
           // Tutorial specific properties
           thickness={0.25}
           roughness={0}
           transmission={1}
           ior={1.2}
           chromaticAberration={0.04}
           
           // Adding distortion to keep the "liquid" feel mentioned in project specs
           distortion={0.5}
           distortionScale={0.5}
           temporalDistortion={0.1}
           
           color="#ffffff"
           background={new THREE.Color('#F4F5F7')} // Matching site background for blending
        />
      </mesh>
    </group>
  );
};

const HeroGlassTorus: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        
        {/* Lighting to enhance the glass effect */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        
        <TorusModel />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/media/torus_dan.glb');

export default HeroGlassTorus;
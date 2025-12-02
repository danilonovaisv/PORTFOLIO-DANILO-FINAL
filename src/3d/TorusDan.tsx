// @ts-nocheck
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
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

const TorusDan = () => {
  const { nodes } = useGLTF('/media/torus_dan.glb') as unknown as GLTFResult;
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const geometry = nodes.Retopo_Cube001?.geometry;

  if (!geometry) return null;

  return (
    <group scale={viewport.width / 2.8}>
      <mesh 
        ref={meshRef}
        geometry={geometry}
        rotation={[0, 0, 0]}
      >
        <MeshTransmissionMaterial 
           backside={true}
           samples={16}
           resolution={512}
           thickness={0.25}
           roughness={0}
           transmission={1}
           ior={1.2}
           chromaticAberration={0.04}
           distortion={0.5}
           distortionScale={0.5}
           temporalDistortion={0.1}
           color="#ffffff"
           background={new THREE.Color('#F4F5F7')}
        />
      </mesh>
    </group>
  );
};

useGLTF.preload('/media/torus_dan.glb');

export default TorusDan;
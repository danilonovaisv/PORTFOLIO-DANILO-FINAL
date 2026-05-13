'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { setupThreeEnvironment, animateGhost } from '@/lib/three';

// Carrega o modelo GLB do Supabase
const GhostModel = ({ progress, isMobile }: { progress: number, isMobile: boolean }) => {
  const { scene, nodes, materials } = useGLTF(
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb'
  );
  
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (modelRef.current) {
      animateGhost(modelRef.current, progress, isMobile);
      
      // Intensificação gradual conforme o progresso
      const intensity = Math.min(progress * 1.1, 1);
      modelRef.current.scale.set(0.95 + intensity * 0.1, 0.95 + intensity * 0.1, 0.95 + intensity * 0.1);
    }
  });
  
  useEffect(() => {
    setupThreeEnvironment(scene);
  }, [scene]);
  
  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={0.95}
      position={[0, 0, 0]}
    />
  );
};

export const Ghost3D = ({ currentSection }: { currentSection: number }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          zIndex: 9999 // Camada acima de todas
        }}
      >
        <PresentationControls
          global={true}
          cursor={true}
          zoom={0.8}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <Stage environment="city" intensity={0.6}>
            <GhostModel 
              progress={currentSection / 6} 
              isMobile={isMobile} 
            />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

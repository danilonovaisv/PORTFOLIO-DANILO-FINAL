'use client';

import * as THREE from 'three';
import { useRef, useState, useEffect, memo, ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
  Preload,
} from '@react-three/drei';
import { easing } from 'maath';

interface FluidGlassProps {
  children?: ReactNode;
  scale?: number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
}

// Preload the GLB model
useGLTF.preload('/assets/3d/lens.glb');

export default function FluidGlass({
  children,
  scale = 0.25,
  ior = 1.15,
  thickness = 5,
  chromaticAberration = 0.1,
  anisotropy = 0.01,
}: FluidGlassProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    // Fallback: render children without glass effect
    return <>{children}</>;
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]} // Limit DPR for performance
        style={{ background: 'transparent' }}
      >
        <LensWrapper
          scale={scale}
          ior={ior}
          thickness={thickness}
          chromaticAberration={chromaticAberration}
          anisotropy={anisotropy}
        >
          {children}
        </LensWrapper>
        <Preload all />
      </Canvas>
    </div>
  );
}

interface LensWrapperProps {
  children?: ReactNode;
  scale?: number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
}

const LensWrapper = memo(function LensWrapper({
  children,
  scale = 0.25,
  ior = 1.15,
  thickness = 5,
  chromaticAberration = 0.1,
  anisotropy = 0.01,
}: LensWrapperProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF('/assets/3d/lens.glb');
  const buffer = useFBO();
  const { viewport: vp, gl, camera } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const geoWidthRef = useRef<number>(1);

  // Get geometry from GLB
  const geometry = (nodes['Cylinder'] as THREE.Mesh)?.geometry;

  useEffect(() => {
    if (geometry) {
      geometry.computeBoundingBox();
      geoWidthRef.current =
        geometry.boundingBox!.max.x - geometry.boundingBox!.min.x || 1;
    }
  }, [geometry]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const { pointer } = state;
    const v = vp.getCurrentViewport(camera, [0, 0, 15]);

    // Smooth pointer following with significant delay for ethereal feel
    const destX = (pointer.x * v.width) / 2;
    const destY = (pointer.y * v.height) / 2;
    easing.damp3(meshRef.current.position, [destX, destY, 15], 0.08, delta);

    // Render scene to buffer
    gl.setRenderTarget(buffer);
    gl.setClearColor(0x000000, 0); // Transparent background
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  if (!geometry) return null;

  return (
    <>
      {/* Portal children into scene for rendering behind glass */}
      {createPortal(children, scene)}

      {/* Background plane showing captured scene */}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>

      {/* Glass lens mesh */}
      <mesh
        ref={meshRef}
        scale={scale}
        rotation-x={Math.PI / 2}
        geometry={geometry}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior}
          thickness={thickness}
          anisotropy={anisotropy}
          chromaticAberration={chromaticAberration}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
        />
      </mesh>
    </>
  );
});

'use client';

import * as THREE from 'three';
import { useRef, useState, useEffect, memo, ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
  Preload,
  Text,
  Image as DreiImage,
} from '@react-three/drei';
import { easing } from 'maath';
import { NAV_LINKS } from '@/config/navigation';
import { BRAND } from '@/config/brand';

interface FluidGlassProps {
  children?: ReactNode;
  scale?: number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
}

// Preload assets
useGLTF.preload('/assets/3d/lens.glb');

export default function FluidGlass(props: FluidGlassProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) return <>{props.children}</>;

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <BarWrapper {...props} />
        <Preload all />
      </Canvas>
    </div>
  );
}

function NavItems() {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const spacing = 1.35;
  const fontSize = 0.1; // Reduced for premium fit

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    // Align links to the right side of the header area within the bar
    group.current.position.set(v.width / 2 - 4.0, v.height / 2 - 0.9, 15.1);

    group.current.children.forEach((child, i) => {
      child.position.x = i * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      const el = document.querySelector(link);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = link;
    }
  };

  return (
    <group ref={group}>
      {NAV_LINKS.map((link) => (
        <NavItem
          key={link.label}
          label={link.label}
          href={link.href}
          fontSize={fontSize}
          onNavigate={handleNavigate}
        />
      ))}
    </group>
  );
}

function NavItem({
  label,
  href,
  fontSize,
  onNavigate,
}: {
  label: string;
  href: string;
  fontSize: number;
  onNavigate: (l: string) => void;
}) {
  const ref = useRef<any>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    easing.damp(ref.current, 'scale', hovered ? 1.1 : 1, 0.15, delta);
    easing.damp3(
      ref.current.color,
      hovered ? [0, 0.34, 1] : [1, 1, 1],
      0.15,
      delta
    );
  });

  return (
    <Text
      ref={ref}
      fontSize={fontSize}
      color="white"
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onNavigate(href);
      }}
    >
      {label.toUpperCase()}
    </Text>
  );
}

function Logo() {
  const { viewport, camera } = useThree();
  const ref = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!ref.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    // Left-aligned logo position
    ref.current.position.set(-v.width / 2 + 1.4, v.height / 2 - 0.9, 15.1);
  });

  return (
    <group ref={ref}>
      <DreiImage
        url={BRAND.logos.light}
        transparent
        scale={[1.8, 0.5]} // Corrected scale to fit inside bar
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
        onClick={() => (window.location.href = '/')}
      />
    </group>
  );
}

const BarWrapper = memo(function BarWrapper({
  scale = 1,
  ior = 1.4,
  thickness = 8,
  chromaticAberration = 0.2,
  anisotropy = 0.6,
}: FluidGlassProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF('/assets/3d/lens.glb');
  const buffer = useFBO();
  const { viewport: vp, gl, camera } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());

  // Use Cylinder geometry from lens.glb and stretch it
  const geometry = (nodes['Cylinder'] as THREE.Mesh)?.geometry;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const v = vp.getCurrentViewport(camera, [0, 0, 15]);

    // FIXED POSITION: Header bar at the top
    const targetX = 0;
    const targetY = v.height / 2 - 0.9;

    easing.damp3(meshRef.current.position, [targetX, targetY, 15], 0.2, delta);

    // DYNAMIC SCALE: Long rectangular bar format
    const targetScaleX = v.width * 0.96; // Spans almost full width
    const targetScaleY = 0.55; // Slightly taller bar for better text fit
    const targetScaleZ = 0.25;

    meshRef.current.scale.set(targetScaleX, targetScaleY, targetScaleZ);

    // Render internal UI (Logo/Links) to buffer for distortion
    gl.setRenderTarget(buffer);
    gl.setClearColor(0x000000, 0);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  if (!geometry) return null;

  return (
    <>
      {createPortal(
        <>
          <Logo />
          <NavItems />
        </>,
        scene
      )}

      {/* Screen background plane for the portaled contents (Logo/Nav) */}
      <mesh scale={[vp.width * 2, vp.height * 2, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={1} />
      </mesh>

      {/* RECTANGULAR GLASS BAR (Fixed Header) */}
      <mesh
        ref={meshRef}
        rotation-x={Math.PI / 2}
        geometry={geometry}
        renderOrder={100}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior}
          thickness={thickness}
          anisotropy={anisotropy}
          chromaticAberration={chromaticAberration}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.05}
          transmission={1}
          roughness={0.02}
          backside
        />
      </mesh>
    </>
  );
});

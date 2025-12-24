'use client';

import * as THREE from 'three';
import { useRef, useState, useEffect, useMemo, type ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  MeshTransmissionMaterial,
  Preload,
  Text,
  Image as DreiImage,
  RoundedBox,
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
        camera={{ position: [0, 0, 10], fov: 25 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <BarOrchester {...props} />
        <Preload all />
      </Canvas>
    </div>
  );
}

function BarOrchester(props: FluidGlassProps) {
  const { viewport: vp, gl, camera } = useThree();
  const buffer = useFBO();
  const [contentScene] = useState(() => new THREE.Scene());

  useFrame((_state) => {
    // Render the Logo/Nav scene into the buffer so the bar can distort it
    gl.setRenderTarget(buffer);
    gl.setClearColor('#000000', 0);
    gl.render(contentScene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(
        <>
          <Logo />
          <NavItems />
        </>,
        contentScene
      )}

      {/* Plane showing the captured UI behind the glass */}
      <mesh position={[0, 0, 4.9]}>
        <planeGeometry args={[vp.width, vp.height]} />
        <meshBasicMaterial map={buffer.texture} transparent opacity={1} />
      </mesh>

      {/* THE GLASS BAR */}
      <BarWrapper buffer={buffer.texture} {...props} />
    </>
  );
}

function NavItems() {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const spacing = 1.35;
  const fontSize = 0.16;

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 5]);
    // Align links to the right side
    group.current.position.set(v.width / 2 - 4.2, 0, 5);

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
  onNavigate: (_l: string) => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const scale = useRef(new THREE.Vector3(1, 1, 1));
  const color = useRef(new THREE.Color('white'));

  const hoverColor = useMemo(() => new THREE.Color('#0057ff'), []);
  const defaultColor = useMemo(() => new THREE.Color('white'), []);

  useFrame((_state, delta) => {
    if (!ref.current) return;

    const targetScale = hovered ? 1.1 : 1;
    easing.damp3(
      scale.current,
      new THREE.Vector3(targetScale, targetScale, 1),
      0.15,
      delta
    );
    ref.current.scale.copy(scale.current);

    const targetColor = hovered ? hoverColor : defaultColor;
    easing.dampC(color.current, targetColor, 0.15, delta);

    const material = ref.current.material as any;
    if (material && material.color) {
      material.color.copy(color.current);
    }
  });

  return (
    <Text
      ref={ref}
      fontSize={fontSize}
      color={color.current}
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
    const v = viewport.getCurrentViewport(camera, [0, 0, 5]);
    ref.current.position.set(-v.width / 2 + 1.2, 0, 5);
  });

  return (
    <group ref={ref}>
      <DreiImage
        url={BRAND.logos.light}
        transparent
        scale={[2.2, 0.6]}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
        onClick={() => (window.location.href = '/')}
      />
    </group>
  );
}

interface BarWrapperProps extends FluidGlassProps {
  buffer: THREE.Texture;
}

function BarWrapper({
  buffer,
  ior = 1.3,
  thickness = 6,
  chromaticAberration = 0.15,
  anisotropy = 0.4,
}: BarWrapperProps) {
  const { viewport: vp, camera } = useThree();
  const internalRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, _delta) => {
    const mesh = internalRef.current;
    if (!mesh) return;
    const v = vp.getCurrentViewport(camera, [0, 0, 5.1]);

    mesh.position.set(0, 0, 5.1);

    const targetScaleX = v.width * 0.94; // Slightly more breathing room
    const targetScaleY = 0.95; // Increased from 0.65 for a substantial pill
    const targetScaleZ = 0.2;

    mesh.scale.lerp(
      new THREE.Vector3(targetScaleX, targetScaleY, targetScaleZ),
      0.15
    );
  });

  return (
    <RoundedBox
      ref={internalRef}
      args={[1, 1, 1]}
      radius={0.45} // Half of height 0.95 is ~0.475, so 0.45 creates a nice pill
      smoothness={4}
      renderOrder={100}
    >
      <MeshTransmissionMaterial
        buffer={buffer}
        ior={ior}
        thickness={thickness}
        anisotropy={anisotropy}
        chromaticAberration={chromaticAberration}
        distortion={0.3}
        distortionScale={0.2}
        temporalDistortion={0}
        transmission={1}
        roughness={0.02}
        metalness={0.05}
        backside
      />
    </RoundedBox>
  );
}

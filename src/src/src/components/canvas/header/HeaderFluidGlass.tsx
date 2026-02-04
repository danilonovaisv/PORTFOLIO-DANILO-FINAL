'use client';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Image,
  Preload,
  Scroll,
  ScrollControls,
  Text,
  useScroll,
} from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import type { NavItem as HeaderNavItem } from '@/components/layout/header/types';
import { NavItems } from './NavItems';
import { GlassBar } from './GlassBar';

const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
  { label: 'HOME', href: '/#hero' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Contato', href: '#contact' },
];

const DEMO_IMAGES = [
  {
    url: '/assets/demo/cs1.webp',
    position: [-2, 0, 0] as const,
    scale: [3, 1.2] as const,
  },
  {
    url: '/assets/demo/cs2.webp',
    position: [2, 0, 3] as const,
    scale: [3, 3] as const,
  },
  {
    url: '/assets/demo/cs3.webp',
    position: [0, -1, -2] as const,
    scale: [2, 2] as const,
  },
] as const;

interface HeaderFluidGlassProps {
  navItems?: HeaderNavItem[];
  accentColor?: string;
}

interface ZoomMaterial extends THREE.Material {
  zoom: number;
}
interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> {}
type ZoomGroup = THREE.Group & { children: ZoomMesh[] };

function Images() {
  const group = useRef<ZoomGroup>(null!);
  const data = useScroll();

  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((obj: ZoomMesh, index: number) => {
      if (obj.material) {
        obj.material.zoom = 1 + data.range(0, 1 / 3) / 3;
        if (index > 1) {
          obj.material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
        }
      }
    });
  });

  return (
    <group ref={group}>
      {DEMO_IMAGES.map((image, index) => (
        <Image
          key={`${image.url}-${index}`}
          position={[image.position[0], image.position[1], image.position[2]]}
          scale={[image.scale[0], image.scale[1]]}
          url={image.url}
        />
      ))}
    </group>
  );
}

function Typography() {
  const DEVICE = {
    mobile: { fontSize: 0.2 },
    tablet: { fontSize: 0.4 },
    desktop: { fontSize: 0.6 },
  } as const;

  const getDevice = () => {
    const w = window.innerWidth;
    if (w <= 639) return 'mobile';
    if (w <= 1023) return 'tablet';
    return 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  type DeviceKey = keyof typeof DEVICE;

  const { fontSize } = DEVICE[device as DeviceKey];

  return (
    <Text
      position={[0, 0, 12]}
      fontSize={fontSize}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      React Bits
    </Text>
  );
}

function HeaderFluidGlass({
  navItems,
  accentColor = '#5227FF',
}: HeaderFluidGlassProps) {
  const items = navItems?.length ? navItems : DEFAULT_NAV_ITEMS;
  const clearColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  const modeProps = useMemo(
    () => ({
      scale: 0.15,
      thickness: 11,
      roughness: 0.2,
      chromaticAberration: 0.18,
      anisotropy: 0.05,
    }),
    []
  );

  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true }}
    >
      <ScrollControls damping={0.2} pages={3} distance={0.4}>
        <NavItems items={items} />
        <GlassBar modeProps={modeProps} clearColor={clearColor}>
          <Scroll>
            <Typography />
            <Images />
          </Scroll>
          <Scroll html />
          <Preload />
        </GlassBar>
      </ScrollControls>
    </Canvas>
  );
}

export default HeaderFluidGlass;

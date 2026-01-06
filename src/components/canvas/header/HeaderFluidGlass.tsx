'use client';

import * as THREE from 'three';
import {
  Canvas,
  createPortal,
  ThreeElements,
  useFrame,
  useThree,
} from '@react-three/fiber';
import {
  Image,
  MeshTransmissionMaterial,
  Preload,
  Scroll,
  ScrollControls,
  Text,
  useFBO,
  useGLTF,
  useScroll,
} from '@react-three/drei';
import { easing } from 'maath';
import { memo, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import type { NavItem as HeaderNavItem } from '@/components/layout/header/types';

const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
  { label: 'HOME', href: '/#hero' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Contato', href: '#contact' },
];

const DEMO_IMAGES: { url: string; position: [number, number, number]; scale: [number, number, number] }[] = [
  { url: '/assets/demo/cs1.webp', position: [-2, 0, 0], scale: [3, 1.2, 1] },
  { url: '/assets/demo/cs2.webp', position: [2, 0, 3], scale: [3, 3, 1] },
  { url: '/assets/demo/cs3.webp', position: [-2.05, -1, 6], scale: [1, 3, 1] },
  { url: '/assets/demo/cs4.webp', position: [-0.6, -1, 9], scale: [1, 2, 1] },
  { url: '/assets/demo/cs5.webp', position: [0.75, -1, 10.5], scale: [1.5, 1.5, 1] },
];

useGLTF.preload('/assets/3d/bar.glb');

type ModeProps = Record<string, unknown>;

interface HeaderFluidGlassProps {
  navItems?: HeaderNavItem[];
  accentColor?: string;
}

type ModeWrapperProps = ThreeElements['mesh'] & {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
  clearColor: THREE.Color;
};

interface ZoomMaterial extends THREE.Material {
  zoom: number;
}

interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> {}

type ZoomGroup = THREE.Group & { children: ZoomMesh[] };

function HeaderFluidGlass({ navItems, accentColor = '#5227FF' }: HeaderFluidGlassProps) {
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
        <Bar modeProps={modeProps} clearColor={clearColor}>
          <Scroll>
            <Typography />
            <Images />
          </Scroll>
          <Scroll html />
          <Preload />
        </Bar>
      </ScrollControls>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  clearColor,
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material>>(null!);
  const { nodes } = useGLTF(glb) as unknown as { nodes: Record<string, THREE.Mesh<THREE.BufferGeometry>> };
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh<THREE.BufferGeometry>)?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      const width = geo.boundingBox?.max.x - geo.boundingBox?.min.x;
      geoWidthRef.current = width || 1;
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
      ? (pointer.y * v.height) / 2
      : 0;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(clearColor, 1);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent depthWrite={false} />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={(nodes[geometryKey] as THREE.Mesh<THREE.BufferGeometry>)?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
        />
      </mesh>
    </>
  );
});

function Bar({ modeProps = {}, clearColor, children, ...props }: ModeWrapperProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      clearColor={clearColor}
      {...props}
    >
      {children}
    </ModeWrapper>
  );
}

function NavItems({ items }: { items: HeaderNavItem[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.05 },
  } as const;

  const getDevice = () => {
    const w = window.innerWidth;
    if (w <= DEVICE.mobile.max) return 'mobile';
    if (w <= DEVICE.tablet.max) return 'tablet';
    return 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

    group.current.children.forEach((child, index) => {
      child.position.x = (index - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (href: string) => {
    if (!href) return;
    if (href.startsWith('#')) {
      window.location.hash = href;
      return;
    }
    window.location.href = href;
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, href }) => (
        <Text
          key={`${label}-${href}`}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          renderOrder={10}
          onClick={(event) => {
            event.stopPropagation();
            handleNavigate(href);
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Images() {
  const group = useRef<ZoomGroup>(null!);
  const data = useScroll();
  const { height } = useThree((state) => state.viewport);

  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      child.material.zoom = 1 + data.range(0, 1 / 3) / 3;
      if (index > 1) {
        child.material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
      }
    });
  });

  return (
    <group ref={group}>
      {DEMO_IMAGES.map((image, index) => (
        <Image
          key={`${image.url}-${index}`}
          position={image.position as [number, number, number]}
          scale={[
            image.scale[0],
            (image.scale[1] * height) / 1.1,
            image.scale[2],
          ] as [number, number, number]}
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

  const { fontSize } = DEVICE[device];

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

export default HeaderFluidGlass;

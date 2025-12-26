'use client';

import * as THREE from 'three';
import { useRef, useState, useEffect, memo, ReactNode } from 'react';
import {
  Canvas,
  createPortal,
  useFrame,
  useThree,
  ThreeElements,
} from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  useScroll,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text,
} from '@react-three/drei';
import { easing } from 'maath';

interface NavItem {
  label: string;
  link: string;
}

type FluidGlassBarProps = {
  navItems?: NavItem[];
  barProps?: {
    transmission?: number;
    roughness?: number;
    thickness?: number;
    ior?: number;
    color?: string;
    attenuationColor?: string;
    attenuationDistance?: number;
  };
  eventSource?: HTMLElement | null;
  followPointer?: boolean;
  className?: string;
};

export default function FluidGlassBar({
  navItems = [],
  barProps,
  eventSource,
  followPointer = true,
  className,
}: FluidGlassBarProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true }}
      eventSource={eventSource as any}
      className={className}
    >
      <ScrollControls
        damping={0.2}
        pages={3}
        distance={0.4}
        enabled={followPointer}
      >
        <NavItems items={navItems} />
        <BarWrapper {...barProps}>
          <Scroll>
            <Typography />
            <Images />
          </Scroll>
          <Scroll html />
          <Preload />
        </BarWrapper>
      </ScrollControls>
    </Canvas>
  );
}

type ModeWrapperProps = ThreeElements['mesh'] & {
  children?: ReactNode;
};

const BarWrapper = memo(function BarWrapper({
  children,
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF('/assets/3d/bar.glb');
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const geoWidthRef = useRef<number>(1);

  useEffect(() => {
    const geo = (nodes.Cube as THREE.Mesh)?.geometry;
    geo.computeBoundingBox();
    geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
  }, [nodes]);

  useFrame((state, delta) => {
    const { gl, viewport, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    easing.damp3(
      ref.current.position,
      [0, -v.height / 2 + 0.2, 15],
      0.15,
      delta
    );

    if (true) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x5227ff, 1);
  });

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
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={0.15}
        rotation-x={Math.PI / 2}
        geometry={(nodes.Cube as THREE.Mesh)?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial {...defaultMat} buffer={buffer.texture} />
      </mesh>
    </>
  );
});

function NavItems({ items }: { items: NavItem[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 },
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max
      ? 'mobile'
      : w <= DEVICE.tablet.max
        ? 'tablet'
        : 'desktop';
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

    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    link.startsWith('#')
      ? (window.location.hash = link)
      : (window.location.href = link);
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          renderOrder={10}
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate(link);
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
  const group = useRef<THREE.Group>(null!);
  const data = useScroll();
  const { height } = useThree((s) => s.viewport);

  useFrame(() => {
    if (!group.current) return;
    (group.current.children[0] as any).material.zoom =
      1 + data.range(0, 1 / 3) / 3;
    (group.current.children[1] as any).material.zoom =
      1 + data.range(0, 1 / 3) / 3;
    (group.current.children[2] as any).material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 2;
    (group.current.children[3] as any).material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 2;
    (group.current.children[4] as any).material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 2;
  });

  return (
    <group ref={group}>
      <Image
        position={[-2, 0, 0]}
        scale={[3, height / 1.1]}
        url="/assets/demo/cs1.webp"
      />
      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />
      <Image
        position={[-2.05, -height, 6]}
        scale={[1, 3]}
        url="/assets/demo/cs3.webp"
      />
      <Image
        position={[-0.6, -height, 9]}
        scale={[1, 2]}
        url="/assets/demo/cs1.webp"
      />
      <Image
        position={[0.75, -height, 10.5]}
        scale={1.5}
        url="/assets/demo/cs2.webp"
      />
    </group>
  );
}

function Typography() {
  const DEVICE = {
    mobile: { fontSize: 0.2 },
    tablet: { fontSize: 0.4 },
    desktop: { fontSize: 0.6 },
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
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
      React
    </Text>
  );
}

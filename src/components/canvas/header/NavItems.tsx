'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import type { NavItem } from '@/components/layout/header/types';

export function NavItems({ items }: { items: NavItem[] }) {
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

'use client';

import * as THREE from 'three';
import {
  createPortal,
  ThreeElements,
  useFrame,
  useThree,
} from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';
import { memo, ReactNode, useEffect, useRef, useState } from 'react';

useGLTF.preload('/assets/3d/bar.glb');

type ModeProps = Record<string, unknown>;

export interface FluidGlassMaterialProps {
  scale?: number | [number, number, number];
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  roughness?: number;
  smoothness?: number;
  [key: string]: unknown;
}

type ModeWrapperProps = ThreeElements['mesh'] & {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
  clearColor?: THREE.Color; // Made optional
  customPointer?: { x: number; y: number };
  parallax?: number;
};

export type BarProps = Omit<ModeWrapperProps, 'glb' | 'geometryKey'> & {
  materialProps?: FluidGlassMaterialProps;
  pointer?: { x: number; y: number };
  reducedMotion?: boolean;
};

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  clearColor,
  customPointer,
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material>>(null!);
  const { nodes } = useGLTF(glb) as unknown as {
    nodes: Record<string, THREE.Mesh<THREE.BufferGeometry>>;
  };
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh<THREE.BufferGeometry>)
      ?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      if (geo.boundingBox) {
        const width = geo.boundingBox.max.x - geo.boundingBox.min.x;
        geoWidthRef.current = width || 1;
      }
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const pX = customPointer ? customPointer.x * 2 - 1 : pointer.x;
    const pY = customPointer ? -(customPointer.y * 2 - 1) : pointer.y;

    const destX = followPointer ? (pX * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pY * v.height) / 2
        : 0;

    // Parallax influence?
    // Usually parallax is applied to group, but let's leave it as is for now unless broken.

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    if (clearColor) {
      gl.setClearColor(clearColor, 1);
    }
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps as {
    scale?: number | [number, number, number];
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  const finalScale = Array.isArray(scale) ? scale : (scale ?? 0.15);

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          map={buffer.texture}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh
        ref={ref}
        scale={finalScale}
        rotation-x={Math.PI / 2}
        geometry={
          (nodes[geometryKey] as THREE.Mesh<THREE.BufferGeometry>)?.geometry
        }
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...(typeof extraMat === 'object' && extraMat !== null
            ? extraMat
            : {})}
        />
      </mesh>
    </>
  );
});

export function GlassBar({
  modeProps = {},
  materialProps,
  clearColor,
  children,
  pointer,
  ...props
}: BarProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25,
  };

  // Merge materialProps into modeProps if provided
  const finalModeProps = {
    ...defaultMat,
    ...modeProps,
    ...(materialProps || {}),
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={!pointer} // If pointer provided, don't follow mouse auto? Or handle via customPointer
      customPointer={pointer}
      modeProps={finalModeProps}
      clearColor={clearColor}
      {...props}
    >
      {children}
    </ModeWrapper>
  );
}

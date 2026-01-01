'use client';

import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, useFBO, useGLTF } from '@react-three/drei';
import { RoundedBoxGeometry } from 'three-stdlib';
import { easing } from 'maath';
import { HEADER_TOKENS } from '@/components/layout/header/headerTokens';
import { FluidMaterial, type FluidMaterialType } from './FluidMaterial';

export type FluidGlassMaterialProps = {
  scale?: [number, number, number] | number;
  ior: number;
  thickness: number;
  chromaticAberration: number;
  anisotropy: number;
  smoothness: number;
  followDamping?: number;
  maxTranslateX?: number;
};

const BAR_GLB_PATH = '/assets/3d/bar.glb';

export default function GlassBar({
  materialProps,
  pointer: _pointer,
  parallax,
  reducedMotion,
}: {
  materialProps: FluidGlassMaterialProps;
  pointer: { x: number; y: number };
  parallax: number;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<FluidMaterialType | null>(null);
  const { size, viewport } = useThree();
  const fbo = useFBO({ samples: 4 });
  const { nodes } = useGLTF(BAR_GLB_PATH) as unknown as {
    nodes: Record<string, THREE.Mesh>;
  };
  const geometry = useMemo(
    () => new RoundedBoxGeometry(6.5, 1.6, 0.65, 12, 0.38),
    []
  );
  const glbGeometry = useMemo(() => {
    const mesh = Object.values(nodes ?? {}).find(
      (node) => node instanceof THREE.Mesh
    );
    return mesh?.geometry ?? geometry;
  }, [nodes, geometry]);
  const resolvedScale = useMemo(() => {
    if (!materialProps.scale) {
      return [1.2, 0.25, 0.2] as [number, number, number];
    }
    return Array.isArray(materialProps.scale)
      ? (materialProps.scale as [number, number, number])
      : ([materialProps.scale, materialProps.scale, materialProps.scale] as [
          number,
          number,
          number,
        ]);
  }, [materialProps.scale]);
  const material = useMemo(() => {
    const mat = new FluidMaterial();
    mat.transparent = true;
    mat.toneMapped = false;
    mat.uOpacity = 0.9;
    return mat;
  }, []);
  materialRef.current = material;
  const {
    scene: renderScene,
    gradientMaterial,
    gradientPlane,
  } = useMemo(() => {
    const scene = new THREE.Scene();
    const gradient = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uParallax: { value: 0 },
      },
      transparent: true,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uParallax;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          vec2 uv = vUv;
          uv.y += uParallax * 0.2;
          float n = noise(uv * 5.0 + uTime * 0.15);
          vec3 c1 = vec3(0.05, 0.08, 0.14);
          vec3 c2 = vec3(0.24, 0.38, 0.68);
          vec3 c3 = vec3(0.1, 0.18, 0.32);
          float grad = smoothstep(0.0, 1.0, uv.y + n * 0.12);
          vec3 color = mix(c1, c2, grad);
          color = mix(color, c3, 0.25 + n * 0.1);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
    });

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 6, 1, 1),
      gradient
    );
    plane.position.set(0, 0, -2);
    scene.add(plane);

    return { scene, gradientMaterial: gradient, gradientPlane: plane };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    const { gl, camera } = state;
    if (gradientPlane) {
      gradientPlane.scale.set(viewport.width * 1.2, viewport.height * 1.2, 1);
    }
    if (gradientMaterial) {
      gradientMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      gradientMaterial.uniforms.uParallax.value = parallax;
    }

    gl.setRenderTarget(fbo);
    gl.render(renderScene, camera);
    gl.setRenderTarget(null);

    // Apply motion logic
    const maxTranslateX =
      materialProps.maxTranslateX ?? HEADER_TOKENS.desktop.maxTranslateX;
    const rangeX = (maxTranslateX * viewport.width) / size.width;
    const damping = materialProps.followDamping ?? 0.1;

    // Use R3F state.pointer (normalized -1 to 1) for interaction
    const { pointer: statePointer } = state;
    const normalizedX = reducedMotion ? 0 : statePointer.x;

    // Smooth interaction
    const tx = normalizedX * rangeX * 0.5; // Scale down movement
    const ty = reducedMotion
      ? -0.05
      : -0.05 + parallax * -0.8 + statePointer.y * 0.1;

    easing.damp3(meshRef.current.position, [tx, ty, 3.3], damping, delta);
    easing.damp(meshRef.current.rotation, 'y', 0, damping + 0.02, delta);
    easing.damp(meshRef.current.rotation, 'x', 0, damping + 0.04, delta);

    if (glowRef.current) {
      easing.damp(
        glowRef.current.material as THREE.MeshBasicMaterial,
        'opacity',
        0.15 + Math.abs(tx) * 0.08,
        0.2,
        delta
      );
    }

    const scaleAmount = Math.min(1, Math.abs(normalizedX));
    const scaleX = 1 + (HEADER_TOKENS.desktop.maxScaleX - 1) * scaleAmount;
    const scaleY = 1 + (HEADER_TOKENS.desktop.maxScaleY - 1) * scaleAmount;
    const targetScale: [number, number, number] = [
      resolvedScale[0] * scaleX,
      resolvedScale[1] * scaleY,
      resolvedScale[2],
    ];
    easing.damp3(meshRef.current.scale, targetScale, damping, delta);
    if (glowRef.current) {
      easing.damp3(
        glowRef.current.scale,
        [targetScale[0] * 1.03, targetScale[1] * 1.03, targetScale[2] * 1.03],
        damping,
        delta
      );
    }

    const smoothness = THREE.MathUtils.clamp(materialProps.smoothness, 0, 1);
    materialRef.current.uTime = state.clock.elapsedTime;
    materialRef.current.uScene = fbo.texture;
    materialRef.current.uResolution.set(size.width, size.height);
    // Remap -1..1 to 0..1 for shader UV
    materialRef.current.uMouse.set(
      (state.pointer.x + 1) / 2,
      (state.pointer.y + 1) / 2
    );
    materialRef.current.uParallax = parallax;
    materialRef.current.uIOR = materialProps.ior;
    materialRef.current.uChromaticAberration =
      materialProps.chromaticAberration;
    materialRef.current.uThickness = materialProps.thickness;
    materialRef.current.uAnisotropy = materialProps.anisotropy;
    materialRef.current.uOpacity = 0.82 + smoothness * 0.14;
  });

  return (
    <>
      <mesh ref={meshRef} geometry={glbGeometry} scale={resolvedScale}>
        <primitive object={material} attach="material" />
      </mesh>
      <mesh
        ref={glowRef}
        geometry={glbGeometry}
        scale={
          [
            resolvedScale[0] * 1.03,
            resolvedScale[1] * 1.03,
            resolvedScale[2] * 1.03,
          ] as [number, number, number]
        }
      >
        <meshBasicMaterial
          color="#6ab2ff"
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      <ContactShadows
        position={[0, -1.1, 0]}
        opacity={0.3}
        width={viewport.width}
        height={viewport.width}
        blur={2}
        far={4.5}
      />
    </>
  );
}

useGLTF.preload(BAR_GLB_PATH);

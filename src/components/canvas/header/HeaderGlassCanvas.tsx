'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export function GlassPlane({ accentColor }: { accentColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uAccent: { value: new THREE.Color(accentColor) },
        uOpacity: { value: 0.55 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uAccent;
        uniform float uOpacity;

        float hash(vec2 p){
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main(){
          vec2 uv = vUv;
          float n1 = noise(uv * 6.0 + vec2(uTime * 0.08, uTime * 0.06));
          float n2 = noise(uv * 10.0 - vec2(uTime * 0.10, uTime * 0.04));
          float n = mix(n1, n2, 0.55);

          float edge = smoothstep(0.0, 0.02, uv.x) + smoothstep(1.0, 0.98, uv.x)
                     + smoothstep(0.0, 0.02, uv.y) + smoothstep(1.0, 0.98, uv.y);
          edge = clamp(edge, 0.0, 1.0);

          vec3 base = vec3(0.05, 0.06, 0.12);
          vec3 tint = mix(base, uAccent, 0.55);

          float gloss = 0.35 + n * 0.35;
          vec3 col = mix(base, tint, gloss);
          col += edge * (uAccent * 0.45);

          float band = smoothstep(0.25, 0.0, abs(uv.y - (0.35 + 0.05*sin(uTime*0.25))));
          col += band * uAccent * 0.12;

          gl_FragColor = vec4(col, uOpacity);
        }
      `,
    });

    return mat;
  }, []);

  useEffect(() => {
    material.uniforms.uAccent.value.set(accentColor);
  }, [accentColor, material]);

  useEffect(() => {
    return () => material.dispose();
  }, [material]);

  const lastActiveTime = useRef(0);
  const pointerActivity = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    // Track pointer movement to determine if active
    if (
      pointerActivity.current.x !== state.pointer.x ||
      pointerActivity.current.y !== state.pointer.y
    ) {
      pointerActivity.current.x = state.pointer.x;
      pointerActivity.current.y = state.pointer.y;
      lastActiveTime.current = state.clock.elapsedTime;
    }

    const targetX = state.pointer.x * 0.15;
    const distanceToTarget = Math.abs(meshRef.current.position.x - targetX);

    // Keep animating for 1.5s after mouse stops, and until spring physics settle
    const isRecentlyActive = state.clock.elapsedTime - lastActiveTime.current < 1.5;
    const isSpringMoving = distanceToTarget > 0.001;

    if (isRecentlyActive || isSpringMoving) {
      // Update time for the noise shader
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // "Spring" physics (Lerp) for X-axis follow
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetX,
        0.08 // Damping factor
      );

      // Request re-render in demand mode
      state.invalidate();
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Width increased to 2.4 to cover movement gaps */}
      <planeGeometry args={[2.4, 2, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

const HeaderGlassCanvas = memo(function HeaderGlassCanvas({
  accentColor,
}: {
  accentColor: string;
}) {
  const is3DDisabled = process.env.NEXT_PUBLIC_DISABLE_3D === 'true';

  if (is3DDisabled) {
    return (
      <div className="h-full w-full bg-zinc-900 border-dashed border-2 border-zinc-700" />
    );
  }

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, premultipliedAlpha: true }}
      frameloop="demand"
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      aria-hidden="true"
    >
      <GlassPlane accentColor={accentColor} />
    </Canvas>
  );
});

export default HeaderGlassCanvas;

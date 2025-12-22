'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Effect } from 'postprocessing';

/* =========================
   ANALOG DECAY EFFECT
========================= */
const fragmentShader = `
uniform float time;
uniform float intensity;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void mainUv(inout vec2 uv) {
  float scanline = sin(uv.y * 800.0) * 0.04 * intensity;
  uv.x += scanline;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float grain = random(uv * time) * 0.08 * intensity;
  vec3 color = inputColor.rgb + grain;
  outputColor = vec4(color, inputColor.a);
}
`;

class AnalogDecayEffect extends Effect {
  constructor() {
    super('AnalogDecayEffect', fragmentShader, {
      uniforms: new Map([
        ['time', { value: 0 }],
        ['intensity', { value: 0.6 }],
      ]),
    });
  }

  update(_: any, __: any, delta: number) {
    this.uniforms.get('time')!.value += delta;
  }
}

/* =========================
   GHOST
========================= */
function Ghost() {
  const group = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 64, 64);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y < -0.2) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const noise =
          Math.sin(x * 3) * 0.35 +
          Math.cos(z * 4) * 0.25 +
          Math.sin((x + z) * 2) * 0.15;
        pos.setY(i, -2 + noise);
      }
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x0f2027,
        transparent: true,
        opacity: 0.88,
        emissive: new THREE.Color(0x5d8cff),
        emissiveIntensity: 5.8,
        roughness: 0.02,
        metalness: 0,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (!group.current) return;

    // Follow mouse
    group.current.position.x += (mouse.x * 6 - group.current.position.x) * 0.05;
    group.current.position.y += (mouse.y * 4 - group.current.position.y) * 0.05;

    // Float
    group.current.position.y += Math.sin(t * 1.6) * 0.03;

    // Wobble
    group.current.rotation.y = Math.sin(t * 0.6) * 0.2;

    // Eye blink
    const blink = Math.sin(t * 3) > 0.85 ? 1 : 0;
    if (leftEye.current && rightEye.current) {
      (leftEye.current.material as THREE.MeshBasicMaterial).opacity = blink;
      (rightEye.current.material as THREE.MeshBasicMaterial).opacity = blink;
    }

    // Glow pulse
    material.emissiveIntensity = 5.8 + Math.sin(t * 1.6) * 0.6;
  });

  return (
    <group ref={group} scale={1.6}>
      <mesh geometry={geometry} material={material} />

      {/* Eyes */}
      <mesh ref={leftEye} position={[-0.6, 0.6, 1.8]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>

      <mesh ref={rightEye} position={[0.6, 0.6, 1.8]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
    </group>
  );
}

/* =========================
   FIREFLIES
========================= */
function Fireflies() {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#6aa9ff" transparent opacity={0.85} />
    </points>
  );
}

/* =========================
   SCENE
========================= */
export default function GhostScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      performance={{ min: 0.7 }}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 6, 6]} intensity={1.2} color="#7aa2ff" />
      <directionalLight
        position={[-6, -4, -6]}
        intensity={0.6}
        color="#3b82f6"
      />

      <Ghost />
      <Fireflies />

      <EffectComposer>
        <Bloom
          intensity={1.6}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
        />
        <primitive object={new AnalogDecayEffect()} />
      </EffectComposer>
    </Canvas>
  );
}

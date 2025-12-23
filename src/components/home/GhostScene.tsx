'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Effect } from 'postprocessing';

/* =========================
   ANALOG DECAY EFFECT
   (Grain + Scanlines + Distortion)
========================= */
const fragmentShader = `
uniform float time;
uniform float intensity;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void mainUv(inout vec2 uv) {
  // Scanline jitter
  float scanline = sin(uv.y * 800.0) * 0.04 * intensity;
  uv.x += scanline;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // Analog Noise / Grain
  float grain = random(uv * time) * 0.08 * intensity;
  vec3 color = inputColor.rgb + grain;
  
  // Vignette-ish darken
  float dist = distance(uv, vec2(0.5));
  color *= 1.0 - (dist * 0.4);

  outputColor = vec4(color, inputColor.a);
}
`;

class AnalogDecayEffect extends Effect {
  constructor() {
    super('AnalogDecayEffect', fragmentShader, {
      uniforms: new Map<string, THREE.Uniform>([
        ['time', new THREE.Uniform(0)],
        ['intensity', new THREE.Uniform(0.6)],
      ]),
    });
  }

  update(_: any, __: any, delta: number) {
    this.uniforms.get('time')!.value += delta;
  }
}

/* =========================
   GHOST MESH
   (Ethereal Form)
========================= */
function Ghost() {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 64, 64);
    const pos = geo.attributes.position;
    const initialY = new Float32Array(pos.count);

    for (let i = 0; i < pos.count; i++) {
      initialY[i] = pos.getY(i);
    }

    // Store original Y for animation reference if needed,
    // or just deform directly. Here we bake deformation.
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y < -0.2) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        // Ethereal drip/distortion
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
        color: new THREE.Color('#0f2027'),
        transparent: true,
        opacity: 0.9,
        emissive: new THREE.Color('#5d8cff'),
        emissiveIntensity: 4.0,
        roughness: 0.1,
        metalness: 0.1,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;

    // Fluid Mouse Follow (damped)
    // Note: We use the R3F mouse (-1 to 1) directly
    group.current.position.x += (mouse.x * 6 - group.current.position.x) * 0.05;
    group.current.position.y += (mouse.y * 3 - group.current.position.y) * 0.05;

    // Levitating
    group.current.position.y += Math.sin(t * 1.2) * 0.005;

    // Subtle rotation
    group.current.rotation.y = Math.sin(t * 0.5) * 0.15;

    // Pulse Effect
    material.emissiveIntensity = 4.0 + Math.sin(t * 2.0) * 0.5;
  });

  return (
    <group ref={group} scale={1.5} position={[0, 0, 0]}>
      <mesh geometry={geometry} material={material} />
      {/* Ghost Eyes - optional, keeping subtle */}
      <mesh position={[-0.6, 0.4, 1.7]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.6, 0.4, 1.7]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* =========================
   SCENE COMPONENT
========================= */
export default function GhostScene() {
  const analogDecayEffect = useMemo(() => new AnalogDecayEffect(), []);

  return (
    <Canvas
      dpr={[1, 1.5]} // Performance optimization
      camera={{ position: [0, 0, 12], fov: 35 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      }}
      style={{ pointerEvents: 'none' }} // Allow clicks to pass through to text/video if needed (but usually handled by container)
    >
      <color attach="background" args={['#06071f']} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#4a8dff" />
      <directionalLight
        position={[-10, -5, -5]}
        intensity={0.5}
        color="#ff4a4a"
      />

      {/* Content */}
      <Ghost />

      {/* Post Processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.5}
          mipmapBlur
          intensity={1.5}
          radius={0.6}
        />
        <primitive object={analogDecayEffect} />
      </EffectComposer>
    </Canvas>
  );
}

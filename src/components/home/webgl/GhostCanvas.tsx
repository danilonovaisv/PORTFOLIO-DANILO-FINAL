'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing'; // Removed Vignette as it's in custom shader
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import * as THREE from 'three';
import AnalogDecayPass from './postprocessing/AnalogDecayPass';
import { ShaderMaterial } from 'three';

// --- CONSTANTS & PARAMS (from script.ts) ---
const PARAMS = {
  bodyColor: 0x0f2027,
  glowColor: 'blue',
  eyeGlowColor: 'violet',
  ghostOpacity: 0.88,
  emissiveIntensity: 5.8,
  eyeGlowIntensity: 4.5,
  rimLightIntensity: 1.8,
  particleColor: 'violet',
  particleCount: 250,
  fireflySpeed: 0.09,
  revealRadius: 37,
  fadeStrength: 1.7,
  baseOpacity: 0.9,
  revealOpacity: 0.05,
};

const FLUORESCENT_COLORS: { [key: string]: number } = {
  cyan: 0x00ffff,
  lime: 0x00ff00,
  magenta: 0xff00ff,
  yellow: 0xffff00,
  orange: 0xff4500,
  pink: 0xff1493,
  purple: 0x9400d3,
  blue: 0x0080ff,
  green: 0x00ff80,
  red: 0xff0040,
  teal: 0x00ffaa,
  violet: 0x8a2be2,
};

// --- COMPONENTS ---

// 1. ATMOSPHERE (Bloom-resistant background)
const AtmosphereShader = {
  uniforms: {
    ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
    revealRadius: { value: PARAMS.revealRadius },
    fadeStrength: { value: PARAMS.fadeStrength },
    baseOpacity: { value: PARAMS.baseOpacity },
    revealOpacity: { value: PARAMS.revealOpacity },
    time: { value: 0 },
  },
  vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      uniform vec3 ghostPosition;
      uniform float revealRadius;
      uniform float fadeStrength;
      uniform float baseOpacity;
      uniform float revealOpacity;
      uniform float time;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      
      void main() {
        float dist = distance(vWorldPosition.xy, ghostPosition.xy);
        float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
        float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
        reveal = pow(reveal, fadeStrength);
        float opacity = mix(revealOpacity, baseOpacity, reveal);
        gl_FragColor = vec4(0.001, 0.001, 0.002, opacity); // Ultra-low RGB
      }
    `,
};

function Atmosphere() {
  const materialRef = useRef<ShaderMaterial>(null);
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      // Assuming ghost stays relatively central or we track it. For now static center is fine or typical mouse follow.
    }
  });

  return (
    <mesh position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial
        ref={materialRef}
        args={[AtmosphereShader]}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// 2. GHOST MESH (Wavy bottom + Eyes)
function GhostMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { mouse, viewport } = useThree();

  // Geometry creation with noise
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 40, 40);
    const posAttribute = geo.getAttribute('position');
    const positions = posAttribute.array;

    // Apply organic wave to bottom
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1];
      if (y < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        positions[i + 1] = -2.0 + (noise1 + noise2 + noise3);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Float animation
    groupRef.current.position.y = Math.sin(t * 1.6) * 0.2; // floatSpeed approx

    if (!reducedMotion) {
      // Subtle mouse follow
      const targetX = ((mouse.x * viewport.width) / 2) * 0.2; // damp factor
      const targetY = ((mouse.y * viewport.height) / 2) * 0.2;
      groupRef.current.position.x +=
        (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y +=
        (targetY - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Body */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={PARAMS.bodyColor}
          transparent
          opacity={PARAMS.ghostOpacity}
          emissive={FLUORESCENT_COLORS[PARAMS.glowColor]}
          emissiveIntensity={PARAMS.emissiveIntensity}
          roughness={0.02}
          metalness={0.0}
          side={THREE.DoubleSide}
          alphaTest={0.1}
        />
      </mesh>

      {/* Eyes Container */}
      <group>
        {/* Left Eye */}
        <Eye position={[-0.7, 0.6, 1.9]} />
        {/* Right Eye */}
        <Eye position={[0.7, 0.6, 1.9]} />
      </group>
    </group>
  );
}

function Eye({ position }: { position: [number, number, number] }) {
  // Socket
  const socketGeo = useMemo(() => new THREE.SphereGeometry(0.45, 16, 16), []);
  // Glow Eye
  const eyeGeo = useMemo(() => new THREE.SphereGeometry(0.3, 12, 12), []); // 50% bigger
  // Outer Glow
  const outerGeo = useMemo(() => new THREE.SphereGeometry(0.525, 12, 12), []);

  return (
    <group position={position}>
      {/* Socket */}
      <mesh geometry={socketGeo} scale={[1.1, 1.0, 0.6]}>
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Inner Glowing Eye - We simulate the pulse purely visually if needed, or static high intensity */}
      <mesh geometry={eyeGeo} position={[0, 0, 0.1]}>
        <meshBasicMaterial
          color={FLUORESCENT_COLORS[PARAMS.eyeGlowColor]}
          transparent
          opacity={1} // Force visible for React ver.
        />
      </mesh>

      {/* Outer Glow Halo */}
      <mesh geometry={outerGeo} position={[0, 0, 0.05]}>
        <meshBasicMaterial
          color={FLUORESCENT_COLORS[PARAMS.eyeGlowColor]}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// 3. FIREFLIES
function Fireflies() {
  const groupRef = useRef<THREE.Group>(null);
  // Create static count
  const count = 20;

  // We can use native instancing or just simple mapping for 20 items
  const fireflies = useMemo(
    () =>
      new Array(count).fill(0).map(() => ({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * PARAMS.fireflySpeed,
          (Math.random() - 0.5) * PARAMS.fireflySpeed,
          (Math.random() - 0.5) * PARAMS.fireflySpeed
        ),
      })),
    []
  );

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const data = fireflies[i];
      child.position.add(data.velocity);
      // Wrap around logic omitted for brevity, keeping simple
    });
  });

  return (
    <group ref={groupRef}>
      {fireflies.map((f, i) => (
        <mesh key={i} position={f.pos}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color={0xffff44} transparent opacity={0.9} />
          <pointLight color={0xffff44} intensity={0.8} distance={3} decay={2} />
          {/* Glow shell */}
          <mesh>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial
              color={0xffff88}
              transparent
              opacity={0.4}
              side={THREE.BackSide}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

// 4. PARTICLES (Floating Geometries)
function Particles() {
  // Simplification for R3F: Using rudimentary instancing or mapping
  const count = 50;
  const geometries = useMemo(
    () => [
      new THREE.SphereGeometry(0.05, 6, 6),
      new THREE.TetrahedronGeometry(0.04, 0),
      new THREE.OctahedronGeometry(0.045, 0),
    ],
    []
  );

  const particles = useMemo(
    () =>
      new Array(count).fill(0).map(() => ({
        geoIndex: Math.floor(Math.random() * geometries.length),
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8 - 2,
          (Math.random() - 0.5) * 4 - 1
        ),
        color: FLUORESCENT_COLORS[PARAMS.particleColor],
      })),
    [geometries]
  );

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos} geometry={geometries[p.geoIndex]}>
          <meshBasicMaterial color={p.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// --- MAIN CANVAS ---

export default function GhostCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 75 }} // Matches script.ts settings: z=20
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        // toneMapping: THREE.ACESFilmicToneMapping, // Can be handled by PostProcessing defaults or native
        // toneMappingExposure: 0.9
      }}
      className="absolute inset-0 z-0 fade-in" // Added fade-in class concept
    >
      <color attach="background" args={['#06071f']} />{' '}
      {/* Fallback hidden by atmosphere */}
      <Atmosphere />
      <GhostMesh />
      <Fireflies />
      <Particles />
      {/* Lights matching script.ts */}
      <ambientLight color={0x0a0a2e} intensity={0.08} />
      <directionalLight
        color={0x4a90e2}
        intensity={PARAMS.rimLightIntensity}
        position={[-8, 6, -4]}
      />
      <directionalLight
        color={0x50e3c2}
        intensity={PARAMS.rimLightIntensity * 0.7}
        position={[8, -4, -6]}
      />
      <EffectComposer enableNormalPass={false}>
        {/* Bloom matching script.ts settings: strength 0.3, radius 1.25, threshold 0 */}
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.0}
          luminanceSmoothing={0.9} // R3F bloom slightly different param names, adjusting
          radius={0.7} // 1.25 relative
          mipmapBlur
        />
        {/* @ts-ignore */}
        <AnalogDecayPass />
      </EffectComposer>
    </Canvas>
  );
}

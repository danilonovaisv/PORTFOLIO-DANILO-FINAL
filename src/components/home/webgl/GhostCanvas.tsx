import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Float, Sparkles, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';

// Shader Fresnel Customizado (BLUE ENERGY - ORGANIC)
const FresnelMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.1, 0.3, 2.0), // Deep Electric Blue Base (HDR)
    uRimColor: new THREE.Color(0.5, 2.0, 8.0), // Exploding Cyan/White Edge (HDR)
    uFresnelBias: 0.1,
    uFresnelScale: 1.5,
    uFresnelPower: 1.8,
  },
  // Vertex Shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;

    // Simplex Noise (simplified for vertex displacement)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Organic Displacement: "Boiling" effect
      float noise = snoise(position * 2.5 + uTime * 0.5);
      vec3 newPos = position + normal * noise * 0.08; 

      vPosition = (modelViewMatrix * vec4(newPos, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 uColor;
    uniform vec3 uRimColor;
    uniform float uFresnelBias;
    uniform float uFresnelScale;
    uniform float uFresnelPower;

    void main() {
      vec3 viewDir = normalize(-vPosition);
      float fresnel = uFresnelBias + uFresnelScale * pow(1.0 + dot(viewDir, vNormal), uFresnelPower);
      
      // Cor final mistura base + borda intensa
      vec3 color = mix(uColor, uRimColor, fresnel);
      
      gl_FragColor = vec4(color, 1.0); // Alpha 1.0 para o bloom pegar bem
    }
  `
);

extend({ FresnelMaterial });

function GhostMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Random phase offsets for irregular movement
  const randomOffsets = useMemo(
    () => ({
      x: Math.random() * Math.PI * 2,
      y: Math.random() * Math.PI * 2,
      z: Math.random() * Math.PI * 2,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
    }),
    []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // 1. Organic Tumble Rotation (Non-linear)
    if (meshRef.current) {
      // Rotation uses composed sine waves for irregularity
      meshRef.current.rotation.x =
        Math.sin(time * 0.2 + randomOffsets.rotX) * 0.4 + time * 0.05;
      meshRef.current.rotation.y =
        Math.cos(time * 0.15 + randomOffsets.rotY) * 0.3 + time * 0.02;
      meshRef.current.rotation.z = Math.sin(time * 0.1 + randomOffsets.z) * 0.1;

      // Subtle "Breathing" Scale
      const breathe = 1 + Math.sin(time * 0.5) * 0.03;
      meshRef.current.scale.set(breathe, breathe, breathe);
    }

    // 2. Animate the MATERIAL (Vertex Boiling)
    if (materialRef.current) {
      materialRef.current.uTime = time;
    }
  });

  return (
    // Advanced Float wrapper gives the base "suspended in liquid" feel
    <Float
      speed={1.5} // Animation speed
      rotationIntensity={0.8} // XYZ rotation intensity
      floatIntensity={1.5} // Up/down float intensity
      floatingRange={[-0.4, 0.4]} // Range of y-axis values
    >
      <mesh ref={meshRef}>
        {/* TorusKnot allows for complex fresnel interaction */}
        <torusKnotGeometry args={[1.1, 0.35, 150, 32]} />
        {/* @ts-ignore */}
        <fresnelMaterial ref={materialRef} transparent={true} />
      </mesh>
    </Float>
  );
}

export default function GhostCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      gl={{
        antialias: false,
        alpha: true, // IMPORTANTE: Transparência para o mix-blend funcionar
        powerPreference: 'high-performance',
      }}
      // Adjusted camera to proper framing
      camera={{ fov: 40, position: [0, 0, 8] }}
    >
      {/* Removido <color attach="background" /> 
        O fundo deve ser transparente para ver o texto "através" do canvas
      */}

      <GhostMesh />

      {/* Partículas Azuis - Slow Drift */}
      <Sparkles
        count={50}
        scale={8}
        size={3}
        speed={0.2} // Slower, more atmospheric
        opacity={0.4} // Less intrusive
        color="#0057FF"
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={1.1} // Só brilha o que for HDR extremo
          mipmapBlur
          intensity={1.2}
          radius={0.7}
        />
        <Noise opacity={0.12} />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
      </EffectComposer>
    </Canvas>
  );
}

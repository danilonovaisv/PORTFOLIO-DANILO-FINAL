/* eslint-disable react/no-unknown-property */
'use client';

import * as THREE from 'three';
import React, { Suspense, useMemo, useRef } from 'react';
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ThreeElements,
} from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrthographicCamera,
  SpotLight,
  shaderMaterial,
  useFBO,
} from '@react-three/drei';
import { RoundedBoxGeometry } from 'three-stdlib';
import { easing } from 'maath';

type NavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  description?: string;
};

export type FluidGlassHeaderProps = {
  mode?: 'bar';
  barProps?: {
    navItems: NavItem[];
    materialProps?: FluidGlassMaterialProps;
  };
  pointer?: { x: number; y: number };
  parallax?: number;
  reducedMotion?: boolean;
  className?: string;
};

export type FluidGlassMaterialProps = {
  scale?: [number, number, number] | number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  transmission?: number;
  roughness?: number;
  color?: string;
  attenuationColor?: string;
  attenuationDistance?: number;
};

const FluidMaterial = shaderMaterial(
  {
    uTime: 0,
    uScene: null,
    uResolution: new THREE.Vector2(1, 1),
    uIOR: 1.15,
    uChromaticAberration: 0.05,
    uThickness: 2,
    uAnisotropy: 0.01,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uParallax: 0,
    uOpacity: 1,
  },
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uParallax;

    // Simplex noise from https://github.com/ashima/webgl-noise
    vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
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
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
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
      vec3 displaced = position;

      float noise = snoise(vec3(position.xy * 1.8, uTime * 0.45));
      float edge = smoothstep(0.0, 0.35, 1.0 - length(uv - vec2(0.5)));
      displaced += normal * noise * 0.38 * edge;

      vec2 mouse = uMouse;
      float hover = smoothstep(0.35, 0.0, distance(uv, mouse));
      displaced += normal * hover * 0.35;

      vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
      vWorldPos = worldPos.xyz;
      vNormal = normalize(normalMatrix * normalize(displaced));
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    uniform sampler2D uScene;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uIOR;
    uniform float uChromaticAberration;
    uniform float uThickness;
    uniform float uAnisotropy;
    uniform vec2 uMouse;
    uniform float uParallax;
    uniform float uOpacity;

    vec3 saturate(vec3 v){return clamp(v,0.0,1.0);}

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(cameraPosition - vWorldPos);

      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.2);
      vec3 refractedDir = refract(viewDir, normal, 1.0 / max(uIOR, 1e-3));
      vec2 refraction = refractedDir.xy * (0.18 + uThickness * 0.06 + uParallax * 0.6);
      refraction.x += normal.y * uAnisotropy * 0.4;
      refraction.y += normal.x * uAnisotropy * 0.25;

      vec2 uvR = vUv + refraction * (1.0 + uChromaticAberration);
      vec2 uvG = vUv + refraction;
      vec2 uvB = vUv + refraction * (1.0 - uChromaticAberration);

      uvR = clamp(uvR, 0.0, 1.0);
      uvG = clamp(uvG, 0.0, 1.0);
      uvB = clamp(uvB, 0.0, 1.0);

      vec3 refracted;
      refracted.r = texture2D(uScene, uvR).r;
      refracted.g = texture2D(uScene, uvG).g;
      refracted.b = texture2D(uScene, uvB).b;

      vec3 tint = mix(vec3(0.78, 0.86, 1.0), vec3(1.0), fresnel * 0.35);
      vec3 color = mix(refracted, tint, 0.15);

      float glow = pow(1.0 - abs(dot(viewDir, normal)), 3.2);
      color += vec3(0.28, 0.42, 0.96) * glow * 0.35;

      float highlight = exp(-10.0 * distance(vUv, uMouse));
      color += vec3(0.8, 0.9, 1.0) * highlight * 0.45;

      float softness = smoothstep(0.0, 0.25, length(refraction)) * 0.25;
      color = saturate(color + softness);

      vec2 vignetteUv = gl_FragCoord.xy / uResolution;
      float vignette = smoothstep(0.75, 0.2, length(vignetteUv - 0.5));
      color *= mix(1.12, 1.0, vignette);

      gl_FragColor = vec4(color, uOpacity);
    }
  `
);

extend({ FluidMaterial });

type FluidMaterialImpl = ThreeElements['fluidMaterial'];

function GlassBar({
  materialProps,
  pointer,
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
  const matRef = useRef<FluidMaterialImpl>(null);
  const { size, viewport } = useThree();
  const fbo = useFBO({ samples: 4, depth: false });
  const geometry = useMemo(
    () => new RoundedBoxGeometry(6.5, 1.6, 0.65, 12, 0.38),
    []
  );
  const { scene: renderScene, gradientMaterial, gradientPlane } = useMemo(() => {
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
    if (!meshRef.current || !matRef.current) return;

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

    const tx = (pointer.x - 0.5) * 1.4;
    const ty = (pointer.y - 0.5) * 0.5;
    easing.damp3(
      meshRef.current.position,
      [tx * 0.5, -0.05 + parallax * -0.8 + ty * 0.05, 3.3],
      0.16,
      delta
    );
    easing.damp(meshRef.current.rotation, 'y', reducedMotion ? 0 : tx * 0.5, 0.18, delta);
    easing.damp(meshRef.current.rotation, 'x', reducedMotion ? 0 : -ty * 0.25, 0.2, delta);

    if (glowRef.current) {
      easing.damp(
        glowRef.current.material as THREE.MeshBasicMaterial,
        'opacity',
        0.15 + Math.abs(tx) * 0.08,
        0.2,
        delta
      );
    }

    matRef.current.uTime = state.clock.elapsedTime;
    matRef.current.uScene = fbo.texture;
    matRef.current.uResolution.set(size.width, size.height);
    matRef.current.uMouse.set(pointer.x, 1 - pointer.y);
    matRef.current.uParallax = parallax;
    matRef.current.uIOR = materialProps.ior ?? 1.15;
    matRef.current.uChromaticAberration =
      materialProps.chromaticAberration ?? 0.05;
    matRef.current.uThickness = materialProps.thickness ?? 2;
    matRef.current.uAnisotropy = materialProps.anisotropy ?? 0.01;
  });

  const resolvedScale = useMemo(() => {
    if (!materialProps.scale) return [1.15, 0.24, 0.24] as [number, number, number];
    return Array.isArray(materialProps.scale)
      ? materialProps.scale
      : [materialProps.scale, materialProps.scale, materialProps.scale];
  }, [materialProps.scale]);

  return (
    <>
      <Float
        speed={0.8}
        floatIntensity={reducedMotion ? 0 : 0.5}
        rotationIntensity={reducedMotion ? 0 : 0.3}
      >
        <mesh ref={meshRef} geometry={geometry} scale={resolvedScale}>
          <fluidMaterial
            ref={matRef}
            transparent
            toneMapped={false}
            uOpacity={0.95}
            attach="material"
          />
        </mesh>
        <mesh
          ref={glowRef}
          geometry={geometry}
          scale={resolvedScale.map((s) => s * 1.03) as [number, number, number]}
        >
          <meshBasicMaterial
            color={materialProps.attenuationColor ?? '#6ab2ff'}
            blending={THREE.AdditiveBlending}
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </mesh>
      </Float>

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

function Scene({
  materialProps,
  pointer,
  parallax,
  reducedMotion,
}: {
  materialProps: FluidGlassMaterialProps;
  pointer: { x: number; y: number };
  parallax: number;
  reducedMotion: boolean;
}) {
  return (
    <>
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.48} />
      <SpotLight
        position={[-2, 3, 6]}
        angle={0.45}
        penumbra={0.7}
        intensity={1.4}
        color="#9fd8ff"
        distance={16}
      />
      <Environment resolution={64}>
        <Lightformer
          intensity={2.4}
          color="#6da8ff"
          position={[0, 0.6, 4]}
          scale={[6, 2, 1]}
          form="rect"
        />
        <Lightformer
          intensity={1.8}
          color="#ffffff"
          position={[2.5, -2, 3]}
          scale={[4, 1, 1]}
          form="rect"
        />
      </Environment>
      <GlassBar
        materialProps={materialProps}
        pointer={pointer}
        parallax={parallax}
        reducedMotion={reducedMotion}
      />
    </>
  );
}

export function FluidGlassHeader({
  mode = 'bar',
  barProps,
  pointer = { x: 0.5, y: 0.5 },
  parallax = 0,
  reducedMotion = false,
  className,
}: FluidGlassHeaderProps) {
  if (mode !== 'bar') return null;

  const materialProps: FluidGlassMaterialProps = {
    ior: 1.15,
    thickness: 2,
    chromaticAberration: 0.05,
    anisotropy: 0.01,
    attenuationColor: '#7fb3ff',
    attenuationDistance: 0.45,
    ...barProps?.materialProps,
  };

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={90} />
        <Suspense fallback={null}>
          <Scene
            materialProps={materialProps}
            pointer={pointer}
            parallax={parallax}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default FluidGlassHeader;

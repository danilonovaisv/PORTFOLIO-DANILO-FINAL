"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

/**
 * Goal: port the Codepen reference into R3F.
 * - Full-screen canvas behind the hero
 * - Ghost follows pointer subtly
 * - Analog/scanline shader pass + bloom
 * - Background reveal plane (dark veil) — can be tuned later
 *
 * NOTE: This is intentionally isolated and does not depend on app state.
 */

const fluorescent = {
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
} as const;

type GlowKey = keyof typeof fluorescent;

type Params = {
  glowColor: GlowKey;
  eyeGlowColor: GlowKey;
  emissiveIntensity: number;
  followSpeed: number;
  wobbleAmount: number;
  revealRadius: number;
  fadeStrength: number;
  baseOpacity: number;
  revealOpacity: number;
  analogIntensity: number;
  analogGrain: number;
  analogBleeding: number;
  analogVSync: number;
  analogScanlines: number;
  analogVignette: number;
  analogJitter: number;
  limboMode: boolean;
};

const DEFAULT: Params = {
  glowColor: "blue",
  eyeGlowColor: "green",
  emissiveIntensity: 5.8,
  followSpeed: 0.075,
  wobbleAmount: 0.35,
  revealRadius: 43,
  fadeStrength: 2.2,
  baseOpacity: 0.35,
  revealOpacity: 0.0,
  analogIntensity: 0.6,
  analogGrain: 0.4,
  analogBleeding: 1.0,
  analogVSync: 1.0,
  analogScanlines: 1.0,
  analogVignette: 1.0,
  analogJitter: 0.4,
  limboMode: false,
};

function useComposer() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer | null>(null);
  const analogPass = useRef<ShaderPass | null>(null);

  const analogShader = useMemo(() => ({
    uniforms: {
      tDiffuse: { value: null },
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uAnalogGrain: { value: DEFAULT.analogGrain },
      uAnalogBleeding: { value: DEFAULT.analogBleeding },
      uAnalogVSync: { value: DEFAULT.analogVSync },
      uAnalogScanlines: { value: DEFAULT.analogScanlines },
      uAnalogVignette: { value: DEFAULT.analogVignette },
      uAnalogJitter: { value: DEFAULT.analogJitter },
      uAnalogIntensity: { value: DEFAULT.analogIntensity },
      uLimboMode: { value: 0.0 },
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D tDiffuse;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uAnalogGrain;
      uniform float uAnalogBleeding;
      uniform float uAnalogVSync;
      uniform float uAnalogScanlines;
      uniform float uAnalogVignette;
      uniform float uAnalogJitter;
      uniform float uAnalogIntensity;
      uniform float uLimboMode;
      varying vec2 vUv;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float gaussian(float z, float u, float o) {
        return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
      }

      vec3 grain(vec2 uv, float time, float intensity) {
        float seed = dot(uv, vec2(12.9898,78.233));
        float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
        noise = gaussian(noise, 0.0, 0.25);
        return vec3(noise) * intensity;
      }

      void main() {
        vec2 uv = vUv;
        float time = uTime * 1.8;

        // Jitter
        vec2 jitteredUV = uv;
        if (uAnalogJitter > 0.01) {
          float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
          jitteredUV.x += jitterAmount;
          jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
        }

        // VSync roll
        if (uAnalogVSync > 0.01) {
          float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
          float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
          jitteredUV.y += vsyncRoll * vsyncChance;
        }

        vec4 color = texture2D(tDiffuse, jitteredUV);

        // Channel bleeding
        if (uAnalogBleeding > 0.01) {
          float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
          float offsetPhase = time * 1.5 + uv.y * 20.0;

          vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
          vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);

          float r = texture2D(tDiffuse, jitteredUV + redOffset).r;
          float g = texture2D(tDiffuse, jitteredUV).g;
          float b = texture2D(tDiffuse, jitteredUV + blueOffset).b;

          color = vec4(r,g,b,color.a);
        }

        // Grain
        if (uAnalogGrain > 0.01) {
          vec3 g = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
          g *= (1.0 - color.rgb);
          color.rgb += g;
        }

        // Scanlines
        if (uAnalogScanlines > 0.01) {
          float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
          float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
          float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
          color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);

          float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
          color.rgb *= (1.0 - horizontalLines);
        }

        // Vignette
        if (uAnalogVignette > 0.01) {
          vec2 vignetteUV = (uv - 0.5) * 2.0;
          float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
          color.rgb *= vignette;
        }

        if (uLimboMode > 0.5) {
          float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          color.rgb = vec3(gray);
        }

        gl_FragColor = color;
      }
    `
  }), [size.width, size.height]);

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setClearColor(0x000000, 0); // transparent

    const c = new EffectComposer(gl);
    c.addPass(new RenderPass(scene, camera));

    // @ts-ignore
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.3,
      1.25,
      0.0
    );
    c.addPass(bloom);

    const a = new ShaderPass(analogShader);
    c.addPass(a);

    c.addPass(new OutputPass());

    composer.current = c;
    analogPass.current = a;

    return () => {
      c.dispose();
      composer.current = null;
      analogPass.current = null;
    };
  }, [gl, scene, camera, size.width, size.height, analogShader]);

  useEffect(() => {
    composer.current?.setSize(size.width, size.height);
    analogPass.current?.uniforms.uResolution.value.set(size.width, size.height);
  }, [size.width, size.height]);

  return { composer, analogPass };
}

function BackgroundVeil({ ghostPos }: { ghostPos: THREE.Vector3 }) {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      ghostPosition: { value: ghostPos },
      revealRadius: { value: DEFAULT.revealRadius },
      fadeStrength: { value: DEFAULT.fadeStrength },
      baseOpacity: { value: DEFAULT.baseOpacity },
      revealOpacity: { value: DEFAULT.revealOpacity },
      time: { value: 0 },
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 ghostPosition;
      uniform float revealRadius;
      uniform float fadeStrength;
      uniform float baseOpacity;
      uniform float revealOpacity;
      uniform float time;
      varying vec3 vWorldPosition;

      void main() {
        float dist = distance(vWorldPosition.xy, ghostPosition.xy);
        float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
        float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
        reveal = pow(reveal, fadeStrength);
        float opacity = mix(revealOpacity, baseOpacity, reveal);
        gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
      }
    `,
    transparent: true,
    depthWrite: false,
  }), [ghostPos]);

  useFrame(({ clock }) => {
    mat.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function Ghost() {
  const group = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  const [mouse] = useState(() => new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));
  const ghostPos = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  // material
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x0f2027,
    transparent: true,
    opacity: 0.88,
    emissive: new THREE.Color(fluorescent[DEFAULT.glowColor]),
    emissiveIntensity: DEFAULT.emissiveIntensity,
    roughness: 0.02,
    metalness: 0.0,
    side: THREE.DoubleSide,
  }), []);

  const geometry = useMemo(() => {
    const g = new THREE.SphereGeometry(2, 40, 40);
    const pos = g.getAttribute("position");
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      // y
      if (arr[i + 1] < -0.2) {
        const x = arr[i];
        const z = arr[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        arr[i + 1] = -2.0 + (noise1 + noise2 + noise3);
      }
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      target.current.set(x, y);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;

    // Smooth pointer
    mouse.lerp(target.current, 0.1);

    const targetX = mouse.x * 11;
    const targetY = mouse.y * 7;

    group.current.position.x += (targetX - group.current.position.x) * DEFAULT.followSpeed;
    group.current.position.y += (targetY - group.current.position.y) * DEFAULT.followSpeed;

    // Float
    const t = clock.getElapsedTime();
    group.current.position.y += Math.sin(t * 1.6) * 0.03 + Math.cos(t * 1.12) * 0.018;

    ghostPos.copy(group.current.position);

    // Wobble
    if (bodyRef.current) {
      bodyRef.current.rotation.y = Math.sin(t * 1.4) * 0.05 * DEFAULT.wobbleAmount;
      const scale = 1 + Math.sin(t * 2.1) * 0.025 * DEFAULT.wobbleAmount + Math.sin(t * 0.8) * 0.012;
      bodyRef.current.scale.setScalar(scale);
    }

    // Pulse
    mat.emissiveIntensity = DEFAULT.emissiveIntensity + Math.sin(t * 1.6) * 0.6 + Math.sin(t * 0.6) * 0.12;
  });

  return (
    <>
      <ambientLight intensity={0.08} color={0x0a0a2e} />
      <directionalLight position={[-8, 6, -4]} intensity={1.8} color={0x4a90e2} />
      <directionalLight position={[8, -4, -6]} intensity={1.26} color={0x50e3c2} />

      <group ref={group}>
        <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.2}>
          <mesh ref={bodyRef} geometry={geometry} material={mat} />
        </Float>
      </group>

      <BackgroundVeil ghostPos={ghostPos} />
    </>
  );
}

function Postprocessing() {
  const { composer, analogPass } = useComposer();
  useFrame(({ clock }) => {
    const c = composer.current;
    if (!c) return;
    if (analogPass.current) {
      analogPass.current.uniforms.uTime.value = clock.getElapsedTime();
      analogPass.current.uniforms.uLimboMode.value = DEFAULT.limboMode ? 1.0 : 0.0;
      analogPass.current.uniforms.uAnalogIntensity.value = DEFAULT.analogIntensity;
      analogPass.current.uniforms.uAnalogGrain.value = DEFAULT.analogGrain;
      analogPass.current.uniforms.uAnalogBleeding.value = DEFAULT.analogBleeding;
      analogPass.current.uniforms.uAnalogVSync.value = DEFAULT.analogVSync;
      analogPass.current.uniforms.uAnalogScanlines.value = DEFAULT.analogScanlines;
      analogPass.current.uniforms.uAnalogVignette.value = DEFAULT.analogVignette;
      analogPass.current.uniforms.uAnalogJitter.value = DEFAULT.analogJitter;
    }
    c.render();
  }, 1);

  // Prevent R3F default render loop from double-rendering
  return null;
}

export function GhostCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        premultipliedAlpha: false,
      }}
      camera={{ fov: 75, position: [0, 0, 20], near: 0.1, far: 1000 }}
      // We'll render through EffectComposer instead
      frameloop="always"
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Ghost />
      <Postprocessing />
    </Canvas>
  );
}

// GhostCanvas.tsx
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  shaderMaterial,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useTransform, motion } from 'framer-motion-3d';
import { extend } from '@react-three/fiber';
import { EffectComposer } from 'postprocessing';
import { UnrealBloomPass } from 'postprocessing';
import { RenderPass } from 'postprocessing';
import { OutputPass } from 'postprocessing';

import { GHOST_CONFIG } from '@/config/ghostConfig';
import AnalogDecay from './AnalogDecayPass';
import Fireflies from './Fireflies';
import AtmosphereVeil from '../AtmosphereVeil';
import GhostEyes from './GhostEyes';

// --- SHADERS PERSONALIZADOS ---
const AnalogDecayMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: { value: 0 },
    uResolution: new THREE.Vector2(),
    uAnalogGrain: { value: 0.4 },
    uAnalogBleeding: { value: 1.0 },
    uAnalogVSync: { value: 1.0 },
    uAnalogScanlines: { value: 1.0 },
    uAnalogVignette: { value: 1.0 },
    uAnalogJitter: { value: 0.4 },
    uAnalogIntensity: { value: 0.6 },
    uLimboMode: { value: 0.0 },
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
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

    float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
    float random(float x) { return fract(sin(x) * 43758.5453123); }
    float gaussian(float z, float u, float o) { return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o)))); }

    vec3 grain(vec2 uv, float time, float intensity) {
      float seed = dot(uv, vec2(12.9898, 78.233));
      float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
      noise = gaussian(noise, 0.0, 0.5 * 0.5);
      return vec3(noise) * intensity;
    }

    void main() {
      vec2 uv = vUv;
      float time = uTime * 1.8;
      vec2 jitteredUV = uv;
      if (uAnalogJitter > 0.01) {
        float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
        jitteredUV.x += jitterAmount;
        jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
      }
      if (uAnalogVSync > 0.01) {
        float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
        float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
        jitteredUV.y += vsyncRoll * vsyncChance;
      }
      vec4 color = texture2D(tDiffuse, jitteredUV);
      if (uAnalogBleeding > 0.01) {
        float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
        float offsetPhase = time * 1.5 + uv.y * 20.0;
        vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
        vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
        float r = texture2D(tDiffuse, jitteredUV + redOffset).r;
        float g = texture2D(tDiffuse, jitteredUV).g;
        float b = texture2D(tDiffuse, jitteredUV + blueOffset).b;
        color = vec4(r, g, b, color.a);
      }
      if (uAnalogGrain > 0.01) {
        vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
        grainEffect *= (1.0 - color.rgb);
        color.rgb += grainEffect;
      }
      if (uAnalogScanlines > 0.01) {
        float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
        float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
        float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
        float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - horizontalLines);
      }
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
);

extend({ AnalogDecayMaterial });

// --- COMPONENTE DO GHOST ---
const GhostModel = ({
  mousePosition,
  time,
}: {
  mousePosition: [number, number];
  time: number;
}) => {
  const group = useRef<THREE.Group>(null!);
  const ghostBody = useRef<THREE.Mesh>(null!);
  const leftEye = useRef<THREE.Mesh>(null!);
  const rightEye = useRef<THREE.Mesh>(null!);
  const leftGlow = useRef<THREE.Mesh>(null!);
  const rightGlow = useRef<THREE.Mesh>(null!);

  // Parâmetros ajustáveis
  const params = useMemo(
    () => ({
      followSpeed: 0.05,
      wobbleAmount: 0.35,
      floatSpeed: 1.6,
      emissiveIntensity: 5.8,
      pulseSpeed: 1.6,
      pulseIntensity: 0.6,
      eyeGlowIntensity: 4.5,
      eyeGlowDecay: 0.95,
      eyeGlowResponse: 0.31,
      movementThreshold: 0.07,
      baseColor: new THREE.Color(0x0f2027),
      glowColor: new THREE.Color(0x0080ff), // Azul
      eyeGlowColor: new THREE.Color(0x8a2be2), // Violeta
    }),
    []
  );

  useFrame(() => {
    if (
      !group.current ||
      !ghostBody.current ||
      !leftEye.current ||
      !rightEye.current
    )
      return;

    const [mouseX, mouseY] = mousePosition;
    const targetX = mouseX * 11;
    const targetY = mouseY * 7;

    // Movimento suave do grupo
    group.current.position.x +=
      (targetX - group.current.position.x) * params.followSpeed;
    group.current.position.y +=
      (targetY - group.current.position.y) * params.followSpeed;

    // Animação de flutuação
    const float1 = Math.sin(time * params.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(time * params.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(time * params.floatSpeed * 2.3) * 0.008;
    group.current.position.y += float1 + float2 + float3;

    // Pulsos e respiração no brilho
    const pulse = Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
    const breathe = Math.sin(time * 0.6) * 0.12;
    const currentEmissiveIntensity = params.emissiveIntensity + pulse + breathe;
    (
      ghostBody.current.material as THREE.MeshStandardMaterial
    ).emissiveIntensity = currentEmissiveIntensity;

    // Animações do corpo
    const tiltStrength = 0.1 * params.wobbleAmount;
    const tiltDecay = 0.95;
    const mouseDirection = new THREE.Vector2(
      targetX - group.current.position.x,
      targetY - group.current.position.y
    ).normalize();
    ghostBody.current.rotation.z =
      ghostBody.current.rotation.z * tiltDecay +
      -mouseDirection.x * tiltStrength * (1 - tiltDecay);
    ghostBody.current.rotation.x =
      ghostBody.current.rotation.x * tiltDecay +
      mouseDirection.y * tiltStrength * (1 - tiltDecay);
    ghostBody.current.rotation.y =
      Math.sin(time * 1.4) * 0.05 * params.wobbleAmount;

    // Variação de escala
    const scaleVariation =
      1 + Math.sin(time * 2.1) * 0.025 * params.wobbleAmount + pulse * 0.015;
    const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
    const finalScale = scaleVariation * scaleBreath;
    ghostBody.current.scale.set(finalScale, finalScale, finalScale);

    // Animação dos olhos
    const normalizedMouseSpeed =
      Math.sqrt((mouseX * 10) ** 2 + (mouseY * 10) ** 2) * 0.1; // Aproximação
    const isMoving = normalizedMouseSpeed > params.movementThreshold;
    const targetGlow = isMoving ? 1.0 : 0.0;
    const glowChangeSpeed = isMoving
      ? params.eyeGlowResponse * 2
      : params.eyeGlowResponse;

    if (leftEye.current.material && rightEye.current.material) {
      const leftMat = leftEye.current.material as THREE.MeshBasicMaterial;
      const rightMat = rightEye.current.material as THREE.MeshBasicMaterial;
      const leftGlowMat = leftGlow.current.material as THREE.MeshBasicMaterial;
      const rightGlowMat = rightGlow.current
        .material as THREE.MeshBasicMaterial;

      leftMat.opacity += (targetGlow - leftMat.opacity) * glowChangeSpeed;
      rightMat.opacity = leftMat.opacity; // Igual ao esquerdo
      leftGlowMat.opacity = leftMat.opacity * 0.3;
      rightGlowMat.opacity = leftMat.opacity * 0.3;
    }
  });

  // Geometria do Ghost
  const ghostGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 40, 40);
    const positions = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1];
      if (y < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Material do Ghost
  const ghostMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: params.baseColor,
      transparent: true,
      opacity: 0.88,
      emissive: params.glowColor,
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, [params.baseColor, params.glowColor, params.emissiveIntensity]);

  return (
    <group ref={group}>
      {/* Corpo do Ghost */}
      <mesh ref={ghostBody} geometry={ghostGeometry} material={ghostMaterial} />

      {/* Grupo dos Olhos */}
      <group>
        {/* Olhos - Sockets pretos */}
        <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color={0x000000} />
        </mesh>
        <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color={0x000000} />
        </mesh>

        {/* Olhos - Brilho Interno */}
        <mesh ref={leftEye} position={[-0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh ref={rightEye} position={[0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
          />
        </mesh>

        {/* Olhos - Brilho Externo */}
        <mesh ref={leftGlow} position={[-0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} />
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh ref={rightGlow} position={[0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} />
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
};

// --- CENÁRIO 3D ---
const Scene = ({ mousePosition }: { mousePosition: [number, number] }) => {
  const { gl, scene, camera } = useThree();
  const [time, setTime] = useState(0);
  const analogPassRef = useRef<any>(null);

  useFrame((state, delta) => {
    setTime((t) => t + delta);
    // Atualiza os uniforms do shader aqui se necessário
    if (analogPassRef.current) {
      analogPassRef.current.uniforms.uTime.value = time;
    }
  });

  // Luzes ambiente e rim
  const ambientLight = useMemo(
    () => new THREE.AmbientLight(0x0a0a2e, 0.08),
    []
  );
  const rimLight1 = useMemo(() => {
    const light = new THREE.DirectionalLight(0x4a90e2, 1.8);
    light.position.set(-8, 6, -4);
    return light;
  }, []);
  const rimLight2 = useMemo(() => {
    const light = new THREE.DirectionalLight(0x50e3c2, 1.8 * 0.7);
    light.position.set(8, -4, -6);
    return light;
  }, []);

  useEffect(() => {
    scene.add(ambientLight, rimLight1, rimLight2);
    return () => {
      scene.remove(ambientLight, rimLight1, rimLight2);
    };
  }, [scene, ambientLight, rimLight1, rimLight2]);

  return (
    <>
      <GhostModel mousePosition={mousePosition} time={time} />
      <Environment preset="apartment" />
      <Fireflies />
      <AtmosphereVeil />
      <GhostEyes color="#ffffff" />
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---
const GhostCanvas = () => {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  // Detecta movimento do mouse para o ghost seguir
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition([x, y]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute inset-0 z-0"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.9;
        }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </motion.div>
  );
};

export default GhostCanvas;

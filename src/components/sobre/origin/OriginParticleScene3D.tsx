'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotionGate } from '@/hooks/useMotionGate';
import { cn } from '@/lib/utils';
import { createNoise3D } from 'simplex-noise';

interface OriginParticleScene3DProps {
  config: import('@/components/sobre/origin/data').ParticleStageConfig;
  isActive: boolean;
  fallbackImage: string;
  priority?: boolean;
  className?: string;
  scrollProgress?: number;
}

interface MorphTargetData {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
}

const MORPH_TARGETS = {
  organic: {
    name: 'SENSIBILIDADE',
    color: '#00e5ff',
    secondaryColor: '#0048ff',
    generate: (count: number) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const progress = i / count;
        const angle = progress * Math.PI * 2;
        const isUpperFace = progress < 0.5;
        const faceProgress = isUpperFace ? progress * 2 : (1 - progress) * 2;

        let radius;
        if (isUpperFace) {
          radius = 0.28 + 0.12 * Math.pow(Math.sin(faceProgress * Math.PI), 1.5);
          radius += 0.02 * Math.sin(faceProgress * Math.PI * 3);
        } else {
          radius = 0.22 + 0.1 * Math.pow(Math.sin(faceProgress * Math.PI), 0.8);
          radius += 0.03 * Math.pow(Math.sin(faceProgress * Math.PI * 2), 2);
        }

        const x = (radius) * Math.cos(angle) * 8;
        const y = (radius) * Math.sin(angle) * 1.15 * 8;
        const z = (Math.random() - 0.5) * 2;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const colorProgress = progress;
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.9 + 0.1 * Math.sin(colorProgress * Math.PI);
        colors[i * 3 + 2] = 1.0;

        sizes[i] = 0.8 + Math.random() * 0.6;
      }

      return { positions, colors, sizes };
    }
  },
  geometric: {
    name: 'CRIAÇÃO',
    color: '#00e5ff',
    secondaryColor: '#8705f2',
    generate: (count: number) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const progress = i / count;
        const shapeType = Math.floor(progress * 5) % 5;
        const localProgress = (progress * 5) % 1;
        const angle = progress * Math.PI * 2;

        let radius = 0.3;
        let shapeAngle = angle;

        switch (shapeType) {
          case 0: // Pencil-like
            radius = 0.15 + 0.2 * localProgress;
            shapeAngle = angle;
            break;
          case 1: // Square
            const sq = Math.max(Math.abs(Math.cos(angle)), Math.abs(Math.sin(angle)));
            radius = 0.25 / sq;
            shapeAngle = angle;
            break;
          case 2: // Triangle
            const tri = Math.max(Math.abs(Math.cos(angle * 3)), Math.abs(Math.sin(angle * 3)));
            radius = 0.28 / tri;
            shapeAngle = angle;
            break;
          case 3: // Hexagon
            const hex = Math.max(
              Math.abs(Math.cos(angle)),
              Math.abs(Math.cos(angle - Math.PI / 3)),
              Math.abs(Math.cos(angle + Math.PI / 3))
            );
            radius = 0.22 / hex;
            shapeAngle = angle;
            break;
          case 4: // Lines
            radius = 0.35;
            shapeAngle = angle;
            break;
        }

        const x = radius * Math.cos(shapeAngle) * 8;
        const y = radius * Math.sin(shapeAngle) * 8;
        const z = (Math.random() - 0.5) * 2;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const colorProgress = progress;
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.5 + 0.5 * Math.sin(colorProgress * Math.PI * 2);
        colors[i * 3 + 2] = 1.0;

        sizes[i] = 0.6 + Math.random() * 0.8;
      }

      return { positions, colors, sizes };
    }
  },
  structured: {
    name: 'DESIGN',
    color: '#00e5ff',
    secondaryColor: '#4fe6ff',
    generate: (count: number) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const gridSize = 8;
      const particlesPerCell = count / (gridSize * gridSize);

      for (let i = 0; i < count; i++) {
        const cellIndex = Math.floor(i / particlesPerCell);
        const cellX = cellIndex % gridSize;
        const cellY = Math.floor(cellIndex / gridSize);
        const localIndex = i % particlesPerCell;
        const localProgress = localIndex / particlesPerCell;

        const cellCenterX = (cellX + 0.5) / gridSize - 0.5;
        const cellCenterY = (cellY + 0.5) / gridSize - 0.5;

        const patternType = (cellX + cellY * 3) % 4;
        const patternAngle = localProgress * Math.PI * 2;
        const patternRadius = 0.035 + 0.025 * Math.sin(patternAngle * 3);

        let offsetX = 0, offsetY = 0;

        switch (patternType) {
          case 0:
            offsetX = patternRadius * Math.cos(patternAngle);
            offsetY = patternRadius * Math.sin(patternAngle);
            break;
          case 1:
            const crossArm = Math.floor(localProgress * 4);
            const armLen = 0.04;
            if (crossArm === 0) { offsetX = armLen * (localProgress * 4); offsetY = 0; }
            else if (crossArm === 1) { offsetX = 0; offsetY = armLen * (localProgress * 4 - 1); }
            else if (crossArm === 2) { offsetX = -armLen * (localProgress * 4 - 2); offsetY = 0; }
            else { offsetX = 0; offsetY = -armLen * (localProgress * 4 - 3); }
            break;
          case 2:
            const spiralR = 0.02 + localProgress * 0.04;
            const spiralA = localProgress * Math.PI * 6;
            offsetX = spiralR * Math.cos(spiralA);
            offsetY = spiralR * Math.sin(spiralA);
            break;
          case 3:
            offsetX = (localProgress - 0.5) * 0.07;
            offsetY = 0.03 * Math.sin(localProgress * Math.PI * 4);
            break;
        }

        const x = (cellCenterX + offsetX) * 16;
        const y = (cellCenterY + offsetY) * 16;
        const z = (Math.random() - 0.5) * 1;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const colorProgress = (i / count);
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.5;
        colors[i * 3 + 2] = 1.0;

        sizes[i] = 0.4 + Math.random() * 0.4;
      }

      return { positions, colors, sizes };
    }
  },
  expansive: {
    name: 'EXPANSÃO',
    color: '#8705f2',
    secondaryColor: '#4fe6ff',
    generate: (count: number) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const ringCount = 5;

      for (let i = 0; i < count; i++) {
        const progress = i / count;
        const angle = progress * Math.PI * 2;

        const ring = Math.floor(progress * ringCount);
        const ringProgress = (progress * ringCount) % 1;

        const baseRadius = 0.15 + (ring / ringCount) * 0.35;
        const radius = baseRadius;

        const phaseOffset = ring * ((Math.PI * 2) / ringCount) * 0.3;
        const modulatedAngle = angle + phaseOffset;

        const scatter = 0.015 * Math.sin(i * 17.3);

        const x = (radius + scatter) * Math.cos(modulatedAngle) * 8;
        const y = (radius + scatter) * Math.sin(modulatedAngle) * 8 * 1.1;
        const z = (Math.random() - 0.5) * 3;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const colorProgress = (i / count);
        colors[i * 3] = 0.5 + 0.5 * Math.sin(colorProgress * Math.PI);
        colors[i * 3 + 1] = 0.0;
        colors[i * 3 + 2] = 1.0;

        sizes[i] = 0.5 + Math.random() * 0.6;
      }

      return { positions, colors, sizes };
    }
  }
};

const MORPH_ORDER = ['organic', 'geometric', 'structured', 'expansive'] as const;

function ParticleSystem({
  particleCount,
  scrollProgress,
  cursorPosition,
  currentMorphIndex,
  morphProgress,
  noiseScale,
  speed,
  colorPalette,
  cursorRepulsion,
}: {
  particleCount: number;
  scrollProgress: number;
  cursorPosition: { x: number; y: number } | null;
  currentMorphIndex: number;
  morphProgress: number;
  noiseScale: number;
  speed: number;
  colorPalette: import('@/components/sobre/origin/data').ParticleColorPalette;
  cursorRepulsion: { enabled: boolean; radius: number; strength: number };
}) {
  const { scene, camera, size } = useThree();
  const noise3DRef = useRef(createNoise3D());
  const startTimeRef = useRef<number | null>(null);

  const morphTargets = useMemo(() => {
    return MORPH_ORDER.map(key => MORPH_TARGETS[key].generate(1000));
  }, []);

  const geometryRef = useRef<THREE.InstancedBufferGeometry | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.InstancedMesh | null>(null);

  const basePositionsRef = useRef<Float32Array>(new Float32Array(1000 * 3));
  const baseColorsRef = useRef<Float32Array>(new Float32Array(1000 * 3));
  const baseSizesRef = useRef<Float32Array>(new Float32Array(1000));
  const targetPositionsRef = useRef<Float32Array>(new Float32Array(1000 * 3));
  const targetColorsRef = useRef<Float32Array>(new Float32Array(1000 * 3));
  const targetSizesRef = useRef<Float32Array>(new Float32Array(1000));

  const velocitiesRef = useRef<Float32Array>(new Float32Array(1000 * 3));
  const lifeRef = useRef<Float32Array>(new Float32Array(1000));
  const decayRef = useRef<Float32Array>(new Float32Array(1000));
  const rotationSpeedRef = useRef<Float32Array>(new Float32Array(1000 * 3));
  const randomScaleRef = useRef<Float32Array>(new Float32Array(1000));

  useEffect(() => {
    const geometry = new THREE.InstancedBufferGeometry();
    const baseGeometry = new THREE.SphereGeometry(1, 8, 8);
    geometry.index = baseGeometry.index;
    geometry.attributes.position = baseGeometry.attributes.position;
    geometry.attributes.normal = baseGeometry.attributes.normal;
    geometry.attributes.uv = baseGeometry.attributes.uv;

    const positions = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);
    const sizes = new Float32Array(1000);
    const velocities = new Float32Array(1000 * 3);
    const life = new Float32Array(1000);
    const decay = new Float32Array(1000);
    const rotationSpeed = new Float32Array(1000 * 3);
    const randomScale = new Float32Array(1000);

    for (let i = 0; i < 1000; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.5;
      positions[i * 3] = 0.5 + radius * Math.cos(angle);
      positions[i * 3 + 1] = 0.5 + radius * Math.sin(angle);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
      life[i] = 1;
      decay[i] = 0.003;
      rotationSpeed[i * 3] = (Math.random() - 0.5) * 0.01;
      rotationSpeed[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      rotationSpeed[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      randomScale[i] = 0.5 + Math.random() * 0.5;
    }

    geometry.setAttribute('aBasePosition', new THREE.InstancedBufferAttribute(new Float32Array(1000 * 3), 3));
    geometry.setAttribute('aBaseColor', new THREE.InstancedBufferAttribute(new Float32Array(1000 * 3), 3));
    geometry.setAttribute('aBaseSize', new THREE.InstancedBufferAttribute(new Float32Array(1000), 1));
    geometry.setAttribute('aTargetPosition', new THREE.InstancedBufferAttribute(new Float32Array(1000 * 3), 3));
    geometry.setAttribute('aTargetColor', new THREE.InstancedBufferAttribute(new Float32Array(1000 * 3), 3));
    geometry.setAttribute('aTargetSize', new THREE.InstancedBufferAttribute(new Float32Array(1000), 1));
    geometry.setAttribute('aVelocity', new THREE.InstancedBufferAttribute(new Float32Array(1000 * 3), 3));
    geometry.setAttribute('aLife', new THREE.InstancedBufferAttribute(new Float32Array(1000), 1));
    geometry.setAttribute('aDecay', new THREE.InstancedBufferAttribute(new Float32Array(1000), 1));
    geometry.setAttribute('aRotationSpeed', new THREE.InstancedBufferAttribute(new Float32Array(1000 * 3), 3));
    geometry.setAttribute('aRandomScale', new THREE.InstancedBufferAttribute(new Float32Array(1000), 1));

    geometryRef.current = geometry;

    const vertexShader = `
      attribute vec3 aBasePosition;
      attribute vec3 aBaseColor;
      attribute float aBaseSize;
      attribute vec3 aTargetPosition;
      attribute vec3 aTargetColor;
      attribute float aTargetSize;
      attribute vec3 aVelocity;
      attribute float aLife;
      attribute float aDecay;
      attribute vec3 aRotationSpeed;
      attribute float aRandomScale;

      uniform float uMorphProgress;
      uniform float uTime;
      uniform float uNoiseScale;
      uniform float uSpeed;
      uniform vec2 uCursorPosition;
      uniform float uCursorRepulsionRadius;
      uniform float uCursorRepulsionStrength;
      uniform bool uCursorRepulsionEnabled;
      uniform vec2 uResolution;

      varying vec3 vColor;
      varying float vLife;
      varying float vRandomScale;
      varying vec3 vPosition;

      float noise3D(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec3(1.0, 0.0, 0.0));
        float c = hash(i + vec3(0.0, 1.0, 0.0));
        float d = hash(i + vec3(0.0, 0.0, 1.0));
        float e = hash(i + vec3(1.0, 1.0, 0.0));
        float f = hash(i + vec3(0.0, 1.0, 1.0));
        float g = hash(i + vec3(1.0, 0.0, 1.0));
        float h = hash(i + vec3(1.0, 1.0, 1.0));
        return mix(mix(mix(a, b, u.x), mix(c, d, u.x), u.y),
                   mix(mix(e, f, u.x), mix(g, h, u.x), u.y), u.z);
      }

      float hash(vec3 p) {
        p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                 dot(p, vec3(269.5, 183.3, 246.1)),
                 dot(p, vec3(113.5, 271.9, 124.6)));
        return fract(sin(p) * 43758.5453);
      }

      void main() {
        vec3 basePos = aBasePosition;
        vec3 targetPos = aTargetPosition;
        vec3 pos = mix(basePos, targetPos, uMorphProgress);

        vColor = mix(aBaseColor, aTargetColor, uMorphProgress);
        float targetSize = mix(aBaseSize, aTargetSize, uMorphProgress);

        // Noise-based organic motion
        float noiseVal = noise3D(pos * uNoiseScale * 100.0 + vec3(uTime * uSpeed * 0.5, 0.0, uTime * uSpeed * 0.3));
        vec3 noiseOffset = vec3(
          noiseVal * 0.01,
          noise3D(pos * uNoiseScale * 100.0 + vec3(0.0, uTime * uSpeed * 0.5, 100.0)) * 0.01,
          noise3D(pos * uNoiseScale * 100.0 + vec3(100.0, 0.0, uTime * uSpeed * 0.5)) * 0.01
        );

        // Cursor repulsion
        vec3 repulsion = vec3(0.0);
        if (uCursorRepulsionEnabled && uCursorPosition.x >= 0.0) {
          vec2 cursorNDC = uCursorPosition * 2.0 - 1.0;
          vec2 particleNDC = (gl_Position.xy / gl_Position.w) * 0.5 + 0.5;
          float dist = distance(cursorNDC, particleNDC);
          float radius = uCursorRepulsionRadius / max(uResolution.x, uResolution.y);
          if (dist < radius && dist > 0.0) {
            float force = ((radius - dist) / radius) * uCursorRepulsionStrength;
            vec2 dir = normalize(particleNDC - cursorNDC);
            repulsion = vec3(dir * force * 0.02, 0.0);
          }
        }

        // Spring back to target
        vec3 spring = (aTargetPosition - pos) * 0.05;

        // Update velocity and position
        vec3 newVelocity = aVelocity * 0.92 + spring + noiseOffset + repulsion;
        vec3 newPos = pos + newVelocity;

        // Rotation
        float rotX = uTime * aRotationSpeed.x;
        float rotY = uTime * aRotationSpeed.y;
        float rotZ = uTime * aRotationSpeed.z;
        mat3 rotMat = mat3(
          vec3(cos(rotY)*cos(rotZ), -cos(rotY)*sin(rotZ), sin(rotY)),
          vec3(cos(rotX)*sin(rotZ)+sin(rotX)*sin(rotY)*cos(rotZ), cos(rotX)*cos(rotZ)-sin(rotX)*sin(rotY)*sin(rotZ), -sin(rotX)*cos(rotY)),
          vec3(sin(rotX)*sin(rotZ)-cos(rotX)*sin(rotY)*cos(rotZ), sin(rotX)*cos(rotZ)+cos(rotX)*sin(rotY)*sin(rotZ), cos(rotX)*cos(rotY))
        );

        vec3 rotatedPos = newPos; // Simplified - skip full rotation for performance

        vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        vColor = aBaseColor + (aTargetColor - aBaseColor) * uMorphProgress;
        vLife = aLife;
        vRandomScale = aRandomScale;
        vPosition = rotatedPos;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vLife;
      varying float vRandomScale;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float dist = length(uv);
        if (dist > 0.5) discard;

        float alpha = (1.0 - dist * 2.0) * vLife;
        vec3 color = vColor;

        // Glow effect
        float glow = 1.0 - dist * 2.0;
        color += vColor * glow * 0.3;

        gl_FragColor = vec4(color, alpha * 0.8);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMorphProgress: { value: 0 },
        uTime: { value: 0 },
        uNoiseScale: { value: 0.015 },
        uSpeed: { value: 0.3 },
        uCursorPosition: { value: new THREE.Vector2(-1, -1) },
        uCursorRepulsionRadius: { value: 150 },
        uCursorRepulsionStrength: { value: 0.8 },
        uCursorRepulsionEnabled: { value: true },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
    });

    materialRef.current = material;
    geometryRef.current = geometry;

    const mesh = new THREE.InstancedMesh(geometry, material, 1000);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    meshRef.current = mesh;

    return () => {
      geometry.dispose();
      material.dispose();
      mesh.geometry.dispose();
      mesh.material.dispose();
    };
  }, []);

  // Update target morph data when morph index or progress changes
  useEffect(() => {
    if (!geometryRef.current) return;

    const currentTarget = morphTargets[currentMorphIndex];
    const nextIndex = (currentMorphIndex + 1) % morphTargets.length;
    const nextTarget = morphTargets[nextIndex];

    const basePosAttr = geometryRef.current.getAttribute('aBasePosition') as THREE.InstancedBufferAttribute;
    const baseColorAttr = geometryRef.current.getAttribute('aBaseColor') as THREE.InstancedBufferAttribute;
    const baseSizeAttr = geometryRef.current.getAttribute('aBaseSize') as THREE.InstancedBufferAttribute;
    const targetPosAttr = geometryRef.current.getAttribute('aTargetPosition') as THREE.InstancedBufferAttribute;
    const targetColorAttr = geometryRef.current.getAttribute('aTargetColor') as THREE.InstancedBufferAttribute;
    const targetSizeAttr = geometryRef.current.getAttribute('aTargetSize') as THREE.InstancedBufferAttribute;

    if (morphProgress === 0) {
      // Copy current to base
      basePosAttr.array.set(currentTarget.positions);
      baseColorAttr.array.set(currentTarget.colors);
      baseSizeAttr.array.set(currentTarget.sizes);
    }

    // Always update target
    targetPosAttr.array.set(nextTarget.positions);
    targetColorAttr.array.set(nextTarget.colors);
    targetSizeAttr.array.set(nextTarget.sizes);

    basePosAttr.needsUpdate = true;
    baseColorAttr.needsUpdate = true;
    baseSizeAttr.needsUpdate = true;
    targetPosAttr.needsUpdate = true;
    targetColorAttr.needsUpdate = true;
    targetSizeAttr.needsUpdate = true;
  }, [currentMorphIndex, morphProgress, morphTargets]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const elapsed = (state.clock.elapsedTime - startTimeRef.current) * speed;

    materialRef.current.uniforms.uTime.value = elapsed;
    materialRef.current.uniforms.uMorphProgress.value = morphProgress;
    materialRef.current.uniforms.uNoiseScale.value = noiseScale;
    materialRef.current.uniforms.uSpeed.value = speed;

    if (cursorPosition) {
      materialRef.current.uniforms.uCursorPosition.value.set(cursorPosition.x, cursorPosition.y);
    } else {
      materialRef.current.uniforms.uCursorPosition.value.set(-1, -1);
    }

    // Update rotation for all particles
    if (geometryRef.current) {
      const rotationSpeedAttr = geometryRef.current.getAttribute('aRotationSpeed') as THREE.InstancedBufferAttribute;
      const lifeAttr = geometryRef.current.getAttribute('aLife') as THREE.InstancedBufferAttribute;
      const decayAttr = geometryRef.current.getAttribute('aDecay') as THREE.InstancedBufferAttribute;
      const velocityAttr = geometryRef.current.getAttribute('aVelocity') as THREE.InstancedBufferAttribute;
      const basePosAttr = geometryRef.current.getAttribute('aBasePosition') as THREE.InstancedBufferAttribute;
      const targetPosAttr = geometryRef.current.getAttribute('aTargetPosition') as THREE.InstancedBufferAttribute;
      const baseSizeAttr = geometryRef.current.getAttribute('aBaseSize') as THREE.InstancedBufferAttribute;
      const targetSizeAttr = geometryRef.current.getAttribute('aTargetSize') as THREE.InstancedBufferAttribute;

      const count = 1000;

      for (let i = 0; i < count; i++) {
        // Update life
        const lifeAttr = geometryRef.current.getAttribute('aLife') as THREE.InstancedBufferAttribute;
        const decayAttr = geometryRef.current.getAttribute('aDecay') as THREE.InstancedBufferAttribute;

        // We'll handle life in shader
      }

      basePosAttr.needsUpdate = true;
      targetPosAttr.needsUpdate = true;
      if (meshRef.current) {
        meshRef.current.instanceMatrix.needsUpdate = true;
      }
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometryRef.current!} material={materialRef.current!} />
  );
}

export function OriginParticleScene3D({
  config,
  isActive,
  fallbackImage,
  priority = false,
  className = '',
  scrollProgress = 0,
}: OriginParticleScene3DProps) {
  const prefersReducedMotion = useMotionGate();
  const [showFallback, setShowFallback] = useState(true);
  const [isInViewport, setIsInViewport] = useState(true);
  const [currentMorphIndex, setCurrentMorphIndex] = useState(0);
  const [morphProgress, setMorphProgress] = useState(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Determine morph target based on scroll progress
  useEffect(() => {
    const newIndex = Math.min(Math.floor(scrollProgress * MORPH_ORDER.length), MORPH_ORDER.length - 1);
    if (newIndex !== currentMorphIndex) {
      setCurrentMorphIndex(newIndex);
      setMorphProgress(0);

      // Animate morph progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 16 / config.animation.morphDuration;
        if (progress >= 1) {
          setMorphProgress(1);
          clearInterval(interval);
        } else {
          setMorphProgress(progress);
        }
      }, 16);
      return () => clearInterval(interval);
    }
  }, [scrollProgress, config.animation.morphDuration]);

  // Viewport observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const container = document.querySelector(`[data-origin-3d="${config.id}"]`);
    if (container) observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    const handleMouseLeave = () => setMousePos(null);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Initialize particles
  useEffect(() => {
    if (!prefersReducedMotion) {
      setTimeout(() => setShowFallback(false), 500);
    }
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          'relative w-full h-full overflow-hidden rounded-[1.5rem]',
          className
        )}
        style={{ backgroundColor: config.bgColor }}
        data-origin-3d={config.id}
      >
        <img
          src={fallbackImage}
          alt={config.description}
          className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem] opacity-60"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden rounded-[1.5rem]',
        className
      )}
      style={{ backgroundColor: config.bgColor }}
      data-origin-3d={config.id}
    >
      {/* Fallback Image */}
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-500 ease-out z-[1] rounded-[1.5rem]',
          showFallback ? 'opacity-100' : 'opacity-0'
        )}
      >
        <img
          src={fallbackImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem]"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>

      {/* 3D Canvas */}
      <Canvas
        className={cn(
          'absolute inset-0 w-full h-full z-[2] transition-opacity duration-500 ease-out',
          !showFallback ? 'opacity-100' : 'opacity-0'
        )}
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: true }}
        style={{ touchAction: 'none' }}
      >
        <color attach="background" args={[config.bgColor]} />
        <fog attach="fog" args={[config.bgColor, 10, 50]} />

        <ParticleSystem
          particleCount={config.particleCount}
          scrollProgress={scrollProgress}
          cursorPosition={mousePos}
          currentMorphIndex={currentMorphIndex}
          morphProgress={morphProgress}
          noiseScale={config.animation.noiseScale}
          speed={config.animation.speed}
          colorPalette={config.colorPalette}
          cursorRepulsion={config.cursorRepulsion}
        />
      </Canvas>
    </div>
  );
}

export default OriginParticleScene3D;
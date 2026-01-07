'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface GhostParams {
  bodyColor: number;
  glowColor: string;
  eyeGlowColor: string;
  ghostOpacity: number;
  ghostScale: number;
  emissiveIntensity: number;
  pulseSpeed: number;
  pulseIntensity: number;
  eyeGlowIntensity: number;
  eyeGlowDecay: number;
  eyeGlowResponse: number;
  rimLightIntensity: number;
  followSpeed: number;
  wobbleAmount: number;
  floatSpeed: number;
  movementThreshold: number;
  revealRadius: number;
  fadeStrength: number;
  baseOpacity: number;
  revealOpacity: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface Eyes {
  leftEye: THREE.Mesh;
  rightEye: THREE.Mesh;
  leftGlow: THREE.Mesh;
  rightGlow: THREE.Mesh;
  eyeMaterial: THREE.MeshBasicMaterial;
  glowMaterial: THREE.MeshBasicMaterial;
}

const GHOST_PARAMS: GhostParams = {
  bodyColor: 0x0f2027,
  glowColor: 'blue',
  eyeGlowColor: 'blue',
  ghostOpacity: 0.88,
  ghostScale: 2.4,
  emissiveIntensity: 8.5,
  pulseSpeed: 1.6,
  pulseIntensity: 0.6,
  eyeGlowIntensity: 6.5,
  eyeGlowDecay: 0.95,
  eyeGlowResponse: 0.31,
  rimLightIntensity: 1.8,
  followSpeed: 0.03,
  wobbleAmount: 0.25,
  floatSpeed: 0.8,
  movementThreshold: 0.07,
  revealRadius: 15,
  fadeStrength: 2.5,
  baseOpacity: 0.3,
  revealOpacity: 0.01,
};

function GhostHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const ghostGroupRef = useRef<THREE.Group | null>(null);
  const ghostBodyRef = useRef<THREE.Mesh | null>(null);
  const ghostMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const atmosphereMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameRef = useRef<number>(0);
  const eyesRef = useRef<Eyes | null>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const prevMouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const movementRef = useRef(0);
  const lastGhostPosRef = useRef(new THREE.Vector3());
  const previousBodyStylesRef = useRef<{
    transform: string;
    backfaceVisibility: string;
    perspective: string;
  } | null>(null);

  const params = useMemo(() => GHOST_PARAMS, []);

  const createEyes = (group: THREE.Group): Eyes => {
    const eyeGroup = new THREE.Group();
    group.add(eyeGroup);

    const eyeGeometry = new THREE.SphereGeometry(0.3, 12, 12);
    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0080ff,
      transparent: true,
      opacity: 0,
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.7, 0.6, 2.0);
    eyeGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.7, 0.6, 2.0);
    eyeGroup.add(rightEye);

    const glowGeometry = new THREE.SphereGeometry(0.525, 12, 12);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x0080ff,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    });

    const leftGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    leftGlow.position.set(-0.7, 0.6, 1.95);
    eyeGroup.add(leftGlow);

    const rightGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    rightGlow.position.set(0.7, 0.6, 1.95);
    eyeGroup.add(rightGlow);

    return {
      leftEye,
      rightEye,
      leftGlow,
      rightGlow,
      eyeMaterial,
      glowMaterial,
    };
  };

  useEffect(() => {
    if (!mountRef.current) return undefined;
    const mountElement = mountRef.current;

    previousBodyStylesRef.current = {
      transform: document.body.style.transform,
      backfaceVisibility: document.body.style.backfaceVisibility,
      perspective: document.body.style.perspective,
    };
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    document.body.style.perspective = '1000px';

    const materials = new Set<THREE.Material>();
    const geometries = new Set<THREE.BufferGeometry>();

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
      premultipliedAlpha: false,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountElement.appendChild(renderer.domElement);

    try {
      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.3,
        1.25,
        0.0
      );
      composer.addPass(bloomPass);

      composerRef.current = composer;
      bloomPassRef.current = bloomPass;
    } catch (error) {
      console.warn(
        'Post-processing disabled; falling back to raw render.',
        error
      );
      composerRef.current = null;
      bloomPassRef.current = null;
    }

    const atmosphereShader = {
      uniforms: {
        ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
        revealRadius: { value: params.revealRadius },
        fadeStrength: { value: params.fadeStrength },
        baseOpacity: { value: params.baseOpacity },
        revealOpacity: { value: params.revealOpacity },
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
          float dynamicRadius = revealRadius * 0.3 + sin(time * 2.0) * 1.0;
          float reveal = smoothstep(dynamicRadius * 0.4, dynamicRadius, dist);
          reveal = pow(reveal, fadeStrength * 2.5);
          float opacity = mix(revealOpacity * 0.5, baseOpacity * 0.3, reveal);
          gl_FragColor = vec4(0.0, 0.2, 1.0, opacity * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
    };

    const atmosphereGeometry = new THREE.PlaneGeometry(300, 300);
    const atmosphereMaterial = new THREE.ShaderMaterial(atmosphereShader);
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.position.z = -50;
    atmosphere.renderOrder = -100;
    scene.add(atmosphere);
    atmosphereRef.current = atmosphere;
    atmosphereMaterialRef.current = atmosphereMaterial;
    geometries.add(atmosphereGeometry);
    materials.add(atmosphereMaterial);

    const ghostGroup = new THREE.Group();
    scene.add(ghostGroup);
    ghostGroupRef.current = ghostGroup;

    const ghostGeometry = new THREE.SphereGeometry(2, 40, 40);
    const positionAttribute = ghostGeometry.getAttribute('position');
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }
    ghostGeometry.computeVertexNormals();

    const ghostMaterial = new THREE.MeshStandardMaterial({
      color: params.bodyColor,
      transparent: true,
      opacity: params.ghostOpacity,
      emissive: 0x0080ff,
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02,
      metalness: 0.0,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
    });

    const ghostBody = new THREE.Mesh(ghostGeometry, ghostMaterial);
    ghostGroup.add(ghostBody);
    ghostBodyRef.current = ghostBody;
    ghostMaterialRef.current = ghostMaterial;
    geometries.add(ghostGeometry);
    materials.add(ghostMaterial);

    const eyes = createEyes(ghostGroup);
    eyesRef.current = eyes;
    materials.add(eyes.eyeMaterial);
    materials.add(eyes.glowMaterial);
    if (eyes.leftEye.geometry)
      geometries.add(eyes.leftEye.geometry as THREE.BufferGeometry);
    if (eyes.leftGlow.geometry)
      geometries.add(eyes.leftGlow.geometry as THREE.BufferGeometry);

    lastGhostPosRef.current.copy(ghostGroup.position);

    const handleMouseMove = (e: MouseEvent) => {
      if (!rendererRef.current) return;
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 2)
      );
      if (composerRef.current) composerRef.current.setSize(width, height);
      if (bloomPassRef.current) bloomPassRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();
    const mouseDirection = new THREE.Vector2();

    const animate = (timestamp: number) => {
      if (
        !sceneRef.current ||
        !cameraRef.current ||
        !ghostGroupRef.current ||
        !atmosphereMaterialRef.current ||
        !ghostBodyRef.current ||
        !ghostMaterialRef.current
      ) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaMs = Math.min(100, timestamp - lastTime);
      lastTime = timestamp;
      const frameStep = deltaMs / 16.67;
      timeRef.current += frameStep * 0.01;

      const ghostGroup = ghostGroupRef.current;
      const ghostBody = ghostBodyRef.current;
      const ghostMaterial = ghostMaterialRef.current;
      const atmosphereMaterial = atmosphereMaterialRef.current;

      const targetX = mouseRef.current.x * 8;
      const targetY = mouseRef.current.y * 5;

      ghostGroup.position.x +=
        (targetX - ghostGroup.position.x) * params.followSpeed;
      ghostGroup.position.y +=
        (targetY - ghostGroup.position.y) * params.followSpeed;

      const float1 = Math.sin(timeRef.current * params.floatSpeed * 1.5) * 0.03;
      const float2 =
        Math.cos(timeRef.current * params.floatSpeed * 0.7) * 0.018;
      const float3 =
        Math.sin(timeRef.current * params.floatSpeed * 2.3) * 0.008;
      ghostGroup.position.y += float1 + float2 + float3;

      atmosphereMaterial.uniforms.time.value = timeRef.current;
      atmosphereMaterial.uniforms.ghostPosition.value.copy(ghostGroup.position);

      const movementAmount = lastGhostPosRef.current.distanceTo(
        ghostGroup.position
      );
      movementRef.current =
        movementRef.current * params.eyeGlowDecay +
        movementAmount * (1 - params.eyeGlowDecay);
      lastGhostPosRef.current.copy(ghostGroup.position);

      const pulse1 =
        Math.sin(timeRef.current * params.pulseSpeed * 0.8) *
        params.pulseIntensity *
        0.7;
      ghostMaterial.emissiveIntensity = params.emissiveIntensity + pulse1;

      mouseDirection.set(
        targetX - ghostGroup.position.x,
        targetY - ghostGroup.position.y
      );
      if (mouseDirection.lengthSq() > 0.0001) {
        mouseDirection.normalize();
      } else {
        mouseDirection.set(0, 0);
      }
      const tiltStrength = 0.1 * params.wobbleAmount;
      const tiltDecay = 0.95;
      ghostBody.rotation.z =
        ghostBody.rotation.z * tiltDecay -
        mouseDirection.x * tiltStrength * (1 - tiltDecay);
      ghostBody.rotation.x =
        ghostBody.rotation.x * tiltDecay +
        mouseDirection.y * tiltStrength * (1 - tiltDecay);
      ghostBody.rotation.y =
        Math.sin(timeRef.current * 1.4) * 0.05 * params.wobbleAmount;

      const scaleVariation =
        1 +
        Math.sin(timeRef.current * 2.1) * 0.025 * params.wobbleAmount +
        pulse1 * 0.015;
      const scaleBreath = 1 + Math.sin(timeRef.current * 0.8) * 0.012;
      ghostBody.scale.setScalar(scaleVariation * scaleBreath);

      if (eyesRef.current) {
        const targetGlow =
          movementRef.current > params.movementThreshold ? 1 : 0;
        const glowChangeSpeed = targetGlow
          ? params.eyeGlowResponse * 2
          : params.eyeGlowResponse;
        const newOpacity = THREE.MathUtils.lerp(
          eyesRef.current.eyeMaterial.opacity,
          targetGlow,
          glowChangeSpeed
        );
        eyesRef.current.eyeMaterial.opacity = newOpacity;
        eyesRef.current.glowMaterial.opacity = newOpacity * 0.3;
      }

      if (composerRef.current) {
        composerRef.current.render();
      } else if (rendererRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const fakeEvent = new MouseEvent('mousemove', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
    });
    window.dispatchEvent(fakeEvent);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);

      materials.forEach((material) => material.dispose());
      geometries.forEach((geometry) => geometry.dispose());

      if (rendererRef.current && mountElement) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentNode === mountElement) {
          mountElement.removeChild(rendererRef.current.domElement);
        }
      }

      if (composerRef.current) {
        composerRef.current.dispose();
      }

      ghostGroupRef.current = null;
      ghostBodyRef.current = null;
      eyesRef.current = null;
      atmosphereRef.current = null;
      atmosphereMaterialRef.current = null;

      if (previousBodyStylesRef.current) {
        document.body.style.transform = previousBodyStylesRef.current.transform;
        document.body.style.backfaceVisibility =
          previousBodyStylesRef.current.backfaceVisibility;
        document.body.style.perspective =
          previousBodyStylesRef.current.perspective;
      }
    };
  }, [params]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }} // Ensure interaction doesn't block if not intended, though HomeHero controls z-index of the container
    />
  );
}

export default GhostHero;

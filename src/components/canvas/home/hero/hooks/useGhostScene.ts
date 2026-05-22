import { useRef, useCallback } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// @ts-ignore
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
// @ts-ignore
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import { GhostSceneParams, FLUORESCENT_COLORS } from '../types';
import { analogDecayShader } from '../shaders/analog-decay';
import {
  atmosphereVertexShader,
  atmosphereFragmentShader,
} from '../shaders/atmosphere';
import { createEyes } from '../utils';

export function useGhostScene(
  mountRef: React.RefObject<HTMLDivElement | null>,
  params: GhostSceneParams,
  performanceConfig: any,
  updateProgress: (_step: number) => void
) {
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const ghostGroupRef = useRef<THREE.Group>(new THREE.Group());
  const ghostMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const atmosphereMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const bloomPassRef = useRef<any>(null);
  const analogDecayPassRef = useRef<any>(null);
  const eyesRef = useRef<any>(null);
  const sharedFireflyLightRef = useRef<THREE.PointLight | null>(null);
  const onResizeRef = useRef<(() => void) | null>(null);

  const init = useCallback(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    updateProgress(1);

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

    // Cap DPR at 1.5 — bloom cost scales quadratically with pixel ratio on retina
    renderer.setPixelRatio(Math.min(performanceConfig.pixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = params.exposure;
    renderer.setClearColor(0x000000, 0);

    // Canvas Styling
    renderer.domElement.classList.add(
      'opacity-0',
      'transition-opacity',
      'duration-1000',
      'ease-in-out'
    );
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.background = 'transparent';
    renderer.domElement.setAttribute(
      'aria-label',
      'Interactive 3D Ghost Portfolio Experience'
    );
    renderer.domElement.setAttribute('role', 'img');

    mountElement.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    updateProgress(2);

    // Post-Processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(sceneRef.current, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      params.bloomStrength,
      params.bloomRadius,
      params.bloomThreshold
    );
    composer.addPass(bloomPass);
    bloomPassRef.current = bloomPass;

    const analogDecayPass = new ShaderPass({
      ...analogDecayShader,
      uniforms: {
        ...THREE.UniformsUtils.clone(analogDecayShader.uniforms),
        uAnalogIntensity: { value: params.analogIntensity },
        uAnalogGrain: { value: params.analogGrain },
        uAnalogBleeding: { value: params.analogBleeding },
        uAnalogVSync: { value: params.analogVSync },
        uAnalogScanlines: { value: params.analogScanlines },
        uAnalogVignette: { value: params.analogVignette },
        uAnalogJitter: { value: params.analogJitter },
      },
    });
    composer.addPass(analogDecayPass);
    analogDecayPassRef.current = analogDecayPass;

    const outputPass = new OutputPass();
    composer.addPass(outputPass);
    composerRef.current = composer;

    updateProgress(3);

    // Atmosphere
    const atmosphereGeometry = new THREE.PlaneGeometry(300, 300);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
        revealRadius: { value: params.revealRadius },
        fadeStrength: { value: params.fadeStrength },
        baseOpacity: { value: params.baseOpacity },
        revealOpacity: { value: params.revealOpacity },
        time: { value: 0 },
      },
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      transparent: true,
      depthWrite: false,
    });
    atmosphereMaterialRef.current = atmosphereMaterial;

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.position.z = -50;
    atmosphere.renderOrder = -1000;
    sceneRef.current.add(atmosphere);

    const ambientLight = new THREE.AmbientLight(
      params.ambientLightColor,
      params.ambientLightIntensity
    );
    sceneRef.current.add(ambientLight);

    // Ghost
    sceneRef.current.add(ghostGroupRef.current);

    const ghostGeometry = new THREE.SphereGeometry(2, 40, 40);
    const positions = ghostGeometry.getAttribute('position')
      .array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise =
          Math.sin(x * 5) * 0.35 +
          Math.cos(z * 4) * 0.25 +
          Math.sin((x + z) * 3) * 0.15;
        positions[i + 1] = -2.0 + noise;
      }
    }
    ghostGeometry.computeVertexNormals();

    const ghostMaterial = new THREE.MeshStandardMaterial({
      color: params.bodyColor,
      transparent: true,
      opacity: params.ghostOpacity,
      emissive: FLUORESCENT_COLORS[params.glowColor],
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02,
      metalness: 0.0,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
    });
    ghostMaterialRef.current = ghostMaterial;

    const ghostBody = new THREE.Mesh(ghostGeometry, ghostMaterial);
    ghostGroupRef.current.add(ghostBody);

    const rimLight1 = new THREE.DirectionalLight(
      params.rimLightColor1,
      params.rimLightIntensity
    );
    rimLight1.position.set(-8, 6, -4);
    sceneRef.current.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(
      params.rimLightColor2,
      params.rimLightIntensity * 0.7
    );
    rimLight2.position.set(8, -4, -6);
    sceneRef.current.add(rimLight2);

    updateProgress(4);

    // Eyes
    eyesRef.current = createEyes(ghostGroupRef.current, params.eyeGlowColor);

    // Firefly Light
    const sharedFireflyLight = new THREE.PointLight(0xffff44, 1.5, 15, 2);
    sceneRef.current.add(sharedFireflyLight);
    sharedFireflyLightRef.current = sharedFireflyLight;

    // Resize Handler
    onResizeRef.current = () => {
      if (
        !cameraRef.current ||
        !rendererRef.current ||
        !composerRef.current ||
        !bloomPassRef.current
      )
        return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      composerRef.current.setSize(window.innerWidth, window.innerHeight);
      bloomPassRef.current.resolution.set(
        window.innerWidth,
        window.innerHeight
      );
    };
    window.addEventListener('resize', onResizeRef.current);

    updateProgress(5);
  }, [mountRef, params, performanceConfig, updateProgress]);

  const cleanup = useCallback(() => {
    if (onResizeRef.current) {
      window.removeEventListener('resize', onResizeRef.current);
    }

    if (rendererRef.current && mountRef.current) {
      if (mountRef.current.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    }

    sceneRef.current.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        } else if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        }
        if (object instanceof THREE.InstancedMesh) {
          object.dispose();
        }
      }
    });

    sceneRef.current.clear();
    ghostGroupRef.current.clear();

    rendererRef.current?.dispose();
    composerRef.current?.dispose();
  }, [mountRef]);

  return {
    scene: sceneRef.current,
    cameraRef,
    rendererRef,
    composerRef,
    ghostGroup: ghostGroupRef.current,
    ghostMaterialRef,
    atmosphereMaterialRef,
    bloomPassRef,
    analogDecayPassRef,
    eyesRef,
    sharedFireflyLightRef,
    init,
    cleanup,
  };
}

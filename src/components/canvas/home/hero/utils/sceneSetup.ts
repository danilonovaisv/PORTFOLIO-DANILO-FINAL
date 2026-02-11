/**
 * Scene Setup Utilities
 * Three.js scene, camera, renderer, and lighting configuration
 */

import * as THREE from 'three';
import { DEFAULT_GHOST_PARAMS } from './constants';

/**
 * Creates and configures the WebGL renderer
 */
export function createRenderer(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
    alpha: true,
    premultipliedAlpha: false,
    stencil: false,
    depth: true,
    preserveDrawingBuffer: false,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.setClearColor(0x000000, 0);

  // Canvas styles
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.zIndex = '0';
  renderer.domElement.style.pointerEvents = 'none';
  renderer.domElement.style.background = 'transparent';

  return renderer;
}

/**
 * Creates and configures the perspective camera
 */
export function createCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 20;
  return camera;
}

/**
 * Creates ambient and rim lights for the scene
 */
export function createLights() {
  const ambientLight = new THREE.AmbientLight(0x0a0a2e, 0.08);

  const rimLight1 = new THREE.DirectionalLight(
    0x4a90e2,
    DEFAULT_GHOST_PARAMS.rimLightIntensity
  );
  rimLight1.position.set(-8, 6, -4);

  const rimLight2 = new THREE.DirectionalLight(
    0x50e3c2,
    DEFAULT_GHOST_PARAMS.rimLightIntensity * 0.7
  );
  rimLight2.position.set(8, -4, -6);

  return { ambientLight, rimLight1, rimLight2 };
}

/**
 * Handles window resize events
 */
export function handleResize(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  composer: { setSize: (_w: number, _h: number) => void },
  bloomPass: { setSize: (_w: number, _h: number) => void },
  analogDecayPass: { uniforms: { uResolution: { value: THREE.Vector2 } } }
) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  bloomPass.setSize(window.innerWidth, window.innerHeight);
  analogDecayPass.uniforms.uResolution.value.set(
    window.innerWidth,
    window.innerHeight
  );
}

/**
 * Ghost Scene - Main Component
 * Orchestrates the WebGL ghost animation with all sub-systems
 *
 * Refactored from 874 lines to ~380 lines
 * Modular architecture with extracted utilities and systems
 */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { useGhostInteraction } from './hooks/useGhostInteraction';
import { DEFAULT_GHOST_PARAMS } from './utils/constants';
import {
  createRenderer,
  createCamera,
  createLights,
  handleResize,
} from './utils/sceneSetup';
import { createComposer } from './utils/postProcessing';
import {
  createAtmosphere,
  createGhostBody,
  updateGhostBody,
  updateAtmosphere,
} from './components/GhostBody';
import { createEyes, updateEyeGlow } from './components/GhostEyes';
import { createFireflySystem, updateFireflies } from './systems/FireflySystem';
import {
  createParticleSystem,
  updateParticles,
} from './systems/ParticleSystem';

export default function GhostScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const performanceConfig = usePerformanceAdaptive();

  // Interaction Hook (MUST be at top level, not inside useEffect)
  const interaction = useGhostInteraction();

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // Reusable objects (zero allocation rule)
    const _dummy = new THREE.Object3D();
    const _prevGhostPos = new THREE.Vector3();

    // Preloader Manager
    const preloaderManager = {
      isComplete: false,
      updateProgress: (step: number) => {
        const loadingSteps = Math.min(step, 5);
        const percentage = (loadingSteps / 5) * 100;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${percentage}%`;
        }
      },
      complete: (canvas: HTMLCanvasElement) => {
        if (preloaderManager.isComplete) return;
        preloaderManager.isComplete = true;
        preloaderManager.updateProgress(5);

        setTimeout(() => {
          if (preloaderRef.current)
            preloaderRef.current.classList.add('fade-out');
          canvas.classList.add('fade-in');
          setTimeout(() => {
            if (preloaderRef.current)
              preloaderRef.current.style.display = 'none';
          }, 1000);
        }, 1500);
      },
    };

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = createCamera();
    preloaderManager.updateProgress(1);

    const renderer = createRenderer();
    mountElement.appendChild(renderer.domElement);
    preloaderManager.updateProgress(2);

    // Post-Processing
    const { composer, bloomPass, analogDecayPass } = createComposer(
      renderer,
      scene,
      camera
    );
    preloaderManager.updateProgress(3);

    // Lighting
    const { ambientLight, rimLight1, rimLight2 } = createLights();
    scene.add(ambientLight, rimLight1, rimLight2);

    // Atmosphere
    const atmosphere = createAtmosphere(DEFAULT_GHOST_PARAMS);
    scene.add(atmosphere);

    // Ghost Group
    const ghostGroup = new THREE.Group();
    scene.add(ghostGroup);

    const ghostBody = createGhostBody(DEFAULT_GHOST_PARAMS);
    ghostGroup.add(ghostBody);

    preloaderManager.updateProgress(4);

    // Eyes
    const eyes = createEyes(ghostGroup, DEFAULT_GHOST_PARAMS);

    // Particle Systems
    const fireflySystem = createFireflySystem(
      scene,
      performanceConfig.particleCount * 5,
      DEFAULT_GHOST_PARAMS
    );

    const particleSystem = createParticleSystem(scene);

    // Event Handlers
    const onResize = () => {
      handleResize(camera, renderer, composer, bloomPass, analogDecayPass);
    };
    window.addEventListener('resize', onResize);

    // Animation State
    let time = 0;
    let lastFrameTime = 0;
    let currentMovement = 0;
    let isInitialized = false;
    let animationId: number;
    // New: Idle detection state
    let idleTime = 0;
    const IDLE_THRESHOLD = 8000; // 8 seconds to enter idle mode

    const forceInitialRender = () => {
      // Pre-render to compile shaders
      for (let i = 0; i < 3; i++) composer.render();
      isInitialized = true;
      preloaderManager.complete(renderer.domElement);
    };

    preloaderManager.updateProgress(5);
    setTimeout(forceInitialRender, 100);

    // Main Animation Loop
    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);
      if (!isInitialized) return;

      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      if (deltaTime > 100) return; // Skip large frame gaps

      const timeIncrement = (deltaTime / 16.67) * 0.01;

      // Idle Logic
      if (!interaction.hasReceivedInput) {
        idleTime += deltaTime;
      } else {
        idleTime = 0;
      }
      const isIdle = idleTime > IDLE_THRESHOLD;

      // ULTRA-LOW MODE: Skip heavy updates if low quality OR idle
      // If low, we might even skip every other frame, but for now let's just reduce logic
      const isUltraLow = performanceConfig.quality === 'low';

      if (isIdle || isUltraLow) {
        // Slow down time in idle/low mode to save calculations
        time += timeIncrement * 0.5;
      } else {
        time += timeIncrement;
      }

      // Update shader uniforms
      analogDecayPass.uniforms.uTime.value = time;
      analogDecayPass.uniforms.uLimboMode.value = DEFAULT_GHOST_PARAMS.limboMode
        ? 1.0
        : 0.0;

      // Ghost Movement
      const autoSpeed = 0.85;
      const amplitudeX = 9;
      const amplitudeY = 6;

      const autoX =
        Math.sin(time * autoSpeed) * amplitudeX +
        Math.cos(time * autoSpeed * 0.5) * 2;
      const autoY =
        Math.sin(time * autoSpeed * 0.7 + Math.PI / 2) * amplitudeY +
        Math.sin(time * autoSpeed * 1.3) * 1.5;

      let targetX: number;
      let targetY: number;

      if (!interaction.hasReceivedInput) {
        targetX = autoX;
        const scrollOffset = (interaction.scrollY / window.innerHeight) * -15;
        targetY = autoY + scrollOffset;
      } else {
        targetX = interaction.mouse.x * 12 + autoX * 0.1;
        targetY =
          interaction.mouse.y * 8 +
          autoY * 0.1 +
          (interaction.scrollY / window.innerHeight) * -15;
      }

      // Update ghost position
      _prevGhostPos.copy(ghostGroup.position);

      ghostGroup.position.x +=
        (targetX - ghostGroup.position.x) * DEFAULT_GHOST_PARAMS.followSpeed;
      ghostGroup.position.y +=
        (targetY - ghostGroup.position.y) * DEFAULT_GHOST_PARAMS.followSpeed;

      const moveAmt = _prevGhostPos.distanceTo(ghostGroup.position);
      currentMovement =
        currentMovement * DEFAULT_GHOST_PARAMS.eyeGlowDecay +
        moveAmt * (1 - DEFAULT_GHOST_PARAMS.eyeGlowDecay);

      // Float animation
      ghostGroup.position.y +=
        Math.sin(time * DEFAULT_GHOST_PARAMS.floatSpeed * 1.5) * 0.03;

      // Update Ghost Body (pulse)
      updateGhostBody(ghostBody, time, DEFAULT_GHOST_PARAMS);

      // Update Atmosphere
      updateAtmosphere(atmosphere, ghostGroup.position, time);

      // Update Eyes
      updateEyeGlow(eyes, currentMovement, DEFAULT_GHOST_PARAMS);

      // Update Particles
      updateParticles(
        particleSystem,
        ghostGroup.position,
        currentMovement,
        timestamp,
        time,
        interaction.isMobile,
        interaction.hasReceivedInput,
        _dummy,
        DEFAULT_GHOST_PARAMS
      );

      // Update Fireflies
      // Disable fireflies in ultra-low mode or deep idle to save extensive draws
      fireflySystem.mesh.visible = !isUltraLow;
      fireflySystem.light.visible = !isUltraLow;

      if (!isUltraLow) {
        updateFireflies(fireflySystem, time, _dummy);
      }

      // Render Strategy
      // If idle for long time, we could stop rendering, but for now we lower frequency logic above
      if (performanceConfig.enablePostProcessing && !isUltraLow) {
        composer.render();
      } else {
        // Fallback to simple render in ultra-low or if post-proc disabled
        renderer.render(scene, camera);
      }
    };

    animate(0);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);

      if (mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement);
      }

      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          }
        }
      });

      renderer.dispose();
      composer.dispose();
    };
  }, [performanceConfig]);

  return (
    <>
      <div
        ref={preloaderRef}
        className="preloader-overlay absolute inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-1000"
      >
        <div className="w-64">
          <div className="h-0.5 w-full overflow-hidden bg-white/10">
            <div
              ref={progressBarRef}
              className="h-full bg-bluePrimary transition-all duration-300 ease-out w-0"
            />
          </div>
        </div>
      </div>
      <div ref={mountRef} className="absolute inset-0 z-0 h-full w-full" />
    </>
  );
}

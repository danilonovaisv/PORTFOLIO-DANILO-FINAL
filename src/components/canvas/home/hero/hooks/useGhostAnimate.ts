import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { GhostSceneParams } from '../types';

export function useGhostAnimate(
  params: GhostSceneParams,
  scene: THREE.Scene,
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>,
  rendererRef: React.RefObject<THREE.WebGLRenderer | null>,
  composerRef: React.RefObject<any>,
  ghostGroup: THREE.Group,
  ghostMaterialRef: React.RefObject<THREE.MeshStandardMaterial | null>,
  atmosphereMaterialRef: React.RefObject<THREE.ShaderMaterial | null>,
  analogDecayPassRef: React.RefObject<any>,
  eyesRef: React.RefObject<any>,
  sharedFireflyLightRef: React.RefObject<THREE.PointLight | null>,
  particleSystem: any,
  input: {
    mouse: THREE.Vector2;
    hasReceivedMouseInput: React.MutableRefObject<boolean>;
  },
  performanceConfig: any
) {
  const lastFrameTimeRef = useRef(0);
  const timeRef = useRef(0);
  const currentMovementRef = useRef(0);
  const prevGhostPosRef = useRef(new THREE.Vector3());

  const update = useCallback(
    (timestamp: number) => {
      if (lastFrameTimeRef.current === 0) {
        lastFrameTimeRef.current = timestamp;
        return;
      }

      const deltaTime = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;
      if (deltaTime > 100) return;

      const timeIncrement = (deltaTime / 16.67) * 0.01;
      timeRef.current += timeIncrement;
      const time = timeRef.current;

      const atmosphereMaterial = atmosphereMaterialRef.current;
      const analogDecayPass = analogDecayPassRef.current;
      const ghostMaterial = ghostMaterialRef.current;
      const eyes = eyesRef.current;
      const sharedFireflyLight = sharedFireflyLightRef.current;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      const composer = composerRef.current;

      if (
        !atmosphereMaterial ||
        !analogDecayPass ||
        !ghostMaterial ||
        !eyes ||
        !sharedFireflyLight ||
        !camera ||
        !renderer
      )
        return;

      // Uniforms
      atmosphereMaterial.uniforms.time.value = time;
      analogDecayPass.uniforms.uTime.value = time;
      analogDecayPass.uniforms.uLimboMode.value = params.limboMode ? 1.0 : 0.0;
      analogDecayPass.uniforms.uAnalogIntensity.value = params.analogIntensity;
      analogDecayPass.uniforms.uAnalogGrain.value = params.analogGrain;
      analogDecayPass.uniforms.uAnalogBleeding.value = params.analogBleeding;
      analogDecayPass.uniforms.uAnalogVSync.value = params.analogVSync;
      analogDecayPass.uniforms.uAnalogScanlines.value = params.analogScanlines;
      analogDecayPass.uniforms.uAnalogVignette.value = params.analogVignette;
      analogDecayPass.uniforms.uAnalogJitter.value = params.analogJitter;

      // Ghost Movement
      let targetX: number;
      let targetY: number;

      const autoSpeed = 0.85;
      const autoX =
        Math.sin(time * autoSpeed) * 9 + Math.cos(time * autoSpeed * 0.5) * 2;
      const autoY =
        Math.sin(time * autoSpeed * 0.7 + Math.PI / 2) * 6 +
        Math.sin(time * autoSpeed * 1.3) * 1.5;

      if (!input.hasReceivedMouseInput.current) {
        targetX = 0;
        targetY = 0;
      } else {
        targetX = input.mouse.x * 12 + autoX * 0.1;
        targetY = input.mouse.y * 8 + autoY * 0.1;
      }

      prevGhostPosRef.current.copy(ghostGroup.position);
      ghostGroup.position.x +=
        (targetX - ghostGroup.position.x) * params.followSpeed;
      ghostGroup.position.y +=
        (targetY - ghostGroup.position.y) * params.followSpeed;

      atmosphereMaterial.uniforms.ghostPosition.value.copy(ghostGroup.position);

      const moveAmt = prevGhostPosRef.current.distanceTo(ghostGroup.position);
      currentMovementRef.current =
        currentMovementRef.current * params.eyeGlowDecay +
        moveAmt * (1 - params.eyeGlowDecay);

      // Float
      ghostGroup.position.y += Math.sin(time * params.floatSpeed * 1.5) * 0.03;

      // Pulse — organic and non-monotonous dynamic pulse to match CodePen exactly
      const targetEmissive =
        params.emissiveIntensity +
        Math.sin(time * params.pulseSpeed) * params.pulseIntensity +
        Math.cos(time * params.pulseSpeed * 1.4) * params.pulseIntensity * 0.6 +
        Math.sin(time * 0.6) * 0.12;
      ghostMaterial.emissiveIntensity +=
        (targetEmissive - ghostMaterial.emissiveIntensity) * 0.08;

      // Eyes — uniform glow speed regardless of isMoving toggle (no step flash)
      const isMoving = currentMovementRef.current > params.movementThreshold;
      const targetGlow = isMoving ? 1.0 : 0.0;
      const glowChangeSpeed = 0.08;
      const newOpacity =
        eyes.leftEyeMaterial.opacity +
        (targetGlow - eyes.leftEyeMaterial.opacity) * glowChangeSpeed;

      eyes.leftEyeMaterial.opacity = newOpacity;
      eyes.rightEyeMaterial.opacity = newOpacity;
      eyes.leftOuterGlowMaterial.opacity = newOpacity * 0.3;
      eyes.rightOuterGlowMaterial.opacity = newOpacity * 0.3;

      // Particles
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const shouldCreate = isTouchDevice
        ? moveAmt > 0.003
        : params.createParticlesOnlyWhenMoving
          ? moveAmt > 0.005 && input.hasReceivedMouseInput.current
          : moveAmt > 0.005;

      if (shouldCreate) {
        particleSystem.spawnParticle(ghostGroup.position);
      }
      particleSystem.update(time, deltaTime);

      // Fireflies light
      sharedFireflyLight.position.x = Math.sin(time * 0.5) * 10;
      sharedFireflyLight.position.y = Math.cos(time * 0.3) * 5;

      // Render
      if (performanceConfig.enablePostProcessing && composer) {
        composer.render(deltaTime / 1000);
      } else {
        renderer.render(scene, camera);
      }
    },
    [
      params,
      scene,
      cameraRef,
      rendererRef,
      composerRef,
      ghostGroup,
      ghostMaterialRef,
      atmosphereMaterialRef,
      analogDecayPassRef,
      eyesRef,
      sharedFireflyLightRef,
      particleSystem,
      input,
      performanceConfig,
    ]
  );

  return { update };
}

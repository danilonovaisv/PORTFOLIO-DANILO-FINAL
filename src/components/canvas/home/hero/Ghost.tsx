'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
  ShaderPass,
} from 'three-stdlib';
import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';
import { AnalogDecayShader } from '@/components/canvas/shaders/AnalogShader';
import { GhostFireflies } from './GhostFireflies';
import { GhostParticles } from './GhostParticles';

// Extender para usar no React Three Fiber
extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass });

export function Ghost({
  particleCount: _particleCount = 100,
}: {
  particleCount?: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);
  const eyesRef = useRef<THREE.Group>(null!);

  const composerRef = useRef<EffectComposer | null>(null);
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);
  const analogPassRef = useRef<ShaderPass | null>(null);

  const { viewport, mouse, camera, scene, gl, size } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for motion tracking
  const prevPositionRef = useRef(new THREE.Vector3());
  const currentMovementRef = useRef(0);

  // Shader customization for "Skirt" deformation
  const onBeforeCompile = (shader: any) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      
      // Ghost Skirt Deformation
      float y = position.y;
      if (y < -0.2) {
        float x = position.x;
        float z = position.z;
        
        float noise1 = sin(x * 5.0) * 0.35;
        float noise2 = cos(z * 4.0) * 0.25;
        float noise3 = sin((x + z) * 3.0) * 0.15;
        
        transformed.y = -2.0 + noise1 + noise2 + noise3;
      }
      `
    );
  };

  // Inicializar o compositor de efeitos com Resize Handler
  useEffect(() => {
    if (!gl || !scene || !camera) return;

    // Garantir que o renderer suporte transparência
    gl.setClearColor(0x000000, 0);

    // Configurar Bloom e Composer
    const composer = new EffectComposer(gl);
    composer.setSize(size.width, size.height);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // FIXED: strength and radius were INVERTED!
    // CodePen reference: strength=0.3, radius=1.25, threshold=0.0
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.3, // strength (was 1.25 - FIXED)
      1.25, // radius (was 0.4 - FIXED)
      0.0 // threshold
    );
    composer.addPass(bloomPass);
    bloomPassRef.current = bloomPass;

    const analogPass = new ShaderPass(AnalogDecayShader);
    analogPass.uniforms.uResolution.value.set(size.width, size.height);
    composer.addPass(analogPass);
    analogPassRef.current = analogPass;

    composerRef.current = composer;
    setIsLoaded(true);

    return () => {
      composer.dispose();
      setIsLoaded(false);
    };
  }, [gl, scene, camera, size]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !bodyRef.current) return;

    const t = clock.getElapsedTime();

    // Atualizar passos de analog decay
    if (analogPassRef.current && analogPassRef.current.uniforms) {
      analogPassRef.current.uniforms.uTime.value = t;
      analogPassRef.current.uniforms.uAnalogGrain.value =
        GHOST_CONFIG.analogGrain;
      analogPassRef.current.uniforms.uAnalogBleeding.value =
        GHOST_CONFIG.analogBleeding;
      analogPassRef.current.uniforms.uAnalogVSync.value =
        GHOST_CONFIG.analogVSync;
      analogPassRef.current.uniforms.uAnalogScanlines.value =
        GHOST_CONFIG.analogScanlines;
      analogPassRef.current.uniforms.uAnalogVignette.value =
        GHOST_CONFIG.analogVignette;
      analogPassRef.current.uniforms.uAnalogJitter.value =
        GHOST_CONFIG.analogJitter;
      analogPassRef.current.uniforms.uAnalogIntensity.value =
        GHOST_CONFIG.analogIntensity;
      analogPassRef.current.uniforms.uLimboMode.value = GHOST_CONFIG.limboMode
        ? 1.0
        : 0.0;
    }

    // 1. Follow Mouse (Smooth)
    const targetX = mouse.x * viewport.width * 0.3;
    const targetY = mouse.y * viewport.height * 0.3;

    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * GHOST_CONFIG.followSpeed;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * GHOST_CONFIG.followSpeed;

    // 2. Float Animation (Idle)
    const floatY =
      Math.sin(t * GHOST_CONFIG.floatSpeed * 1.5) * 0.03 +
      Math.cos(t * GHOST_CONFIG.floatSpeed * 0.7) * 0.018;
    groupRef.current.position.y += floatY;

    // 3. Pulse (Emissive Heartbeat)
    const pulse =
      Math.sin(t * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity;
    if (bodyRef.current.material instanceof THREE.MeshStandardMaterial) {
      bodyRef.current.material.emissiveIntensity =
        GHOST_CONFIG.emissiveIntensity + pulse;
    }

    // 4. Rotation/Tilt (Velocity based)
    const velocityX = targetX - groupRef.current.position.x;
    const velocityY = targetY - groupRef.current.position.y;

    // Smooth Tilt
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -velocityX * 0.05,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      velocityY * 0.05,
      0.05
    );

    // 5. Eye Glow Logic
    if (eyesRef.current && eyesRef.current.userData?.leftEyeMaterial) {
      const prevPos = prevPositionRef.current;
      const movement = prevPos.distanceTo(groupRef.current.position);

      currentMovementRef.current =
        currentMovementRef.current * GHOST_CONFIG.eyeGlowDecay +
        movement * (4 - GHOST_CONFIG.eyeGlowDecay);

      prevPos.copy(groupRef.current.position);

      const isMoving =
        currentMovementRef.current > GHOST_CONFIG.movementThreshold;
      const targetOpacity = isMoving ? 1.0 : 0.0;
      const lerpFactor = isMoving
        ? GHOST_CONFIG.eyeGlowResponse * 2
        : GHOST_CONFIG.eyeGlowResponse;

      const {
        leftEyeMaterial,
        rightEyeMaterial,
        leftOuterMaterial,
        rightOuterMaterial,
      } = eyesRef.current.userData;

      leftEyeMaterial.opacity = THREE.MathUtils.lerp(
        leftEyeMaterial.opacity,
        targetOpacity,
        lerpFactor
      );
      rightEyeMaterial.opacity = leftEyeMaterial.opacity;
      leftOuterMaterial.opacity = leftEyeMaterial.opacity * 0.3;
      rightOuterMaterial.opacity = leftEyeMaterial.opacity * 0.3;
    }

    // Renderizar com efeitos (SEMPRE, se composer existir)
    if (composerRef.current && isLoaded) {
      composerRef.current.render();
    }
  }, 1);

  // Setup Eyes (Static Geometry)
  useEffect(() => {
    // Esconder o grupo de olhos até ser adicionado
    const eyesGroup = new THREE.Group();
    eyesRef.current = eyesGroup;

    const eyeColorHex = getConfigColorHex(GHOST_CONFIG.eyeGlowColor);

    // Esfera maior para os olhos (50% maior)
    const eyeGeo = new THREE.SphereGeometry(0.3, 12, 12);
    const outerGeo = new THREE.SphereGeometry(0.525, 12, 12); // 50% maior

    // Use MeshPhysicalMaterial para melhor controle de brilho e transparência
    const eyeMat = new THREE.MeshPhysicalMaterial({
      color: eyeColorHex,
      transparent: true,
      opacity: 0, // Começa invisível
      emissive: eyeColorHex,
      emissiveIntensity: 4.5, // Brilho dos olhos
      roughness: 0,
      metalness: 0.5,
    });

    const outerMat = new THREE.MeshPhysicalMaterial({
      color: eyeColorHex,
      transparent: true,
      opacity: 0, // Começa invisível
      emissive: eyeColorHex,
      emissiveIntensity: 2.0, // Brilho do anel externo
      roughness: 0,
      metalness: 0.5,
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    const leftOuter = new THREE.Mesh(outerGeo, outerMat.clone());
    const rightOuter = new THREE.Mesh(outerGeo, outerMat.clone());

    leftEye.position.set(-0.7, 0.6, 2.0);
    rightEye.position.set(0.7, 0.6, 2.0);
    leftOuter.position.set(-0.7, 0.6, 1.95);
    rightOuter.position.set(0.7, 0.6, 1.95);

    eyesGroup.add(leftEye, rightEye, leftOuter, rightOuter);

    eyesGroup.userData = {
      leftEyeMaterial: leftEye.material as THREE.MeshPhysicalMaterial,
      rightEyeMaterial: rightEye.material as THREE.MeshPhysicalMaterial,
      leftOuterMaterial: leftOuter.material as THREE.MeshPhysicalMaterial,
      rightOuterMaterial: rightOuter.material as THREE.MeshPhysicalMaterial,
    };

    // Garantir que os olhos estejam no grupo principal
    if (groupRef.current) {
      groupRef.current.add(eyesGroup);
    }
  }, []);

  return (
    <>
      <GhostFireflies />
      <GhostParticles
        ghostGroup={groupRef}
        movementRef={currentMovementRef}
        count={_particleCount}
      />
      <group ref={groupRef} name="ghost" scale={GHOST_CONFIG.ghostScale}>
        <mesh ref={bodyRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            color={getConfigColorHex(GHOST_CONFIG.bodyColor)}
            emissive={getConfigColorHex(GHOST_CONFIG.glowColor)}
            emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
            roughness={0.02}
            metalness={0.0}
            transparent
            opacity={GHOST_CONFIG.ghostOpacity}
            side={THREE.DoubleSide}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>
      </group>
    </>
  );
}

export default Ghost;

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

import { AnalogDecayShader } from '@/components/canvas/shaders/AnalogShader';
import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';

import { GhostFireflies } from './GhostFireflies';
import { GhostParticles } from './GhostParticles';

// Extender para usar no React Three Fiber
extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass });

export function Ghost({
  particleCount: _particleCount = 100,
  ghostRef,
}: {
  particleCount?: number;
  ghostRef?: React.RefObject<THREE.Group | null>;
}) {
  const internalRef = useRef<THREE.Group>(null!);
  const groupRef = ghostRef || internalRef;
  const eyesRef = useRef<THREE.Group>(new THREE.Group());
  const bodyRef = useRef<THREE.Mesh>(null!);

  const composerRef = useRef<EffectComposer | null>(null);
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);
  const analogPassRef = useRef<ShaderPass | null>(null);

  const { viewport, mouse, camera, scene, gl, size } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for motion tracking
  const prevPositionRef = useRef(new THREE.Vector3());
  const currentMovementRef = useRef(0);

  // Shader customization for "Skirt" deformation
  const onBeforeCompile = (shader: {
    uniforms: { [uniform: string]: THREE.IUniform };
    vertexShader: string;
    fragmentShader: string;
  }) => {
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

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.3, // strength - Audit ID #04
      1.15, // radius - Audit ID #04
      0.5 // threshold
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
      Math.sin(t * GHOST_CONFIG.floatSpeed * 0.5) * 0.03 +
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
      velocityY * 0.02,
      0.02
    );

    // 5. Eye Glow Logic
    if (eyesRef.current && eyesRef.current.userData?.leftEyeMaterial) {
      const prevPos = prevPositionRef.current;
      const movement = prevPos.distanceTo(groupRef.current.position);

      currentMovementRef.current =
        currentMovementRef.current * GHOST_CONFIG.eyeGlowDecay +
        movement * (5 - GHOST_CONFIG.eyeGlowDecay);

      prevPos.copy(groupRef.current.position);

      const isMoving =
        currentMovementRef.current > GHOST_CONFIG.movementThreshold;
      const targetOpacity = isMoving ? 1.0 : 0.0;
      const lerpFactor = isMoving
        ? GHOST_CONFIG.eyeGlowResponse
        : GHOST_CONFIG.eyeGlowResponse * 0.5;

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
      leftOuterMaterial.opacity = leftEyeMaterial.opacity * 0.63;
      rightOuterMaterial.opacity = leftEyeMaterial.opacity * 0.63;
    }

    // Renderizar com efeitos (SEMPRE, se composer existir)
    if (composerRef.current && isLoaded) {
      composerRef.current.render();
    }
  }, 0.5);

  // Setup Eyes (Static Geometry)
  useEffect(() => {
    if (!eyesRef.current) return;

    const eyeColorHex = getConfigColorHex(GHOST_CONFIG.eyeGlowColor);

    // 1. Soquetes (Sockets) pretos para dar profundidade - Conforme Referência
    const socketGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const socketMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const leftSocket = new THREE.Mesh(socketGeo, socketMat);
    leftSocket.position.set(-0.7, 0.6, 1.9);
    leftSocket.scale.set(1.1, 1.0, 0.6);

    const rightSocket = new THREE.Mesh(socketGeo, socketMat);
    rightSocket.position.set(0.7, 0.6, 1.9);
    rightSocket.scale.set(1.1, 1.0, 0.6);

    // 2. Olhos (Glow) - Conforme Referência
    const eyeGeo = new THREE.SphereGeometry(0.3, 12, 12);
    const outerGeo = new THREE.SphereGeometry(0.525, 12, 12);

    const eyeMat = new THREE.MeshBasicMaterial({
      color: eyeColorHex,
      transparent: true,
      opacity: 0.0,
    });

    const outerMat = new THREE.MeshBasicMaterial({
      color: eyeColorHex,
      transparent: true,
      opacity: 0.0,
      side: THREE.BackSide,
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    const leftOuter = new THREE.Mesh(outerGeo, outerMat.clone());
    const rightOuter = new THREE.Mesh(outerGeo, outerMat.clone());

    // Posições alinhadas com a referência
    leftEye.position.set(-0.7, 0.6, 2.0);
    rightEye.position.set(0.7, 0.6, 2.0);
    leftOuter.position.set(-0.7, 0.6, 1.95);
    rightOuter.position.set(0.7, 0.6, 1.95);

    // Limpar olhos anteriores para evitar duplicatas
    eyesRef.current.clear();
    eyesRef.current.add(
      leftSocket,
      rightSocket,
      leftEye,
      rightEye,
      leftOuter,
      rightOuter
    );

    eyesRef.current.userData = {
      leftEyeMaterial: leftEye.material as THREE.MeshBasicMaterial,
      rightEyeMaterial: rightEye.material as THREE.MeshBasicMaterial,
      leftOuterMaterial: leftOuter.material as THREE.MeshBasicMaterial,
      rightOuterMaterial: rightOuter.material as THREE.MeshBasicMaterial,
    };

    // Adicionar ao grupo principal
    if (groupRef.current) {
      groupRef.current.add(eyesRef.current);
    }
  }, [groupRef]);

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
            opacity={0.5} // 👈 More spectral
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>

        {/* Olhos já estão no grupo via useEffect */}
      </group>
    </>
  );
}

export default Ghost;

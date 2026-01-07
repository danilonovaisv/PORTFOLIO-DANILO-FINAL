'use client';

import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

// ============================================================================
// Ghost Component (forwardRef para expor posição ao RevealingText)
// ============================================================================
const Ghost = forwardRef<Group, React.JSX.IntrinsicElements['group']>(
  (props, ref) => {
    const group = useRef<Group>(null);
    const bodyMesh = useRef<Mesh>(null);
    const bodyMaterial = useRef<MeshStandardMaterial>(null);
    const leftEyeMat = useRef<THREE.MeshBasicMaterial>(null);
    const rightEyeMat = useRef<THREE.MeshBasicMaterial>(null);

    // Expor o group.current via ref
    useImperativeHandle(ref, () => group.current as Group);

    const { viewport, size } = useThree();
    const prevPosition = useRef(new Vector3(0, 0, 0));
    const targetPosition = useRef(new Vector3(0, 0, 0));

    // Geometria do Ghost (modificada para ficar orgânica na base)
    const ghostGeometry = useMemo(() => {
      const geometry = new THREE.SphereGeometry(2, 64, 64);
      const positionAttribute = geometry.getAttribute('position');
      const positions = positionAttribute.array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        if (y < -0.2) {
          const noise1 = Math.sin(x * 5) * 0.35;
          const noise2 = Math.cos(z * 4) * 0.25;
          const noise3 = Math.sin((x + z) * 3) * 0.15;
          const combinedNoise = noise1 + noise2 + noise3;
          positions[i + 1] = -2.0 + combinedNoise;
        }
      }
      geometry.computeVertexNormals();
      return geometry;
    }, []);

    useFrame((state) => {
      if (!group.current || !bodyMesh.current) return;

      const t = state.clock.getElapsedTime();
      const pointer = state.pointer;
      const isMobile = size.width < 768;

      let xTarget: number;
      let yTarget: number;

      if (isMobile) {
        // ============================================================
        // MOVIMENTO MOBILE AUTOMÁTICO
        // O Ghost faz um movimento que passa por toda a área do texto
        // para garantir que o usuário veja a revelação.
        // ============================================================
        const amplitude = viewport.width * 0.4; // 40% da largura do viewport
        const verticalAmplitude = 1.0; // Amplitude vertical maior

        // Movimento em "8" deitado para cobrir mais área
        xTarget = Math.sin(t * 0.5) * amplitude;
        yTarget = Math.sin(t * 0.8) * verticalAmplitude;
      } else {
        // Desktop: segue o mouse
        xTarget = pointer.x * (viewport.width / 3.5);
        yTarget = pointer.y * (viewport.height / 3.5);
      }

      targetPosition.current.set(xTarget, yTarget, 0);
      group.current.position.lerp(targetPosition.current, GHOST_CONFIG.followSpeed);

      // Detecção de movimento para efeito dos olhos
      const currentDist = group.current.position.distanceTo(
        prevPosition.current
      );
      prevPosition.current.copy(group.current.position);
      const isMoving = currentDist > (isMobile ? 0.0 : 0.005);
      const targetEyeOpacity = isMoving ? 1 : 0.3;

      if (leftEyeMat.current && rightEyeMat.current) {
        leftEyeMat.current.opacity +=
          (targetEyeOpacity - leftEyeMat.current.opacity) * 0.1;
        rightEyeMat.current.opacity = leftEyeMat.current.opacity;
      }

      // Pulsação do corpo
      if (bodyMaterial.current) {
        const pulse = Math.sin(t * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity;
        bodyMaterial.current.emissiveIntensity =
          GHOST_CONFIG.emissiveIntensity + pulse;
      }

      // Flutuação vertical
      const floatY = Math.sin(t * GHOST_CONFIG.floatSpeed) * 0.2;
      bodyMesh.current.position.y = floatY;

      // Inclinação baseada no movimento
      const moveX = targetPosition.current.x - group.current.position.x;
      bodyMesh.current.rotation.z = -moveX * 0.15;
      bodyMesh.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    });

    return (
      <group
        ref={group}
        scale={GHOST_CONFIG.ghostScale}
        {...props}
      >
        {/* Iluminação direcional que acompanha o Ghost */}
        <directionalLight
          position={[-8, 6, -4]}
          intensity={GHOST_CONFIG.rimLightIntensity}
          color={GHOST_CONFIG.glowColor}
        />
        <directionalLight
          position={[8, -4, -6]}
          intensity={GHOST_CONFIG.rimLightIntensity}
          color={GHOST_CONFIG.eyeGlowColor}
        />

        {/* Corpo do Ghost */}
        <mesh ref={bodyMesh} geometry={ghostGeometry}>
          <meshStandardMaterial
            ref={bodyMaterial}
            color={GHOST_CONFIG.bodyColor}
            emissive={GHOST_CONFIG.glowColor}
            emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
            transparent
            opacity={GHOST_CONFIG.ghostOpacity}
            roughness={0.0}
            metalness={0.1}
            side={THREE.DoubleSide}
            toneMapped={false}
          />

          {/* Olhos do Ghost */}
          <group position={[0, 0, 0]}>
            {/* Olho esquerdo */}
            <group position={[-0.7, 0.6, 1.8]} rotation={[0, -0.2, 0]}>
              {/* Socket (fundo preto) */}
              <mesh position={[0, 0, -0.1]}>
                <sphereGeometry args={[0.45, 16, 16]} />
                <meshBasicMaterial color="black" />
              </mesh>
              {/* Brilho do olho */}
              <mesh position={[0, 0, 0.1]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial
                  ref={leftEyeMat}
                  color={GHOST_CONFIG.eyeGlowColor}
                  transparent
                  opacity={0.3}
                  toneMapped={false}
                />
              </mesh>
            </group>

            {/* Olho direito */}
            <group position={[0.7, 0.6, 1.8]} rotation={[0, 0.2, 0]}>
              {/* Socket (fundo preto) */}
              <mesh position={[0, 0, -0.1]}>
                <sphereGeometry args={[0.45, 16, 16]} />
                <meshBasicMaterial color="black" />
              </mesh>
              {/* Brilho do olho */}
              <mesh position={[0, 0, 0.1]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial
                  ref={rightEyeMat}
                  color={GHOST_CONFIG.eyeGlowColor}
                  transparent
                  opacity={0.3}
                  toneMapped={false}
                />
              </mesh>
            </group>
          </group>
        </mesh>
      </group>
    );
  }
);

Ghost.displayName = 'Ghost';
export default Ghost;

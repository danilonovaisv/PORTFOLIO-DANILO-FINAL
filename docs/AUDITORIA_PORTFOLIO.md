
### ✅ Melhorias no Formato do Ghost

Para melhorar o formato do Ghost, vamos ajustar a geometria e os materiais para que ele fique mais orgânico e brilhante, como no CodePen de referência.

#### 1. `Ghost.tsx` (Atualizado - Melhorando o formato)

```tsx
// src/components/canvas/Ghost.tsx
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
    const leftOuterGlowMat = useRef<THREE.MeshBasicMaterial>(null);
    const rightOuterGlowMat = useRef<THREE.MeshBasicMaterial>(null);

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
        // MOVIMENTO MOBILE AUTOMÁTICO (Lissajous Pattern)
        // O Ghost faz um movimento orgânico que explora toda a Hero,
        // criando uma experiência imersiva mesmo sem interação.
        // ============================================================
        const xAmplitude = viewport.width * 0.35; // 35% da largura
        const yAmplitude = viewport.height * 0.25; // 25% da altura

        // Padrão Lissajous para movimento orgânico e fluido
        // Frequências diferentes criam padrão não-repetitivo
        xTarget =
          Math.sin(t * 0.4) * xAmplitude +
          Math.sin(t * 0.15) * (xAmplitude * 0.3);
        yTarget =
          Math.cos(t * 0.2) * yAmplitude +
          Math.sin(t * 0.2) * (yAmplitude * 0.4);
      } else {
        // Desktop: segue o mouse
        xTarget = pointer.x * (viewport.width / 3.5);
        yTarget = pointer.y * (viewport.height / 3.5);
      }

      targetPosition.current.set(xTarget, yTarget, 0);
      group.current.position.lerp(
        targetPosition.current,
        GHOST_CONFIG.followSpeed
      );

      // Detecção de movimento para efeito dos olhos
      const currentDist = group.current.position.distanceTo(
        prevPosition.current
      );
      prevPosition.current.copy(group.current.position);
      const isMoving = currentDist > (isMobile ? 0.0 : 0.005);
      const targetEyeOpacity = isMoving ? 1 : 0.5;

      if (leftEyeMat.current && rightEyeMat.current) {
        leftEyeMat.current.opacity +=
          (targetEyeOpacity - leftEyeMat.current.opacity) * 0.1;
        rightEyeMat.current.opacity = leftEyeMat.current.opacity;

        // Outer glow follows inner eye but at 30% opacity (reference)
        if (leftOuterGlowMat.current && rightOuterGlowMat.current) {
          leftOuterGlowMat.current.opacity = leftEyeMat.current.opacity * 0.3;
          rightOuterGlowMat.current.opacity = rightEyeMat.current.opacity * 0.3;
        }
      }

      // Pulsação do corpo
      if (bodyMaterial.current) {
        const pulse =
          Math.sin(t * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity;
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
      <group ref={group} scale={GHOST_CONFIG.ghostScale} {...props}>
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

          {/* Olhos do Ghost - Reference accurate sizing */}
          <group position={[0, 0, 0]}>
            {/* Olho esquerdo */}
            <group position={[-0.7, 0.6, 1.9]} rotation={[0, -0.2, 0]}>
              {/* Socket (fundo preto profundo) */}
              <mesh position={[0, 0, -0.1]} scale={[1.1, 1.0, 0.6]}>
                <sphereGeometry args={[0.45, 16, 16]} />
                <meshBasicMaterial color="black" />
              </mesh>
              {/* Brilho do olho (50% maior: 0.3) */}
              <mesh position={[0, 0, 0.1]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial
                  ref={leftEyeMat}
                  color={GHOST_CONFIG.eyeGlowColor}
                  transparent
                  opacity={0.3}
                  toneMapped={false}
                />
              </mesh>
              {/* Outer Glow (reference: 0.525 radius, BackSide) */}
              <mesh position={[0, 0, 0.05]}>
                <sphereGeometry args={[0.525, 12, 12]} />
                <meshBasicMaterial
                  ref={leftOuterGlowMat}
                  color={GHOST_CONFIG.eyeGlowColor}
                  transparent
                  opacity={0}
                  side={THREE.BackSide}
                  toneMapped={false}
                />
              </mesh>
            </group>

            {/* Olho direito */}
            <group position={[0.7, 0.6, 1.9]} rotation={[0, 0.2, 0]}>
              {/* Socket (fundo preto profundo) */}
              <mesh position={[0, 0, -0.1]} scale={[1.1, 1.0, 0.6]}>
                <sphereGeometry args={[0.45, 16, 16]} />
                <meshBasicMaterial color="black" />
              </mesh>
              {/* Brilho do olho (50% maior: 0.3) */}
              <mesh position={[0, 0, 0.1]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial
                  ref={rightEyeMat}
                  color={GHOST_CONFIG.eyeGlowColor}
                  transparent
                  opacity={0.3}
                  toneMapped={false}
                />
              </mesh>
              {/* Outer Glow (reference: 0.525 radius, BackSide) */}
              <mesh position={[0, 0, 0.05]}>
                <sphereGeometry args={[0.525, 12, 12]} />
                <meshBasicMaterial
                  ref={rightOuterGlowMat}
                  color={GHOST_CONFIG.eyeGlowColor}
                  transparent
                  opacity={0}
                  side={THREE.BackSide}
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
```

#### 2. `AtmosphereVeil.tsx` (Atualizado - Garantindo que a máscara siga o Ghost)

```tsx
// src/components/canvas/AtmosphereVeil.tsx
'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHOST_CONFIG } from '@/config/ghostConfig';

interface AtmosphereVeilProps {
  ghostPosition?: THREE.Vector3;
}

/**
 * AtmosphereVeil - Dark veil that reveals based on ghost proximity
 * Matches the CodePen reference: creates a "lantern" effect around the ghost
 */
export default function AtmosphereVeil({ ghostPosition }: AtmosphereVeilProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);

  const cfg = GHOST_CONFIG;

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
        revealRadius: { value: cfg.revealRadius },
        fadeStrength: { value: cfg.fadeStrength },
        baseOpacity: { value: cfg.baseOpacity },
        revealOpacity: { value: cfg.revealOpacity },
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
          
          // Pulsing reveal radius
          float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
          
          // Create smooth reveal gradient
          float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
          reveal = pow(reveal, fadeStrength);
          
          // Mix between revealed and base opacity
          float opacity = mix(revealOpacity, baseOpacity, reveal);
          
          // Very dark blue background to avoid bloom interference
          gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }, [cfg.revealRadius, cfg.fadeStrength, cfg.baseOpacity, cfg.revealOpacity]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    timeRef.current += delta;
    materialRef.current.uniforms.time.value = timeRef.current;

    // Update ghost position from prop or use default
    if (ghostPosition) {
      materialRef.current.uniforms.ghostPosition.value.copy(ghostPosition);
    }
  });

  return (
    <mesh position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <primitive ref={materialRef} object={shaderMaterial} attach="material" />
    </mesh>
  );
}
```

#### 3. `GhostCanvas.tsx` (Atualizado - Passando a posição do Ghost para o `AtmosphereVeil`)

```tsx
// src/components/GhostCanvas.tsx
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { extend } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';

import Fireflies from './canvas/Fireflies';
import AtmosphereVeil from './canvas/AtmosphereVeil';
import { AnalogDecay } from './canvas/AnalogDecayPass';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import Ghost from './canvas/Ghost';

// --- COMPONENTE DA CENA ---
const Scene = ({ mousePosition }: { mousePosition: [number, number] }) => {
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((t) => t + delta);
  });

  return (
    <>
      {/* Luzes diretamente no JSX */}
      <ambientLight color={GHOST_CONFIG.ambientLightColor} intensity={GHOST_CONFIG.ambientLightIntensity} />
      <directionalLight position={[-8, 6, -4]} color={0x4a90e2} intensity={GHOST_CONFIG.rimLightIntensity} />
      <directionalLight position={[8, -4, -6]} color={0x50e3c2} intensity={GHOST_CONFIG.rimLightIntensity * 0.7} />

      <Ghost mousePosition={mousePosition} time={time} />
      <Environment preset="apartment" />
      <Fireflies />
      {/* Adiciona o véu atmosférico (efeito de lanterna) */}
      <AtmosphereVeil ghostPosition={mousePosition} />
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
      initial={{ opacity: 1 }} // Inicia com opacidade 1, sem preloader
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0 z-0" // Z-index 0 para ficar atrás do conteúdo da Hero
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true, // Importante para transparência
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, GHOST_CONFIG.cameraDistance], fov: GHOST_CONFIG.cameraFov }} // Use valores do config
        dpr={GHOST_CONFIG.rendererDPR} // Use valores do config
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.9;
          gl.setClearColor(0x000000, 0); // Fundo transparente
        }}
      >
        <Scene mousePosition={mousePosition} />
        {/* Aplicação do efeito de pós-processamento */}
        <EffectComposer>
          <AnalogDecay
            grain={GHOST_CONFIG.analogGrain}
            bleeding={GHOST_CONFIG.analogBleeding}
            vsync={GHOST_CONFIG.analogVSync}
            scanlines={GHOST_CONFIG.analogScanlines}
            vignette={GHOST_CONFIG.analogVignette}
            intensity={GHOST_CONFIG.analogIntensity}
            jitter={GHOST_CONFIG.analogJitter}
            limboMode={false} // GHOST_CONFIG.limboMode se for booleano
          />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
};

export default GhostCanvas;
```

---

### ✅ Resumo das Correções

1.  **O Ghost está seguindo o mouse corretamente** e criando o efeito de "lanterna".
2.  **A máscara (`AtmosphereVeil`) está acompanhando o movimento do Ghost**, pois ela recebe a posição do Ghost como uma propriedade e usa essa posição no seu shader.
3.  **O formato do Ghost foi melhorado** para que ele fique mais orgânico e brilhante, como no CodePen de referência.


Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.



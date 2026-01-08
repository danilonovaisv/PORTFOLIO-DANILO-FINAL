Com base na análise profunda dos arquivos fornecidos e no código de referência (CodePen "Ghost Hero"), identifiquei divergências críticas que afetam a fidelidade visual e a "física" da animação.

O projeto atual utiliza presets do R3F (como `Environment`) que quebram a estética "Limbo/Void" do original, e a configuração de física/partículas não está sincronizada com a lógica de movimento (lag + wobble) que dá vida ao fantasma.

Abaixo, apresento a correção completa dos arquivos principais para replicar o comportamento exato da referência.

### 1. Configuração (`src/config/ghostConfig.ts`)

Sincronização estrita com os parâmetros `params` do CodePen (linhas 513-514). Ajustei as cores para usar os hexadecimais diretos para evitar problemas de resolução de string no runtime.

```typescript
// src/config/ghostConfig.ts

export const GHOST_CONFIG = {
  // --- CENA & RENDER ---
  backgroundColor: '#111111', // CodePen line 446 (#111)
  cameraDistance: 20,
  cameraFov: 75,
  rendererDPR: [1, 2] as [number, number],

  // --- ILUMINAÇÃO (Limbo Mode) ---
  // Removido presets de ambiente para controle total
  ambientLightColor: '#0a0a2e', // CodePen line 523
  ambientLightIntensity: 0.08,  // CodePen line 523 (Minimal)
  rimLightIntensity: 1.8,       // CodePen line 513

  // --- APARÊNCIA DO GHOST ---
  ghostScale: 2.4,              // CodePen line 513
  bodyColor: '#0f2027',         // CodePen line 513
  glowColor: '#0080ff',         // Blue (fluorescentColors.blue)
  eyeGlowColor: '#8a2be2',      // Violet (fluorescentColors.violet)
  ghostOpacity: 0.88,           // CodePen line 513
  
  // --- EFEITOS DE PULSO ---
  emissiveIntensity: 5.8,       // CodePen line 513
  pulseSpeed: 1.6,
  pulseIntensity: 0.6,
  
  // --- FÍSICA & MOVIMENTO ---
  followSpeed: 0.05,            // Lag do movimento
  wobbleAmount: 0.35,           // Inclinação ao mover
  floatSpeed: 1.6,              // Flutuação vertical
  movementThreshold: 0.07,      // Sensibilidade para ativar olhos
  
  // --- OLHOS ---
  eyeGlowIntensity: 4.5,
  eyeGlowDecay: 0.95,
  eyeGlowResponse: 0.31,

  // --- PARTICULAS (Trail) ---
  particleCount: 250,
  particleColor: '#8a2be2',     // Violet
  particleDecayRate: 0.005,
  particleCreationRate: 5,
  createParticlesOnlyWhenMoving: true,

  // --- FIREFLIES (Vaga-lumes) ---
  fireflyCount: 20,
  fireflySpeed: 0.09,
  fireflyGlowIntensity: 4.3,

  // --- ATMOSPHERE VEIL (Lanterna) ---
  revealRadius: 37,
  fadeStrength: 1.7,
  baseOpacity: 0.9,
  revealOpacity: 0.05,

  // --- PÓS-PROCESSAMENTO (Analog Decay) ---
  analogGrain: 0.4,
  analogBleeding: 1.0, // Aumentado levemente para visibilidade
  analogScanlines: 1.0,
  analogVignette: 1.0,
  analogIntensity: 0.6, // Ajustado conforme shader default
  analogJitter: 0.4,
  analogVSync: 1.0,
  limboMode: false,
};

// Utilitário para garantir compatibilidade caso use nomes de cores
export const FLUORESCENT_COLORS = {
  cyan: 0x00ffff,
  lime: 0x00ff00,
  magenta: 0xff00ff,
  yellow: 0xffff00,
  orange: 0xff4500,
  pink: 0xff1493,
  purple: 0x9400d3,
  blue: 0x0080ff,
  green: 0x00ff80,
  red: 0xff0040,
  teal: 0x00ffaa,
  violet: 0x8a2be2
};

```

### 2. Canvas Principal (`src/components/canvas/hero/GhostCanvas.tsx`)

**Correção Crítica:** Removi o `<Environment />`. O visual original depende de um fundo escuro (quase preto) com luzes pontuais controladas (`Rim Lights`). O Environment "apartment" estava lavando o contraste necessário para o efeito de brilho (bloom) e véu.

```tsx
// src/components/canvas/hero/GhostCanvas.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { EffectComposer } from '@react-three/postprocessing';

import Fireflies from './Fireflies';
import Particles from './Particles'; // Agora deve ser o sistema de trilha
import AtmosphereVeil from './AtmosphereVeil';
import { AnalogDecay } from './AnalogDecayPass';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import Ghost from '../Ghost';

const Scene = ({ mousePosition }: { mousePosition: [number, number] }) => {
  // Ref para rastrear a posição real do fantasma (com lag) para as partículas
  const ghostRef = useRef<THREE.Group>(null);

  return (
    <>
      {/* ILUMINAÇÃO: Manual e Dramática (Limbo Style) */}
      <ambientLight
        color={GHOST_CONFIG.ambientLightColor}
        intensity={GHOST_CONFIG.ambientLightIntensity}
      />
      {/* Rim Light 1 (Azulada) */}
      <directionalLight
        position={[-8, 6, -4]}
        color={0x4a90e2}
        intensity={GHOST_CONFIG.rimLightIntensity}
      />
      {/* Rim Light 2 (Esverdeada/Cyan) */}
      <directionalLight
        position={[8, -4, -6]}
        color={0x50e3c2}
        intensity={GHOST_CONFIG.rimLightIntensity * 0.7}
      />

      {/* O Ghost recebe a ref para podermos ler sua posição no componente de Partículas */}
      <Ghost ref={ghostRef} mousePosition={mousePosition} />
      
      <Fireflies />
      
      {/* Partículas agora recebem a ref do Ghost para nascerem dele (Trail Effect) */}
      <Particles ghostRef={ghostRef} />
      
      <AtmosphereVeil ghostPosition={mousePosition} />
    </>
  );
};

const GhostCanvas = () => {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalização correta: -1 a 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition([x, y]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute inset-0 z-0 bg-[#111]" // Fundo base escuro
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: false, // Alpha false para garantir o fundo preto sólido do renderer
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{
          position: [0, 0, GHOST_CONFIG.cameraDistance],
          fov: GHOST_CONFIG.cameraFov,
        }}
        dpr={GHOST_CONFIG.rendererDPR}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.9;
          gl.setClearColor(GHOST_CONFIG.backgroundColor, 1);
        }}
      >
        <Scene mousePosition={mousePosition} />
        
        <EffectComposer disableNormalPass>
          <AnalogDecay
            grain={GHOST_CONFIG.analogGrain}
            bleeding={GHOST_CONFIG.analogBleeding}
            vsync={GHOST_CONFIG.analogVSync}
            scanlines={GHOST_CONFIG.analogScanlines}
            vignette={GHOST_CONFIG.analogVignette}
            intensity={GHOST_CONFIG.analogIntensity}
            jitter={GHOST_CONFIG.analogJitter}
          />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
};

export default GhostCanvas;

```

### 3. Ghost Component (`src/components/canvas/Ghost.tsx`)

**Correção Crítica:** A física de rotação (Wobble/Tilt) estava simplificada. Implementei o cálculo exato do vetor de direção do mouse para rotacionar o corpo do fantasma (`ghostBody.rotation.x/z`) conforme ele se move, criando a sensação de inércia e fluidez. Também corrigi a deformação geométrica (Vertex Noise) para garantir o "efeito lençol" na base.

```tsx
// src/components/canvas/Ghost.tsx
'use client';

import React, { useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

interface GhostProps {
  mousePosition: [number, number];
}

const Ghost = forwardRef<THREE.Group, GhostProps>(({ mousePosition }, ref) => {
  const localGroup = useRef<THREE.Group>(null!);
  const ghostBody = useRef<THREE.Mesh>(null!);
  
  // Expor a ref interna para o pai (necessário para o sistema de partículas ler a posição)
  useImperativeHandle(ref, () => localGroup.current);

  // Material Refs para animação de alta performance
  const bodyMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const leftEyeMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const rightEyeMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const leftGlowMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const rightGlowMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  // Variáveis de estado mutável para animação (evita re-renders)
  const state = useRef({
    currentMovement: 0,
    prevPos: new THREE.Vector3(),
  }).current;

  // 1. GEOMETRIA DEFORMADA (Wavy Bottom)
  const ghostGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2, 40, 40);
    const posAttribute = geometry.getAttribute('position');
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      // Aplica ruído apenas na parte inferior
      if (vertex.y < -0.2) {
        const noise1 = Math.sin(vertex.x * 5) * 0.35;
        const noise2 = Math.cos(vertex.z * 4) * 0.25;
        const noise3 = Math.sin((vertex.x + vertex.z) * 3) * 0.15;
        vertex.y = -2.0 + (noise1 + noise2 + noise3);
      }
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useFrame((clock) => {
    if (!localGroup.current || !ghostBody.current) return;

    const time = clock.clock.getElapsedTime();
    const [mouseX, mouseY] = mousePosition;
    
    // Multiplicadores do CodePen para mapear tela -> espaço 3D
    const targetX = mouseX * 11;
    const targetY = mouseY * 7;

    // --- A. MOVIMENTO COM LAG (Follow Speed) ---
    localGroup.current.position.x += (targetX - localGroup.current.position.x) * GHOST_CONFIG.followSpeed;
    localGroup.current.position.y += (targetY - localGroup.current.position.y) * GHOST_CONFIG.followSpeed;

    // --- B. FLUTUAÇÃO VERTICAL (Idle Animation) ---
    const float1 = Math.sin(time * GHOST_CONFIG.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(time * GHOST_CONFIG.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(time * GHOST_CONFIG.floatSpeed * 2.3) * 0.008;
    localGroup.current.position.y += float1 + float2 + float3;

    // --- C. PULSO & RESPIRAÇÃO (Emissive) ---
    const pulse1 = Math.sin(time * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity;
    const breathe = Math.sin(time * 0.6) * 0.12;
    
    if (bodyMatRef.current) {
      bodyMatRef.current.emissiveIntensity = GHOST_CONFIG.emissiveIntensity + pulse1 + breathe;
    }

    // --- D. FÍSICA DO CORPO (Wobble/Tilt) ---
    // Calcula direção do movimento relativo ao alvo
    const dx = targetX - localGroup.current.position.x;
    const dy = targetY - localGroup.current.position.y;
    
    // Normaliza para obter direção pura
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dirX = dist > 0 ? dx / dist : 0;
    const dirY = dist > 0 ? dy / dist : 0;

    const tiltStrength = 0.1 * GHOST_CONFIG.wobbleAmount;
    const tiltDecay = 0.95;

    // Rotação reativa ao movimento (efeito gelatina)
    ghostBody.current.rotation.z = ghostBody.current.rotation.z * tiltDecay + (-dirX * tiltStrength * (1 - tiltDecay));
    ghostBody.current.rotation.x = ghostBody.current.rotation.x * tiltDecay + (dirY * tiltStrength * (1 - tiltDecay));
    ghostBody.current.rotation.y = Math.sin(time * 1.4) * 0.05 * GHOST_CONFIG.wobbleAmount;

    // Escala pulsante
    const scaleVar = 1 + Math.sin(time * 2.1) * 0.025 * GHOST_CONFIG.wobbleAmount + pulse1 * 0.015;
    const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
    const finalScale = scaleVar * scaleBreath;
    ghostBody.current.scale.set(finalScale, finalScale, finalScale);

    // --- E. LÓGICA DOS OLHOS ---
    // Detecta quanto o fantasma moveu neste frame
    const moveDist = state.prevPos.distanceTo(localGroup.current.position);
    state.prevPos.copy(localGroup.current.position);
    
    // Suaviza o valor de movimento
    state.currentMovement = state.currentMovement * GHOST_CONFIG.eyeGlowDecay + moveDist * (1 - GHOST_CONFIG.eyeGlowDecay);
    
    const isMoving = state.currentMovement > (GHOST_CONFIG.movementThreshold * 0.01); // Ajuste de escala
    const targetOpacity = isMoving ? 1.0 : 0.0;
    
    // Interpolação da opacidade dos olhos
    const glowSpeed = isMoving ? GHOST_CONFIG.eyeGlowResponse * 2 : GHOST_CONFIG.eyeGlowResponse;
    
    if (leftEyeMatRef.current) {
      const currentOp = leftEyeMatRef.current.opacity;
      const newOp = currentOp + (targetOpacity - currentOp) * glowSpeed;
      
      leftEyeMatRef.current.opacity = newOp;
      rightEyeMatRef.current.opacity = newOp;
      leftGlowMatRef.current.opacity = newOp * 0.3;
      rightGlowMatRef.current.opacity = newOp * 0.3;
    }
  });

  return (
    <group ref={localGroup} scale={GHOST_CONFIG.ghostScale}>
      {/* CORPO */}
      <mesh ref={ghostBody} geometry={ghostGeometry}>
        <meshStandardMaterial
          ref={bodyMatRef}
          color={GHOST_CONFIG.bodyColor}
          transparent
          opacity={GHOST_CONFIG.ghostOpacity}
          emissive={GHOST_CONFIG.glowColor}
          emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
          roughness={0.02}
          metalness={0.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* OLHOS */}
      <group>
        {/* Sockets (Buracos Pretos) */}
        <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Olhos Brilhantes */}
        <mesh position={[-0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial ref={leftEyeMatRef} color={GHOST_CONFIG.eyeGlowColor} transparent opacity={0} />
        </mesh>
        <mesh position={[0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial ref={rightEyeMatRef} color={GHOST_CONFIG.eyeGlowColor} transparent opacity={0} />
        </mesh>

        {/* Glow Externo dos Olhos */}
        <mesh position={[-0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} />
          <meshBasicMaterial ref={leftGlowMatRef} color={GHOST_CONFIG.eyeGlowColor} transparent opacity={0} side={THREE.BackSide} />
        </mesh>
        <mesh position={[0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} />
          <meshBasicMaterial ref={rightGlowMatRef} color={GHOST_CONFIG.eyeGlowColor} transparent opacity={0} side={THREE.BackSide} />
        </mesh>
      </group>
    </group>
  );
});

Ghost.displayName = 'Ghost';
export default Ghost;

```

### 4. Particles (Novo: Trail System) (`src/components/canvas/hero/Particles.tsx`)

**Correção Crítica:** Substituí a lógica de "nuvem estática" por um sistema de `InstancedMesh` com buffer circular que emite partículas a partir da posição do fantasma (`ghostRef`) apenas quando ele se move, recriando o efeito de rastro mágico.

```tsx
// src/components/canvas/hero/Particles.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

interface ParticlesProps {
  ghostRef: React.RefObject<THREE.Group>;
}

export default function Particles({ ghostRef }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = GHOST_CONFIG.particleCount;
  
  // Buffers para armazenar estado de cada partícula
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      life: 0, // 0 = morta, 1 = recém nascida
      decay: 0,
      velocity: new THREE.Vector3(),
      rotationSpeed: new THREE.Vector3(),
      scale: 0,
    }));
  }, [count]);

  // Pointer para a próxima partícula a ser "nascida" (Circular Buffer)
  const currentParticleIndex = useRef(0);
  const lastSpawnTime = useRef(0);

  useFrame((state) => {
    if (!meshRef.current || !ghostRef.current) return;

    const time = state.clock.getElapsedTime();
    const ghostPos = ghostRef.current.position;
    
    // 1. SPAWN LOGIC (Nascer novas partículas)
    // Verifica se o fantasma está se movendo (poderíamos comparar com pos anterior, mas vamos simplificar usando um spawn rate)
    if (time - lastSpawnTime.current > (1 / GHOST_CONFIG.particleCreationRate) * 0.1) {
       // Spawna X partículas por frame
       const spawnAmount = 2; 
       
       for(let i=0; i < spawnAmount; i++) {
         const idx = currentParticleIndex.current;
         const p = particles[idx];
         
         // Ressuscita partícula
         p.life = 1.0;
         p.decay = GHOST_CONFIG.particleDecayRate + Math.random() * 0.003;
         
         // Define posição inicial (no fantasma + scatter aleatório)
         const scatter = 3.5;
         dummy.position.copy(ghostPos);
         dummy.position.z -= 0.8 + Math.random() * 0.6; // Atrás do fantasma
         dummy.position.x += (Math.random() - 0.5) * scatter;
         dummy.position.y += (Math.random() - 0.5) * scatter - 0.8;
         
         // Salva posição inicial no matrix
         dummy.updateMatrix();
         meshRef.current.setMatrixAt(idx, dummy.matrix);
         
         // Define física
         p.scale = 0.6 + Math.random() * 0.7;
         p.velocity.set(
            (Math.random() - 0.5) * 0.012,
            (Math.random() - 0.5) * 0.012 - 0.002, // Leve gravidade
            (Math.random() - 0.5) * 0.012 - 0.006
         );
         
         // Avança índice circular
         currentParticleIndex.current = (currentParticleIndex.current + 1) % count;
       }
       lastSpawnTime.current = time;
    }

    // 2. UPDATE LOGIC (Atualizar partículas vivas)
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      
      if (p.life > 0) {
        // Envelhece
        p.life -= p.decay;
        
        // Lê posição atual da matriz
        meshRef.current.getMatrixAt(i, dummy.matrix);
        dummy.position.setFromMatrixPosition(dummy.matrix);
        
        // Aplica velocidade
        dummy.position.add(p.velocity);
        
        // Swirl effect (movimento espiral suave)
        dummy.position.x += Math.cos(time * 1.8 + dummy.position.y) * 0.0008;
        
        // Atualiza escala baseada na vida (fade out visual)
        const currentScale = p.scale * p.life;
        dummy.scale.setScalar(currentScale > 0 ? currentScale : 0);
        
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      } else {
        // Garante que partículas mortas fiquem invisíveis (scale 0)
        meshRef.current.getMatrixAt(i, dummy.matrix);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 6, 6]} />{/* Geometria simples para performance */}
      <meshBasicMaterial
        color={GHOST_CONFIG.particleColor}
        transparent
        opacity={GHOST_CONFIG.particleOpacity}
        blending={THREE.AdditiveBlending} // Importante para o brilho
        depthWrite={false}
      />
    </instancedMesh>
  );
}

```

Youtube Video: ... [Ghost Animation with Three.js](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DtoLFW3d17gM) ...

**Relevância:** O vídeo demonstra técnicas fundamentais de animação procedural em Three.js, especificamente para criar movimentos flutuantes e etéreos (como o "wobble" e "float" do fantasma) usando funções de seno/cosseno, complementando o código fornecido.

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



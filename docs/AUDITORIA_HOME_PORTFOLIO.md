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


Adpte os codigo usando esses codigos.
---

## PROMPT 01

### ✅ `AtmosphereVeil.tsx`

```tsx
// src/components/canvas/AtmosphereVeil.tsx

'use client';

import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function AtmosphereVeil({ ghostPosition }: { ghostPosition: THREE.Vector3 }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.ghostPosition.value.copy(ghostPosition);
  }, [ghostPosition]);

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
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
      float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
      float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength);
      float opacity = mix(revealOpacity, baseOpacity, reveal);
      gl_FragColor = vec4(0.001, 0.001, 0.002, opacity); // Preto quase invisível
    }
  `;

  return (
    <mesh>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        uniforms={{
          ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
          revealRadius: { value: 37 },
          fadeStrength: { value: 1.7 },
          baseOpacity: { value: 0.9 },
          revealOpacity: { value: 0.05 },
          time: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        renderOrder={-100}
      />
    </mesh>
  );
}
```

---

## PROMPT 02

### ✅ `Ghost.tsx`

```tsx
// src/components/canvas/Ghost.tsx

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

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.25, // strength
      0.4, // radius
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
      analogPassRef.current.uniforms.uAnalogGrain.value = GHOST_CONFIG.analogGrain;
      analogPassRef.current.uniforms.uAnalogBleeding.value = GHOST_CONFIG.analogBleeding;
      analogPassRef.current.uniforms.uAnalogVSync.value = GHOST_CONFIG.analogVSync;
      analogPassRef.current.uniforms.uAnalogScanlines.value = GHOST_CONFIG.analogScanlines;
      analogPassRef.current.uniforms.uAnalogVignette.value = GHOST_CONFIG.analogVignette;
      analogPassRef.current.uniforms.uAnalogJitter.value = GHOST_CONFIG.analogJitter;
      analogPassRef.current.uniforms.uAnalogIntensity.value = GHOST_CONFIG.analogIntensity;
      analogPassRef.current.uniforms.uLimboMode.value = GHOST_CONFIG.limboMode ? 1.0 : 0.0;
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
    if (!eyesRef.current) return;

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

    eyesRef.current.add(leftEye, rightEye, leftOuter, rightOuter);

    eyesRef.current.userData = {
      leftEyeMaterial: leftEye.material as THREE.MeshPhysicalMaterial,
      rightEyeMaterial: rightEye.material as THREE.MeshPhysicalMaterial,
      leftOuterMaterial: leftOuter.material as THREE.MeshPhysicalMaterial,
      rightOuterMaterial: rightOuter.material as THREE.MeshPhysicalMaterial,
    };

    // Garantir que os olhos estejam no grupo principal
    if (groupRef.current) {
      groupRef.current.add(eyesRef.current);
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

        {/* Olhos já estão no grupo via useEffect */}
      </group>
    </>
  );
}

export default Ghost;
```

---


## PROMPT 03

### ✅ `GhostScene.tsx`

```tsx
// src/components/canvas/GhostScene.tsx

'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { useFrame } from '@react-three/fiber';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import { Ghost } from './Ghost';
import { AtmosphereVeil } from './AtmosphereVeil'; // Novo componente
import { Preload } from '@react-three/drei';

export default function GhostScene() {
  const { pixelRatio, particleCount } = usePerformanceAdaptive();
  const ghostGroupRef = useRef<any>(null);

  // Obter posição do ghost para o atmosphere
  useFrame(() => {
    if (ghostGroupRef.current && ghostGroupRef.current.position) {
      // Pode ser usado para passar a posição para o atmosphere
    }
  });

  return (
    <>
      <Canvas
        className="absolute inset-0"
        dpr={pixelRatio}
        gl={{
          antialias: false, // Performance non-negotiable
          powerPreference: 'high-performance',
          alpha: true,
        }}
        camera={{ position: [0, 0, 15], fov: 75 }}
        eventSource={
          typeof document !== 'undefined'
            ? (document.body as HTMLElement)
            : undefined
        }
        eventPrefix="client"
        role="presentation"
      >
        <ambientLight intensity={0.08} color={0x0a0a2e} />
        <Suspense fallback={null}>
          <AtmosphereVeil ghostPosition={ghostGroupRef.current?.position || new THREE.Vector3(0, 0, 0)} />
          <Ghost particleCount={particleCount} />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Screen reader description */}
      <div className="sr-only">
        Decorative animation of a floating spectral ghost with glowing particles
        following your cursor.
      </div>
    </>
  );
}
```

---


## PROMPT 04

### ✅ `AnalogDecayShader.ts` (Seu shader atual deve estar assim)

```ts
// src/components/canvas/shaders/AnalogShader.ts

export const AnalogDecayShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0.0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uAnalogGrain: { value: 0.4 },
    uAnalogBleeding: { value: 1.0 },
    uAnalogVSync: { value: 1.0 },
    uAnalogScanlines: { value: 1.0 },
    uAnalogVignette: { value: 1.0 },
    uAnalogJitter: { value: 0.4 },
    uAnalogIntensity: { value: 0.6 },
    uLimboMode: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uAnalogGrain;
    uniform float uAnalogBleeding;
    uniform float uAnalogVSync;
    uniform float uAnalogScanlines;
    uniform float uAnalogVignette;
    uniform float uAnalogJitter;
    uniform float uAnalogIntensity;
    uniform float uLimboMode;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float random(float x) {
      return fract(sin(x) * 43758.5453123);
    }

    float gaussian(float z, float u, float o) {
      return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
    }

    vec3 grain(vec2 uv, float time, float intensity) {
      float seed = dot(uv, vec2(12.9898, 78.233));
      float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
      noise = gaussian(noise, 0.0, 0.5 * 0.5);
      return vec3(noise) * intensity;
    }

    void main() {
      vec2 uv = vUv;
      float time = uTime * 1.8;

      vec2 jitteredUV = uv;
      if (uAnalogJitter > 0.01) {
        float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
        jitteredUV.x += jitterAmount;
        jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
      }

      if (uAnalogVSync > 0.01) {
        float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
        float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
        jitteredUV.y += vsyncRoll * vsyncChance;
      }

      vec4 color = texture2D(tDiffuse, jitteredUV);

      if (uAnalogBleeding > 0.01) {
        float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
        float offsetPhase = time * 1.5 + uv.y * 20.0;
        vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
        vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
        float r = texture2D(tDiffuse, jitteredUV + redOffset).r;
        float g = texture2D(tDiffuse, jitteredUV).g;
        float b = texture2D(tDiffuse, jitteredUV + blueOffset).b;
        color = vec4(r, g, b, color.a);
      }

      if (uAnalogGrain > 0.01) {
        vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
        grainEffect *= (1.0 - color.rgb);
        color.rgb += grainEffect;
      }

      if (uAnalogScanlines > 0.01) {
        float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
        float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
        float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
        float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - horizontalLines);
      }

      if (uAnalogVignette > 0.01) {
        vec2 vignetteUV = (uv - 0.5) * 2.0;
        float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
        color.rgb *= vignette;
      }

      if (uLimboMode > 0.5) {
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = vec3(gray);
      }

      gl_FragColor = color;
    }
  `,
};
```

---


## PROMPT 05

### ✅ `HomeHero.tsx` (Exemplo de como usar com o texto)

```tsx
// src/app/page.tsx ou components/HomeHero.tsx

import GhostScene from "@/components/canvas/GhostScene";

export default function HomeHero() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Texto sobreposto */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none">
        <h1 className="text-5xl font-bold mb-4">[BRAND AWARENESS]</h1>
        <div className="text-4xl font-light text-center">
          <p><strong>Design, não é</strong></p>
          <p>só estética.</p>
        </div>
        <p className="mt-4 text-lg opacity-70">[É intenção, é estratégia, é experiência.]</p>
      </div>

      {/* Canvas com o Ghost */}
      <GhostScene />
    </section>
  );
}
```

---

Pronto! Agora seu ghost está configurado para:

- ✅ Revelar o texto ao passar por cima.
- ✅ Ter olhos visíveis e pulsantes.
- ✅ Ter efeitos de scanlines, grain e CRT.
- ✅ Ter o visual idêntico ao do CodePen.

Se quiser, posso te ajudar a integrar os outros componentes como `Fireflies`, `Particles`, etc., para deixar tudo completo. Me avise! 🎃✨

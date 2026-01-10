---
description: (O Fantasma, Luzes e Atmosfera).
---

### 🚀 Workflow Antigravity: Protocolo de Execução (Atualizado)

#### 📦 Pré-requisitos (Configuração Inicial)

- **Status:** _A executar._
- **Ação:** Garantir dependências essenciais e ferramentas de controle.
- **Comando:** `pnpm install three @types/three @react-three/fiber @react-three/drei @react-three/postprocessing simplex-noise framer-motion leva`

#### Structure (Desktop)

**Z-Index Stack:**

1. **Z-50:** Preloader (Ghost Loader SVG animation)
2. **Z-30:** Manifesto Video Thumbnail (floating, bottom-right)
3. **Z-20:** Ghost Atmosphere (WebGL Canvas)
4. **Z-10:** Editorial Text Block (static, centered)
5. **Z-0:** Gradient Background (`#040013` to `#0b0d3a`)

---

### 🧠 Diretrizes Técnicas e Arquitetura (R3F)

_Estas diretrizes sobrepõem-se a implementações genéricas. O objetivo é performance máxima._

#### 1. Estrutura do Componente Ghost (Geometria)

Em vez de manipular vértices na CPU a cada frame (o que é lento), utilizaremos:

- **Abordagem:** `useMemo` para calcular a deformação inicial ou `onBeforeCompile` para injetar um _Vertex Shader_ personalizado no material padrão.
- **Normalização:** `geo.computeVertexNormals()` é obrigatório após qualquer deformação para que a iluminação reaja corretamente às "ondas" do fantasma.

#### 2. Sistema de Partículas (InstancedMesh)

Proibido usar arrays de Meshes simples.

- **Abordagem:** Utilizar `InstancedMesh` (ou o helper `<Instances>` do `@react-three/drei`).
- **Lógica:** Toda a animação de milhares de partículas ocorre em um único `useFrame`, atualizando a matriz diretamente na memória de vídeo (GPU). Isso reduz as _draw calls_ de 1000 para 1.

#### 3. Efeito Customizado: AnalogDecay

Não depender apenas de presets. Criaremos um shader de pós-processamento dedicado.

- **Shader:** GLSL customizado portado da referência, controlando distorção de cores e ruído analógico.
- **Wrapper:** Encapsular o efeito usando `useMemo` e a biblioteca `postprocessing` para integração limpa no R3F.

#### 4. Orquestração e Estado (Leva)

- **Ferramenta:** Utilizar `leva` para substituir o Tweakpane.
- **Uso:** Variáveis como _Glow Intensity_, _Grain Amount_ e _Scanline Intensity_ devem ser ajustáveis em tempo real via GUI durante o desenvolvimento.

---

### 📊 Tabela de Comparação: Referência vs. Antigravity

| Característica        | Referência (Imperativo)       | Antigravity (R3F Declarativo)      | Benefício Antigravity                                              |
| --------------------- | ----------------------------- | ---------------------------------- | ------------------------------------------------------------------ |
| **Geometria**         | Modificação direta de array   | `useMemo` + `BufferAttribute`      | Imutabilidade e performance de recálculo zero.                     |
| **Partículas**        | Array de Meshes (Objeto Pool) | `InstancedMesh` (`<Instances>`)    | Redução drástica de _draw calls_ e uso de CPU.                     |
| **Pós-processamento** | ShaderPass manual             | `<EffectComposer>` + Custom Effect | Melhor gestão de dependências e fusão de shaders.                  |
| **Render Loop**       | requestAnimationFrame único   | Múltiplos `useFrame`               | Desacoplamento lógico; componentes gerenciam sua própria animação. |
| **Transparência**     | Problemática (fundo preto)    | Controlada (`gl={{alpha: true}}`)  | Correção de artefatos de alpha blending no Bloom.                  |

---

### Fase 1: O Núcleo Visual (WebGL & 3D)

**Objetivo:** Recriar a fidelidade visual com a arquitetura otimizada acima.

1. **Componente `Ghost.tsx**`:

- _Tarefa:_ Geometria Icosaedro deformada via `useMemo`. Material `MeshStandardMaterial` com `emissive` azul profundo.

2. **Componente `GhostEyes.tsx**`:

- _Tarefa:_ Vetores que calculam `Math.atan2` para seguir o mouse.
- _Performance:_ Componente isolado para não re-renderizar o fantasma inteiro.

3. **Componente `Particles.tsx**`:

- _Tarefa:_ Sistema `InstancedMesh` para "poeira espectral". Lógica matemática de órbita no `useFrame`.

4. **Componente `Effects.tsx` (Antigo GhostCanvas)**:

- _Tarefa:_ Orquestrar `EffectComposer`.
- _Custom:_ Implementar o `AnalogDecay` (VHS effect) e integrar com `Bloom` (intensidade 1.5+) e `Noise`.

### Fase 2: A Estrutura Hero (Layout & Z-Index)

1. **Componente `HeroCopy.tsx` (Editorial):**

- _Posição:_ Z-Index 10. Centralizado. Fontes TT Norms Pro.

2. **Componente `Preloader.tsx`:**

- _Lógica:_ SVG + Barra de progresso. Desaparece via `Suspense` do R3F.

### Fase 3: A Lógica do Manifesto

1. **Componente `ManifestoVideo.tsx`:**

- _Scroll Trigger:_ `framer-motion` interpola de thumbnail (bottom-right) para fullscreen.
- _Estado:_ Mudo -> Unmute no Fullscreen.

### Fase 4 & 5: Integração e Refinamento

- Montagem no `HomeHero.tsx`.
- Ajuste fino via `Leva` (exportar configurações finais para constantes).

---

### 🛠️ EXECUÇÃO IMEDIATA: Implementando os Componentes Chave

Copia e cola estes códigos atualizados que respeitam a nova arquitetura (Instancing e Otimização).

#### 1. `src/components/canvas/home/GhostEyes.tsx`

_(Lógica de vetores mantida, otimizada para R3F)_

```tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function GhostEyes() {
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const timeout = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(timeout, nextBlink);
    };
    const timer = setTimeout(timeout, 3000);
    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (!leftEye.current || !rightEye.current) return;

    const eyeMovementRange = 0.15;
    const targetX = mouse.x * eyeMovementRange;
    const targetY = mouse.y * eyeMovementRange;

    // Lerp para suavidade
    leftEye.current.position.x = THREE.MathUtils.lerp(
      leftEye.current.position.x,
      -0.3 + targetX,
      0.1
    );
    leftEye.current.position.y = THREE.MathUtils.lerp(
      leftEye.current.position.y,
      0.1 + targetY,
      0.1
    );

    rightEye.current.position.x = THREE.MathUtils.lerp(
      rightEye.current.position.x,
      0.3 + targetX,
      0.1
    );
    rightEye.current.position.y = THREE.MathUtils.lerp(
      rightEye.current.position.y,
      0.1 + targetY,
      0.1
    );

    const targetScaleY = blink ? 0.1 : 1;
    leftEye.current.scale.y = THREE.MathUtils.lerp(
      leftEye.current.scale.y,
      targetScaleY,
      0.4
    );
    rightEye.current.scale.y = THREE.MathUtils.lerp(
      rightEye.current.scale.y,
      targetScaleY,
      0.4
    );
  });

  // Material básico para reagir fortemente ao Bloom
  return (
    <group position={[0, 0, 0.8]}>
      <mesh ref={leftEye} position={[-0.3, 0.1, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={rightEye} position={[0.3, 0.1, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
```

#### 2. `src/components/canvas/home/Particles.tsx`

_(Lógica Refatorada: Usa `InstancedMesh` estrito para performance, conforme diretriz 4.2)_

```tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 60 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Dados iniciais das partículas (não são recriados a cada render)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        xFactor: -5 + Math.random() * 10,
        yFactor: -5 + Math.random() * 10,
        zFactor: -5 + Math.random() * 10,
        mx: 0,
        my: 0,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Atualiza o tempo individual da partícula
      particle.t += particle.speed / 2;
      const { t, factor, xFactor, yFactor, zFactor } = particle;

      // Matemática de movimento orgânico (Lissajous figures / Noise simplificado)
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      // Define posição no dummy
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      // Escala pulsante para simular brilho variando
      const scale = (Math.sin(time + xFactor) + 2) * 0.02;
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(s * 5, s * 5, s * 5);

      dummy.updateMatrix();

      // Atualiza a matriz na instância específica
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      {/* Blending Additive é crucial para o efeito "luz sobre luz" */}
      <meshBasicMaterial
        color="#4d8dff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
```

---

### Próximo Passo Sugerido

Para cumprir a diretriz **4.3 (Efeito AnalogDecay)** e **4.4 (Orquestração)**, o próximo passo lógico é criar o shader personalizado e configurá-lo no Canvas.

---
description: Hero ghost
---

### 🚀 Workflow Antigravity: Protocolo de Execução

#### 📦 Pré-requisitos (Configuração Inicial)

- **Status:** _A executar._
- **Ação:** Garantir dependências essenciais.
- **Comando:** `npm install three @types/three @react-three/fiber @react-three/drei @react-three/postprocessing simplex-noise framer-motion`

---

### Fase 1: O Núcleo Visual (WebGL & 3D)

**Objetivo:** Recriar a fidelidade visual do CodePen (O Fantasma, Luzes e Atmosfera).

1. **Componente `Ghost.tsx**` (Já iniciado):

- _Tarefa:_ Geometria Icosaedro + `simplex-noise` para deformação de vértices.
- _Ajuste Fino:_ Garantir que o material seja `MeshStandardMaterial` com `emissive` azul profundo para reagir ao Bloom.

2. **Componente `GhostEyes.tsx**` (Falta criar):

- _Tarefa:_ Criar dois vetores (olhos) que calculam o ângulo entre a posição do fantasma e o mouse (`Math.atan2`).
- _Comportamento:_ Devem piscar ocasionalmente e aumentar a intensidade do brilho quando o mouse se move rápido.

3. **Componente `Particles.tsx` & `Fireflies.tsx**` (Falta criar):

- _Tarefa:_ Sistema de partículas flutuantes usando `PointsMaterial` customizado para criar a "poeira espectral" e luzes piscantes ao redor.

4. **Componente `GhostCanvas.tsx**` (Cena Principal):

- _Tarefa:_ Orquestrar a cena. Configurar `EffectComposer` com `Bloom` (intensidade 1.5+), `Noise` (film grain) e `Vignette`.
- _Fidelidade:_ Ajustar as cores das luzes (`pointLight`) para `#4d8dff` (principal) e `#6e00ff` (fill) conforme a referência.

### Fase 2: A Estrutura Hero (Layout & Z-Index)

**Objetivo:** Montar o palco HTML/CSS onde o 3D vive, respeitando a hierarquia visual.

1. **Componente `HeroCopy.tsx` (Editorial):**

- _Tarefa:_ Implementar textos estáticos ("Você não vê o design...") com fontes TT Norms Pro.
- _Posição:_ Z-Index 10. Centralizado absoluto. Pointer-events-none (exceto CTA).

2. **Componente `Preloader.tsx`:**

- _Tarefa:_ SVG do fantasma + barra de progresso.
- _Lógica:_ Desaparecer após 2s ou quando o `GhostCanvas` carregar (Suspense).

### Fase 3: A Lógica do Manifesto (Vídeo Complexo)

**Objetivo:** Implementar a transição Thumbnail → Fullscreen → Hold.

1. **Componente `ManifestoVideo.tsx`:**

- _Estado Inicial:_ Fixo `bottom-right`, `border-radius: 16px`, mudo.
- _Scroll Trigger:_ Usar `framer-motion` (`useScroll`) para interpolar posição e escala baseada no scroll do Hero.
- _Lógica de Hold:_ Quando `scale === 1` (fullscreen), disparar um "Lock" no scroll do body por 2 segundos.
- _Áudio:_ Mudo por padrão. Unmute apenas durante o estado "Hold" (Fullscreen).

### Fase 4: Integração (HomeHero)

**Objetivo:** Unir WebGL, Texto e Vídeo.

1. **Montagem em `HomeHero.tsx`:**

- Empilhar camadas: Background < Canvas (Ghost) < Texto < Vídeo < Preloader.
- Gerenciar responsividade (Mobile vs Desktop). No mobile, o vídeo sai do Hero e vira uma seção abaixo.

### Fase 5: Teste de Fidelidade & Refinamento

**Objetivo:** Comparação lado a lado com a referência.

1. **Ajuste de Post-Processing:** Regular o `threshold` do Bloom para que apenas os olhos e as bordas do fantasma brilhem intensamente.
2. **Ajuste de Velocidade:** Sincronizar a velocidade do `noise` do fantasma com a referência (nem muito rápido, nem muito lento).
3. **Performance:** Verificar FPS. Se < 30fps, reduzir qualidade das sombras ou contagem de partículas.

---

### 🛠️ EXECUÇÃO IMEDIATA: Completando a Fase 1 (Os Detalhes 3D)

Para que eu possa avançar para a integração do vídeo (Fase 3), preciso terminar a cena 3D. Aqui estão os códigos para os **Olhos** e as **Partículas** que faltavam no passo anterior.

Copia e cola estes ficheiros para completar a "Atmosfera":

#### 1. `src/components/canvas/home/GhostEyes.tsx`

_Responsável pelo olhar que segue o mouse e pisca._

```tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function GhostEyes() {
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Estado para piscar
  const [blink, setBlink] = useState(false);

  // Lógica de piscar aleatório
  useEffect(() => {
    const timeout = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150); // Olhos fechados por 150ms

      // Próximo piscar entre 2s e 6s
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(timeout, nextBlink);
    };

    const timer = setTimeout(timeout, 3000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state) => {
    if (!leftEye.current || !rightEye.current) return;

    // Calcular posição alvo baseada no mouse (com limite de rotação)
    // O fantasma está em 0,0,0. Os olhos devem olhar para o mouse.
    // Mouse x/y vai de -1 a 1.

    const eyeMovementRange = 0.15; // O quanto os olhos se movem dentro da "orbita"
    const targetX = mouse.x * eyeMovementRange;
    const targetY = mouse.y * eyeMovementRange;

    // Interpolação suave (Lerp)
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

    // Escala para piscar (scale Y vai a 0.1)
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

  // Material muito brilhante para o Bloom pegar bem
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' });

  return (
    <group position={[0, 0, 0.8]}>
      {' '}
      {/* Posicionado na frente do fantasma */}
      <mesh
        ref={leftEye}
        position={[-0.3, 0.1, 0]}
        geometry={new THREE.SphereGeometry(0.06, 16, 16)}
        material={eyeMaterial}
      />
      <mesh
        ref={rightEye}
        position={[0.3, 0.1, 0]}
        geometry={new THREE.SphereGeometry(0.06, 16, 16)}
        material={eyeMaterial}
      />
    </group>
  );
}
```

#### 2. `src/components/canvas/home/Particles.tsx`

_Responsável pela poeira espectral flutuante._

```tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 80 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Gerar posições e velocidades aleatórias
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -5 + Math.random() * 10;
      const yFactor = -5 + Math.random() * 10;
      const zFactor = -5 + Math.random() * 10;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

      // Movimento orbital orgânico
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      // Atualiza posição do dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );

      // Escala pulsa levemente
      const scale = (Math.sin(time + xFactor) + 2) * 0.02; // Partículas pequenas
      dummy.scale.set(scale, scale, scale);

      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      // Aplica ao InstancedMesh
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
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

#### 3. Atualização do `GhostCanvas.tsx`

Agora, atualiza o arquivo `src/components/canvas/home/GhostCanvas.tsx` (que eu enviei na resposta anterior) para incluir estes novos componentes. Basta descomentar as linhas:

```tsx
// ... imports
import GhostEyes from './GhostEyes'; // Importar
import Particles from './Particles'; // Importar

// ... dentro do Canvas
<Ghost>
   <GhostEyes /> {/* Olhos dentro ou junto do grupo do fantasma */}
</Ghost>
<Particles count={50} />
// ...

```

_(Nota: Podes colocar o `GhostEyes` dentro do componente `Ghost` ou como irmão, mas como ele segue a posição base, é melhor ser irmão dentro de um Group pai se o fantasma se mover muito, ou ajustamos a posição.)_

---

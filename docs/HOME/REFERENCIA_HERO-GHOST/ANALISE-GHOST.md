# Análise e guia técnico – animação “Spectral Ghost”

Esta análise reúne os elementos visuais, interações e princípios técnicos observados no _pen_ de [Danilo Novais no CodePen](https://codepen.io/danilonovaisv/pen/azZbdQo) e nos arquivos extraídos (HTML, CSS e TypeScript).  O objetivo é permitir que um agente construtor de websites em Next.js e React recrie a hero section animada de forma fiel, aproveitando **React Three Fiber**, **Tailwind**, **Framer Motion** e o **App Router** do Next.js.

### **Animação Ghost - Elementos visuais:** 

### Background / atmosfera
| aspecto | observação |
|---|---|
| **Cores e textura** | O fundo da hero é um **gradiente bem escuro** (`#0a0a0a` → `#1a1a1a`) aplicado ao `body` e ao `preloader`. Após a transição, o canvas do WebGL é transparente e um plano em Three.js (Mesh com `PlaneGeometry(300,300)`) recebe um **shader próprio** chamado _atmosphere_. Esse shader controla a opacidade e cria um **halo circular** em torno do fantasma. Ele usa `revealRadius`, `fadeStrength`, `baseOpacity` e `revealOpacity` para revelar gradualmente a região perto do personagem. Esse fundo não é uma imagem, mas sim um **material customizado** em Three.js.  |
| **Efeito de película analógica** | Após o render da cena, um **passo de pós‑processamento** (ShaderPass) aplica _grain_, _bleeding_, _scanlines_, _vignette_ e jitter usando uniforms (`uAnalogGrain`, `uAnalogBleeding`, `uAnalogVSync`, etc.), criando um visual vintage de monitor. Esse shader é opcional e pode ser parametrizado via GUI. |
| **Preloader** | Antes de exibir a cena 3D, um preloader em HTML/CSS ocupa toda a tela. Ele usa um **SVG de fantasma em 2D** que flutua e pisca (animações `@keyframes ghostFloat` e `eyePulse`). Uma barra de progresso (`.progress‑bar`) anima enquanto os assets são carregados. |

### Fantasma e objetos flutuantes
| elemento | implementação |
|---|---|
| **Fantasma 3D** | Criado com `THREE.SphereGeometry(2,40,40)`; vértices da parte inferior são deslocados por ruído sinusoidal para formar a “saia” ondulada. O material é um `MeshStandardMaterial` com **alta emissividade** (`emissiveIntensity`) e cor controlada via parâmetro `bodyColor`.  Rim lights direcionais adicionam contorno azulado. |
| **Olhos** | Olhos são um `Group` com esferas menores (`SphereGeometry(0.3)`) e glows maiores (`SphereGeometry(0.525)`) com materiais transparentes. A opacidade aumenta de acordo com o movimento do usuário; há também um controle de _fade_ (`eyeGlowDecay`) que suaviza a iluminação ao parar de mover o mouse. |
| **Fireflies** | 20 “vagalumes” são gerados como pequenas esferas amarelas e um `PointLight`. Cada vagalume possui uma esfera de glow (`SphereGeometry(0.08)`) com `BackSide` e opacidade 0.4. Um objeto `userData` controla velocidade, fase e intensidade; eles se movem suavemente dentro de um volume (`±30` x, `±20` y, `±15` z) e pulsam em brilho. |
| **Partículas** | Cada partícula é uma pequena forma (esfera, tetraedro ou octaedro) clonada de um _pool_. Ao mover o mouse, partículas nascem a partir da posição do fantasma, possuem escala randômica, rotação lenta e decaem (`life` e `decayRate`). A cor é fluorescente (ex.: `violet`) e pode ser ajustada via parâmetros. |
| **Interação com o mouse** | O fantasma segue o cursor suavemente. A coordenada do mouse é convertida de `screen` para `world` (`x: (event.clientX/window.innerWidth)*2 - 1`, `y: …`). Um `followSpeed` governa a aproximação; além disso, ocorrem **oscilações** (senos e cossenos) para dar vida mesmo sem movimento. A intensidade do brilho dos olhos e a taxa de geração de partículas dependem da velocidade do mouse. |

### Tipografia e layout
* Todo o conteúdo é centralizado com Flexbox (`display:flex; flex-direction:column; justify-content:center; align-items:center;`), ocupando `100vh`.






### **Animação Ghost -  Responsividade**

* A implementação original é **fluida**: o WebGL renderer dimensiona para `window.innerWidth`/`window.innerHeight`; um listener de `resize` recalcula a razão de aspecto, atualiza `camera`, `renderer`, `composer` e uniformes de shaders. Portanto, ele se adapta a qualquer resolução.
* A tipografia utiliza unidades `vw` (viewport width) para o tamanho do título e mantém margens em `vh`. Esse ajuste natural dispensa media queries explícitas, mas para uma aplicação real recomenda‑se:
  * **Mobile-first** – defina a base de fontes com `clamp()` ou classes Tailwind (`text-4xl md:text-6xl lg:text-8xl`) para controlar legibilidade em telas pequenas.
  * **Breakpoints** – use breakpoints Tailwind (`sm`, `md`, `lg`, `xl`) para ajustar espaçamentos, tamanho do container e possivelmente reduzir a quantidade de partículas/vagalumes em dispositivos com performance limitada.
  * **Fallback touch** – em touch devices onde `mousemove` não ocorre, mantenha o fantasma centralizado e rode apenas a animação de flutuação. Detecte `pointer: coarse` e reduza efeitos opcionais para preservar bateria.





### **Animação Ghost -  Acessibilidade e SEO**

* **Semântica**: mantenha o texto principal dentro de um `<h1>` e a linha secundária como `<h2>` ou `<p>`. Evite usar `<br>` dentro do `<h1>`; em vez disso, use CSS (`display:block` para separar linhas) ou `Framer Motion` para animação de cada linha. 
* **Contraste**: a cor `#e0e0e0` em fundo `#0a0a0a` garante contraste suficiente (> 7:1) para WCAG 2.1. Teste as cores do brilho do fantasma contra o fundo; dê alternativa de tema sem efeitos para usuários sensíveis a brilho/interferência.
* **Canvas acessível**:  o canvas de Three.js é puramente decorativo. Adicione `aria-hidden="true"` e `role="presentation"` ao contêiner do canvas. Forneça uma descrição alternativa da animação via `<figcaption>` ou `aria-label` (“Fantasma flutuante com partículas luminosas”) para leitores de tela.
* **Carregamento**: o preloader deve ser anunciável; inclua `aria-live="polite"` e texto visível indicando progresso.  O progresso é visual e há uma barra; forneça também `aria-valuenow`/`aria-valuemax` nos momentos de carregamento se possível.
* **SEO**: como a hero é a primeira seção, inclua meta tags (`<title>`, `<meta name="description">`, `<meta property="og:image">`) no layout Next.js. Utilize Next.js `Image` para pré-carregar versões estáticas do fantasma ou do fundo como _placeholder_.




### **Animação Ghost - Arquitetura recomendada (Next.js App Router)

A estrutura abaixo divide a hero em componentes reutilizáveis. Todos os componentes podem ser organizados dentro de `app/components` para o App Router.

### 1. Estrutura de arquivos

```
app/
  page.tsx               → Home
  components/
    Hero.tsx             → Componente principal da hero (texto + canvas)
    GhostScene.tsx       → Cena 3D com Three.js/R3F
    Preloader.tsx        → Pré-carregador e animação inicial
    HeroText.tsx         → Container de texto e CTA
  lib/
    useMouse.ts          → Hook para rastrear movimento do mouse
  styles/
    globals.css          → Importa Tailwind e fontes customizadas
  tailwind.config.ts     → Extensão de tema (cores, fontes)
```

### 2. Tailwind e configuração

* **Instalação**: o projeto Next.js deverá estar com Tailwind já instalado (`pnpm add tailwindcss @types/tailwindcss`).
* **Extensões de tema**: configure fontes e cores fluorescentes para reutilização:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        boldonse: ['var(--font-boldonse)', 'sans-serif'],
        monospace: ['PPSupplyMono', 'monospace'],
      },
      colors: {
        background: '#0a0a0a',
        highlight: '#e0e0e0',
        fluorescent: {
          cyan: '#00ffff',
          lime: '#00ff00',
          magenta: '#ff00ff',
          yellow: '#ffff00',
          orange: '#ff4500',
          pink: '#ff1493',
          purple: '#9400d3',
          blue: '#0080ff',
          green: '#00ff80',
          red: '#ff0040',
          teal: '#00ffaa',
          violet: '#8a2be2',
        }
      },
      screens: {
        xs: '375px',
      },
      keyframes: {
        ghostFloat: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        eyePulse: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
      },
      animation: {
        ghostFloat: 'ghostFloat 3s ease-in-out infinite',
        eyePulse: 'eyePulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
```

### 3. Componentes React

#### `Hero.tsx`

```tsx
// app/components/Hero.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HeroText from './HeroText';
import Preloader from './Preloader';

// Carregar cena 3D somente no cliente (desativa SSR)
const GhostScene = dynamic(() => import('./GhostScene'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-background text-highlight overflow-hidden">
      {/* Preloader controla exibição inicial */}
      <Preloader />
      {/* Texto sobreposto */}
      <HeroText />
      {/* Canvas 3D e pós‑processamento */}
      <Suspense fallback={null}>
        <GhostScene />
      </Suspense>
    </section>
  );
}
```

#### `HeroText.tsx`

```tsx
// app/components/HeroText.tsx
import { motion } from 'framer-motion';

export default function HeroText() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { delay: 1.5, duration: 1.2 } },
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <span className="font-monospace text-xs uppercase tracking-widest mb-2">[Brand awareness]</span>
      <h1 className="font-boldonse font-semibold uppercase leading-tight mb-4 text-[10vw] md:text-6xl lg:text-8xl">
        Você não vê o design
      </h1>
      <h2 className="font-boldonse font-medium uppercase text-[6vw] md:text-4xl lg:text-5xl">
        Mas ele vê você
      </h2>
    </motion.div>
  );
}
```
*Note:* O uso de `pointer-events:none` impede interferência com o canvas; as tags `<h1>` e `<h2>` garantem estrutura semântica.

#### `Preloader.tsx`

```tsx
// app/components/Preloader.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Simule carga ou escute eventos de carregamento (ex.: fonts/webgl)
    const timer = setTimeout(() => setComplete(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Ícone SVG do fantasma */}
            <svg className="w-20 h-20" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
              <path d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z"/>
              <circle cx="208" cy="225" r="22" />
              <circle cx="297" cy="225" r="22" />
            </svg>
          </motion.div>
          <motion.p className="font-monospace text-xs uppercase tracking-widest mt-4"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >Summoning spirits…</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

#### `GhostScene.tsx`

```tsx
// app/components/GhostScene.tsx
'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Sphere, PointLight, Plane, Float } from '@react-three/drei';
import * as THREE from 'three';

// Shader para o efeito de atmosfera (baseado no script original)
const AtmosphereMaterial = {
  uniforms: {
    ghostPosition: { value: new THREE.Vector3() },
    revealRadius: { value: 20 },
    fadeStrength: { value: 1.7 },
    baseOpacity: { value: 0.9 },
    revealOpacity: { value: 0.05 },
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
      float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
      float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength);
      float opacity = mix(revealOpacity, baseOpacity, reveal);
      gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
    }
  `,
  transparent: true,
};

function Ghost() {
  const group = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState(false);
  const { viewport, mouse } = useThree();

  // Atualiza posição para seguir o mouse
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // movimento flutuante constante
    const floatY = Math.sin(t * 1.5) * 0.05 + Math.cos(t * 0.7) * 0.03;
    group.current.position.y = floatY;
    // segue mouse suavemente
    const targetX = (mouse.x ?? 0) * viewport.width * 0.5;
    const targetY = (mouse.y ?? 0) * viewport.height * 0.3;
    group.current.position.x += (targetX - group.current.position.x) * 0.05;
    group.current.position.y += (targetY - group.current.position.y) * 0.05;

    // ajuste do emissive intensity pulsando
    const pulse = Math.sin(t * 1.6) * 0.6 + Math.sin(t * 0.6) * 0.12;
    if (body.current.material instanceof THREE.MeshStandardMaterial) {
      body.current.material.emissiveIntensity = 5.8 + pulse;
    }
  });

  // cria geometria do fantasma com “saia” ondulada
  useEffect(() => {
    if (!body.current) return;
    const geo = body.current.geometry as THREE.SphereGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const y = arr[i + 1];
      if (y < -0.2) {
        const x = arr[i];
        const z = arr[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        arr[i + 1] = -2.0 + noise1 + noise2 + noise3;
      }
    }
    geo.computeVertexNormals();
  }, []);

  return (
    <group ref={group} scale={2.4}>
      <mesh ref={body}>
        <sphereGeometry args={[2, 40, 40]} />
        <meshStandardMaterial
          color="#0f2027"
          roughness={0.02}
          metalness={0}
          transparent
          opacity={0.88}
          emissive="#0080ff"
          emissiveIntensity={5.8}
        />
      </mesh>
      {/* Olhos */}
      <group>
        <mesh position={[-0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.0} />
        </mesh>
        <mesh position={[0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.0} />
        </mesh>
      </group>
      {/* Vagalumes e partículas podem ser componentes separados */}
    </group>
  );
}

export default function GhostScene() {
  const planeRef = useRef<THREE.Mesh>(null!);
  const ghostRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (planeRef.current) {
      const mat = planeRef.current.material as any;
      mat.uniforms.time.value = t;
      mat.uniforms.ghostPosition.value.copy(ghostRef.current?.position ?? new THREE.Vector3());
    }
  });

  return (
    <Canvas
      className="absolute inset-0"
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 20], fov: 75 }}
    >
      <ambientLight color="#0a0a2e" intensity={0.08} />
      {/* Rim lights */}
      <directionalLight position={[-8, 6, -4]} color="#4a90e2" intensity={1.8} />
      <directionalLight position={[8, -4, -6]} color="#50e3c2" intensity={1.26} />

      {/* Atmosfera */}
      <mesh ref={planeRef} position={[0, 0, -50]} renderOrder={-100}>
        <planeGeometry args={[300, 300]} />
        <shaderMaterial attach="material" args={[AtmosphereMaterial]} />
      </mesh>

      <Suspense fallback={null}>
        <Ghost />
      </Suspense>
    </Canvas>
  );
}
```

*Observações*:
- A cena utiliza `Canvas` do `@react-three/fiber` com `className="absolute inset-0"` para ocupar toda a tela.  
- O shader de atmosfera foi transposto para `shaderMaterial`. Para o shader analógico (grain/vignette), pode‑se criar outro `ShaderPass` usando `@react-three/postprocessing` se necessário.
- Para adicionar **vagalumes** e **partículas**, crie componentes que iteram listas de objetos e usam `useFrame` para atualizar posição e opacidade. Reduza a contagem em dispositivos móveis.

### **Animação Ghost - Integração com o restante da stack:**

* **App Router**: as rotas ficam em `app/page.tsx`. O componente `Hero` pode ser importado ali. Qualquer rota subsequente (blog, contato) poderá ser carregada via links normais.  Como o canvas é puramente do cliente, o componente `GhostScene` deve ser marcado com `'use client'` e importado dinamicamente.
* **Firebase Hosting**: compile com `next build` e publique usando `firebase deploy`. Garanta que as variáveis de ambiente da hospedagem estejam definidas em `.env` e leia‑as via `process.env` apenas no servidor.
* **Supabase Storage**: armazene assets como fontes personalizadas, modelos glb ou texturas no Supabase. Carregue‐os em tempo de build ou no cliente usando a URL gerada. Defina um mecanismo de fallback no preloader caso o download falhe.

## Conclusão

A animação “Spectral Ghost” combina **WebGL/Three.js**, um **shader de película analógica**, partículas responsivas e um preloader estilizado. Para reconstruí‑la em Next.js com React Three Fiber é necessário separar a lógica em componentes reutilizáveis, cuidar da **responsividade** com unidades relativas e breakpoints Tailwind, e garantir **acessibilidade** com marcas semânticas e canvas marcado como decorativo. Com as configurações e exemplos acima, um agente de construção de sites pode replicar o efeito de forma fiel e escalável.

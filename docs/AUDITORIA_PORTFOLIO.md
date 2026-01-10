Com certeza. Este é um momento crítico da refatoração. Se a Hero e o Manifesto estão "acoplados" (um dentro do outro), isso prejudica a performance e a flexibilidade do layout.

Aqui está o **Prompt Técnico Atômico**, formatado especificamente para o teu **Agente Orquestrador Antigravity**, focado em desacoplar esses componentes mantendo a fluidez visual.

---

### 🛠️ PROMPT: REFATORAÇÃO ARQUITETURAL — SPLIT HERO & MANIFESTO

**CONTEXTO**
Atualmente, a lógica do "Manifesto" (Vídeo/Thumb) pode estar aninhada dentro de `HomeHero.tsx` ou dependente do layout absoluto da Hero.
O objetivo é **desacoplar** totalmente: transformar em duas secções irmãs (siblings) na `page.tsx`.

1. **Hero Section:** Apenas Ghost, Título, Subtítulo e Scroll Indicator.
2. **Manifesto Section:** O bloco de vídeo/texto que aparece logo a seguir ao scroll.

**ARQUIVOS ALVO**

* `src/app/page.tsx` (Orquestrador da página)
* `src/components/home/hero/HomeHero.tsx` (Componente a limpar)
* `src/components/home/hero/ManifestoSection.tsx` (Componente a isolar)

**PASSO A PASSO DA EXECUÇÃO**

1. **Análise de Dependência:**
* Abra `src/components/home/hero/HomeHero.tsx`.
* Verifique se `<ManifestoSection />` ou `<ManifestoThumb />` está a ser renderizado lá dentro.
* **Ação:** Remova a renderização do Manifesto de dentro da Hero. A Hero deve terminar no seu limite lógico (conteúdo textual + ghost).


2. **Ajuste de Layout da Hero (`HomeHero.tsx`):**
* Garanta que a `HomeHero` tem `min-h-screen` (ou altura definida) e `position: relative`.
* Certifique-se de que não sobra nenhum "buraco" ou margem excessiva na parte inferior onde o vídeo costumava estar.


3. **Promoção do Manifesto (`ManifestoSection.tsx`):**
* Abra `src/components/home/hero/ManifestoSection.tsx`.
* Garanta que este componente é um wrapper de secção completo (`<section className="...">`).
* Adicione padding vertical (ex: `py-20` ou `py-24`) e background correto (ex: `bg-black` ou transparente dependendo do design) para que ele funcione sozinho.
* Verifique se ele precisa de `z-index` específico para ficar "por cima" ou "por baixo" do Ghost ao fazer scroll (normalmente `z-10` e `relative`).


4. **Remontagem na Página (`src/app/page.tsx`):**
* Importe `ManifestoSection` diretamente no `page.tsx`.
* Posicione-o imediatamente abaixo de `<HomeHero />`.
* Estrutura esperada:
```tsx
<main>
  <HomeHero />      {/* 100vh / Ghost / Intro */}
  <ManifestoSection /> {/* Scroll flow content */}
  <PortfolioShowcase />
  {/* ... */}
</main>

```





**REGRAS DE VISUALIZAÇÃO (CRITÉRIOS DE ACEITE)**

* [ ] **Sem "Jumps":** O scroll da Hero para o Manifesto deve ser suave.
* [ ] **Ghost Persistence:** O Ghost (WebGL) da Hero deve continuar visível ou fazer fade-out suave enquanto o Manifesto sobe (verificar `z-index`).
* [ ] **Responsividade:** No Mobile, o Manifesto não pode "encavalar" no texto da Hero. Respeitar o fluxo de documento normal.
* [ ] **Full Width:** O Manifesto deve ocupar a largura correta do container, alinhado ao grid global.

**COMANDO DE ROLLBACK**
Se o layout quebrar (ex: buraco branco gigante entre seções), reverta as mudanças no `page.tsx` e `HomeHero.tsx` e reporte "FALHA DE DESACOPLAMENTO".


# **4.2 Hero

### **1.1 Objetivo**
Criar uma experiência hero imersiva e responsiva que gera impacto na primeira impressão, com:
- Animação 3D interativa (fantasma espectral seguindo o cursor)
- Atmosfera escura com shader customizado
- Animações de entrada impactantes
- CTA que direciona para seção SOBRE

**Inspiração:** [CodePen Ghost Animation](https://codepen.io/danilonovaisv/pen/YPWyrdW)

---

### **1.2 Identidade Visual**

#### **Color Palette**
| Token | Value | Uso |
|-------|-------|-----|
| `bluePrimary` | `#0048ff` | CTAs, links, elementos interativos |
| `background` | `#040013` | Fundo escuro principal |
| `text` | `#fcffff` | Texto principal |
| `textMuted` | `#d9dade` | Texto secundário |

#### **Typography System**

**Fonte primária:** TT Norms Pro (self-hosted)

```typescript
// Arquivos de fonte (Supabase Storage)
const fonts = {
  black: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Black.woff2',
  bold: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2',
  medium: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Medium.woff2',
  regular: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Regular.woff2',
};
```

**Tokens Responsivos (usando clamp):**

| Token | Mobile | Desktop | Peso | Uso |
|-------|--------|---------|------|-----|
| `display` | 2.5rem (40px) | 4.5rem (72px) | Black | Big phrases não-semânticas |
| `h1` | 2rem (32px) | 3.5rem (56px) | Bold | Hero headlines |
| `h2` | 1.5rem (24px) | 2.5rem (40px) | Bold | Subtítulos |
| `h3` | 1.25rem (20px) | 1.75rem (28px) | Medium | Títulos de cards |
| `body` | 1rem (16px) | 1.125rem (18px) | Regular | Texto corrido |

---

### **1.3 Conteúdo**

```tsx
// Estrutura de conteúdo
<section className="hero">
  {/* Tag decorativa */}
  <span className="tag">[BRAND AWARENESS]</span>
  
  {/* Headline - Desktop/Tablet (2 linhas) */}
  <h1 className="hidden md:block">
    Você não vê
    <br />
    o design.
  </h1>
  
  {/* Headline - Mobile (3 linhas) */}
  <h1 className="md:hidden">
    Você não
    <br />
    vê o
    <br />
    design.
  </h1>
  
  {/* Subheading */}
  <h2>Mas ele vê você.</h2>
  
  {/* CTA */}
  <CTAButton href="/sobre">step inside →</CTAButton>
</section>
```

#### **CTA — Design Visual**
- **Formato:** Compósito (Pílula à esquerda + Círculo à direita)
- **Cor:** Azul Primário (`#0048ff`), texto branco
- **Texto:** Uppercase, tracking médio, padding `px-6 py-3`
- **Ícone:** Seta (→) centralizada no círculo

---

### **1.4 Animações**

#### **Entrada de Textos (Page Load)**

```javascript
// Framer Motion config
initial: {
  opacity: 0,
  scale: 0.92,
  translateY: 60,
  filter: "blur(10px)"
}

animate: {
  opacity: 1,
  scale: [1.02, 1],
  translateY: 0,
  filter: "blur(0px)"
}

transition: {
  duration: 1.2,
  easing: [0.25, 0.46, 0.45, 0.94]
}
```

#### **CTA — Interações**

| Estado | Dispositivo | Comportamento |
|--------|-------------|---------------|
| **Hover** | Desktop | `translateY(-1px)` |
| **Hover Seta** | Desktop | `translateX(4px)` (opcional) |
| **Click** | Mobile | `scale(0.98)` |
| **Focus** | Teclado | Outline 2px `#4fe6ff`, offset 4px |

---

### **1.5 Elementos Visuais — Animação Ghost**

#### **Background / Atmosfera**

| Aspecto | Implementação |
|---------|---------------|
| **Cores** | Gradiente escuro `#0a0a0a` → `#1a1a1a` |
| **Shader** | Plano 300×300 com material customizado (_atmosphere_) |
| **Halo Circular** | Usa `revealRadius`, `fadeStrength`, `baseOpacity`, `revealOpacity` |
| **Pós-processamento** | Opcional: grain, bleeding, scanlines, vignette (shader analógico) |

#### **Personagem Ghost**

| Elemento | Implementação |
|----------|---------------|
| **Geometria** | `THREE.SphereGeometry(2, 40, 40)` com vértices inferiores deformados |
| **Material** | `MeshStandardMaterial` com alta `emissiveIntensity` |
| **Cor** | Controlada via `bodyColor`, rim lights azulados |
| **Olhos** | `Group` com esferas menores + glows transparentes |
| **Fireflies** | 20 vagalumes (esferas amarelas + `PointLight`) |
| **Partículas** | Pool de formas pequenas (esfera/tetraedro/octaedro) que nascem no movimento |

#### **Interação com Mouse**

```javascript
// Conversão screen → world
x = (event.clientX / window.innerWidth) * 2 - 1
y = (event.clientY / window.innerHeight) * 2 - 1

// Seguimento suave
targetX = mouseX * viewport.width * 0.5
targetY = mouseY * viewport.height * 0.3
position.x += (targetX - position.x) * followSpeed

// Oscilações constantes (sin/cos)
floatY = sin(time * 1.5) * 0.05 + cos(time * 0.7) * 0.03
```

#### **Layout**

```css
/* Centralização com Flexbox */
.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

---

### **1.6 Responsividade**

#### **Textos**

**Desktop/Tablet (≥768px):**
```
H1: "Você não vê" (linha 1)
    "o design." (linha 2)
Fonte: TT Norms Pro Black, 6–9rem
```

**Mobile (<768px):**
```
H1: "Você não" (linha 1)
    "vê o" (linha 2)
    "design." (linha 3)
Fonte: TT Norms Pro Black, 6–9rem
```

#### **Performance Adaptativa**

```javascript
// Ajustes por dispositivo
const config = {
  desktop: {
    fireflies: 20,
    particles: 50,
    postProcessing: true,
    pixelRatio: 2
  },
  tablet: {
    fireflies: 10,
    particles: 25,
    postProcessing: false,
    pixelRatio: 1
  },
  mobile: {
    fireflies: 5,
    particles: 10,
    postProcessing: false,
    pixelRatio: 1
  }
};
```

#### **Fallback Touch**

- Em dispositivos touch onde `mousemove` não ocorre: manter fantasma centralizado
- Rodar apenas animação de flutuação
- Detectar `pointer: coarse` e reduzir efeitos

---

### **1.7 Acessibilidade**

#### **Semântica HTML**

```tsx
<section className="hero" aria-label="Seção principal de apresentação">
  <h1>Você não vê o design.</h1>
  <h2>Mas ele vê você.</h2>
  
  {/* Canvas decorativo */}
  <div role="presentation" aria-hidden="true">
    <Canvas />
  </div>
  
  {/* Descrição alternativa */}
  <p className="sr-only">
    Animação decorativa de um fantasma flutuante com partículas luminosas
  </p>
</section>
```

#### **Contraste**

- `#fcffff` em `#040013`: **19.5:1** ✅ WCAG AAA
- `#d9dade` em `#040013`: **15.8:1** ✅ WCAG AAA

#### **Prefers-Reduced-Motion**

```tsx
const prefersReducedMotion = useReducedMotion();

if (prefersReducedMotion) {
  return <StaticGhostFallback />;
}

return <AnimatedGhostCanvas />;
```

---

### **1.8 Estrutura de Arquivos**

```
app/
├── components/
│   ├── Hero.tsx              # Container principal
│   ├── HeroText.tsx          # Conteúdo semântico
│   ├── GhostScene.tsx        # Canvas WebGL (dynamic import)
│   ├── Ghost.tsx             # Personagem 3D
│   ├── Atmosphere.tsx        # Shader de fundo
│   ├── Fireflies.tsx         # Vagalumes
│   ├── Preloader.tsx         # Loading inicial
│   └── CTAButton.tsx         # Call-to-action
├── lib/
│   ├── hooks/
│   │   ├── usePerformanceAdaptive.ts
│   │   ├── useReducedMotion.ts
│   │   └── useMouse.ts
│   └── utils/
│       └── cn.ts
└── styles/
    └── globals.css
```

---

### **1.9 Z-Index Stack**

```typescript
const zIndex = {
  preloader: 50,      // Tela de carregamento
  ghostCanvas: 20,    // Canvas WebGL (sempre acima do texto)
  heroContent: 10,    // Textos e CTA
  background: 0,      // Gradiente de fundo
};
```

---

### **1.10 Implementação — Componentes Principais**

#### **Hero.tsx**

```tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HeroText from './HeroText';
import Preloader from './Preloader';

const GhostScene = dynamic(() => import('./GhostScene'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-[#040013] text-[#fcffff] overflow-hidden">
      <Preloader />
      <HeroText />
      <Suspense fallback={null}>
        <GhostScene />
      </Suspense>
    </section>
  );
}
```

#### **HeroText.tsx**

```tsx
import { motion } from 'framer-motion';

const textAnimation = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 60,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: [1.02, 1],
    y: 0,
    filter: 'blur(0px)',
  },
  transition: {
    duration: 1.2,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
};

export default function HeroText() {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center pointer-events-none px-5"
      {...textAnimation}
    >
      <span className="text-xs uppercase tracking-widest mb-2 opacity-60">
        [BRAND AWARENESS]
      </span>
      
      {/* Desktop/Tablet */}
      <h1 className="hidden md:block text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-black tracking-tight leading-tight">
        Você não vê
        <br />
        o design.
      </h1>
      
      {/* Mobile */}
      <h1 className="md:hidden text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-black tracking-tight leading-tight">
        Você não
        <br />
        vê o
        <br />
        design.
      </h1>
      
      <h2 className="text-[clamp(1.5rem,3vw+0.5rem,2.5rem)] font-bold text-[#d9dade] mt-4">
        Mas ele vê você.
      </h2>
      
      <div className="mt-8 pointer-events-auto">
        <CTAButton href="/sobre">step inside →</CTAButton>
      </div>
    </motion.div>
  );
}
```

#### **GhostScene.tsx**

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Ghost } from './Ghost';
import { Atmosphere } from './Atmosphere';
import { Fireflies } from './Fireflies';

export default function GhostScene() {
  return (
    <Canvas
      className="absolute inset-0 z-20"
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 20], fov: 75 }}
      role="presentation"
      aria-hidden="true"
    >
      <ambientLight color="#0a0a2e" intensity={0.08} />
      <directionalLight position={[-8, 6, -4]} color="#4a90e2" intensity={1.8} />
      <directionalLight position={[8, -4, -6]} color="#50e3c2" intensity={1.26} />
      
      <Suspense fallback={null}>
        <Atmosphere />
        <Ghost />
        <Fireflies count={20} />
      </Suspense>
    </Canvas>
  );
}
```

---

## 🎬 4.3 - VÍDEO MANIFESTO

### **2.1 Objetivo**
Apresentar um vídeo manifesto fullscreen com resumo poético do trabalho, posicionado logo após a Hero, sem animações de scroll-morphing.

**Características:**
- Seção independente e fullscreen
- Colado às paredes da página
- Aspect ratio 16:9 (`aspect-video`)
- Autoplay, loop, muted
- Controle de áudio visível

---

### **2.2 Layout**

#### **Estrutura**

```tsx
<section className="video-manifesto">
  <div className="video-wrapper">
    <video />
    <div className="video-overlay" />
    <div className="video-text" />
    <button className="toggle-sound" />
  </div>
</section>
```

#### **Posicionamento**

**Desktop e Mobile:**
- Seção fullscreen logo após Hero
- `width: 100vw`
- `aspect-ratio: 16/9`
- Sem padding lateral (colado às paredes)

```css
.video-manifesto {
  width: 100vw;
  margin: 0;
  padding: 0;
}

.video-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
}
```

---

### **2.3 Comportamento do Vídeo**

#### **Propriedades Base**

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  src={videoSrc}
  poster={posterSrc}
/>
```

#### **Controle de Áudio**

**Desktop e Mobile:**
- Botão de som sempre visível
- Tap/click = toggle mute
- Ao sair da seção → mutar automaticamente

```tsx
const [muted, setMuted] = useState(true);

// Observer para detectar saída da seção
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        setMuted(true);
      }
    },
    { threshold: 0.1 }
  );
  
  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }
  
  return () => observer.disconnect();
}, []);
```

---

### **2.4 Animação de Entrada**

**Simples fade-in (sem scroll-triggered morphing):**

```javascript
// Framer Motion
initial: { 
  opacity: 0, 
  scale: 0.95, 
  y: 20 
}

animate: { 
  opacity: 1, 
  scale: 1, 
  y: 0 
}

transition: { 
  duration: 0.6, 
  ease: [0.22, 1, 0.36, 1] 
}
```

---

### **2.5 Overlay e Metadados**

#### **Overlay Gradiente**

```css
.video-overlay {
  background: radial-gradient(
    120% 120% at 70% 30%,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.55) 70%,
    rgba(0, 0, 0, 0.75) 100%
  );
  position: absolute;
  inset: 0;
  pointer-events: none;
}
```

#### **Texto Sobreposto**

```tsx
<div className="video-text absolute bottom-0 left-0 w-full p-6">
  <p className="text-white/70 text-sm mb-1">Showreel 2025</p>
  <p className="text-white text-lg font-medium">
    Strategy • Branding • Motion
  </p>
</div>
```

---

### **2.6 Controle de Som — Design**

```tsx
<button
  type="button"
  className="toggle-sound absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
  onClick={() => setMuted(m => !m)}
  aria-label={muted ? 'Ativar som' : 'Desativar som'}
  aria-pressed={!muted}
>
  {muted ? (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  )}
</button>
```

---

### **2.7 Responsividade**

#### **Desktop e Mobile (Comportamento Unificado)**

```css
/* Ambos os dispositivos */
.video-manifesto {
  width: 100vw;
  padding: 0;
  margin: 0;
}

.video-wrapper {
  aspect-ratio: 16/9;
  width: 100%;
}

/* Ajustes de texto em mobile */
@media (max-width: 767px) {
  .video-text {
    padding: 1rem;
  }
  
  .video-text p:first-child {
    font-size: 0.75rem;
  }
  
  .video-text p:last-child {
    font-size: 0.875rem;
  }
}
```

---

### **2.8 Otimização de Carregamento**

#### **Lazy Loading**

```tsx
const [shouldLoad, setShouldLoad] = useState(false);
const wrapperRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    },
    { rootMargin: '200px' }
  );
  
  if (wrapperRef.current) {
    observer.observe(wrapperRef.current);
  }
  
  return () => observer.disconnect();
}, []);
```

#### **Qualidade Adaptativa**

```tsx
const [videoQuality, setVideoQuality] = useState<'hd' | 'sd'>('hd');

useEffect(() => {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    
    if (conn?.effectiveType === '4g' || conn?.effectiveType === '5g') {
      setVideoQuality('hd');
    } else {
      setVideoQuality('sd');
    }
  }
}, []);

const videoSrc = videoQuality === 'hd' 
  ? src 
  : src.replace('.mp4', '-720p.mp4');
```

---

### **2.9 Acessibilidade**

#### **Checklist**

- ✅ Envolver vídeo com elemento semântico (`<section>`)
- ✅ Botão de som com `aria-label` e `aria-pressed`
- ✅ `playsInline` para evitar fullscreen indesejado
- ✅ Respeitar `prefers-reduced-motion`
- ✅ Contraste adequado no overlay (gradiente)
- ✅ Descrição alternativa via `aria-label` no vídeo

```tsx
<video
  aria-label="Vídeo showreel demonstrando projetos de design gráfico"
  aria-describedby="video-description"
/>

<p id="video-description" className="sr-only">
  Vídeo de apresentação dos trabalhos em estratégia, branding e motion design
</p>
```

---

### **2.10 Implementação Completa**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoManifestoProps {
  src: string;
}

export function VideoManifesto({ src }: VideoManifestoProps) {
  const [muted, setMuted] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoQuality, setVideoQuality] = useState<'hd' | 'sd'>('hd');
  
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Lazy loading
  useEffect(() => {
    if (!wrapperRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);
  
  // Mutar ao sair da seção
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setMuted(true);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  
  // Detectar qualidade de conexão
  useEffect(() => {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn?.effectiveType === '4g' || conn?.effectiveType === '5g') {
        setVideoQuality('hd');
      } else {
        setVideoQuality('sd');
      }
    }
  }, []);
  
  // Aplicar mute
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
  }, [muted]);
  
  const videoSrc = videoQuality === 'hd' 
    ? src 
    : src.replace('.mp4', '-720p.mp4');
  
  const posterSrc = src.replace('.mp4', '-poster.jpg');
  
  return (
    <motion.section
      ref={sectionRef}
      className="video-manifesto w-full"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div ref={wrapperRef} className="video-wrapper relative w-full aspect-video">
        {shouldLoad ? (
          <>
            <motion.video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              loop
              muted={muted}
              playsInline
              preload="metadata"
              aria-label="Vídeo showreel demonstrando projetos de design gráfico"
            />
            
            {/* Overlay */}
            <div className="video-overlay absolute inset-0 pointer-events-none" />
            
            {/* Metadados */}
            <div className="video-text absolute bottom-0 left-0 w-full p-4 md:p-6">
              <p className="text-white/70 text-xs md:text-sm mb-1">Showreel 2025</p>
              <p className="text-white text-sm md:text-lg font-medium">
                Strategy • Branding • Motion
              </p>
            </div>
            
            {/* Toggle som */}
            <button
              type="button"
              className="toggle-sound absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors focus-visible:outline-2 focus-visible:outline-[#4fe6ff] focus-visible:outline-offset-2"
              onClick={() => setMuted(m => !m)}
              aria-label={muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
              aria-pressed={!muted}
            >
              {muted ? '🔇' : '🔊'}
            </button>
          </>
        ) : (
          // Placeholder
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800 animate-pulse" />
        )}
      </div>
    </motion.section>
  );
}
```

---

### **2.11 Integração na Página**

```tsx
// app/page.tsx
import Hero from './_components/Hero';
import { VideoManifesto } from './_components/VideoManifesto';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />
      
      {/* Vídeo Manifesto */}
      <VideoManifesto
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
      />
      
      {/* Outras seções */}
    </main>
  );
}
```

---

### **2.12 CSS Global**

```css
/* globals.css */

/* Overlay de vídeo */
.video-overlay {
  background: radial-gradient(
    120% 120% at 70% 30%,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.55) 70%,
    rgba(0, 0, 0, 0.75) 100%
  );
}

/* Remover espaçamento padrão */
.video-manifesto {
  margin: 0;
  padding: 0;
}

/* Garantir que vídeo ocupe toda a largura */
.video-wrapper video {
  display: block;
  width: 100%;
  height: 100%;
}
```

---

### **2.13 Checklist de Validação**

**Funcional:**
- [ ] Vídeo fullscreen logo após Hero
- [ ] Aspect ratio 16:9 mantido em todas as telas
- [ ] Autoplay funciona (muted)
- [ ] Botão de som visível e funcional
- [ ] Vídeo muta ao sair da seção
- [ ] Lazy loading implementado
- [ ] Qualidade adaptativa baseada em conexão

**Acessibilidade:**
- [ ] Botão com `aria-label` e `aria-pressed`
- [ ] `playsInline` no mobile
- [ ] Descrição alternativa no vídeo
- [ ] Contraste adequado no overlay
- [ ] Foco visível no botão de som

**Performance:**
- [ ] `preload="metadata"`
- [ ] Poster estático carregado
- [ ] IntersectionObserver para lazy load
- [ ] Versões HD/SD disponíveis

---




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



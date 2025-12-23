
# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais
**Páginas Principais:** Home, Sobre, Portfólio, Contato
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto,Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)
---
## INFORMAÇÕES GLOBAIS

### 1. Contexto do Projeto
- Projeto: Portfólio Institucional de Danilo Novais.
- Páginas principais:
  - Home
  - Sobre
  - Portfólio
  - Contato

**Ordem das seções da Home:**
1. Header
2. Hero
3. Vídeo Manifesto (Manifesto)
4. Portfolio Showcase
5. Featured Projects
6. Clients / Brands
7. Contact
8. Footer

---

### 2. Assets Globais
- **Logo Light:**  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg
- **Logo Dark:**  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg
- **Favicon:**  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg

---

### 3. Conteúdo Global por Seção (dados base)

#### Hero
- Tag: `[BRAND AWARENESS]`
- Título:
  ```
  Design, não é
  só estética.
  ```
- Subtítulo: `[É intenção, é estratégia, é experiência.]`
- CTA label: `get to know me better →`
- CTA secundário (scroll): `#manifesto`
- **WebGL Atmosférico:** Ghost abstrato + pós-processamento (substitui qualquer modelo GLB)

**TYPOGRAPHY:**
- Fonte: TT Norms Pro

#### Manifesto (Vídeo)
- Vídeo URL (usado na Hero e na seção Manifesto):  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4

---

### 4. Princípios Globais de Animação
- **DOM:** Framer Motion
  - Reveals (`whileInView`)
  - Microinterações (`whileHover`, `whileTap`)
  - Scroll (`useScroll`, `useTransform`)
- Animar apenas `transform` e `opacity`
- **WebGL:** React Three Fiber (`useFrame`)
- `prefers-reduced-motion: reduce`
  - Desativa follow, bloom intenso e parallax
  - Mantém layout e fades simples


- **Portfolio Showcase**
- Título: `portfólio showcase`
- Categorias:
| ID | Label (UI) |
Label PT (explicativo) | Thumbnail URL
|
| ---------------------------- | -------------------------------- |
-------------------------------- |
-----------------------------------------------------------------------
------------------------------------ |
| `brand-campaigns` | `Brand & Campaigns` |
`Brand & Campanhas` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp` |
| `videos-motions` | `Videos & Motions` |
`Vídeos & Motions` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif` |
| `websites-webcampaigns-tech` | `Web Campaigns, Websites & Tech` |
`Campanhas Web, Websites & Tech` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp` |
- CTA final:
- Label: `VEJA MAIS →`
- Href: `/portfolio`
- **Featured Projects — cards**
| Slug | Título |
Categoria | Cliente | Ano | Imagem URL
|
| ---------------------- | ------------------------------------- |
--------------------- | ---------------------- | ---- |
-------------------------------------------------------------------------
------------------------------------ |
| `magic-radio-branding` | `Magic — devolvendo a magia ao rádio` |
`branding & campanha` | `Magic` | 2023 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp` |
| `branding-project-01` | `Uma marca ousada e consistente` |
`branding` | `Cliente confidencial` | 2022 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp` |
| `key-visual-campaign` | `Key visual para campanha sazonal` |
`campanha` | `Cliente confidencial` | 2021 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Key-Visual.webp` |
| `webdesigner-motion` | `Experiência web em movimento` | `web &
motion` | `Cliente confidencial` | 2023 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif` |
- **Clients / Brands**
- Título: `marcas com as quais já trabalhei`
- Logos (monocromáticos claros):
| # | URL
|
| --- |
-----------------------------------------------------------------------
---------------------- |
| 1 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client1.svg` |
| 2 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client2.svg` |
| 3 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client3.svg` |
| 4 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client4.svg` |
| 5 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client5.svg` |
| 6 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client6.svg` |
| 7 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client7.svg` |
| 8 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client8.svg` |
| 9 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client9.svg` |
| 10 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client10.svg` |
| 11 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client11.svg` |
| 12 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client12.svg` |


- **Contact**
- Título: `contato`
- Subtítulo: `Tem uma pergunta ou quer trabalhar junto?`
- Form:
- Action: `https://formsubmit.co/danilo@portfoliodanilo.com`
- Button label: `Enviar Mensagem`
- Links:
- Telefone: `tel:+5511983966838`
- Email primário: `mailto:dannovaisv@gmail.com`
- Email secundário: `mailto:danilo@portfoliodanilo.com`
- Instagram: `https://instagram.com/danilo_novais`
- Facebook: `https://facebook.com/danilonovaisvilela`
- LinkedIn: `https://linkedin.com/in/danilonovais`
- Portfolio: `https://portfoliodanilo.com`
- Twitter: `https://twitter.com/danilo_novais`
- **Footer**
- Copyright:
- Home: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
- Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos
reservados.`
**[SUGESTÃO]** Unificar para `© 2025 ...` em todo o site.
- Links:
- `home` → `#hero`
- `portfólio showcase` → `#portfolio-showcase`
- `Sobre` → `#clients` (atual) **[SUGESTÃO]** preferir `/sobre`
- `contato` → `#contact`
### 4. Princípios Globais de Animação
- Usar Framer Motion para:
- Reveals no scroll (`whileInView`, `useInView`).
- Microinterações (`whileHover`, `whileTap`).
- Animações de scroll (`useScroll`, `useTransform`).
- Animar apenas `transform` e `opacity`.
- Respeitar `prefers-reduced-motion: reduce`:
- Desativar rotação 3D contínua, parallax e morph thumb→vídeo.
- Manter estados estáticos + fades simples.
**implementação padrão**
para animações de scroll, com JS puro (`requestAnimationFrame`) apenas
como alternativa se necessário.
---

## ESPECIFICAÇÃO POR SEÇÃO (TEMPLATE COMPLETO)
---

# **SECTION NAME: Header (SiteHeader)**
### Desktop: Fluid Glass Navigation  
### Mobile & Tablet: Staggered Menu Navigation

---

## SECTION PURPOSE (what this section must achieve)
- Fornecer navegação global e identidade visual do site.
- Permanecer visível em todas as páginas.
- Reforçar a identidade **premium + experimental** do projeto.
- Atuar como camada atmosférica complementar à Hero Ghost.

---

## RESPONSABILIDADE CONCEITUAL

### Desktop
- O header se comporta como um **objeto óptico fluido**.
- Utiliza **refração real em WebGL** (Fluid Glass).
- Não disputa atenção com a Hero — apenas dialoga visualmente.

### Mobile & Tablet
- O header é **funcional e minimalista**.
- A navegação ocorre via **menu fullscreen staggered**.
- Performance e clareza são priorizadas sobre efeitos visuais.

---

## BREAKPOINT STRATEGY

| Device | Behaviour |
|------|----------|
| Desktop ≥ 1024px | Fluid Glass Header |
| Tablet ≤ 1023px | Staggered Menu |
| Mobile ≤ 640px | Staggered Menu |

---

## DESKTOP — FLUID GLASS HEADER

### VISUAL REFERENCE
https://reactbits.dev/components/fluid-glass

---

### VISUAL BEHAVIOR
- Elemento translúcido com refração real (MeshTransmissionMaterial)
- Distorção óptica sutil
- Chromatic aberration controlada
- Movimento leve seguindo o cursor
- Renderiza o conteúdo por trás (não possui fundo sólido)

---

### CONTENT (DESKTOP)
- Logo (Light)
- Navigation links:
  - Home → `/` ou `#hero`
  - Sobre → `/sobre`
  - Portfolio → `/portfolio`
  - Contato → `#contact`

---

### LAYOUT TYPE
- Header flutuante
- Centralizado horizontalmente
- Altura compacta
- Não ocupa 100% da largura (aspecto de “objeto”)

---

### FILE ARCHITECTURE (DESKTOP)

```
components/header/
 ├─ SiteHeader.tsx
 ├─ DesktopFluidHeader.tsx
 └─ webgl/
     └─ FluidGlass.tsx
```

---

### FLUID GLASS — DEFAULT CONFIGURATION

```tsx
<FluidGlass
  mode="lens"
  lensProps={{
    scale: 0.25,
    ior: 1.15,
    thickness: 5,
    chromaticAberration: 0.1,
    anisotropy: 0.01
  }}
/>
```

---

### INTERACTIONS (DESKTOP)
- Hover nos links:
  - Apenas alteração de opacidade
  - ❌ Sem underline
  - ❌ Sem animações chamativas
- Pointer move:
  - Vidro acompanha suavemente o cursor
- Scroll:
  - Header permanece fixo
  - ❌ Sem morph de tamanho
  - ❌ Sem animação por scroll

---

### PERFORMANCE (DESKTOP)
- Canvas WebGL isolado
- Sem ScrollControls
- DPR limitado
- Geometria simples (`lens.glb`)
- Fallback automático se WebGL falhar

---

### ACCESSIBILITY (DESKTOP)
- Navegação por teclado funcional
- Links com `aria-label`
- Fallback HTML:
  - Logo + links estáticos se WebGL não estiver disponível

---

## MOBILE & TABLET — STAGGERED MENU

### VISUAL REFERENCE
https://reactbits.dev/components/staggered-menu

---

### VISUAL BEHAVIOR
- Menu fullscreen
- Entrada lateral
- Animação staggered editorial
- Camadas de cor animadas (prelayers)
- Ícone Menu ↔ Close animado

---

### STAGGERED MENU — DEFAULT CONFIGURATION

```tsx
<StaggeredMenu
  position="right"
  items={menuItems}
  socialItems={socialItems}
  displaySocials={true}
  displayItemNumbering={true}
  menuButtonColor="#e9e9ef"
  openMenuButtonColor="#000"
  changeMenuColorOnOpen={true}
  colors={['#B19EEF', '#5227FF']}
  accentColor="#5227FF"
  isFixed
/>
```

---

## Z-INDEX STRATEGY

```
z-40 → Header / Menu
z-20 → Hero Content
z-0  → WebGL Hero Canvas
```

---

## NON-NEGOTIABLES (HEADER)
- ❌ Header não compete com a Hero
- ❌ Sem glassmorphism fake em CSS
- ❌ Sem animações decorativas gratuitas
- ✅ WebGL apenas no Desktop
- ✅ Mobile sem WebGL pesado
- ✅ Fallback funcional obrigatório

---






# **SECTION NAME: Hero**

### SECTION PURPOSE
- Criar impacto visual inicial com atmosfera etérea
- Comunicar posicionamento estratégico através de texto editorial forte
- Introduzir linguagem digital experimental com WebGL como camada sensorial
- Direcionar o usuário ao Manifesto com mínima distração

---
## VISÃO GERAL

Este documento descreve a implementação da Hero e Manifesto utilizando Next.js App Router + React + TypeScript + Tailwind CSS + React Three Fiber + Framer Motion, adaptando o conceito do CodePen de referência (https://codepen.io/danilonovaisv/pen/azZbdQo) mantendo a identidade premium e preparando uma base escalável para evolução.

---

## PRÉ-CARREGAMENTO (PRELOADER)
### Conceito
- Preloader minimalista com SVG animado do "ghost"
- Progresso visual discreto durante carregamento de assets
- Transição suave para o conteúdo principal

### Componentes
```tsx
// src/components/home/HeroPreloader.tsx
import { motion } from 'framer-motion';

export default function HeroPreloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
    >
      <div className="ghost-loader mb-8">
        <svg className="ghost-svg" height="80" viewBox="0 0 512 512" width="80" xmlns="http://www.w3.org/2000/svg">
          <path className="ghost-body" d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z" fill="white" />
          <circle className="ghost-eye left-eye" cx="208" cy="225" r="22" fill="black" />
          <circle className="ghost-eye right-eye" cx="297" cy="225" r="22" fill="black" />
        </svg>
      </div>
      <div className="loading-text font-mono text-xs uppercase tracking-widest text-[#e0e0e0] mb-4">
        Summoning spirits
      </div>
      <div className="loading-progress w-24 h-0.5 bg-[#06071f] rounded-full overflow-hidden">
        <motion.div 
          className="progress-bar h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
```

### Animações
- `ghostFloat`: Animação de flutuação suave (3s)
- `eyePulse`: Animação pulsante dos olhos (2s)
- `textPulse`: Efeito de respiração no texto de carregamento
- Progresso visual com gradient azul

---

## CONTEÚDO (FIXO — SEM ANIMAÇÃO)
### Cor do texto: `#d9dade`
```
[BRAND AWARENESS]
Design, não
é só estética.
[É intenção, é estratégia, é experiência.]
```

### Regras absolutas
✅ **Texto 100% estático** - Nenhuma animação de entrada  
✅ **Sem glassmorphism** - Nenhum efeito de vidro/blur CSS  
✅ **Sem reveal progressivo** - Todo o texto aparece imediatamente  
✅ **Sem scroll binding** - Texto nunca depende de posição de scroll  

### Componente
```tsx
// src/components/home/HeroCopy.tsx
import Link from 'next/link';

export default function HeroCopy() {
  return (
    <div className="z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="text-[#d9dade] text-sm uppercase tracking-wide mb-4">
        [BRAND AWARENESS]
      </div>
      <h1 className="text-[#d9dade] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
        Design, não<br />
        é só estética.
      </h1>
      <div className="text-[#d9dade] text-base md:text-lg mb-8">
        [É intenção, é estratégia, é experiência.]
      </div>
      <Link
        href="/sobre"
        className="text-[#d9dade] hover:text-white transition-colors duration-300 font-normal text-sm md:text-base tracking-wide"
        aria-label="Conheça mais sobre Danilo Novais"
      >
        get to know me better →
      </Link>
    </div>
  );
}
```

---

## BACKGROUND
### Cor base: `#06071f`
### Gradiente opcional:
```css
radial-gradient(circle at center, #0b0d3a 0%, #06071f 60%)
```

---

## WEBGL ATMOSFÉRICO (GHOST)
### Conceito
O WebGL funciona como uma **camada sensorial** no fundo, não como objeto principal:
- **Elemento etéreo** ("ghost") abstrato com alta emissividade
- **Glow intenso** com Bloom HDR na cor `#0057FF`
- **Ruído analógico** com scanlines sutis e vinheta
- **Follow sutil** do mouse apenas no desktop
- **Pulso temporal** orgânico (sem movimento mecânico)

### Referência Visual: https://codepen.io/danilonovaisv/pen/azZbdQo  
### Elementos Principais:
1. **Ghost Principal**: Mesh esférico com base deformada organicamente
2. **Atmosfera de Revelação**: Shader que revela o fundo conforme o ghost se move
3. **Sistema de Partículas**: Partículas que emergem do ghost durante movimento
4. **Olhos Interativos**: Brilho que responde à velocidade de movimento
5. **Fireflies**: Elementos luminosos flutuantes no fundo
6. **Pós-processamento**: Bloom + Analog Decay (grain, scanlines, jitter)

---

## ARQUITETURA DE ARQUIVOS (HERO)
```
components/home/
├─ HomeHero.tsx            ← Orchestrator (z-index layers)
├─ HeroPreloader.tsx       ← Componente de carregamento
├─ HeroCopy.tsx            ← Texto estático (sem animação)
├─ ManifestoThumb.tsx      ← Thumb do vídeo manifesto (expande ao scroll)
├─ GhostStage.tsx          ← Client boundary wrapper
└─ webgl/
   ├─ GhostCanvas.tsx      ← Cena principal R3F + postprocessing
   ├─ Ghost.tsx            ← Mesh etéreo com follow mouse
   ├─ Eyes.tsx             ← Sistema de olhos reativos
   ├─ Particles.tsx        ← Sistema de partículas
   ├─ Fireflies.tsx        ← Elementos luminosos de fundo
   ├─ AtmosphereVeil.tsx   ← Shader de revelação do fundo
   └─ postprocessing/
       ├─ AnalogDecayPass.ts  ← Efeitos analógicos (grain, scanlines)
       └─ BloomPass.ts        ← Bloom HDR customizado
```

---

## Z-INDEX (CRÍTICO)
| Z-Index | Elemento                  | Descrição                                  |
|---------|---------------------------|--------------------------------------------|
| **z-0** | **WebGL Canvas**          | Cena 3D completa (Ghost + Atmosfera + Partículas) |
| **z-10**| **Overlay Gradiente**     | Camada de vinheta opcional para integração visual |
| **z-20**| **Conteúdo**              | Texto H1 + Thumb do vídeo (interativo)     |
| **z-50**| **Preloader**             | Tela de carregamento (aparece apenas no início) |

---

## DETALHAMENTO TÉCNICO DOS COMPONENTES WEBGL

### 1. `GhostCanvas.tsx` (Setup Principal)
```tsx
// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import Ghost from './Ghost';
import AtmosphereVeil from './AtmosphereVeil';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AnalogDecayPass from './postprocessing/AnalogDecayPass';

function MouseFollower({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const ghostRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reducedMotion, size]);

  useFrame(() => {
    if (reducedMotion || !ghostRef.current) return;
    ghostRef.current.position.x += (mouseRef.current.x * 8 - ghostRef.current.position.x) * 0.05;
    ghostRef.current.position.y += (mouseRef.current.y * 5 - ghostRef.current.position.y) * 0.05;
  });

  return <group ref={ghostRef}>{children}</group>;
}

export default function GhostCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
      className="absolute inset-0 z-0"
    >
      <color attach="background" args={['#06071f']} />
      
      <ambientLight intensity={0.08} color="#0a0a2e" />
      
      <AtmosphereVeil />
      
      <MouseFollower>
        <Ghost />
        <Particles />
      </MouseFollower>
      
      <Fireflies />
      
      <EffectComposer>
        <Bloom
          intensity={2.8}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          radius={0.6}
        />
        <AnalogDecayPass />
        <Vignette eskil={false} offset={0.1} darkness={0.4} />
      </EffectComposer>
    </Canvas>
  );
}
```

### 2. `Ghost.tsx` (Mesh Principal)
```tsx
// src/components/home/webgl/Ghost.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Eyes from './Eyes';

export default function Ghost() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ghostColor = new THREE.Color('#0057FF');
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Pulsing emissive
    meshRef.current.material.emissiveIntensity = 3.5 + Math.sin(t * 1.2) * 0.6;
    
    // Floating animation
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.15;
    
    // Gentle wobble
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#06071f"
          emissive={ghostColor}
          emissiveIntensity={3.5}
          transparent
          opacity={0.92}
          roughness={0}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Eyes />
    </group>
  );
}
```

### 3. `Eyes.tsx` (Sistema de Olhos Reativos)
```tsx
// src/components/home/webgl/Eyes.tsx
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Eyes() {
  const reducedMotion = usePrefersReducedMotion();
  const { camera } = useThree();
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouseSpeedRef = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const currentMovement = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      
      const mousePos = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
      
      mouseSpeedRef.current.x = Math.abs(mousePos.x - lastMousePos.current.x);
      mouseSpeedRef.current.y = Math.abs(mousePos.y - lastMousePos.current.y);
      lastMousePos.current = mousePos;
      
      currentMovement.current = 
        currentMovement.current * 0.95 + 
        (mouseSpeedRef.current.x + mouseSpeedRef.current.y) * 0.5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (reducedMotion || !leftEyeRef.current || !rightEyeRef.current) return;
    
    // Eye glow based on movement speed
    const glowIntensity = Math.min(currentMovement.current * 5, 1);
    leftEyeRef.current.material.opacity = glowIntensity;
    rightEyeRef.current.material.opacity = glowIntensity;
    
    // Make eyes look at camera
    leftEyeRef.current.lookAt(camera.position);
    rightEyeRef.current.lookAt(camera.position);
  });

  return (
    <group>
      {/* Eye sockets */}
      <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Glowing eyes */}
      <mesh ref={leftEyeRef} position={[-0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial 
          color="#0057FF" 
          transparent 
          opacity={0}
          emissive="#5227FF"
          emissiveIntensity={4.5}
        />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial 
          color="#0057FF" 
          transparent 
          opacity={0}
          emissive="#5227FF"
          emissiveIntensity={4.5}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh position={[-0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial 
          color="#5227FF" 
          transparent 
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial 
          color="#5227FF" 
          transparent 
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
```

### 4. `AnalogDecayPass.ts` (Pós-processamento)
```tsx
// src/components/home/webgl/postprocessing/AnalogDecayPass.ts
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const AnalogDecayShader = shaderMaterial(
  {
    tDiffuse: new THREE.Texture(),
    uTime: 0,
    uIntensity: 0.7,
    uGrain: 0.4,
    uScanlines: 1.0,
    uJitter: 0.5,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uIntensity;
    uniform float uGrain;
    uniform float uScanlines;
    uniform float uJitter;
    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      
      // Jitter sutil
      if (uJitter > 0.01) {
        uv += (rand(vec2(uTime)) - 0.5) * uJitter * 0.002;
      }

      vec4 color = texture2D(tDiffuse, uv);

      // Grain
      if (uGrain > 0.01) {
        float grain = rand(uv + uTime) * 2.0 - 1.0;
        color.rgb += grain * uGrain * 0.08 * uIntensity;
      }

      // Scanlines
      if (uScanlines > 0.01) {
        float scan = sin(uv.y * 1200.0 + uTime * 2.0) * 0.5 + 0.5;
        color.rgb *= mix(1.0, 0.97, scan * uScanlines * uIntensity);
      }

      gl_FragColor = color;
    }
  `
);

extend({ AnalogDecayShader });

export default function AnalogDecayPass() {
  return (
    <shaderPass
      args={[AnalogDecayShader]}
      tDiffuse={null}
      uTime={0}
      uIntensity={0.7}
      uGrain={0.4}
      uScanlines={1.0}
      uJitter={0.5}
    />
  );
}
```

---

## MANIFESTO — VÍDEO (Animação Ajustada: Reveal Suave)

### Conceito de Animação
A seção Manifesto deve aparecer com um **efeito de revelação suave** quando entra na viewport, semelhante ao comportamento observado no site de referência para as seções subsequentes à hero. O vídeo é o elemento central e deve ganhar destaque com uma animação de fade-in e scale leve. A transição entre Hero e Manifesto é uma **mudança de seção clara**, não uma expansão contínua do mesmo elemento.

### Regras Atualizadas
- **Mesmo arquivo** da Hero: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`
- **Autoplay** + **Loop**
- **Muted por padrão** - Áudio apenas quando em foco (IntersectionObserver)
- **Sem overlays** - Nenhum elemento visual sobreposto ao vídeo
- **Sem fullscreen forçado** - Respeita a proporção original
- **Animação de entrada**: Fade-in e scale leve usando Framer Motion (`whileInView`, `variants`).
- **Nenhuma expansão via scroll** do vídeo thumbnail da Hero.

### Componente da Seção Manifesto
```tsx
// src/components/home/ManifestoSection.tsx
'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

const manifestoVideoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] // Easing premium
    }
  }
};

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" }); // Aciona quando 100px entram na view

  return (
    <section 
      id="manifesto"
      ref={sectionRef}
      className="w-full py-20 bg-[#06071f] flex items-center justify-center" // Espaçamento e cor de fundo
    >
      <div className="max-w-4xl w-full px-4"> {/* Container centralizado */}
        <motion.div
          variants={manifestoVideoVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} // Animação acionada pelo Intersection Observer
          className="w-full aspect-video rounded-xl overflow-hidden" // Mantém proporção e cantos arredondados
        >
          <video
            src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
            muted
            loop
            playsInline
            autoPlay // Opcional, dependendo do comportamento desejado ao entrar na view
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
```

---

## INTERAÇÃO HERO → MANIFESTO (Atualizado)

### Comportamento
- **Clique na thumb**: Scroll suave até `#manifesto`
- **Nenhuma transição visual agressiva** entre estados
- **Thumb mantém animação própria** (hover/scale) mas **não expande visualmente**.
- **Scroll suave** com easing natural.
- **A seção Manifesto tem sua própria animação de entrada** quando entra na viewport.

### Implementação (Exemplo em Home Page)
```tsx
// src/app/page.tsx (ou src/app/home/page.tsx)
import HomeHero from '@/components/home/HomeHero';
import ManifestoSection from '@/components/home/ManifestoSection';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ManifestoSection />
      {/* Outras seções... */}
    </>
  );
}
```

---

## ACESSIBILIDADE E PERFORMANCE
### Acessibilidade
✅ **Contraste AA garantido** (#d9dade sobre #06071f = ~7.2:1)  
✅ **`prefers-reduced-motion`**:
   - Desativa follow do mouse
   - Desativa bloom intenso
   - **Desativa animação de entrada do vídeo manifesto**
   - Mantém layout estático
✅ **`aria-label`** em todos os elementos interativos
✅ **Vídeo sempre inicia mudo**

### Performance
✅ **Canvas isolado** (client-only com dynamic import)
✅ **DPR máximo: 2** para dispositivos móveis
✅ **Fallback CSS** se WebGL falhar
✅ **Carregamento progressivo** com preloader
✅ **Limite de partículas** (máximo 250, renderização parcial)
✅ **Instancing** para fireflies
✅ **Animações de entrada via `useInView`** para otimizar performance de scroll

### Implementação de fallback:
```tsx
// src/components/home/GhostStage.tsx
'use client';

import dynamic from 'next/dynamic';

const GhostCanvas = dynamic(
  () => import('./webgl/GhostCanvas'),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#0b0d3a_0%,_#06071f_60%)]" />
    )
  }
);

export default function GhostStage() {
  return <GhostCanvas />;
}
```

---

## NÃO NEGOCIÁVEL
❌ **Sem glassmorphism** - Nenhum efeito de vidro/blur CSS  
❌ **Sem texto animado** - Texto 100% estático desde o primeiro frame  
❌ **Sem 3D tradicional** - Nenhum modelo GLB ou objeto sólido  
❌ **Sem overlays sobre vídeo** - Vídeo puro sem elementos visuais sobrepostos  
❌ **Sem expansão via scroll do vídeo** - O vídeo da Hero não se transforma/expande para a seção Manifesto  
✅ **WebGL como atmosfera** - Elemento de fundo que não compete com o conteúdo  
✅ **Texto como âncora editorial** - Hierarquia clara: conteúdo > atmosfera  
✅ **Animação de entrada do vídeo manifesto** - Usar `whileInView` e `useInView` do Framer Motion

---

## RESULTADO ESPERADO
- **Hero silenciosa e editorial** com texto imediatamente legível
- **Animação como pano de fundo vivo** que responde organicamente ao usuário
- **Narrativa clara** sem distrações visuais desnecessárias
- **Seção Manifesto com entrada suave e premium**, alinhada com a estética do site de referência
- **Base escalável** para futuras interações mantendo a identidade "Ghost Blue"

---

## NOTAS DE IMPLEMENTAÇÃO
1. **TT Norms Pro** deve ser configurada no `tailwind.config.ts` e carregada globalmente via `next/font`
2. **Hook de reduced motion**:
```tsx
// src/hooks/usePrefersReducedMotion.ts
import { useState, useEffect } from 'react';

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
```
3. **Otimização de performance**:
   - Limitar número de draw calls
   - Usar `drei/instances` para fireflies
   - Desativar antialiasing no canvas (`antialias: false`)
   - Manter geometrias simples
   - Usar `useInView` para acionar animações de scroll de forma performática




# **SECTION NAME: Portfolio Showcase**

### SECTION PURPOSE (what this section must achieve)
Apresentar claramente as áreas de atuação de Danilo.
Organizar mentalmente o portfólio em categorias.
Criar navegação editorial premium com foco em clareza, ritmo e interatividade suave.

### PRIMARY MESSAGE / HEADLINE
`portfólio showcase`

### SECONDARY MESSAGE / SUPPORT TEXT
`[what we love working on]`

### KEY CONTENT ELEMENTS
- Headline central da seção.
- Microtexto lateral `[what we love working on]`.
- 3 stripes de categorias interativas.
- CTA aspiracional inferior.

### CALL TO ACTION (if any)
- `Ver todos os projetos →` → `/portfolio?category={id}`
- `let’s build something great →` → `/#contact`

### LINKS GLOBAIS
- Integração com `/portfolio` (com filtro por categoria).
- Integração com `/#contact`.

---

## LAYOUT & DESIGN (Adaptado da Referência Lo&Behold)

### ALIGNMENT
**Desktop (≥1024px)**
- Headline centralizada.
- Microtexto alinhado à esquerda do primeiro stripe.
- Stripes com alinhamento alternado:
    - Direita
    - Centro
    - Esquerda
- **Referência Lo&Behold:** As linhas são delimitadas por finas bordas horizontais. O conteúdo dentro de cada stripe é alinhado de forma que o título e o ícone de seta fiquem visualmente centrados no espaço disponível, criando um ritmo fluido.

**Mobile (≤768px)**
- Todos os elementos empilhados.
- Alinhamento à esquerda.
- Stripes ocupam 100% da largura.

### SPACING
**Desktop:**
- `py-24`
- `gap-14` entre stripes
- Espaço claro antes do CTA final.

**Mobile:**
- `py-16`
- `gap-10`

### BACKGROUND
- Fundo sólido `#F4F5F7`.

### SECTION COLORS
- Azul da marca `#0057FF`.
- Texto principal `#111111`.
- Texto secundário em tons neutros.

### TYPOGRAPHY
- **Headline:**
    - Mobile: `text-4xl`
    - Desktop: `text-6xl`
- **Stripes:**
    - Mobile: `text-2xl`
    - Desktop: `text-5xl / text-6xl`
- **Microtexto:**
    - Uppercase
    - Tracking amplo apenas em desktop

---

## INTERAÇÕES & ANIMAÇÕES (Equivalência Comportamental à Referência Lo&Behold)

### IMAGERY & MEDIA
- Miniaturas animadas apenas em hover (desktop).
- Imagem grande apenas no estado expandido.
- Mobile não exibe thumbnails em hover.
- **Referência Lo&Behold:** As miniaturas aparecem com uma animação de slide-in suave do lado esquerdo ao passar o mouse sobre a linha. A imagem é um preview do projeto associado à categoria.

### COMPONENTS USED
- `PortfolioShowcaseSection`
- `CategoryStripe`
- `ExpandedCategoryPanel`
- CTA Button

### STATE VARIANTS
- **Hover (desktop):**
    - Slide-in da thumbnail da esquerda para a direita.
    - Mudança sutil de cor ou peso do título (ex: escurecimento ou leve aumento de peso).
    - Ícone de seta rotaciona levemente (aproximadamente 45 graus) para indicar interatividade.
- **Active:**
    - Stripe expandido, revelando mais detalhes ou uma galeria de projetos.
- **Focus:**
    - Outline visível (keyboard).

### INTERACTIONS
- **Clique / Enter / Space no stripe:**
    - Expande a categoria para mostrar mais detalhes ou redireciona para a página de portfólio filtrada.
- **Clique em CTA:**
    - Navegação direta.
- **Hover:**
    - Micro-interações sutis (desktop apenas). A animação deve ser fluida, sem jank, e respeitar o tempo de transição da referência (aproximadamente 0.3s).

### SCROLL BEHAVIOUR
- Reveal on scroll com fade + translateY.
- Sem sticky.

### ANIMATIONS
- **Entrada da seção:**
    - `opacity: 0 → 1`
    - `y: 24 → 0`
- **Expansão:**
    - Animação de layout (`layout` animation).
    - Easing: `cubic-bezier(0.22,1,0.36,1)`
- **Hover:**
    - Apenas `transform` e `opacity`.
    - `prefers-reduced-motion`: Desativa animações não essenciais.

### MICRO-INTERACTIONS
- Hover no ponto azul (scale ligeiro).
- Ícone de seta rotaciona ao expandir.

---

## TEXT LIMITS & CONTENT PRIORITY
- Labels curtos e escaneáveis.
- **Content Priority:**
    1. Headline
    2. Stripes
    3. CTA final

### ALTERNATIVE CONTENT
- Imagem fallback neutra.
- Conteúdo textual sempre visível.

### LINKS / DESTINATIONS
- `brand-campaigns` → Brand & Campaigns
- `videos-motions` → Videos & Motions
- `websites-webcampaigns-tech` → Web Campaigns, Websites & Tech

### DATA HOOKS / TRACKING
- `portfolio_showcase_category_click`
- `portfolio_showcase_cta_click`

### DEPENDENCIES
- Página `/portfolio` com suporte a filtros.

---

## ACCESSIBILITY NOTES
- `role="button"` nos stripes.
- `aria-expanded` no estado ativo.
- Navegação completa por teclado.
- Foco visível.
- Respeito a `prefers-reduced-motion`.

---

## SPECIAL STATES
- Não aplicável (conteúdo estático).

---

## ULTRAWIDE STRATEGY (1920px+)
- **Objetivo:** Evitar aparência “apertada” ou excessivamente centralizada em telas grandes, mantendo elegância editorial.
- **Container Strategy:**
    - Substituir container rígido por container fluido controlado:
        - `max-width: 1680px`
        - `padding-inline: clamp(24px, 5vw, 96px)`
    - Centralizar conteúdo com `mx-auto`.
- **Layout:**
    - Headline mantém centralização visual.
    - Stripes ganham mais “respiro” lateral.
    - Microtexto permanece alinhado ao primeiro stripe, não ao viewport.
- **Animações:**
    - Mesmos timings do desktop.
    - Nenhuma animação baseada em largura do viewport.

---

## CHECKLIST DE QA VISUAL — Portfolio Showcase

✅ **Desktop (1280 / 1440 / 1680)**
- [ ] Headline centralizada visualmente.
- [ ] Microtexto visível apenas no primeiro stripe.
- [ ] Alinhamento alternado correto (direita / centro / esquerda).
- [ ] Hover revela thumbnail suavemente (slide-in da esquerda).
- [ ] Nenhum layout shift ao hover.
- [ ] Expansão fluida, sem jank.
- [ ] CTA final visível e equilibrado.

✅ **Ultrawide (1920+)**
- [ ] Conteúdo não parece “estreito”.
- [ ] Padding lateral confortável.
- [ ] Stripes não colam nas bordas.
- [ ] Ritmo visual consistente com desktop.
- [ ] Nada parece “perdido” no centro.

✅ **Tablet (768 / 820 / 1024)**
- [ ] Stripes ocupam largura correta.
- [ ] Textos legíveis sem quebra estranha.
- [ ] Expansão não causa overflow.
- [ ] CTA acessível sem scroll excessivo.

✅ **Mobile (320 / 375 / 414)**
- [ ] Sem overflow horizontal.
- [ ] Todos os textos legíveis.
- [ ] Stripes clicáveis com boa área de toque.
- [ ] Thumbnails não aparecem em hover.
- [ ] Expansão vertical suave.
- [ ] CTA final claramente visível.

✅ **Acessibilidade**
- [ ] Navegação completa por teclado.
- [ ] Foco visível em stripes e CTAs.
- [ ] `aria-expanded` correto.
- [ ] Movimento reduzido respeitado.

✅ **Performance**
- [ ] Nenhuma animação de `width` em mobile.
- [ ] Apenas `transform` e `opacity` animados.
- [ ] Sem layout shift perceptível.
- [ ] Imagens carregam corretamente.

✅ **Fidelidade Premium**
- [ ] Ritmo editorial consistente com a referência Lo&Behold.
- [ ] Espaçamento equilibrado.
- [ ] Tipografia hierárquica.
- [ ] Comportamento de hover e expansão alinhado à referência.

---

## STATUS FINAL
Este documento representa a versão final validada da seção Portfolio Showcase para a Home Page, adaptada com equivalência de comportamento, layout e ritmo da referência https://loandbehold.studio.

---

# **SECTION NAME: Featured Projects**
**SECTION PURPOSE:**
- Exibir projetos em destaque
- Direcionar o usuário para mais detalhes
**PRIMARY MESSAGE / HEADLINE:**
- "Projetos em Destaque"
**SECONDARY MESSAGE / SUPPORT TEXT:**
- N/A
**KEY CONTENT ELEMENTS:**
- Grid de cards com imagens dos projetos
- Título, cliente, ano e categoria para cada projeto
- CTA "view projects"
**CALL TO ACTION:**
- Texto: "view projects"
- Comportamento: Ao clicar, redireciona para a página Portfólio Showcase
(`/portfolio`)
**LAYOUT TYPE:**
- Grid responsivo com 1, 2 ou 3 colunas
**ALIGNMENT:**
- Horizontal: Cards centralizados
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-12`
- Margem entre os cards: `gap-6`
**BACKGROUND:**
- Cor sólida cinza claro (`bg-[#F4F5F7]`)
**SECTION COLORS:**
- Título: `text-[#0057FF]`
- Texto dos cards: `text-[#111111]`
- CTA: `bg-[#0057FF]`, `text-white`
**TYPOGRAPHY:**
- Fonte: TT Norms Pro
- Peso: Bold para o título, Regular para o conteúdo dos cards
- Tamanho: Título `text-2xl`, Conteúdo dos cards `text-lg`
**IMAGERY:**
- Imagens dos projetos
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<div>` (card), `<img>`, `<h3>`, `<p>`,
`<a>`
**STATE VARIANTS:**
- Hover no card: Leve elevação (`translateY(-5px)`) e sombra
- Hover no CTA: Leve elevação (`translateY(-1px)`)
**INTERACTIONS:**
- Clique no card: Redireciona para a página do projeto
- Clique no CTA: Redireciona para `/portfolio`
**SCROLL BEHAVIOUR:**
- Reveal on scroll: Animação de entrada staggered ao entrar na viewport
**ANIMATIONS:**
- Entrada da seção:
- Container: initial={{ opacity: 0, y: 40 }} → whileInView={{ opacity: 1,
y: 0 }}
- Cards: staggerChildren: 0.08
- Cada card:
- initial={{ opacity: 0, y: 24, scale: 0.96 }}
- whileInView={{ opacity: 1, y: 0, scale: 1 }}
- Hover nos cards:
- Imagem: whileHover={{ scale: 1.03, y: -4 }}
- Overlay gradiente suave escuro + título em branco com fadeUp
- Shadow: shadow-xl + shadow-blue-500/15
- Card "Like what you see? view projects":
- Botão com o mesmo hover do CTA da hero
- Ícone de seta com animação sutil de x (0 → 4px → 0) em loop lento
**MICRO-INTERACTIONS:**
- Feedback visual ao hover no card e no CTA
**TEXT LIMITS:**
- Título: Máximo 30 caracteres
- Título dos projetos: Máximo 50 caracteres
- Cliente: Máximo 30 caracteres
- Categoria: Máximo 30 caracteres
- CTA: Máximo 30 caracteres
**CONTENT PRIORITY:**
- Alta: Título e cards
- Média: CTA
**ALTERNATIVE CONTENT:**
- Se nenhuma imagem for exibida, mostrar um placeholder com o texto "Imagem
do projeto"
**LINKS / DESTINATIONS:**
- Cards: Link para a página do projeto
- CTA: `/portfolio`
### Projetos
- **Slug:** `magic-radio-branding`
**Título:** Magic — devolvendo a magia ao rádio
**Categoria:** branding & campanha
**Cliente:** Magic
**Ano:** 2023
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp
- **Slug:** `branding-project-01`
**Título:** Uma marca ousada e consistente
**Categoria:** branding
**Cliente:** Cliente confidencial
**Ano:** 2022
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp
- **Slug:** `key-visual-campaign`
**Título:** Key visual para campanha sazonal
**Categoria:** campanha
**Cliente:** Cliente confidencial
**Ano:** 2021
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Key-Visual.webp
- **Slug:** `webdesigner-motion`
**Título:** Experiência web em movimento
**Categoria:** web & motion
**Cliente:** Cliente confidencial
**Ano:** 2023
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif
**DATA HOOKS / TRACKING:**
- Eventos de clique nos cards e no CTA para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.projectCards`
**ACCESSIBILITY NOTES:**
- As imagens dos projetos devem ter `alt` descritivo
- Os cards devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de
entrada
**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
**NON-NEGOTIABLES:**
- Grid de cards com imagens dos projetos
- Informações de cada projeto (título, cliente, ano, categoria)
- CTA que redireciona para a página Portfólio Showcase
---


# **SECTION NAME: Clients/Brands**
**SECTION PURPOSE:**
- Mostrar marcas com as quais o designer já trabalhou
- Construir confiança e credibilidade
**PRIMARY MESSAGE / HEADLINE:**
- "marcas com as quais já trabalhei"
**SECONDARY MESSAGE / SUPPORT TEXT:**
- N/A
**KEY CONTENT ELEMENTS:**
- Logos das marcas
- Faixa azul de fundo
**CALL TO ACTION:**
- N/A
**LAYOUT TYPE:**
- Grid de logos
**ALIGNMENT:**
- Horizontal: Logos centralizadas
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-12`
- Margem entre os logos: `gap-4`
**BACKGROUND:**
- Cor sólida azul (`bg-[#0057FF]`)
**SECTION COLORS:**
- Título: `text-white`
- Logos: Branco (`filter brightness-0 invert`)
**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold
- Tamanho: `text-xl md:text-2xl`
**IMAGERY:**
- Logos das marcas
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<div>` (logo), `<img>`
**STATE VARIANTS:**
- Hover no logo: Leve escala (`scale(1.02)`)
**INTERACTIONS:**
- Hover no logo: Leve escala (`scale(1.02)`)
**SCROLL BEHAVIOUR:**
- Reveal on scroll: Animação de entrada staggered ao entrar na viewport
**ANIMATIONS:**
- Entrada:
- Título: initial={{ opacity: 0, y: 16 }} → whileInView={{ opacity: 1, y:
0 }}
- Logos: staggerChildren: 0.03
- Cada logo: initial={{ opacity: 0, y: 12, scale: 0.9 }} → animate={{
opacity: 1, y: 0, scale: 1 }}
- Hover:
- whileHover={{ scale: 1.04 }} + leve brightness(1.1)
**MICRO-INTERACTIONS:**
- Feedback visual ao hover no logo
**TEXT LIMITS:**
- Título: Máximo 50 caracteres
**CONTENT PRIORITY:**
- Alta: Título e logos
**ALTERNATIVE CONTENT:**
- Se nenhum logo for exibido, mostrar uma mensagem de erro
**LINKS / Globais:**
1.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client1.svg`
2.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client2.svg`
3.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client3.svg`
4.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client4.svg`
5.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client5.svg`
6.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client6.svg`
7.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client7.svg`
8.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client8.svg`
9.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client9.svg`
10.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client10.svg`
11.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client11.svg`
12.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client12.svg`
**DATA HOOKS / TRACKING:**
- Eventos de hover nos logos para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.clients`
**ACCESSIBILITY NOTES:**
- Os logos devem ter `alt` descritivo
- Os logos devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de
entrada
**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
**NON-NEGOTIABLES:**
- Faixa azul de fundo
- Logos das marcas
- Título "marcas com as quais já trabalhei"
---


# **SECTION NAME: Contact**
**SECTION PURPOSE:**
- Fornecer informações de contato
- Permitir que os usuários enviem mensagens
**PRIMARY MESSAGE / HEADLINE:**
- "contato"
**SECONDARY MESSAGE / SUPPORT TEXT:**
- "Tem uma pergunta ou quer trabalhar junto?"
**KEY CONTENT ELEMENTS:**
- Informações de contato (telefone, email, site)
- Formulário de contato
- Redes sociais
**CALL TO ACTION:**
- Texto: "Enviar Mensagem"
- Comportamento: Ao enviar, envia o formulário para o endpoint definido
**LAYOUT TYPE:**
- Duas colunas em desktop, uma em mobile
**ALIGNMENT:**
- Horizontal: Informações à esquerda, formulário à direita
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-12`
- Margem entre as colunas: `space-x-8`
**BACKGROUND:**
- Cor sólida branca (`bg-white`)
**SECTION COLORS:**
- Título: `text-[#0057FF]`
- Texto: `text-[#111111]`
- Botão: `bg-[#0057FF]`, `text-white`
**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold para o título, Regular para o conteúdo
- Tamanho: Título `text-2xl`, Conteúdo `text-lg`
**IMAGERY:**
- Ícones de redes sociais
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<p>`, `<form>`, `<input>`, `<textarea>`,
`<button>`, `<a>`
**STATE VARIANTS:**
- Focus nos inputs: Borda e sombra
- Hover no botão: Leve elevação (`translateY(-1px)`)
**INTERACTIONS:**
- Envio do formulário: Envia os dados para o endpoint definido
- Clique nas redes sociais: Abre o link em nova aba
**SCROLL BEHAVIOUR:**
- N/A
**ANIMATIONS:**
- Entrada:
- Seção: whileInView={{ opacity: 1, y: 0 }} partindo de initial={{
opacity: 0, y: 24 }}
- Campos do formulário com staggerChildren
- Interações:
- Inputs com focus-visible: ring-2 ring-blue-500 ring-offset-2
ring-offset-[#f5f5f7]
- Botão "enviar mensagem":
- whileHover={{ scale: 1.02, y: -1 }}
- whileTap={{ scale: 0.98 }}
**MICRO-INTERACTIONS:**
- Feedback visual ao focus nos inputs e ao hover no botão
**TEXT LIMITS:**
- Título: Máximo 30 caracteres
- Subtítulo: Máximo 100 caracteres
- Inputs: Máximo 100 caracteres
- Botão: Máximo 30 caracteres
**CONTENT PRIORITY:**
- Alta: Título e formulário
- Média: Informações de contato e redes sociais
**ALTERNATIVE CONTENT:**
- Se o formulário não carregar, mostrar uma mensagem de erro
**LINKS / DESTINATIONS:**
- Formulário: Endpoint definido em `HOMEPAGE_CONTENT.contact.form.action`
- Action: `https://formsubmit.co/danilo@portfoliodanilo.com`
- **Redes sociais: Links externos:**
- Telefone: `tel:+5511983966838`
- Email primário: `mailto:dannovaisv@gmail.com`
- Email secundário: `mailto:danilo@portfoliodanilo.com`
- Instagram: `https://instagram.com/danilo_novais`
- Facebook: `https://facebook.com/danilonovaisvilela`
- LinkedIn: `https://linkedin.com/in/danilonovais`
- Portfolio: `https://portfoliodanilo.com`
- Twitter: `https://twitter.com/danilo_novais`
**DATA HOOKS / TRACKING:**
- Eventos de envio do formulário para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.contact`
**ACCESSIBILITY NOTES:**
- Todos os inputs devem ter `label` associado
- O formulário deve ser acessível via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações
**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
- Sucesso: Mostrar mensagem de sucesso
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`
**NON-NEGOTIABLES:**
- Formulário de contato
- Informações de contato
- Redes sociais
---


## **SECTION NAME: Footer**
**SECTION PURPOSE:**
- Fornecer informações legais e de contato
- Permitir que os usuários voltem ao topo da página
**PRIMARY MESSAGE / HEADLINE:**
- N/A
**SECONDARY MESSAGE / SUPPORT TEXT:**
- "© 2025 Danilo Novais Vilela — todos os direitos reservados"
**KEY CONTENT ELEMENTS:**
- Copyright
- Links de navegação (Home, Portfolio Showcase, Brands, Contact)
- Redes sociais
**CALL TO ACTION:**
- N/A
**LAYOUT TYPE:**
- Barra fixa no rodapé da página
**ALIGNMENT:**
- Horizontal: Copyright à esquerda, links e redes sociais à direita
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-4`
- Margem entre os elementos: `space-x-4`
**BACKGROUND:**
- Cor sólida azul (`bg-[#0057FF]`)
**SECTION COLORS:**
- Texto: `text-white`
- Links: `text-white`, `hover:text-[#0057FF]`
**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Regular
- Tamanho: `text-sm`
**IMAGERY:**
- Ícones de redes sociais
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<footer>`, `<div>`, `<p>`, `<ul>`, `<li>`, `<a>`
**STATE VARIANTS:**
- Hover nos links: Muda a cor do texto para azul (`text-[#0057FF]`)
**INTERACTIONS:**
- Clique nos links: Redireciona para a página ou faz scroll até a seção
- Clique nas redes sociais: Abre o link em nova aba
**SCROLL BEHAVIOUR:**
- Fixo no rodapé da página (`fixed bottom-0 left-0 right-0`)
**ANIMATIONS:**
- Apenas um fadeIn simples:
- initial={{ opacity: 0 }}
- whileInView={{ opacity: 1 }}
- Links com sublinhado animado igual ao header; ícones sociais com hover
scale(1.05) + leve mudança de opacidade
**MICRO-INTERACTIONS:**
- Feedback visual ao hover nos links
**TEXT LIMITS:**
- Copyright: Máximo 100 caracteres
- Links: Máximo 30 caracteres
**CONTENT PRIORITY:**
- Alta: Copyright e links de navegação
- Média: Redes sociais
**ALTERNATIVE CONTENT:**
- Se nenhuma rede social for exibida, mostrar uma mensagem de erro
**LINKS / DESTINATIONS:**
- Copyright:
- Home: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
- Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos
reservados.`
- Links:
- `home` → `#hero`
- `portfólio showcase` → `#portfolio-showcase`
- `sobre` → `#clients`
- `contato` → `#contact`
**DATA HOOKS / TRACKING:**
- Eventos de clique nos links e redes sociais para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.footer`
**ACCESSIBILITY NOTES:**
- Todos os links devem ter `aria-label` descritivo
- O footer deve ser navegável via teclado (tab)
**SPECIAL STATES:**
- N/A
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
**NON-NEGOTIABLES:**
- Footer fixo
- Copyright
- Links de navegação
- Redes sociais
---


# **ANEXO TÉCNICO — WEBGL ATMOSFÉRICO (GHOST)**

## Objetivo
Documentar o pipeline técnico da Hero Ghost WebGL, substituindo completamente a abordagem anterior baseada em vidro líquido, GLB e MeshTransmissionMaterial.

---

## Paradigma Atual
- Sem modelos GLB
- Sem MeshTransmissionMaterial
- Sem ScrollControls
- WebGL como camada sensorial
- Pós-processamento como linguagem visual

---

## Canvas
```tsx
<Canvas
  dpr={[1, 2]}
  gl={{ antialias: false }}
  camera={{ position: [0, 0, 5], fov: 45 }}
>
```

---

## Loop de Animação
```ts
useFrame((state, delta) => {
  ghost.position.lerp(target, 0.08)
  material.emissiveIntensity =
    1 + Math.sin(state.clock.elapsedTime) * 0.2
})
```

---

## Postprocessing
- Bloom para aura
- Analog Decay para textura temporal
- Intensidade moderada (premium)

---

## Regras Não-Negociáveis
- WebGL nunca controla layout
- Texto nunca depende de shader
- Se o Canvas falhar, a Hero continua funcional

---

## Regra de Ouro
> WebGL apoia a narrativa. Nunca a substitui.

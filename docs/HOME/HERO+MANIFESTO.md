

#  **HERO + MANIFESTO — Portfólio Institucional de Danilo Novais**

## SECTION NAME
**Hero (Ghost Atmosphere + Texto Editorial + Manifesto Subsection)**

---

## 🎯 SECTION PURPOSE
- Criar impacto visual inicial com atmosfera **Ghost Blue** etérea e viva.  
- Comunicar posicionamento estratégico através de **texto editorial estático**.  
- Integrar o **vídeo manifesto** como subcamada sensorial da Hero (desktop)  
  e seção independente em fullscreen no mobile.  
- Introduzir a identidade “premium + experimental” sem poluição visual.  

---

## 💠 DESIGN TOKENS

### Colors
| Token | Value | Description |
|--------|--------|-------------|
| `primary` | `#0057FF` | Cor principal da atmosfera “Ghost Blue” |
| `accent` | `#5227FF` | Glow e emissive secundário |
| `bg` | `#06071f` | Fundo escuro de base |
| `neutral` | `#0b0d3a` | Gradiente de transição para o fundo |
| `text` | `#d9dade` | Texto editorial principal |
| `highlight` | `#FFFFFF` | Picos de luminosidade e brilho de partículas |

---

### Typography
- **TT Norms Pro**, self-host *(ou fallback: `ui-sans-serif`, `system-ui`)*  
- Hierarquia:
  - `[BRAND AWARENESS]` → 12px, uppercase, `font-mono`
  - `h1` → 4rem–6rem, `font-bold`, `tracking-tight`
  - Subcopy → 1rem–1.25rem, regular
  - CTA → 0.9rem, uppercase, `tracking-wide`, `duration-300`, hover branco  

---

## 🧱 LAYER STRUCTURE (Z-INDEX HIERARCHY)

| Ordem | Layer | Descrição |
|-------|--------|------------|
| **z-50** | 🩵 **Preloader (Ghost Loader)** | SVG animado “Summoning spirits” com barra de progresso |
| **z-30** | 🎞️ **Thumb Vídeo Manifesto** | Vídeo interativo flutuante (subcategoria da Hero) |
| **z-20** | 👻 **Animação Ghost (WebGL)** | Atmosfera viva: Ghost, partículas e fireflies |
| **z-10** | ✍️ **Texto Editorial (HeroCopy)** | Conteúdo fixo e centralizado |
| **z-0** | 🌌 **Gradiente Base** | Fundo `#06071f` + radial `#0b0d3a` |

---

## 🧩 COMPONENTS

components/home/
├─ HomeHero.tsx            ← Orquestrador (todas as layers)
├─ Preloader.tsx       ← Animação inicial “ghost-loader”
├─ HeroCopy.tsx            ← Texto editorial fixo
├─ ManifestoThumb.tsx      ← Vídeo manifesto flutuante (desktop)
├─ GhostStage.tsx          ← Wrapper dinâmico (Canvas 3D)
└─ webgl/
├─ GhostCanvas.tsx
├─ Ghost.tsx
├─ Eyes.tsx
├─ Particles.tsx
├─ Fireflies.tsx
├─ AtmosphereVeil.tsx
└─ postprocessing/
├─ AnalogDecayPass.ts
└─ BloomPass.ts

---

---

## ⚙️ COMPONENTE PRINCIPAL — `HomeHero.tsx`

```tsx
'use client';

import Preloader from './Preloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scaleVideo = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const posYVideo = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["16px", "0px"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh] bg-[#06071f] overflow-hidden">
      <Preloader />

      {/* Camada WebGL */}
      <div className="absolute inset-0 z-20">
        <GhostStage />
      </div>

      {/* Texto Editorial */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <HeroCopy />
      </motion.div>

      {/* Vídeo Manifesto - Desktop */}
      <motion.div
        style={{
          scale: scaleVideo,
          y: posYVideo,
          borderRadius: borderRadius
        }}
        className="absolute bottom-10 right-10 z-30 w-[30vw] aspect-video overflow-hidden rounded-2xl shadow-lg hidden md:block"
      >
        <ManifestoThumb />
      </motion.div>
    </section>
  );
}```


## **HERO PRELOADER**
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
    >
      <svg className="ghost-svg mb-4" height="80" viewBox="0 0 512 512" width="80">
        <path fill="white" d="M508.3 432.8s-46.6-39-79.5-275.8C420 69.3 346 0 256 0S92 69.3 83.2 157C50.3 393.7 3.7 432.8 3.7 432.8-11.4 458 24.4 461 42.4 460.7c35.3-.5 35.3 40.3 70.5 40.3s35.3-35.3 70.5-35.3 37.4 45.3 72.7 45.3 37.4-45.3 72.7-45.3 35.3 35.3 70.5 35.3 35.3-40.8 70.6-40.3c18 0.3 53.8-2.8 38.7-27.9z"/>
      </svg>
      <p className="font-mono text-xs uppercase tracking-widest text-[#e0e0e0] mb-2">Summoning spirits</p>
      <div className="w-24 h-0.5 bg-[#06071f] rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
        />
      </div>
    </motion.div>
  );
}

## **HERO COPY**
export default function HeroCopy() {
  return (
    <div className="text-[#d9dade] max-w-3xl mx-auto">
      <p className="font-mono text-sm uppercase tracking-widest mb-3">[BRAND AWARENESS]</p>
      <h1 className="font-bold text-5xl md:text-6xl leading-tight mb-6">Design, não<br />é só estética.</h1>
      <p className="text-lg mb-8">[É intenção, é estratégia, é experiência.]</p>
      <a href="/sobre" className="text-[#d9dade] hover:text-white transition-colors duration-300">get to know me better →</a>
    </div>
  );
}


## ⚙️ INTERACTIVE PROTOTYPE FLOW

### 🩵 1. PRELOADER — “Ghost Loader”
- SVG flutuante animado (`ghostFloat`, `eyePulse`, `textPulse`).  
- Mensagem: `"Summoning spirits"`.  
- Barra de progresso (`from-[#0057FF] to-[#5227FF]`).  
- Fade-out suave (`opacity 1 → 0` após 1.5s).  

---

### 🌫️ 2. GHOST ATMOSPHERE (WEBGL CANVAS)
**Camada sensorial viva**, inspirada em *Spooky Spectral Ghost* [https://gist.github.com/danilonovaisv/6fb4ce27767d6e7f26c27244d4c39873] E [https://codepen.io/danilonovaisv/pen/azZbdQo]
- Mesh esférico emissivo (`#0057FF`), pulso harmônico e flutuação vertical.  
- Olhos reativos (`Eyes.tsx`) → brilho aumenta conforme movimento do mouse.  
- Partículas orgânicas e fireflies orbitam o ghost.  
- Pós-processamento:  
  - `BloomPass` → brilho HDR (intensidade 2.8).  
  - `AnalogDecayPass` → *grain*, *scanlines*, *jitter*, *vignette*.  

**Interações:**
- Cursor move → Ghost segue lentamente o ponteiro (`lerp 0.05`).  
- Movimento senoidal orgânico (`sin(t * 0.8)` / `sin(t * 0.3)`).  
- Performance: `DPR 2`, `antialias false`, desativado em `prefers-reduced-motion`.  

---

### ✍️ 3. HERO TEXT BLOCK
**Conteúdo editorial centralizado (HeroCopy.tsx)**  

[BRAND AWARENESS]
Design, não
é só estética.
[É intenção, é estratégia, é experiência.]

**Características:**
- 100% estático, sem fade ou scroll binding.  
- `text-[#d9dade]` sobre fundo `#06071f`.  
- Centralizado (`flex-col`, `items-center`, `text-center`).  
- CTA: `"get to know me better →"` com hover branco.  

---

### 🎞️ 4. MANIFESTO THUMB (SUBSECTION DESKTOP)
**Comportamento (Desktop)**  
- Vídeo miniatura flutuante (`bottom-right`, `z-30`).  
- Vídeo:  
  `https://dpejskjpghoozbpfxkpf.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`  
- Autoplay, muted, loop, playsInline.  
- Fade-in suave após preloader.  

'use client';

import { motion } from 'framer-motion';

export default function ManifestoThumb() {
  return (
    <motion.video
      src="https://dpejskjpghoozbpfxkpf.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    />
  );
}

**Estados:**
| Estado | Ação | Efeito |
|--------|------|---------|
| Idle | Página carregada | Opacity 0 → 1, scale 0.9 → 1 |
| Hover | Mouse sobre vídeo | Scale 1 → 1.05, ícone gira (-45° → 0°) |
| Scroll | Usuário desce | Vídeo cresce e centraliza, cobrindo o texto |
| Click | Desktop | Salta para estado fullscreen instantâneo |
| Click | Mobile | Alterna som (mute/unmute) |

**Transições:**
- `ease-in-out`, `duration-500ms`.  
- `border-radius: 12px → 0px`.  
- `scale: 0.3 → 1`.  

---

### 📱 5. MANIFESTO (MOBILE VERSION)
**Na versão mobile, o vídeo manifesto é uma seção independente logo abaixo da Hero.**  
- Ocupa 100% da viewport (`aspect-video`).  
- Autoplay, loop, muted.  
- `whileInView` + `useInView` (Framer Motion) → fade-in + scale 0.95 → 1.  
- Fundo idêntico à Hero (`#06071f`), garantindo continuidade visual.  

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block md:hidden w-full bg-[#06071f] aspect-video flex items-center justify-center"
    >
      <video
        src="https://dpejskjpghoozbpfxkpf.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.section>
  );
}


⸻


## **Tech Spec: Hero Showreel Animation

Componente Alvo: .video-wrapper (Container do Vídeo) Contexto: Seção Hero (.home-hero)

## **1. Estado Inicial (Idle / Page Load)**
O componente inicia como uma miniatura flutuante sobre o conteúdo, aguardando interação.

Posição (Anchor): Canto Inferior Direito (bottom-gutter, right-gutter).
Dimensões: Aspecto Vertical (Portrait/Mobile) ou tamanho fixo relativo ao grid no Desktop.
Z-Index: 10 (Acima do texto de background, mas abaixo de modais/menus).
Visibilidade: opacity: 0 → opacity: 1 (Fade-in automático após carregamento do DOM).
Mídia: Vídeo em loop, mudo (muted), autoplay, playsinline.

## **2. Interação A: Scroll (Layout Morphing)**
Trigger: Scroll da Página (Vertical Scrub) Tipo: Continuous Timeline (Sincronizado com a posição da barra de rolagem).

Sequência da Animação
À medida que o usuário faz scroll para baixo (0% a 100% da altura da seção Hero):

Propriedade    Valor Inicial (Start)    Valor Final (End)    Curva (Easing)
Scale / Width    ~20-30% da viewport (Thumb)    100% Width / 100% Height (Fullscreen)    linear (controlado pelo scroll)
Position (X, Y)    bottom-right    center-center (0,0)    linear
Border Radius    10px - 20px (Arredondado)    0px (Quadrado)    linear
Overlay Text    opacity: 1 (Visível)    opacity: 0 (Fade out)    power1.out
Nota Técnica: O container pai da Hero deve ter height: 200vh ou superior e propriedade sticky ou pin (GSAP ScrollTrigger) para permitir que essa animação complete antes que a próxima seção suba.

## **3. Interação B: Cursor Hover (Micro-interaction)**
Trigger: Mouse Over (Desktop apenas) Target: .video-wrapper

Estado: Hover In
Scale: 100% → 105% (Zoom suave).
Classe: scale-105
Duração: 500ms
Ease: ease-in-out
Seta (Icon): Rotaciona.
Rotação: -45deg → 0deg.
Classe: rotate-0 (no elemento SVG filho).
Duração: 500ms.
Estado: Hover Out
Scale: Retorna para 100%.
Seta (Icon): Retorna para -45deg.

## **4. Interação C: Click Action (Logic)**
Trigger: click / tap no .video-wrapper.

Condicional 1: Viewport Desktop (min-width: 768px)
Ação: Skip Animation.
Comportamento: O sistema força o scroll da página imediatamente para o ponto final da animação (onde o vídeo está fullscreen).
Código: $store.scroll($store.distanceToBottom(...))
Condicional 2: Viewport Mobile (max-width: 767px)
Ação: Toggle Sound.
Comportamento: Ativa/Desativa o som do vídeo.
Feedback Visual: Ícone de som (.toggle-sound) altera estado (preenchido/vazio) e texto de overlay pode aparecer.
Código: $store.showreelMuted = !$store.showreelMuted

## **5. Tokens de Animação (CSS/Tailwind Reference)**
Para garantir a fidelidade visual durante a implementação:

Transition Timing: duration-500 (500ms).
Timing Function: ease-in-out (Cubic Bezier suave).
Bordas: rounded-md (valor base para o estado inicial).
Breakpoints:
md (768px): Define a mudança de comportamento lógico (Scroll vs Mute) e posicionamento (absolute no desktop vs relative no mobile).

## **Resumo do Fluxo do Protótipo**
Usuário entra na página: Vê a Hero com textos grandes e o vídeo pequeno no canto inferior direito.
Usuário passa o mouse no vídeo: O vídeo cresce levemente e a seta aponta para a direita (convite ao clique).
Opt A (Scrollando): O vídeo começa a crescer e se deslocar para o centro, cobrindo o texto, até virar um background completo da tela.
Opt B (Clicando): A animação salta instantaneamente para o estado "Vídeo Fullscreen".

### 🧱 FINAL Z-INDEX STACK (HERO + MANIFESTO)

z-index    Elemento    Descrição
z-50    Preloader    Ghost Loader
z-30    ManifestoThumb (desktop)    Vídeo flutuante interativo
z-20    GhostCanvas    Ghost + partículas + atmosfera
z-10    HeroCopy    Texto editorial central
z-0    Fundo radial    radial-gradient(circle, #0b0d3a, #06071f)
mobile-only    ManifestoSection    Fullscreen abaixo da Hero


⸻
⚡ PERFORMANCE
    •    WebGL dynamic import (client-only).
    •    DPR 2 máx.
    •    Antialias desativado.
    •    Instancing para partículas.
    •    Fallback CSS (gradiente radial).
    •    useInView → animações apenas quando na viewport.

⸻

♿ ACESSIBILIDADE
    •    Contraste AA garantido (#d9dade / #06071f = 7.2:1).
    •    Texto editorial fixo.
    •    aria-label em links e botões.
    •    Motion reduzido respeita prefers-reduced-motion.
    •    Vídeos sempre iniciam muted.

⸻

🚫 NON-NEGOTIABLES
    •    ❌ Sem glassmorphism.
    •    ❌ Sem texto animado.
    •    ❌ Sem 3D sólido GLB.
    •    ❌ Sem overlays sobre vídeo.
    •    ✅ Ghost é camada atmosférica.
    •    ✅ Hero é editorial e silenciosa.
    •    ✅ Manifesto integra visualmente, mas separa-se no mobile.

⸻

🧩 LAYERS (HERO STACK OVERVIEW)

[Z-50]  Preloader  → SVG Ghost Loader
[Z-30]  ManifestoThumb → Vídeo interativo flutuante
[Z-20]  GhostStage     → Canvas WebGL Ghost + Partículas
[Z-10]  HeroCopy       → Texto editorial fixo
[Z-0]   Background     → Gradiente radial (#0b0d3a → #06071f)
[Mobile] ManifestoSection → Fullscreen video abaixo da Hero


⸻

🌌 EXPECTED RESULT
    •    A Hero surge com atmosfera Ghost viva.
    •    O texto é fixo e editorial, sem motion.
    •    O Ghost flutua organicamente, seguindo o cursor.
    •    O vídeo manifesto aparece pequeno e cresce com o scroll.
    •    No mobile, o manifesto já abre fullscreen.
    •    A transição é cinematográfica, sem cortes abruptos.
    •    Toda a experiência é performática e responsiva.


###🧠 VISUAL HIERARCHY (DESKTOP)
    1.    Preloader (Ghost Loader)
    2.    Hero Background + WebGL Atmosphere
    3.    Ghost Mesh (emissivo, flutuante)
    4.    Fireflies + Partículas
    5.    Hero Text Block (Editorial)
    6.    Manifesto Video Thumb (Floating Layer)
    7.    Transition → Manifesto Section (scroll ou click)

⸻

###📐 FILE ARCHITECTURE SUMMARY

components/home/
├─ HomeHero.tsx
├─ Preloader.tsx
├─ HeroCopy.tsx
├─ ManifestoThumb.tsx
├─ GhostStage.tsx
├─ ManifestoSection.tsx  ← apenas para mobile
└─ webgl/
   ├─ GhostCanvas.tsx
   ├─ Ghost.tsx
   ├─ Eyes.tsx
   ├─ Particles.tsx
   ├─ Fireflies.tsx
   ├─ AtmosphereVeil.tsx
   └─ postprocessing/
       ├─ AnalogDecayPass.ts
       └─ BloomPass.ts


⸻

###🪞 EXPECTED RESULT
    •    Hero silenciosa e cinematográfica.
    •    Texto editorial fixo e legível desde o primeiro frame.
    •    Ghost flutuante reagindo organicamente ao cursor.
    •    Vídeo manifesto aparece como miniatura e cresce ao scroll (desktop).
    •    No mobile, manifesto abre já em fullscreen logo abaixo da Hero.
    •    Atmosfera “Ghost Blue” contínua, com profundidade e leveza.

---




# **SECTION NAME: PORTFOLIO SHOWCASE**

**Versão:** 1.0  
**Última atualização:** 29/12/2025  
**Status:** ✅ Validado | 🎨 Design System Compatível | ♿ A11y Ready

## 🎯 VISÃO GERAL
> *"Apresentar claramente as áreas de atuação organizando o portfólio em categorias distintas, criando uma experiência editorial premium com clareza, ritmo e interatividade suave."*

### 🏷️ COMPONENTES PRINCIPAIS
- `PortfolioShowcaseSection` (wrapper)
- `AccordionRow` (stripe interativa)
- `FloatingLabel` (microcopy com blend mode)
- CTAs aspiracionais


## **PRIMARY MESSAGE / HEADLINE**
- `portfólio (preto) showcase (#5227FF)`

---

### Typography
- **TT Norms Pro**, self-host *(ou fallback: `ui-sans-serif`, `system-ui`)*  

---

## **SECONDARY MESSAGE / SUPPORT TEXT**
- `[what we love working on]`

---

## **KEY CONTENT ELEMENTS**
- Headline central da seção.
- Microtexto lateral `[what we love working on]`.
- 3 stripes de categorias interativas.
- CTA aspiracional inferior.

---

## **CALL TO ACTION (if any)**
- `Ver todos os projetos →` → `/portfolio?category={id}`
- `let’s build something great →` → `/#contact`

---

## **LINKS GLOBAIS**
- Integração com `/portfolio` (com filtro por categoria).
- Integração com `/#contact`.

---

## **LAYOUT TYPE**
- Seção editorial baseada em **stripes expansíveis**.

---


### 🎨 PALETA DE CORES
```js
{
  background: '#F4F5F7',
  textPrimary: '#111111',
  brandBlue: '#0057FF',
  textSecondary: 'neutros suaves'
}
```
## 💻 Layout Responsivo

### 🖥️ Desktop (≥1024px)

A seção do portfólio é exibida em uma única coluna centralizada com os seguintes elementos empilhados verticalmente:

- **Título principal**: “portfólio showcase” (centralizado na parte superior)
- **Floating label interativa**: “[what we love working on]”, posicionada de forma absoluta junto a primeiro intem, “Brand & Campaigns", posicionado ao lado esquerdo.

- **Três cards de categoria**, cada um com largura máxima limitada (não 100%) e alinhamento horizontal variável:
  - **Primeiro card**: “Brand & Campaigns [●] [→]” — alinhado à **direita** (`justify-end`)
  - **Segundo card**: “Videos & Motion [●] [→]” — **centralizado** (`justify-center`)
  - **Terceiro card**: “Web Campaigns, Websites & Tech [●] [→]” — alinhado à **esquerda** (`justify-start`) quebrar sempre em duas linhas - linha1 ["Web Campaigns,"] e linha2 ["Websites & Tech"]

- **call-to-actions**, centralizado abaixo dos cards:
  - “let's build something great →”
  
  ## **ALIGNMENT**

### Desktop (≥1024px)
- Headline centralizada.
- Microtexto alinhado à esquerda do primeiro stripe.
- Stripes com alinhamento alternado:
  1. Direita
  2. Centro
  3. Esquerda


Os cards possuem espaçamento vertical consistente e mantêm margens laterais simétricas na tela grande.

### 📱 Mobile (≤768px)

A mesma seção é reorganizada para uma experiência vertical e fluida:

- **Título principal**: “portfólio showcase” (centralizado no topo)
- **Três cards de categoria**, agora com **largura total do container** (100%):
  - “Brand & Campaigns [→]”
  - “Videos & Motion [→]”
  - “Websites & Tech [→]”
- Cada card é exibido um abaixo do outro, com padding horizontal e bordas visuais consistentes
- **call-to-actions**, centralizado abaixo dos cards:
  - “let's build something great →”

Não há floating label visível em mobile (pode ser oculto ou integrado de forma alternativa). O layout prioriza toque, legibilidade e carregamento rápido.

## ⚡ INTERAÇÕES PRINCIPAIS

### HOVER (Desktop Only)
```js
// Pseudo-código da animação
onHover(Stripe) => {
  imageWrapper.animate({
    width: "0 → 288px",
    opacity: "0 → 1",
    timing: "700ms cubic-bezier(0.22, 1, 0.36, 1)"
  });
  
  contentGap.animate({
    spacing: "gap-7 → gap-10",
    duration: "300ms ease-in-out"
  });
  
  arrowIcon.animate({
    rotation: "-45deg → 0deg",
    duration: "500ms"
  });
}
```

### SCROLL REVEAL
- **Trigger:** Intersection Observer (30% no viewport)
- **Animation:** Staggered Fade Up
  - `opacity: 0 → 1`
  - `translateY: 24px → 0px`
  - `duration: 0.8s ease-out`
  

## 💻 IMPLEMENTAÇÃO TÉCNICA

### PortfolioShowcase.tsx
```tsx
import { AccordionRow } from './AccordionRow';

export const PortfolioShowcase = () => {
  const categories = [
    { id: 'brand-campaigns', title: 'Brand & Campaigns', align: 'end' },
    { id: 'videos-motion', title: 'Videos & Motion', align: 'center' },
    { id: 'websites-tech', title: 'Websites & Tech', align: 'start' }
  ];

  return (
    <section 
      aria-label="Portfolio Categories" 
      className="bg-[#F4F5F7] py-24 md:py-32"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        {/* Floating Label - Desktop Only */}
        <div className="hidden md:block absolute left-[clamp(24px,5vw,96px)] -translate-y-16">
          <span className="text-[#0057FF] uppercase tracking-widest font-mono mix-blend-difference">
            [what we love working on]
          </span>
        </div>
        
        {/* Headline Centralizada */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-14 md:mb-20">
          portfólio showcase
        </h2>
        
        {/* Accordion Rows */}
        <div className="flex flex-col gap-10 md:gap-14">
          {categories.map((category) => (
            <AccordionRow 
              key={category.id} 
              category={category} 
              alignment={category.align}
            />
          ))}
        </div>
        
        {/* CTAs Aspiracionais */}
        <div className="mt-20 flex flex-col md:flex-row md:justify-center gap-6">
          <PrimaryButton href="/portfolio" variant="outline">
            Ver todos os projetos →
          </PrimaryButton>
          <PrimaryButton href="/#contact" variant="solid">
            let's build something great →
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
```

### AccordionRow.tsx
```tsx
import { ArrowIcon } from './icons';

export const AccordionRow = ({ category, alignment }) => {
  const alignmentClasses = {
    start: 'md:justify-start',
    center: 'md:justify-center',
    end: 'md:justify-end'
  };

  return (
    <Link 
      href={`/portfolio?category=${category.id}`}
      className={`group flex w-full border-t border-[#0057FF] py-8 md:py-14 items-center transition-all ${alignmentClasses[alignment]}`}
      aria-label={`Ver projetos de ${category.title}`}
    >
      <div className="flex items-center gap-5 md:gap-7 group-hover:gap-10 transition-all duration-300 w-full">
        {/* Thumbnail Revealer - Desktop Only */}
        <div className="hidden md:block w-0 overflow-hidden group-hover:w-72 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-md relative h-40 shrink-0">
          <Image 
            src={`/thumbnails/${category.id}.jpg`} 
            alt="" 
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        
        {/* Category Title */}
        <h3 className="text-2xl md:text-5xl/none font-medium whitespace-nowrap">
          {category.title}
        </h3>
        
        {/* Icon Identifier */}
        <div className="bg-[#0057FF] rounded-full p-2.5 md:p-3.5 shrink-0">
          <ArrowIcon 
            className="text-white w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" 
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
};
```

## ♿ ACESSIBILIDADE (A11Y)
```js
// Checklist A11y
const a11yCompliance = {
  semanticStructure: [
    "Usar <section> com aria-label='Portfolio Categories'",
    "Links com texto descritivo ou aria-label"
  ],
  keyboardNavigation: [
    "focus-visible:ring-[#0057FF] em todos os elementos interativos",
    "Área de toque mínima de 48x48px em mobile"
  ],
  reducedMotion: [
    "@media (prefers-reduced-motion: reduce) {",
    "  transition: none !important;",
    "  animation: none !important;",
    "  /* Manter thumbnails visíveis sem animação */",
    "}"
  ],
  screenReaders: [
    "Thumbnails com alt='' (decorativas)",
    "CTAs com texto completo visível"
  ]
};
```

## ✅ CHECKLIST DE QA

### Layout & Visual
- [ ] **Desktop:** Floating label posicionado corretamente à esquerda
- [ ] **Desktop:** Alinhamento alternado das stripes (direita/centro/esquerda)
- [ ] **Mobile:** Nenhum overflow horizontal
- [ ] **Ultrawide:** Conteúdo não parece "estreito" em telas >1920px

### Interações
- [ ] **Desktop:** Hover revela thumbnail com animação suave (700ms)
- [ ] **Desktop:** Sem layout shift durante hover
- [ ] **Mobile:** Thumbnail não aparece em hover
- [ ] **Todos:** Navegação por teclado completa com foco visível

### Performance
- [ ] **Mobile:** Nenhuma animação de width (apenas transform/opacity)
- [ ] **Todos:** Tempo de animação otimizado (máx 700ms)
- [ ] **Performance:** Imagens com otimização adequada

## 🔗 DEPENDÊNCIAS
```js
{
  pages: [
    "/portfolio",       // Página completa com filtros por categoria
    "/#contact"         // Seção de contato na Home Page
  ],
  components: [
    "PrimaryButton",    // Sistema de botões do design system
    "Image",            // Componente de imagem otimizada
    "ArrowIcon"         // Ícone SVG para interações
  ],
  hooks: [
    "useIntersectionObserver", // Para animações de entrada
    "useReducedMotion"        // Respeitar prefers-reduced-motion
  ]
}
```

## 📊 TRACKING
```js
// Eventos para analytics
const trackingEvents = {
  categoryClick: "portfolio_showcase_category_click",
  ctaClick: "portfolio_showcase_cta_click",
  impression: "portfolio_showcase_view"
};
```
> 💡 **Dica para implementação:** A referência visual é https://loandbehold.studio - priorize o ritmo editorial e a sensação premium nas transições. A animação de hover deve sentir-se orgânica, não mecânica.







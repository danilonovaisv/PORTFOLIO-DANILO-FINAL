# Thumb Video da Hero – Análise profunda + especificação para recriação (Next.js + R3F + Tailwind + Framer Motion)

---

### **THUMB VIDEO MANIFESTO - Posição na página, comportamento, interação e scroll

### 1.1 Onde o “thumb video” fica
O *thumb video* pertence à **Home Hero** (`.home-hero`), dentro de um wrapper identificado por classe **`.video-wrapper`**.

Padrão de layout (deduzido pelo HTML + animações):
- **Desktop (≥ 768px)**: `.video-wrapper` fica **absoluto no canto inferior direito** da hero (ex.: `md:absolute md:bottom-… md:right-…`).
- **Mobile (< 768px)**: `.video-wrapper` é **relative** e entra no fluxo normal do layout (classe começa com `relative`), com **aspect ratio vertical** (`aspect-[9/14]`), sugerindo thumbnail “cartaz”/vertical.

### 1.2 Interação (click/tap)
O `<video>` tem um handler de click:

- **Desktop (≥ 768px)**: ao clicar no vídeo, ele **não alterna o mute**; ele **faz scroll** até o final da área “pinned” da hero:
  - Chamada observada: `scroll(distanceToBottom(... pin-spacer ...) - 1)`
  - Resultado: força o usuário a “revelar” a segunda fase da hero (quando o vídeo já ocupou área maior e overlays aparecem).

- **Mobile (< 768px)**: ao tocar no vídeo, ele **alterna o estado de mute**:
  - `showreelMuted = !showreelMuted`
  - Ou seja: no mobile, o vídeo é consumido como mídia “inline” e o tap controla áudio.

### 1.3 Scroll: pin + scrub (comportamento principal)
No desktop, a hero é **pinned** (fixada) com **scrub**.

Configuração observada no bundle:
- `scrollTrigger: { trigger: ".home-hero", pin: true, start: "top top", end: "+=800", scrub: 1, ... }`

Isso significa:
- A hero “segura” o scroll por ~800px de progresso virtual.
- A animação do vídeo é sincronizada com o scroll (“scrub”), em vez de ser uma animação com tempo fixo.

### 1.4 Transformações do thumb (desktop)
Durante a animação/pinning, o vídeo sofre **morphing**:

Transição 1 (desktop):
- `.home-hero .video-wrapper`
  - **from**: `width: "219px"`, `height: "131px"`, `right: 30`, `bottom: 30`, `borderRadius: 5`
  - **to**: `width: "100%"`, `height: "100%"`, `right: 0`, `bottom: 0`, `borderRadius: 0`
  - easing/duração: `ease: "expo.inOut"`, `duration: 0.7`

Transição complementar:
- `.home-hero video`
  - `borderRadius: 5` → `borderRadius: 0` (`ease:"power4.out"`, `duration: 0.9`)

> Interpretação: começa como **thumb pequeno** no canto inferior direito e se transforma em **vídeo fullscreen** dentro do container da hero.

### 1.5 Estados por progresso do scroll (gatilhos)
O `onUpdate` do ScrollTrigger define thresholds:

- `progress <= 0.03`
  - remove `no-hover` do `.video-wrapper`
- caso contrário
  - adiciona `no-hover` (bloqueia alguns hovers durante transição inicial)

- `progress >= 0.75` (e ainda não executado)
  - adiciona `.show` em:
    - `.home-hero .video-text`
    - `.home-hero .toggle-sound`
    - `.home-hero .video-overlay`
  - altera `showreelMuted` para **false** (desmuta) **em desktop** (observado `store("showreelMuted", !1)`)

- `progress < 0.75`
  - remove `.show` dos elementos acima
  - força `showreelMuted = true` (muta novamente)

### 1.6 Hover/overlay (desktop)
O vídeo tem estilo de hover (observado por utilitários):  
- `group-hover:scale-105` + `transition duration-500 ease-in-out`

E existem camadas:
- `.video-overlay` (provável layer de gradiente/sombra)
- `.video-text` (texto e metadados que aparecem com `.show`)
- `.toggle-sound` (botão de som, aparece com `.show`)

---





### **THUMB VIDEO MANIFESTO - Responsividade:**

### 2.1 Mobile-first ou desktop-first?
O comportamento é **desktop-first na interação de scroll** (pinned + scrub só no desktop), porém o layout usa utilitários `md:` para “ativar” o modo desktop.  
Na prática:
- **Mobile-first** para estrutura (wrapper começa `relative`, aspect ratio definido).
- **Desktop-first** para a experiência avançada (pin + scrub + scroll-to-reveal).

### 2.2 Como adapta nas 3 faixas (mobile/tablet/desktop)

**Mobile (0–767px)**
- `.video-wrapper` fica **relative**, com `aspect-[9/14]`
- Click/tap **alternando mute**
- Sem pin/scrub (experiência reduzida para performance e UX touch)

**Tablet (768–1023px)**
- Entra o modo `md:`:
  - wrapper tende a **absoluto no canto inferior direito**
  - pin + scrub passam a existir
  - click no vídeo vira **scroll-to-reveal**
- Atenção: em tablet touch, esse padrão pode precisar de ajuste (ver “Recomendações”)

**Desktop (≥ 1024px)**
- Experiência completa:
  - hero pinned
  - thumb → fullscreen por scroll
  - overlays aparecem após 75% do progresso
  - botão de som disponível

---




### **THUMB VIDEO MANIFESTO - Acessibilidade & SEO:**

### 3.1 Problemas típicos do padrão original (e como corrigir)
O padrão “vídeo clicável” costuma ser um `<video>` com handler de click. Para acessibilidade:

Checklist obrigatório:
- [ ] Não usar o vídeo como único “botão”.  
      ✅ Envolver com `<button>` ou `<a>` com `role="button"` e `aria-label`.
- [ ] Botão de som (`toggle-sound`) com:
  - `aria-label="Ativar/Desativar som do vídeo"`
  - `aria-pressed={muted ? "false" : "true"}`
- [ ] `playsInline` no mobile (já existe) para evitar fullscreen indesejado.
- [ ] **Respeitar prefers-reduced-motion**: reduzir/encurtar morphing e remover “scrub” intenso.
- [ ] Headline principal da hero como `<h1>` (sem pular heading levels).
- [ ] Contraste: overlay/gradiente no vídeo para garantir leitura do texto.

SEO:
- O vídeo é decorativo/experiencial; não deve substituir o conteúdo textual importante.
- Se a thumb tem CTA, garantir link navegável e texto indexável fora do canvas.

---




### **THUMB VIDEO MANIFESTO - Extras técnicos (stack solicitada):**

### 4.1 Divisão de componentes recomendada
Estrutura (App Router):

- `<Hero />`
  - `<GhostCanvasBackground />` (R3F)
  - `<HeroCopy />` (h1, subtítulo, CTA)
  - `<ShowreelThumb />` (thumb vídeo + overlay + mute + scroll progress)
  - `<Preloader />` (se necessário)

### 4.2 App Router: client-side ou server-side?
- **Hero** precisa ser **Client Component** por:
  - WebGL + R3F
  - listeners de mouse/scroll
  - controle de vídeo (mute/play)
  - framer-motion `useScroll`

Então:
- `app/page.tsx` pode ser server, mas renderiza `<HeroClient />`:
  - `const HeroClient = dynamic(() => import("./HeroClient"), { ssr: false })`

### 4.3 Three.js / R3F: fallback SSR
- Use `dynamic(..., { ssr:false })` para o canvas.
- Renderize um fallback estático:
  - background gradient + textura (CSS) + ghost SVG/PNG + thumb vídeo.

### 4.4 Tailwind: theme extend (tokens úteis)
Sugestão mínima (exemplo):
- `colors.blue = "#0B63FF"` (ou o azul neon do projeto)
- `spacing.gutter = "20px"` (e `md: 30px`, `lg: 40px`)
- `borderRadius.videoThumb = "5px"`

### 4.5 Framer Motion: declarativas ou variantes?
Para recriar fielmente o scrub do scroll:
- Use **Framer Motion + `useScroll` + `useTransform`** (declarativo)  
  ✅ mantém stack “pura” sem GSAP
- Alternativa: **GSAP ScrollTrigger** (fica idêntico ao original), mas adiciona dependência.

Recomendação: **Framer Motion** (porque está na sua stack), com fallback “CSS sticky”.

---

### **THUMB VIDEO MANIFESTO - Implementação sugerida (Framer Motion, sem GSAP):**

### 5.1 Conceito
- Hero com `position: relative` e `height: 200svh` (mobile) / `height: 100vh` (desktop).
- Conteúdo textual fica central.
- Thumb fica:
  - mobile: dentro do fluxo com aspect vertical
  - desktop: `absolute bottom-gutter right-gutter`, inicia pequeno e, conforme scroll, vira fullscreen.

### 5.2 Código (ShowreelThumb.tsx)
> Este componente implementa:
> - morph por scroll (219x131 → 100%)
> - borderRadius 5 → 0
> - threshold 75% para mostrar overlay + botão de som
> - click desktop = scroll-to-reveal; click mobile = toggle mute

```tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

type Props = {
  heroRef: React.RefObject<HTMLElement>;
  src: string; // Supabase Storage URL (mp4)
};

export function ShowreelThumb({ heroRef, src }: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Estado de áudio (equivale ao store showreelMuted)
  const [muted, setMuted] = useState(true);

  // Scroll progress dentro da hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'], // ajusta o “scrub”
  });

  // Morphing desktop (valores do bundle: 219x131 → 100%)
  const w = useTransform(scrollYProgress, [0, 1], ['219px', '100%']);
  const h = useTransform(scrollYProgress, [0, 1], ['131px', '100%']);
  const right = useTransform(scrollYProgress, [0, 1], ['30px', '0px']);
  const bottom = useTransform(scrollYProgress, [0, 1], ['30px', '0px']);
  const radius = useTransform(scrollYProgress, [0, 1], ['5px', '0px']);

  // Mostrar overlays após 75%
  const overlayOpacity = useTransform(scrollYProgress, [0.74, 0.75], [0, 1]);

  // Controlar mute por threshold (desktop)
  useEffect(() => {
    if (!isDesktop) return;
    const unsub = scrollYProgress.on('change', (p) => {
      if (p >= 0.75) setMuted(false);
      else setMuted(true);
    });
    return () => unsub();
  }, [isDesktop, scrollYProgress]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
    // tentativa de autoplay (silencioso no mobile)
    videoRef.current.play().catch(() => {});
  }, [muted]);

  const onClick = async () => {
    if (!heroRef.current) return;

    if (isDesktop) {
      // desktop: scroll para “revelar”
      const rect = heroRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const end = top + heroRef.current.offsetHeight - window.innerHeight + 1;
      window.scrollTo({ top: end, behavior: 'smooth' });
    } else {
      // mobile: toggle mute
      setMuted((m) => !m);
    }
  };

  return (
    <motion.div
      className={[
        'video-wrapper z-10',
        'relative aspect-[9/14] overflow-hidden rounded-[5px]',
        'md:absolute md:aspect-auto',
        'cursor-pointer group',
      ].join(' ')}
      style={
        isDesktop
          ? { width: w, height: h, right, bottom, borderRadius: radius, position: 'absolute' as const }
          : undefined
      }
      onClick={onClick}
      role="button"
      aria-label={isDesktop ? 'Revelar vídeo (scroll)' : muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <motion.video
        ref={videoRef}
        className="w-full h-full object-cover transition duration-500 ease-in-out group-hover:scale-105"
        src={src}
        autoPlay
        loop
        playsInline
        muted={muted}
      />

      {/* Overlay escuro/gradiente */}
      <motion.div
        className="video-overlay absolute inset-0 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Texto/legenda */}
      <motion.div
        className="video-text absolute bottom-0 left-0 w-full p-4 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      >
        <p className="text-white text-sm opacity-80">Showreel</p>
        <p className="text-white text-base font-medium">Strategy • Branding • Motion</p>
      </motion.div>

      {/* Toggle som (só visível no desktop, após 75%) */}
      <motion.button
        type="button"
        className="toggle-sound absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white backdrop-blur flex items-center justify-center"
        style={{ opacity: isDesktop ? overlayOpacity : 0, pointerEvents: isDesktop ? 'auto' : 'none' }}
        onClick={(e) => {
          e.stopPropagation();
          setMuted((m) => !m);
        }}
        aria-label={muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
        aria-pressed={!muted}
      >
        {muted ? '🔇' : '🔊'}
      </motion.button>
    </motion.div>
  );
}
```

### 5.3 CSS/Tailwind para overlay
No Tailwind, você pode adicionar utilitários, mas um mínimo em CSS global resolve:

```css
.video-overlay {
  background: radial-gradient(120% 120% at 70% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.75) 100%);
}
```

---

### **THUMB VIDEO MANIFESTO - Integração na Hero (App Router):**

### 6.1 HeroClient.tsx
```tsx
'use client';

import { useRef } from 'react';
import { ShowreelThumb } from './ShowreelThumb';
import dynamic from 'next/dynamic';

const GhostCanvasBackground = dynamic(() => import('./GhostCanvasBackground'), { ssr: false });

export default function HeroClient() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} className="home-hero relative w-full h-[200svh] md:h-screen overflow-hidden bg-neutral-950">
      <GhostCanvasBackground />

      <div className="relative z-20 h-screen flex items-center justify-center text-center px-5">
        <div className="max-w-4xl">
          <p className="text-white/60 text-xs tracking-widest uppercase mb-4">[BRAND AWARENESS]</p>
          <h1 className="text-white text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
            Você não vê o design.
            <span className="block text-white/50 mt-3">Mas ele vê você.</span>
          </h1>
        </div>
      </div>

      <ShowreelThumb
        heroRef={heroRef}
        src={'https://YOUR_SUPABASE_PUBLIC_URL/LB-Showreel-2025.mp4'}
      />
    </section>
  );
}
```

---

### **THUMB VIDEO MANIFESTO - Recomendações

### Desktop
- Implementar “pin” real:
  - **Opção A (sem GSAP)**: `section` com `height: 200vh` e inner sticky (100vh). O scroll “simula” o pin.
  - **Opção B (GSAP ScrollTrigger)**: reproduz exatamente. (Se o agente puder adicionar dependência.)

### Tablet touch
- Decidir se “click = scroll” faz sentido.
  - Alternativa: no tablet, usar comportamento do mobile (toggle mute), porque o usuário está em touch.

### Performance
- `preload="metadata"` para o vídeo.
- `playsInline` e `muted` no primeiro paint para garantir autoplay.
- Lazy-load do vídeo (IntersectionObserver) se a hero não está imediatamente visível.

---

### **THUMB VIDEO MANIFESTO -  Checklist de validação (para o agente autônomo)

**Funcional**
- [ ] Thumb inicia pequeno no canto inferior direito (desktop) e cresce para fullscreen com scroll.
- [ ] Border radius 5px → 0px durante a transição.
- [ ] Overlay + texto + toggle-sound aparecem após 75% do progresso.
- [ ] Desktop click faz scroll para o final da hero (reveal).
- [ ] Mobile click alterna mute.
- [ ] Estado de mute volta a true quando scroll retorna < 75%.

**A11y**
- [ ] Wrapper focável + Enter/Space acionam.
- [ ] Botão de som com `aria-label` e `aria-pressed`.
- [ ] Respeitar `prefers-reduced-motion`.

**SEO**
- [ ] Conteúdo textual em `<h1>` e `<p>` fora do canvas.
- [ ] Vídeo não é a única fonte de informação.

---

### **THUMB VIDEO MANIFESTO - Onde o arquivo de vídeo entra (Supabase Storage)

- Manifesto Video: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`
- Usar URL pública no `src`.

Exemplo (pseudo):
```ts
const src = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/LB-Showreel-2025.mp4`;
```

---

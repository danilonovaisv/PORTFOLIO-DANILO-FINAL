# PORT DAN — HERO + MANIFESTO (Guia de Implementação)

Este guia descreve **como implementar a Hero + Thumb do Manifesto** com:
- **Next.js App Router (app/), React + TypeScript**
- **Tailwind CSS**
- **React Three Fiber + drei + three.js** (camada WebGL por trás)
- **Framer Motion** (somente microinterações/entrada do vídeo)
- **Firebase Hosting** (build/deploy)
- **Supabase Storage** (assets de mídia)

> Ajustes obrigatórios desta versão:
> 1) **Remover** “borda de vidro” (não existe mais nenhum container/efeito de glass no texto).
> 2) Texto **centralizado**, **sem animação**, cor **#d9dade**, com as linhas:
>    - `[BRAND AWARENESS]`
>    - `Design, não`
>    - `é só estética.`
>    - `[É intenção, é estratégia, é experiência.]`
> 3) Background da Hero: **#06071f** (ou gradiente equivalente).
> 4) Adicionar a animação WebGL baseada na referência do Codepen.
> 5) Thumb do Manifesto: **não muda** (mantém animação/hover e autoplay).

---

## 1) Visão de arquitetura

### Camadas (stack visual)
- **Layer 1 (BG)**: `<Canvas/>` (WebGL) com ghost + bloom + shader “analog decay” + “veil reveal”
- **Layer 2 (Conteúdo)**: texto centralizado + thumb de vídeo
- **Layer 3 (Interações)**:
  - Pointer move: “ghost follow” (parallax no WebGL)
  - Hover: somente no thumb (Framer Motion)
  - Scroll: navegação suave da thumb até `#manifesto`

### Regras para App Router
- Componentes WebGL e Framer Motion devem ser **Client Components** (`"use client"`).
- A página `app/page.tsx` pode ser **Server** (default) e compor Client Components pequenos.

---

## 2) Estrutura de pastas (base)

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    home/
      HomeHero.tsx
      HeroCopy.tsx
      ManifestoThumb.tsx
      ManifestoSection.tsx
      GhostStage.tsx
      webgl/
        GhostCanvas.tsx
    ui/
      cn.ts
```

**Responsabilidades**
- `HomeHero.tsx`: seção hero (layout + stacking + âncoras)
- `HeroCopy.tsx`: texto centralizado (sem motion)
- `ManifestoThumb.tsx`: vídeo-thumb (motion hover + click => scroll)
- `GhostStage.tsx`: boundary client + `dynamic(..., { ssr:false })`
- `GhostCanvas.tsx`: toda lógica WebGL (isolada do resto)
- `ManifestoSection.tsx`: player principal do manifesto + IntersectionObserver de áudio

---

## 3) Implementação da Hero (layout + estilo)

### Objetivo visual
- Fundo escuro `#06071f` com leve gradiente radial.
- Texto centralizado **estático** (sem fade-in / sem stagger).
- Thumb embaixo do texto, com hover sutil (premium).

### Tailwind (tokens)
- `theme.colors.hero.bg = #06071f`
- `theme.colors.hero.text = #d9dade`

---

## 4) Implementação WebGL (R3F) — referência Codepen

A referência utiliza:
- `EffectComposer` + `UnrealBloomPass` + `ShaderPass` (analog/scanline) (ver script original)
- “Atmosphere/veil” = `PlaneGeometry` com shader que abre um “raio” (reveal) ao redor do ghost
- Ghost segue o mouse com smoothing (lerp)

**Como portamos para R3F**
- Criamos um `<Canvas>` fullscreen.
- Dentro, um componente `Ghost`:
  - `group.position` acompanha o pointer (`followSpeed`).
  - `mesh` (ghost) tem:
    - emissive + pulse
    - wobble/float
- Criamos `BackgroundVeil` (plane com shader) para o “reveal”.
- Criamos `Postprocessing` com `EffectComposer` manual + `useFrame()` renderizando `composer.render()`.

> Importante: o `composer.render()` roda no loop do R3F. Isso garante que a renderização final passa pelo shader e bloom.

### Parâmetros que você vai querer ajustar depois
- `followSpeed`, `wobbleAmount`
- `emissiveIntensity`
- `revealRadius`, `fadeStrength`, `baseOpacity`, `revealOpacity`
- `analogIntensity`, `analogGrain`, `analogScanlines`, `analogJitter`

---

## 5) Manifesto: thumb e seção principal

### Thumb (hero)
- Autoplay + loop + muted + playsInline
- Sem overlay
- Hover: `scale: 1.01`
- Click: scroll suave para `#manifesto` e mantém hash

### Seção principal
- Vídeo grande (full width dentro do container)
- IntersectionObserver:
  - entrou em view => tenta `muted=false` (pode falhar por política do browser)
  - saiu => `muted=true`
- Acessibilidade:
  - `aria-label`
  - respeita `prefers-reduced-motion` (desliga transforms animados)

---

## 6) Performance e boas práticas

### WebGL
- `devicePixelRatio` clamp: `Math.min(dpr, 2)`
- Canvas sempre atrás, sem capturar pointer (se quiser):
  - `canvas { pointer-events:none }` (se o ghost não precisar de hover)
- Evitar leaks:
  - `composer.dispose()` no unmount
  - `removeEventListener` no cleanup

### Next.js / RSC
- `GhostCanvas` com `dynamic(..., { ssr:false })` evita erro de SSR/Window.
- Manter WebGL isolado (sem depender de stores globais).

### Acessibilidade
- Contraste do texto (#d9dade em #06071f) é alto.
- Links com `aria-label`.
- `prefers-reduced-motion`: não aplicar hover scale (Framer) e não usar parallax (opcional).

---

## 7) Firebase Hosting (Next.js)

Use a integração de frameworks do Firebase Hosting (preview). O projeto precisa de `firebase.json` com `frameworksBackend`. Depois `firebase deploy`.

> Observação: o Firebase também recomenda App Hosting para full-stack Next.js, mas aqui mantemos Hosting como solicitado.

---

## 8) Checklist rápido (para copilots)

1. Criar `HomeHero` com:
   - layer WebGL absoluta `inset-0 -z-10`
   - copy centralizada
   - thumb abaixo
2. Garantir BG `#06071f` em `globals.css`
3. Implementar `GhostStage` com dynamic `ssr:false`
4. Implementar `GhostCanvas`:
   - Ghost follow pointer
   - Bloom + Analog shader pass
   - Plane “veil reveal”
5. Manifesto:
   - Thumb: hover + click scroll
   - Seção: observer para áudio
6. Testar:
   - Mobile Safari autoplay (mudo ok)
   - `prefers-reduced-motion`
   - Resize (composer.setSize)


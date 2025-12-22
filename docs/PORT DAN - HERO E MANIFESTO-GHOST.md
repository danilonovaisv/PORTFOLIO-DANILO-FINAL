
# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais
**Páginas Principais:** Home, Sobre, Portfólio, Contato
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

----
## VISÃO GERAL

Este documento descreve **como implementar a Hero e o Manifesto** utilizando **Next.js App Router + React + TypeScript + Tailwind CSS + React Three Fiber + Framer Motion**, adaptando completamente a especificação original para o **novo conceito visual com animação WebGL inspirada no Codepen**.

> Objetivo: manter identidade premium, remover efeitos obsoletos (glass / 3D tradicional), e preparar uma base clara para evolução das animações.

---

## STACK OBRIGATÓRIO

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- three.js
- @react-three/fiber
- @react-three/drei
- Framer Motion
- Firebase Hosting
- Supabase Storage (mídia)

# **SECTION NAME: Hero**

## SECTION PURPOSE
- Criar impacto visual inicial
- Comunicar posicionamento estratégico
- Introduzir linguagem digital experimental
- Direcionar o usuário ao Manifesto

---

## CONTEÚDO (FIXO — SEM ANIMAÇÃO)
Cor do texto: `#d9dade`

```
[BRAND AWARENESS]
Design, não
é só estética.
[É intenção, é estratégia, é experiência.]
```

**Regras absolutas**
- Texto 100% estático
- Sem glassmorphism
- Sem blur
- Sem reveal
- Sem scroll binding

---

## BACKGROUND
- Cor base: `#06071f`
- Gradiente opcional:
```css
radial-gradient(circle at center, #0b0d3a 0%, #06071f 60%)
```

---

## WEBGL ATMOSFÉRICO (GHOST)

### Conceito
- WebGL atua como **atmosfera**
- Elemento etéreo (“ghost”) abstrato
- Glow, bloom e ruído analógico
- Inspirado em: https://codepen.io/filipz/pen/GgpMOEq

### Componentes
- Ghost (mesh simples + emissive)
- Background Veil (shader fullscreen)
- Pós-processamento:
  - UnrealBloomPass
  - Analog Decay (grain, scanlines, jitter)

### Interação
- Follow sutil do mouse (desktop)
- Pulso temporal leve
- Nenhuma interação com texto

---

## ARQUITETURA DE ARQUIVOS (HERO)

```
components/home/
 ├─ HomeHero.tsx
 ├─ HeroCopy.tsx
 ├─ ManifestoThumb.tsx
 ├─ GhostStage.tsx
 └─ webgl/
     ├─ GhostCanvas.tsx
     ├─ Ghost.tsx
     ├─ BackgroundVeil.tsx
     └─ postprocessing/AnalogDecayPass.ts
```

---

## Z-INDEX
- z-0 → Canvas WebGL
- z-20 → Conteúdo (texto + thumb)


## RESPONSABILIDADE DE CADA ARQUIVO

### `HomeHero.tsx`
- Container da Hero
- Controla camadas (WebGL / Conteúdo)
- Define altura mínima (100vh desktop / 85vh mobile)

### `HeroCopy.tsx`
- Renderiza texto estático
- Centralização absoluta
- Nenhuma dependência de animação

### `GhostStage.tsx`
- Boundary client-only
- Import dinâmico do Canvas
- Evita SSR

### `GhostCanvas.tsx`
- `<Canvas />` fullscreen
- Setup de câmera
- Postprocessing
- Loop de animação

### `Ghost.tsx`
- Mesh principal
- Follow do mouse
- Pulso leve de emissive

### `BackgroundVeil.tsx`
- Plano fullscreen
- Shader de revelação
- Usa posição do ghost como uniform

### `AnalogDecayPass.ts`
- Shader custom
- Grain
- Scanlines
- Jitter temporal

---

## CAMADAS VISUAIS (Z-INDEX)

```
z-0   → WebGL Canvas
z-10  → Overlay gradiente (opcional)
z-20  → Conteúdo (texto + thumb)
```

---

## MANIFESTO — VÍDEO

### Regras Mantidas
- Mesmo arquivo da Hero
- Autoplay
- Loop
- Muted por padrão
- Áudio apenas quando em foco
- Sem overlays
- Sem fullscreen forçado

URL:
```
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4
```

---

## INTERAÇÃO HERO → MANIFESTO

- Clique na thumb:
  - Scroll suave até `#manifesto`
- Nenhuma transição visual agressiva
- Thumb mantém animação própria (hover/scale)

---

## ACESSIBILIDADE

- Contraste AA garantido (#d9dade sobre #06071f)
- `prefers-reduced-motion`
  - Desativa follow
  - Desativa bloom intenso
- `aria-label` em CTA e thumb
- Vídeo sempre inicia mudo

---


## PERFORMANCE & ACESSIBILIDADE (HERO)
- Canvas isolado (client-only)
- DPR máximo: 2
- Fallback CSS se WebGL falhar
- Contraste AA garantido
- `prefers-reduced-motion` respeitado


---

## NÃO NEGOCIÁVEL

- ❌ Sem glassmorphism
- ❌ Sem texto animado
- ❌ Sem 3D tradicional
- ❌ Sem overlays sobre vídeo
- ✅ WebGL como atmosfera
- ✅ Texto como âncora editorial

---

## RESULTADO ESPERADO

- Hero silenciosa, editorial e forte
- Animação como pano de fundo vivo
- Narrativa clara
- Base escalável para futuras interações


# **THUMB VIDEO Manifesto (VERSÃO FULL)**


- Autoplay
- Loop
- Muted por padrão
- Áudio apenas enquanto em foco (IntersectionObserver)
- Sem overlays
- Mesmo arquivo da Hero
---





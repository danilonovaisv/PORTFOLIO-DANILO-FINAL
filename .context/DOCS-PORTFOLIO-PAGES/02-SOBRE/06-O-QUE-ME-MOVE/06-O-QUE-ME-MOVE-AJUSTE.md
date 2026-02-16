# 6. O Que Me Move — `About Beliefed`

**Sessão: 6. O Que Me Move**  
**Versão: React + Motion (inView + animate) + R3F**  
**Stack: Next.js App Router + TypeScript + Tailwind + Framer Motion + React Three Fiber**

---

## 🛠️ STACK TÉCNICO (OBRIGATÓRIA)

- Next.js (App Router — `src/app`)
- React + TypeScript
- Tailwind CSS
- React Three Fiber + @react-three/drei + Three.js
- Framer Motion (`inView` + `animate`)
- Supabase Storage
- Firebase Hosting

---

## 1. VISÃO GERAL

Sessão manifesto emocional que revela o `"porquê"` do Ghost Design.  
Objetivo: gerar vínculo, presença e diferenciação conceitual.

- Altura base desktop: `~140vh`  
- Altura mobile: fluida (`>120vh`)  
- Fundo base inicial: `#040013`

---

## 2. ARQUITETURA EM CAMADAS (OBRIGATÓRIO)

A sessão é estruturada em camadas independentes para controle de animação, scroll-triggered e reset.

| Camada | Responsabilidade                               | Observação |
|--------|-----------------------------------------------|-----------|
| Camada 0 — Background Layer | Responsável por troca de cores | Fica abaixo de tudo, controlada via `scroll progress` com interpolação suave; animação sempre reversível (scroll para cima/baixo), sem repaints bruscos |
| Camada 1 — Background Overlay Transition Layer | Camada auxiliar para transição `crossfade` entre cores | Evita flicker; `opacity` animada sincronizada com a entrada e a saída das frases, em resposta ao scroll |
| Camada 2 — BeliefFixedHeader (Sticky) | Header fixo no topo | `z-index` acima do BG; independente das trocas de cor; frase sai sincronizada com a saída do último texto animado; não participa do morph final |
| Camada 3 — Texto Rotativo | Textos animados que rotacionam | Vive dentro do container principal; controla o `timing` da troca de cores; cada frase é um elemento observado via `inView`, entrando e saindo com animação de `opacity` + `transform` gatilhada por scroll usando `animate` |
| Camada 4 — Manifesto Final (Morphing Layer) | Texto final `"ISSO É GHOST DESIGN"` | Aparece no clímax, acima do Ghost; controla intensificação do Ghost |
| Camada 5 — Ghost 3D (Canvas Layer) | Modelo 3D do Ghost | `z-index` acima do BG e de todos os textos; alinhado ao centro do texto (não da viewport); nunca absoluto na viewport; obedece o container pai |

---

## 3. SISTEMA DE TROCA DE CORES DO BACKGROUND

### 3.1 Paleta Sequencial

**Ordem obrigatória de cores (mantida):**

1. `bg-bluePrimary` (`hsl(230, 85%, 30%)`)  
2. `bg-purpleDetails` (`hsl(270, 80%, 40%)`)  
3. `bg-pinkDetails` (`hsl(330, 85%, 50%)`)  
4. `bg-bluePrimary`  
5. `bg-purpleDetails`  
6. `bg-pinkDetails`  
7. `bg-bluePrimary` (retorna ao início)

A troca de fundo **não é uma transição discreta** (jump de uma cor para outra), mas um sistema de **interpolação contínua** controlada por `scroll progress`, usando **duas camadas (Camada 0 + Camada 1)** trabalhando em conjunto para criar um efeito de absorção emocional, em sincronia com a **entrada e saída** das frases — usando `inView` para detecção e `animate` para transições.

- ✅ **Tipo de animação (BG):**  
  - Interpolação contínua de cor em `HSL` **+** `crossfade overlay`  
  - Totalmente **bidirecional** (subir/descer scroll restaura estados)  
  - Temporalmente vinculada à **visibilidade do texto** (entrada/saída), não a timers fixos

---

### 3.2 Estrutura de Camadas (BG)

| Camada  | Papel                                  | Animação (scroll-triggered) |
|---------|----------------------------------------|-----------------------------|
| Camada 0 (`bg-layer`) | Fundo base — recebe a cor final interpolada | `backgroundColor` interpolado em `HSL`, controlado por `scrollYProgress` da área de manifesto |
| Camada 1 (`overlay-layer`) | Camada de transição — evita flicker e cortes bruscos | `opacity: 0 → 1 → 0` sincronizada com entrada/saída de cada frase usando `animate`; atua como um `fade over` suave entre cores consecutivas |

- A **Camada 0** guarda o estado "estável" de cor da sessão.  
- A **Camada 1** é usada durante a transição entre cores, acompanhando o intervalo em que a nova frase entra em cena (animação via `animate`) e a anterior sai (reversão via cleanup function).

> 📌 A Camada 1 **é obrigatória**: sem ela, a troca de cor pode causar flash/jank em Safari/Android, especialmente quando o scroll é rápido ou os elementos entram e saem do viewport com muita frequência.

---

### 3.3 Lógica de Interpolação (Core do Sistema)

A cor **não** muda de forma instantânea (`#253EFF → #8A00FF`), mas por **interpolação linear** entre duas cores, controlada **pelo progresso do bloco** de frase — seguindo a mesma lógica do exemplo de `scroll-triggered` da Motion: quando o elemento entra em viewport (detectado via `inView`), animamos de um estado inicial para um final usando `animate`; quando sai, **revertemos** usando a cleanup function.

#### Fórmula geral

```javascript
const t = clamp((scrollProgress - start) / duration, 0, 1) // 0 → 1 dentro do bloco
const color = lerp(colorPrev, colorNext, ease(t))
```

- `start`: início do bloco (`ex: 0.14`)
- `duration`: intervalo do bloco (`ex: 0.14`)
- `ease(t)`: curva suave, ex: `[0.17, 0.55, 0.55, 1]` (cubic bezier)
- `lerp(a, b, t)`: interpolação em `HSL` (recomendado) para transições naturais

#### Comportamento tipo scroll-triggered (inView + animate)

- **Entrada da frase (element enters viewport - detectado via `inView`):**  
  - `opacity: 1` (de `0` definido no CSS inicial)
  - `x: [-100, 0]` (desktop) ou `y: [60, 0]` (mobile) — animado via `animate`
  - `backgroundColor` inicia interpolação de `colorPrev` para `colorNext` via `useScroll` + `useTransform`
  
- **Saída da frase (element leaves viewport - cleanup function do `inView`):**  
  - Frase anima de volta para um estado "oculto" via `animate`:
    - `opacity: 0`
    - `x: -100` (desktop) ou `y: 60` (mobile)
  - BG volta "de forma coerente" para a cor relacionada à nova frase que entra  
  - O sistema é **reversível**: se o usuário rolar para cima, a frase volta a entrar, e a cor do BG volta a acompanhar o movimento.

#### Exemplo prático (entre frase 1 e 2)

- `scrollProgress = 0.14` → começa transição `bluePrimary → purpleDetails`
- `scrollProgress = 0.196` (≈ 40% do bloco) → cor em ~60% da interpolação → cor já dominante
- `scrollProgress = 0.28` → transição completa → `bg-purpleDetails` estabilizado

> Mantido: **"Quando a frase está 40% visível, a cor atinge 60% da interpolação."**  
> Ajuste: essa regra passa a ser **estritamente vinculada à entrada/saída do elemento usando `inView` + `animate`**, de forma reversível, em vez de depender de um tempo fixo.

---

### 3.4 Sincronização com o Texto — Versão Desktop (inView + animate DETALHADA)

A **visibilidade da frase** é o gatilho da animação, usando `inView` para detecção e `animate` para execução:

- Quando a frase **entra no viewport** (detectado via `inView`):
  - `animate` executa: `opacity: 1`, `x: [-100, 0]`
  - Duração: `0.9s`
  - Easing: `[0.17, 0.55, 0.55, 1]`
  
- Quando a frase **sai do viewport** (cleanup function):
  - `animate` executa reverso: `opacity: 0`, `x: -100`
  - Mesma duração e easing
  
- Todo o processo é **automático e reversível**

#### Linha do tempo Desktop (em termos de progress, não timer absoluto)

| Momento | Texto                             | Cor (BG)                           | Comportamento Visual |
|---------|-----------------------------------|------------------------------------|----------------------|
| `t = 0.00` | `"Um vídeo que respira."` é considerado **off-screen** | BG: `#040013` (base)              | Texto está com `opacity: 0`, `transform: translateX(-100px)` (CSS inicial) |
| `t ~ entrada` (frase cruza limiar de viewport - `inView` detecta) | `animate` executa: `opacity: 1`, `x: [-100, 0]` | BG inicia interpolação `#040013 → #253EFF` via `useScroll` | Animação slide-in da esquerda com fade, duração 0.9s |
| `t ≈ 0.056` (40% da visibilidade da frase) | Texto 40% visível no topo          | Cor em ~60% interpolada           | Texto continua animação de entrada |
| `t = 0.14` (frase totalmente "em cena") | Texto 100% visível, animação completa | Cor 100% estabilizada (`#253EFF`) | BG estável; texto permanece fixo com `opacity: 1`, `x: 0` |
| `t > 0.14` (início da saída da frase - elemento sai do viewport) | Cleanup function executa: `animate` com `opacity: 0`, `x: -100` | Cor já começa a interpolar para próxima (`#253EFF → #8A00FF`) | Frase anterior desliza para a esquerda e desaparece, próxima entra. Processos são independentes |

**Detalhes Técnicos Desktop (ajustados ao padrão Motion inView + animate):**

- **Entrada:**
  ```javascript
  inView('.phrase-element', (element) => {
    animate(element, 
      { opacity: 1, x: [-100, 0] },
      { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
    )
    
    // Cleanup: executado quando sai do viewport
    return () => {
      animate(element,
        { opacity: 0, x: -100 },
        { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
      )
    }
  })
  ```

- O BG acompanha essa entrada/saída com interpolação contínua via `useScroll` + `useTransform`, usando `ease` suave.  
- Não há componentes `motion.div` com `initial/animate/exit`: tudo é feito via CSS inicial + `inView` + `animate`.

---

### 3.5 Sincronização com o Texto — Versão Mobile (inView + animate DETALHADA)

No mobile, a referência visual e de movimento é mantida, mas adaptada ao layout:

#### Linha do tempo Mobile

| Momento | Texto                             | Cor (BG)                           | Comportamento Visual |
|---------|-----------------------------------|------------------------------------|----------------------|
| `t = 0.00` | `"Um vídeo que respira."` fora da área ativa | BG: `#040013` (base)              | Texto está com `opacity: 0`, `transform: translateY(60px)` (CSS inicial) |
| Ao entrar no viewport (`inView` detecta) | `animate` executa: `opacity: 1`, `y: [60, 0]` | BG inicia interpolação `#040013 → #253EFF` | Texto surge centralizado a 20% do rodapé, com leve movimento de baixo para cima |
| `t ≈ 0.056` (40% da frase visível) | Texto 40% visível                  | BG em ~60% da interpolação        | Texto mantém posição centralizada, animação continua |
| `t = 0.14` (frase 100% visível) | Texto totalmente visível, animação completa | BG estabilizado em `#253EFF`      | Texto parado, centralizado a 20% do rodapé |
| A partir de `t > 0.14` (saída da frase - elemento sai do viewport) | Cleanup function executa: `animate` com `opacity: 0`, `x: 100` | BG inicia interpolação `#253EFF → #8A00FF` | Frase atual desliza para a direita e desaparece; próxima entra com animação de baixo para cima |

**Detalhes Técnicos Mobile (alinhados ao comportamento inView + animate):**

- **Entrada:**
  ```javascript
  inView('.phrase-element-mobile', (element) => {
    animate(element,
      { opacity: 1, y: [60, 0] },
      { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
    )
    
    // Cleanup: saída pela direita
    return () => {
      animate(element,
        { opacity: 0, x: 100 },
        { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
      )
    }
  })
  ```

- **Posicionamento:**  
  - Texto fica **centralizado** na tela, a `20%` da distância do rodapé via CSS (`bottom: 20%`).
  
- **Saída (direita):**  
  - Quando o bloco sai da área de foco, a cleanup function anima para a direita com fade.
  - Esse movimento é **reversível**: se o usuário rolar de volta, o `inView` detecta reentrada e executa a animação de entrada novamente.

- **BG:**  
  - Mantém a mesma lógica de interpolação da versão desktop via `useScroll` + `useTransform`.

---

### 3.6 Por que usar duas camadas? (Camada 0 + Camada 1)

| Problema                                              | Solução                                                                                 |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Transição direta de `backgroundColor` causa flash em Safari/Android | Usar Camada 1 (overlay) para fazer `crossfade`: `opacity: 0 → 1 → 0` via `animate`, escondendo o corte brusco |
| Mudança abrupta quebra o "efeito de absorção"        | Overlay atua como véu suave entre as cores, garantindo continuidade visual              |
| Scroll reverso causa "jump" se a interpolação não for bidirecional | Com `useScroll` + `useTransform`, a cor volta naturalmente ao estado anterior ao rolar para cima |

> 💡 Dica de implementação:  
> - `will-change: background-color` na Camada 0  
> - `contain: paint` para evitar repaints desnecessários

---

### 3.7 Exemplo de Implementação (HSL + inView + animate)

```typescript
// Função de interpolação HSL (evita tons estranhos em RGB)
const lerpHsl = (
  h1: number, s1: number, l1: number,
  h2: number, s2: number, l2: number,
  t: number
) => {
  const h = ((h2 - h1 + 360) % 360) * t + h1
  const s = s1 * (1 - t) + s2 * t
  const l = l1 * (1 - t) + l2 * t
  return `hsl(${h}, ${s}%, ${l}%)`
}

// Dentro do useEffect para detectar frases
useEffect(() => {
  const cleanup = inView('.phrase-element', (element) => {
    // Anima entrada
    animate(element,
      { opacity: 1, x: [-100, 0] },
      { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
    )
    
    // Retorna cleanup para reverter quando sair
    return () => {
      animate(element,
        { opacity: 0, x: -100 },
        { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
      )
    }
  })
  
  return cleanup
}, [])
```

Mantida a conclusão:  
- Controlada por `useScroll` para BG (não por timer fixo)  
- Sincronizada com a **entrada e saída** do texto via `inView` + `animate`  
- Implementada com duas camadas para evitar flicker  
- Bidirecional (subir/descer scroll mantém coerência visual)

---

## 4. ANIMAÇÕES — SCROLL BIDIRECIONAL

Todas as animações **devem funcionar para**:

- Scroll para baixo (entrada natural dos elementos via `inView` + `animate`)  
- Scroll para cima (saída reversa — cleanup function do `inView` executa animação reversa)

**Regras (ajustadas ao padrão inView + animate Motion):**

- Não usar animações irreversíveis (tudo precisa poder "desfazer" com cleanup function).  
- Usar `useScroll` + `useTransform` para BG (normalizado `0 → 1`).  
- Usar `inView` para detectar entrada/saída de elementos de texto.
- Usar `animate` para executar animações (não `motion` components com `initial/animate/exit`).
- Não usar `timers` para eventos principais:
  - As transições principais (entrada/saída de texto) são **reativas ao scroll via `inView`**.
  - Timers podem ser usados **apenas** para microdetalhes, como wobble automático do Ghost.

---

## 5. RESET TOTAL AO SAIR DA SESSÃO

Quando a sessão:

- Sai completamente da viewport (detectado via `IntersectionObserver` no container principal)  
  **OU**  
- `scrollYProgress` retorna a `< 0.05`

Todos os estados devem resetar:

- Todas as frases voltam ao estado inicial (`opacity: 0`, `transform` inicial)
- Ghost `scale` volta para `1`  
- Ghost rotação zera  
- Intensidade de `wobble` volta ao padrão base  
- Background volta para `#040013`  
- Overlay `opacity = 0`  
- Manifesto final invisível  
- Morph resetado

> ⚠️ Isso garante reexecução perfeita ao reentrar na sessão, exatamente como no exemplo de scroll-triggered, em que o elemento volta ao estado inicial quando sai de cena.

---

## 6. GHOST 3D — COMPORTAMENTO COMPLETO

### Estado Inicial

- `scale: 1`  
- Rotação leve em `Y`  
- Flutuação base  
- Sem intensificação

### Durante Frases

- Follow cursor (desktop)  
- Scroll influencia rotação em `Y`  
- Leve deslocamento em `Z`, vinculado ao `scrollYProgress`  

### Após `0.8` de scroll progress

- `scale: 1 → 1.1`  
- `wobble` intensifica  
- Resposta ao scroll aumenta

### No Manifesto Final

- Centraliza horizontal e verticalmente  
- Intensidade máxima  
- Pequeno avanço no eixo `Z`

### Ao Sair da Sessão

- Tudo retorna ao estado inicial (reset descrito na seção 5)

---

## 7. ORDEM DE ENTRADA DOS ELEMENTOS

### Sequência cronológica — Versão Desktop

1. BG inicial visível  
2. `BeliefFixedHeader` detectado via `inView`, animado com `animate`
3. Ghost entra com a primeira frase (estado inicial suave)  
4. Primeira troca de cor inicia simultaneamente com a **entrada scroll-triggered via `inView`** do texto  
5. Frases rotativas continuam, cada uma:
   - Detectada via `inView`
   - Animada via `animate` com `opacity: 1`, `x: [-100, 0]`
   - Saindo via cleanup function com `opacity: 0`, `x: -100`
   - Sempre de forma reversível se o usuário rolar para cima  
6. Intensificação gradual do Ghost conforme `scrollYProgress`  
7. Manifesto final surge:
   - Detectado via `inView`, animado via `animate`
8. Ghost escala + centraliza (clímax)  
9. Scroll continua → elementos saem com cleanup functions  
10. Reset total ao sair da sessão

### Sequência cronológica — Versão Mobile

1. BG inicial visível  
2. `BeliefFixedHeader` detectado via `inView`, animado com `animate`
3. Ghost entra com a primeira frase  
4. Primeira troca de cor inicia simultaneamente com a **entrada scroll-triggered via `inView`** do texto  
5. Texto fica **centralizado** a `20%` da distância do rodapé  
6. Frases rotativas continuam, cada uma:
   - Detectada via `inView`
   - Animada via `animate` com `opacity: 1`, `y: [60, 0]`
   - Saindo via cleanup function com `opacity: 0`, `x: 100` (direita)
   - Reversível: ao rolar para cima, o `inView` detecta reentrada e executa animação de entrada novamente
7. Intensificação gradual do Ghost conforme scroll  
8. Manifesto final surge (via `inView` + `animate`)
9. Ghost escala + centraliza  
10. Scroll continua → elementos saem via cleanup functions  
11. Reset total ao sair da sessão

---

## 8. MANIFESTO FINAL — MORPHING

Texto fixo:

> `ISSO É GHOST DESIGN.`

**Especificações (mantidas):**

- Cada linha independente  
- Pequeno espaçamento entre linhas  
- Animação via `inView` + `animate`:
  - `opacity: 1` (de `0`)
  - `y: [40, 0]` (entrada de cima para baixo)
  - `duration: 0.9`
  - `easing: [0.17, 0.55, 0.55, 1]`
- Ghost intensifica no momento exato em que `"GHOST"` completa a animação

**Integração com scroll-triggered:**

- O manifesto é detectado via `inView` quando sua área entra em viewport.  
- A animação de entrada (`opacity` + `y`) é executada via `animate`.  
- Ao sair da área de viewport (cleanup function), o manifesto:
  - Reverte: `opacity: 0`, `y: 40`
  - Mantendo a reversibilidade do sistema.

---

## 9. COMPORTAMENTO MOBILE ESPECÍFICO

### Posicionamento do Texto

- CSS inicial: `opacity: 0`, `transform: translateY(60px)`
- Ao entrar (via `inView`): `animate` executa `opacity: 1`, `y: [60, 0]`
- Mantém posição centralizada, a `20%` da distância do rodapé da tela via CSS (`bottom: 20%`)
- Texto **não se move verticalmente** durante sua exibição (já está na posição final após animação)
- Ao sair (cleanup function): `animate` executa `opacity: 0`, `x: 100` (desliza para a direita)

### Sincronização BG-Texto Mobile

- A transição de cores mantém a mesma lógica de interpolação da versão desktop via `useScroll` + `useTransform`
- A sincronia é calculada com base no `scroll progress`, independente da animação de texto
- A troca de cores acontece de forma contínua e suave, enquanto os textos entram/saem via `inView` + `animate`

### Ghost 3D Mobile

- Mantém alinhamento com o texto (não com a viewport)  
- Ghost flutua levemente em torno do texto centralizado  
- Durante a saída do texto (para a direita), o Ghost acompanha suavemente a direção, podendo ter leve deslocamento em `x` sincronizado com o `scrollYProgress` do bloco

### Observação Importante

> A animação mobile **não é** uma versão reduzida da desktop, mas uma adaptação específica que mantém a essência emocional do design, respeitando as expectativas de mobile.  
> A saída pela direita cria um fluxo mais natural para telas menores, enquanto os movimentos seguem a lógica de **inView + animate com cleanup reversível**, como no exemplo utilizado de referência.

---

## 10. PERFORMANCE

- Preload do GLB  
- `Suspense` com fallback  
- Evitar re-render do Canvas  
- Hooks isolados:
  - `useBeliefsScrollSync` (apenas para BG via `useScroll`)
  - `useRotatingPhrases` (dados das frases)
  - `useGhostWobble` (animação do Ghost)
- Animações de texto via `inView` + `animate` (mais performático que motion components)

---

## 11. ACESSIBILIDADE

- `section aria-labelledby`  
- `canvas aria-label`  
- Sem focus trap  
- Contraste `AA/AAA`
- Elementos com estado inicial `opacity: 0` devem ter `aria-hidden="true"` até entrarem no viewport

---

---

# 🧑‍💻 IMPLEMENTAÇÃO TÉCNICA — React + Motion (inView + animate) + R3F

---

## 📂 Estrutura de Arquivos (Next.js App Router)

```
src/
├── app/
│   └── page.tsx
├── components/
│   └── sections/
│       └── AboutBelief/
│           ├── index.tsx                    // Componente principal
│           ├── BeliefBackground.tsx         // Camada 0 + Camada 1 (BG + Overlay)
│           ├── BeliefFixedHeader.tsx        // Camada 2 (Header sticky)
│           ├── BeliefRotatingPhrases.tsx    // Camada 3 (Textos rotativos)
│           ├── BeliefManifesto.tsx          // Camada 4 (Manifesto final)
│           ├── BeliefGhost3D.tsx            // Camada 5 (Canvas R3F)
│           └── types.ts                     // Tipos TypeScript
├── hooks/
│   ├── useBeliefsScrollSync.ts              // Hook de sincronização de scroll
│   ├── useRotatingPhrases.ts                // Hook de controle de frases
│   └── useGhostWobble.ts                    // Hook de animação do Ghost
└── utils/
    └── colorInterpolation.ts                // Funções de interpolação HSL
```

---

## 1️⃣ TIPOS TypeScript

**`src/components/sections/AboutBelief/types.ts`**

```typescript
export interface ColorPalette {
  h: number
  s: number
  l: number
}

export interface PhraseData {
  text: string
  colorFrom: ColorPalette
  colorTo: ColorPalette
  start: number // scroll progress start (0-1)
  duration: number // scroll progress duration
}
```

---

## 2️⃣ UTILIDADES — Interpolação de Cores HSL

**`src/utils/colorInterpolation.ts`**

```typescript
export interface HSL {
  h: number
  s: number
  l: number
}

/**
 * Interpolação linear entre dois valores
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t
}

/**
 * Clamp: limita valor entre min e max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Interpolação HSL entre duas cores
 * Retorna string no formato hsl(h, s%, l%)
 */
export const lerpHSL = (
  colorFrom: HSL,
  colorTo: HSL,
  t: number
): string => {
  const tClamped = clamp(t, 0, 1)
  
  // Interpolação de Hue (considera o ângulo circular 0-360)
  let h1 = colorFrom.h
  let h2 = colorTo.h
  let hDiff = h2 - h1
  
  // Escolhe o caminho mais curto no círculo de cores
  if (hDiff > 180) hDiff -= 360
  if (hDiff < -180) hDiff += 360
  
  const h = (h1 + hDiff * tClamped + 360) % 360
  const s = lerp(colorFrom.s, colorTo.s, tClamped)
  const l = lerp(colorFrom.l, colorTo.l, tClamped)

  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`
}

/**
 * Calcula o progresso normalizado dentro de um bloco
 */
export const getBlockProgress = (
  scrollProgress: number,
  start: number,
  duration: number
): number => {
  return clamp((scrollProgress - start) / duration, 0, 1)
}
```

---

## 3️⃣ HOOK — Sincronização de Scroll (BG Apenas)

**`src/hooks/useBeliefsScrollSync.ts`**

```typescript
import { useRef } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { PhraseData } from '@/components/sections/AboutBelief/types'
import { lerpHSL, getBlockProgress } from '@/utils/colorInterpolation'

export const useBeliefsScrollSync = (phrases: PhraseData[]) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Hook useScroll do Motion — monitora scroll progress (0 → 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'] // Mapeia a seção inteira
  })

  /**
   * Calcula a cor do background baseada no scroll progress
   */
  const backgroundColor = useTransform<number, string>(
    scrollYProgress,
    (progress) => {
      // Encontra a frase ativa com base no progress
      for (let i = 0; i < phrases.length; i++) {
        const phrase = phrases[i]
        const blockEnd = phrase.start + phrase.duration

        if (progress >= phrase.start && progress < blockEnd) {
          // Calcula t dentro do bloco (0 → 1)
          const t = getBlockProgress(progress, phrase.start, phrase.duration)
          return lerpHSL(phrase.colorFrom, phrase.colorTo, t)
        }
      }

      // Cor base se não está em nenhum bloco
      return 'hsl(230, 85%, 30%)' // bluePrimary
    }
  )

  /**
   * Calcula opacidade do overlay (crossfade)
   */
  const overlayOpacity = useTransform<number, number>(
    scrollYProgress,
    (progress) => {
      for (let i = 0; i < phrases.length; i++) {
        const phrase = phrases[i]
        const blockEnd = phrase.start + phrase.duration

        if (progress >= phrase.start && progress < blockEnd) {
          const t = getBlockProgress(progress, phrase.start, phrase.duration)
          
          // Fade in na primeira metade, fade out na segunda
          if (t < 0.5) {
            return t * 2 // 0 → 1
          } else {
            return (1 - t) * 2 // 1 → 0
          }
        }
      }
      return 0
    }
  )

  /**
   * Calcula scale do Ghost (aumenta após 0.8)
   */
  const ghostScale = useTransform<number, number>(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 1, 1.1]
  )

  return {
    containerRef,
    scrollYProgress,
    backgroundColor,
    overlayOpacity,
    ghostScale
  }
}
```

---

## 4️⃣ HOOK — Controle de Frases Rotativas

**`src/hooks/useRotatingPhrases.ts`**

```typescript
import { PhraseData, ColorPalette } from '@/components/sections/AboutBelief/types'

// Paleta de cores (mantida conforme especificação)
const bluePrimary: ColorPalette = { h: 230, s: 85, l: 30 }
const purpleDetails: ColorPalette = { h: 270, s: 80, l: 40 }
const pinkDetails: ColorPalette = { h: 330, s: 85, l: 50 }

export const useRotatingPhrases = (): PhraseData[] => {
  // Textos mantidos conforme documento original
  const texts = [
    "Um vídeo que respira.",
    "Uma marca que pulsa.",
    "Um clique que ecoa.",
    "Uma ideia que voa.",
    "Um pixel que dança.",
    "Uma história que gruda.",
    "Um frame que para o mundo."
  ]

  // Sequência de cores (mantida)
  const colorSequence = [
    bluePrimary,
    purpleDetails,
    pinkDetails,
    bluePrimary,
    purpleDetails,
    pinkDetails,
    bluePrimary
  ]

  // Divide o scroll progress em blocos de 0.14 (aprox 14% cada frase)
  const blockDuration = 0.14

  return texts.map((text, index) => ({
    text,
    colorFrom: colorSequence[index],
    colorTo: colorSequence[index + 1] || bluePrimary,
    start: index * blockDuration,
    duration: blockDuration
  }))
}
```

---

## 5️⃣ COMPONENTE — Background (Camada 0 + Camada 1)

**`src/components/sections/AboutBelief/BeliefBackground.tsx`**

```typescript
'use client'

import { motion, MotionValue } from 'framer-motion'

interface BeliefBackgroundProps {
  backgroundColor: MotionValue<string>
  overlayOpacity: MotionValue<number>
}

export const BeliefBackground = ({
  backgroundColor,
  overlayOpacity
}: BeliefBackgroundProps) => {
  return (
    <>
      {/* Camada 0 — Background base com interpolação de cor */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor,
          willChange: 'background-color'
        }}
        aria-hidden="true"
      />

      {/* Camada 1 — Overlay para crossfade suave */}
      <motion.div
        className="fixed inset-0 -z-9 bg-black/20"
        style={{
          opacity: overlayOpacity,
          willChange: 'opacity'
        }}
        aria-hidden="true"
      />
    </>
  )
}
```

---

## 6️⃣ COMPONENTE — Fixed Header (Camada 2)

**`src/components/sections/AboutBelief/BeliefFixedHeader.tsx`**

```typescript
'use client'

import { inView, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

export const BeliefFixedHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return

    // Seta estado inicial via CSS
    const element = headerRef.current
    element.style.opacity = '0'
    element.style.transform = 'translateY(-20px)'

    // Usa inView do Motion para detectar entrada
    const unsubscribe = inView(
      element,
      (entry) => {
        // Anima entrada
        animate(
          entry.target,
          { opacity: 1, y: [-20, 0] },
          { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
        )
        
        // Cleanup: reverte quando sair
        return () => {
          animate(
            entry.target,
            { opacity: 0, y: -20 },
            { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
          )
        }
      },
      { amount: 0.5 }
    )

    return () => unsubscribe()
  }, [])

  return (
    <div
      ref={headerRef}
      className="sticky top-0 z-20 flex items-center justify-center py-8"
    >
      <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
        O Que Me Move
      </h2>
    </div>
  )
}
```

---

## 7️⃣ COMPONENTE — Frases Rotativas (Camada 3)

**`src/components/sections/AboutBelief/BeliefRotatingPhrases.tsx`**

```typescript
'use client'

import { inView, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { PhraseData } from './types'

interface BeliefRotatingPhrasesProps {
  phrases: PhraseData[]
  isMobile: boolean
}

export const BeliefRotatingPhrases = ({
  phrases,
  isMobile
}: BeliefRotatingPhrasesProps) => {
  return (
    <div className="relative z-10">
      {phrases.map((phrase, index) => (
        <PhraseBlock
          key={index}
          phrase={phrase}
          isMobile={isMobile}
        />
      ))}
    </div>
  )
}

interface PhraseBlockProps {
  phrase: PhraseData
  isMobile: boolean
}

const PhraseBlock = ({ phrase, isMobile }: PhraseBlockProps) => {
  const phraseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!phraseRef.current) return

    const element = phraseRef.current

    // Estado inicial via CSS (crítico para o padrão inView + animate)
    element.style.opacity = '0'
    if (isMobile) {
      element.style.transform = 'translateY(60px)'
    } else {
      element.style.transform = 'translateX(-100px)'
    }

    // Detecta quando a frase entra/sai do viewport (scroll-triggered)
    const unsubscribe = inView(
      element,
      (entry) => {
        // Anima entrada
        if (isMobile) {
          animate(
            entry.target,
            { opacity: 1, y: [60, 0] },
            { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
          )
        } else {
          animate(
            entry.target,
            { opacity: 1, x: [-100, 0] },
            { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
          )
        }
        
        // Cleanup: reverte quando sair
        return () => {
          if (isMobile) {
            // Mobile: sai pela direita
            animate(
              entry.target,
              { opacity: 0, x: 100 },
              { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
            )
          } else {
            // Desktop: volta para a esquerda
            animate(
              entry.target,
              { opacity: 0, x: -100 },
              { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
            )
          }
        }
      },
      { 
        amount: 0.5, // Threshold: 50% visível
        margin: '0px 0px -20% 0px' // Ajusta zona de ativação
      }
    )

    return () => unsubscribe()
  }, [isMobile])

  return (
    <div
      ref={phraseRef}
      className={`
        flex items-center justify-center
        min-h-screen w-full
        ${isMobile ? 'text-center px-8' : 'text-left px-16'}
      `}
      style={isMobile ? { position: 'relative', bottom: '20%' } : {}}
    >
      <p className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight">
        {phrase.text}
      </p>
    </div>
  )
}
```

---

## 8️⃣ COMPONENTE — Manifesto Final (Camada 4)

**`src/components/sections/AboutBelief/BeliefManifesto.tsx`**

```typescript
'use client'

import { inView, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

export const BeliefManifesto = () => {
  const manifestoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!manifestoRef.current) return

    const element = manifestoRef.current

    // Estado inicial
    element.style.opacity = '0'
    element.style.transform = 'translateY(40px)'

    // Detecta entrada
    const unsubscribe = inView(
      element,
      (entry) => {
        // Anima entrada
        animate(
          entry.target,
          { opacity: 1, y: [40, 0] },
          { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
        )
        
        // Cleanup: reverte quando sair
        return () => {
          animate(
            entry.target,
            { opacity: 0, y: 40 },
            { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
          )
        }
      },
      { amount: 0.7 }
    )

    return () => unsubscribe()
  }, [])

  return (
    <div
      ref={manifestoRef}
      className="min-h-screen flex items-center justify-center z-30"
    >
      <div className="text-center space-y-4">
        <ManifestoLine text="ISSO É" delay={0.1} />
        <ManifestoLine text="GHOST" delay={0.3} />
        <ManifestoLine text="DESIGN." delay={0.5} />
      </div>
    </div>
  )
}

interface ManifestoLineProps {
  text: string
  delay: number
}

const ManifestoLine = ({ text, delay }: ManifestoLineProps) => {
  const lineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!lineRef.current) return

    const element = lineRef.current
    element.style.opacity = '0'

    // Aguarda delay e anima
    const timeout = setTimeout(() => {
      animate(
        element,
        { opacity: 1 },
        { duration: 0.6, easing: [0.17, 0.55, 0.55, 1] }
      )
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <p
      ref={lineRef}
      className="text-6xl md:text-8xl lg:text-9xl font-black text-white"
    >
      {text}
    </p>
  )
}
```

---

## 9️⃣ COMPONENTE — Ghost 3D (Camada 5)

**`src/components/sections/AboutBelief/BeliefGhost3D.tsx`**

```typescript
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { MotionValue } from 'framer-motion'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

interface BeliefGhost3DProps {
  ghostScale: MotionValue<number>
  scrollYProgress: MotionValue<number>
}

export const BeliefGhost3D = ({
  ghostScale,
  scrollYProgress
}: BeliefGhost3DProps) => {
  const [scale, setScale] = useState(1)

  // Subscreve ao MotionValue para atualizar o state
  useEffect(() => {
    const unsubscribe = ghostScale.on('change', (latest) => {
      setScale(latest)
    })
    return () => unsubscribe()
  }, [ghostScale])

  return (
    <div className="

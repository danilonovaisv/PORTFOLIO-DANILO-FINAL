# O Que Me Move — "About Beliefed" (Versão Ajustada v3 — 2026-04-22)

🎯 **Objetivo**
Construir a sessão manifesto "O Que Me Move" como uma experiência scroll-driven cinematográfica usando:
- Motion (https://motion.dev)
- `useScroll` + `inView()` para detectar entrada no viewport
- `animate()` + `useTransform` para animações suaves
- Interpolação contínua de background em HSL
- Sistema de camadas z-index
- Ghost 3D com React Three Fiber (frameloop="demand")
- Sincronização emocional entre texto e cor

🧠 **Stack Obrigatória**
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Motion (`useScroll`, `useTransform`, `inView`, `animate`, `useReducedMotion`)
- React Three Fiber 9 + drei + three.js 0.184
- Firebase Hosting
- Supabase Storage (assets GLB)

---

## 🏗 Arquitetura em Camadas (v3 — reconciliada com código + imagens)

Ordem de pilha z-index **imutável**:

| Layer | Z-index | Componente | Papel |
|-------|---------|------------|-------|
| 0 | z-0 | BeliefBackground | Interpolação HSL de cor (scroll-driven) |
| 1 | z-10 | BeliefOverlay | Cross-fade anti-banding OLED |
| 2 | z-30 | BeliefFixedHeader | Sticky header (direita) |
| 3 | z-40 | BeliefScrollText | Frases rotativas ciano |
| 4 | z-50 | BeliefManifesto | "ISSO É / GHOST / DESIGN" |
| 5 | **z-70** | **GhostScene** | **Ghost 3D — SEMPRE acima de todas as camadas, inclusive manifesto** |

> ⚠️ Correção crítica v3: O Ghost **continua acima** do manifesto no clímax. Nas imagens de referência, o Ghost sobrepõe (parcialmente) as letras da palavra "GHOST", reforçando a identidade do sistema.

### **Camada 0 — Background Layer**
- `absolute inset-0`
- Paleta com **Deep Void** (`#040013`) no início e fim, ciclo vibrante no meio:
  1. `#040013` — Deep Void (abertura)
  2. `#0048ff` — bluePrimary — frase 1
  3. `#8705f2` — purpleDetails — frase 2
  4. `#f501d3` — pinkDetails — frase 3
  5. `#0048ff` — bluePrimary — frase 4
  6. `#8705f2` — purpleDetails — frase 5
  7. `#f501d3` — pinkDetails — frase 6
  8. `#040013` — Deep Void (clímax / saída)
- Troca via `animate(bgRef, {backgroundColor: next}, {duration: 0.9, ease: [0.17, 0.55, 0.55, 1]})` disparado por `inView('.scroll-section')` com atributo `data-index`
- **NÃO usa fade simples nem `transition: background-color`**

### **Camada 1 — Overlay Transition Layer**
- Opacidade pulsante (0 → 0.1 → 0) ancorada em 13 paradas de scroll
- Evita banding OLED durante transições de cor
- Timing: `useTransform(scrollYProgress, [...parada], [...opacidade])`
- `bg-black`, `absolute inset-0`, `z-10`, `pointer-events-none`

### **Camada 2 — BeliefFixedHeader (Sticky)**
- **Texto:**
  - "Acredito no design que muda o dia de alguém." — `font-display`, `text-sm md:text-base`, `uppercase tracking-widest`, `text-white/70`
  - "Não pelo choque, mas pela conexão." — `font-h1`, `font-bold`, `text-lg md:text-xl`, `text-white`

- **Desktop:**
  - `sticky top-0 z-30`, alinhado à direita (`items-end`)
  - Largura máxima `max-w-sm`, `text-right`
  - Entrada: `{opacity: [0, 1], x: [60, 0]}`, `duration: 0.8`, ease `GHOST_EASE`
  - Stagger entre as duas linhas: `0.08s`, cada palavra usa `SplitText` com `{opacity: [0,1], y: [12,0]}`
  - Saída: `{opacity: [1, 0], x: [0, 60]}`, `duration: 0.5`, ease `GHOST_EASE_SOFT` ao sair do viewport

- **Mobile:**
  - `sticky top-[20vh] z-30`
  - Mesma animação do desktop
  - Não disputa espaço com bloco central

### **Camada 3 — Texto Rotativo**
- **Estilo:**
  - `font-h1`, `font-bold`, cor `#4fe6ff` (blueAccent)
  - **Itálico** (identidade editorial — casa com ritmo manifesto)
  - Tamanho desktop: `clamp(2.8rem, 5.8vw, 6.3rem)`
  - Tamanho mobile: `clamp(2rem, 8vw, 3rem)`

- **Frases (ordem imutável):**
  1. "Um vídeo que respira"
  2. "Uma marca que se reconhece"
  3. "Um detalhe que fica"
  4. "Crio para gerar presença"
  5. "Mesmo quando não estou ali"
  6. "Mesmo quando ninguém percebe o esforço"

- **Comportamento:**
  - **Desktop:**
    - Cada frase em uma `<section>` com `h-[80vh]`, `flex items-center justify-start`
    - **Centralizada verticalmente à esquerda** (NÃO no rodapé)
    - Margem esquerda: `left-6 md:left-16 lg:left-24`
    - Largura máxima: `max-w-[38vw] lg:max-w-[34vw]`
    - Entrada: `animate({opacity: 1, y: [18, 0], filter: ['blur(6px)', 'blur(0px)']}, {duration: 0.9, ease: [0.17, 0.55, 0.55, 1]})` via `inView`
    - Saída: `{opacity: 0, y: -18, filter: ['blur(0px)', 'blur(6px)']}`, `duration: 0.5`, ease `GHOST_EASE`

  - **Mobile:**
    - `items-end justify-center pb-[20vh]`
    - Centralizada horizontalmente, ancorada a 20% do rodapé
    - `text-center px-6`
    - Mesma animação entrada/saída

### **Camada 4 — Manifesto Final**
- **Texto fixo (3 linhas):**
  ```
  ISSO É
  GHOST
  DESIGN
  ```
- `font-display`, `font-black`, `text-white`, `tracking-[0.03em] leading-[0.82]`
- Tamanho: `clamp(3.5rem, 16vw, 12rem)` — ocupa ~90% da tela
- Posição: `fixed inset-0 z-50 flex items-center justify-center`
- Reveal: `scrollYProgress >= 0.82`, `opacity: [0, 1, 1]` entre `[0.82, 0.9, 1.0]`
- `y: [18, 0]` entre `[0.82, 0.92]`
- `aria-live="polite"` ativado quando `isActive`
- **O Ghost (z-70) permanece visivelmente sobreposto às letras da palavra "GHOST"** — pela leitura do scroll-state, o clímax é a fusão figurativa Ghost ↔ Ghost Design

### **Camada 5 — Ghost 3D**
- **Stack técnico:**
  - **z-70 (máximo, acima do manifesto)** — decisão editorial: o Ghost é o narrador
  - Container: `sticky md:top-0 top-[20vh] h-[100dvh] w-full z-[70] pointer-events-none`
  - GLB oficial carregado via `useGLTF(getAssetUrl('site-assets/3d/ghost-v1.glb'))`
  - `frameloop="demand"` + `invalidate()` via `scrollProgress.on('change')` — zero frames desperdiçados
  - Canvas: `dpr={[1, isMobile ? 1 : 2]}`, `camera={{position: [0, 0, isMobile ? 7 : 6], fov: 35}}`

- **Entrada:**
  - Container `motion.div` — `{opacity: [0, 1], scale: [0.95, 1]}`, `duration: 1.2`, ease `[0.22, 1, 0.36, 1]`
  - Surge junto com `BeliefFixedHeader` (sticky simultâneo)

- **Flutuação constante (senoidal, determinística — sem Math.random):**
  - `floatSpeed = 0.6 + p * 0.6` (acelera com scroll)
  - `floatAmplitude = 0.036 + p * 0.03` (amplifica com scroll)
  - `floatY = sin(t * floatSpeed) * floatAmplitude`
  - Rotação Y: `sin(t * (0.4 + p*0.4)) * (0.06 + p*0.04)`

- **Scale:**
  - Desktop base: `0.95`, clímax (`p > 0.85`): `1.05` (+10%)
  - Mobile base: `0.9`, clímax: `1.0` (+10%)
  - Lerp: `scale.x += (target - scale.x) * min(delta*8, 0.15)`

- **Posicionamento / comportamento:**
  - **Desktop:**
    - Baseline: centralizado (ghost reage ao cursor, amplitude ±0.4 unidades no mundo)
    - Cursor parallax normalizado `-1 → 1`, mapeado para `±0.4`
    - `pointer-events-none` no container — cursor passa direto para o conteúdo
  - **Mobile:**
    - Baseline: **top-left** → `x: -1.2`, `y: 1.5` (world units)
    - `prefersReducedMotion`: mesma posição, sem flutuação
  - **Clímax (`p > 0.85`, desktop E mobile):**
    - `x → 0`, `y → 0` — Ghost centraliza
    - Sobrepõe visualmente a palavra "GHOST" do manifesto (composição desejada)
    - Scale +10% e flutuação mais intensa

- **Performance:**
  - Lerp cap 0.15 por frame (60fps estáveis)
  - `scene.traverse → dispose(geometry, material)` on unmount (previne WebGL leak)
  - `GhostErrorBoundary` envolve `<Canvas>`

- **Saída:**
  - Mantém z-70 durante todo o scroll
  - Sai junto com o manifesto quando a section termina (natural pelo sticky)
  - Sem animação custom de saída — container desaparece com a section

---

## 🎨 Sistema de Troca de Cor do Background

**Cadeia (8 stops, 7 transições):**
`#040013 → #0048ff → #8705f2 → #f501d3 → #0048ff → #8705f2 → #f501d3 → #040013`

🔥 **REGRA CRÍTICA**
A troca de fundo **NÃO é uma transição simples**.
**Nunca usar:**
- `transition: background-color`
- Fade entre divs simples

✅ **Implementação**
**Motion `animate()` disparado por `inView('.scroll-section')` + `data-index`**
→ `duration: 0.9`, ease `[0.17, 0.55, 0.55, 1]` (`GHOST_EASE_AMBIENT`)
→ Índice do stop = `parseInt(element.dataset.index, 10) + 1`
→ Interpolação HSL garantida pelo Motion (sem banding)
→ Overlay preto pulsa nas bordas para absorver micro-glitches OLED

---

## 🎬 Contrato de Scroll (hook central)

```typescript
// src/hooks/useBeliefsScroll.ts
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start end', 'end end'],  // CRÍTICO — não usar 'start start'
});
```

- Início: quando o **topo** da seção toca o **rodapé** da viewport (entrada antecipada)
- Fim: quando o **rodapé** da seção toca o **rodapé** da viewport
- `useReducedMotion()` nativo do Motion (não hook custom)
- `isMobile` via `matchMedia('(max-width: 767px)')` com listener

---

## 📐 Layout (corrigido — 3 colunas visuais)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [ Texto rotativo ciano ]    [ Ghost 3D ]    [ Header ]   │
│   (esquerda, vertical       (centro, sticky,   (direita,    │
│    centralizado, italic)      z-70)            sticky,      │
│                                                 z-30)       │
└─────────────────────────────────────────────────────────────┘
```

- **Ghost fica no centro do viewport**, não alinhado a um bloco de texto
- Ghost mantém `pointer-events-none` — cursor passa para o conteúdo abaixo
- `.std-grid` não se aplica aqui (seção full-bleed com stacking próprio)

---

## ⏱ Sequência Cronológica — Desktop

1. BG inicia em `#040013` (Deep Void)
2. Entrada do viewport (`scrollYProgress > 0`):
   - `BeliefFixedHeader` fade+slide-in pela direita (0.8s)
   - `GhostScene` fade+scale 0.95→1 (1.2s) — sincronizado
3. `scrollYProgress ≈ 0.1` — primeira frase entra, BG muda para `#0048ff`
4. Frases rotativas entram/saem conforme `inView` (y 18→0, blur 6→0), cor do BG acompanha
5. Ghost intensifica gradualmente (`floatSpeed`, `floatAmplitude`, rotação)
6. `scrollYProgress = 0.82` — `BeliefManifesto` começa a fade-in
7. `scrollYProgress > 0.85` — Ghost escala +10% e centraliza (`x=0, y=0`), sobrepondo letras "GHOST"
8. `scrollYProgress = 0.9..1.0` — manifesto 100% visível, BG retorna para `#040013`
9. Scroll continua → section termina, sticky solta, próxima seção entra

## 📱 Sequência Cronológica — Mobile

1. BG inicia em `#040013`
2. `BeliefFixedHeader` entra em `top-[20vh]` + `GhostScene` entra em top-left (`x: -1.2, y: 1.5`)
3. Primeira frase aparece centralizada a 20% do rodapé
4. Ghost permanece top-left durante todo o scroll das frases
5. Mesma progressão de cor (`0.1 → 0.82`)
6. `p > 0.85` — Ghost centraliza (`x=0, y=0`), escala +10%
7. Manifesto fade-in acima do Ghost (mas Ghost em z-70 mantém sobreposição visual nas letras "GHOST")
8. BG retorna para `#040013`

---

## 🎭 Personalidade (refinada)

- **Cinemática** com ritmo editorial
- **Emocional** na sincronia cor+texto+ghost
- **Profunda** na mensagem
- **Elegante** na execução técnica
- **Fluida** nas transições (ease ambient `[0.17, 0.55, 0.55, 1]` para BG, ease ghost `[0.22, 1, 0.36, 1]` para UI)
- **Escura** na paleta (`#040013` é o norte)
- **Nunca agressiva** — lerp cap 0.15, offsets máx 18px, scale máx +10%

**Sensação final:**
*O design respira. O Ghost sente. A cor absorve significado.*

---

## 🏁 Resultado Esperado (verificável contra código)

✅ **Texto e cor são um único sistema**
- BG troca via `inView('.scroll-section')` no mesmo frame da frase entrar
- Cada frase tem `data-index` que indexa a paleta

✅ **Ghost vive ACIMA do manifesto**
- `GhostScene` em `z-[70]`, `BeliefManifesto` em `z-50`
- No clímax, ambos em `x=0, y=0` → Ghost sobrepõe letras da palavra "GHOST"

✅ **Scroll é a força motriz**
- `useScroll({target, offset: ['start end', 'end end']})`
- `frameloop="demand"` + `invalidate()` por `scrollProgress.on('change')`

✅ **Desktop e Mobile têm ritmos distintos**
- Desktop: Ghost reage ao cursor
- Mobile: Ghost top-left fixo → centraliza no clímax

✅ **Reset é bidirecional**
- `inView` com cleanup function (`return () => ...`) re-anima ao reentrar
- Sem estado acumulado

✅ **Performance estável**
- `frameloop="demand"` + lerp cap + dispose on unmount
- FPS target > 50 conforme Ghost System

---

## 📎 Arquivos-fonte (referência cruzada)

| Comportamento | Arquivo |
|--------------|---------|
| Orquestrador | `src/components/sobre/sections/AboutBeliefs.tsx` |
| Hook de scroll | `src/hooks/useBeliefsScroll.ts` |
| Provider ↔ children | `src/components/sobre/beliefs/BeliefsScrollContext.tsx` |
| Paleta + troca | `src/components/sobre/beliefs/BeliefBackground.tsx` |
| Overlay anti-banding | `src/components/sobre/beliefs/BeliefOverlay.tsx` |
| Header sticky | `src/components/sobre/beliefs/BeliefFixedHeader.tsx` |
| Frases rotativas | `src/components/sobre/beliefs/BeliefScrollText.tsx` |
| Manifesto final | `src/components/sobre/beliefs/BeliefManifesto.tsx` |
| Ghost 3D (R3F) | `src/components/sobre/3d/GhostScene.tsx` |
| Error boundary | `src/components/sobre/3d/GhostErrorBoundary.tsx` |
| Bridge DOM↔R3F | `src/store/beliefStore.ts` (ghostIntensity) |
| Tokens de motion | `src/config/motion.ts` (GHOST_EASE, GHOST_EASE_AMBIENT) |

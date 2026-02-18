# **6. O Que Me Move — "About Beliefed"**

# 🎯 Objetivo

Construir a sessão manifesto **“O Que Me Move”** como uma experiência scroll-driven cinematográfica usando:

- Motion (<https://motion.dev>)
- `inView()` para detectar entrada no viewport
- `animate()` para animações suaves
- Interpolação contínua de background
- Sistema de camadas
- Ghost 3D com React Three Fiber
- Sincronização emocional entre texto e cor

Referência técnica obrigatória:
<https://motion.dev/tutorials/js-scroll-triggered#detect-when-elements-enter-the-viewport>

---

# 🧠 Stack Obrigatória

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Motion (`inView`, `animate`)
- React Three Fiber + drei + three.js
- Firebase Hosting
- Supabase Storage (assets)

---

# 🏗 Arquitetura em Camadas (Atualizada)

### Camada 0 — Background Layer

- absolute inset-0
- Recebe interpolação de cor via `useTransform` (MotionValue)
- **Zero React Renders** durante o scroll (Direct DOM update)
- NÃO usa fade simples

### Camada 1 — Overlay Transition Layer

- Opacity animada (0 → 1 → 0)
- Controlada via `useTransform`
- Atua como camada de absorção de flicker

### Camada 2 — BeliefFixedHeader (Sticky)

Texto:

> “Acredito no design que muda o dia de alguém. - font-Display - black - Branca
> Não pelo choque, mas pela conexão.” - font-h2 - bold - Branca

**Desktop**

- Sticky
- Alinhado visualmente ao centro
- Ancorado à direita do grid (col-span-12 items-end)
- `transform-style: preserve-3d` para evitar blur

**Mobile**

- Sticky top-right
- text-right
- Não disputa espaço com bloco central

---

### Camada 3 — Texto Rotativo

font-h1 - bold - **blueAccent** | `#4fe6ff`
Easing atualizado: `[0.17, 0.55, 0.55, 1]`
Duração: 0.8s

1. Design não é sobre estética.
2. É sobre sentimento.
3. É sobre presença.
4. É sobre criar algo que permanece.
5. Algo que respira.
6. Algo que toca.
7. Algo que muda.

---

### Camada 4 — Manifesto Final

font-Display - black - branca
Texto fixo (3 linhas) ocupando 90% da tela:

ISSO É  
GHOST  
DESIGN.

- Morphing Text
- Espaçamento pequeno entre linhas
- Forte peso visual
- Entrada sincronizada com clímax do Ghost

---

### Camada 5 — Ghost 3D

GLB oficial: `/models/ghost.glb`

**Comportamento Atualizado (R3F Manual Frame Loop):**

- **Sistema de Energia**:
  - `intensity = 1 + scroll * 2.5`
  - Amplitude e velocidade da flutuação aumentam com o scroll
- **Posicionamento**:
  - Desktop: Inicia à direita (+1.5), centraliza em 0 (Manifesto).
  - Mobile: Fixo no topo (y=1.0), centralizado (x=0).
- **Interação**:
  - Desktop: Segue mouse (lerp suave).
  - Mobile: Scroll driven (rotação Y).

---

# 🔄 LOG DE ATUALIZAÇÃO (Ghost System v3)

**Arquivos Alterados:**

- `src/components/sobre/beliefs/BeliefFixedHeader.tsx` (Blur/Sharpness Fix)
- `src/components/sobre/sections/beliefs/BeliefsBackground.tsx` (MotionValue Refactor)
- `src/components/sobre/sections/beliefs/useBeliefAnimation.ts` (Performance/useTransform)
- `src/components/sobre/sections/beliefs/GhostScene.tsx` (Manual Float/Position Logic)
- `src/components/sobre/sections/beliefs/RotatingText.tsx` (Easing spec match)

**Correções Exatas:**

- [x] Background agora usa `useTransform` para interpolação HSL frame-perfect.
- [x] Overlay e Base Color não disparam re-renders do React components.
- [x] Ghost usa oscilação manual (`Math.sin`) no `useFrame` para controle total de energia.
- [x] Texto Fixo recebeu `translateZ(0)` e `subpixel-antialiased` para nitidez máxima.
- [x] Easing do texto ajustado para `[0.17, 0.55, 0.55, 1]`.

**Critérios de Validação:**

- [ ] Desktop: Ghost alinhado à direita (visual) sem sobrepor texto ativo.
- [ ] Mobile: Ghost visível no topo, texto claro abaixo.
- [ ] Scroll: Aceleração da flutuação ("Respiração" do Ghost) audível visualmente.
- [ ] Performance: Zero layout shift durante troca de cor.

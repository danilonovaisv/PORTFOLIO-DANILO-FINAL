# **6. O Que Me Move — "About Beliefed"**

# 🎯 Objetivo

Construir a sessão manifesto **“O Que Me Move”** como uma experiência scroll-driven cinematográfica usando:

- Motion (https://motion.dev)
- `inView()` para detectar entrada no viewport
- `animate()` para animações suaves
- Interpolação contínua de background
- Sistema de camadas
- Ghost 3D com React Three Fiber
- Sincronização emocional entre texto e cor

Referência técnica obrigatória:
https://motion.dev/tutorials/js-scroll-triggered#detect-when-elements-enter-the-viewport

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

# 🏗 Arquitetura em Camadas (Obrigatória)

### Camada 0 — Background Layer

- absolute inset-0
- Recebe interpolação de cor
- Controlado por `animate()`
- NÃO usa fade simples

### Camada 1 — Overlay Transition Layer

- Opacity animada (0 → 1 → 0)
- Evita flicker
- Atua como camada de absorção

### Camada 2 — BeliefFixedHeader (Sticky)

Texto:

> “Acredito no design que muda o dia de alguém. - font-Display - black - Branca
> Não pelo choque, mas pela conexão.” - font-h2 - bold - Branca

**Desktop**

- Sticky
- Alinhado visualmente ao centro
- Ancorado à direita do grid
- text-right

**Mobile**

- Sticky top-right
- text-right
- Não disputa espaço com bloco central

---

### Camada 3 — Texto Rotativo

font-h1 - bold - **blueAccent** | `#4fe6ff`
Frases (ordem obrigatória):

1. Design não é sobre estética.
2. É sobre sentimento.
3. É sobre presença.
4. É sobre criar algo que permanece.
5. Algo que respira.
6. Algo que toca.
7. Algo que muda.

Cada frase:

- Começa invisível (`opacity: 0`)
- Levemente deslocada verticalmente
- Entra via `inView()`
- Dispara troca de cor
- Possui cleanup ao sair

---

### Camada 4 — Manifesto Final

font-Display - black - branca
exto fixo (3 linhas) ocupando 90% da tela:

ISSO É  
GHOST  
DESIGN.

- Morphing Text
- Espaçamento pequeno entre linhas
- Forte peso visual
- Entrada sincronizada com clímax do Ghost

---

### Camada 5 — Ghost 3D

GLB oficial:

https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb

Carregado via `useGLTF`.

---

# 👻 Comportamento do Ghost

- Flutuação constante
- Movimento lateral leve
- Responde ao cursor (desktop)
- Responde ao scroll (mobile)
- Nunca completamente parado

### Entrada:

- Surge junto com BeliefFixedHeader
- scale 0.95 → 1
- Fade suave

### Intensificação:

- Cada nova frase aumenta levemente energia
- Última frase:
  - Escala +10%
  - Centraliza na seção
  - Movimento mais intenso

### Saída:

- Sai junto com manifesto
- Acompanha scroll

---

# 🎨 Sistema de Troca de Cor do Background

## Ordem obrigatória de cores:

1. bg-bluePrimary -`#0048ff`- (HSL: 230, 85%, 30%)
2. bg-purpleDetails -`#8705f2`- (HSL: 270, 80%, 40%)
3. bg-pinkDetails -`#f501d3`- (HSL: 330, 85%, 50%)
4. bg-bluePrimary
5. bg-purpleDetails
6. bg-pinkDetails
7. bg-bluePrimary (retorna ao início)

---

# 🔥 REGRA CRÍTICA

A troca de fundo NÃO é uma transição simples.

Não usar:

- `transition: background-color`
- Fade entre divs simples

---

# ✅ Tipo de animação

Interpolação contínua de cor + crossfade overlay

→ A cor muda **enquanto o texto entra**, não depois.

---

# 🎬 Sincronização Detalhada

Inspirado no padrão:

```js
inView('.scroll-section pre', (element) => {
  animate(element, { opacity: 1, x: [-100, 0] }, { duration: 0.9 });
});
```

---

## Implementação Conceitual Adaptada

```ts
import { animate, inView } from 'motion';

inView('.belief-line', (element) => {
  // 1️⃣ Entrada do texto
  animate(
    element,
    { opacity: [0, 1], y: [40, 0] },
    {
      duration: 0.8,
      easing: [0.17, 0.55, 0.55, 1],
    }
  );

  // 2️⃣ Troca sincronizada do BG
  animate(
    backgroundLayer,
    { backgroundColor: nextColor },
    {
      duration: 0.9,
      easing: [0.4, 0, 0.2, 1],
    }
  );

  // 3️⃣ Overlay absorvendo a transição
  animate(overlayLayer, { opacity: [0, 1, 0] }, { duration: 0.9 });

  return () => {
    animate(element, { opacity: 0, y: 40 });
  };
});
```

---

# 🧠 Lógica de Interpolação Contínua

A cor não muda de forma discreta.

Ela é interpolada em HSL:

```
const t = progress normalizado (0 → 1)
color = lerpHSL(previousColor, nextColor, ease(t))
```

- A transição inicia no primeiro frame da entrada do texto
- Quando o texto atinge 60% de visibilidade, o BG já está ~70% interpolado
- A cor termina exatamente quando o texto termina a animação

Isso cria a sensação:

> A cor absorve a frase.

---

# 📐 Regra de Alinhamento do Ghost (Obrigatória)

Layout:

| Texto (esquerda) | Ghost (direita) |

- Ghost sempre alinhado ao centro vertical do bloco de texto
- Nunca alinhado à viewport
- Se o texto cresce, o Ghost acompanha
- Usar grid/flex com items-center

---

# ⏱ Sequência Cronológica — Desktop

1. BG inicial visível
2. BeliefFixedHeader fade-in
3. Ghost entra junto com BeliefFixedHeader
4. Primeira troca de cor inicia simultaneamente com entrada do texto
5. Frases rotativas continuam, entrando do topo
6. Intensificação gradual do Ghost
7. Manifesto final surge enquanto frase fixa sai para cima
8. Ghost escala + centraliza
9. Clímax
10. Scroll continua → elementos saem para cima
11. Reset total

---

# 📱 Sequência Cronológica — Mobile

1. BG inicial visível
2. BeliefFixedHeader fade-in
3. Ghost entra junto com BeliefFixedHeader
4. Primeira troca de cor inicia simultaneamente com entrada do texto
5. Texto centralizado a 20% da distância do rodapé
6. Frases entram com fade-in no centro
7. Texto sai pela direita ao final
8. Intensificação gradual do Ghost
9. Manifesto surge enquanto frase fixa sai para a direita
10. Ghost escala + centraliza
11. Elementos saem para a direita
12. Reset total

---

# 🎭 Personalidade da Experiência

- Cinemática
- Emocional
- Profunda
- Elegante
- Fluida
- Escura
- Nunca agressiva

Sensação final:

O design respira.  
O Ghost sente.  
A cor absorve significado.

---

# 🏁 Resultado Esperado

Uma seção onde:

- Texto e cor são um único sistema
- O BG reage no mesmo frame que o texto entra
- O Ghost vive dentro da narrativa
- Scroll é a força motriz emocional
- Desktop e Mobile possuem ritmos distintos
- Reset é perfeito e bidirecional

---

# 06. O QUE ME MOVE — "About Beliefs"

**Sessão:** 6. O Que Me Move
**Status:** Especificação Técnica Final (Ghost System v3.1)
**Conceito:** Manifesto emocional com sincronia de scroll, cor e 3D.

---

## 1. Objetivo da Página/Sessão

Esta sessão atua como o **clímax emocional** da página "Sobre". Seu objetivo é transitar da lógica (método) para o sentimento (propósito), gerando vínculo através de uma narrativa visual imersiva. Ela materializa o conceito "Você não vê o design, mas ele vê você" através de uma interação onde o ambiente (cor e 3D) reage à leitura do usuário.

---

## 2. Estrutura de Conteúdo

### 2.1 Tipografia & Textos

Todos os textos utilizam a família **TT Norms Pro** (ou _Outfit_ para Display, se configurado no token `text-display`).

- **BeliefFixedHeader (Texto Fixo):**
  - _Título (text-display):_ "ACREDITO NO DESIGN QUE MUDA O DIA DE ALGUÉM." (`text-display`, `font-black`, uppercase).
  - _Subtítulo (h2):_ "Não pelo choque, mas pela conexão." (`text-h2`, `font-bold`).
- **Rotating Phrases (Frases Rotativas):**
  - Lista de strings renderizadas sequencialmente.
  - _Estilo:_ `text-h1` (dependendo do breakpoint), cor `text-primary`.
  - _Conteúdo:_
    1. "Um vídeo que respira."
    2. "Uma marca que se reconhece."
    3. "Um detalhe que fica."
    4. "Crio para gerar presença."
    5. "Mesmo quando não estou ali."
    6. "Mesmo quando ninguém percebe o esforço."
- **Manifesto Final (Clímax):**
  - _Texto:_ "ISSO É GHOST DESIGN"
  - _Estilo:_ `text-display`, `font-black`, alinhamento central.

### 2.2 Call to Actions (CTA)

- Nesta sessão não há botões clicáveis. A ação é o **scroll**.

---

## 3. Identidade Visual (Ghost System)

### 3.1 Paleta de Cores & Tokens

A sessão utiliza uma **Paleta Sequencial** controlada por interpolação. As cores são estáticas.

- **Base:** `var(--background)` aka Void Black (`#040013`).
- **Tokens de Transição (Background):**
  1.  `var(--color-bluePrimary)` (`#0048ff`)
  2.  `var(--color-purpleDetails)` (`#8705f2`) — _Ajuste: Ghost System define Purple como exceção/detalhe._
  3.  `var(--color-pinkDetails)` (`#f501d3`)
- **Texto:** `var(--color-text)` (`#fcffff`) com excelente contraste sobre as cores saturadas.

### 3.2 Elementos 3D (Ghost Layer)

- **Modelo:** Fantasma estilizado (Shader ou GLB otimizado).
- **Iluminação:** Ambiente espectral reagindo à cor do fundo atual.

---

## 4. Interatividade & Animações

**Motor:** Framer Motion (`useScroll`, `useTransform`) + React Three Fiber.
**Easing Obrigatório:** `cubic-bezier(0.22, 1, 0.36, 1)` (Ghost Ease).

### 4.1 Arquitetura de Camadas (Z-Index)

A ordem de empilhamento é crítica para o funcionamento das máscaras e legibilidade.

| Layer | Z-Index | Componente            | Descrição                                     |
| :---- | :------ | :-------------------- | :-------------------------------------------- |
| **0** | `z-0`   | **Background Layer**  | Container que recebe a cor interpolada.       |
| **1** | `z-10`  | **BeliefFixedHeader** | Texto fixo ("Acredito no design..."). Sticky. |
| **2** | `z-20`  | **Rotating Texts**    | Frases que entram/saem. Gatilho das cores.    |
| **3** | `z-30`  | **Manifesto Final**   | Texto clímax sobrepondo tudo.                 |
| **4** | `z-40`  | **Ghost 3D Scene**    | Canvas R3F. Interage com mouse/scroll.        |

### 4.2 Lógica de Motion (Scroll-Linked)

- **Trigger:** `scrollYProgress` do container da seção (0 a 1).
- **Mapeamento:** Uso de `clamp` para isolar o tempo de cada frase.
- **Reversibilidade:** Obrigatória. O scroll para cima deve reverter a animação suavemente.

---

## 5. Responsividade

### 5.1 Desktop (≥ 1024px)

- **Layout:** Distribuído. Texto Fixo à direita, Frases à esquerda, Ghost ao centro.
- **Motion Text:** Slide vertical. Entra do topo (`y: -50px` -> `0`), sai para cima (`y: -50px`).
- **Ghost:** Segue levemente o cursor (mouse move).

### 5.2 Mobile (< 768px)

- **Layout:** Stack Vertical. Header no topo, Ghost no meio, Frases na base (20% do bottom).
- **Motion Text:** Slide lateral. Entra com Fade, sai deslizando para a **DIREITA** (`x: 100%`).
- **Ghost:** Centralizado, sem follow mouse (apenas giroscópio ou animação idle).

---

## 6. Acessibilidade & SEO

- **WCAG AA:** Contraste mínimo de 4.5:1 garantido entre texto branco e fundos coloridos (Blue/Purple/Pink).
- **Reduced Motion:** Se `prefers-reduced-motion: reduce`:
  - Desativar parallax e rotação do Ghost.
  - Trocar slides (X/Y) por Fades (Opacity) simples.
- **Semântica:** O Canvas 3D possui `aria-hidden="true"`. Os textos estão no DOM para leitores de tela.

---

## 7. Integrações e Recursos

- **Assets:** Carregamento de GLB/Texturas via `useLoader` com Suspense.
- **Estado:** Gerenciamento local ou Zustand para sincronizar o índice da frase atual com a cor do fundo.

---

## 8. Considerações Técnicas

- **Performance:** Usar `will-change: transform` nos textos. O background deve usar interpolação de cor otimizada (evitar repaints pesados).
- **Reset:** Ao sair da viewport (`amount: 0`), resetar todos os estados para garantir que a animação reinicie corretamente se o usuário voltar.

---

### SEQUÊNCIA CRONOLÓGICA (TIMELINE)

#### A. Versão Desktop

1.  **BG Inicial:** Visível (`var(--background)`).
2.  **BeliefFixedHeader:** Fade-in e fixa-se no centro.
3.  **Ghost:** Entra suavemente junto com o Header.
4.  **Texto 1:** Entra do topo. **Simultaneamente**, o BG interpolar para `bg-bluePrimary`.
5.  **Ciclo:** Frases subsequentes entram/saem (slide up). Cor muda a cada frase.
6.  **Ghost:** Intensifica wobble/rotação com o scroll.
7.  **Clímax:** "ISSO É GHOST DESIGN" surge. Header fixo sai para cima.
8.  **Final:** Ghost escala e centraliza.
9.  **Saída:** Scroll continua, elementos saem para cima. Reset total.

#### B. Versão Mobile

1.  **BG Inicial:** Visível.
2.  **BeliefFixedHeader:** Fade-in no topo.
3.  **Ghost:** Entra visível no centro.
4.  **Texto 1:** Fade-in na posição fixa centralizado quebra de linhas apnas quando necessário (20% do rodapé). Cor muda simultaneamente.
5.  **Ciclo:** Frases trocam. Saída de cada frase é um slide para a **DIREITA**.
6.  **Clímax:** Manifesto final surge. Header sai para a direita.
7.  **Final:** Ghost escala.
8.  **Saída:** Scroll continua, elementos saem para a direita. Reset total.

```

---
```

# **6. O Que Me Move — “About Beliefed”**

Sessão: 6. O Que Me Move  
Versão: Atualizada com Camadas, BG Sync, Reset e Scroll Bidirecional

---

# 1. VISÃO GERAL

Sessão manifesto emocional que revela o “porquê” do Ghost Design.  
Objetivo: gerar vínculo, presença e diferenciação conceitual.

Altura base desktop: ~140vh  
Altura mobile: fluida (>120vh)

Fundo base inicial: #040013

---

# 2. ARQUITETURA EM CAMADAS (OBRIGATÓRIO)

A sessão é estruturada em camadas independentes para controle de animação e reset.

## Camada 0 — Background Layer

- Responsável por troca de cores.
- Fica abaixo de tudo.
- Controlada via scroll progress.
- Transição suave (interpolação linear + easing suave).
- Não deve causar repaint brusco.

## Camada 1 — Background Overlay Transition Layer

- Camada auxiliar para transição crossfade entre cores.
- Evita flicker.
- Opacity animada sincronizada com entrada de frases.

## Camada 2 — BeliefFixedHeader (Sticky)

- Z-index acima do BG.
- Independente das trocas de cor.
- Não participa do morph final.

## Camada 3 — Texto Rotativo

- Vive dentro do container principal.
- Controla o timing da troca de cores.
- É o gatilho de sincronização de fundo.

## Camada 4 — Manifesto Final (Morphing Layer)

- Aparece no clímax.
- Fica acima do Ghost.
- Controla intensificação do ghost.

## Camada 5 — Ghost 3D (Canvas Layer)

- Z-index acima do BG, e todos os textos.
- Alinhado ao centro do texto (não da viewport).
- Nunca absoluto na viewport.
- Obedece o container pai.

---

# 3. SISTEMA DE TROCA DE CORES DO BACKGROUND

## Paleta Sequencial

Ordem obrigatória de cores:

1. bg-bluePrimary
2. bg-purpleDetails
3. bg-pinkDetails
4. bg-bluePrimary
5. bg-purpleDetails
6. bg-pinkDetails
7. bg-bluePrimary

A troca de fundo **não é uma transição simples de cor**, mas um **sistema de interpolação controlada por scroll progress**, com duas camadas (`Camada 0` + `Camada 1`) trabalhando em conjunto para criar um efeito de **absorção emocional**, onde a cor _muda enquanto o texto entra_, não depois.

> ✅ **Tipo de animação**:  
> **Interpolação contínua de cor + crossfade overlay**  
> → É uma **transição suave, bidirecional e temporalmente vinculada ao texto**.

---

## 🔍 **Como Funciona: Passo a Passo Técnico**

### 1. **Estrutura de Camadas (obrigatória)**

| Camada                         | Papel                                                   | Animação                                                          |
| ------------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------- |
| **Camada 0** (`bg-layer`)      | Fundo base — recebe a cor final interpolada             | `backgroundColor` animado via `gsap.to()` ou `Web Animations API` |
| **Camada 1** (`overlay-layer`) | Camada de transição — evita flicker e suaviza a mudança | `opacity: 0 → 1 → 0` sincronizada com o bloco de frase            |

> 📌 A _Camada 1_ é essencial: sem ela, a troca de cor pode causar _repaint_ visível ou _jank_ em dispositivos médios.

---

### 2. **Lógica de Interpolação (Core do Sistema)**

A cor não muda de forma discreta (ex: `#253EFF` → `#8A00FF`), mas sim por **interpolação linear entre duas cores**, controlada pelo `scrollYProgress`.

#### Fórmula geral:

```ts
const t = clamp((scrollProgress - start) / duration, 0, 1); // 0 → 1 dentro do bloco
const color = lerp(colorPrev, colorNext, ease(t));
```

- `start`: início do bloco (ex: `0.14`)
- `duration`: `0.14` (fixo para blocos 1–6)
- `ease(t)`: `power2.inOut` (suave no início e fim)
- `lerp(a, b, t)`: interpolação RGB ou HSL (recomenda-se **HSL** para transições naturais)

#### Exemplo prático (entre frase 1 e 2):

- `scrollProgress = 0.14` → começa transição de `bluePrimary` → `purpleDetails`
- `scrollProgress = 0.196` (≈ 40% do bloco) → cor está em ~60% da interpolação → **cor já dominante**
- `scrollProgress = 0.28` → transição completa → `bg-purpleDetails` estabilizado

> Isso cumpre a regra do manifesto:  
> **“Quando a frase está 40% visível, a cor atinge 60% da interpolação.”**

---

### 3. **Sincronização com o Texto (Camada 3)**

A **entrada do texto é o gatilho**, não o resultado.

| Momento                     | Texto                                             | Cor (BG)                                           |
| --------------------------- | ------------------------------------------------- | -------------------------------------------------- |
| `t = 0.00`                  | `"Um vídeo..."` inicia fade-in (`opacity: 0 → 1`) | BG inicia interpolação `#040013 → #253EFF`         |
| `t = 0.056` (~40% da frase) | Texto em 40% visível                              | Cor em ~60% interpolada                            |
| `t = 0.14`                  | Texto 100% visível                                | Cor 100% estabilizada (`#253EFF`)                  |
| `t = 0.14+ε`                | Texto 1 começa a sair                             | Cor 2 já inicia interpolação (`#253EFF → #8A00FF`) |

Essa sincronia é feita via **timeline única no GSAP** (ou `ScrollTrigger` com `scrub: 1`), onde ambos os `to()` compartilham o mesmo _offset_ de tempo.

---

### 4. **Por que usar duas camadas? (Camada 0 + Camada 1)**

| Problema                                                              | Solução                                                                                                    |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Transição direta de `backgroundColor` causa _flash_ em Safari/Android | Camada 1 (`overlay`) faz crossfade suave: `opacity: 0 → 1` durante a transição, ocultando o ponto de corte |
| Mudança abrupta quebra o “efeito de absorção”                         | Overlay com `mix-blend-mode: multiply` ou `normal` + `opacity` cria transparência gradual                  |
| Scroll reverso (para cima) causa _jump_ se não for bidirecional       | Com `scrub: 1`, a interpolação é reversível: `scrollProgress` diminuindo → cor volta ao anterior           |

> 💡 Dica de implementação:  
> Use `will-change: background-color` na Camada 0 e `contain: paint` para evitar repaints desnecessários.

---

### 5. **Exemplo de Código (GSAP + HSL Interpolação)**

```ts
// Função de interpolação HSL (evita tons estranhos em RGB)
const lerpHsl = (
  h1: number,
  s1: number,
  l1: number,
  h2: number,
  s2: number,
  l2: number,
  t: number
) => {
  const h = ((h2 - h1 + 360) % 360) * t + h1;
  const s = s1 * (1 - t) + s2 * t;
  const l = l1 * (1 - t) + l2 * t;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Na timeline:
tl.to(
  bgLayer,
  {
    backgroundColor: () =>
      lerpHsl(
        230,
        85,
        30, // bluePrimary: hsl(230,85%,30%)
        270,
        80,
        40, // purpleDetails: hsl(270,80%,40%)
        progressInBlock // t ∈ [0,1]
      ),
    duration: 0.14,
    ease: 'power2.inOut',
  },
  start
);
```

## ✅ Conclusão Técnica

A animação de troca de BG é:

- **Controlada por scroll progress** (não por timer),
- **Sincronizada com o texto em tempo real** (não após),
- **Implementada com duas camadas** para evitar flicker e garantir suavidade,
- **Bidirecional** (funciona ao subir/descer),
- **Baseada em interpolação HSL + easing suave** para fidelidade emocional.

É um sistema _reactivo_, não _temporal_ — e isso é o que torna o Ghost Design único: **a interface respira com o usuário**, não contra ele.

### Importante

A troca de cor NÃO acontece após a frase.
Ela acontece justas a entrada.

Isso cria efeito de absorção emocional.

---

# 5. ANIMAÇÕES — SCROLL BIDIRECIONAL

Todas as animações devem funcionar:

- Scroll para baixo
- Scroll para cima

## Regras

- Não usar animações irreversíveis.
- Usar scrollYProgress normalizado (0 → 1).
- Mapear intervalos com clamp.
- Não usar timers para eventos principais (apenas para rotação automática se necessário).

---

# 6. RESET TOTAL AO SAIR DA SESSÃO

Quando a sessão:

- Sai completamente da viewport (IntersectionObserver threshold 0)
  OU
- scrollYProgress retorna a 0

Todos os estados devem resetar:

- Frase volta para a primeira.
- Ghost escala volta para 1.
- Ghost rotação zera.
- Intensidade de wobble volta ao padrão base.
- Background volta para #040013.
- Overlay opacity = 0.
- Manifesto final invisível.
- Morph resetado.

⚠️ Isso garante reexecução perfeita ao reentrar na sessão.

---

# 7. GHOST 3D — COMPORTAMENTO COMPLETO

## Estado Inicial

- Scale: 1
- Rotação leve Y
- Flutuação base
- Sem intensificação

## Durante Frases

- Follow cursor (desktop)
- Scroll influencia rotação Y
- Leve deslocamento Z

## Após 0.8 scroll progress

- Scale: 1 → 1.1
- Wobble intensifica
- Resposta ao scroll aumenta

## No Manifesto Final

- Centraliza horizontal e verticalmente
- Intensidade máxima
- Pequeno avanço no eixo Z

## Ao Sair da Sessão

- Tudo retorna ao estado inicial

---

# 8. ORDEM DE ENTRADA DOS ELEMENTOS

Sequência cronológica:

1. BG inicial visível
2. BeliefFixedHeader fade-in
3. Ghost entra com primeira frase
4. Primeira troca de cor inicia
5. Frases rotativas continuam
6. Intensificação gradual do ghost
7. Manifesto final surge
8. Ghost escala + centraliza
9. Clímax
10. Scroll continua → elementos saem
11. Reset total

---

# 9. MANIFESTO FINAL — MORPHING

Texto fixo:

ISSO É  
GHOST  
DESIGN.

- Cada linha independente.
- Pequeno espaçamento.
- "GHOST" em bluePrimary.
- Opacity 0 → 1
- Y 40 → 0

Ghost intensifica no momento exato em que "GHOST" completa o morph.

---

# 10. PERFORMANCE

- Preload do GLB.
- Suspense com fallback.
- Evitar re-render do Canvas.
- Hooks isolados:
  - useBeliefsScrollSync
  - useRotatingPhrases
  - useGhostWobble

---

# 11. ACESSIBILIDADE

- section aria-labelledby
- Canvas aria-label
- Sem focus trap
- Contraste AA/AAA

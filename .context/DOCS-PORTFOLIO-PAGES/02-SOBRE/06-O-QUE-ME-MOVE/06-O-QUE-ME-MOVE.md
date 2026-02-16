
# 6. O Que Me Move — "About Beliefed"

**Sessão:** 6. O Que Me Move  
**Versão:** Atualizada com Camadas, BG Sync, Reset, Scroll Bidirecional + Animações Desktop/Mobile Detalhadas

---

## 1. VISÃO GERAL

Sessão manifesto emocional que revela o "porquê" do Ghost Design.

**Objetivo:** gerar vínculo, presença e diferenciação conceitual.

**Altura base desktop:** ~140vh  
**Altura mobile:** fluida (>120vh)  
**Fundo base inicial:** #040013

---

## 2. ARQUITETURA EM CAMADAS (OBRIGATÓRIO)

A sessão é estruturada em camadas independentes para controle de animação e reset.

| Camada | Responsabilidade | Observação |
|--------|------------------|------------|
| **Camada 0** — Background Layer | Responsável por troca de cores | Fica abaixo de tudo, controlada via scroll progress, transição suave (interpolação linear + easing suave), não deve causar repaint brusco |
| **Camada 1** — Background Overlay Transition Layer | Camada auxiliar para transição crossfade entre cores | Evita flicker, opacity animada sincronizada com entrada de frases |
| **Camada 2** — BeliefFixedHeader (Sticky) | Header fixo no topo | Z-index acima do BG, independente das trocas de cor, frase sai sincronizada com a saída do último texto animado, não participa do morph final |
| **Camada 3** — Texto Rotativo | Textos animados que rotacionam | Vive dentro do container principal, controla o timing da troca de cores, é o gatilho de sincronização de fundo |
| **Camada 4** — Manifesto Final (Morphing Layer) | Texto final "ISSO É GHOST DESIGN" | Aparece no clímax, fica acima do Ghost, controla intensificação do ghost |
| **Camada 5** — Ghost 3D (Canvas Layer) | Modelo 3D do Ghost | Z-index acima do BG e todos os textos, alinhado ao centro do texto (não da viewport), nunca absoluto na viewport, obedece o container pai |

---

## 3. SISTEMA DE TROCA DE CORES DO BACKGROUND

### Paleta Sequencial

Ordem obrigatória de cores:

1. `bg-bluePrimary` (HSL: 230, 85%, 30%)
2. `bg-purpleDetails` (HSL: 270, 80%, 40%)
3. `bg-pinkDetails` (HSL: 330, 85%, 50%)
4. `bg-bluePrimary`
5. `bg-purpleDetails`
6. `bg-pinkDetails`
7. `bg-bluePrimary` (retorna ao início)

A troca de fundo não é uma transição simples de cor, mas um sistema de interpolação controlada por scroll progress, com duas camadas (`Camada 0` + `Camada 1`) trabalhando em conjunto para criar um efeito de absorção emocional, onde a cor muda **enquanto o texto entra**, não depois.

**✅ Tipo de animação:** Interpolação contínua de cor + crossfade overlay  
→ É uma transição suave, bidirecional e temporalmente vinculada ao texto.

---

### 🔍 Como Funciona: Passo a Passo Técnico

#### 1. Estrutura de Camadas (obrigatória)

| Camada | Papel | Animação |
|--------|-------|----------|
| **Camada 0** (bg-layer) | Fundo base — recebe a cor final interpolada | `backgroundColor` animado via `gsap.to()` ou Web Animations API |
| **Camada 1** (overlay-layer) | Camada de transição — evita flicker e suaviza a mudança | `opacity: 0 → 1 → 0` sincronizada com o bloco de frase |

📌 **A Camada 1 é essencial:** sem ela, a troca de cor pode causar repaint visível ou jank em dispositivos médios.

---

#### 2. Lógica de Interpolação (Core do Sistema)

A cor não muda de forma discreta (ex: `#253EFF` → `#8A00FF`), mas sim por interpolação linear entre duas cores, controlada pelo `scrollYProgress`.

**Fórmula geral:**
```javascript
const t = clamp((scrollProgress - start) / duration, 0, 1); // 0 → 1 dentro do bloco
const color = lerp(colorPrev, colorNext, ease(t));
```

- `start`: início do bloco (ex: `0.14`)
- `duration`: `0.14` (fixo para blocos 1–6)
- `ease(t)`: `power2.inOut` (suave no início e fim)
- `lerp(a, b, t)`: interpolação RGB ou HSL (recomenda-se HSL para transições naturais)

**Exemplo prático (entre frase 1 e 2):**
- `scrollProgress = 0.14` → começa transição de `bluePrimary` → `purpleDetails`
- `scrollProgress = 0.196` (≈ 40% do bloco) → cor está em ~60% da interpolação → cor já dominante
- `scrollProgress = 0.28` → transição completa → `bg-purpleDetails` estabilizado

Isso cumpre a regra do manifesto: *"Quando a frase está 40% visível, a cor atinge 60% da interpolação."*

---

#### 3. Sincronização com o Texto — Versão Desktop (DETALHADA)

A entrada do texto é o gatilho, não o resultado.

| Momento | Texto | Cor (BG) | Comportamento Visual |
|---------|-------|----------|----------------------|
| **t = 0.00** | "Um vídeo que respira." inicia fade-in (opacity: 0 → 1) | BG inicia interpolação #040013 → #253EFF | Texto aparece no topo da tela |
| **t = 0.056** (~40% da frase) | Texto em 40% visível | Cor em ~60% interpolada | Texto mantém posição no topo |
| **t = 0.14** | Texto 100% visível | Cor 100% estabilizada (#253EFF) | Texto permanece no topo |
| **t = 0.14+ε** | Texto 1 começa a sair (para cima) | Cor 2 já inicia interpolação (#253EFF → #8A00FF) | Texto desliza para cima suavemente |
| **t = 0.28** | Texto 2 100% visível | Cor 100% estabilizada (#8A00FF) | Novo texto aparece no topo |

**Detalhes Técnicos Desktop:**
- A animação de entrada do texto é **simultânea** com a transição de cores, não sequencial
- O texto sempre entra **do topo da tela** na versão desktop
- A transição de cores ocorre durante a **entrada** do texto, não após sua total exibição
- A interpolação de cores usa HSL para transições mais naturais (evitando tons estranhos do RGB)
- A escala de tempo da animação é ajustada para corresponder ao ritmo do vídeo de referência (0.2s para cada frase)
- A saída do texto é por deslize **para cima**, criando um fluxo contínuo de entrada/saída

---

#### 4. Sincronização com o Texto — Versão Mobile (DETALHADA)

| Momento | Texto | Cor (BG) | Comportamento Visual |
|---------|-------|----------|----------------------|
| **t = 0.00** | "Um vídeo que respira." inicia fade-in (opacity: 0 → 1) | BG inicia interpolação #040013 → #253EFF | Texto aparece centralizado, a 20% do rodapé |
| **t = 0.056** (~40% da frase) | Texto em 40% visível | Cor em ~60% interpolada | Texto mantém posição centralizada |
| **t = 0.14** | Texto 100% visível | Cor 100% estabilizada (#253EFF) | Texto permanece parado, centralizado a 20% do rodapé |
| **t = 0.14+ε** | Texto 1 começa a sair (para a direita) | Cor 2 já inicia interpolação (#253EFF → #8A00FF) | Texto desliza para a direita suavemente |
| **t = 0.28** | Texto 2 100% visível | Cor 100% estabilizada (#8A00FF) | Novo texto aparece centralizado |

**Detalhes Técnicos Mobile:**
- O texto entra com a mesma animação de fade-in (opacity: 0 → 1)
- **Posicionamento:** Texto fica centralizado na tela, a **20% da distância do rodapé** (conforme imagem "ghost-3D-position-mobile2.png")
- **Saída:** Texto sai pela direita da tela (em vez de deslizar para cima)
- **Comportamento do BG:** Mantém a mesma sincronia com o texto, mas com a animação de saída do texto para a direita
- **Ghost 3D:** Mantém alinhamento centralizado com o texto, não com a viewport
- A transição de cores mantém a mesma lógica de interpolação que na versão desktop
- A sincronia é calculada com base no scroll progress, não na posição do texto

---

#### 5. Por que usar duas camadas? (Camada 0 + Camada 1)

| Problema | Solução |
|----------|---------|
| Transição direta de `backgroundColor` causa flash em Safari/Android | Camada 1 (overlay) faz crossfade suave: `opacity: 0 → 1` durante a transição, ocultando o ponto de corte |
| Mudança abrupta quebra o "efeito de absorção" | Overlay com `mix-blend-mode: multiply` ou `normal` + `opacity` cria transparência gradual |
| Scroll reverso (para cima) causa jump se não for bidirecional | Com `scrub: 1`, a interpolação é reversível: `scrollProgress` diminuindo → cor volta ao anterior |

💡 **Dica de implementação:**
Use `will-change: background-color` na Camada 0 e `contain: paint` para evitar repaints desnecessários.

---

#### 6. Exemplo de Código (GSAP + HSL Interpolação)

```typescript
// Função de interpolação HSL (evita tons estranhos em RGB)
const lerpHsl = (
  h1: number, s1: number, l1: number,
  h2: number, s2: number, l2: number,
  t: number
) => {
  const h = ((h2 - h1 + 360) % 360) * t + h1;
  const s = s1 * (1 - t) + s2 * t;
  const l = l1 * (1 - t) + l2 * t;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Na timeline:
tl.to(bgLayer, {
  backgroundColor: () => lerpHsl(
    230, 85, 30,   // bluePrimary: hsl(230,85%,30%)
    270, 80, 40,   // purpleDetails: hsl(270,80%,40%)
    progressInBlock // t ∈ [0,1]
  ),
  duration: 0.14,
  ease: "power2.inOut"
}, start);
```

---

### ✅ Conclusão Técnica

A animação de troca de BG é:

- Controlada por scroll progress (não por timer)
- Sincronizada com o texto em tempo real (não após)
- Implementada com duas camadas para evitar flicker e garantir suavidade
- Bidirecional (funciona ao subir/descer)
- É um sistema reactivo, não temporal — e isso é o que torna o Ghost Design único: a interface respira com o usuário, não contra ele.

**Importante:** A troca de cor NÃO acontece após a frase. Ela acontece **justo na entrada**. Isso cria efeito de absorção emocional.

---

## 4. ANIMAÇÕES — SCROLL BIDIRECIONAL

Todas as animações devem funcionar:

- Scroll para baixo
- Scroll para cima

### Regras

- Não usar animações irreversíveis
- Usar scrollYProgress normalizado (0 → 1)
- Mapear intervalos com clamp
- Não usar timers para eventos principais (apenas para rotação automática se necessário)

---

## 5. RESET TOTAL AO SAIR DA SESSÃO

Quando a sessão:

- Sai completamente da viewport (IntersectionObserver threshold 0)
- OU scrollYProgress retorna a 0

**Todos os estados devem resetar:**

- Frase volta para a primeira
- Ghost escala volta para 1
- Ghost rotação zera
- Intensidade de wobble volta ao padrão base
- Background volta para #040013
- Overlay opacity = 0
- Manifesto final invisível
- Morph resetado

⚠️ **Isso garante reexecução perfeita ao reentrar na sessão.**

---

## 6. GHOST 3D — COMPORTAMENTO COMPLETO

### Estado Inicial

- Scale: 1
- Rotação leve Y
- Flutuação base
- Sem intensificação

### Durante Frases

- Follow cursor (desktop)
- Scroll influencia rotação Y
- Leve deslocamento Z

### Após 0.8 scroll progress

- Scale: 1 → 1.1
- Wobble intensifica
- Resposta ao scroll aumenta

### No Manifesto Final

- Centraliza horizontal e verticalmente
- Intensidade máxima
- Pequeno avanço no eixo Z

### Ao Sair da Sessão

- Tudo retorna ao estado inicial

---

## 7. ORDEM DE ENTRADA DOS ELEMENTOS

### Sequência cronológica — Versão Desktop:

1. BG inicial visível
2. BeliefFixedHeader fade-in no topo
3. Ghost entra com primeira frase
4. Primeira troca de cor inicia **simultaneamente** com a entrada do texto
5. Frases rotativas continuam, cada uma entrando do topo
6. Intensificação gradual do ghost conforme scroll
7. Manifesto final surge — ao mesmo tempo em que a frase fixa sai para cima
8. Ghost escala + centraliza
9. Clímax
10. Scroll continua → elementos saem para cima
11. Reset total

### Sequência cronológica — Versão Mobile:

1. BG inicial visível
2. BeliefFixedHeader fade-in
3. Ghost entra com primeira frase
4. Primeira troca de cor inicia **simultaneamente** com a entrada do texto
5. Texto fica centralizado a 20% da distância do rodapé
6. Frases rotativas continuam, cada uma entrando com fade-in e posicionando-se no centro
7. Texto sai pela direita ao final de sua exibição
8. Intensificação gradual do ghost conforme scroll
9. Manifesto final surge — ao mesmo tempo em que a frase fixa sai para a direita
10. Ghost escala + centraliza
11. Scroll continua → elementos saem para a direita
12. Reset total

---

## 8. MANIFESTO FINAL — MORPHING

**Texto fixo:**

```
ISSO É
GHOST
DESIGN.
```

**Especificações:**

- Cada linha independente
- Pequeno espaçamento entre linhas
- Opacity 0 → 1
- Y 40 → 0 (entrada de cima para baixo)
- Ghost intensifica no momento exato em que "GHOST" completa o morph

---

## 9. COMPORTAMENTO MOBILE ESPECÍFICO

### Posicionamento do Texto:

- Texto entra com fade-in (opacity: 0 → 1)
- Mantém posição centralizada, a **20% da distância do rodapé** da tela
- Texto não se move verticalmente durante sua exibição
- Ao final de sua exibição, desliza para a direita até sair da tela

### Sincronização BG-Texto Mobile:

- A transição de cores mantém a mesma lógica de interpolação que na versão desktop
- A sincronia é calculada com base no scroll progress, não na posição do texto
- A troca de cores acontece durante a entrada do texto, não após

### Ghost 3D Mobile:

- Mantém alinhamento com o texto (não com a viewport)
- O ghost flutua levemente em torno do texto centralizado
- Durante a saída do texto (para a direita), o ghost acompanha suavemente a direção

### Observação Importante:

A animação mobile não é uma versão reduzida da desktop, mas uma adaptação específica que mantém a essência emocional do design enquanto respeita as limitações e expectativas do formato mobile. A saída pela direita cria um fluxo natural para telas menores, onde o movimento vertical pode causar confusão.

---

## 10. PERFORMANCE

- Preload do GLB
- Suspense com fallback
- Evitar re-render do Canvas
- Hooks isolados:
  - `useBeliefsScrollSync`
  - `useRotatingPhrases`
  - `useGhostWobble`

---

## 11. ACESSIBILIDADE

- `section aria-labelledby`
- `Canvas aria-label`
- Sem focus trap
- Contraste AA/AAA
```


# O Que Me Move — "About Beliefed" (Versão Otimizada)

## 🎯 Objetivo

Criar a sessão **manifesto "O Que Me Move"** como uma experiência scroll‑driven cinematográfica, usando:

- **Motion** (`inView`, `animate`)
- **React Three Fiber** (Ghost 3D)
- **Next.js (App Router) + TypeScript**
- **Tailwind CSS**
- **Firebase Hosting** + **Supabase Storage** (assets)

---

## 🏗 Arquitetura em Camadas

| Camada                             | Responsabilidade                   | Detalhes de Implementação                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0 – Background Layer**           | Interpolação contínua de cor (HSL) | `absolute inset-0` <br> Controlado por `animate()` com easing `[0.4,0,0.2,1]` <br> Inicia no **primeiro frame** da entrada do texto e termina quando o texto finaliza                                                                                                                                                                                                                                                                                                                                                       |
| **1 – Overlay Transition Layer**   | Cross‑fade para evitar flicker     | Opacidade `0 → 1 → 0` (duração 0.9 s) <br> Timing function `[0.4,0,0.2,1]`                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **2 – BeliefFixedHeader (Sticky)** | Texto de apoio fixo                | **Desktop**: `sticky top-0 z-30`, centralizado verticalmente e alinhado à direita da seção, animação `x: [100,0]` + fade‑in <br> **Mobile**: `sticky top-[20vh] right-0 z-30`, mesma animação                                                                                                                                                                                                                                                                                                                               |
| **3 – Texto Rotativo**             | Frases principais                  | Fonte `h1` bold, cor `#4fe6ff` (blueAccent) <br> **Desktop**: posicionado à esquerda da seção (15% margem), cada palavra em uma linha separada; entra pela esquerda com leve fade‑in sincronizado à troca de background e sai acompanhando o scroll junto com o background <br> **Mobile**: centralizado horizontalmente a 20% do bottom da seção; frases entram pela esquerda com fade‑in, quebras de linha apenas quando necessário; se posiciona no centro com movimento contínuo e sai para a direita ao final da seção |
| **4 – Manifesto Final**            | Texto fixo "ISS0 É GHOST DESIGN."  | 3 linhas, `font-display`, cor branca, efeito _morphing_ com espaçamento reduzido                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **5 – Ghost 3D**                   | Modelo GLB animado                 | `useGLTF` → `ghost.glb` <br> Z‑index máximo, flutuação constante, resposta a cursor (desktop) e scroll (mobile) <br> **Desktop**: totalmente centralizado na seção (centro horizontal e vertical) <br> **Mobile**: posicionado a 20% do topo da seção e alinhado à esquerda; na última tela, transiciona para o centro da seção <br> Entrada `scale: 0.95 → 1` + fade (1.2 s) <br> Intensificação a cada frase; última frase: `scale +10%` e centralização                                                                  |

---

## 🎨 Sistema de Troca de Cor do Background

**Ordem Cíclica (obrigatória)**

1. `bg-bluePrimary` – `#0048ff` (HSL 230, 85 %, 30 %)
2. `bg-purpleDetails` – `#8705f2` (HSL 270, 80 %, 40 %)
3. `bg-pinkDetails` – `#f501d3` (HSL 330, 85 %, 50 %)
4. `bg-bluePrimary`
5. `bg-purpleDetails`
6. `bg-pinkDetails`
7. `bg-bluePrimary` (loop)

### Regra Crítica

- **Não** usar `transition: background-color` nem fade simples entre divs.
- Utilizar **interpolação contínua em HSL** + **cross‑fade overlay**.
- A cor começa a mudar no **primeiro frame** da entrada do texto e termina exatamente quando a animação do texto finaliza (≈ 60 % de visibilidade → 70 % de interpolação).

---

## 🔥 **Frase do Texto Rotativo**

**Características:**

- font-h1 - bold - `#4fe6ff` - **blueAccent**
- Frases (ordem obrigatória):
  1. "Um vídeo que respira."
  2. "Uma marca que se reconhece."
  3. "Um detalhe que fica."
  4. "Crio para gerar presença."
  5. "Mesmo quando não estou ali."
  6. "Mesmo quando ninguém percebe o esforço."

---

## 📐 Layout do Ghost

### Desktop

```
| Ghost (centro absoluto da seção) | BeliefFixedHeader (centro-direita) |
```

- Ghost totalmente centralizado na seção (horizontal e vertical).
- Posicionado com **grid/flex** (`place-items-center`) e **z‑index** máximo.
- Mantém posição **centralizada** durante toda a sequência, independente do scroll.

### Mobile

```
| Ghost (topo-esquerda) | BeliefFixedHeader (topo-direita) |
```

- Ghost posicionado a **20% do topo** da seção e **alinhado à esquerda**.
- Na **última tela**, transiciona suavemente para o **centro da seção**.
- Posicionado com **absolute/flex** e **z‑index** máximo.

---

## ⏱ Sequência Cronológica

### Desktop

1. BG inicial visível.
2. `BeliefFixedHeader` fade‑in (opacidade 0.3 → 1), posicionado no centro‑direita da seção.
3. Ghost entra totalmente centralizado na seção (scale 0.95 → 1).
4. Troca de cor do background sincronizada com a entrada da primeira frase.
5. Frases rotativas entram pela esquerda com leve fade‑in, cada palavra em uma linha separada, movimento contínuo.
6. Ghost intensifica a cada frase.
7. Manifesto final surge enquanto a última frase sai acompanhando o scroll junto com o background.
8. Ghost escala +10 % e mantém centralização.
9. Clímax: movimento mais intenso do Ghost.
10. Scroll continua → elementos saem para cima.
11. Reset total com interpolação contínua.

### Mobile

1. BG inicial visível.
2. `BeliefFixedHeader` fade‑in.
3. Ghost entra posicionado a 20 % do topo da seção, alinhado à esquerda (z‑index máximo).
4. Troca de cor do background sincronizada com a entrada da primeira frase.
5. Frases entram pela esquerda com fade‑in, quebras de linha apenas quando necessário, se posicionam centralizadas a 20 % do bottom, movimento contínuo.
6. Ghost intensifica a cada frase.
7. Texto sai para a direita ao final da seção.
8. Manifesto surge enquanto a última frase sai para a direita.
9. Ghost escala +10 % e transiciona para o centro da seção.
10. Elementos saem para a direita.
11. Reset total.

---

## 🎬 Código de Animação (Motion)

```tsx
import { animate, inView } from 'motion';

inView('.belief-line', { margin: '-30% 0px 0px 0px' }, (element) => {
  const isMobile = window.innerWidth <= 767;

  // 1️⃣ Entrada do texto
  animate(
    element,
    {
      opacity: [isMobile ? 0 : 0.3, 1],
      x: [-100, 0],
    },
    {
      duration: 0.8,
      easing: [0.22, 1, 0.36, 1],
      delay: 0.2,
    }
  );

  // 2️⃣ Troca de cor do background (HSL)
  animate(
    backgroundLayer,
    { backgroundColor: nextColor },
    {
      duration: 0.9,
      easing: [0.4, 0, 0.2, 1],
    }
  );

  // 3️⃣ Overlay cross‑fade
  animate(overlayLayer, { opacity: [0, 1, 0] }, { duration: 0.9 });

  // 4️⃣ Saída diferenciada
  return () => {
    const exitX = isMobile ? 100 : -100;
    animate(
      element,
      { opacity: 0, x: exitX },
      {
        duration: 0.6,
        easing: [0.25, 0.46, 0.45, 0.94],
      }
    );
  };
});
```

---

## 📦 Componentes Principais (Next.js + TS)

```tsx
// components/Background.tsx
export const Background = () => (
  <div className="absolute inset-0 pointer-events-none" id="bg-layer" />
);

// components/Overlay.tsx
export const Overlay = () => (
  <div className="absolute inset-0 bg-black opacity-0" id="overlay-layer" />
);

// components/BeliefHeader.tsx
export const BeliefHeader = () => (
  <header className="sticky top-0 z-30 text-right md:text-right">
    <p className="font-display text-white">
      Acredito no design que muda o dia de alguém.
    </p>
    <p className="font-h2 font-bold text-white">
      Não pelo choque, mas pela conexão.
    </p>
  </header>
);

// components/RotatingText.tsx
export const RotatingText = ({ phrases }: { phrases: string[] }) => (
  <div className="relative">
    {phrases.map((p, i) => (
      <p
        key={i}
        className="font-h1 font-bold text-[#4fe6ff] belief-line"
        style={{ '--i': i } as React.CSSProperties}
      >
        {p}
      </p>
    ))}
  </div>
);

// components/Ghost.tsx
export const Ghost = () => {
  const { scene } = useGLTF(
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost.glb'
  );
  return <primitive object={scene} />;
};
```

---

## ✅ Resultado Verificável

| Critério                      | Como validar                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| **Texto + cor sincronizados** | Quando o texto atinge 60 % de visibilidade, o background já está ~70 % interpolado. |
| **Interpolação contínua**     | `animate(backgroundLayer, { backgroundColor })` com easing customizado.             |
| **Ghost sempre acima**        | `z-index` máximo (`z-[999]`) e `position: absolute` dentro do container.            |
| **Scroll como motor**         | `inView` com margem `-30%` dispara animações mesmo em scroll rápido.                |
| **Desktop vs Mobile**         | Breakpoints (`md:`) garantem comportamentos distintos (movimento contínuo vs fixo). |
| **Reset bidirecional**        | Função de cleanup (`return () => { … }`) restaura estado ao rolar para cima.        |

---

## 🛠 Estado Implementado (2026-02-20)

- `BeliefFixedHeader` permanece `sticky`, mas sem empurrar o fluxo (`mb-[-100vh]`), permitindo a primeira frase aparecer no topo da seção e estabilizando o E2E.
- Desktop:
  - texto da coluna esquerda realinhado para centro vertical da viewport;
  - largura de bloco refinada para leitura editorial (`max-w-[38vw]` / `lg:max-w-[34vw]`);
  - fonte ampliada (`clamp(2.8rem, 5.8vw, 6.3rem)`).
- Mobile:
  - camada de texto rotativo renderiza com `md:hidden` (sem depender de hook de viewport);
  - timeline ajustada para a primeira frase já entrar visível no início da seção.
- Ghost 3D:
  - reset contínuo por progresso de scroll (sem estado “preso” em fase final);
  - fallback defensivo para `ghost.glb` quando URL dinâmica vier como `ghost-transformed.glb` inválida.
- Verificação:
  - suíte E2E completa passou (`9 passed`), incluindo `about-beliefs.spec.ts`.

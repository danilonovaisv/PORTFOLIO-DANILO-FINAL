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

| Camada                             | Responsabilidade                   | Detalhes de Implementação                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0 – Background Layer**           | Interpolação contínua de cor (HSL) | `absolute inset-0` <br> Controlado por `animate()` com easing `[0.4,0,0.2,1]` <br> Inicia no **primeiro frame** da entrada do texto e termina quando o texto finaliza                                                                                                                                                                                                                                                                                                                                                                   |
| **1 – Overlay Transition Layer**   | Cross‑fade para evitar flicker     | Opacidade `0 → 1 → 0` (duração 0.9 s) <br> Timing function `[0.4,0,0.2,1]`                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **2 – BeliefFixedHeader (Sticky)** | Texto de apoio fixo                | **Desktop**: `sticky top-0 z-30`, centralizado verticalmente e alinhado à direita da seção, animação `x: [100,0]` + fade‑in <br> **Mobile**: `sticky top-[20vh] right-0 z-30`, mesma animação                                                                                                                                                                                                                                                                                                                                           |
| **3 – Texto Rotativo**             | Frases principais                  | Fonte `h1` bold, cor `#4fe6ff` (blueAccent) <br> **Desktop**: posicionado à esquerda da seção (15% margem), cada palavra em uma linha separada; entra pela esquerda com leve fade‑in sincronizado à troca de background e sai acompanhando o scroll junto com o background <br> **Mobile**: centralizado horizontalmente a 20% do bottom da seção; frases entram pela esquerda com fade‑in, quebras de linha apenas quando necessário; se posiciona no centro com movimento contínuo e sai para a direita ao final da seção             |
| **4 – Manifesto Final**            | Texto fixo "ISS0 É GHOST DESIGN."  | 3 linhas, `font-display`, cor branca, efeito _morphing_ com espaçamento reduzido                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **5 – Ghost 3D**                   | Modelo GLB animado                 | `useGLTF` → `ghost.glb` <br> Z‑index máximo, flutuação constante, resposta a cursor (desktop) e scroll (mobile) <br> **Desktop**: totalmente centralizado na seção (centro horizontal e vertical) <br> **Mobile**: posicionado a 20% do topo da seção e alinhado à esquerda; na última tela, transiciona para o centro da seção <br> Entrada `scale: 0.95 → 1` + fade (1.2 s) <br> Em mobile, a escala base do Ghost fica **10% menor** para preservar respiro entre header, texto e canvas; última frase: `scale +10%` e centralização |

### Registro de Layer

- Estado validado em `2026-03-15`.
- A implementação da sessão em `src/components/sobre/sections/AboutBeliefs.tsx` trata o Ghost 3D como **camada autoritativa superior**.
- Wrapper externo do Ghost: `absolute inset-0 z-[90] pointer-events-none`.
- Wrapper sticky do Ghost: `sticky top-0 z-[90]`.
- Container interno do canvas: `relative z-[90]`.
- Todas as demais camadas da sessão devem permanecer abaixo desse teto:
  - conteúdo scrollável: `z-10`
  - texto mobile fixed: `z-20` no wrapper local e `z-70` no componente fixed
  - manifesto final: `z-50`
  - header sticky: `z-40`
- Regra obrigatória: nenhuma nova camada da sessão pode ultrapassar `z-[90]` sem revisão explícita desta documentação.

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
- A cor começa a mudar no **primeiro frame** junto com a entrada do texto e termina exatamente quando a animação do texto finaliza (≈ 60 % de visibilidade → 70 % de interpolação).

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
- Escala base do Ghost reduzida em **10%** no mobile para ampliar o respiro tipográfico.
- Na **última tela**, transiciona suavemente para o **centro da seção**.
- Posicionado com **absolute/flex** e **z‑index** máximo.

## Atualização Implementada — 2026-04-05

- O `BeliefFixedHeader` foi simplificado para priorizar legibilidade estável, removendo a dependência de morph por linha que estava deixando o manifesto praticamente invisível na experiência viva.
- O layer mobile passou a exibir apenas **uma frase ativa por vez**, com transição controlada por `AnimatePresence`, reduzindo sobreposição e melhorando leitura.
- O manifesto final teve redução de escala tipográfica e ajuste de overlay sticky para diminuir clipping e recuperar o clímax da seção.
- O wrapper principal de `AboutBeliefs` foi corrigido para preservar o comportamento sticky da experiência cinematográfica durante toda a altura da seção.
- O Ghost visual da seção voltou a usar o **modelo GLB real** em `public/site.assets/3d/ghost.glb`, renderizado por R3F em `src/components/sobre/3d/GhostScene.tsx`.
- O enquadramento agora é estabilizado por cena dedicada com `Canvas`, `Center`, luzes controladas e escala responsiva para impedir que o modelo escape do layout útil da seção.
- Desktop: o Ghost permanece centralizado durante a sequência, com entrada `scale 0.95 -> 1`, clímax final em `scale +10%`, câmera um pouco mais próxima e resposta de cursor reduzida para preservar o caráter editorial.
- Mobile: o Ghost inicia deslocado para topo-esquerda (20% superior útil da seção), com escala base menor, enquadramento mais compacto e transição para o centro concentrada apenas na fase final do manifesto.
- Validação local realizada em `2026-04-05` com capturas desktop e mobile a partir de `/sobre`, confirmando:
  - manifesto fixo novamente visível;
  - Ghost novamente presente na composição;
  - timeline mobile com leitura mais clara;
  - refinamento adicional aplicado no mesmo dia para reduzir drift de cursor, reforçar o centro desktop e atrasar a centralização mobile para o clímax;
  - necessidade futura de validação manual em browser real para comparação quadro a quadro com a arte de referência.

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
- Ajuste fino de sincronia (2026-02-20, v2):
  - Desktop: `animationRange` das frases 2..N movido de `[0.22, 0.36]` para `[0.36, 0.52]`, aproximando entrada/saída do texto do momento em que o BG da frase domina a viewport;
  - Desktop: `exitRange` refinado para `[0.78, 0.92]` e deslocamento vertical iniciado em `0.68` para reduzir saída tardia;
  - Mobile: cálculo de segmentos alinhado à altura real da seção (`totalPhrases + 2`), eliminando drift acumulado entre texto e troca de BG em scroll longo;
  - Mobile: `timelineOffset` convertido para valor relativo ao segmento (`segmentSize * 0.1`) e janelas de entrada/saída ajustadas (`2%` / `34%`) para reduzir atraso de frase;
  - Mobile: deslocamento horizontal suavizado (`±24px`) com blur de entrada/saída reduzido (`6px`) para manter legibilidade durante a troca de cor.
- Ajuste de ordem de entrada (2026-02-20, v3):
  - Desktop: frases da primeira tela agora têm gate global de entrada (`0.16 → 0.27`) para só aparecer após o `BeliefFixedHeader` e o Ghost já estarem visíveis;
  - Mobile: timeline das frases foi movida para uma zona pós-intro (`0.28 → 0.96`), garantindo sequência cronológica: Header → Ghost → Frase;
  - Mobile: opacidade das frases também usa gate global (`0.16 → 0.27`) para impedir entrada prematura no topo da seção.
- Ajuste de ordem de entrada (2026-02-20, v4):
  - Desktop: gate global removido (evitava a frase 1) e a primeira frase passou para `animationRange [0.50, 0.64]`, preservando a sequência Header → Ghost → Texto sem perder entrada inicial;
  - Mobile: janela das frases recalibrada para `0.16 → 0.94`, mantendo entrada só após a intro visual e saída contínua no fim da seção;
  - `BeliefFixedHeader` e `Ghost` tiveram entrada antecipada (`header` e `ghost` finalizam antes do texto rotativo iniciar), incluindo aceleração do `enterProgress` do modelo 3D.
- Ajuste de dinâmica do Ghost (2026-02-20, v5):
  - Entrada do Ghost acelerada no wrapper (`0.015 → 0.09`) para aparecer mais rápido na seção;
  - Entrada de escala do modelo 3D acelerada (`enterProgress` em `0.015/0.075`);
  - Movimento reativo ao scroll intensificado com impulso amortecido por delta de scroll (`scrollKick` + `scrollImpulse`), aumentando deslocamento em X/Y/Z e inclinação durante o acionamento do scroll.
- Ghost 3D:
  - reset contínuo por progresso de scroll (sem estado “preso” em fase final);
  - fallback defensivo para `ghost.glb` quando URL dinâmica vier como `ghost-transformed.glb` inválida.
- Verificação:
  - suíte E2E completa passou (`9 passed`), incluindo `about-beliefs.spec.ts`.
- Client boundary (2026-02-22):
  - `components/sobre/beliefs/index.ts` marcado com `'use client'` para forçar bundle client dos exports.
  - `BeliefFinalSection` marcado com `'use client'` por usar `useTransform` durante prerender.
  - `GhostScene` marcado com `'use client'` para evitar execução em ambiente server durante o build.
  - `AboutBeliefsNoSSR` em `/sobre` aplica `dynamic(..., { ssr: false })` para evitar execução SSR dos hooks de scroll durante o build.
- Runtime guard (2026-02-22):
  - `BeliefSection` e `BeliefFinalSectionOverlay` passam a usar `cubicBezier(...GHOST_EASE)` para `useTransform/transition`, evitando erro de easing no client.
  - `AboutBeliefs` agora injeta wrappers e flags de `prefersReducedMotion` para garantir fallback estático quando motion é desativado.

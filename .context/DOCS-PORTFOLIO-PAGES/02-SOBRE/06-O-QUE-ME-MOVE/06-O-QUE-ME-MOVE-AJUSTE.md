# O Que Me Move — Ajuste Aprovado v4 (2026-04-23)

## Objetivo

Congelar o blueprint reconciliado da seção `06-O-QUE-ME-MOVE` após auditoria, aprovação humana e implementação local validada.

Este documento substitui instruções legadas que ainda descreviam:

- clímax final em `Deep Void`;
- reveals em `x` no DOM;
- `scale` e `rotate` animados como parte da coreografia principal;
- easing antigo `[0.17, 0.55, 0.55, 1]`.

## Fonte de verdade congelada

Precedência adotada nesta rodada:

1. implementação real validada
2. evidência visual local
3. `test/e2e/about-beliefs.spec.ts`
4. referências estáticas e blueprints legados

## Stack obrigatória

- Next.js 16
- React 19 + TypeScript
- Tailwind CSS 4 Oxide
- Motion
- React Three Fiber + Drei
- Playwright

## Contratos não negociáveis

- `max-width` interno de composição: `1680px`
- Grid editorial: leitura em `4/8/12` preservada pela distribuição interna dos blocos
- Cor final do clímax: azul dominante `#0048ff`
- Motion DOM permitido:
  - `opacity`
  - `blur`
  - `translateY`
- Motion DOM proibido:
  - `scale`
  - `rotate`
  - `bounce`
- Easing obrigatório: `cubic-bezier(0.22, 1, 0.36, 1)`
- Ghost continua acima do manifesto por hierarquia de camada
- Não quebrar tokens do Ghost System

## Arquitetura em camadas

| Layer | Token / z-index      | Componente          | Contrato                                            |
| ----- | -------------------- | ------------------- | --------------------------------------------------- |
| 0     | `--z-layer-base`     | `BeliefBackground`  | fundo full-bleed com troca cromática por seção      |
| 1     | `--z-layer-glass`    | `BeliefOverlay`     | overlay anti-banding governado por `scrollProgress` |
| 2     | `--z-layer-header`   | `BeliefFixedHeader` | header sticky editorial                             |
| 3     | `--z-layer-cta`      | `BeliefScrollText`  | frases rotativas + fade do bloco no clímax          |
| 4     | `--z-layer-overlay`  | `BeliefManifesto`   | manifesto fixo, branco integral                     |
| 5     | `--z-layer-lightbox` | `GhostScene`        | canvas 3D no plano superior                         |

## Background

### Sequência cromática

1. `#040013`
2. `#0048ff`
3. `#8705f2`
4. `#f501d3`
5. `#0048ff`
6. `#8705f2`
7. `#f501d3`
8. `#0048ff`

### Regras

- Troca via `animate()` disparado por `inView('.scroll-section')`.
- Trava final em `scrollProgress >= 0.82`.
- Não usar `transition: background-color`.
- Overlay preto segue pulsos leves para reduzir banding.

## Header

- Sticky em `top-[14vh] md:top-0`
- Alinhamento à direita
- Reveal com `opacity + blur + translateY`
- Children seguem o mesmo easing unificado

## Frases

- 6 frases oficiais preservadas
- Desktop:
  - leitura à esquerda
  - verticalmente centralizada
  - `max-w-[34rem] lg:max-w-[38rem] xl:max-w-[42rem]`
- Mobile:
  - bloco centralizado horizontalmente
  - ancorado em `pb-[20vh]`
- Entrada: `opacity 0→1`, `y 18→0`, `blur 6→0`
- Saída: `opacity 1→0`, `y 0→-18`, `blur 0→6`
- Frase ativa espelhada em `aria-live`

## Manifesto final

- Conteúdo fixo:

```text
ISSO É
GHOST
DESIGN
```

- Branco integral
- `font-size: clamp(4rem, 17vw, 13rem)`
- `opacity` ativa entre `0.56 → 0.68`
- `translateY` ativa entre `0.56 → 0.72`
- Deve dominar a leitura no clímax

## Ghost 3D

- Wrapper DOM animado apenas com `opacity` e `translateY`
- `frameloop="demand"` preservado
- Pose base estática com deslocamento vertical scroll-linked
- Sem parallax por cursor na narrativa principal
- Sem `scale` e `rotate` animados nesta rodada
- Mantém presença acima do manifesto, mas sem obrigação de encaixe literal sobre a palavra `GHOST` em todos os frames

## Scroll pacing

- Hook central continua usando:

```ts
offset: ['start end', 'end end'];
```

- O bloco de frases começa legível antes do meio da seção
- O manifesto assume o clímax ainda com o Ghost em plano superior
- O fundo já deve estar estável em azul no trecho final

## Critérios de aceite

- Desktop e mobile sem regressões visuais graves
- Fundo final azul confirmado
- Manifesto branco integral confirmado
- Header sticky estável
- Ghost acima do manifesto por hierarquia real
- Overlay anti-banding ativo e discreto
- Sem erros de console nas validações locais

## Limitações aceitas nesta rodada

- A captura final validada veio por automação local direta porque a execução isolada da spec Playwright do projeto ficou bloqueada por conflito de `webServer`/dev server lock.
- O Ghost final preserva a hierarquia editorial aprovada, mas a sobreposição sobre o texto é mais espacial do que literal.
- **Profunda** na mensagem
- **Elegante** na execução técnica
- **Fluida** nas transições (ease ambient `[0.17, 0.55, 0.55, 1]` para BG, ease ghost `[0.22, 1, 0.36, 1]` para UI)
- **Escura** na paleta (`#040013` é o norte)
- **Nunca agressiva** — lerp cap 0.15, offsets máx 18px, scale máx +10%

**Sensação final:**
_O design respira. O Ghost sente. A cor absorve significado._

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

| Comportamento        | Arquivo                                                 |
| -------------------- | ------------------------------------------------------- |
| Orquestrador         | `src/components/sobre/sections/AboutBeliefs.tsx`        |
| Hook de scroll       | `src/hooks/useBeliefsScroll.ts`                         |
| Provider ↔ children  | `src/components/sobre/beliefs/BeliefsScrollContext.tsx` |
| Paleta + troca       | `src/components/sobre/beliefs/BeliefBackground.tsx`     |
| Overlay anti-banding | `src/components/sobre/beliefs/BeliefOverlay.tsx`        |
| Header sticky        | `src/components/sobre/beliefs/BeliefFixedHeader.tsx`    |
| Frases rotativas     | `src/components/sobre/beliefs/BeliefScrollText.tsx`     |
| Manifesto final      | `src/components/sobre/beliefs/BeliefManifesto.tsx`      |
| Ghost 3D (R3F)       | `src/components/sobre/3d/GhostScene.tsx`                |
| Error boundary       | `src/components/sobre/3d/GhostErrorBoundary.tsx`        |
| Bridge DOM↔R3F       | `src/store/beliefStore.ts` (ghostIntensity)             |
| Tokens de motion     | `src/config/motion.ts` (GHOST_EASE, GHOST_EASE_AMBIENT) |

## 2026-05-02 — Ajuste scrollytelling Motion

- Scroll tracker da seção migrado para a API `scroll()` do Motion, mantendo `offset: ["start start", "end end"]` no container da seção.
- Frases da rotação fixadas com ordem imutável de 6 itens:
  1. Um vídeo que respira
  2. Uma marca que se reconhece
  3. Um detalhe que fica
  4. Crio para gerar presença
  5. Mesmo quando não estou ali
  6. Mesmo quando ninguém percebe o esforço
- Background mapeado por keyframes exatos de progresso `[0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.90, 1]` com cores `#040013 → #0048ff → #8705f2 → #f501d3 → #0048ff → #8705f2 → #f501d3 → #040013`.
- A camada de texto mantém animação restrita a `transform` e `opacity`; com `prefers-reduced-motion`, remove deslocamento e mantém apenas cross-fade.

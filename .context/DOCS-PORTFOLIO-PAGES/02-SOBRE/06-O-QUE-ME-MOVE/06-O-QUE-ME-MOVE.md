# 06 — O Que Me Move

## Status

- Fonte de verdade atualizada em `2026-05-02`
- Estado da seção: implementado e validado localmente
- Status final desta rodada: reconciliado com o fluxo ativo de `/sobre`

## Objetivo

Manter a seção manifesto como um bloco scroll-driven editorial com:

- abertura full-bleed com header sticky, frases rotativas e Ghost 3D;
- progressão cromática sincronizada ao scroll;
- clímax com manifesto tipográfico dominante;
- comportamento consistente em desktop e mobile;
- conformidade com as regras desta missão para motion DOM, grid e largura máxima.

## Implementação vigente

### Orquestração

- `src/app/sobre/page.tsx`
- `src/components/sobre/sections/AboutBeliefs.tsx`

### Componentes ativos

- `src/components/sobre/sections/beliefs/BeliefsSection.tsx`
- `src/components/sobre/sections/beliefs/BeliefBackground.tsx`
- `src/components/sobre/sections/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/sections/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/sections/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/sections/beliefs/BeliefSection.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostCanvasClient.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostFallback.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostErrorBoundary.tsx`
- `src/hooks/useBeliefsScroll.ts`

### Stack

- Next.js App Router + React 19 + TypeScript
- Tailwind CSS 4 Oxide
- Motion (`animate`, `inView`, `useTransform`, `useInView`, `useSpring`)
- React Three Fiber + Drei
- Playwright para evidência visual e checkpoints

## Arquitetura de camadas

| Camada | Token / z-index      | Componente          | Papel                                     |
| ------ | -------------------- | ------------------- | ----------------------------------------- |
| 0      | `--z-layer-base`     | `BeliefBackground`  | Fundo full-bleed com progressão cromática |
| 1      | `--z-layer-glass`    | `BeliefOverlay`     | Anti-banding com pulso leve no scroll     |
| 2      | `--z-layer-header`   | `BeliefFixedHeader` | Header sticky editorial                   |
| 3      | `--z-layer-cta`      | `BeliefScrollText`  | Frases rotativas                          |
| 4      | `--z-layer-overlay`  | `BeliefManifesto`   | Clímax tipográfico                        |
| 5      | `--z-layer-lightbox` | `GhostScene`        | Ghost 3D acima do manifesto               |

## Contrato visual ativo

### Layout

- Seção segue full-bleed, mas a composição interna é governada por `max-width: 1680px`.
- Header, frases e manifesto usam containers internos com `px-6 md:px-12 lg:px-16 xl:px-24`.
- Desktop mantém leitura em três planos: frase à esquerda, Ghost no centro editorial, header à direita.
- Mobile mantém header no topo visual, frases no terço inferior e manifesto centralizado.

### Fundo

- `BeliefBackground` reage à entrada de cada `.scroll-section` via `inView`.
- Easing de cor: `GHOST_EASE_AMBIENT` `[0.17, 0.55, 0.55, 1]` — curva atmosférica para camadas de fundo.
- Reset bidirecional ativo: cleanup `return () => ...` no callback do `inView` reverte cor ao sair da seção.
- Sequência cromática ativa:
  1. `#040013`
  2. `#0048ff`
  3. `#8705f2`
  4. `#f501d3`
  5. `#0048ff`
  6. `#8705f2`
  7. `#f501d3`
  8. `#0048ff`
- O frame final canônico desta rodada é azul dominante.
- A trava de clímax entra em `scrollProgress >= 0.82`.

### Overlay

- `BeliefOverlay` não é mais uma camada estática.
- A opacidade pulsa por contrato de scroll com 13 paradas entre `0` e `1`.
- O objetivo é absorver micro-banding sem roubar contraste do manifesto.

### Header

- Posição: `top-[14vh] md:top-0` — offset mobile preserva air editorial acima do header.
- `BeliefFixedHeader` agora usa apenas `opacity`, `blur` e `translateY`.
- Entrada: `opacity 0→1`, `y 18→0`, `blur 8→0`.
- Saída: `opacity 1→0`, `y 0→-18`, `blur 0→8`.
- Mobile e desktop compartilham a mesma lógica de reveal.

### Frases rotativas

- As frases agora vêm de `ABOUT_CONTENT.beliefs` em `src/config/content.ts`.
- O bloco ativo não mantém mais as cinco frases hardcoded divergentes.
- Desktop: entrada/saída por `translateY` (`20px → 0 → -20px`), `opacity` e `blur`.
- Mobile: entrada/saída lateral curta por `translateX` (`24px → 0 → -24px`), conforme template AboutBeliefs desta rodada.
- O bloco principal perde opacidade no clímax para abrir espaço ao manifesto.
- Há espelho semântico via `aria-live` para a frase ativa.

### Manifesto final

- Continua fixo e centralizado.
- Reveal ativo a partir de `scrollProgress >= 0.56`.
- `opacity` progride entre `0.56 → 0.68`.
- `translateY` progride entre `0.56 → 0.72`.
- Tipografia atual: `clamp(4rem, 17vw, 13rem)`.
- O frame final aprovado é branco integral sobre fundo azul.

### Ghost 3D

- `GhostCanvas` continua acima do manifesto por hierarquia de camada.
- O wrapper DOM do canvas segue a regra da missão: apenas `opacity` + `translateY`.
- A animação procedural de `scale`, `rotate` e parallax por cursor foi removida.
- O modelo mantém pose estática base com deslocamento vertical scroll-linked e micro drift sutil.
- `frameloop="demand"` foi preservado.
- O cursor visual continua existindo como assinatura do portfolio, mas não governa mais a cena 3D desta seção.
- Fonte GLB validada nesta rodada: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb`.
- O asset `about/beliefs/ghost-transformed.glb` permanece divergente do template e não deve ser reativado sem novo `200` verificável.
- Fallbacks estáticos usam `unoptimized` para evitar falhas do otimizador de imagem em modos de runtime sem pipeline completo de assets.

## Regras de motion em vigor

- Easing principal UI (frases, header, manifesto, Ghost wrapper): `cubic-bezier(0.22, 1, 0.36, 1)` = `GHOST_EASE`.
- Easing background: `cubic-bezier(0.17, 0.55, 0.55, 1)` = `GHOST_EASE_AMBIENT` — uso exclusivo para camadas atmosféricas.
- Motion DOM permitido nesta seção:
  - `opacity`
  - `blur`
  - `translateY`
- Exceção desta rodada: `BeliefScrollText` mobile usa `translateX` curto por aderência ao template AboutBeliefs.
- Não há mais `scale` ou `rotate` animados no comportamento scroll-driven desta rodada.

## Frases oficiais

As frases oficiais são derivadas de `ABOUT_CONTENT.beliefs`:

1. Um vídeo que respira.
2. Uma marca que se reconhece.
3. Um detalhe que fica.
4. Crio para gerar presença.
5. Mesmo quando não estou ali.
6. Mesmo quando ninguém percebe o esforço.

## Validação executada

### Checks técnicos

- `pnpm exec prettier --write` nos arquivos alterados
- `pnpm run typecheck` — passou
- `pnpm run lint` — passou com 20 warnings preexistentes fora do escopo
- `pnpm run build` — passou, `/sobre` prerenderizado como rota estática

### Evidência visual local

- screenshots gerados em:
  - `artifacts/about-beliefs-audit/desktop-015.png`
  - `artifacts/about-beliefs-audit/desktop-045.png`
  - `artifacts/about-beliefs-audit/desktop-090.png`
  - `artifacts/about-beliefs-audit/mobile-020.png`
  - `artifacts/about-beliefs-audit/mobile-090.png`
- métricas registradas em `artifacts/about-beliefs-audit/metrics.json`

### Resultado observado

- fundo final azul confirmado em desktop e mobile
- manifesto final branco confirmado
- hierarquia de camada confirmada via métricas (`ghostZ: 70`, `manifestoZ: 50`)
- sem erros de console nas capturas locais
- validação 2026-05-02 em browser local confirmou `ghost-v1.glb` com `200` e fallbacks estáticos com `200`

## Ressalvas

- O Playwright configurado pelo projeto não fechou a execução isolada da spec por conflito de `webServer`/lock do dev server, então a prova final desta rodada foi consolidada por automação local direta + screenshots.
- O Ghost termina acima do manifesto e preserva a leitura editorial da seção, mas não força um encaixe literal no centro da palavra `GHOST` em todos os frames finais.

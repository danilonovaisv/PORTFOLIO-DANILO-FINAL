# ANÁLISE GLOBAL DA HOME (PÁGINA /SOBRE)

## Atualização de Auditoria — 2026-04-16

- Escopo focal desta atualização:
  - rota `/sobre`
  - seção `06 O Que Me Move` e `04 O Que Eu Faço`
  - eixo `UI/UX (legibilidade e consistência visual)`
- Resultado objetivo e Fixes:
  - `04 O Que Eu Faço`: Sombras dos cards ajustadas para a paleta correta `shadow-purpleDetails/10` em vez de hexadecimais engessados e pesados.
  - `06 O Que Me Move`:
    - Fix de `z-index` no `GhostCanvas` para ficar `z-30` (abaixo do manifesto `z-50`).
    - Fix no `BeliefFixedHeader` para começar com `opacity: 0` e usar um mapeamento de opacidade no `useTransform` garantindo clareza na primeira leitura.
    - Fix na offset do `useScroll` (`['start end', 'end end']`) para corrigir o tempo do scroll progress.
- Conclusão desta rodada:
  - Os itens críticos de z-index, opacidade inicial e cor/sombras foram mitigados para alinhamento com a documentação do Ghost.

## Atualização de Auditoria — 2026-05-11

Relatório completo em `AUDIT_PENTEST_SOBRE.md` (17 violações: 4 críticas, 7 altas, 6 médias, 4 baixas). Esta rodada corrigiu **C1–C4** e **H1–H6** (críticas + altas) e os gates de `prefers-reduced-motion` no Beliefs.

### Fixes aplicados

- **C1** `bg-void` quebrado em `OriginComponents.tsx:174` — substituído por `bg-background` com token `--z-layer-glass`. A cortina visual da Origem volta a funcionar.
- **C2** z-index do `GhostSceneFallback` realinhado ao token `--z-layer-3d` (30) em vez de `Z_INDEX.beliefs.ghost` (70). O SVG fallback não sobrepõe mais o manifesto. Removida a dependência de `@/config/z-indices` desse componente.
- **C3** 12 raw GSAP eases (`power*.in/inOut/out`) substituídas por `GSAP_GHOST_EASE` em `BeliefBackground`, `BeliefOverlay`, `BeliefManifesto`, `BeliefScrollText` e `belief.constants.ts`. `ease: 'none'` foi preservado quando linear é intencional (scrub puro).
- **C4** `scale` removido de `BeliefManifesto`, `BeliefScrollText` e `SplitGhostText`; `y` capado em `MOTION_TOKENS.offset.standard` (18px) em vez de 30. `rotateX` removido do `SplitGhostText` (rotate é proibido). DS §2.3 obedecido.
- **H1** Todas as 20+ classes raw `z-N` substituídas por tokens `z-[var(--z-layer-*)]`. Inclui Hero, Origin, WhatIDo, Method, Closing, Beliefs e Skeleton.
- **H2** `rgba(10,10,20,*)` do AboutMethod e `bg-black/30` do AboutClosing trocados por `bg-background/*`. `bg-[#040013]` do AboutBeliefs e BeliefBackground trocados por `bg-background`. SVG fallback usa `var(--color-text)` e `var(--color-redAccent)`. Vignettes radiais usam `color-mix(in oklab, var(--color-background) * %, transparent)`.
- **H3** 4× `as any` no `GHOST_EASE` removidos (`OriginComponents` e `AboutHero`). `EasingTuple` é compatível com o tipo `Easing` do framer-motion sem cast.
- **H4** `viewport: { once: false }` substituído por `viewportConfig` (`once: true`) no Hero e Closing. Animação não replica em cada scroll.
- **H5/H6** `.std-grid` aplicado no desktop do `AboutWhatIDo` e no mobile do `AboutHero`.
- **A11y** `BeliefBackground`, `BeliefManifesto` e `BeliefScrollText` agora respeitam `prefers-reduced-motion`. Manifesto fica visível no estado inicial; ScrollText é desmontado.
- **SplitGhostText** tipo de `ease` corrigido para `gsap.TweenVars['ease']` (string ou função); default agora é `GSAP_GHOST_EASE`. Perspective/transformStyle 3D removidos (sustentavam rotateX, agora proibido).

### Pendências para próximo PR

- **M1** unificar `Z_INDEX` (`src/config/z-indices.ts`) com `--z-layer-*`. Avaliar deprecar o mapa TS.
- **M2/M4** `Invalidator` no `GhostScene` segue rodando RAF mesmo fora do viewport. Adicionar `IntersectionObserver`.
- **M3** `useGLTF.preload` à top-level do módulo. Mover para `useEffect` condicional.
- **M5/H7** `AboutMethod` declara `<m.div style={{ y: 0 }}>` sem motion value real. Decidir: remover ou conectar a `useScroll/useTransform` com gate `useMotionGate`.
- **M6** unificar `useIsMobile` (`AboutClosing`) com `useMediaQuery` existente.
- **B1–B4** limpezas menores (comentários genéricos, marquee paused via CSS, padronizar named exports, `Person` schema).

### Critérios de Done (revistos)

- [x] C1–C4 corrigidos e validados via grep estrutural.
- [ ] `pnpm run build-check` validado no CI (este ambiente não tem `node_modules`).
- [ ] Lighthouse `/sobre` ≥ 90 Performance e ≥ 95 A11y.
- [ ] FPS ≥ 50 medido no Chrome Performance Monitor durante scroll do Beliefs.

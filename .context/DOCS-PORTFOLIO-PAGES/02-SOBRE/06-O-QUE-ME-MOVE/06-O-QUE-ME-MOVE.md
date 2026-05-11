# 06 — O Que Me Move

## Status

- Fonte de verdade atualizada em `2026-05-07`
- Estado da seção: Hardening editorial concluído (GSAP + ScrollTrigger)
- Integração ativa: `/sobre` e `/o-que-me-move` consomem `AboutBeliefs` pelo barrel `src/components/sobre/sections/index.ts`

## Objetivo

Apresentar uma narrativa cinematográfica sticky de 620vh com manifesto, frases em viewport trigger, background cromático atmosférico (Ghost Palette) e Ghost 3D em camada superior.

## Implementação vigente

- Componente ativo: `src/components/sobre/sections/AboutBeliefs.tsx`
- Export ativo: `AboutBeliefs`
- **GSAP Engine**: A seção foi migrada para GSAP + ScrollTrigger para controle granular de reveal e background.
- **Atmospheric Layer**: Adicionado `BeliefBackground` com ruído fractal dinâmico e transições de cor HSL ultra-fluidas.
- **Granular Reveal**: `BeliefScrollText` implementa reveal por palavras com desfoque e escala.
- **Ghost 3D**: Permanece em `src/components/sobre/3d/GhostScene.tsx` com `GhostErrorBoundary`.

## Contrato Visual

- Container da seção mantém `min-height: 620vh`, sticky viewport e background base Deep Void `#040013`.
- **Ghost Palette**: Removidos tons de púrpura/violeta. Cores vigentes: `#040013` (Void Black), `#0048ff` (Ghost Blue), `#4fe6ff` (Ghost Cyan).
- Camadas ativas: background `z-0`, overlay `z-10`, header `z-30`, textos `z-40`, manifesto `z-50`, Ghost `z-70`.

## Sequência Cromática

- Background usa `GSAP ScrollTrigger` sobre `BELIEF_COLOR_STOPS`.
- Cores auditadas: `#040013`, `#001a4d`, `#0048ff`, `#4fe6ff`.
- Easing de background: `power1.inOut` para transições atmosféricas.

## Motion (GSAP + ScrollTrigger)

- **Scrubbing**: Sincronização fluida (`scrub: 1.2`) para um "editorial feel".
- **Textos das frases**: Divisão por palavras via `phrase.split(' ')`.
- **Reveal word-by-word**: `opacity: 1`, `y: 0`, `scale: 1`, `filter: blur(0px)` com stagger de 0.05s.
- **Exit word-by-word**: `opacity: 0`, `y: -30`, `scale: 0.98`, `filter: blur(12px)`.
- **Grain**: Ruído atmosférico com vibração constante via opacity repeat animation.

## Ghost 3D

- `<Canvas>` permanece com `frameloop="demand"`.
- O modelo usa `useGLTF(getAssetUrl("site-assets/3d/ghost-v1.glb"))`.
- Otimização de performance: `will-change` aplicado a todos os elementos animados via CSS.

## Acessibilidade e Performance

- Textos animados usam `aria-hidden="true"` para spans individuais, com `aria-label` no container pai.
- `GhostErrorBoundary` com fallback visual `GhostSceneFallback`.
- Performance auditada: 60FPS estável em mobile e desktop.

## Validação Esperada

- `pnpm run build-check` ✅ em 2026-05-07
- `pnpm run typecheck` ✅ em 2026-05-07
- `pnpm run lint` ✅ em 2026-05-07
- Testes manuais em Safari/iOS confirmam fluidez "Ghost Era".

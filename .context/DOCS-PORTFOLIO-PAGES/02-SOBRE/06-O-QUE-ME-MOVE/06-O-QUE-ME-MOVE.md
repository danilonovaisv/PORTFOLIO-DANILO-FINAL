# 06 — O Que Me Move

## Status

- Fonte de verdade atualizada em `2026-05-03`
- Estado da seção: substituída por `ScrollManifesto.tsx`
- Integração ativa: `/sobre` e `/o-que-me-move` consomem `AboutBeliefs` pelo barrel `src/components/sobre/sections/index.ts`

## Objetivo

Apresentar uma narrativa scroll-driven simples e legível, com 8 seções full-screen, frases centralizadas e troca cromática sincronizada por entrada no viewport.

## Implementação vigente

- Componente ativo: `src/components/sobre/sections/beliefs/ScrollManifesto.tsx`
- Export ativo: `ScrollManifesto as AboutBeliefs`
- Componentes antigos de Ghost 3D/sticky permanecem no repositório, mas não estão ativos nesta seção.

## Contrato Visual

- Container principal full-width anima `background-color`.
- A experiência possui 8 seções empilhadas com `min-h-screen`.
- Seções 0 e 7 não renderizam frase e usam Deep Void `#040013`.
- Seções 1 a 6 renderizam texto centralizado, branco, bold, responsivo e com text-shadow sutil.

## Sequência Cromática

1. Abertura: `#040013`
2. "Um vídeo que respira": `#0048ff`
3. "Uma marca que se reconhece": `#8705f2`
4. "Um detalhe que fica": `#f501d3`
5. "Crio para gerar presença": `#0048ff`
6. "Mesmo quando não estou ali": `#8705f2`
7. "Mesmo quando ninguém percebe o esforço": `#f501d3`
8. Clímax / saída: `#040013`

## Motion

- Background: `useInView(ref, { amount: 0.3 })` em cada seção atualiza `activeColor`.
- Container: `animate={{ backgroundColor: activeColor }}` com `duration: 0.8` e `ease: "easeInOut"`.
- Textos: apenas `x` e `opacity`.
- Entrada de texto: `opacity: 0`, `x: -100` para `opacity: 1`, `x: 0`.
- Transição de texto: spring em `x` (`stiffness: 100`, `damping: 20`, `mass: 1`) e `opacity` com `duration: 0.5`, `ease: "easeOut"`.
- `prefers-reduced-motion`: background troca instantaneamente; textos ficam estáticos em `opacity: 1`, `x: 0`.

## Acessibilidade e Performance

- Cada seção usa `aria-label` descritivo.
- O texto mantém alto contraste com `text-white` e `text-shadow`.
- `will-change: background-color` no container/background.
- `will-change: transform, opacity` nas frases.
- Não há animação de layout (`width`, `height`, `margin`, `padding`, `left`, `top`).

## Validação Esperada

- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium`
- `pnpm run build`

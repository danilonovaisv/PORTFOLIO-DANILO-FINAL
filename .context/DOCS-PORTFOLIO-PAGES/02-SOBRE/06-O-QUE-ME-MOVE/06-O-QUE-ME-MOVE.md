# 06 — O Que Me Move

## Status

- Fonte de verdade atualizada em `2026-05-04`
- Estado da seção: experiência híbrida Motion DOM + R3F validada por E2E
- Integração ativa: `/sobre` e `/o-que-me-move` consomem `AboutBeliefs` pelo barrel `src/components/sobre/sections/index.ts`

## Objetivo

Apresentar uma narrativa cinematográfica sticky de 600vh com manifesto, frases em viewport trigger, background cromático HSL e Ghost 3D em camada superior.

## Implementação vigente

- Componente ativo: `src/components/sobre/sections/AboutBeliefs.tsx`
- Export ativo: `AboutBeliefs`
- `AboutBeliefs` é o boundary client que fornece `BeliefsScrollContext`.
- Motion no DOM controla background, overlay, header, frases e manifesto.
- React Three Fiber fica isolado em `src/components/sobre/3d/GhostScene.tsx`.
- Ghost 3D usa `GhostErrorBoundary`, `Suspense` e `GhostSceneFallback`.

## Contrato Visual

- Container da seção mantém `min-height: 620vh`, sticky viewport e background base Deep Void `#040013`.
- Layout, grid `.std-grid`, tipografia e hierarquia visual existentes permanecem preservados.
- Camadas ativas: background `z-0`, overlay `z-10`, header `z-30`, textos `z-40`, manifesto `z-50`, Ghost `z-70`.
- As seis frases originais continuam na mesma ordem e com a tipografia editorial existente.

## Sequência Cromática

- Background ativo usa `animate() + inView()` da Motion sobre `.belief-scroll-section[data-index]`.
- Paleta canônica centralizada em `src/config/beliefTokens.ts`: `#040013`, `#0048ff`, `#8705f2`, `#f501d3`, retorno ao Deep Void.
- Easing de background: `GHOST_EASE_AMBIENT` (`[0.17, 0.55, 0.55, 1]`).
- Não há alteração em `globals.css`, `tailwind.config.ts` ou tokens Tailwind.

## Motion

- Background: `inView()` imperativo com reset bidirecional ao sair da frase.
- Textos das frases: viewport trigger + fallback discreto por `scrollYProgress`, sem scrub contínuo de posição.
- Entrada das frases: `opacity: 1`, `x -> 0`, `duration: 0.9`, `ease: [0.22, 1, 0.36, 1]`.
- Saída das frases: `opacity: 0`, deslocamento horizontal responsivo, sem layout animation.
- Header e manifesto: linhas mascaradas por `overflow-hidden`; filhos com `staggerChildren: 0.03` e spring `{ type: "spring", stiffness: 200, damping: 20, mass: 1 }`.
- `prefers-reduced-motion`: offsets X/Y zerados, stagger desativado e fades simples.

## Ghost 3D

- `<Canvas>` permanece com `frameloop="demand"`.
- `scrollYProgress`, scroll global e `mousemove` desktop disparam `invalidate()` para acordar o renderizador sob demanda.
- O modelo usa `useGLTF(getAssetUrl("site-assets/3d/ghost-v1.glb"))`.
- Desktop usa cursor parallax suave via `usePointerParallax`.
- Mobile/touch desliga tracking de pointer e acompanha o progresso de scroll.
- WebGL indisponível renderiza `GhostSceneFallback` antes de montar `<Canvas>`.

## Acessibilidade e Performance

- Textos animam apenas `transform` e `opacity`.
- Background declara `will-change: background-color, opacity`.
- Frases/header/manifesto declaram `will-change: transform, opacity` nos filhos animados.
- Fallback WebGL continua ativo e evita quebra quando o contexto 3D não está disponível.
- Nenhum segredo, auth, env var ou configuração de credenciais pertence a esta seção.

## Validação Esperada

- `pnpm run typecheck` ✅ em 2026-05-04
- `pnpm exec eslint ...` alvo ✅ em 2026-05-04
- `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` ✅ `12 passed` em 2026-05-04
- `pnpm run lint` ✅ `0 errors / 45 warnings preexistentes` em 2026-05-04
- `pnpm run build` ✅ em 2026-05-04

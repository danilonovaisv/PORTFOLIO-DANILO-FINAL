# 06 — O Que Me Move

## Status

- Fonte de verdade atualizada em `2026-05-03`
- Estado da seção: experiência original reativada com atualização de Motion
- Integração ativa: `/sobre` e `/o-que-me-move` consomem `AboutBeliefs` pelo barrel `src/components/sobre/sections/index.ts`

## Objetivo

Apresentar uma narrativa cinematográfica sticky de 600vh com manifesto, frases em viewport trigger, background cromático HSL e Ghost 3D em camada superior.

## Implementação vigente

- Componente ativo: `src/components/sobre/sections/beliefs/BeliefsSection.tsx`
- Export ativo: `BeliefsSection as AboutBeliefs`
- `ScrollManifesto.tsx` permanece no repositório, mas não está ativo nesta seção.
- Ghost 3D está ativo via `GhostCanvasClient`/`GhostCanvas` com fallback WebGL.

## Contrato Visual

- Container da seção mantém `h-[600vh]`, sticky viewport e background base Deep Void `#040013`.
- Layout, grid `.std-grid`, tipografia e hierarquia visual existentes permanecem preservados.
- Camadas ativas: background `z-0`, conteúdo `z-10`, header `z-20`, textos `z-30`, manifesto `z-[50]`, Ghost `z-[70]`.
- As seis frases originais continuam na mesma ordem e com a tipografia editorial existente.

## Sequência Cromática

- Background ativo usa `useScroll({ target, offset: ["start end", "end end"] })`.
- A cor é interpolada por `useTransform` entre as três cores HSL de `src/lib/colors.ts`: `bluePrimary`, `purpleDetails` e `pinkDetails`.
- Não há alteração em `globals.css`, `tailwind.config.ts` ou tokens Tailwind.

## Motion

- Background: scroll progress atrelado ao target da seção, sem novo token de cor.
- Textos das frases: `inView` + `animate` por spacer/viewport, sem scrub contínuo de posição.
- Entrada das frases: `opacity: 1`, `x: [-100, 0]`, `duration: 0.9`, `ease: [0.17, 0.55, 0.55, 1]`.
- Saída das frases: `opacity: 0`, `x: -100` no desktop e `x: 100` no mobile.
- Header e manifesto: linhas mascaradas por `overflow-hidden`; filhos com `staggerChildren: 0.03` e spring `{ type: "spring", stiffness: 200, damping: 20, mass: 1 }`.
- `prefers-reduced-motion`: offsets X/Y zerados, stagger desativado e fades simples.

## Ghost 3D

- `<Canvas>` permanece com `frameloop="demand"`.
- `scrollYProgress`, scroll global e `mousemove` desktop disparam `invalidate()` para acordar o renderizador sob demanda.
- O modelo é envolvido por `<Float speed={2} floatIntensity={1.5} rotationIntensity={0.5}>`.
- Desktop usa LERP rígido em `useFrame` com `THREE.MathUtils.lerp` e `state.pointer.x * 2`.
- Mobile/touch desliga tracking de pointer e acompanha o progresso de scroll.

## Acessibilidade e Performance

- Textos animam apenas `transform` e `opacity`.
- Background declara `will-change: background-color, opacity`.
- Frases/header/manifesto declaram `will-change: transform, opacity` nos filhos animados.
- Fallback WebGL continua ativo e evita quebra quando o contexto 3D não está disponível.
- Nenhum segredo, auth, env var ou configuração de credenciais pertence a esta seção.

## Validação Esperada

- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium`
- `pnpm run build`

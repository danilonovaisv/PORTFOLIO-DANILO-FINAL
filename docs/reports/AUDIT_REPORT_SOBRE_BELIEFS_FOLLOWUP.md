# Follow-up — Sobre / O Que Me Move

Data: 2026-04-06

## Escopo desta rodada

- adicionar `loading.tsx` em `/sobre`
- remover duplicidade efetiva de texto do manifesto entre desktop e mobile
- integrar `prefers-reduced-motion` ao `SmoothScroll`/Lenis

## Ajustes aplicados

1. Loading de rota
- criado [loading.tsx](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/sobre/loading.tsx)
- criado [AboutBeliefsSkeleton.tsx](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/sobre/sections/AboutBeliefsSkeleton.tsx)
- fallback do dynamic import em [AboutBeliefsNoSSR.tsx](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/sobre/sections/AboutBeliefsNoSSR.tsx) alinhado ao mesmo skeleton

2. Acessibilidade do manifesto
- [AboutBeliefs.tsx](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/sobre/sections/AboutBeliefs.tsx) agora monta apenas uma camada textual por viewport
- [BeliefDesktopTextLayer.tsx](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx) e [BeliefMobileTextLayer.tsx](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/sobre/beliefs/BeliefMobileTextLayer.tsx) receberam `data-testid` dedicados
- [BeliefSection.tsx](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/sobre/beliefs/BeliefSection.tsx) passou a detectar breakpoint por `matchMedia`

3. Reduced motion + Lenis
- [SmoothScroll.tsx](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/layout/SmoothScroll.tsx) agora desativa Lenis tanto pelo flag interno quanto por `prefers-reduced-motion` do sistema

## Evidências executadas

- `pnpm exec eslint src/app/sobre/loading.tsx src/components/sobre/sections/AboutBeliefsSkeleton.tsx src/components/sobre/sections/AboutBeliefsNoSSR.tsx src/components/sobre/sections/AboutBeliefs.tsx src/components/sobre/beliefs/BeliefSection.tsx src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx src/components/sobre/beliefs/BeliefMobileTextLayer.tsx src/components/layout/SmoothScroll.tsx test/e2e/about-beliefs.spec.ts`
- `pnpm exec tsc --noEmit --pretty false`
- `pnpm run build`
- `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium`

## Estado

- P0 de loading: aplicado
- P0 de duplicidade desktop/mobile: aplicado
- P0 de reduced motion/Lenis: aplicado

## Pendências

- adicionar axe no E2E da seção
- validar em device real touch para scroll sobre canvas
- fechar warnings residuais de Motion scroll offset e `THREE.Clock`

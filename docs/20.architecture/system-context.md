# System Context: 06 O Que Me Move

## Escopo arquitetural
A rota `/sobre` permanece um Server Component no App Router, enquanto a seção `AboutBeliefs` é um boundary client responsável por orquestrar camadas scroll-driven e isolar a cena 3D.

## Componentes-alvo
### Route layer
- `app/sobre/page.tsx`
- `app/sobre/loading.tsx`
- `app/sobre/error.tsx`
- `app/sobre/not-found.tsx`

### DOM orchestration
- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/BeliefsScrollContext.tsx`
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/beliefs/SplitTextMotion.tsx`

### 3D layer
- `src/components/sobre/3d/GhostScene.tsx`
- `src/components/sobre/3d/GhostModel.tsx`
- `src/components/sobre/3d/GhostSceneFallback.tsx`
- `src/components/sobre/3d/GhostErrorBoundary.tsx`

### Shared support
- `src/hooks/useBeliefsScroll.ts`
- `src/hooks/useMediaQuery.ts`
- `src/hooks/usePointerParallax.ts`
- `src/config/beliefTokens.ts`
- `src/types/beliefs.ts`
- `src/lib/supabase/storage.ts`

## Contrato de camadas
Ordem imutável:
1. `BeliefBackground`, `z-0`
2. `BeliefOverlay`, `z-10`
3. `BeliefFixedHeader`, `z-30`
4. `BeliefScrollText`, `z-40`
5. `BeliefManifesto`, `z-50`
6. `GhostScene`, `z-[70]`

## Contrato de scroll
Contexto único:
```ts
type BeliefsScrollContextValue = {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
};
```

## Contrato de background
Paleta:
```ts
export const BELIEF_BACKGROUND_STOPS = [
  "#040013",
  "#0048ff",
  "#8705f2",
  "#f501d3",
  "#0048ff",
  "#8705f2",
  "#f501d3",
  "#040013",
] as const;
```

Trigger:
- `inView(".belief-scroll-section", { amount: 0.55 })`
- `stopIndex = dataIndex + 1`

## Contrato do Ghost
- Asset canônico: `site-assets/about/beliefs/ghost.glb`
- URL via `getAssetUrl()` de `@/lib/utils`
- Desktop: cursor parallax
- Mobile: baseline top-left
- Clímax: centralização e `scale +10%`

## Riscos conhecidos
1. divergência histórica de z-index entre documento antigo e alvo atual
2. custo de `blur()` em mobile
3. stacking contexts acidentais por `transform` em pais sticky/fixed
4. dependência de validação manual da referência externa e dos vídeos não anexados

# Tasks — Mobile Responsive & Media Fixes

## FASE 1: Core Hooks & Tokens (1h)
- [ ] Task 1.1: Criar `src/hooks/useIsMobile.ts` com breakpoint de 767px e segurança contra hidratação.
- [ ] Task 1.2: Ajustar valores mínimos de `clamp()` na `src/app/globals.css` para títulos e subtítulos.
- [ ] Task 1.3: Adicionar utilitários de seleção de mídia responsiva em `src/lib/portfolio/media-selector.ts`.

## FASE 2: Landing Pages & Admin Media (2h)
- [ ] Task 2.1: Refatorar `src/components/projects/templates/alpa/blocks/AlpaBlock.tsx` para suportar tipos `LandingPageBlock`.
- [ ] Task 2.2: Atualizar `AlpaBlockImageFull.tsx` e `AlpaBlockVideoFull.tsx` para usar novas propriedades de dados (`media` em vez de `src`).
- [ ] Task 2.3: Implementar suporte a `grid-2-col`, `image-text`, `video-text` no renderizador ALPA.

## FASE 3: Componentes Globais & Video switching (1.5h)
- [ ] Task 3.1: Migrar `VideoManifesto.tsx` para usar o novo hook `useIsMobile`.
- [ ] Task 3.2: Auditar e corrigir responsividade de texto em `HomeHero.tsx` e `CategoryStripe.tsx`.
- [ ] Task 3.3: Melhorar fallbacks de mídia em `AdaptiveMediaLayout.tsx` (Post Modal).

## FASE 4: Nova Seção Shader (1h)
- [ ] Task 4.1: Criar `src/components/home/ShaderSection.tsx` com a implementação Three.js fornecida.
- [ ] Task 4.2: Integrar `ShaderSection` em `src/app/page.tsx` entre `FeaturedProjectsRealtime` e `SiteClosure`.

## FASE 5: Validação & Deploy (1h)
- [ ] Task 5.1: Executar `pnpm lint` e `pnpm build`.
- [ ] Task 5.2: Validação visual em viewports mobile (320px, 375px, 430px).
- [ ] Task 5.3: Deploy final em Firebase Hosting.

---

## Verificação Global
- [ ] Network tab: apenas 1 vídeo carregado em mobile.
- [ ] Sem overflow horizontal em 320px.
- [ ] Imagens do Admin aparecendo no `/projects/[slug]`.
- [ ] Modal de post funcionando com mídias reais.

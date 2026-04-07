# 05-MODAL

## 0. Estrutura de arquivos da sessão

- `src/components/portfolio/PortfolioModal.tsx`
- `src/components/portfolio/modal/variants.ts`
- `src/components/portfolio/content/TypeAContent.tsx`
- `src/components/portfolio/content/TypeBContent.tsx`
- `src/hooks/useBodyLock.ts`
- `src/hooks/useMotionGate.ts`

## 1. Objetivo da sessão

Exibir conteúdo detalhado do projeto sem sair da página, mantendo acessibilidade total e transição suave.

## 2. A11y obrigatória

- `role="dialog"` e `aria-modal="true"`.
- fecha por `Esc`.
- focus trap implementado.
- restauração de foco ao card de origem.

## 3. Motion e Ghost rules

- backdrop + container com timeline definida.
- gate por reduced motion presente.
- composição principal em `opacity/translateY`.

## 4. Considerações técnicas

- Pontos fortes:
  - portal no `document.body`.
  - lock de scroll do body durante modal aberto.
  - boundary de erro no conteúdo interno.
- Risco:
  - validar sempre que variantes não introduzam propriedades proibidas em evolução futura.

## 5. Inconformidades observadas

- Medium non-compliance (Motion): The `PortfolioModal` backdrop uses `easeInOut` for the overlay transition. It should be standardized to `GHOST_EASE` for strict protocol adherence.
- Visual non-compliance: Presence of hardcoded hex colors in the modal (`#040013`, `#0b0d3a`, `#4fe6ff`) instead of centralized brand tokens.

## 6. Atualização de estado — 2026-03-06

- `PortfolioModal.tsx` foi alinhado com as variants oficiais do modal.
- backdrop agora usa easing Ghost vindo de `modal/variants.ts`.
- backdrop, gradiente ambiente, selection e focus ring migraram para tokens (`background`, `neutral`, `primary`).
- trap de foco, `Esc`, portal e focus return permanecem preservados.

## 7. Atualização de estado — 2026-03-07

- `AdaptiveMediaLayout.tsx` deixou de forçar `format=webp` no proxy de imagens do Supabase.
- `modal-media.ts` agora seleciona apenas mídia específica do case para o hero interno; capa/thumb permanecem restritas ao grid.
- Quando o projeto não possui mídia interna além da capa, o modal assume estado vazio controlado em vez de repetir a thumb.
- Embed do YouTube permanece com autoplay, mute e loop via utilitário central `getYouTubeEmbedUrl`.
- Os botões de fechamento nas primitives de `dialog` e `sheet` passaram a expor `aria-label` explícito, fortalecendo a navegação por leitor de tela e teclado.

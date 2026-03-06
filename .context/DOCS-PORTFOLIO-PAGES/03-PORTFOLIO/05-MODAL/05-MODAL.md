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

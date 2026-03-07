# Implementation Plan — Auditoria Admin/CMS + Supabase + Portfolio

**Data:** 2026-03-06  
**Escopo:** Modal (Portfolio), Dashboard Admin, Realtime Pipeline, mídia/thumbs, responsividade do grid Bento.

## Fase 1 — Parsing técnico

1. Inspecionar `src/components/portfolio/PortfolioModal.tsx` e `src/components/portfolio/modal/variants.ts`.
2. Inspecionar `src/app/admin/(protected)/page.tsx` para estratégia de métricas.
3. Inspecionar `src/app/portfolio/page.tsx`, `src/app/portfolio/PortfolioClient.tsx` e componentes de galeria/cards para realtime e responsividade.
4. Cruzar com docs em `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/05-MODAL/05-MODAL.md` e `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/03-DASHBOARD.md`.

## Fase 2 — Conformidade Ghost Protocol

1. Validar A11y: `role=dialog`, `aria-modal`, trap de foco, `Esc`.
2. Validar motion: apenas `opacity + translateY`, easing `GHOST_EASE`.
3. Validar tokens: detectar hex hardcoded em componentes auditados.
4. Validar pipeline realtime entre Admin e `/portfolio`.
5. Validar mobile-first e colapso para coluna única < 768px.

## Fase 3 — Entrega documental

1. Registrar achados no `docs/AUDIT_PENTEST.md` com severidade e snippet corretivo.
2. Atualizar docs de estado em `.context` para manter code↔docs sincronizados.
3. Executar checagem de lint direcionada aos arquivos auditados.

## Status de Execução — 2026-03-06

- `Fase 1` concluída: arquivos auditados e docs de referência validados.
- `Fase 2` concluída:
  - `/portfolio` agora assina `portfolio_projects` no client e refresca a rota ao receber eventos realtime.
  - dashboard admin migrou as métricas para `Promise.all`.
  - `PortfolioModal` saiu de `easeInOut` e passou a consumir variants/tokens Ghost.
  - `ProjectCard` removeu os hex hardcoded do recorte auditado.
  - `ProjectsTable` recebeu fallback explícito para erro de thumb.
- `Fase 3` em andamento:
  - `docs/AUDIT_PENTEST.md` atualizado com a execução.
  - docs de contexto de gallery/modal/dashboard sincronizados neste ciclo.
  - validação final pendente de lint/typecheck.

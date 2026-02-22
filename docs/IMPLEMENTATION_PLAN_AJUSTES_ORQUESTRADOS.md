# Implementation Plan — Ajustes Orquestrados (Ghost)

Data: 2026-02-20
Workflow base: `.agent/workflows/ajustes-orquestrados.md`
Fonte de verdade: `docs/AUDIT_EXECUTION_PLAN.md`

## Escopo desta execução
- Home: Header/Hero/Video Manifesto.
- Portfolio: Gallery filters + Project cards + modal a11y continuity.
- Global: spacing consistency (24 mobile / 64 desktop) em `.std-grid`.
- Governança: atualização de `.context` e relatório em `AUDIT_PENTEST.md`.

## Fase 1 — Escaneamento técnico
- Mapear componentes reais usados nas rotas Home e Portfolio.
- Conferir tokens/motion/easing ativos no código.
- Conferir stack atual (Next/React) e dependências de assets.

## Fase 2 — Conformidade
- Grid: aplicar padrão de container 24/64.
- Aesthetics: reforçar overlay/contraste no manifesto de vídeo.
- Motion: remover `scale` dos cards e manter Ghost easing `[0.22,1,0.36,1]`.
- A11y: adicionar semântica de tabs/filtros e estado selecionado.

## Fase 3 — Implementação
- Ajustar z-index e stacking context do Hero para manter copy acima do WebGL.
- Corrigir overlay do Video Manifesto (`bg-background/80`, sem bloquear interação).
- Atualizar `ProjectsGallery` com ARIA (`tablist`/`tab`/`aria-selected`) e navegação por teclado.
- Remover `scale` no hover de `ProjectCard`.
- Validar restauração de foco no fechamento de modal e robustez dos gatilhos.
- Ajustar `.std-grid` para 24px mobile / 64px desktop.

## Fase 4 — Vetagem (QA)
- Rodar `pnpm lint` e `pnpm typecheck`.
- Revisar rapidamente estados mobile/desktop nos componentes alterados.
- Registrar mudanças em `.context/logs/adjustment_log.md`.
- Consolidar achados e fixes em `AUDIT_PENTEST.md`.

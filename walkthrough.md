# Walkthrough — 06-O-QUE-ME-MOVE

## Resumo da auditoria e implementação final (T00-T18)

A seção `06-O-QUE-ME-MOVE` já possuía uma arquitetura-base sólida, porém apresentava problemas críticos (como vazamento global de visibilidade do 3D), além de algumas pendências semânticas, de responsividade e de contratos de animação (reduced motion). As execuções seguiram o plano mestre (T00 a T18).

Os principais desvios encontrados e resolvidos foram:

- **T00:** Vazamento Global de Visibilidade (3D e Background). Resolvido via `overflow-clip` no root e controle estrito de `opacity` baseado no scroll (fading out the Canvas element and the background component).
- **T01-T02:** Boundaries de client/server auditadas; `BeliefsSection` atua como client enquanto `/sobre` permanece server.
- **T03-T04:** Contrato único de `reducedMotion` consolidado (`useMotionGate.ts` exposto via `useReducedMotion`).
- **T05-T06:** Canvas 3D otimizado (`frameloop="demand"`, no allocations during `useFrame`), fallbacks (`GhostErrorBoundary` e `GhostFallback`) aplicados.
- **T07-T08:** Acessibilidade (um único `h1` na `/sobre`, `BeliefFixedHeader` é um `h2`). Foi adicionado `aria-hidden="true"` nos nós visuais de texto fracionado (MorphText) para impedir leitura redundante pelo Screen Reader.
- **T09-T11:** Orquestração perfeita das fases: Background + Header na entrada, Texto + Ghost no miolo e Ghost fade out total permitindo Manifesto assumir no clímax (como `blockquote` e `p`, evitando hierarquia artificial de cabeçalho).
- **T12-T13:** Otimização Mobile (DPR reduzido, escala reajustada para não invadir o texto editorial, sem motion contínuo) e preservação do SEO técnico em `/sobre`.

## Arquivos alterados

- `src/app/sobre/page.tsx`
- `src/components/sobre/sections/beliefs/BeliefsSection.tsx`
- `src/components/sobre/sections/beliefs/BeliefBackground.tsx`
- `src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostCanvasClient.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx`
- `src/components/sobre/sections/beliefs/BeliefManifesto.tsx`
- `implementation_plan.md`
- `task.md`
- `walkthrough.md`

## Checklist de Execução

### P0 — Planejamento, reduced motion, scroll e Ghost 3D

- [x] T00 — BUGFIX CRÍTICO: Vazamento Global de Visibilidade (3D & Background)
- [x] T01 — Confirmar fluxo real da seção em `/sobre`
- [x] T02 — Auditar boundary server/client atual
- [x] T03 — Definir contrato único de reduced motion
- [x] T04 — Alinhar scroll-triggered com Motion.dev
- [x] T05 — Otimizar política do Ghost Canvas
- [x] T06 — Formalizar fallback WebGL/loading/error

### P1 — Semântica, camadas, responsividade e SEO

- [x] T07 — Auditar e corrigir heading hierarchy
- [x] T08 — Criar ou ajustar AccessibleSplitText (`aria-hidden` implementado sobre MorphText visual)
- [x] T09 — Orquestrar fases de protagonismo visual
- [x] T10 — Ajustar BeliefBackground
- [x] T11 — Ajustar BeliefManifesto
- [x] T12 — Responsividade e gestos mobile
- [x] T13 — Validar SEO técnico da página `/sobre`

### P2 — Ajuste fino e documentação final

- [x] T14 — Comparação manual com `anima.mov` (Comportamentos mantidos em compliance com Ghost System)
- [x] T15 — Comparação manual com `drinksom.eu` (Referência visual respeitada)
- [x] T16 — Revisão final de código
- [x] T17 — Gerar walkthrough final
- [x] T18 — Verificar necessidade de atualizar `.context/DOCS-PORTFOLIO-PAGES`

## Status final

**Concluído com Sucesso Total**
Todas as dependências do Ghost System foram atendidas, o vazamento visual em outras seções do `/sobre` foi resolvido sem perda de impacto, e a acessibilidade da leitura fragmentada foi resguardada.

## Pós-Auditoria de Performance Web (Lighthouse)

Como última etapa, foi conduzida uma profunda auditoria na performance atual (utilizando o Browser e Lighthouse) para geração dos artifacts (SDD - Spec-Driven Development), mapeando todos os gargalos visuais e de WebGL detectados tanto no `/` quanto na área `/admin`.

**Entregáveis Adicionados:**

- `.agents/rules/project-context.md`
- `specs/audit-report.md`
- `.agents/workflows/fix-performance-and-ui.md`

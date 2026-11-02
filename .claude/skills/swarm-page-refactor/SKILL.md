---
name: swarm-page-refactor
description: Orquestra agentes especializados para correção de layout, animações, usabilidade e testes E2E automatizados com verificação visual no Claude Code.
---

# Swarm Page Refactor & QA Pipeline

## Objetivo

Atuar como Lead Orchestrator para gerenciar correções de layout, ajustes de física/motion, ergonomia de UX/A11y e validação de regressão visual com testes automatizados.

## Batalhão de Especialistas (Subagentes Lógicos)

1. **Lead Orchestrator (Você)**: Mantém o checklist, define a ordem de execução e barra merges sem testes verdes.
2. **Layout & Styling Specialist**:
   - Resolve CSS Grid, Flexbox, viewport clipping e breakpoints mobile/desktop.
   - Proibido uso de hacks como `overflow-x: hidden` no `body` sem resolver o container culpado.
3. **Motion & Interaction Specialist**:
   - Audita curvas de interpolação, molas (`stiffness`, `damping`) e delays em cascata (stagger).
   - Força o uso exclusivo de `transform` e `opacity` para evitar reflows de layout.
   - Implementa suporte estrito a `@media (prefers-reduced-motion: reduce)`.
4. **UX & A11y Auditor**:
   - Garante conformidade WCAG AA (contraste mínimo de 4.5:1 para texto padrão).
   - Audita hierarquia de foco de teclado (`:focus-visible`), atributos ARIA e tags interativas.
5. **QA & Automation Guard**:
   - Cria e roda scripts headless/headed com Playwright.
   - Exige console sem exceções e snapshot comparativo.

## Protocolo de Execução Estrito

### Passo 1: Baseline e Diagnóstico

- Inicie ou verifique o dev server (`npm run dev` ou `pnpm dev`).
- Identifique a URL da página alvo (ex.: `http://localhost:3000/TARGET_PATH`).
- Capture o baseline de erros via console ou testes prévios.

### Passo 2: Correção Estrutural (Layout)

- Aplique primeiro as correções de estrutura e responsividade.
- Verifique estabilidade do DOM antes de aplicar camadas cosméticas ou de movimento.

### Passo 3: Engenharia de Animações

- Implemente e refine os motion tokens.
- Certifique-se de que nenhum elemento em animação cause travamento de thread ou CLS (Cumulative Layout Shift).

### Passo 4: Ergonomia e Acessibilidade

- Garanta estados visíveis de feedback em ações interativas (`hover`, `active`, `loading`, `disabled`).

### Passo 5: Verificação Mandatória (Definition of Done)

Nenhuma tarefa é finalizada sem a aprovação nos três gates:

1. `npx tsc --noEmit` (sem erros de tipagem).
2. `npm run lint` ou `pnpm lint` (sem warnings impeditivos).
3. Teste E2E via Playwright (`npx playwright test tests/visual-qa.spec.ts`).

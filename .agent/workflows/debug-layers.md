---
description: # Sistema de Debugging de Camadas & Stacking Context (Frontend)
---

---

# Sistema de Debugging de Camadas & Stacking Context (Frontend)

## 1. System Overview

Este sistema multi-agente é projetado para diagnosticar e corrigir conflitos de sobreposição visual ("z-index wars") e interatividade (bloqueio de cliques) em uma arquitetura híbrida (DOM + WebGL). O fluxo separa a análise estrutural do código (identificação de *Stacking Contexts* criados por Tailwind e Framer Motion) da inspeção visual e correção técnica.

**Arquitetura:**

1. **Reconhecimento:** Análise estática do código para identificar onde novos contextos de empilhamento são criados.
2. **Diagnóstico:** Inspeção do comportamento do Canvas (Three.js) versus UI (HTML/Tailwind).
3. **Resolução:** Aplicação de correções via utilitários do Tailwind ou propriedades do Fiber.

## 2. Agent Definitions (Prompts)

### 🤖 Agent A: Context Auditor (Orchestrator) - use o agent ".agent/agents/Debugging Agent - Systematic Bug Hunter"

**Role:** Senior Frontend Architect especializado em CSS Rendering Engine e React.
**Goal:** Mapear a árvore de componentes e identificar a criação acidental de Stacking Contexts que causam erros de camadas.
**Instructions:**

- Analise os arquivos em `PROJECT_ROOT/app` e componentes UI.
- Identifique elementos que criam novos *Stacking Contexts* (propriedades como `opacity < 1`, `transform`, `filter`, `z-index` não-auto, `isolation: isolate`).
- Atenção redobrada ao **Framer Motion**: componentes `<motion.div>` frequentemente alteram `transform`, criando contextos que "prendem" o `z-index` dos filhos.
- Verifique a posição do componente `<Canvas>` (React Three Fiber). Ele está como `fixed` ou `absolute` cobrindo a tela?
- Gere um relatório de "Z-Index Trap": onde um elemento filho tem `z-9999` mas está preso dentro de um pai com `z-0`.

**Skills para execussão**

- use a skill-systematic-debugging;
- use a skill-react-best-practices;
- use a skill-concise-planning;

### 🤖 Agent B: Visual Debugger (Specialist)  - use o agent '.agent/agents/debugger.md'

**Role:** QA Automation Engineer & CSS Expert.
**Goal:** Executar testes visuais e aplicar correções de código para garantir a interatividade correta.
**Inputs:** Relatório de "Z-Index Trap" e estrutura de componentes do Agente A.
**Output:** Snippets de correção (Tailwind classes) e script de debug visual.
**Instructions:**

- **Debug Visual:** Proponha a injeção temporária de um script ou classe global (ex: `* { outline: 1px solid red }` ou cores de fundo semitransparentes) para visualizar as caixas delimitadoras.
- **Correção de Interatividade:** Se a UI sobrepõe o Canvas mas bloqueia eventos 3D (ou vice-versa), sugira o uso de `pointer-events-none` no container da UI e `pointer-events-auto` nos botões/inputs específicos.
- **Ferramentas do Browser:** Instrua o usuário a abrir a aba "Layers" (Camadas) no Chrome DevTools para visualizar a renderização 3D do DOM.
- **Tailwind Fix:** Forneça as classes exatas para corrigir o problema (ex: adicionar `z-50 relative` na Navbar e `z-0 fixed inset-0` no Canvas Background).

**Skills para execussão**

- use a skill-frontend-design;
- use a skill-web-design-guidelines;
- use a skill-lint-and-validate;

## 3. Workflow Logic (Updated)

- **Skill Injection:**
  - O **Agent A** DEVE invocar a skill `systematic-debugging` ao iniciar para gerar uma árvore de hipóteses.
  - O **Agent A** utiliza a skill `react-best-practices` para validar se a estrutura do componente `<Canvas>` viola regras de composição do React.
- **Trigger:** Detecção de clique não responsivo ou elemento visualmente oculto.

---

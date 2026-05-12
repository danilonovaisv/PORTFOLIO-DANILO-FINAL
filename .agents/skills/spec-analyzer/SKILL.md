---
name: spec-analyzer
description: Usa-se para analisar documentação visual e textual do projeto e gerar planos de delegação técnica para agentes executores.
compatibility: antigravity
---

# Spec Analyzer

## Instruções de Análise
1. **Entrada:** Solicite ou identifique o caminho da documentação (ex: `.context/DOCS-PORTFOLIO-PAGES/02-HERO-HOME.md`).
2. **Extração:** Mapeie os seguintes itens:
   - Componentes afetados.
   - Design tokens necessários (Tailwind v4).
   - Comportamento de animação (Framer Motion / R3F).
   - Estados de interface (Loading, Empty, Error).
3. **Delegação:** Formate a saída como uma lista de tarefas atribuídas a agentes específicos (ex: `@frontend-specialist: Criar componente Hero utilizando os tokens documentados`).

## Restrições
- Não forneça código-fonte nesta etapa, apenas arquitetura e diretrizes.
- Se os requisitos de acessibilidade (a11y) estiverem ausentes, adicione um checklist obrigatório (ex: foco de teclado, `prefers-reduced-motion`).

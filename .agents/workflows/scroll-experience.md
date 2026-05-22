---
description: Audita e otimiza a fluidez das animações Framer Motion baseadas em scroll e as interações globais de UI/UX.
---

# Otimização de Scroll e Motion Experience

1. Inspecione os hooks de animação localizados em `@src/hooks/` (ex: `useGhostReveal.ts`, `useScrollReveal.ts`) e a integração com o `lenis`.
2. Valide os componentes de interface em `@src/components/motion/` garantindo o uso correto das `variants` do Framer Motion para reduzir o overhead de renderização.
3. Assegure que transições modifiquem exclusivamente propriedades transformáveis (`opacity`, `transform`, `filter`) para evitar triggers de Layout/Reflow.
4. Teste a aderência às práticas de Acessibilidade (WCAG) verificando o suporte ao hook `useReducedMotion`:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/eslint @src/components/motion/ --ext .tsx,.ts`
5. Utilize o Chrome DevTools MCP para auditar o Cumulative Layout Shift (CLS) e garantir que o scroll-snap ou parallax não causem instabilidade visual.

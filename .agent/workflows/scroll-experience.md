---
description: Audita e otimiza a fluidez das animações Framer Motion baseadas em scroll e as interações globais de UI/UX.
---

# Otimização de Scroll e Framer Motion

1. Inspecione os hooks de animação localizados em `@src/hooks/` (como `useGhostReveal.ts`, `useLERPScroll.ts`, `useReducedMotion.ts`).
2. Valide os componentes de interface em `@src/components/motion/` garantindo o uso correto do hook `useReducedMotion` do Framer Motion para aderir às práticas obrigatórias de Acessibilidade (WCAG).
3. Assegure que transições modifiquem exclusivamente propriedades performáticas (como `transform` e `opacity`) ao invés de propriedades que desencadeiam Reflow no DOM (como `width`, `top`, `left`).
4. Teste a integridade estrutural das rotinas de motion executando a análise estática:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/eslint src/components/motion/ --ext .tsx,.ts`
5. Utilize o MCP do Chrome DevTools para emitir relatórios de Cumulative Layout Shift (CLS) e certificar que a animação não afeta as métricas do Core Web Vitals.

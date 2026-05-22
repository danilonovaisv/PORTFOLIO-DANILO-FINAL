---
description: Auditoria de performance de alto nível, otimização de velocidade e conformidade com Performance Expert.
---

# Performance Audit & Speed Optimization

1. Realize uma auditoria Lighthouse (Mobile & Desktop) em `@localhost:3000` via Chrome DevTools MCP para estabelecer a linha de base.
2. Registre as métricas de Core Web Vitals (LCP, INP, CLS) para a stack Next.js 15+ e identifique gargalos na thread principal do React Three Fiber.
3. Inspecione o tamanho dos bundles e procure por dependências pesadas não tree-shaken:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/next build`
4. Execute o script de otimização de assets e compressão de mídias críticas:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/tsx scripts/optimize-vitals.ts`
5. Valide o ganho de performance com uma nova rodada de testes e documente o "Before vs After" no `walkthrough.md`.

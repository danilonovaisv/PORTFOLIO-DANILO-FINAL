---
description: Resolução sistêmica de bugs visuais, falhas de Server Components, hidratação do React e correção de métricas Core Web Vitals.
---

# Otimização de Performance e UI (Core Web Vitals)

1. Examine `@src/app/` em busca de falhas de Flash of Unstyled Content (FOUC) e problemas de hidratação causados por datas ou IDs não determinísticos.
2. Valide a consistência das classes utilitárias e tokens do Ghost Design System em `@src/styles/` e `tailwind.config.ts`.
3. Verifique se todas as imagens externas (Supabase Storage) utilizam o componente `next/image` com `placeholder="blur"` e domínios autorizados.
4. Realize a análise de peso dos chunks e bundle do Next.js:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/next build --debug`
5. Utilize o Chrome DevTools MCP para identificar elementos que causam o Largest Contentful Paint (LCP) e otimizar o carregamento crítico.

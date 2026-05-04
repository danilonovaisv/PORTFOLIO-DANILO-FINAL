---
description: Resolução sistêmica de bugs visuais, falhas de Server Components, hidratação do React e correção de métricas Core Web Vitals.
---

# Otimização de Performance e Correção de UI

1. Examine o diretório raiz `@src/app/` em busca de falhas de Flash of Unstyled Content (FOUC), diretivas `"use client"` excessivas ou problemas de re-renderização.
2. Valide a consistência das classes utilitárias no Tailwind CSS, garantindo aderência ao `tailwind.config.ts`.
3. Verifique a entrega de arquivos pesados (Supabase Storage). Toda imagem renderizada na UI deve estar encapsulada pelo componente nativo `next/image` garantindo otimização (WebP/AVIF).
4. Proceda com a compilação do Next.js para validar a quebra estática e gerar os artefatos de mapa de peso (Bundle size):
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/next build`
5. Invista no uso do Chrome DevTools MCP para levantar scores do Lighthouse em busca de penalizações de LCP (Largest Contentful Paint).

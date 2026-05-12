---
description: Implementação e auditoria de design de endpoints (Route Handlers e Server Actions) conectados ao Supabase Storage e Database.
---

# Integração de API e Backend Supabase

1. Audite o diretório `@src/app/api/` e os módulos utilitários em `@src/lib/supabase/` para garantir isolamento de lógica.
2. Garanta que todas as operações com o banco ou manipulação de mídia no Supabase Storage utilizem os clients SSR seguros configurados via `@supabase/ssr`.
3. Verifique o tratamento de erros em blocos `try/catch` dentro das Server Actions, garantindo que erros de validação retornem formatos compatíveis com o frontend.
4. Conecte-se ao Supabase MCP para analisar schemas de tabelas e resolver conflitos de inferência de tipos.
5. Invoque o validador de TypeScript focado na tipagem de retorno da API e schemas Zod:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsc --project tsconfig.json --noEmit`

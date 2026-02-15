# 13-REFERÊNCIAS-CONTEXT7

## Contexto
Consulta realizada via MCP Context7 para fundamentar a análise de `/admin`.

## Bibliotecas consultadas
- Next.js: `/vercel/next.js`
- Motion/Framer Motion: `/grx7/framer-motion`
- Supabase SSR: `/supabase/ssr`

## Principais pontos utilizados
### Next.js
- rotas dinâmicas e metadata server-side para App Router.
- estratégia de renderização dinâmica com `force-dynamic` e controle de cache.

Fontes Context7:
- https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.mdx
- https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx

### Motion / Framer Motion
- `AnimatePresence` para transições de entrada/saída.
- `MotionConfig` para governança de `reducedMotion`.

Fontes Context7:
- https://context7.com/grx7/framer-motion/llms.txt

### Supabase SSR
- middleware para refresh de sessão.
- proteção server-side de rotas com `auth.getUser()`.
- padrão de cookies server-safe no App Router.

Fontes Context7:
- https://context7.com/supabase/ssr/llms.txt
- https://github.com/supabase/ssr/blob/main/docs/design.md

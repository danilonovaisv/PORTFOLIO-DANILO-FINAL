# 12-REFERÊNCIAS-CONTEXT7

## Contexto
Consulta realizada via MCP Context7 para fundamentar a análise de `/portfolio`.

## Bibliotecas consultadas
- Next.js: `/vercel/next.js`
- Motion/Framer Motion: `/grx7/framer-motion`
- Supabase SSR: `/supabase/ssr`

## Principais pontos utilizados
### Next.js (App Router)
- `generateMetadata` é server-side e adequado para metadata dinâmica por rota.
- Segment config (`dynamic`, `fetchCache`) orienta renderização dinâmica e cache.
- Rotas dinâmicas (`[slug]`) com `params` assíncrono em Server Components.

Fontes Context7:
- https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/14-metadata-and-og-images.mdx
- https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.mdx
- https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/caching.mdx

### Motion / Framer Motion
- `MotionConfig` pode centralizar política de reduced motion.
- `AnimatePresence` é o padrão para entradas/saídas de modal com transição de desmontagem.

Fontes Context7:
- https://context7.com/grx7/framer-motion/llms.txt
- https://github.com/grx7/framer-motion/blob/main/packages/framer-motion/README.md

### Supabase SSR
- `createServerClient` em middleware/Server Components para sessão consistente.
- `auth.getUser()` em server-side para proteger rotas.
- refresh de sessão no middleware é parte central do fluxo SSR.

Fontes Context7:
- https://context7.com/supabase/ssr/llms.txt
- https://github.com/supabase/ssr/blob/main/docs/design.md

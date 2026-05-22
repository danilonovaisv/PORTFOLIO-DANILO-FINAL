---
description: Verificação de segurança estrutural, RLS (Row Level Security) no Supabase, e validação de chaves de ambiente.
---

# Auditoria de Segurança e Compliance

1. Escaneie todos os Server e Client Components em `@src/app/` para rastrear injeção indevida de variáveis de ambiente.
2. Certifique-se de que somente chaves explicitamente públicas utilizem o prefixo `NEXT_PUBLIC_` para evitar exposição de segredos.
3. Analise as políticas Row Level Security (RLS) aplicadas aos buckets em `@supabase/storage`. Garanta que rotas de administração retenham restrição de token.
4. Execute uma checagem de vulnerabilidades em todas as dependências locais:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/pnpm audit`
5. Valide a integridade do arquivo `.env.local` contra o template de produção, garantindo que nenhum segredo foi commitado em `@.env`.
6. Ao encontrar dependências obsoletas com risco severo ou brechas no Supabase, documente a falha em `ERRORS.md` e acione `/log-error`.

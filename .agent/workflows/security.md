---
description: Verificação de segurança estrutural, RLS (Row Level Security) no Supabase, e validação de chaves de ambiente.
---

# Auditoria de Segurança e Compliance

1. Escaneie todos os Server e Client Components da árvore do Next.js para rastrear injeção indevida de variáveis de ambiente.
2. Certifique-se de que somente chaves explicitamente públicas utilizem o prefixo `NEXT_PUBLIC_` para evitar exposição de segredos.
3. Analise as políticas Row Level Security (RLS) aplicadas aos buckets do Supabase Storage. Garanta que rotas de administração retenham restrição de token.
4. Execute uma checagem de vulnerabilidades em todas as dependências locais:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/npm audit`
5. Ao encontrar dependências obsoletas com risco severo ou brechas no Supabase, documente a falha e acione `/log-error`.

---
description: Automatiza a sincronização, varredura de duplicatas e limpeza de assets não utilizados no Supabase Storage utilizando os scripts internos.
---

# Sincronização e Governança de Assets (Supabase)

1. Mapeie os assets necessários lendo `@src/config/site-assets.ts` e compare com o estado atual do bucket no Supabase Storage.
2. Acione o script de sincronização para espelhar assets locais e remotos:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/sync-site-assets.ts`
3. Identifique e resolva duplicatas ou links órfãos no banco de dados PostgreSQL via MCP:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/fix-duplicate-assets.ts`
4. Varra mídias não referenciadas que estão consumindo cota de armazenamento:
   `// turbo /Users/danilonovais/.local/bin/node scripts/check-unused-assets.cjs`
5. Documente anomalias críticas e atualize `@.context/knowledge-graph.md` com o novo mapa de dependências de mídia.
---
description: Automatiza a sincronização, varredura de duplicatas e limpeza de assets não utilizados no Supabase Storage utilizando os scripts internos.
---

# Sincronização e Governança de Assets (Supabase)

1. Analise as configurações de assets globais lendo `@src/config/site-assets.ts` e a pasta `@scripts/` para entender as ferramentas disponíveis.
2. Acione o script de sincronização primária para garantir que os assets locais e remotos estão espelhados corretamente:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/sync-site-assets.ts`
3. Verifique as anomalias, como assets duplicados ou links corrompidos no banco de dados:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/fix-duplicate-assets.ts`
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/check-storage-links.ts`
4. Execute a auditoria final para varrer mídias não utilizadas no projeto que estão consumindo espaço no bucket (Egress/Storage limit):
   `// turbo /Users/danilonovais/.local/bin/node scripts/check-unused-assets.cjs`
5. Se houver falhas críticas de deleção ou permissão RLS, pare a execução e informe o usuário detalhadamente, sugerindo correção via MCP Supabase.
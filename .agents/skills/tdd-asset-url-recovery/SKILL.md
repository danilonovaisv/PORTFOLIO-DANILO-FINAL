---
name: tdd-asset-url-recovery
description: Aplica TDD para corrigir resolução de URLs de assets após migração de Supabase Storage para Cloudflare R2.
---

# TDD Asset URL Recovery

## O que faz

Garante que correções de URL sejam guiadas por testes de regressão, preservando conteúdo e comportamento anterior.

## Quando usar

- Ao alterar `getAssetUrl`, `buildSupabaseStorageUrl`, `resolveSupabaseUrl`, `supabaseLoader` ou contratos de mídia.
- Ao mudar a forma como cards, galerias, hero e páginas de projeto resolvem assets.

## Quando não usar

- Para uma auditoria puramente read-only.
- Para editar dados remotos antes de haver teste e backup.

## Contrato operacional

Entrada: comportamento atual, casos reproduzidos e contrato esperado do resolver.

Saída: testes RED, implementação GREEN, refactor e evidência de execução.

## Procedimento

1. Reproduza uma URL antiga que ainda escapa para Supabase.
2. Escreva testes que falhem para essa URL.
3. Cubra buckets `site-assets` e `portfolio-media`, URLs R2, externas, locais, signed/private, caracteres especiais, imagens, vídeos e modelos 3D.
4. Implemente a menor correção possível.
5. Execute testes específicos, depois suite relevante.
6. Faça revisão de qualidade e verifique que nenhuma URL externa foi reescrita.
7. Registre comandos e resultados.

## Critério de conclusão

Todos os testes novos passam, os testes anteriores continuam verdes e a correção não converte URLs sem correspondência comprovada.

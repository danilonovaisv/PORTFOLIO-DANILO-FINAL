---
name: resolve-legacy-storage-urls
description: Resolve URLs públicas antigas do Supabase Storage para URLs canônicas do Cloudflare R2 sem quebrar links externos, assets privados ou caminhos locais.
---

# Resolve Legacy Storage URLs

## O que faz

Define uma resolução determinística de URLs de assets, convertendo referências públicas legadas do Supabase para a URL R2 correspondente, com preservação do bucket e object key.

## Quando usar

- Uma página ainda requisita `*.supabase.co/storage/v1/...`.
- Um campo de projeto guarda URL absoluta antiga.
- O helper atual retorna URLs HTTP sem normalização.
- Paths e URLs estão misturados em campos de mídia.

## Quando não usar

- URLs externas de terceiros.
- URLs assinadas, privadas ou com token de autorização.
- Objetos sem correspondência exata no inventário.
- Links que não representem Storage público.

## Contrato operacional

Entrada: valor original, bucket lógico conhecido, inventário de assets e configuração pública R2.

Saída: URL canônica, caminho local/external preservado, ou estado explícito `unresolved`. Nunca invente uma URL.

## Árvore de decisão

1. `data:`/`blob:`: preservar.
2. Caminho local reconhecido: preservar.
3. URL HTTPS externa que não é host Supabase reconhecido: preservar.
4. URL Supabase pública: extrair bucket e key pela rota conhecida.
5. URL Supabase signed/private: marcar `signed_or_private`; não converter para público.
6. Path relativo: resolver apenas com bucket explícito ou regra de bucket comprovada.
7. Match exato no inventário: construir URL a partir de `file_url` canônico.
8. Sem match ou com mais de um match: retornar estado não resolvido e registrar evidência.

## Regras de implementação

- Faça parsing com `URL`, não com substituição textual global.
- Separe pathname, query e fragment.
- Decodifique e codifique cada segmento uma única vez.
- Trate `/storage/v1/object/public/{bucket}/{key}` e `/storage/v1/render/image/public/{bucket}/{key}`.
- Não envie parâmetros de transformação Supabase para R2.
- Preserve extensão e tipo do arquivo.
- Evite duplicação de prefixos `site-assets/` e `portfolio-media/`.
- Não use fallback silencioso para Supabase quando o projeto estiver em modo Cloudflare-only.
- Não confunda `NEXT_PUBLIC_R2_PUBLIC_URL` ausente no build com URL externa válida.

## Verificação

Teste URL pública Supabase, URL render Supabase, URL R2, URL externa, signed URL, path local, `data:`, `blob:`, caracteres escapados, vídeo e arquivo 3D.

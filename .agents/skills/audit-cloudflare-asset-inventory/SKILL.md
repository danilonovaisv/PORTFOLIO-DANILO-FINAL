---
name: audit-cloudflare-asset-inventory
description: Audita e reconcilia inventários de assets entre JSON, banco de dados e Cloudflare R2. Use quando imagens, vídeos, capas ou galerias perderem suas referências após migração de storage.
---

# Audit Cloudflare Asset Inventory

## O que faz

Constrói um inventário canônico e um relatório de correspondência entre conteúdo publicado, metadados de assets e objetos Cloudflare R2.

## Quando usar

- Depois de migrar Supabase Storage para R2.
- Quando existirem `assets.json`, `site-assets.json`, exports ou registros D1.
- Quando projetos publicados estiverem com mídias quebradas ou URLs antigas.

## Quando não usar

- Para alterar o banco ou o bucket diretamente.
- Para adivinhar caminhos a partir do nome de um arquivo.
- Para converter URLs externas, privadas ou assinadas.

## Contrato operacional

Entradas: inventários JSON, schema/queries do banco ativo, configuração R2 e conteúdo publicado.

Saídas: inventário normalizado, tabela de reconciliação e relatório de itens `matched`, `verified`, `missing`, `ambiguous`, `external`, `signed_or_private` e `malformed`.

## Procedimento

1. Leia os JSON completos e valide o schema antes de processar.
2. Detecte estruturas aninhadas, incluindo `export_json`, arrays e JSON serializado em strings.
3. Normalize `bucket`, `file_path`, `key` e `file_url`, preservando o valor original.
4. Use `bucket + normalized_file_path` como chave principal.
5. Use `id` e `key` para resolver duplicatas e rastrear proveniência.
6. Cruze com os campos reais de conteúdo: thumbnails, hero, gallery, case body, landing pages, previews e metadata.
7. Gere um relatório de duplicatas e colisões. Não escolha automaticamente em caso de ambiguidade.
8. Compare com o inventário R2 real, paginando até o fim.
9. Não altere arquivos de inventário ou banco nesta skill.

## Critérios de verificação

- JSON válido e contagens reproduzíveis.
- Nenhum match baseado apenas no basename.
- Buckets lógicos preservados.
- Totais por projeto, tipo, bucket e status.
- Cada registro rastreável até seu arquivo de origem.

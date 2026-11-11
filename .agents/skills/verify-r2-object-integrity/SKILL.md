---
name: verify-r2-object-integrity
description: Verifica se object keys existem no bucket Cloudflare R2 e se as URLs públicas do custom domain entregam o arquivo correto.
---

# Verify R2 Object Integrity

## O que faz

Confirma a integridade entre inventário, object key física, metadados do objeto e resposta HTTP pelo domínio CDN.

## Quando usar

- Antes de substituir links antigos por R2.
- Após sincronização ou migração de objetos.
- Para investigar 404, 403, 5xx, MIME incorreto ou custom domain inativo.

## Quando não usar

- Para excluir, mover ou reescrever objetos.
- Para alterar configurações do bucket, DNS, custom domain, cache ou acesso público sem aprovação.

## Contrato operacional

Entradas: bucket físico, prefixo lógico, object key, URL CDN e credenciais já presentes no ambiente.

Saídas: resultado por objeto com `key`, `exists`, HTTP status, content-type, content-length, etag e erro.

## Procedimento

1. Verifique a configuração e o binding do bucket físico.
2. Use `HeadObject`/`HeadBucket` ou helper read-only existente.
3. Verifique a URL pública com `HEAD`; quando necessário, use `GET` com `Range: bytes=0-0`.
4. Use timeout, concorrência limitada e retry exponencial com jitter.
5. Respeite paginação em listagens.
6. Compare MIME com extensão e tipo declarado.
7. Diferencie objeto ausente, permissão negada, custom domain inativo, erro transitório e URL malformada.
8. Não registre segredos nem dados de autenticação.

## Critérios de verificação

- Cada URL marcada como `verified` teve confirmação física e HTTP.
- Não confundir 200 de cache/optimizer com existência do objeto original.
- Falhas e itens não testados aparecem no relatório.
- Nenhuma operação mutável foi executada.

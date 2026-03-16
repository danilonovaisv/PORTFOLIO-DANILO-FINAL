# Plano de Implementacao — Auditoria Squirrel 2026-03-15

## Escopo executado

- Corrigir JSON-LD invalido que quebrava validacao estruturada.
- Normalizar titulos SEO para evitar sufixo duplicado no App Router.
- Corrigir hierarquia de headings em `/portfolio/[slug]`.
- Reduzir falsos positivos de auditoria em CAPTCHA e `alt` na Home.
- Atualizar documentacao tecnica e registro de auditoria.

## Fora de escopo nesta execucao

- Achados sobre captions/acessibilidade de videos decorativos.
- Reauditoria completa do dominio em ambiente publicado.
- Otimizacoes pesadas de TTFB e bundle que exigem nova rodada de medicao.

## Validacao esperada

- `pnpm exec eslint` nos arquivos alterados.
- `pnpm run typecheck`
- verificacao local dos metadados e headings sem regressao.

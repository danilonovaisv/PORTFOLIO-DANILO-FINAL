# 09-COPY-AGENT

## 0. Estrutura de arquivos da sessão

- `src/app/admin/(protected)/copy-agent/page.tsx`
- `src/app/admin/(protected)/copy-agent/actions.ts`
- `src/components/admin/FieldTooltip.tsx`

## 1. Objetivo da sessão

Gerar copy editorial para cases de portfólio com consistência de linguagem e suporte a referências visuais.

## 2. Funcionalidades

- formulário com contexto completo (projeto, cliente, objetivo, público, conceito, desafios).
- upload opcional de imagens de referência.
- retorno em markdown com ação de copiar.

## 3. Segurança e validação

- validação por `zod`.
- limite de tamanho/quantidade/tipo de arquivo.
- depende de `OPENAI_API_KEY`.

## 4. Inconformidades observadas

- Inconformidade média: estabelecer política de fallback quando OpenAI indisponível (mensagem operacional + retry guideline).

## 5. Atualização de estado — 2026-03-08

- O preview do `Copy Agent` agora usa um renderer Markdown compartilhado (`src/components/ui/GhostMarkdown.tsx`) em vez de estilos isolados.
- Quebras de linha simples passaram a ser respeitadas nas saídas dinâmicas, reduzindo colapso visual de parágrafos em cases e modais.
- A hierarquia tipográfica de `h1`, `h2` e `h3` foi alinhada aos tokens Ghost (`text-h1`, `text-h2`, `text-h3`) para manter consistência editorial entre admin e front público.

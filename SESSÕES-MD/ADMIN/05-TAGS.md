# 05-TAGS

## 0. Estrutura de arquivos da sessão
- `src/app/admin/(protected)/tags/page.tsx`
- `src/app/admin/(protected)/tags/actions.ts`
- `src/components/admin/TagForm.tsx`

## 1. Objetivo da sessão
Gerenciar taxonomia para filtros e organização editorial dos projetos.

## 2. Estratégia
- grupos por `kind` (`category`, `discipline`, `industry`).
- `upsert` e `delete` com validação por `zod`.

## 3. Pontos fortes
- semântica clara na UI.
- revalidação coerente com páginas dependentes.

## 4. Inconformidades observadas
- Inconformidade baixa: adicionar prevenção explícita de deleção de tag ainda vinculada a projeto (se a regra de negócio exigir bloqueio).

# TASK 4 — Remocao de tags das views internas do Post Modal

- Data: 2026-03-06
- Status: concluido

## Contexto do problema

As tags nao devem aparecer dentro da view interna do Post Modal; elas pertencem a contextos de listagem, filtro e organizacao.

## Comportamento anterior

- existia renderizacao de tags em `ContentContainer`, componente interno relacionado ao ecossistema do modal.

## Causa raiz

O componente interno ainda mantinha um bloco de badges de tags, apesar da decisao de produto ja ter removido esse elemento da experiencia interna.

## Solucao implementada

- removido o bloco de tags de `ContentContainer`, preservando apenas metadados e CTA.

## Arquivos modificados

- `src/components/portfolio/content/ContentContainer.tsx`

## Impacto no ADMIN

- nenhum impacto estrutural no painel;
- a documentacao do ADMIN passa a registrar a regra oficial da view interna.

## Impacto no Supabase

- nenhum.

## Impacto no front

- tags continuam disponiveis para filtros e listagens;
- views internas do modal deixam de exibir badges redundantes.

## Regra final de funcionamento

- tags nao devem ser exibidas na view interna do Post Modal;
- tags permanecem liberadas apenas em superficies de navegacao, descoberta e filtro.

## Checklist de validacao

- [x] bloco de tags removido do componente interno
- [x] CTA e metadados restantes preservados
- [x] nenhum impacto em analytics, filtros ou SEO interno identificado

## Observacoes para manutencao futura

- se um novo layout interno reutilizar `ContentContainer`, ele ja nascera sem badges de tag;
- nao usar tags como substituto de highlights editoriais no modal.

# TASK 1 — Markdown em textos do ADMIN

- Data: 2026-03-06
- Status: concluido

## Contexto do problema

Campos textuais do ADMIN aceitavam Markdown, mas a experiencia nao era totalmente consistente entre:

- configuracao no editor;
- persistencia do payload enviado ao Supabase;
- reutilizacao do conteudo salvo;
- renderizacao final no Post Modal e nas Landing Pages.

## Comportamento anterior

- `case_body` era salvo como texto bruto e renderizado no modal, mas sem preview no formulario.
- o renderer do Post Modal nao explicitava `skipHtml`, deixando a politica de seguranca dependente do comportamento default do `react-markdown`.
- o editor legacy de landing pages gravava `textAlign` com valores `text-left`, `text-center`, `text-right`, `text-justify`, enquanto o parser aceitava apenas `left`, `center`, `right`, `justify`; ao reabrir o conteudo salvo, a configuracao podia se perder no round-trip.

## Causa raiz

1. Contrato inconsistente entre editor legacy e parser de `landing_pages.content`.
2. Falta de preview no `ProjectForm`, o que impedia validar no ADMIN a saida real do Markdown antes de publicar.
3. Pipeline de renderizacao do `case_body` sem endurecimento explicito da regra de HTML seguro.

## Solucao implementada

- o parser de `textAlign` agora aceita formato novo e legado.
- o editor legacy passou a persistir os valores normalizados (`left`, `center`, `right`, `justify`).
- o `ProjectForm` ganhou preview vivo do `case_body` usando o mesmo renderer do modal.
- o renderer do `case_body` foi endurecido com `skipHtml`, mantendo Markdown seguro e consistente.

## Arquivos modificados

- `src/lib/projects/template-schema.ts`
- `src/components/admin/blocks/BlockEditor.tsx`
- `src/components/admin/ProjectForm.tsx`
- `src/components/portfolio/CaseBodyRenderer.tsx`

## Impacto no ADMIN

- o editor passa a mostrar a saida final do Markdown antes do publish.
- o round-trip de blocos legacy nao perde mais alinhamento de texto ao salvar e reabrir.

## Impacto no Supabase

- nenhum schema foi alterado.
- o payload continua serializado como texto/JSON compativel com as tabelas existentes.
- houve apenas normalizacao do valor persistido em `textAlign`.

## Impacto no front

- `case_body` do Post Modal agora segue a mesma politica segura de Markdown do restante do fluxo.
- landing pages legadas voltam a reconstituir corretamente a configuracao textual salva no Supabase.

## Regra final de funcionamento

- todo campo textual configurado para Markdown deve ser salvo em formato bruto, sem transformacao destrutiva;
- o preview do ADMIN deve refletir a mesma saida do renderer final;
- HTML embutido nao e renderizado;
- configuracoes textuais de landing page devem sobreviver ao ciclo salvar -> persistir -> ler -> editar novamente.

## Checklist de validacao

- [x] `case_body` permanece persistido como texto no payload do projeto
- [x] preview no ADMIN reflete a renderizacao final
- [x] parser aceita alinhamentos legados e novos
- [x] renderizacao do modal usa Markdown seguro

## Observacoes para manutencao futura

- qualquer novo campo Markdown no ADMIN deve reutilizar o mesmo renderer/politica de seguranca;
- se houver migracao visual do editor legacy, manter compatibilidade com valores antigos ja persistidos no Supabase.

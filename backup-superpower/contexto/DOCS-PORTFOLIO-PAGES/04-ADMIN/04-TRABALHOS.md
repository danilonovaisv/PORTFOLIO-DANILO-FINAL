# 04-TRABALHOS

## 0. Estrutura de arquivos da sessão

- `src/app/admin/(protected)/trabalhos/page.tsx`
- `src/app/admin/(protected)/trabalhos/new/page.tsx`
- `src/app/admin/(protected)/trabalhos/[id]/page.tsx`
- `src/app/admin/(protected)/trabalhos/actions.ts`
- `src/components/admin/ProjectForm.tsx`
- `src/components/admin/ProjectsTable.tsx`
- `src/lib/supabase/queries/projects.ts`

## 1. Objetivo da sessão

CRUD completo de projetos com filtros, publicação e destaques para Home/Portfolio.

## 2. Funcionalidades

- listagem com filtros (`tag/year/type/status/search`).
- criação e edição com mídia/tags/landing page.
- toggle de publicação e destaque.

## 3. Integração Supabase

- leitura e mutação em `portfolio_projects` e `portfolio_project_tags`.
- revalidate de `/admin/trabalhos`, `/portfolio` e `/`.

## 4. Considerações técnicas

- Boa separação entre página, ação e componentes.
- risco de regressão se schema evoluir sem atualizar `zod` input.

## 5. Inconformidades observadas

- Inconformidade média: padronizar validação de slug/publicação/tags em uma camada única (evitar regras divergentes entre formulário e servidor).

## 6. Atualização 2026-02-20

- Mutações de projetos (`upsert/delete`) passaram a exigir `service_role` no servidor para evitar falha de RLS em ambientes com claims inconsistentes.
- Upload de mídia no admin foi centralizado em endpoint server-side (`/api/admin/storage/upload`) para remover dependência de policy de upload no client.
- Schema de projeto refatorado para separar campos base e refinements, eliminando o conflito de runtime entre `extend()` e schema refinado.

## 7. Trabalhos / Projetos — Storage Sync (Auditoria)

**Sincronia Storage**
Para evitar criação de múltiplos diretórios órfãos:

- Ao editar o título ou slug de um trabalho, em vez de criar um novo armazenamento, existe uma rotina em `actions.ts` (`moveProjectFolder`) que move e atualiza os assets já hospedados da pasta antiga para a nova pasta com o **novo slug** sem perder cache.
- O ato de Deletar um trabalho exclui definitivamente suas pastas de variações de mídia (inclusive a legacy `projects/` folder) para manter o bucket de storage limpo.

## 8. Trabalhos — Regras de Nome/Slug (Auditoria)

**Tratamento de Colisões (Duplicate Keys)**

- O sistema antes acusava uma mensagem genérica de `Erro ao salvar projeto` enviada como retorno caso uma colisão de chaves exclusivas de Postgres (`portfolio_projects_slug_key`) fosse detectada.
- Em `actions.ts`, foi implementada uma validação manual de unicidade **excluindo o próprio registro**. Se o `slug` escolhido já existir em outro trabalho, um log claro de `Já existe um projeto com este slug/nome. Por favor, mude o slug do projeto.` é retornado em tela para orientar o Editor.

## 9. Assets — Estrutura de Pastas e Regras de Rename (Auditoria)

- **Padronização Pós-V4:** A estrutura unifica qualquer inserção nova feita via Admin para a trilha sem gerar pathings dispersos:
  - Projetos: `/{MARCA}/{NOME-DO-PROJETO}/assets-do-projeto/`
  - Arquivos soltos da galeria (se houver): `/{MARCA}/{NOME-DO-PROJETO}/assets-do-projeto/gallery/`
- Foram corrigidas as declarações do cliente visual em `ProjectForm.tsx` para assegurar que toda submissão (16:9, 1:1, galerias dinâmicas) utilizem este caminho, consolidando arquivos por sessão sem espalhamento na raiz do bucket.

## 10. Regras de Sincronia com Supabase Storage

- Uploads de `portfolio-media` são **idempotentes por path/hash**. Se o editor reenviar o mesmo arquivo para o mesmo trabalho, o endpoint retorna o path existente em vez de falhar com `The resource already exists`.
- Ao salvar um trabalho editado, o backend compara o estado anterior com o estado final salvo e remove do bucket apenas os arquivos que deixaram de ser referenciados:
  - capa 16:9 substituida;
  - capa 1:1 substituida;
  - logo do destaque da Home substituido;
  - imagens/videos removidos da galeria.
- Em renames de cliente/slug, o sistema continua movendo a pasta do projeto para o novo prefixo. Se um arquivo identico ja existir no destino, o rename trata isso como reaproveitamento valido e limpa a origem para evitar duplicacao/orfaos.
- O resultado esperado para o editor e:
  - adicionar assets cria apenas os arquivos novos;
  - remover assets limpa o Storage correspondente;
  - substituir assets atualiza a referencia do projeto e apaga o arquivo antigo que saiu de uso.

## 11. Atualização de estado — 2026-03-08

- O overlay de interação do `ProjectCard` foi fixado em `Blue Primary` (`#0048ff`) para hover/focus/touch no Showcase do portfólio.
- Cards destacados da Home com `ANIMATED_BG_INVERTED_LOGO` agora usam `object-contain`, caixa mais flexível e inversão monocromática sobre fundo azul.
- O `FeaturedProjectCard` passou a observar a largura real do container para escolher entre thumb quadrada e thumb wide, evitando mismatch entre grid e aspect ratio.

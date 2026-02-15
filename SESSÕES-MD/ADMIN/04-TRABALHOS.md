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

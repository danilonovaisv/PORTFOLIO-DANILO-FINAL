# 07-LANDING-PAGES

## 0. Estrutura de arquivos da sessão

- `src/app/admin/(protected)/landing-pages/page.tsx`
- `src/app/admin/(protected)/landing-pages/new/page.tsx`
- `src/app/admin/(protected)/landing-pages/[id]/page.tsx`
- `src/app/admin/(protected)/landing-pages/actions.ts`
- `src/components/admin/LandingPageForm.tsx`

## 1. Objetivo da sessão

Gerenciar páginas detalhadas de projetos (`/projects/[slug]`) com templates versionados.

## 2. Funcionalidades

- listagem com identificação de template (Legacy, V1, V2, V3).
- CRUD completo com validação `zod`.
- links rápidos para página pública.

## 3. Integração

- tabela `landing_pages`.
- revalidação de `/admin/landing-pages` e `/portfolio`.

## 4. Inconformidades observadas

- Inconformidade baixa: reforçar validação de estrutura do campo `content` por template para evitar payload híbrido inválido.

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

## 5. Atualização 2026-02-20

- `save/delete` em `landing_pages` agora exigem `service_role` para evitar `new row violates row-level security policy`.
- Uploads de assets da landing page passaram a usar endpoint server-side do admin (`/api/admin/storage/upload`).
- Criado script SQL de manutenção para claim admin e limpeza de objetos órfãos: `supabase/sql/2026-02-20_admin_claim_and_cached_egress_cleanup.sql`.

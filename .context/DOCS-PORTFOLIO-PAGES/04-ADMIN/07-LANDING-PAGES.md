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

## 6. Atualização de estado — 2026-03-08

- O editor V3 passou a aceitar `YouTube` como tipo explícito de mídia em blocos dinâmicos, preservando `mediaType = youtube` no roundtrip do formulário.
- A serialização do Template V3 continua saneando `media/media2/poster`, mas agora não força URL de YouTube a cair no fluxo de imagem comum.
- O CTA de retorno das landings foi reduzido para `voltar` e duplicado no fechamento dos templates (`legacy`, `master`, `master-v2`, `master-v3`) com variante compacta.
- `LiquidEther` teve o auto motion desacelerado (`autoSpeed` menor) e takeover mais curto para responder mais rápido a mouse/touch sem competir com o conteúdo.

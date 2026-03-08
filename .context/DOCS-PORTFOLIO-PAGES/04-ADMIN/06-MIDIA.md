# 06-MIDIA

## 0. Estrutura de arquivos da sessão

- `src/app/admin/(protected)/midia/page.tsx`
- `src/app/admin/(protected)/midia/actions.ts`
- `src/components/admin/AssetForm.tsx`
- `src/components/admin/AssetGallery.tsx`
- `src/components/admin/AssetRoleMenu.tsx`
- `src/lib/supabase/asset-paths.ts`
- `src/lib/supabase/asset-roles.ts`

## 1. Objetivo da sessão

Administrar ativos do site com metadados, papéis de mídia e sincronização de rotas públicas.

## 2. Funcionalidades

- upload/listagem/edição de assets.
- atribuição de role e reorganização de path.
- remoção com auditoria.

## 3. Integração Supabase

- `site_assets` + bucket de mídia.
- logs administrativos via `admin_audit_log`.

## 4. Inconformidades observadas

- Inconformidade média: em revalidação, manter rotas públicas atualizadas (`/sobre` em vez de `/about` quando aplicável no projeto atual).

## 5. Atualização de estado — 2026-03-08

- A vitrine `Portfolio Showcase` da HOME agora referencia `SITE_ASSET_KEYS.portfolioShowcase` como fonte central para thumbs e vídeo.
- A auditoria de storage confirmou disponibilidade pública dos três assets de showcase:
  - `home/showcase/Branding-Project.webp`
  - `home/showcase/Key-Visual.webp`
  - `home/showcase/show.video.mp4`
- O stripe `Websites & Tech` deixou de reaproveitar thumb errada de branding e passou a usar asset dedicado.

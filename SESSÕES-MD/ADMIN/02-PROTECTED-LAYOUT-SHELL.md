# 02-PROTECTED-LAYOUT-SHELL

## 0. Estrutura de arquivos da sessão
- `src/app/admin/(protected)/layout.tsx`
- `src/components/admin/AdminShell.tsx`
- `src/lib/admin/authz.ts`
- `src/lib/admin/server-access.ts`
- `src/config/admin-navigation.ts`

## 1. Objetivo da sessão
Garantir que somente usuários autorizados acessem `/admin/*`, com navegação unificada desktop/mobile.

## 2. Regra de acesso
- valida sessão com `supabase.auth.getUser()`.
- sem usuário: redirect para `/admin/login`.
- role enforcement por `ADMIN_ENFORCE_ROLE` + `isAdminUser()`.

## 3. Shell e navegação
- sidebar desktop + sheet mobile.
- ações globais: voltar ao site e sair.

## 4. Acessibilidade
- foco visível em ações críticas.
- targets touch adequados no mobile.

## 5. Inconformidades observadas
- Inconformidade média: revisar periodicamente todas as rotas novas do grupo protegido para manter cobertura de guardas server-side.

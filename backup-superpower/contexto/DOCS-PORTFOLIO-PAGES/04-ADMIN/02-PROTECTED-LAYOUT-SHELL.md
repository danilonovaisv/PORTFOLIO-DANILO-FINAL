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

## 6. Atualização 2026-02-20

- Corrigido mismatch de hidratação no shell mobile: o `Sheet` do menu admin passa a montar somente após `mounted` no client.
- Guardas de acesso agora suportam flag `requireServiceRole` para operações críticas que precisam bypass de RLS com `service_role`.

## 7. Atualização de estado — 2026-03-27

- Hardening de autorização aplicado em produção: `shouldEnforceAdminRole()` agora sempre retorna `true` quando `NODE_ENV=production`.
- O bypass via `ADMIN_ENFORCE_ROLE` permanece disponível apenas em ambientes não-produtivos.
- Objetivo: reduzir risco operacional de exposição acidental do CMS por configuração incorreta de ambiente.

# 08-SETTINGS-CONFIG

## 0. Estrutura de arquivos da sessão

- `src/app/admin/(protected)/settings/page.tsx`
- `src/app/admin/(protected)/config/page.tsx`

## 1. Objetivo da sessão

Expor estado operacional mínimo (sessão e credenciais críticas) para diagnóstico rápido.

## 2. Funcionalidades

- mostra usuário atual, UID e providers.
- mostra status de variáveis essenciais (Supabase/OpenAI).
- rota `/admin/config` redireciona para `/admin/settings`.

## 3. Inconformidades observadas

- Inconformidade baixa: evitar exposição excessiva de informações sensíveis no painel; manter apenas status e nunca valores completos em produção.

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
- permite salvar/remover `openai_api_key` em `site_settings` quando `SUPABASE_SERVICE_ROLE_KEY` está configurada.

## 3. Inconformidades observadas

- Inconformidade baixa: evitar exposição excessiva de informações sensíveis no painel; manter apenas status e nunca valores completos em produção.

## 4. Regras operacionais da OpenAI Key

- O painel nunca exibe o valor da chave; apenas o status operacional.
- Ordem de prioridade da leitura:
  1. `OPENAI_API_KEY` no ambiente do servidor.
  2. `site_settings.key = openai_api_key` no Supabase.
- Persistencia em banco depende de `SUPABASE_SERVICE_ROLE_KEY`.
  - Sem service role, o painel deixa explicito que a chave salva no banco nao pode ser usada.
  - Nesse cenario, apenas a variavel de ambiente `OPENAI_API_KEY` habilita `Scene Generator` e `Copy Agent`.

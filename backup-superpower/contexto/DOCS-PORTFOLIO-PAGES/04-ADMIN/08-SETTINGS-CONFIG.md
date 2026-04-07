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

## 5. Atualização de estado — 2026-03-08

- `AntigravityCTA` foi refatorado para usar uma única timeline Ghost na interação de hover.
- O deslocamento horizontal da seta e a abertura visual entre pílula e círculo agora respondem ao mesmo trigger e ao mesmo easing (`GHOST_EASE`).
- O componente ganhou variante `compact`, usada nos CTAs pequenos de retorno das landings para sincronizar comportamento com os CTAs principais.

## 6. Atualização de estado — 2026-03-09

- A Home e a página `/portfolio` voltaram a usar rotação viva de cards no runtime, com reshuffle controlado por viewport visível, foco/hover e `prefers-reduced-motion`.
- O background interativo `Ghost Cursor` da Home deixou de perseguir alvos autônomos sem input real. Em idle, o campo volta ao centro; mouse/touch retomam controle quando presentes.
- Os backgrounds animados dos cards destacados da Home voltaram a rotacionar entre `grainient`, `ghost` e `aurora`, com recuperação explícita do variant `aurora`.
- A família de CTAs (`AntigravityCTA` e `PortfolioCTA`) passou a compartilhar a mesma mecânica de hover: seta e círculo se deslocam juntos, com timeline única.
- Referências operacionais detalhadas:
  - `23-TASK-04-HOME-PORTFOLIO-LIVE-CARD-ROTATION.md`
  - `24-TASK-05-HOME-GHOST-CURSOR-INTERACTION.md`
  - `25-TASK-06-HOME-ANIMATED-BACKGROUNDS-AURORA.md`
  - `26-TASK-07-PORTFOLIO-SHOWCASE-MEDIA-FRAMING.md`
  - `27-TASK-08-CTA-MOTION-SYNC.md`
  - `28-TASK-09-ABOUT-BELIEFS-MOBILE.md`

## 7. Atualização de estado — 2026-03-27

- `errorResponse` do módulo admin foi endurecido para produção:
  - em `NODE_ENV=production`, respostas para UI retornam apenas mensagem segura (e `code`, quando disponível).
  - detalhes técnicos completos permanecem apenas no log de servidor.
- Objetivo: reduzir exposição de detalhes internos em mensagens de erro do painel.

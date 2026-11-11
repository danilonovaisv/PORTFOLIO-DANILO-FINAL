# Plano de execução: recuperação de assets Supabase → Cloudflare R2

## Sprint 0: Segurança e baseline
- Confirmar branch, working tree, commit atual e estado de testes.
- Criar branch de trabalho sem descartar alterações do usuário.
- Ler as skills existentes e as skills deste pacote.
- Identificar scripts antigos que fazem leitura/escrita direta no Supabase.
- Não acessar nem imprimir valores de segredos.

**Gate:** baseline e escopo registrados; nenhuma escrita remota.

## Sprint 1: Mapeamento da arquitetura
- Mapear fluxo de dados de projetos, assets, cache e renderização.
- Identificar camada de dados ativa (D1, Supabase, JSON, API ou híbrida).
- Inspecionar `wrangler.toml`, `open-next.config.ts`, `next.config.mjs`, `src/lib/storage/r2.ts`, `src/lib/supabase/urls.ts`, `src/lib/utils.ts` e `src/lib/media/asset-contract.ts`.
- Identificar campos de conteúdo que armazenam URLs ou paths.
- Registrar os consumidores por tipo de mídia.

**Gate:** diagrama de fluxo e findings com arquivos/linhas.

## Sprint 2: Inventário e reconciliação
- Parsear `assets.json` e `src/config/site-assets.json`.
- Ler registros reais da fonte de dados ativa em modo read-only.
- Listar objetos R2 de forma paginada.
- Reconciliar por bucket lógico + path normalizado.
- Gerar JSON de inventário, relatório Markdown e CSV de pendências.

**Gate:** todos os candidatos classificados; ambiguidades explícitas.

## Sprint 3: Causa raiz e design
- Reproduzir a URL antiga no código atual.
- Testar bypass de URLs HTTP absolutas.
- Testar disponibilidade de `NEXT_PUBLIC_R2_PUBLIC_URL` no build/runtime.
- Testar bucket prefix, encoding e custom domain.
- Apresentar plano de correção e rollback.

**Gate:** causa raiz sustentada por evidência.

## Sprint 4: Correção TDD
- Criar testes RED para URL Supabase pública e demais classes de URL.
- Centralizar a resolução sem quebrar links externos, signed/private ou paths locais.
- Corrigir consumidores que ignoram o resolver.
- Não fazer escrita remota nesta etapa.

**Gate:** unit tests verdes e diff revisado.

## Sprint 5: Persistência opcional
- Só se runtime normalization não for suficiente, criar script de reparo de dados.
- Exportar backup antes.
- Implementar `--dry-run` padrão, logs before/after, idempotência, validação por match exato e rollback.
- Solicitar aprovação antes de qualquer escrita em D1.

**Gate:** aprovação explícita para executar o script remoto.

## Sprint 6: Integridade R2 e E2E
- Verificar objetos no R2 e URLs no custom domain.
- Rodar Playwright em home, portfolio, todos os projetos publicados e sobre.
- Confirmar contagem, ordem, mídia, console e ausência de requests para o host Supabase antigo.

**Gate:** relatório E2E e reconciliação sem falsos positivos.

## Sprint 7: Fechamento
- Rodar lint, typecheck, Jest, Playwright e build Cloudflare conforme aplicável.
- Revisar diff com checklist de segurança.
- Atualizar documentação de migração que esteja comprovadamente obsoleta.
- Entregar métricas, pendências e instruções de deploy.

**Gate:** status `COMPLETE` somente se todos os assets recuperáveis estiverem verificados. Caso contrário, `PARTIAL`.

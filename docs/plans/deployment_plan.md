# Plano de Implantação (Deployment & Release Runbook) — Cloudflare Workers / D1 / R2

**Alvo de Produção:** `https://portfoliodanilo.com` (OpenNext Cloudflare Worker `danilo-novais-portfolio`)  
**Banco D1:** `portfolio-db` (`d9467c4e-7198-4077-a849-639b45612d5b`)  
**Bucket R2:** `portfolio-assets` (`https://assets.portfoliodanilo.com`)  
**Regra de Segurança:** Nenhuma etapa remota abaixo pode ser executada sem **autorização explícita do usuário** para deploy e escrita remota.

---

## 1. Pré-Condições e Gates de Qualidade

Antes de iniciar qualquer alteração remota em D1 ou deploy do Worker:
1. Branch `fix/portfolio-routing-and-content-recovery` validada localmente e revisada.
2. `pnpm run build-check` (`typecheck` + `lint`) aprovado com saída zero erros.
3. `pnpm test` aprovado integralmente.
4. `pnpm test:e2e` aprovado integralmente contra build conectado ao D1 local populado.
5. `pnpm run build:cloudflare` concluído com sucesso gerando `.open-next/`.
6. Verificação de secrets/bindings no Cloudflare Worker / `wrangler.toml` (sem expor valores):
   - Confirmar presença de `DB` (D1 `portfolio-db`), `ASSETS_BUCKET` (R2 `portfolio-assets`), `NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.portfoliodanilo.com`, `CLOUDFLARE_ONLY=true`.
   - Avaliar remoção/atualização da variável stale `NEXT_PUBLIC_SUPABASE_URL=https://dpejskjpghoozbpfxkpf.supabase.co` no ambiente Cloudflare Workers para impedir tentativa de conexão ao domínio inexistente.

---

## 2. Procedimento de Banco de Dados D1 (Ordem Segura com Rollback)

1. **Snapshot / Backup Obrigatório (Read-Only → Arquivo Local Seguro):**
   ```bash
   mkdir -p backups
   npx wrangler d1 export portfolio-db --remote --output=backups/portfolio-db-pre-recovery-$(date +%Y%m%d-%H%M%S).sql
   ```
   *(Verificar que `backups/` está em `.gitignore` e nunca comitar dumps no Git).*
2. **Dry-Run & Validação em D1 Local:**
   ```bash
   npx wrangler d1 execute portfolio-db --local --file=cloudflare/migrations/0002_add_project_routing_and_case_columns.sql
   npx wrangler d1 execute portfolio-db --local --file=cloudflare/seeds/recover-portfolio-content.sql
   ```
3. **Aplicação no D1 Remoto (Somente Após Autorização Explícita):**
   ```bash
   npx wrangler d1 execute portfolio-db --remote --file=cloudflare/migrations/0002_add_project_routing_and_case_columns.sql
   npx wrangler d1 execute portfolio-db --remote --file=cloudflare/seeds/recover-portfolio-content.sql
   ```
4. **Verificação Pós-Migration no D1 Remoto (Read-Only):**
   - Confirmar contagem de `19` projetos publicados, `19` `landing_pages` com `content != '[]'`, `0` referências `supabase.co` em URLs públicas e presença das colunas `destination` e `case_body`.

---

## 3. Procedimento de Deploy da Aplicação

1. Gerar bundle de produção OpenNext Cloudflare:
   ```bash
   pnpm run build:cloudflare
   ```
2. Publicar Worker (somente após autorização de deploy):
   ```bash
   pnpm run cf:deploy
   ```
   *(Equivale a `opennextjs-cloudflare deploy` definido em `package.json`).*

---

## 4. Verificação Pós-Deploy em Produção (`https://portfoliodanilo.com`)

1. **Varredura de Rotas & Status HTTP:**
   - Testar `/`, `/portfolio`, `/sobre`, `/api/site-assets`, `/sitemap.xml`, todas as **19** rotas `/projects/<slug>` e todas as **19** rotas `/portfolio/<slug>`: **esperado 100% `HTTP 200` (`0` erros `503`)**.
   - Testar rota inexistente `/projects/slug-inexistente-validacao`: **esperado `HTTP 404`** (fim do fallback genérico).
2. **Verificação de Domínios e Mídias no HTML/DOM Live:**
   - Confirmar ausência de `dpejskjpghoozbpfxkpf.supabase.co` e `umkmwbkwvulxtdodzmzf.supabase.co` em páginas públicas.
   - Rodar suíte Playwright de verificação somente leitura contra `PLAYWRIGHT_BASE_URL=https://portfoliodanilo.com` confirmando que imagens, vídeos e About Origins (`cena-01..04.webp`) carregam com `naturalWidth > 0` via `https://assets.portfoliodanilo.com`.

---

## 5. Plano de Rollback

- **Se o D1 remoto apresentar inconsistência após migration/seed:**
  1. Restaurar snapshot SQL exportado na Etapa 2.1 (`npx wrangler d1 execute portfolio-db --remote --file=backups/portfolio-db-pre-recovery-*.sql`) ou executar Time Travel do Cloudflare D1 (`npx wrangler d1 time-travel restore portfolio-db --timestamp=<pré-operação>`).
- **Se o Worker publicado apresentar regressão:**
  1. Reverter deployment no Cloudflare Workers (`npx wrangler rollback` / redeploy do commit `main` anterior) após validar compatibilidade retroativa das novas colunas `NULL`-safe adicionadas no D1.


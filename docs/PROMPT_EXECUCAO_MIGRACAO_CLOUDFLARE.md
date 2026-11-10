# Cloudflare Migration Execution Prompt

Este é um prompt para agentes IDE com acesso a MCPs (Cloudflare, Supabase, GitHub) executar e testar todas as configurações de migração do projeto PORTFOLIO-DANILO-FINAL.

---

## Contexto do Projeto

**Projeto:** Portfolio Danilo Novais (portfoliodanilo.com)  
**Stack:** Next.js 16 + TypeScript + Tailwind CSS v4  
**Migração:** Supabase (PostgreSQL + Storage + Auth + Realtime) → Cloudflare (D1 + R2 + Workers/Pages)  
**Diretório:** `/Users/danilonovais/PORTFOLIO-DANILO-FINAL`

### Status Atual da Migração
- ✅ **R2 Storage**: Configurado e funcionando (`portfolio-assets`)
- ⚠️ **D1 Database**: Configuração adicionada ao `wrangler.toml`, mas sem UUID válido
- ⚠️ **Auth**: Ainda usa Supabase Auth (migração híbrida)
- ⚠️ **Realtime**: Usa polling como fallback quando WebSocket indisponível

### Arquivos de Referência
- `wrangler.toml` - Configuração Cloudflare
- `open-next.config.ts` - Configuração OpenNext
- `src/lib/env.ts` - Validação de variáveis de ambiente
- `scripts/validate-migration.cjs` - Script de validação
- `scripts/convert-sql-for-d1.cjs` - Conversor SQL PostgreSQL → D1
- `supabase/migrations/20261110000000_create_d1_schema.sql` - Schema D1 inicial
- `MIGRATION_COMPLETENESS.md` - Checklist completo
- `docs/walkthrough_migracao_cloudflare_20261110.md` - Guia passo a passo

---

## Tarefas a Executar

### FASE 1: Configuração Cloudflare via MCP

#### 1.1 Verificar/Criar D1 Database
```
MCP: cloudflare:d1
- Listar databases existentes: d1_list_databases()
- Se "portfolio-db" não existe, criar: d1_create_database(name="portfolio-db")
- Anotar o UUID gerado
```

#### 1.2 Verificar Token API e Permissões
```
MCP: cloudflare:account
- Verificar account info: account_get_info()
- Verificar permissões do token atual
- Se não tiver permissão D1, guiar usuário para criar novo token em:
  https://dash.cloudflare.com/f48c066525478bcaf66928b32ed721d2/api-tokens
```

#### 1.3 Atualizar wrangler.toml
```
Editar wrangler.toml e garantir:
[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
# database_uuid pode ser omitido se wrapper inferir automaticamente
```

---

### FASE 2: Migração de Dados Supabase → D1

#### 2.1 Exportar Dados do Supabase
```
MCP: supabase:mcp
- Conectar ao Supabase usando credenciais do .env.local
- Exportar tabelas necessárias:
  * site_assets
  * portfolio_projects
  * portfolio_tags
  * portfolio_project_tags
  * landing_pages
  * admin_tokens
  * admin_users
  * audit_log
  * site_settings
- Gerar arquivo SQL compatível
```

#### 2.2 Converter SQL para D1
```
Executar script de conversão local:
node scripts/convert-sql-for-d1.cjs migration-supabase.sql migration-d1.sql

O script converte:
- Tipos de dados PostgreSQL → SQLite/D1
- Funções gen_random_uuid() → lower(hex(randomblob(16)))
- Now() → datetime('now')
- Remove OWNER TO, SECURITY INVOKER
- Ajusta DEFAULT values
```

#### 2.3 Importar para D1
```
MCP: cloudflare:d1
- Executar import: d1_execute(database="portfolio-db", sql_file="migration-d1.sql")
- Verificar contagem de registros importados
```

---

### FASE 3: Build e Testes Locais

#### 3.1 Validar Configuração
```bash
node scripts/validate-migration.cjs
# Deve retornar: 0 erro(s), 0 aviso(s)
```

#### 3.2 Typecheck
```bash
npx tsc --noEmit
# Verificar erros de type nas mudanças de env.ts e wrangler.toml
```

#### 3.3 Build Local
```bash
VALIDATE_ENV_WARN_ONLY=1 npx opennextjs-cloudflare build
# Verificar se build gera .open-next/worker.js corretamente
```

#### 3.4 Preview Local
```bash
npx opennextjs-cloudflare preview
# Testar rotas críticas:
# - /admin/login (deve funcionar com auth)
# - /admin (deve mostrar dashboard)
# - /portfolio (deve carregar projetos do D1 ou Supabase)
# - /projects/[slug] (deve resolver media URLs)
```

---

### FASE 4: Deploy para Cloudflare

#### 4.1 Deploy com wrangler
```bash
npx wrangler deploy
# Ou: pnpm run cf:deploy
```

#### 4.2 Verificar Deployment
```
MCP: cloudflare:workers
- Listar workers: list_workers()
- Verificar deployments recentes: get_deployments(worker="portfolio-danilo-final")
- Testar health check: curl https://portfoliodanilo.com/admin
```

---

## Checks de Validação

### Pré-Deploy
- [ ] D1 database criado e UUID configurado
- [ ] Tabelas existem no D1 com dados migrados
- [ ] `wrangler.toml` está sincronizado com dashboard (sem warnings de divergência)
- [ ] Turnstile key atualizada localmente (0x4AAAAAAAACgcpmYImvbq_qQg vs remoto)

### Pós-Deploy
- [ ] Build passou sem erros de typecheck
- [ ] Admin login funciona (/admin/login)
- [ ] Dashboard admin carrega estatísticas (/admin)
- [ ] CRUD de projetos funciona (/admin/trabalhos)
- [ ] CRUD de assets funciona (/admin/midia)
- [ ] Assets carregam corretamente no frontend
- [ ] Images usam CDN R2 (assets.portfoliodanilo.com)
- [ ] Projetos e tags persistem após reload

---

## Comandos Úteis de Debug

```bash
# Verificar logs do worker
npx wrangler tail --format json

# Testar query D1 diretamente
npx wrangler d1 execute portfolio-db --remote --command="SELECT COUNT(*) FROM site_assets;"

# Verificar bindings do worker
npx wrangler worker inspect --name portfolio-danilo-final

# Ver variáveis de ambiente no worker
npx wrangler config list # verificar profile atual
```

---

## Arquivos que NUNCA DEVEM SER MODIFICADOS

Estes arquivos já estão configurados corretamente e NÃO devem ser alterados:

1. `public/site.assets/*` - Assets locais para build
2. `assets.json` - Fonte de verdade para showcase
3. `src/components/home/portfolio-showcase/*` - Usam getAssetUrl() com fallback R2
4. `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx` - Realtime Supabase
5. `src/lib/supabase/urls.ts` - Lógica R2-first já implementada

---

## Critério de Sucesso

A migração será considerada concluída quando:

1. ✅ `pnpm run validate-migration.cjs` passar com 0 erros
2. ✅ `npx wrangler d1 execute portfolio-db --remote --command="SELECT 1"` funcionar
3. ✅ Deploy para production completar sem warnings críticos
4. ✅ Todas as rotas `/admin/*` funcionarem
5. ✅ Imagens/vídeos carregarem via R2 CDN

---

## Notas Importantes para o Agente

- **NÃO usar `database_uuid`** no `wrangler.toml` - campo não é mais suportado na versão 4.x do wrangler
- **Manter compatibilidade híbrida**: O código ainda suporta Supabase como fallback se D1 não estiver disponível
- **Autenticação**: Manter Supabase Auth por enquanto (não migrar para Cloudflare Access sem planejamento)
- **Realtime**: Se WebSocket falhar, usar polling via `/api/site-assets` (já implementado como fallback)
- **Sempre fazer commit separados** para cada mudança lógica

---

*Prompt gerado automaticamente pelo agente de migração em 2026-11-10*
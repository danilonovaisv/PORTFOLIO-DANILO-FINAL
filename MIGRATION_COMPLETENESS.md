# Guia de Completude da Migração: Supabase → Cloudflare

> **Status:** Migração PARCIAL - Incompleta  
> **Data:** 2026-11-10  
> **Responsável:** Auditoria automatizada

---

## RESUMO DA MIGRAÇÃO

O projeto foi parcialmente migrado de Supabase para Cloudflare. A migração **STORAGE (R2)** foi concluida com sucesso. No entanto, **DATABASE (D1)**, **AUTH** e **REALTIME** permanecem incompletos.

---

## O QUE ESTA funcionando ✅

### Storage (R2)

- [x] Bucket `portfolio-assets` configurado em `wrangler.toml`
- [x] Upload via `/api/admin/storage/upload` usa `uploadToR2()`
- [x] Download via `getR2AssetUrl()` retorna URLs R2 CDN
- [x] `src/lib/storage/r2.ts` contem todas as operações R2

### Assets Frontend

- [x] `src/lib/utils.ts:getAssetUrl()` prioriza R2 quando disponivel
- [x] `src/config/brand.ts` usa helper `asset()` que resolve R2
- [x] Images e videos carregam via CDN (quando R2_URL configurado)

---

## O QUE ESTA quebrado ❌

### Database (D1)

- [ ] **Nenhum binding D1 configurado**
- [ ] **Tabelas existem apenas no PostgreSQL Supabase**
- [ ] **Views como `public_projects_view` não migradas**

### Auth/Admin

- [ ] `requireAdminAccess()` usa Supabase client (necessita D1 ou manter Supabase)
- [ ] `middleware.ts` cria cliente Supabase SSR
- [ ] Tabelas `admin_tokens`, `admin_users`, `audit_log` não existem em D1

### Realtime

- [ ] `useRealtimeAssets.ts` usa WebSocket `postgres_changes`
- [ ] **Cloudflare Workers não suporta WebSocket Realtime**
- [ ] Precisa de alternativa: Workers Schedule ou polling

---

## PLANOS DE MIGRAÇÃO

### Plano A: Manter Supabase como Database/Auth (Recomendado)

**Vantagens:**

- Menos risco
- Mantém funcionalidade completa
- R2 para storage ja esta funcionando

**Implementação:**

1. Garantir que `NEXT_PUBLIC_SUPABASE_URL` esteja configurado
2. Atualizar `src/lib/env.ts` para aceitar ambos
3. Manter `src/lib/supabase/` como fonte primaria

### Plano B: Migrar tudo para Cloudflare

**Vantagens:**

- Infraestrutura unificada
- Zero dependencia externa

**Requisitos:**

1. Criar D1 Database e migrar todos os dados
2. Criar schema D1 com todas as tabelas
3. Migrar auth para Cloudflare Access ou implementar JWT custom
4. Substituir Realtime por polling/workers

---

## ARQUIVOS CRITICOS PARA ALTERAR

### Configuração Cloudflare

| Arquivo               | Alteração                     | Status      |
| --------------------- | ----------------------------- | ----------- |
| `wrangler.toml`       | Adicionar `[[d1_databases]]`  | ⏳ Pendente |
| `open-next.config.ts` | Adicionar `d1.binding = 'DB'` | ⏳ Pendente |
| `.env.example`        | Adicionar variaveis D1        | ⏳ Pendente |

### Database Layer

| Arquivo                          | Alteração             | Status      |
| -------------------------------- | --------------------- | ----------- |
| `src/lib/supabase/server.ts`     | Adicionar fallback D1 | ⏳ Pendente |
| `src/lib/supabase/queries/*`     | Adaptar para D1       | ⏳ Pendente |
| `src/lib/admin/server-access.ts` | Suportar ambos modos  | ⏳ Pendente |

### Auth

| Arquivo                          | Alteração                         | Status                  |
| -------------------------------- | --------------------------------- | ----------------------- |
| `src/lib/supabase/middleware.ts` | Verificar se continua funcionando | ✅ OK (manter Supabase) |
| `src/lib/admin/authz.ts`         | Não necessita alteração           | ✅ OK                   |

---

## SCRIPT DE CORRECAO AUTOMATIZADA

Execute o script de correcão parcial:

```bash
node scripts/fix-cloudflare-migration.js <D1_UUID>
```

Este script:

- Atualiza `wrangler.toml` com D1 binding
- Atualiza `open-next.config.ts` com D1 config
- Adiciona `CLOUDFLARE_ONLY` ao env schema
- Gera schema D1 básico

---

## MIGRAÇÃO DE DADOS

### Passo 1: Exportar do Supabase

```bash
# Usar pg_dump ou Supabase CLI
pg_dump -h db.supabase.co -U postgres -d postgres \
  --table=site_assets --table=portfolio_projects \
  --table=portfolio_tags --table=admin_tokens \
  > backup-supabase.sql
```

### Passo 2: Importar para D1

```bash
# Ajustar o SQL para D1 (muitos tipos são compativeis)
wrangler d1 execute portfolio-db --remote < backup-d1.sql
```

### Passo 3: Verificar dados

```bash
wrangler d1 execute portfolio-db --remote --command="SELECT COUNT(*) FROM site_assets;"
```

---

## VERIFICAÇÃO FINAL

Antes de declarar a migração conclúda, verificar:

1. [ ] Build funciona localmente: `pnpm run build`
2. [ ] D1 Database criado no Cloudflare
3. [ ] Dados migrados para D1
4. [ ] Admin login funciona
5. [ ] CRUD de projetos funciona
6. [ ] CRUD de assets funciona
7. [ ] Media carrega no site (sem quebra 404)
8. [ ] Deploy funciona: `pnpm run deploy`

---

## LINKS UTEIS

- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [OpenNext Cloudflare Guide](https://open-next.js.org/deploy/cloudflare)
- [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/)

---

## CONTATO

Para dúvidas sobre esta migração:

- Issue: Criar issue em GitHub com tag `migration`
- SLA: 24h para resposta

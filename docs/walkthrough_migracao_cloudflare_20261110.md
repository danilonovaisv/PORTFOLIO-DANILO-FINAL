# Walkthrough: Correção Parcial da Migração Supabase → Cloudflare

**Data:** 2026-11-10  
**Commit:** `28343b2a1`  
**Status:** Migração parial concluída - aguardando ações manuais do usuário

---

## O QUE FOI FEITO

### 1. Configuração Cloudflare Base

**Arquivo:** `wrangler.toml`  
**Alteração:** Adicionado binding D1 database
```toml
[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_uuid = "SEU_UUID_AQUI"  # Substituir pelo UUID real
```

**Impacto:** Workers agora reconhecerão variável de ambiente `DB` como D1Database.

---

### 2. Configuração OpenNext

**Arquivo:** `open-next.config.ts`  
**Alteração:** Adicionada configuração D1 para OpenNext
```typescript
export default defineCloudflareConfig({
  d1: {
    binding: 'DB',
  },
});
```

**Impacto:** Build do Next.js incluirá código de integração com D1.

---

### 3. Variáveis de Ambiente

**Arquivo:** `src/lib/env.ts`  
**Alteração:** Adicionado flag `CLOUDFLARE_ONLY`
```typescript
CLOUDFLARE_ONLY: process.env.CLOUDFLARE_ONLY === 'true' || undefined,
```

**Impacto:** Permite modo híbrido ou Cloudflare-only em runtime.

---

### 4. Schema D1

**Arquivo:** `supabase/migrations/20261110000000_create_d1_schema.sql`  
**Conteúdo:** Tabelas básicas migradas:
- `site_assets`
- `portfolio_projects`
- Índices básicos

**Formato:** SQL compatível com D1 (SQLite-like)

---

### 5. Scripts de Automação

**Arquivos criados:**
- `scripts/fix-cloudflare-migration.cjs` - Aplica correções parciais
- `scripts/migrate-to-d1.cjs` - Gera backup SQL para migração

**Uso:**
```bash
node scripts/fix-cloudflare-migration.cjs <D1_UUID>
```

---

### 6. Documentação

**Arquivos criados:**
- `MIGRATION_COMPLETENESS.md` - Checklist completo da migração
- `MIGRATION_CORRECTION_PLAN.md` - Plano detalhado de correções

---

## O QUE AINDA PRECISA SER FEITO MANUALMENTE

### Passo 1: Criar D1 Database
1. Acessar Cloudflare Dashboard
2. Ir em Workers → D1 → Create Database
3. Nome: `portfolio-db`
4. Copiar o UUID gerado
5. Atualizar `wrangler.toml` substituindo `SEU_UUID_AQUI`

### Passo 2: Migrar Dados
```bash
# Exportar do Supabase (requer pg_dump ou interface)
pg_dump -h db.supabase.co -U postgres \
  --table=site_assets --table=portfolio_projects > backup.sql

# Importar para D1
wrangler d1 execute portfolio-db --remote < backup.sql
```

### Passo 3: Atualizar Variáveis de Ambiente
Adicionar ao `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
CLOUDFLARE_ONLY=true  # Para testar modo apenas Cloudflare
```

### Passo 4: Testes
```bash
# Build local
pnpm run build:cloudflare

# Preview
pnpm run cf:preview

# Deploy
pnpm run cf:deploy
```

---

## ALERTAS IMPORTANTES

### ⚠️ Auth não migrado
O sistema de autenticação continua usando Supabase Auth. Isso é intencional no plano atual (migração híbrida):
- Storage → Cloudflare R2 ✅
- Database → Supabase PostgreSQL (temporário)
- Auth → Supabase Auth (temporário)

### ⚠️ Realtime não disponível
`useRealtimeAssets.ts` usará polling via API (`/api/site-assets`) quando WebSocket não estiver disponível.

### ⚠️ Views não migradas
Views como `public_projects_view` precisam ser recreadas no D1 ou mantidas no Supabase.

---

## PRÓXIMOS PASSOS RECOMENDADOS

1. **Testar build:** Executar `pnpm run build-check` para verificar se o schema D1 funciona
2. **Criar D1:** Seguir passos acima para criar database e migrar dados
3. **Testar admin:** Acessar `/admin` e verificar se CRUD funciona
4. **Verificar assets:** Confirmar que imagens/vídeos carregam corretamente

---

## LINKS ÚTEIS

- Cloudflare Dashboard: https://dash.cloudflare.com
- D1 Documentation: https://developers.cloudflare.com/d1/
- Wrangler CLI Docs: https://developers.cloudflare.com/workers/cli-wrangler/
- OpenNext Config: https://open-next.js.org/deploy/cloudflare

---

*Gerado automaticamente pelo agente de auditoria de migração*
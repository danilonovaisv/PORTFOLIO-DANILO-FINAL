# Plano de Correção: Migração Supabase → Cloudflare (Completa)

> **Status:** Corrigido em auditoria - aguardando implementação  
> **Data da Auditoria:** 2026-11-10  
> **Escopo:** Completar migração de database, auth e realtime para Cloudflare

---

## PROBLEMA IDENTIFICADO

A migração parcial deixou o projeto em estado inconsistente:

| Componente | Status | Fonte de Verdade |
|------------|--------|------------------|
| **Storage (imagens/vídeos)** | ✅ Migrado para R2 | `wrangler.toml` + `src/lib/storage/r2.ts` |
| **Database (PostgreSQL/D1)** | ❌ Não migrado | Nenhum binding D1 configurado |
| **Auth (usuários/tokens)** | ❌ Depende Supabase | `src/lib/supabase/server.ts` |
| **Realtime (WebSocket)** | ❌ Incompatível | Não funciona em Workers |

---

## CORREÇÃO P0: Configuração Cloudflare Base

### 1. Atualizar `wrangler.toml`

```toml
name = "portfolio-danilo-final"
main = ".open-next/worker.js"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

# === R2 BUCKETS (JÁ CONFIGURADO) ===
[assets]
directory = ".open-next/assets"
binding = "ASSETS"

[[r2_buckets]]
binding = "PORTFOLIO_ASSETS"
bucket_name = "portfolio-assets"

# === D1 DATABASE (NOVO - CRÍTICO) ===
[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_uuid = "SEU_UUID_AQUI"  # Substituir pelo UUID real do D1
```

### 2. Atualizar `open-next.config.ts`

```typescript
import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  // Adicionar D1 binding
  r2: {
    // Configurações R2 já existentes
  },
  d1: {
    binding: 'DB',
  },
});
```

---

## CORREÇÃO P1: Schema D1

### Criar arquivo de schema D1

Criar `supabase/migrations/20261110000000_create_d1_schema.sql`:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS risc_v1;

-- Tabela site_assets (migrada de Supabase)
CREATE TABLE IF NOT EXISTS site_assets (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    key TEXT NOT NULL,
    bucket TEXT NOT NULL DEFAULT 'site-assets',
    file_path TEXT NOT NULL,
    asset_type TEXT NOT NULL,
    page TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER,
    href TEXT,
    metadata TEXT DEFAULT '{}',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Tabela portfolio_projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    slug TEXT NOT NULL UNIQUE,
    client_slug TEXT NOT NULL,
    title TEXT NOT NULL,
    client_name TEXT NOT NULL,
    brand_name TEXT,
    year INTEGER,
    project_type TEXT NOT NULL,
    short_label TEXT,
    description TEXT,
    thumbnail_path TEXT,
    hero_image_path TEXT,
    url_landscape TEXT,
    url_square TEXT,
    gallery TEXT,
    featured_on_home BOOLEAN DEFAULT FALSE,
    featured_on_portfolio BOOLEAN DEFAULT FALSE,
    featured_home_order INTEGER,
    featured_portfolio_order INTEGER,
    home_featured TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    landing_page_id TEXT,
    destination TEXT,
    case_body TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Índices críticos
CREATE INDEX IF NOT EXISTS idx_site_assets_page ON site_assets(page, is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured_home ON portfolio_projects(featured_home_order) WHERE featured_on_home = TRUE;
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured_portfolio ON portfolio_projects(featured_portfolio_order) WHERE featured_on_portfolio = TRUE;
```

---

## CORREÇÃO P2: Adaptador D1

### Criar `src/lib/d1/client.ts`

```typescript
// Cloudflare D1 client adapter
declare const DB: D1Database | undefined;

export async function createD1Client(): Promise<D1Database> {
  if (typeof DB !== 'undefined') {
    return DB;
  }
  
  // Fallback para Supabase (modo desenvolvimento)
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();
  
  return {
    prepare: () => {
      throw new Error('D1 not available in this environment');
    },
    all: (sql: string, params?: any[]) => supabase.from('dummy').select(sql),
    // ... outros métodos adaptados
  } as any;
}

export function getD1Query(table: string) {
  return {
    from: () => ({
      select: (columns?: string) => ({
        eq: (col: string, val: any) => ({
          single: () => ({
            // adapta para D1 query
            then: (callback: (result: any) => void) => {
              // implementação D1
            },
          }),
        }),
      }),
    }),
  };
}
```

---

## CORREÇÃO P3: Auth/Auth Middleware

### Opção A: Manter Supabase Auth (Recomendado)

O middleware de auth já está bem implementado em `src/lib/supabase/middleware.ts`. Manter isso funcione com Supabase Auth mantém:
- Login com Provider (Google, GitHub, etc.)
- Session cookies
- RBAC via `admin_users` table

**Só precisa garantir que `NEXT_PUBLIC_SUPABASE_URL` esteja configurado** no Cloudflare Workers KV ou variáveis de ambiente.

### Opção B: Migrar para Cloudflare Access (Avançado)

Se quiser migrar completamente, precisa:
1. Configurar Cloudflare Access com `cloudflared access login`
2. Criar `src/lib/cloudflare/auth.ts` com verificação de token JWT
3. Atualizar middleware para usar `c.env.ACCESS_TOKEN` ou verificar JWT no cabeçalho Authorization

---

## CORREÇÃO P4: Realtime Assets (Polling Fallback)

### Atualizar `src/hooks/useRealtimeAssets.ts`

```typescript
// Adicionar polling como fallback quando Supabase Realtime não está disponível
const POLLING_INTERVAL_MS = 45_000;

function usePollingFallback() {
  useEffect(() => {
    if (isProjectRestricted) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch('/api/site-assets');
          const assets = await response.json();
          // Process assets...
        } catch (e) {
          // ignore
        }
      }, POLLING_INTERVAL_MS);
      
      return () => clearInterval(interval);
    }
  }, []);
}
```

---

## CORREÇÃO P5: Variáveis de Ambiente Cloudflare

Adicionar ao `.env.example`:

```bash
# Cloudflare R2
NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.portfoliodanilo.com
R2_ACCOUNT_ID=seu_account_id
R2_ACCESS_KEY_ID=chave_acesso
R2_SECRET_ACCESS_KEY=chave_secreta
R2_BUCKET_NAME=portfolio-assets

# Cloudflare D1 (após criação do database)
# NEXT_PUBLIC_D1_DATABASE_ID=uuid_do_database

# Cloudflare Turnstile
TURNSTILE_SITE_KEY=seu_site_key
TURNSTILE_SECRET_KEY=seu_secret_key

# Mantido para fallback/local dev
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
```

---

## VERIFICAÇÃO DE EXECUÇÃO

### Passos para testar:

1. **Criar D1 Database no Cloudflare Dashboard**
   - Ir para: Cloudflare Dashboard → Workers → D1 → Create Database
   - Nome: `portfolio-db`
   - Anotar UUID

2. **Atualizar wrangler.toml** com UUID do D1

3. **Migrar dados**:
   ```bash
   # Exportar de Supabase
   pg_dump -h db.supabase.co -U postgres -d postgres --data-only --table=site_assets --table=portfolio_projects > assets_backup.sql
   
   # Importar para D1
   wrangler d1 execute portfolio-db --remote < assets_backup.sql
   ```

4. **Build e deploy**:
   ```bash
   pnpm run build:cloudflare
   wrangler deploy
   ```

5. **Verificar admin**:
   - Acessar `/admin`
   - Verificar se login funciona
   - Verificar if assets carregam

---

## Arquivos a NÃO MODIFICAR (por enquanto)

- `src/components/home/portfolio-showcase/*` - Usa getAssetUrl() já com fallback R2
- `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx` - Realtime Supabase
- `src/lib/supabase/urls.ts` - Lógica R2-first já implementada
- `assets.json` - Fonte de verdade para showcase
- `public/site.assets/*` - Assets estáticos de build

---

## Próximos Passos

1. [ ] Criar D1 Database no Cloudflare
2. [ ] Atualizar `wrangler.toml` com D1 binding
3. [ ] Atualizar `open-next.config.ts` com D1 config
4. [ ] Criar script de migração de dados
5. [ ] Atualizar `src/lib/env.ts` para suportar modos
6. [ ] Testar build e deploy
7. [ ] Documentar em `MIGRATION_COMPLETENESS.md`
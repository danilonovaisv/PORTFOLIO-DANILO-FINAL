# ADMIN — PROTOTIPO INTERATIVO (AS-BUILT)

Versão: **1.0**  
Data: **2026-02-09**  
Status: **Novo documento canônico, sincronizado com código e runtime local (`/admin`)**

## 1. Objetivo do módulo

A área `/admin` é o CMS operacional do portfólio para:

- autenticação e controle de acesso
- gestão de projetos/tags/mídia/landing pages
- utilitários de IA (copy e geração de cenas)
- auditoria de ações administrativas

## 2. Fonte de verdade (implementação)

- Auth layout/login:
  - `src/app/admin/(auth)/layout.tsx`
  - `src/app/admin/(auth)/login/page.tsx`
  - `src/components/admin/LoginForm.tsx`
- Protected layout/shell:
  - `src/app/admin/(protected)/layout.tsx`
  - `src/components/admin/AdminShell.tsx`
- Guardas e acesso:
  - `src/lib/admin/authz.ts`
  - `src/lib/admin/server-access.ts`
- Navegação:
  - `src/config/admin-navigation.ts`

## 3. Arquitetura de rotas

### 3.1 Grupo público de autenticação

- `/admin/login`
- `/admin/reset-password`
- `/auth/callback`

Comportamento:

- layout próprio com card central e link `← Voltar ao site`
- metadata com `robots noindex,nofollow`
- login por email/senha via Supabase Auth
- login social com Google e GitHub via OAuth
- envio de magic link para acesso sem senha
- fluxo de recuperação com `resetPasswordForEmail()` e troca de senha em `/admin/reset-password`
- callback OAuth/email centralizado em `/auth/callback?next=/admin`
- após sucesso: `router.refresh()` + redirect hard para dashboard
- CAPTCHA via Cloudflare Turnstile com fallback para chave pública de produção; não usar chave de teste em deploy
- URLs de produção padronizadas em `https://portfoliodanilo.com`

### 3.2 Grupo protegido

- `/admin` (dashboard)
- `/admin/trabalhos`
- `/admin/trabalhos/new`
- `/admin/trabalhos/[id]`
- `/admin/tags`
- `/admin/midia`
- `/admin/landing-pages`
- `/admin/landing-pages/new`
- `/admin/landing-pages/[id]`
- `/admin/settings`
- `/admin/config` (redirect para `/admin/settings`)
- `/admin/copy-agent`
- `/admin/scene-generator`

## 4. Autenticação e autorização

### 4.1 Proteção de rota

`src/app/admin/(protected)/layout.tsx`:

- `dynamic = 'force-dynamic'`
- `runtime = 'nodejs'`
- `fetchCache = 'force-no-store'`
- valida usuário com `supabase.auth.getUser()`
- sem usuário: redirect para `/admin/login`
- erro crítico: renderiza `AdminErrorDisplay`

### 4.2 Regra de role

`src/lib/admin/authz.ts`:

- roles aceitas: `admin`, `owner`, `super_admin`
- checa em `app_metadata` ou `user_metadata`
- fallback por allowlist de emails (`ADMIN_ALLOWED_EMAILS`)
- enforcement controlado por `ADMIN_ENFORCE_ROLE`

### 4.3 Acesso server-side centralizado

`requireAdminAccess()` (`src/lib/admin/server-access.ts`):

- valida sessão + regra de role
- tenta usar client admin (service role)
- fallback para request-scoped client
- usado nas server actions e páginas protegidas

## 5. Shell e navegação do admin

`AdminShell` inclui:

- sidebar desktop
- menu mobile via sheet
- items:
  - Dashboard
  - Trabalhos
  - Tags
  - Mídia & Layout
  - Landing Pages
  - Configurações
  - Copy Agent
  - Scene Generator
- ações globais:
  - `Ir para o Site`
  - `Sair` (server action `signOut`)

## 6. Módulos funcionais

### 6.1 Dashboard (`/admin`)

- cards de métricas:
  - total de projetos
  - total de tags
  - destaque na Home
  - destaque no Portfólio
- links rápidos para gestão

### 6.2 Trabalhos (`/admin/trabalhos`)

Funcionalidades:

- listagem tabular com filtros (`tag`, `year`, `type`, `status`, `search`)
- preview de thumbnail (imagem/vídeo)
- indicadores de variantes 16:9 e 1:1
- toggles server-side:
  - publicar/rascunho (`togglePublish`)
  - destaque Home (`toggleFeaturedOnHome`)
  - destaque Portfólio (`toggleFeaturedOnPortfolio`)
- acesso a criação/edição

Criação/edição (`new`, `[id]`):

- formulário completo (`ProjectForm`)
- upload de mídias para `portfolio-media`
- associação de tags
- associação opcional com landing page

### 6.3 Tags (`/admin/tags`)

- agrupamento por tipo:
  - `category`
  - `discipline`
  - `industry`
- formulário de criação/edição (`TagForm`)
- server actions com `zod`:
  - `upsertTagAction`
  - `deleteTagAction`
- revalidação:
  - `/admin/tags`
  - `/admin/trabalhos`

### 6.4 Mídia (`/admin/midia`)

- listagem de `site_assets` com normalização de registros
- filtro de chaves inválidas
- contagem de ativos
- bloco de criação/edição (`AssetForm`)
- galeria com busca, filtros e paginação (`AssetGallery`)
- ações:
  - `upsertAsset`
  - `assignAssetRole` (move/renomeia path no storage)
  - `removeAsset`
- revalidação:
  - `/`
  - `/about` (nota: rota pública atual é `/sobre`)
  - `/portfolio`

### 6.5 Landing Pages (`/admin/landing-pages`)

- listagem com badge de template detectado:
  - Legacy
  - Template Mestre V1/V2/V3
- ações:
  - criar novo
  - editar
  - excluir
  - abrir página pública `/projects/[slug]`
- formulário avançado (`LandingPageForm`) com blocos e uploads
- server actions (`zod`):
  - `listLandingPagesAction`
  - `getLandingPageAction`
  - `saveLandingPageAction`
  - `deleteLandingPageAction`
- revalidação:
  - `/admin/landing-pages`
  - `/portfolio`

### 6.6 Settings/Config

- `/admin/settings`:
  - sessão atual (email/uid/providers)
  - saúde de credenciais (Supabase URL, chave pública, OpenAI key)
- `/admin/config`:
  - redirect para `/admin/settings`

### 6.7 Copy Agent (`/admin/copy-agent`)

- formulário orientado a geração de copy de projeto
- anexos opcionais (até 4 imagens)
- validação por `zod`
- geração via OpenAI (`gpt-4o`)
- saída em Markdown com botão de cópia

### 6.8 Scene Generator (`/admin/scene-generator`)

- multi-upload (até 8 imagens)
- seleção de modelo (DALL-E 3 disponível; demais marcados como indisponíveis)
- batch (1 a 4)
- presets de ratio (`1:1`, `16:9`, `9:16`, `4:5`)
- geração de variações + download por imagem
- validação de payload e tamanhos de arquivo

## 7. Auditoria administrativa

`src/lib/admin/audit.ts`:

- grava eventos em `admin_audit_log`

## 8. Contrato de Auth (estado atual)

### 8.1 Redirects canônicos

- `https://portfoliodanilo.com/auth/callback`
- `https://portfoliodanilo.com/admin/login`
- `https://portfoliodanilo.com/admin/reset-password`

### 8.2 Regras operacionais

- `site_url` do Supabase Auth deve permanecer em `https://portfoliodanilo.com`
- qualquer referência residual a `http://portfoliodanilo.com` deve ser tratada como desvio de configuração
- `next` no callback é sanitizado para impedir open redirect
- OAuth e emails de auth retornam sempre para rotas HTTPS autorizadas

### 8.3 Causa raiz corrigida em março/2026

- o frontend publicado estava carregando Turnstile com fallback de chave pública de teste por ausência de `NEXT_PUBLIC_TURNSTILE_SITE_KEY` no build/runtime
- o Supabase estava com CAPTCHA habilitado e validando contra configuração real; o mismatch gerava falha visual `captcha verification process failed` e retornos `500 unexpected_failure` no fluxo `grant_type=password`
- o `site_url` do projeto também estava em `http://portfoliodanilo.com`, criando inconsistência entre produção HTTPS e redirects de auth
- inclui ator, ação, recurso, status, metadados e erros
- falha de log não bloqueia o fluxo principal

Ações auditadas incluem (exemplos):

- `project.create/update/delete/toggle_*`
- `tag.create/update/delete`
- `asset.upsert/assign_role/delete`
- `landing_page.create/update/delete`

## 8. Acessibilidade e UX no admin

Implementado:

- estrutura responsiva com navegação desktop/mobile
- labels explícitas em formulários
- foco visível em botões/inputs principais
- alvos de toque adequados no menu mobile

Ponto observado em runtime (`/admin/login`):

- aviso de autocomplete em inputs (recomendável adicionar `autoComplete` em email/senha)

## 9. Runtime local validado

Validação em `http://localhost:3000/admin`:

- rota redireciona para `/admin/login` quando não autenticado
- formulário de login renderiza corretamente
- fluxo protegido depende de sessão válida no Supabase

## 10. Dependências críticas

- Supabase Auth (sessão e usuário)
- Supabase Postgres (tabelas admin/cms)
- Supabase Storage (uploads de mídia)
- OpenAI API (copy-agent e scene-generator)

## 11. Prompt estruturado (referência rápida)

- Módulo: Admin CMS `/admin`
- Requisitos essenciais:
  - auth + role guard
  - shell responsivo com navegação completa
  - CRUD de projetos/tags/mídia/landing pages
  - ações auditáveis em `admin_audit_log`
  - ferramentas IA isoladas em rotas próprias
- Guardrails:
  - manter `noindex` em rotas admin
  - manter redirects e fallback de erro (`AdminErrorDisplay`)
  - manter revalidação de rotas públicas após mutações

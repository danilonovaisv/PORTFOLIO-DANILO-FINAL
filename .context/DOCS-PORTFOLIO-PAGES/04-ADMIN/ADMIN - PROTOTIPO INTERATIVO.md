# ADMIN — PROTOTIPO INTERATIVO (AS-BUILT)

Versão: **1.1**  
Data: **2026-03-08**  
Status: **Documento canônico sincronizado com o código, runtime local (`/admin`) e Supabase remoto**

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
  - saúde de credenciais (Supabase URL, chave pública, OpenAI key)
  - CRUD completo de `admin_tokens`
  - CRUD completo de usuários ADMIN
  - teste automático de token OpenAI
  - mascaramento seguro de segredo
  - auditoria de alterações via `admin_audit_log`
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

## 9. Atualização 2026-03-08 — Dashboard ADMIN Audit & Fixes

### 9.1 Home / cards destaque

- causa raiz confirmada: `home_featured.logoPath` era salvo no bucket `portfolio-media`, mas o frontend montava URL pública sem inferir bucket
- correção aplicada em `src/lib/utils.ts`
  - `getAssetUrl()` passou a inferir `site-assets` vs `portfolio-media`
  - logos de `home_featured` agora resolvem corretamente mesmo sem prefixo de bucket

### 9.2 Landing Page V3 / blocos

- causa raiz confirmada:
  - preset `text` removido de `BASIC_PRESETS`
  - `BlockEditorV3` salvava campos transitórios (`file`, `previewUrl`, `file1`, `previewUrl1`) dentro de `block.content`
  - persistência esperava uploads apenas no topo do bloco (`block.file`, `block.file2`) e campos canônicos `media/media2`
  - leitura posterior ignorava aliases quebrados como `media1`, `alt1`, `poster1`
- correções aplicadas:
  - `src/components/admin/templates/v3/presets.ts`: bloco `text` restaurado
  - `src/components/admin/templates/v3/BlockEditorV3.tsx`
    - uploads voltaram para `file/file2` no topo do bloco
    - persistência canônica em `content.media`, `content.media2`, `content.alt`, `content.alt2`, `content.poster`, `content.poster2`
    - editor explícito para bloco `text`
  - `src/lib/admin/transformers/landing-page.ts`
    - sanitização central de blocos V3
    - remoção de chaves transitórias antes de salvar
  - `src/lib/admin/services/landing-page-save.ts`
    - upload e persistência agora usam somente o shape canônico
  - `src/lib/projects/template-schema.ts`
    - parser tolera payload legado com `media1/alt1/poster1`

### 9.3 Backfill remoto de landing pages V3

- páginas corrigidas no Supabase remoto:
  - `dntro`
  - `glad-manifesto`
- ação aplicada:
  - remoção de `file*` e `previewUrl*` persistidos em JSON
  - conversão de `media1/alt1/poster1` para `media/alt/poster`

### 9.4 Tokens administrativos

- migration aplicada: `supabase/migrations/20260308120000_admin_tokens_and_admin_user_sync.sql`
- nova tabela: `public.admin_tokens`
  - campos: `id`, `name`, `provider`, `description`, `secret`, `status`, `environment`, `created_at`, `updated_at`, `created_by`, `updated_by`
  - RLS: apenas `public.is_admin()`
  - gatilho `set_updated_at()`
- compatibilidade:
  - `site_settings.openai_api_key` continua como fallback legado
  - backfill automático criou `OpenAI API Key` em `admin_tokens`
- lookup de runtime:
  - `src/lib/admin/settings.ts` agora busca `OPENAI_API_KEY` do ambiente
  - depois consulta `admin_tokens`
  - por último usa `site_settings.openai_api_key`

### 9.5 Usuários ADMIN

- modelo atual consolidado:
  - verdade operacional de login: `auth.users.app_metadata.role`
  - espelho administrativo: `public.admin_users`
- ajustes aplicados:
  - backfill de admins existentes do Auth para `public.admin_users`
  - `/admin/settings` agora permite:
    - convidar admin por email
    - promover usuário existente
    - editar nome/email/role/status
    - remover acesso ADMIN sem excluir a conta Auth
  - proteção contra remoção/rebaixamento do último `owner`

### 9.6 Viewer de imagens do modal de post

- causa raiz confirmada:
  - área principal usava `aspect-video` fixa + `object-cover`
  - lightbox não tinha navegação anterior/próxima
- correções aplicadas:
  - `src/components/portfolio/content/AdaptiveMediaLayout.tsx`
    - imagem principal passou a usar `object-contain`
    - preservação do aspect ratio real
    - preload da imagem vizinha
  - `src/components/portfolio/ImageLightbox.tsx`
    - navegação por setas visuais
    - navegação por teclado (`ArrowLeft`, `ArrowRight`, `Escape`)

### 9.7 Realtime e persistência

- auditoria do código não encontrou um listener V3 dedicado causando corrupção direta
- a principal causa real de perda de conteúdo era o payload malformado salvo no banco
- efeito colateral observado pelo usuário:
  - ao reabrir e editar, o parser descartava chaves não canônicas e “sumia” com mídia/itens
- estado atual:
  - leitura e escrita do V3 convergiram para o mesmo contrato JSON

## 10. Contratos canônicos

### 10.1 Shape V3 persistido

Cada bloco salvo em `landing_pages.content.gallery_grid` deve respeitar:

- `id`
- `type`
- `content`
  - `text?`
  - `text2?`
  - `textConfig?`
  - `textConfig2?`
  - `media?`
  - `media2?`
  - `alt?`
  - `alt2?`
  - `poster?`
  - `poster2?`
  - `mediaType?`
  - `mediaType2?`
  - `bandColor?`

Campos proibidos no JSON persistido:

- `file`
- `file1`
- `file2`
- `previewUrl`
- `previewUrl1`
- `previewUrl2`
- `media1`
- `alt1`
- `poster1`

### 10.2 Fluxo de persistência V3

1. editor monta estado local com uploads transitórios no topo do bloco
2. `prepareLandingPageData()` chama `saveMasterTemplateV3()`
3. uploads vão para `site-assets/landing-pages/<slug>/...`
4. `sanitizeMasterV3BlockContent()` remove campos transitórios
5. `stripMasterV3Draft()` serializa apenas o shape canônico
6. releitura passa por `normalizeMasterTemplateV3()` e retorna o mesmo contrato

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

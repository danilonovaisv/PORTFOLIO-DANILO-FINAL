# Auditoria de Integridade de Assets (Supabase Storage → Cloudflare R2 & D1)

**Data da Auditoria:** 2026-11-11  
**Bucket Físico R2:** `portfolio-assets` (`wrangler.toml`)  
**Custom Domain CDN:** `https://assets.portfoliodanilo.com`  
**Inventário Base Inspecionado:** `.agents/artifacts/asset-recovery/02-asset-inventory.json` (`387` objetos R2 reais; `3.264` referências auditadas) + verificação HTTP HEAD ao vivo nesta sessão.

---

## 1. Mapa Quantitativo Verificado (D1 × R2 × Código × Público)

| Origem | Total Auditado | Verificados (`200 OK` / Match) | Quebrados / Faltantes (`404` / Missing) | Observação Técnica |
| :--- | :---: | :---: | :---: | :--- |
| **Bucket físico R2 (`portfolio-assets`)** | `387` objetos | `387` (`100%`) | `0` | Bucket unificado contendo prefixos virtuais `portfolio-media/` (`76` chaves únicas no inventário) e `site-assets/` (inclui `landing-pages/*` = `75` objetos e `about/origin/origin2/*`). |
| **D1 `portfolio_projects` (capas + logo home)** | `19` projetos (`78` refs) | `67` refs (`16` projetos completos; `ai-video` `1x1` `200`) | `11` refs (**3 projetos**: `bidaya`, `nestle`, `ai-video` 16x9) | `16` projetos respondem `HTTP 200` em 16:9 e 1:1; `ai-video` só tem `1x1` MP4 `200` (16:9 é `404`). |
| **D1 `landing_pages.cover`** | `19` capas | `16` (`200 OK`) | `3` (`404`: `bidaya`, `nestle`, `ai-video`) | Mesmos 3 arquivos ausentes no R2 (`portfolio-media/bidaya/...`, `portfolio-media/nestl/...`, `portfolio-media/projeto-pessoal/...16-9...`). |
| **D1 `site_assets`** | `857` registros | `449` match direto + `8` matched | `395` missing + `5` malformed | A tabela no D1 tem `12` colunas e **não possui `file_url`**. |
| **Galerias R2 não vinculadas no D1** | `111` candidatos probed nesta sessão (`gallery` + `home-featured-logo` + `landing-pages/*`) | **`111/111` (`HTTP 200`)** | **`0`** | Todos os `111` objetos testados via HTTP HEAD ao vivo nesta sessão retornaram `HTTP 200` em `https://assets.portfoliodanilo.com/`. |
| **`about/origin/origin2/cena-01..04.webp`** | `4` cenas | **`4/4` (`HTTP 200`, `image/webp`)** | `0` | Ativos no D1 `site_assets` (`is_active: 1`) e em `src/config/content.ts`. |

---

## 2. Análise Detalhada das Falhas e Ativos Recuperáveis no R2

### 2.1. Capas de Projetos com `HTTP 404` no R2 (Ação Obrigatória — Sem Placeholder)

1. **`bidaya-parfums-scents-without-borders` (`thumbnail_path`, `hero_image_path`, `url_landscape`, `url_square`, `landing_pages.cover`)**
   - URLs atualmente no D1 retornam **`404`**:
     - `portfolio-media/bidaya/ai-case/assets-do-projeto/cover-16x9/thumb-16-9.cae9e3d095a461ad.webp`
     - `portfolio-media/bidaya/ai-case/assets-do-projeto/cover-1x1/thumb-1-1.f0b1ec55504e7f86.webp`
   - **Ativos reais do projeto já presentes no R2 (`HTTP 200`)**:
     - `site-assets/landing-pages/bidaya-parfums-scents-without-borders/anima-thumb/bg-16.9.webp`
     - `site-assets/landing-pages/bidaya-parfums-scents-without-borders/anima-thumb/camada-0-16.9.webp`
     - `site-assets/landing-pages/bidaya-parfums-scents-without-borders/anima-thumb/camada-1-16.9.webp`
     - `site-assets/landing-pages/bidaya-parfums-scents-without-borders/anima-thumb/camada-2-16.9.webp`
     - `site-assets/landing-pages/bidaya-parfums-scents-without-borders/anima-thumb/camada-3-16.9.webp`
     - `site-assets/landing-pages/bidaya-parfums-scents-without-borders/logo-bidaya.webp`
   - **Ação planejada:** Confirmar existência do arquivo original local/backup; se ausente, derivar/promover capa oficial composta ou usar `bg-16.9.webp` / camada principal como fallback imediato em R2 + atualizar D1 + corrigir URLs legadas em [`public/anima-HERO-bidaya.html`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/anima-HERO-bidaya.html).

2. **`nestle` (`thumbnail_path`, `hero_image_path`, `url_landscape`, `url_square`, `landing_pages.cover`)**
   - URLs atualmente no D1 retornam **`404`**:
     - `portfolio-media/nestl/brand-campaigns/assets-do-projeto/cover-16x9/thumb-nestle-16-9.63a36567aa9ee520.webp`
     - `portfolio-media/nestl/brand-campaigns/assets-do-projeto/cover-1x1/thumb-nestle-1-1.0e1ef137fb2ceb32.webp`
   - **Ativos reais da campanha já presentes no R2 (`HTTP 200`)**: `22` arquivos em `site-assets/landing-pages/nestle/` (incluindo `STORIES-NESTLE-100-ANOS--PROMO1920X1080px-v2.webp`, `KV-SAUDAVEIS-NESTLE-08.webp`, `INSTAGRAM_PATROCINADO_900x900.webp`, `Passa tempo_EMPORIO_1000X1000.webp`, `logo.png`).
   - **Ação planejada:** Verificar bucket/origem local pela imagem original da capa; caso irrecuperável do Supabase morto, vincular no D1 uma imagem real de campanha verificada do próprio projeto Nestlé (`site-assets/landing-pages/nestle/...`) e popular toda a galeria/case com os 22 ativos reais.

3. **`ai-video` (`url_landscape`, `thumbnail_path`, `hero_image_path`, `landing_pages.cover`)**
   - **`404`**: `portfolio-media/projeto-pessoal/ai-video/assets-do-projeto/cover-16x9/ai-thumb-16-9-compressed.59c39fd6662e48d1.mp4`
   - **`200 OK`**: `portfolio-media/projeto-pessoal/ai-video/assets-do-projeto/cover-1x1/ai-thumb-1-1-compressed.6ae532a6f68a3b42.mp4`
   - **Ação planejada:** Verificar vídeos locais em [`public/site.assets/images-videos/`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/site.assets/images-videos/) ou usar a variante `1x1` (`200`) como fallback até o re-upload/derivação autorizada da versão 16:9 no R2.

4. **`cartoon-network-packaging` (Presente somente em `src/lib/portfolio/fallbacks.ts`)**
   - Ambas URLs apontadas em `fallbacks.ts` (`cartoon-network/packing/.../thumb-16-9.4e7b48e091c2bfec.webp` e `thumb-1-1.3715a95d534711b4.webp`) retornam **`HTTP 404`** e o projeto **não existe no D1**.
   - **Ação planejada:** Remover de `fallbacks.ts` (ou só manter se houver comprovação de assets e registro real no D1).

---

### 2.2. Inventário de Conteúdo Rico Real no R2 Desconectado do D1

O R2 já hospeda **mais de 100 assets autênticos de cases e galerias** (`HTTP 200` comprovado nesta sessão) que hoje não aparecem porque `portfolio_projects.gallery = "[]"` e `landing_pages.content = "[]"`:

- **`tcotton`**: `34` imagens `master-v3` (`master-v3-hero`, `master-v3-logo`, `master-v3-grid-block-*`) em `site-assets/landing-pages/tcotton/`.
- **`nestle`**: `21` peças de campanha WebP + `logo.png` em `site-assets/landing-pages/nestle/`.
- **`ambev-bees`**: `13` imagens WebP em `portfolio-media/bees/bees/assets-do-projeto/gallery/`.
- **`swift-week`**: `7` imagens `master-v3` em `site-assets/landing-pages/swift-week/` + `6` imagens em `portfolio-media/swift/swift-week/assets-do-projeto/gallery/`.
- **`campanhas-digitais` (Dolce Gusto)**: `7` imagens WebP em `portfolio-media/dolce-gusto/campaign/assets-do-projeto/gallery/`.
- **`bidaya-parfums-scents-without-borders`**: `6` camadas/logo em `site-assets/landing-pages/bidaya-parfums-scents-without-borders/`.
- **`conid` (Conib)**: `5` imagens `master-v3` em `site-assets/landing-pages/conid/`.
- **`eudora`**: `4` imagens em `portfolio-media/eudora/eudora/assets-do-projeto/gallery/`.
- **`mercado-livre-ai-video-mp`**: `3` imagens de galeria + `1` logo em `portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/`.
- **`glad`**: além da capa `.webp` (`200`), possui `.webm` no R2 (`portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.5de7c334e6491aa0.webm`) e `VIDEOMANIFESTOGLAD.mp4` local em `public/site.assets/images-videos/`.

---

## 3. URLs Legadas de Supabase Ainda Presentes no Código e em Produção

### 3.1. Hosts Supabase Identificados
1. **`https://dpejskjpghoozbpfxkpf.supabase.co`** — Detectado no HTML de produção (`https://portfoliodanilo.com`): `<link rel="dns-prefetch">` e `--supabase-url`. **Domínio com falha de resolução DNS** (`Errno 8`), principal suspeito dos **HTTP 503** nas rotas SSR e erros de rede no cliente.
2. **`https://umkmwbkwvulxtdodzmzf.supabase.co`** — Projeto antigo ainda referenciado em defaults/arquivos estáticos:
   - [`src/lib/env.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/lib/env.ts#L38) (`defaultSupabaseHost`)
   - [`next.config.mjs`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/next.config.mjs#L8) (`DEFAULT_SUPABASE_HOST`)
   - [`public/404.css`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/404.css#L2)
   - [`public/manifest.json`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/manifest.json#L10-L15) e [`public/manifest-qr.json`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/manifest-qr.json#L13-L37)
   - [`public/anima-HERO-bidaya.html`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/anima-HERO-bidaya.html#L92-L116)
   - [`public/site.assets/about/origin/cena-1/ANIMA-FOTO.html`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/site.assets/about/origin/cena-1/ANIMA-FOTO.html#L88-L110) e cenas `cena-2`, `cena-3`, `cena-4`.

### 3.2. Pontos de Bypass na Resolução de URLs (`main`)
- [`src/lib/utils.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/lib/utils.ts#L62): `if (/^https?:\/\//.test(trimmed)) return trimmed;` deixa escapar URLs absolutas `supabase.co/storage/v1/object/public/...`.
- [`src/lib/media/asset-contract.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/lib/media/asset-contract.ts#L130-L141): `resolveSupabaseUrl()` só normaliza `/storage/v1/` se o host bater exatamente e ainda não trata URLs assinadas vs. públicas com robustez.
- [`src/config/brand.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/config/brand.ts#L7-L24): depende de `NEXT_PUBLIC_R2_PUBLIC_URL` ou `R2_PUBLIC_URL` no bundle; caso ausente em edge runtime, recai para `SUPABASE_STORAGE_URL`.

> **Nota sobre a branch `origin/fix/cloudflare-r2-asset-references`:** O commit [`6ec363e27`](git:6ec363e27) já implementou correções consistentes de resolução R2-first + proteção de URLs assinadas em `urls.ts`, `utils.ts`, `asset-contract.ts`, `brand.ts`, `project-mappers.ts` e `site-asset-utils.ts` (com testes em `test/unit/r2-url-recovery.test.ts`). Essas melhorias devem ser integradas/auditadas após aprovação, descartando apenas as duas migrations SQL PostgreSQL incompatíveis (`88841d513` e `fc514d192`).

---

## 4. About Origins (`/sobre`)

- Os 4 ativos canônicos configurados em [`src/config/content.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/config/content.ts#L225-L263) (`site-assets/about/origin/origin2/cena-01.webp` até `cena-04.webp`) existem no D1 (`site_assets` `is_active = 1`), no R2 (`HTTP 200 image/webp`) e possuem cópia em `public/about/origin/origin2/` / `public/site.assets/about/origin/`.
- Os arquivos HTML legados `public/site.assets/about/origin/cena-1..4/*.html` ainda contêm `<img src="https://umkmwbkwvulxtdodzmzf.supabase.co/...">`, devendo ser atualizados para apontar para R2 (`https://assets.portfoliodanilo.com/...`) ou removidos caso não sejam mais referenciados em runtime.


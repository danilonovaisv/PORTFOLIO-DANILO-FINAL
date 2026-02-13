# SITEMAP & ESCOPO FUNCIONAL

## 🏠 HOME (`/`)

- **Objetivo**: Manifesto visual, conversão para contato e vitrine rápida.
- **Código Base**: `src/app/page.tsx`, `src/components/home/*`.
- **Dados (Supabase)**: `featured_projects`, `site_assets` (Manifesto Vídeo).
- **Regras Críticas**: Fallback gracioso se WebGL falhar. Carregamento crítico do Hero.

## 👤 SOBRE (`/sobre`)

- **Objetivo**: Narrativa de autoridade e metodologia.
- **Código Base**: `src/app/sobre/page.tsx`.
- **Dados (Supabase)**: `about_sections`, `timeline`.
- **Regras Críticas**: Seção 3D (Ghost) isolada para não bloquear scroll.

## 📂 PORTFOLIO (`/portfolio`)

- **Objetivo**: Galeria completa, filtros e case studies.
- **Código Base**: `src/app/portfolio/*`.
- **Dados (Supabase)**: `projects` (tabela principal), `tags`, `media_gallery`.
- **Regras Críticas**: Paginação/Infinite Scroll. Imagens via `Supabase Image Loader`.

## ⚙️ ADMIN (`/admin`)

- **Objetivo**: CMS completo (Zero-Deploy Content).
- **Código Base**: `src/app/admin/*`, `src/lib/admin/*`.
- **Regras Críticas**:
  - **Auth Gate**: `src/app/admin/(auth)` protege tudo.
  - **Audit**: Logs de `create/update/delete` obrigatórios.
  - **UX**: Feedback imediato (Toasts).

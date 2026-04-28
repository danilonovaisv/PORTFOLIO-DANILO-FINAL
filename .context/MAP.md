# 🗺️ Projeto Ghost - MAP & MANIFEST

Este documento é a fonte de verdade para a estrutura, arquitetura e sitemap funcional do projeto.

## 🆔 Identidade do Projeto

- **Nome:** Ghost System v3 (Ghost Era)
- **Proprietário:** Danilo Novais
- **Tipo:** Creative Developer Portfolio
- **Status:** Desenvolvimento Ativo (Estabilização de Admin)

## 🏗️ Tech Stack (Core)

- **Framework:** Next.js 14/15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS (com Ghost Tokens)
- **Motor 3D:** React Three Fiber (Three.js)
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime)

## 📂 Estrutura de Diretórios

- `src/app`: Rotas e páginas (App Router).
- `src/components`: Componentes UI atômicos e moleculares.
- `src/components/canvas`: Cenas WebGL e componentes Three.js.
- `src/lib`: Utilitários, hooks e instâncias de clientes (Supabase, etc).
- `src/store`: Gerenciamento de estado (Zustand).
- `.context`: Documentação técnica e fonte de verdade para a IA.
- `rules/`, `skills/`, `workflows/`: Inteligência operacional e automação de agentes.

## 🗺️ Sitemap & Escopo Funcional

### 🏠 HOME (`/`)

- **Objetivo**: Manifesto visual e vitrine de impacto.
- **Destaque**: Vídeo manifesto e integração 3D performática.

### 👤 SOBRE (`/sobre`)

- **Objetivo**: Narrativa, metodologia e autoridade.
- **Destaque**: Seção 3D Ghost interativa com scroll-sync.

### 📂 PORTFOLIO (`/portfolio`)

- **Objetivo**: Galeria completa de projetos com filtros avançados.
- **Destaque**: Carregamento dinâmico e transições suaves.

### ⚙️ ADMIN (`/admin`)

- **Objetivo**: CMS Centralizado (Projetos, Mídia, Tags, Landing Pages).
- **Segurança**: Auth Gate via Supabase Auth.

## 📑 Índice de Ativos de Design

Consulte `GHOST-DESIGN-SYSTEM.md` para tokens de cor, tipografia e motion.
Layouts de referência e protótipos interativos estão listados em `.context/INDEX.md` (legado) ou referenciados no `GEMINI.md`.

---

_Última atualização: Abril 2026_

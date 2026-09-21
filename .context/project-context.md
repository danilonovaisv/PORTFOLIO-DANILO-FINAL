# Project Context & Architecture Baseline — Ghost System

**Status:** Confirmado a partir da inspeção do repositório em 2026-09-20.

## 1. Prioridades Estratégicas Ativas
1. **Restaurar e Garantir a Confiabilidade do ADMIN**:
   - Autenticação e continuidade de sessão (Next.js 16 App Router + Supabase SSR via `src/lib/supabase/middleware.ts` e `src/middleware.ts`).
   - Formulários, mutações de dados e uploads sem falhas silenciosas.
   - Preservação de RLS e integridade de storage.
2. **Cards de Mídia (Home e Portfolio)**:
   - Suporte unificado no mesmo frame geométrico para Imagem, Vídeo e HTML preview (`src/components/portfolio/ProjectCard.tsx`, `src/components/ui/media/MediaCard.tsx`, `FeaturedProjectCard.tsx`).
   - Resiliência em touch/mobile sem depender de hover para revelar conteúdo principal.
   - Respeito estrito a `prefers-reduced-motion` e fallbacks de loading/erro.
   - Prevenção de eager loading descontrolado de mídias pesadas.
3. **Páginas Editoriais de Cases (`/projects/[slug]`)**:
   - Respeito à densidade de conteúdo: compatibilidade tanto com projetos esparsos quanto com projetos ricos em blocos.
   - Separação clara de largura editorial de texto vs. largura de mídia.
   - Validação de rotas dinâmicas, navegação interna, 404 e carregamento de mídia.
4. **Validação Rigorosa Sem Suposições**:
   - Relatórios baseados em evidência real (`PASS / FAIL / NOT VERIFIED`).
   - Sem storytelling ou aprovação presumida sem execução de comandos.

## 2. Mapa do Stack Tecnológico
- **Frontend Core:** Next.js 16.2.2 (App Router, standalone output, Turbopack)
- **UI & Runtime:** React 19, TypeScript 6.0.2 (strict mode), Tailwind CSS 4
- **Motion & 3D:** Framer Motion 12, GSAP 3, Lenis 1, React Three Fiber 9, Three.js 0.183
- **Estado:** Zustand 5, React Context
- **Dados, Auth & Storage:** Supabase (PostgreSQL, Storage, Realtime, SSR) + Firebase (Hosting, Cloud Functions)
- **Qualidade & Testes:** Jest, React Testing Library, Playwright E2E

## 3. Topologia Arquitetural e Limites de Domínio
- **Public Portfolio:** `src/app/page.tsx`, `src/app/portfolio/page.tsx` -> ProjectCard -> MediaCard -> Media Resolvers.
- **Project Detail:** `src/app/projects/[slug]/page.tsx` -> templates (`master-v2`, `alpa`) -> blocos de mídia e texto.
- **Admin Boundary:** `src/app/admin/(auth)` (login) e `src/app/admin/(protected)` (painel, obras, mídias, tags, configurações).
- **Data Boundary:** Supabase Auth + RLS policies + Storage buckets. Alterações exigem revisão pelo Database Sentinel.
- **Verification Boundary:** Quality Verification Specialist executa gates suportados (`pnpm run typecheck`, `pnpm run lint`, `pnpm test`, Playwright).

# Project Overview

Portfólio interativo de Danilo Novais construído em Next.js (App Router) com foco em narrar o manifesto “Design, não é só estética.” apoiado por uma atmosfera 3D etérea (“Ghost Blue”) em React Three Fiber. A home segue a ordem: Header → Hero (WebGL + copy estática) → Manifesto em vídeo → Portfolio Showcase → Featured Projects → Clients/Brands → Contato → Footer. Conteúdo e assets são centralizados em `src/config` e `HOME_CONTENT`, enquanto o Hero 3D usa canvas isolado com pós-processamento (Bloom + Analog Decay) e transições controladas por Framer Motion. 【F:src/app/page.tsx†L1-L17】【F:src/components/home/HomeHero.tsx†L1-L83】

# Architecture & System Design

- **App Router & Layout**: `src/app/layout.tsx` define fontes locais TT Norms, metadados OG/Twitter, SmoothScroll (Lenis) e shell global (Header + Footer). `src/app/page.tsx` monta a página com seções independentes. 【F:src/app/layout.tsx†L1-L94】【F:src/app/page.tsx†L1-L17】
- **Camadas da Hero**: Sticky section com z-index estratificado — z0 WebGL (`GhostStage` → `GhostCanvas`), z10 overlay radial, z20 conteúdo (HeroCopy + ManifestoThumb), z30 ruído, z50 preloader. Scroll context (`ScrollProvider`) sincroniza transformações. 【F:src/components/home/HomeHero.tsx†L1-L83】
- **WebGL Atmosphere**: Canvas com fundo #050505, ghost emissivo deformado, partículas, fireflies e shader veil; pós-processamento via Bloom, Vignette e pass personalizado AnalogDecay. Mouse follow e scroll offset ajustam posição/escala; respeita `prefers-reduced-motion`. 【F:src/components/canvas/home-hero/GhostCanvas.tsx†L1-L86】【F:src/components/canvas/home-hero/Ghost.tsx†L1-L64】
- **Motion & Scroll**: Lenis suaviza rolagem global; Framer Motion anima reveals, thumb→full para manifesto e microinterações; hooks de accessibilidade `usePrefersReducedMotion` evitam desconforto. 【F:src/components/layout/SmoothScroll.tsx†L1-L33】【F:src/components/home/ManifestoThumb.tsx†L1-L119】
- **Dados & Conteúdo**: Branding, navegação e vídeo manifesto em `src/config/{brand,navigation}.tsx`; categorias/projetos/logos em `src/config/content.ts`. Tipos compartilhados em `src/lib/types.ts`. 【F:src/config/brand.ts†L1-L19】【F:src/config/content.ts†L1-L60】
- **UI Kit & Glass**: Botões animados (Framer Motion) e superfície de vidro SVG (`GlassSurface`) para glow/aberração cromática usados na Hero. 【F:src/components/ui/Button.tsx†L1-L122】【F:src/components/ui/GlassSurface.tsx†L1-L120】

# Module & Component Breakdown

- **Layout & Shell**
  - `components/layout/header/SiteHeader.tsx`: Header fixo com fluid glass (desktop) e menu staggered (mobile), ativo por pathname. 【F:src/components/layout/header/SiteHeader.tsx†L1-L57】【F:src/components/layout/header/DesktopFluidHeader.tsx†L1-L92】
  - `components/layout/header/StaggeredMenu.tsx`: Menu fullscreen animado; bloqueia scroll ao abrir. 【F:src/components/layout/header/StaggeredMenu.tsx†L1-L77】
  - `components/layout/Footer.tsx`: Rodapé com navegação e copyright (não exibido acima, mas segue FOOTER config). 
- **Home Experience**
  - `components/home/HeroCopy.tsx`: Copy estática + CTA primário para `/sobre`. 【F:src/components/home/HeroCopy.tsx†L1-L35】
  - `components/home/HeroPreloader.tsx`: Splash com ghost SVG, barra de progresso e fade-out. 【F:src/components/home/HeroPreloader.tsx†L1-L61】
  - `components/home/ManifestoThumb.tsx`: Thumb de vídeo que escala até full-screen conforme scroll; alterna mute/unmute via `useMotionValueEvent`. 【F:src/components/home/ManifestoThumb.tsx†L1-L119】
  - `components/home/ManifestoSection.tsx`: Reprodução principal do manifesto com observers para exibir apenas após saída da hero; áudio habilita ao entrar em viewport. 【F:src/components/home/ManifestoSection.tsx†L1-L99】
  - `components/home/PortfolioShowcase.tsx` + `CategoryStripe`: Lista categorias expansíveis; CTA “let’s build something great”. 【F:src/components/home/PortfolioShowcase.tsx†L1-L111】
  - `components/home/FeaturedProjects.tsx` + `ProjectCard`: Grid de projetos com hover/CTA “view projects”. 【F:src/components/home/FeaturedProjects.tsx†L1-L61】【F:src/components/home/ProjectCard.tsx†L1-L71】
  - `components/home/Clients.tsx`: Grade de logos em faixa azul. 【F:src/components/home/Clients.tsx†L1-L62】
  - `components/home/Contact.tsx` + `contact/*`: Lado A links/CTA sociais; lado B formulário validado que posta para FormSubmit (AJAX). 【F:src/components/home/Contact.tsx†L1-L33】【F:src/components/home/contact/ContactForm.tsx†L1-L131】
- **Canvas / WebGL**
  - `components/canvas/GhostStage.tsx`: dynamic import SSR-off do canvas. 【F:src/components/canvas/GhostStage.tsx†L1-L13】
  - `components/canvas/home-hero/*`: Ghost deformado (HDR emissive azul), olhos responsivos, partículas instanciadas, fireflies com luz, véu atmosférico shader-based e `AnalogDecayPass` para grain/scanlines. 【F:src/components/canvas/home-hero/Ghost.tsx†L1-L64】【F:src/components/canvas/home-hero/postprocessing/AnalogDecayPass.tsx†L1-L75】
- **Portfolio (futuro/rota dedicada)**
  - `components/portfolio/*`: Hero mosaic com flex grow animado, grid de mosaico e tipos auxiliares. 【F:src/components/portfolio/PortfolioHero.tsx†L1-L74】

# UI/Design Interpretation (from reference images)

- **Hero “Ghost Blue”**: Fundo preto com bloom azul intenso, ghost translúcido/fofo à esquerda, copy editorial centralizada e CTA arredondado; miniatura de manifesto à direita com bordas suaves. Visual mantém contraste alto e scanlines sutis, ecoando as imagens fornecidas.
- **Navegação**: Logo light e menu superior em caixa preta com destaque azul na aba ativa; mobile usa ícone hambúrguer e overlay escuro.
- **Manifesto**: Vídeo cinemático ocupa largura total ao rolar; thumb faz transição suave de corner → full-screen.
- **Showcase**: Cards arredondados com gradientes e cantos orgânicos; tipografia em minúsculas, espaçamento amplo e bullets azuis como marcadores.
- **Contato/Faixa de marcas**: Seção azul sólida com logos mono; contato em fundo claro com cards de input arredondados e CTA primário azul.

# Stack & Ecosystem Research Summary

- **Next.js 16 + React 19**: App Router, RSC-friendly; usar `next/dynamic` para WebGL (`ssr: false`) e `Metadata` para SEO/OG. Fonte local via `next/font/local` já configurada. 【F:src/app/layout.tsx†L1-L41】
- **Tailwind CSS 4**: Tokens declarativos em `globals.css` com cores Ghost e tipografia; aproveitar `@theme` e utilities para consistência. 【F:src/app/globals.css†L1-L56】
- **Framer Motion 12**: Recomenda animar apenas `transform/opacity`, usar `useReducedMotion`/`prefers-reduced-motion` para acessibilidade (já aplicado em manifesto e particles). 【F:src/components/home/ManifestoSection.tsx†L1-L99】
- **React Three Fiber + Drei + Postprocessing**: Canvas isolado, `EffectComposer` para Bloom/Vignette, materials emissivos HDR e `shaderMaterial` custom (AnalogDecay). Limitar DPR e `antialias` para performance; desligar interações em reduce-motion. 【F:src/components/canvas/home-hero/GhostCanvas.tsx†L1-L86】
- **Lenis**: Suaviza scroll global; integrar `requestAnimationFrame` no provider (feito). 【F:src/components/layout/SmoothScroll.tsx†L1-L33】
- **Supabase Storage + Custom Image Loader**: `next.config.mjs` aponta para loader que converte object URL → render URL com width/quality; requer `NEXT_PUBLIC_SUPABASE_URL` para caminhos relativos. 【F:next.config.mjs†L1-L26】【F:src/lib/supabase/image-loader.ts†L1-L73】
- **FormSubmit**: Contato envia via endpoint AJAX; manter honeypot/captcha desativado conforme config. 【F:src/components/home/contact/ContactForm.tsx†L1-L97】
- **Firebase Hosting/App Hosting**: Deploy default com headers de cache agressivos para assets e SW no-revalidate; backend region us-east1, emuladores configurados. 【F:firebase.json†L1-L95】

# Build, Deployment & Infrastructure

- **Pré-requisitos**: Node ≥22, PNPM 10 (packageManager), mas scripts usam `npm run`; alinhar gestor em CI.
- **Scripts chave**: `dev`, `prebuild` (gera build-info), `build`, `start`, `lint`, `typecheck`, `prettier`, `jest`, `test` (lint + typecheck + prettier + jest + e2e shell). 【F:package.json†L9-L49】
- **Imagens**: Next Image com loader custom; `dangerouslyAllowSVG` habilitado para logos. Definir `NEXT_PUBLIC_SUPABASE_URL` em `.env.local` para assets relativos.
- **Deployment**: `firebase.json` usa frameworksBackend (Next SSR) + apphosting. Headers: cache 1y para estáticos, no-store para SW, revalidate 0 para HTML/build-info. Emuladores pré-configurados (`npm run dev` para apphosting). 【F:firebase.json†L1-L95】
- **Fonts & Assets**: TT Norms locais em `src/fonts`, logos/vídeo servidos de Supabase Storage; fallback com SSR seguro.

# API, Integrations & Data Flow

- **Conteúdo**: `HOME_CONTENT` abastece showcase, featured, clients; `BRAND` mantém URLs de logo/vídeo; navegação e contatos em `navigation.tsx`.
- **Scroll Sync**: `ScrollProvider` injeta `scrollYProgress` em Hero; `ManifestoThumb` deriva largura/altura/borderRadius e estado de áudio a partir do progresso e interseção da seção manifesto.
- **Acessibilidade**: Skip link em layout, aria-labels em links do header, form inputs com `aria-invalid`/`aria-describedby`; `prefers-reduced-motion` respeitado em Hero/WebGL.
- **Networking**: Contato posta via fetch AJAX; manifesto vídeo e assets streamam de Supabase (HTTPS). Não há backend próprio além de hosting.

# Automation & Optimization Opportunities

- **CI sugerido**: `pnpm lint && pnpm typecheck && pnpm prettier && pnpm jest` em PR; cache de pnpm e Next para builds.
- **WebGL Perf**: Limitar partículas/fireflies em mobile, fixar `dpr={[1,1.2]}` para low-end, considerar `useMemo` para materials e desativar pointer-move em reduce-motion (já parcialmente feito).
- **Imagem**: Migrar thumbs GIF para MP4/WEBM + poster para LCP; revisar `remotePatterns` se novos buckets forem usados.
- **Observabilidade**: Adicionar `reportWebVitals` ou análise de FPS em modos debug; log de autoplay bloqueado já condicionado a dev.
- **A11y**: Garantir contraste dos textos sobre fundos (ghost bloom intenso) e foco visível no menu mobile.

# Documentation Improvements & Standards

- Manter documentos estruturados por seções deste arquivo; usar paths completos (ex.: `src/components/canvas/home-hero/GhostCanvas.tsx`) para localização rápida.
- Referenciar decisões de design ao “Ghost Blue” (fundo #050505, bloom azul HDR, texto estático) e z-index contract (WebGL z0 < conteúdo z20).
- Registrar requisitos de assets (Supabase URLs, FormSubmit) e dependências de ambiente (NEXT_PUBLIC_SUPABASE_URL, Node 22).
- Preferir exemplos de código curtos + motivos (perf, acessibilidade) e checklist de testes a cada mudança.

# Final Optimized Project Document (all sections rewritten and improved)

- Este arquivo consolida visão, arquitetura, componentes, design system, stack, pipeline e oportunidades de automação do portfólio Ghost. Use-o como guia de onboarding e referência de implementação; alinhe qualquer nova feature ao contrato de camadas (WebGL → Overlay → Conteúdo) e ao tom visual/estratégico descrito acima.

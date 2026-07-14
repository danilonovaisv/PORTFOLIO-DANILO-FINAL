### 1️⃣ Visão Geral
A auditoria semanal automatizada revisou as três páginas principais do portfólio (Home, Sobre e Portfolio), bem como seus respectivos componentes, garantindo a adesão às diretrizes do Ghost Design System (`AGENTS.md` e `.context`). A estrutura de roteamento e abertura de páginas usando o Next.js App Router está perfeitamente funcional. Animações via Framer Motion estão com os devidos fallbacks (`prefers-reduced-motion`) ativos.

### 2️⃣ Diagnóstico por Seção

- **Home Hero:**
  - O controle do Z-index segue a arquitetura correta: Preloader (`z-50`) > WebGL (`z-layer-3d`) > Texto Editorial (`z-layer-content`) > CTA (`z-layer-cta`).
  - O componente `GhostSceneWrapper` é adequadamente envelopado e lida corretamente com as otimizações de pointer-events e fallback de carregamento.

- **Manifesto:**
  - O `VideoManifesto.tsx` possui a semântica correta, respeitando acessibilidade (`aria-label` no botão de mute).
  - O scroll behavior (`useScroll`) está sincronizado com a viewport (ativando o som quando o scroll atinge 99%). Os fallbacks responsivos para desktop/mobile estão adequados via tag `ResponsiveVideo`.

- **Featured Projects:**
  - A renderização do Bento Grid em `FeaturedProjectsSection.tsx` está impecável.
  - **Verificação de uniformidade de altura dos cards (Mandatória):** Os containers utilizam `items-stretch`, e as definições de classes internas (`h-full min-h-0 w-full self-stretch`) combinadas ao container filho (`flex h-full min-h-full flex-1 flex-col` em `FeaturedProjectCard.tsx`) asseguram que **todos os cards na mesma linha preencham 100% da altura vertical disponível**. Regra Absoluta garantida.

- **About (Origin/Method/What I Do):**
  - Textos e headers seguem os tokens de typography do Tailwind.
  - Comportamento mobile-first rigorosamente mantido (ex: `AboutWhatIDo.tsx` alterna a renderização inteiramente baseado no viewport, empilhando verticalmente para devices menores e mantendo rolagem horizontal vinculada ao scroll somente no Desktop).
  - Componentes carregados dinamicamente utilizam os *Skeletons* providos pela árvore de `Suspense`.

- **Portfolio Grid:**
  - Renderiza o grid sob a classe container mandatória `.std-grid` para alinhar com o design cibernético silencioso (Ghost Era).
  - O componente `PortfolioClient.tsx` despacha modais e lazy loading baseando-se no viewport `IntersectionObserver` sem vazamento de memória.
  - Sistema ALPA V3 (landing pages de projetos dinâmicas) devidamente integrado na lógica de abertura dos cards, que navega ou ativa o popup.

### 3️⃣ Lista de Problemas e Backlog Priorizado

- 🔴 **P0 (Crítico): 42 links legados quebrados.**
  O arquivo `.context/active_state.md` aponta a existência de 42 assets quebrados em `site-assets.json`.
- 🔴 **P0 (Crítico): CSP `unsafe-eval` na rota /api/view-cv/route.ts.**
  Identificado pelo histórico do projeto que há um risco de segurança XSS devido ao CSP `unsafe-eval`.
- 🟡 **P1 (Estrutural): Regras conflitantes no `.claude/rules/`.**
  O uso do `@tailwindcss/postcss` está documentado como proibido em `.claude/rules/postcss-tailwind-config.md`, mas está instalado no `package.json`.
- 🟢 **P2 (Polimento Rápido): Refatorar classes CSS legadas.**
  O arquivo `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md` aponta inconsistências de estilos entre CSS Modules (`PortfolioHeroGallery.module.css`), Tailwind CSS, e estilos inline, que devem ser padronizados.

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Unificação de Módulos CSS Legacy**
> **Objetivo:** Migrar totalmente classes soltas e módulos CSS legados para Tailwind no componente de Hero do Portfolio.
> **Arquivos:** `src/components/portfolio/PortfolioHeroNew.tsx`, `src/components/portfolio/PortfolioHeroGallery.module.css` (se houver).
> **Ações:** 1. Identificar classes do tipo `styles.container`. 2. Substituí-las por utilitários Tailwind equivalentes. 3. Apagar o módulo CSS.
> **Regras:** Manter compatibilidade Mobile-first. Respeitar o Ghost Design System (.std-grid).
> **Critérios de Aceite:** O componente PortfolioHeroNew continua perfeitamente funcional usando exclusivamente o Tailwind, sem erros no console ou perda de integridade do layout de grade.

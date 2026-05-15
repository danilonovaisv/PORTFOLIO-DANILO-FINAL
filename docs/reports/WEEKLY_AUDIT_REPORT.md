# Relatório Semanal de Auditoria (Weekly Audit Report)
**Data:** 15 de Maio de 2024
**Foco:** Home, Sobre, Portfólio, Admin e Conformidade ao Ghost Design System

### 1️⃣ Visão Geral
O portfólio mantém uma arquitetura técnica robusta utilizando Next.js (App Router), React Three Fiber (R3F) para experiências WebGL imersivas, e Tailwind CSS estruturado pelos tokens do Ghost Design System. O roteamento apresenta separação clara entre as rotas públicas (`/`, `/sobre`, `/portfolio`) e a área protegida (`/admin`). 
A estratégia de performance percebida está bem aplicada com o uso de `preload` dinâmico em componentes-chave e importações sob demanda (dynamic imports) para recursos pesados.
Contudo, pequenas dívidas técnicas de acessibilidade (estrutura de landmarks semânticas) e refatoração de estilos (mix de CSS Modules e Tailwind em pontos específicos) foram detectadas e necessitam de adequação para garantir excelência em todas as métricas do Lighthouse (100) e aderência irrestrita aos documentos arquitetônicos (`.context`).

### 2️⃣ Diagnóstico por Seção

**Home (`/`)**
- O fluxo de carregamento (Hero -> Manifesto -> Showcase -> Featured) respeita a hierarquia editorial.
- O componente `FeaturedProjectCard` trata corretamente a preferência `prefers-reduced-motion` através do hook `useMotionGate`.
- **Inconsistência:** O atalho de acessibilidade (skip-to-content) definido em `layout.tsx` aponta para `#main-content`, porém a tag `<main id="main-content">` não encapsula o conteúdo principal da página em `page.tsx`.
- O alinhamento dos cards na seção Featured Projects e Portfolio Showcase está consistente com `h-full`, porém deve-se garantir que o container pai force o estiramento igualitário (equal height) vertical nas linhas.

**Sobre (`/sobre`)**
- A página faz uso excelente de `Suspense` boundaries com skeletons dedicados, otimizando o TTI (Time to Interactive).
- A hierarquia visual segue o planejado (Origin -> Method -> What I Do -> Beliefs).
- Assim como na Home, falta a marcação semântica principal (`<main id="main-content">`).

**Portfólio (`/portfolio`)**
- O carregamento dinâmico do lado do cliente (`PortfolioClient`) e paginação no servidor estão fluídos.
- Funcionalidades de rotatividade e fallbacks configurados apropriadamente.
- A página sofre com a mesma ausência da landmark de `<main>`.
- **Inconsistência Visual:** Conforme documentado nos padrões, o sistema apresenta dívida técnica pois herda em alguns componentes (como `PortfolioHero`) mescla de estilos inline, CSS Modules (`PortfolioHeroGallery.module.css`) e Tailwind CSS, violando as regras estritas de estilização únicas via utilitários do framework.

**Admin (`/admin`)**
- Roteamento e layouts protegidos estão bem organizados.
- UI coesa para gerenciamento de mídia, assets, projetos e geração de landing pages.
- Nenhuma falha estrutural grave aparente, respeitando as fronteiras de autorização no client.

### 3️⃣ Lista de Problemas e Backlog Priorizado

*   🔴 **P0 (Crítico): Acessibilidade de Skip Link Quebrada.**
    *   **Problema:** O link oculto "Pular para o conteúdo" em `layout.tsx` tenta redirecionar para `#main-content`, mas nenhuma das páginas principais (`/`, `/sobre`, `/portfolio`) possui um elemento `<main id="main-content">` envolvendo o layout.
    *   **Impacto:** Quebra de navegação por teclado e possível violação dos requisitos de acessibilidade exigidos.
*   🟡 **P1 (Estrutural): Inconsistência de Estilização.**
    *   **Problema:** Uso simultâneo de CSS Modules (ex: `PortfolioHeroGallery.module.css`, `HomeHero.module.css`), inline styles e Tailwind na base, dificultando a manutenção do Design System (Ghost System).
    *   **Impacto:** Dificuldade na manutenção visual da arquitetura técnica (conforme detalhado na memória contextual).
*   🟢 **P2 (Polimento Rápido): Garantia de Altura Vertical em Cards Grid.**
    *   **Problema:** Cards alinhados no modo bento grid horizontal podem sofrer deslocamento se preenchimentos não forçarem flex-grow para alturas iguais.
    *   **Impacto:** Desalinhamento da interface e possível sensação de "quebra" em breakpoints específicos de tablet.

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Consertar Semântica do Main Content (Acessibilidade)**
> **Objetivo:** Adicionar `<main id="main-content">` nas rotas primárias para validar o link nativo "Pular para o conteúdo".
> **Arquivos:** `src/app/page.tsx`, `src/app/sobre/page.tsx`, `src/app/portfolio/page.tsx`.
> **Ações:** 
> 1. No `src/app/page.tsx`, envolver os componentes pós-JsonLd em `<main id="main-content" className="flex-1 w-full flex flex-col">`.
> 2. No `src/app/sobre/page.tsx`, alterar a `div` principal para `<main id="main-content" className="relative min-h-screen bg-background text-text">`.
> 3. No `src/app/portfolio/page.tsx`, envolver o `<PortfolioClient>` em `<main id="main-content" className="flex-1 w-full flex flex-col">`.
> **Regras:** Manter Mobile-first. Não modificar as lógicas internas e nem as props.
> **Critérios de Aceite:** [x] Elemento main criado e ID exato presente. [x] Teste Lighthouse Accessibility aprova o uso semântico da landmark main.

> **### 🛠️ Prompt #02 — Unificar Estilos do PortfolioHero**
> **Objetivo:** Eliminar o uso do `PortfolioHeroGallery.module.css` transacionando totalmente para Tailwind CSS com os tokens do Ghost Design System.
> **Arquivos:** Componentes de Hero de Portfólio (ex: `src/components/portfolio/PortfolioHeroNew.tsx` ou correlatos) e apagar o respectivo `.module.css`.
> **Ações:**
> 1. Analisar as classes aplicadas e converter diretamente para propriedades Tailwind equivalentes.
> 2. Utilizar as variáveis declaradas (ex: `--color-bluePrimary`) do GHOST-DESIGN-SYSTEM para assegurar fidelidade cromática e tipográfica.
> **Regras:** Não usar estilos inline salvo onde extremamente necessário dinamicamente. Proibido criar novos arquivos CSS.
> **Critérios de Aceite:** [x] Estilos idênticos ao live via inspeção no browser. [x] Arquivo CSS Module deletado do projeto.

> **### 🛠️ Prompt #03 — Consistência de Alturas nos Featured Projects**
> **Objetivo:** Corrigir grid de cards para preenchimento 100% horizontal e alinhamento de mesma altura vertical.
> **Arquivos:** `src/components/home/featured-projects/FeaturedProjectCard.tsx` e `FeaturedProjectsSection.tsx`.
> **Ações:**
> 1. Em `FeaturedProjectCard.tsx`, garantir que a div envolvente tenha `flex h-full flex-col min-h-full`.
> 2. Ajustar a tag de contexto do texto interno para usar `flex-grow` ou `mt-auto` caso fique muito distante da imagem.
> 3. Assegurar que no componente grid-pai, o Tailwind gere as linhas com alturas idênticas (ex: usando flex stretch nos itens ou `grid-rows`).
> **Regras:** Tailwind apenas, Mobile-first, testar resizes em telas médias e breakpoints do magazine style bento grid.
> **Critérios de Aceite:** [x] Dois cards lado a lado numa linha da grid (`col-span-5` e `col-span-7`) devem sempre finalizar alinhados no eixo inferior.

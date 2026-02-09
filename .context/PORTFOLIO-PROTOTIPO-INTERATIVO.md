# PORTFOLIO — PROTOTIPO INTERATIVO (AS-BUILT)

Versão: **5.0**  
Data: **2026-02-09**  
Status: **Sincronizado com código e runtime local (`/portfolio`)**

## 1. Objetivo da rota

A rota `/portfolio` entrega vitrine editorial de projetos com filtros, modal de detalhe e caminho de conversão para contato.

## 2. Fonte de verdade (implementação)

- Rota server: `src/app/portfolio/page.tsx`
- Cliente principal: `src/app/portfolio/PortfolioClient.tsx`
- Hero: `src/components/portfolio/PortfolioHeroNew.tsx`
- Galeria: `src/components/portfolio/ProjectsGallery.tsx`
- Modal: `src/components/portfolio/PortfolioModal.tsx`

## 3. Metadata real

Definida por `generateMetadata` em `src/app/portfolio/page.tsx`:

- `title/description` dinâmicos por query `?category=` (`branding|motion|web`)
- OG/Twitter/canonical configurados
- JSON-LD: `JsonLd pageType="portfolio"`

## 4. Estrutura real da página

Ordem efetiva renderizada em `PortfolioClient`:

1. Skip link interno (`Pular para os projetos`)
2. `PortfolioHeroNew`
3. `ProjectsGallery`
4. CTA seção (`vamos trabalhar juntos` -> `#contact`)
5. `ClientsBrandsSection`
6. `ContactSection`
7. `SiteFooter`
8. `PortfolioModal` (portal em `document.body`)

## 5. Dados e fallback (server)

`src/app/portfolio/page.tsx`:

- Busca projetos em Supabase (`listProjects`) quando envs existem.
- Mapeia com `mapDbProjectToPortfolioProject`.
- Se vazio/erro/env ausente, aplica fallback com `buildFallbackProjects()`.

Observação runtime local:

- Em ambiente local foram observados erros de relação no Supabase (`public_projects_view` x `landing_pages`), e a página entrou no fallback sem quebrar a renderização.

## 6. Hero (`PortfolioHeroNew`)

- H1 visual: `portfólio showcase`
- Vídeo dinâmico desktop/mobile por asset key.
- `prefers-reduced-motion`: substitui vídeo por poster estático.
- Overlay de contraste e glow atmosférico.

## 7. Galeria (`ProjectsGallery`)

### 7.1 Filtros

Pilares no topo (sticky):

- `Tudo`
- `Brand & Campaigns`
- `Videos & Motion`
- `Web & Tech`

### 7.2 Grid/composição

- Cards variam por padrão editorial (`sm|lg|wide`) com mapeamento por índice/layout.
- `useLERPScroll` é ativado apenas quando:
  - não é mobile (`>640px`)
  - reduced motion desativado

### 7.3 Card behavior

`ProjectCard`:

- Renderiza `button` com heading H3 e metadados.
- Para item identificado como Landing Page (`category/tag`) + `link`, abre URL externa.
- Caso contrário, delega abertura para modal/handler.

## 8. Modal (`PortfolioModal`)

- Renderização por estado local (não usa parallel routes).
- Acessibilidade implementada:
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-labelledby`
  - fechamento por `Esc`
  - focus trap por `Tab`
  - foco inicial no botão de fechar
  - restauração de foco para card de origem no close
- Conteúdo detalhado via `TypeAContent`/`TypeBContent` com `ErrorBoundary`.

## 9. CTA e fechamento

- CTA principal abaixo da galeria: `vamos trabalhar juntos` -> `#contact`
- Seções finais compartilhadas:
  - marcas
  - contato
  - footer

## 10. Motion (estado implementado)

Base predominante: `cubic-bezier(0.22, 1, 0.36, 1)`.

Comportamentos atuais:

- reveals com `opacity + y`
- filtros com underline animado
- hover sutil em cards (sem bounce)
- modal com backdrop/content variants
- `prefers-reduced-motion` aplicado em hero e cards

## 11. Acessibilidade implementada

- Skip link para `#portfolio-gallery`
- Cards focáveis com `focus-visible`
- Modal com dialog semântico e teclado
- CTA/links com estados de foco

## 12. Contrato de dados real (tipo)

Fonte: `src/types/project.ts` e mapper `src/lib/portfolio/project-mappers.ts`.

Campos relevantes no runtime:

- `id`, `slug`, `title`, `client`, `year`
- `category`, `displayCategory`, `tags`
- `image`, `imageLandscape`, `imageSquare`, `videoPreview`
- `type` (`A|B`)
- `layout` (`cols`, `size`, `sizes`, etc.)
- `landingPageSlug`, `link`
- `featuredOnHome`, `featuredOnPortfolio`

## 13. Prompt estruturado (referência rápida)

- Página: `/portfolio`
- Estrutura: Hero + Gallery filtrável + Modal stateful + CTA + Contact closure
- Requisitos: preservar fallback de dados, manter modal acessível com restore de foco, manter reduced-motion no hero/cards
- Navegação: manter CTA para `#contact` e suporte a `/projects/[slug]` quando houver `landingPageSlug`

# HOME — PROTOTIPO INTERATIVO (AS-BUILT)

Versão: **6.0**  
Data: **2026-02-09**  
Status: **Sincronizado com código e runtime local (`/`)**

## 1. Objetivo da rota

A Home (`/`) comunica posicionamento criativo e conduz o usuário para:

1. Manifesto visual (Hero + vídeo)
2. Navegação para portfólio
3. Conversão em contato

## 2. Fonte de verdade (implementação)

- Rota: `src/app/page.tsx`
- Layout global: `src/app/layout.tsx`
- Wrapper client (header/main): `src/components/layout/ClientLayout.tsx`
- Header: `src/components/layout/Header.tsx`

## 3. Metadata real

Definida em `src/app/page.tsx`:

- `title`: `Danilo Novais | Creative Developer`
- `description`: manifesto em PT-BR com foco em WebGL/R3F/Next.js
- OG/Twitter/canonical configurados
- JSON-LD na página: `JsonLd pageType="home"`

## 4. Estrutura real da página

Ordem efetiva renderizada:

1. Skip link global (`Pular para o conteúdo`) no `layout.tsx`
2. Header global (`SiteHeader`) via `ClientLayout`
3. `HomeHero`
4. `VideoManifesto`
5. `PortfolioShowcase`
6. `FeaturedProjectsRealtime`
7. `SiteClosure`:
   - `ClientsBrandsSection`
   - `ContactSection`
   - `SiteFooter`

## 5. Seções (comportamento atual)

### 5.1 Hero (`HomeHero`)

- `id="hero"`, fundo escuro `#040013`, viewport full.
- Preloader inicial (`Preloader`) com ~2s.
- Título visual com H1 apenas para leitores de tela (`HeroCopy`).
- CTA principal: `step inside` apontando para `/sobre` (`HeroCTA`).
- WebGL (`GhostSceneWrapper`) só quando:
  - WebGL suportado
  - motion gate não bloqueia
- Fallback visual: gradiente pulsante.

### 5.2 Video Manifesto (`VideoManifesto`)

- Lazy load por `IntersectionObserver`.
- Vídeo com `autoPlay`, `loop`, `playsInline`, `poster` derivado.
- Botão para ativar/desativar som (`muted` por padrão).
- Seleção de qualidade (`hd`/`sd`) por tipo de conexão.
- Usa `useReducedMotion` para simplificar transição.

### 5.3 Portfolio Showcase (`PortfolioShowcase`)

- Título: `portfólio showcase`.
- 3 stripes/categorias com links:
  - `/portfolio?category=branding`
  - `/portfolio?category=motion`
  - `/portfolio?category=web`
- CTA da seção: `let's build something great` -> `/#contact`.

### 5.4 Featured Projects (`FeaturedProjectsRealtime`)

- Busca inicial server-side em `src/app/page.tsx` (projetos com `featuredOnHome`).
- Atualização realtime no client via canal Supabase.
- Grid estilo bento com até 4 projetos + card CTA.
- Card pode:
  - abrir landing interna (`/projects/[slug]`), ou
  - abrir rota de detalhe (`/portfolio/[slug]`) quando aplicável.

### 5.5 Clients + Contact + Footer (`SiteClosure`)

- `ClientsBrandsSection`: 12 logos (asset dinâmico), heading H2.
- `ContactSection`:
  - `id="contact"`
  - telefone, e-mails, redes sociais
  - formulário com validação client-side e submit via FormSubmit AJAX
- `SiteFooter`:
  - links: home/sobre/portfólio/contato/privacidade
  - versão desktop fixa no rodapé e mobile em fluxo.

## 6. Navegação real

Fonte: `src/config/navigation.ts`

Header:

- `home` -> `/`
- `sobre` -> `/sobre`
- `portfólio` -> `/portfolio`
- `contato` -> `#contact`

## 7. Motion (estado implementado)

Base de easing usada no projeto: `cubic-bezier(0.22, 1, 0.36, 1)`.

Comportamentos encontrados na Home:

- Revelações com `opacity`, `blur`, `translateY`
- Hover com pequeno `translateY` em cards/ícones
- Transição de página global em `src/app/template.tsx` (`opacity + y`)
- `prefers-reduced-motion` aplicado em blocos relevantes (Hero, vídeo, grids)

Observação importante:

- Há animações fora do guideline rígido Ghost em pontos específicos (ex.: `scale/rotate` na entrada de `VideoManifesto` e `whileHover/whileTap` no botão do formulário de contato). Este documento descreve o estado real, não o estado ideal.

## 8. Acessibilidade implementada

- Skip link global para `#main-content`
- Estrutura semântica com `header`, `main`, `section`, `footer`
- H1 único efetivo na Home (sr-only no Hero)
- Foco visível em links e botões principais
- Modal não existe na Home; interações principais são links e formulário

## 9. Dados, realtime e fallbacks

- Projetos vêm de Supabase (`listProjects`) com fallback de erro para lista vazia no server.
- Featured realtime assina mudanças em:
  - `portfolio_projects`
  - `portfolio_project_tags`
- Assets de mídia usam resolução dinâmica (`site_assets`) com fallback.

## 10. Observações de runtime (localhost)

Validado em `http://localhost:3000/`:

- Estrutura e ordem das seções conferem com o código.
- CTA e links de categoria funcionam conforme esperado.
- Foram observados erros de console de ambiente/devtools e erros de relação Supabase em contexto local; a página permanece funcional com degradação controlada.

## 11. Prompt estruturado (referência rápida)

Use este bloco para evoluções futuras mantendo o estado atual como baseline:

- Página: Home `/`
- Stack: Next.js App Router + TypeScript + Tailwind + Framer Motion
- Seções obrigatórias: Hero, Video Manifesto, Portfolio Showcase, Featured Realtime, Clients, Contact, Footer
- CTA Hero: `step inside` -> `/sobre`
- CTA Showcase: `let's build something great` -> `/#contact`
- Requisitos: manter fallback de WebGL e mídia, manter skip link, preservar realtime de projetos destacados

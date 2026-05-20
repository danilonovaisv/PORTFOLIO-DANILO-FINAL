# 03-GALLERY

## 0. Estrutura de arquivos da sessão

- `src/components/portfolio/ProjectsGallery.tsx`
- `src/components/portfolio/ProjectsGallery.module.css`
- `src/hooks/useLERPScroll.ts`
- `src/hooks/useMotionGate.ts`
- `src/components/layout/Container.tsx`

## 1. Objetivo da sessão

Entregar galeria editorial filtrável com leitura por categorias e ritmo visual premium, mantendo fluidez no scroll.

## 2. Estrutura de conteúdo

- `section#portfolio-gallery`
- barra sticky de filtros
- filtro inicial padrão: `All Cases`
- categorias visíveis: `All Cases`, `Brand & Campaigns`, `Videos & Motions`, `Websites & Tech`
- grid de cards com padrão de tamanho
- CTA principal como último item do grid, após os cards visíveis e antes da paginação
- estado vazio por categoria

## 3. Identidade visual

- foco em grid denso, contraste alto, filtros discretos.
- sublinhado animado do filtro ativo com easing Ghost.

## 4. Interatividade e motion

- Framer Motion em filtro ativo e entrada dos cards.
- `All Cases` exibe todos os trabalhos sem segmentação.
- mudança de filtro sincroniza `category` na URL; `All Cases` remove o query param e mantém a rota canônica `/portfolio`.
- troca de filtro reseta a paginação para página 1.
- LERP scroll ativado apenas quando:
  - não mobile
  - motion permitido
  - mais de 6 itens
- Boa decisão para reduzir custo e distorções em listas curtas.

## 5. Responsividade

- mobile simplifica comportamento (sem LERP).
- sticky top ajustado por viewport.

## 6. Acessibilidade

- `h2` da seção e estado de foco visível nos cards.
- fallback textual quando não há projetos.

## 7. Considerações técnicas

- Pontos fortes:
  - gate de performance bem aplicado.
  - filtros claros e previsíveis.
- Riscos:
  - `position: fixed` no track exige testes constantes para evitar overlap com header/toolbar.
  - o CTA final faz parte do track da galeria; validar LERP e paginação juntos para evitar desconexão visual.

## 8. Inconformidades observadas

- Inconformidade baixa: revisar cobertura de navegação por teclado na mudança de filtro (manter foco contextual quando necessário).
- Atualização 2026-03-06: `PortfolioClient` passou a assinar `portfolio_projects` via realtime no browser client do Supabase e aciona `router.refresh()` após mutações vindas do admin, reduzindo defasagem visual da galeria pública.
- Atualização 2026-05-18: CTA principal "vamos trabalhar juntos" deixou de ser uma seção isolada em `PortfolioClient` e passou a renderizar como item final do grid em `ProjectsGallery`, centralizado e no fluxo antes da paginação.

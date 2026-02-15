# HOME-AUDIT

## Contexto de Auditoria
- Página alvo: `HOME` (`/`)
- Stack observada: Next.js App Router + React + TypeScript + Tailwind + Framer Motion + Lenis + Supabase (Realtime/Storage) + WebGL (R3F)
- Referências aplicadas:
  - `.context/GHOST-DESIGN-SYSTEM.md`
  - `.context/knowledge/Knowledge-Base-Supabase.json`
  - `.context/knowledge/Knowledge-Base-Firebase.json`
  - `.context/knowledge/knowledge_skills.json` (equivalente encontrado para `Knowledge-skills.json`)
  - `AGENT.md`
  - `.agent/MCPs-uteis.curated-config.json`
- Observação de consistência de contexto:
  - Não foi encontrado `.context/knowledge/Knowledge-Base-Antigravity.json`.
  - Não foi encontrado `.agent/prompt-structure.md` (foi identificado apenas `.agent/skills/prototype-prompt-generator/references/prompt-structure.md`).

---

# 01-HEADER

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/layout/Header.tsx`
  - `src/components/layout/header/SiteHeader.tsx`
  - `src/components/layout/header/DesktopFluidHeader.tsx`
  - `src/components/layout/header/DesktopFluidHeader.module.css`
  - `src/components/layout/header/MobileStaggeredMenu.tsx`
  - `src/components/layout/header/mobile/MobileHeaderBar.tsx`
  - `src/components/layout/header/mobile/MobileMenuPanel.tsx`
  - `src/components/layout/header/mobile/MobileMenuButton.tsx`
  - `src/config/navigation.ts`
- Dependências:
  - `next/navigation`, `next/image`, `next/link`
  - Framer Motion (`framer-motion`)
  - `useActiveSection`, `useMediaQuery`, `useMobileMenuAnimation`
  - R3F dinâmico no desktop (`HeaderGlassCanvas` via `dynamic(..., { ssr: false })`)
  - Assets dinâmicos (`useSiteAssetUrl`, `SITE_ASSET_KEYS`)
- Padrão arquitetural:
  - Header canônico com estratégia responsiva: desktop e mobile desacoplados.
  - Navegação dirigida por config (`NAVIGATION.header`) com roteamento e âncoras híbridas.
- Observações sobre coesão e acoplamento:
  - Boa coesão por dispositivo.
  - Acoplamento médio com camada de animação mobile (hook extenso) e com runtime de assets.

## 1. Objetivo da Página/Sessão
Garantir navegação global do portfólio com foco em transição fluida entre rotas e âncoras, mantendo identidade visual Ghost e suporte completo a desktop/mobile.

## 2. Estrutura de Conteúdo
- Headings:
  - Não possui heading próprio, atua como navegação global (`nav`).
- Hierarquia semântica:
  - `header` + `nav` corretamente presentes.
  - Links/botões de navegação com estado ativo visual.
- Textos principais:
  - Itens: `home`, `sobre`, `portfólio`, `contato`.
- CTA’s:
  - Navegação primária para rotas e anchor `#contact`.
- Fonts utilizadas:
  - Família global via `TT Norms Pro` (herdada de `globals.css`).
- Peso das fontes:
  - Itens com `font-medium`/`font-semibold` conforme estado.
- Tokens aplicados:
  - `bluePrimary`, `blueAccent`, `background` e efeitos glass.
- Densidade de informação:
  - Baixa, orientada à orientação do usuário.

## 3. Identidade Visual
- Cores aplicadas:
  - Fundo translúcido escuro + destaques em `#0048ff` e `#4fe6ff`.
- Gradientes:
  - Camada glass via WebGL (`HeaderGlassCanvas`) e fundo blur.
- Backgrounds:
  - Estado `headerDark`/`headerLight` com variações de opacidade e borda.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhado no uso de atmosfera escura + acentos elétricos.
- Uso de contraste:
  - Em geral adequado; estados inativos (`text-white/70`) ainda legíveis em fundo escuro.
- Coerência tipográfica:
  - Consistente com sistema global.

## 4. Interatividade & Animações
- Uso de Framer Motion:
  - Presente no mobile (`MobileHeaderBar`, painel e botões).
- Variants:
  - Header mobile entra com `y` e blur; menu panel possui transições de itens.
- Scroll animations:
  - Destaque de seção ativa via `useActiveSection`.
- Microinterações:
  - Underline animado desktop, hover e active states.
- Riscos de layout shift:
  - Baixo no desktop.
  - Médio no mobile por animações iniciais de entrada do header.
- Impacto em performance:
  - Moderado no desktop por canvas R3F no header.

## 5. Responsividade
- Desktop:
  - Header fixo com largura ampliada (`w-[calc(100%+5rem)]`).
- Tablet:
  - Comportamento mobile até `lg`.
- Mobile:
  - Menu fullscreen com foco trap e safe-area.
- Breakpoints:
  - Principal switch em `lg`.
- Grid/Flex:
  - Flex com container padrão (`std-grid`).
- Overflow:
  - Painel mobile cobre viewport inteira sem overflow lateral.
- CLS potencial:
  - Baixo a médio por animação de entrada do header mobile.

## 6. Acessibilidade & SEO
- Estrutura semântica:
  - `header`/`nav` corretos.
- ARIA:
  - `aria-label`, `aria-expanded` e `aria-hidden` aplicados.
- Alt em imagens:
  - Logo com `alt="Danilo"`.
- Navegação por teclado:
  - Foco visível configurado; foco trap no menu mobile.
- Contraste (WCAG):
  - Majoritariamente adequado.
- Heading structure:
  - Neutro (header sem heading próprio).
- Meta tags:
  - Não aplicável direto ao componente.
- SEO técnico:
  - Navegação limpa e indexável.

## 7. Integrações ou Recursos Especiais
- Firebase:
  - Não há uso direto na sessão.
- Supabase:
  - Asset runtime para logo (`useSiteAssetUrl`).
- APIs externas:
  - Links sociais externos.
- SSR/CSR:
  - Componente client-side.
- Lazy loading:
  - Canvas desktop carregado por import dinâmico (`ssr: false`).
- Suspense:
  - Não aplicado diretamente.

## 8. Considerações Técnicas
- Performance:
  - Ponto de atenção no canvas do header desktop.
- Bundle size:
  - Framer Motion + canvas no header elevam custo inicial.
- Code splitting:
  - Bom uso em `HeaderGlassCanvas`.
- Reusabilidade:
  - Alta por separação desktop/mobile.
- Testabilidade:
  - Média; lógica de menu poderia ter testes de a11y/foco dedicados.
- Escalabilidade:
  - Boa para crescimento de itens de navegação.
- Débito técnico:
  - Duplicação de estados/efeitos entre componentes mobile.
- Recomendações arquiteturais:
  - Extrair contrato de acessibilidade mobile (foco trap + ESC) para utilitário compartilhado.
  - Considerar fallback estático do header canvas em dispositivos com baixa capacidade gráfica.

---

# 02-HERO

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/home/hero/HomeHero.tsx`
  - `src/components/home/hero/HeroCopy.tsx`
  - `src/components/home/hero/HeroCopy.module.css`
  - `src/components/home/hero/HomeHero.module.css`
  - `src/components/home/hero/useHeroAnimation.ts`
  - `src/components/canvas/home/hero/GhostSceneWrapper` (importado)
  - `src/components/ui/Preloader.tsx`
  - `src/hooks/useMotionGate.ts`
  - `src/hooks/useReducedMotion.ts`
  - `src/config/content.ts` (`HOME_CONTENT.hero`)
  - `src/config/motion.ts`
- Dependências:
  - Framer Motion (`AnimatePresence`, `motion`, variants)
  - WebGL gating (`useWebGLSupport`)
  - Device gating (`useMediaQuery`)
- Padrão arquitetural:
  - Hero híbrido 2D + 3D com camadas de z-index estratificadas (texto sobre ambiente WebGL).
- Observações sobre coesão e acoplamento:
  - Coesão alta dentro do bloco hero.
  - Acoplamento médio com store global de experiência para motion gate.

## 1. Objetivo da Página/Sessão
Estabelecer a proposta editorial principal da HOME com impacto visual e assinatura Ghost: mensagem curta, ambiente imersivo e direção para continuidade da jornada.

## 2. Estrutura de Conteúdo
- Headings:
  - `h1` presente via `sr-only` em `HeroCopy` com título + subtítulo.
- Hierarquia semântica:
  - `section#hero` com `aria-label`.
- Textos principais:
  - Título: “Você não vê o design.”
  - Subtítulo: “Mas ele vê você.”
- CTA’s:
  - CTA principal no hero está separado do componente `HeroCopy`; `HeroCTA` existe, mas não está atualmente montado no `HomeHero`.
- Fonts utilizadas:
  - `font-display` e estilos globais de heading.
- Peso das fontes:
  - `900` no título principal; subtítulo médio.
- Tokens aplicados:
  - Cores e easing Ghost (`GHOST_EASE`, `MOTION_TOKENS`).
- Densidade de informação:
  - Baixa, orientada a manifesto.

## 3. Identidade Visual
- Cores aplicadas:
  - Base escura (`background`) com brilhos azul/ciano.
- Gradientes:
  - Fallback radial para mobile/reduced motion.
- Backgrounds:
  - WebGL no desktop quando suportado; fallback estático/gradiente em demais cenários.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Muito alinhado no visual.
- Uso de contraste:
  - Contraste do texto principal forte e legível.
- Coerência tipográfica:
  - Forte, com escala fluida e tracking editorial.

## 4. Interatividade & Animações
- Uso de Framer Motion:
  - Entrada de texto, preloader e transições de camadas.
- Variants:
  - `textContainerAnimation`, `itemAnimation` com blur + translateY.
- Scroll animations:
  - Hook `useHeroAnimation` disponível para progressão por scroll.
- Microinterações:
  - Aura e máscara ligados à posição do ghost 3D (`useGhostReveal`).
- Riscos de layout shift:
  - Baixo em estrutura, médio por preloader sobreposto e troca de estados.
- Impacto em performance:
  - Alto potencial por WebGL + efeitos blur + preloader.

## 5. Responsividade
- Desktop:
  - Hero full-screen com camada 3D ativa.
- Tablet:
  - Mantém versão 2D/3D conforme suporte e motion gate.
- Mobile:
  - Fallback gradiente e tipografia ajustada.
- Breakpoints:
  - Principal em `1024px` para comportamento desktop.
- Grid/Flex:
  - Alinhamento central vertical/horizontal.
- Overflow:
  - `overflow-hidden` evita scroll lateral.
- CLS potencial:
  - Baixo estruturalmente; atenção ao preloader que pode mascarar render inicial.

## 6. Acessibilidade & SEO
- Estrutura semântica:
  - `section` com identificação e `h1` invisível para leitores de tela.
- ARIA:
  - `aria-label` e texto descritivo adicional (`sr-only`).
- Alt em imagens:
  - Não aplicável direto ao hero (predominância visual/3D).
- Navegação por teclado:
  - Sem bloqueios diretos.
- Contraste (WCAG):
  - Adequado no texto principal.
- Heading structure:
  - `h1` existente, conforme esperado.
- Meta tags:
  - Cobertas no nível da página.
- SEO técnico:
  - Conteúdo textual principal presente no DOM.

## 7. Integrações ou Recursos Especiais
- Firebase:
  - Não há uso direto nesta seção.
- Supabase:
  - Indireto via configuração global de assets.
- APIs externas:
  - Não aplicável.
- SSR/CSR:
  - Hero client-side.
- Lazy loading:
  - WebGL condicionado por suporte e preferências de motion.
- Suspense:
  - Não utilizado diretamente.

## 8. Considerações Técnicas
- Performance:
  - Sessão mais custosa da HOME.
- Bundle size:
  - Incrementado por Framer Motion + dependências de canvas.
- Code splitting:
  - Parcial (canvas encapsulado, porém hero em si é client full).
- Reusabilidade:
  - Boa separação em módulos de copy/visual.
- Testabilidade:
  - Existe teste de regressão de hero (`HeroRegression.test.tsx`).
- Escalabilidade:
  - Boa para variações de conteúdo.
- Débito técnico:
  - `HeroCTA` implementado mas não conectado.
  - Parte das animações usa valores e padrões fora do limite estrito Ghost em componentes secundários (ex.: `scale` em preloader).
- Recomendações arquiteturais:
  - Reduzir custo inicial do hero em conexões lentas (degradação mais agressiva do WebGL).
  - Unificar governança de motion para eliminar uso residual de `scale` em UI de conteúdo.

---

# 03-VIDEO-MANIFESTO

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/home/hero/VideoManifesto.tsx`
  - `src/hooks/useRealtimeAssets.ts`
  - `src/config/site-assets.ts`
  - `src/lib/video.ts` (defaults de caption/poster)
- Dependências:
  - Framer Motion
  - IntersectionObserver
  - Realtime asset fetch/polling (Supabase)
- Padrão arquitetural:
  - Sessão de mídia lazy-loaded, com fallback e controle de áudio explícito.
- Observações sobre coesão e acoplamento:
  - Coesa em comportamento de vídeo.
  - Acoplamento médio com camada de assets em tempo real.

## 1. Objetivo da Página/Sessão
Apresentar reel audiovisual imediatamente após o hero para reforçar prova visual de qualidade e direcionar percepção de valor criativo.

## 2. Estrutura de Conteúdo
- Headings:
  - Não possui heading próprio.
- Hierarquia semântica:
  - `section.video-manifesto` com container de mídia.
- Textos principais:
  - Sem texto denso, foco em mídia.
- CTA’s:
  - Botão de som (acessibilidade + controle de mídia).
- Fonts utilizadas:
  - Não aplicável diretamente.
- Peso das fontes:
  - Não aplicável.
- Tokens aplicados:
  - Ghost easing em transição de entrada.
- Densidade de informação:
  - Baixa (mídia central).

## 3. Identidade Visual
- Cores aplicadas:
  - Overlay escuro sobre vídeo para legibilidade de controles.
- Gradientes:
  - Placeholder com gradiente quando vídeo ainda não carregou.
- Backgrounds:
  - Vídeo full-width com `aspect-video`.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhado (entrada suave, atmosfera escura).
- Uso de contraste:
  - Botão de som com contraste aceitável.
- Coerência tipográfica:
  - Neutro (sem tipografia protagonista).

## 4. Interatividade & Animações
- Uso de Framer Motion:
  - Reveal com `opacity + translateY + blur`.
- Variants:
  - Animação direta via props (`initial`/`whileInView`).
- Scroll animations:
  - Entrada ao atingir viewport.
- Microinterações:
  - Toggle de áudio com estado (`aria-pressed`).
- Riscos de layout shift:
  - Baixo (aspect ratio fixo).
- Impacto em performance:
  - Médio/alto por mídia de vídeo; mitigado por lazy load + preload metadata.

## 5. Responsividade
- Desktop:
  - Exibição ampla com qualidade de vídeo adaptável.
- Tablet:
  - Mantém proporção e comportamento.
- Mobile:
  - Carregamento sob demanda e controles touch.
- Breakpoints:
  - Responsividade nativa via CSS utilitário.
- Grid/Flex:
  - Bloco único full width.
- Overflow:
  - Controlado no wrapper.
- CLS potencial:
  - Baixo (reserva de espaço com `aspect-video`).

## 6. Acessibilidade & SEO
- Estrutura semântica:
  - `section` presente.
- ARIA:
  - `aria-label` no vídeo e controle com `aria-label`/`aria-pressed`.
- Alt em imagens:
  - Poster derivado do vídeo; sem `img` explícita.
- Navegação por teclado:
  - Botão acessível por teclado.
- Contraste (WCAG):
  - Bom no botão sobre overlay escuro.
- Heading structure:
  - Não impacta estrutura global, mas poderia ter `h2` para reforço semântico.
- Meta tags:
  - Schema de vídeo em `page.tsx` + `JsonLd`.
- SEO técnico:
  - Vídeo possui schema, porém há duplicação de `VideoObject` entre script inline e `JsonLd`.

## 7. Integrações ou Recursos Especiais
- Firebase:
  - Não usado.
- Supabase:
  - `useRealtimeAsset` para trocar source dinamicamente.
- APIs externas:
  - Não aplicável.
- SSR/CSR:
  - Client-side.
- Lazy loading:
  - Sim, via `IntersectionObserver`.
- Suspense:
  - Não aplicado.

## 8. Considerações Técnicas
- Performance:
  - Bom baseline para lazy media.
- Bundle size:
  - Moderado.
- Code splitting:
  - Não crítico para este componente.
- Reusabilidade:
  - Alta (componente genérico de manifesto).
- Testabilidade:
  - Média; recomendável teste E2E de áudio/erro de source.
- Escalabilidade:
  - Boa, suporta variantes SD/HD via metadata.
- Débito técnico:
  - Risco de fallback de poster inexistente (`replace('.mp4', '-poster.jpg')`).
- Recomendações arquiteturais:
  - Normalizar pipeline de poster explícito em metadata de asset.
  - Consolidar geração de schema para evitar duplicidade.

---

# 04-PORTFOLIO-SHOWCASE

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/home/portfolio-showcase/PortfolioShowcase.tsx`
  - `src/components/home/portfolio-showcase/CategoryStripe.tsx`
  - `src/components/ui/AntigravityCTA.tsx`
  - `src/lib/utils.ts` (`getAssetUrl`, `isVideo`)
  - `src/config/motion.ts`
- Dependências:
  - Framer Motion (`motion`, `useScroll`, `useSpring`, `useTransform`)
  - `next/image`, `next/link`
  - `lucide-react`
- Padrão arquitetural:
  - Seção editorial com stripes clicáveis e parallax sutil por item.
- Observações sobre coesão e acoplamento:
  - Alta coesão visual e de interação.
  - Acoplamento baixo/médio com utilitários globais de asset.

## 1. Objetivo da Página/Sessão
Atuar como hub de exploração do portfólio por categoria, com linguagem visual premium e caminho rápido para contato.

## 2. Estrutura de Conteúdo
- Headings:
  - `h2` principal: “portfólio showcase”.
- Hierarquia semântica:
  - `section` com header e lista visual de categorias.
- Textos principais:
  - Categorias: Brand & Campaigns, Videos & Motions, Websites & Tech.
- CTA’s:
  - CTA principal para `/#contact`.
- Fonts utilizadas:
  - Heading com peso forte e estilo editorial.
- Peso das fontes:
  - Variação entre light/normal/bold para contraste de palavras.
- Tokens aplicados:
  - Blue primary/accent, ghost easing.
- Densidade de informação:
  - Média (escaneável, focada em categorias).

## 3. Identidade Visual
- Cores aplicadas:
  - Texto branco/azul em fundo escuro.
- Gradientes:
  - Não predominante; foco em mídia de cards.
- Backgrounds:
  - `bg-background` consistente com sistema.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Forte alinhamento visual e de ritmo.
- Uso de contraste:
  - Bom contraste dos títulos.
- Coerência tipográfica:
  - Boa hierarquia e ritmo.

## 4. Interatividade & Animações
- Uso de Framer Motion:
  - Reveal de bloco e stripes, parallax por scroll na thumbnail.
- Variants:
  - Transições `opacity + y` com `GHOST_EASE`.
- Scroll animations:
  - `useScroll` + `useSpring` + `useTransform` no `CategoryStripe`.
- Microinterações:
  - Hover amplia thumbnail e altera cor da seta.
- Riscos de layout shift:
  - Baixo no desktop; largura animada da thumbnail é controlada.
- Impacto em performance:
  - Médio, especialmente com vídeo em thumbnail.

## 5. Responsividade
- Desktop:
  - Stripes com thumbnails animadas e alinhamento variável.
- Tablet:
  - Mantém estrutura simplificada.
- Mobile:
  - Versão compacta sem thumbnails (boa decisão de performance).
- Breakpoints:
  - Comutação explícita `lg`.
- Grid/Flex:
  - Lista vertical flexível com bordas divisórias.
- Overflow:
  - Controlado.
- CLS potencial:
  - Baixo.

## 6. Acessibilidade & SEO
- Estrutura semântica:
  - `section`, `header`, links navegáveis.
- ARIA:
  - `aria-labelledby` presente no título da seção.
- Alt em imagens:
  - `alt` derivado do título da categoria.
- Navegação por teclado:
  - Links com foco natural.
- Contraste (WCAG):
  - Adequado.
- Heading structure:
  - Boa presença de `h2`.
- Meta tags:
  - Não aplicável diretamente.
- SEO técnico:
  - Bom uso de links internos por categoria.

## 7. Integrações ou Recursos Especiais
- Firebase:
  - Não usado.
- Supabase:
  - Mídias servidas via URLs públicas.
- APIs externas:
  - Não aplicável.
- SSR/CSR:
  - Client-side.
- Lazy loading:
  - Imagens com lazy e `sizes`.
- Suspense:
  - Não aplicado.

## 8. Considerações Técnicas
- Performance:
  - Boa otimização mobile ao remover thumbnails.
- Bundle size:
  - Aceitável.
- Code splitting:
  - Não crítico aqui.
- Reusabilidade:
  - Boa granularidade entre container e item.
- Testabilidade:
  - Média (recomendável teste de navegação por categoria).
- Escalabilidade:
  - Boa para inclusão de novas categorias.
- Débito técnico:
  - Categorias hardcoded podem divergir de taxonomia real do banco.
- Recomendações arquiteturais:
  - Fonte de verdade única para categorias (config/banco) para evitar drift.

---

# 05-FEATURED-PROJECTS

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx`
  - `src/components/home/featured-projects/FeaturedProjectsSection.tsx`
  - `src/components/home/featured-projects/FeaturedProjectCard.tsx`
  - `src/components/home/featured-projects/CTAProjectCard.tsx`
  - `src/components/portfolio/PortfolioModal.tsx`
  - `src/lib/supabase/client.ts`
  - `src/lib/portfolio/project-mappers.ts`
- Dependências:
  - Supabase client/realtime + polling fallback
  - Framer Motion
  - Next Image/Link
- Padrão arquitetural:
  - Camada de dados em tempo real + camada de apresentação em grid bento.
- Observações sobre coesão e acoplamento:
  - Coesão alta por domínio.
  - Acoplamento médio com schema de dados e modal global de projeto.

## 1. Objetivo da Página/Sessão
Exibir projetos em destaque da HOME com atualização dinâmica e permitir exploração via landing page ou modal contextual.

## 2. Estrutura de Conteúdo
- Headings:
  - Cards usam `h3` por projeto.
  - A seção não possui heading visível (`h2`) próprio.
- Hierarquia semântica:
  - `section` com `aria-label`, grid de cards e CTA final.
- Textos principais:
  - Categoria, cliente/ano, título do projeto.
- CTA’s:
  - CTA card “Like what you see?”
  - Abertura modal ou navegação para case.
- Fonts utilizadas:
  - Fontes globais; títulos em escalas grandes.
- Peso das fontes:
  - `font-medium` e `font-normal` predominantes.
- Tokens aplicados:
  - Blue/purple no ícone circular e hover.
- Densidade de informação:
  - Média/alta (4 cards + CTA em layout bento).

## 3. Identidade Visual
- Cores aplicadas:
  - Fundo dark e cartões com superfícies translúcidas.
- Gradientes:
  - Glow radial no CTA card.
- Backgrounds:
  - Mídia (imagem/vídeo) ocupa card shell com overlay sutil.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Visual alinhado.
- Uso de contraste:
  - Bom em metadados e títulos, com atenção a opacidades baixas.
- Coerência tipográfica:
  - Consistente com padrão editorial.

## 4. Interatividade & Animações
- Uso de Framer Motion:
  - Stagger de cards + reveal.
- Variants:
  - `opacity + y + blur`.
- Scroll animations:
  - While-in-view do container.
- Microinterações:
  - Elevação no hover e círculo com seta.
- Riscos de layout shift:
  - Baixo se mídias tiverem proporções consistentes.
- Impacto em performance:
  - Médio por vídeos autoplay + atualização realtime/polling.

## 5. Responsividade
- Desktop:
  - Grid bento 12 colunas bem definido.
- Tablet:
  - Ajuste para 8 colunas.
- Mobile:
  - Coluna única (`col-span-4`).
- Breakpoints:
  - `md`/`lg` com spans fixos.
- Grid/Flex:
  - Grid consistente com shell de altura padronizada.
- Overflow:
  - Controlado por `card-shell`.
- CLS potencial:
  - Baixo, desde que a mídia mantenha aspect ratio esperado.

## 6. Acessibilidade & SEO
- Estrutura semântica:
  - `section` presente, mas ausência de heading próprio reduz legibilidade semântica.
- ARIA:
  - Cards associados por `aria-labelledby`.
- Alt em imagens:
  - Presentes e contextualizadas por projeto.
- Navegação por teclado:
  - Links e botões com foco visível.
- Contraste (WCAG):
  - Geralmente adequado.
- Heading structure:
  - Gap: sem `h2` da seção.
- Meta tags:
  - Não aplicável direto.
- SEO técnico:
  - Links internos para cases favorecem crawling.

## 7. Integrações ou Recursos Especiais
- Firebase:
  - Não utilizado diretamente.
- Supabase:
  - Query em `public_projects_view`, realtime channel + polling fallback (15s).
- APIs externas:
  - Não aplicável.
- SSR/CSR:
  - Híbrido: dados iniciais SSR em `page.tsx` + atualização client.
- Lazy loading:
  - Imagens lazy e vídeo com preload condicional.
- Suspense:
  - Não aplicado diretamente.

## 8. Considerações Técnicas
- Performance:
  - Polling periódico + realtime pode aumentar consumo em background.
- Bundle size:
  - Moderado.
- Code splitting:
  - Não crítico na seção.
- Reusabilidade:
  - Boa divisão entre seção, card e CTA card.
- Testabilidade:
  - Requer testes de integração para estados realtime/polling.
- Escalabilidade:
  - Boa para mais cards, com layout já parametrizado.
- Débito técnico:
  - Falta heading da seção.
  - Possível duplicidade de custo de atualização (polling + realtime simultâneo em cenários de erro/intermitência).
- Recomendações arquiteturais:
  - Adicionar `h2` semântico para seção.
  - Refinar estratégia de reconexão para reduzir custo em redes instáveis.

---

# 06-CLIENTS-BRANDS

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/home/clients/ClientsBrandsSection.tsx`
  - `src/components/ui/shared/DynamicAssetImage.tsx`
  - `src/config/content.ts` (`HOME_CONTENT.clients`)
  - `src/config/site-assets.ts` (`SITE_ASSET_KEYS.clients.strips`)
- Dependências:
  - Framer Motion
  - Runtime assets via Supabase
- Padrão arquitetural:
  - Bloco de credibilidade com grid de logos responsivo.
- Observações sobre coesão e acoplamento:
  - Coesão alta.
  - Acoplamento baixo/médio com sistema de assets em tempo real.

## 1. Objetivo da Página/Sessão
Reforçar prova social com marcas atendidas, sustentando confiança antes da conversão em contato.

## 2. Estrutura de Conteúdo
- Headings:
  - `h2`: “marcas com as quais já trabalhei”.
- Hierarquia semântica:
  - `section` + `ul/li` para logos.
- Textos principais:
  - Título da seção.
- CTA’s:
  - Não há CTA direto.
- Fonts utilizadas:
  - Escala de heading global.
- Peso das fontes:
  - `font-bold` no título.
- Tokens aplicados:
  - Fundo `bluePrimary` e logos invertidos.
- Densidade de informação:
  - Média (12 logos).

## 3. Identidade Visual
- Cores aplicadas:
  - Fundo azul sólido com logos em branco.
- Gradientes:
  - Não predominantes.
- Backgrounds:
  - Superfície plana para contraste dos logos.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhada por uso de `bluePrimary` como bloco de ruptura.
- Uso de contraste:
  - Alto contraste visual.
- Coerência tipográfica:
  - Consistente.

## 4. Interatividade & Animações
- Uso de Framer Motion:
  - Reveal do título e stagger dos itens.
- Variants:
  - `opacity + y + blur` por logo.
- Scroll animations:
  - Ativação on-view.
- Microinterações:
  - Hover sutil de logo (`opacity` e `translateY`).
- Riscos de layout shift:
  - Baixo.
- Impacto em performance:
  - Baixo/médio, dependendo de atualização de assets.

## 5. Responsividade
- Desktop:
  - 6 colunas.
- Tablet:
  - 4 colunas.
- Mobile:
  - 2 colunas.
- Breakpoints:
  - `sm`/`md`/`lg` definidos.
- Grid/Flex:
  - Grid consistente.
- Overflow:
  - Controlado.
- CLS potencial:
  - Baixo.

## 6. Acessibilidade & SEO
- Estrutura semântica:
  - Boa (`ul/li` com rótulo de lista).
- ARIA:
  - `aria-labelledby` e `aria-label` aplicados.
- Alt em imagens:
  - Presente, porém genérico (“Logo do cliente X”).
- Navegação por teclado:
  - Não há elementos interativos relevantes.
- Contraste (WCAG):
  - Forte.
- Heading structure:
  - Adequada.
- Meta tags:
  - Não aplicável direto.
- SEO técnico:
  - Neutro; seção mais voltada a confiança visual.

## 7. Integrações ou Recursos Especiais
- Firebase:
  - Não utilizado.
- Supabase:
  - Logos via `DynamicAssetImage` e `useRealtimeAsset`.
- APIs externas:
  - Não aplicável.
- SSR/CSR:
  - Client-side.
- Lazy loading:
  - Sim por `next/image` sem prioridade.
- Suspense:
  - Não aplicado.

## 8. Considerações Técnicas
- Performance:
  - Boa, com carga de imagens controlada.
- Bundle size:
  - Baixo impacto.
- Code splitting:
  - Não necessário.
- Reusabilidade:
  - Componente bem reutilizável para blocos de parceiros.
- Testabilidade:
  - Fácil snapshot/render.
- Escalabilidade:
  - Boa para expansão de logos.
- Débito técnico:
  - Alt text não descritivo por marca real.
- Recomendações arquiteturais:
  - Substituir alts genéricos por nome real da marca para acessibilidade e semântica.

---

# 07-CONTACT

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/home/contact/ContactSection.tsx`
  - `src/components/home/contact/ContactForm.tsx`
  - `src/components/home/contact/FormFields.tsx`
  - `src/config/navigation.ts` (`CONTACT_FORM`, `SOCIALS`)
  - `src/config/content.ts` (`HOME_CONTENT.contact`)
- Dependências:
  - Framer Motion
  - Form submission via FormSubmit (`formsubmit.co`)
  - Lucide icons
- Padrão arquitetural:
  - Layout split (informações + formulário), com priorização mobile.
- Observações sobre coesão e acoplamento:
  - Coeso e modular.
  - Acoplamento externo com endpoint FormSubmit.

## 1. Objetivo da Página/Sessão
Converter interesse em contato qualificado com múltiplos canais (telefone, email, redes sociais) e formulário de mensagem.

## 2. Estrutura de Conteúdo
- Headings:
  - `h2`: “contato”.
- Hierarquia semântica:
  - `section#contact` + bloco informacional + `form`.
- Textos principais:
  - Subtítulo de incentivo a colaboração.
- CTA’s:
  - Botão “Enviar Mensagem”.
- Fonts utilizadas:
  - Tipografia global, com pesos fortes em labels e heading.
- Peso das fontes:
  - Heading bold; labels uppercase bold.
- Tokens aplicados:
  - Fundo claro `backgroundLight` com acentos azuis.
- Densidade de informação:
  - Média/alta (dados de contato + formulário completo).

## 3. Identidade Visual
- Cores aplicadas:
  - Contraste claro/escuro com ênfase em azul.
- Gradientes:
  - Não relevantes.
- Backgrounds:
  - Sessão clara com card branco de formulário.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhada com blocos claros de conversão.
- Uso de contraste:
  - Bom no formulário e CTAs.
- Coerência tipográfica:
  - Adequada.

## 4. Interatividade & Animações
- Uso de Framer Motion:
  - Reveal da seção e do formulário.
- Variants:
  - Transições de entrada padrão.
- Scroll animations:
  - While-in-view.
- Microinterações:
  - Hover/active em links e botão de submit.
- Riscos de layout shift:
  - Baixo.
- Impacto em performance:
  - Baixo.

## 5. Responsividade
- Desktop:
  - Grid `5/7` com boa separação entre informação e form.
- Tablet:
  - Fluxo adaptável com empilhamento progressivo.
- Mobile:
  - Ordem otimizada: título > canais > formulário.
- Breakpoints:
  - `lg` para troca de layout.
- Grid/Flex:
  - Híbrido flex/grid bem definido.
- Overflow:
  - Controlado.
- CLS potencial:
  - Baixo.

## 6. Acessibilidade & SEO
- Estrutura semântica:
  - Boa estrutura de formulário, labels associadas (`htmlFor`).
- ARIA:
  - `aria-invalid`, `aria-describedby`, `aria-label` em ícones/links.
- Alt em imagens:
  - Não aplicável.
- Navegação por teclado:
  - Campos e botões navegáveis com foco visível.
- Contraste (WCAG):
  - Adequado na maioria dos elementos.
- Heading structure:
  - `h2` presente e coerente.
- Meta tags:
  - Não aplicável diretamente.
- SEO técnico:
  - Sessão de conversão não crítica para ranking, mas boa semântica ajuda crawlability.

## 7. Integrações ou Recursos Especiais
- Firebase:
  - Não utilizado.
- Supabase:
  - Não utilizado diretamente no envio do formulário.
- APIs externas:
  - `formsubmit.co` para envio de formulário.
- SSR/CSR:
  - Client-side.
- Lazy loading:
  - Não necessário.
- Suspense:
  - Não aplicado.

## 8. Considerações Técnicas
- Performance:
  - Seção leve.
- Bundle size:
  - Baixo impacto.
- Code splitting:
  - Não essencial.
- Reusabilidade:
  - Campos reutilizáveis via `FormFields`.
- Testabilidade:
  - Boa para testes de validação de formulário.
- Escalabilidade:
  - Boa; fácil extensão de campos.
- Débito técnico:
  - Animação do botão submit usa `whileHover` e `whileTap` com deslocamentos que podem divergir de regra Ghost estrita para conteúdo.
  - Dependência externa de FormSubmit limita observabilidade e controle de falhas.
- Recomendações arquiteturais:
  - Migrar envio para endpoint próprio (Next route handler/Firebase function/Supabase edge function) para governança completa.
  - Ajustar microanimações para conformidade total com regra “no bounce/scale/rotate” em conteúdo.

---

# 08-FOOTER

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/layout/SiteFooter.tsx`
  - `src/config/navigation.ts` (`NAVIGATION.footer`, `SOCIALS`)
- Dependências:
  - `next/link`, `lucide-react`
- Padrão arquitetural:
  - Rodapé dual-mode: fixo em desktop e estático em mobile.
- Observações sobre coesão e acoplamento:
  - Alta coesão, baixo acoplamento.

## 1. Objetivo da Página/Sessão
Encerrar jornada com navegação secundária, reforço de marca e atalhos para canais sociais.

## 2. Estrutura de Conteúdo
- Headings:
  - Não possui heading explícito.
- Hierarquia semântica:
  - `footer` + `nav` com links institucionais.
- Textos principais:
  - Copyright e links.
- CTA’s:
  - Links de navegação e redes.
- Fonts utilizadas:
  - Tipografia global com variação micro/uppercase.
- Peso das fontes:
  - `font-medium` e `font-bold` em links.
- Tokens aplicados:
  - Fundo azul `#0057FF` (próximo ao token primary).
- Densidade de informação:
  - Média.

## 3. Identidade Visual
- Cores aplicadas:
  - Fundo azul sólido com texto branco.
- Gradientes:
  - Não aplicável.
- Backgrounds:
  - Barra fixa no desktop.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhado à assinatura cromática.
- Uso de contraste:
  - Alto.
- Coerência tipográfica:
  - Boa.

## 4. Interatividade & Animações
- Uso de Framer Motion:
  - Não utiliza Framer Motion diretamente.
- Variants:
  - Não aplicável.
- Scroll animations:
  - Não aplicável.
- Microinterações:
  - Hover com underline e leve translate nos ícones.
- Riscos de layout shift:
  - Baixo.
- Impacto em performance:
  - Muito baixo.

## 5. Responsividade
- Desktop:
  - Footer fixo (`lg:fixed`) com altura estável.
- Tablet:
  - Mantém comportamento mobile até `lg`.
- Mobile:
  - Stack vertical com áreas de toque ampliadas.
- Breakpoints:
  - Switch em `lg`.
- Grid/Flex:
  - Flex adaptativo com wraps.
- Overflow:
  - Controlado.
- CLS potencial:
  - Baixo.

## 6. Acessibilidade & SEO
- Estrutura semântica:
  - `footer` e `nav` corretos.
- ARIA:
  - `aria-label` no footer/nav e links sociais.
- Alt em imagens:
  - Não aplicável.
- Navegação por teclado:
  - Links acessíveis.
- Contraste (WCAG):
  - Adequado.
- Heading structure:
  - Não possui heading, aceitável para footer.
- Meta tags:
  - Não aplicável.
- SEO técnico:
  - Links internos úteis para distribuição de crawl.

## 7. Integrações ou Recursos Especiais
- Firebase:
  - Não usado.
- Supabase:
  - Não usado direto.
- APIs externas:
  - Links sociais externos.
- SSR/CSR:
  - Componente de render simples.
- Lazy loading:
  - Não aplicável.
- Suspense:
  - Não aplicável.

## 8. Considerações Técnicas
- Performance:
  - Excelente.
- Bundle size:
  - Impacto mínimo.
- Code splitting:
  - Não necessário.
- Reusabilidade:
  - Alta.
- Testabilidade:
  - Alta.
- Escalabilidade:
  - Boa para adição de links sociais/institucionais.
- Débito técnico:
  - Nenhum crítico.
- Recomendações arquiteturais:
  - Padronizar token exato de azul com `--color-bluePrimary` para evitar discrepância entre `#0057FF` e `#0048ff`.

---

# 09-MODAL-ROOT

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/portfolio/PortfolioModal.tsx`
  - `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx`
  - `src/hooks/useBodyLock.ts`
  - `src/components/portfolio/modal/variants` (importado)
- Dependências:
  - Framer Motion + portal (`createPortal`)
- Padrão arquitetural:
  - Modal global controlado por estado local da seção de projetos.
- Observações sobre coesão e acoplamento:
  - Coeso para detalhes de projeto.
  - Acoplado ao formato de `PortfolioProject`.

## 1. Objetivo da Página/Sessão
Permitir aprofundamento de projeto sem sair da HOME, reduzindo fricção e mantendo contexto da navegação.

## 2. Estrutura de Conteúdo
- Headings:
  - `h2` invisível (`sr-only`) dentro do diálogo com título do projeto.
- Hierarquia semântica:
  - `role="dialog"`, `aria-modal="true"` e fechamento explícito.
- Textos principais:
  - Conteúdo dinâmico por tipo de projeto (Type A/Type B).
- CTA’s:
  - Botão fechar.
- Fonts utilizadas:
  - Herdadas do sistema global.
- Peso das fontes:
  - Varia por conteúdo interno do projeto.
- Tokens aplicados:
  - Fundo escuro, bordas sutis e blur.
- Densidade de informação:
  - Variável por projeto.

## 3. Identidade Visual
- Cores aplicadas:
  - Superfície escura com contraste alto.
- Gradientes:
  - Não predominante.
- Backgrounds:
  - Backdrop preto com blur.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Consistente com estética de profundidade.
- Uso de contraste:
  - Bom para conteúdo e botão fechar.
- Coerência tipográfica:
  - Consistente.

## 4. Interatividade & Animações
- Uso de Framer Motion:
  - Backdrop e container animados.
- Variants:
  - Controlados por `getBackdropVariants` e `getContainerVariants`.
- Scroll animations:
  - Scroll interno do conteúdo modal.
- Microinterações:
  - Fechamento por clique fora, ESC e botão.
- Riscos de layout shift:
  - Baixo.
- Impacto em performance:
  - Baixo/médio.

## 5. Responsividade
- Desktop:
  - Modal central com largura máxima `max-w-5xl`.
- Tablet:
  - Padding ajustado e altura dinâmica.
- Mobile:
  - Ocupa quase toda viewport com rolagem interna.
- Breakpoints:
  - `sm`/`md`/`lg` para padding/altura.
- Grid/Flex:
  - Centralização por flex.
- Overflow:
  - Conteúdo com `overflow-y-auto` e `overscroll-contain`.
- CLS potencial:
  - Baixo.

## 6. Acessibilidade & SEO
- Estrutura semântica:
  - Muito boa para diálogo acessível.
- ARIA:
  - Completa para modal.
- Alt em imagens:
  - Depende dos componentes internos Type A/Type B.
- Navegação por teclado:
  - Focus trap + foco inicial no botão fechar + ESC.
- Contraste (WCAG):
  - Adequado.
- Heading structure:
  - `h2` técnico presente.
- Meta tags:
  - Não aplicável.
- SEO técnico:
  - Modal não prejudica indexação principal.

## 7. Integrações ou Recursos Especiais
- Firebase:
  - Não usado.
- Supabase:
  - Dados chegam da seção de projetos destacada.
- APIs externas:
  - Não aplicável.
- SSR/CSR:
  - Renderizado no client via portal.
- Lazy loading:
  - Não explicitamente.
- Suspense:
  - Não aplicado.

## 8. Considerações Técnicas
- Performance:
  - Boa.
- Bundle size:
  - Moderado por dependências de conteúdo interno.
- Code splitting:
  - Melhorável via lazy dos tipos de conteúdo do modal.
- Reusabilidade:
  - Alta, pode ser reaproveitado em outras páginas.
- Testabilidade:
  - Boa para testes de acessibilidade e comportamento de foco.
- Escalabilidade:
  - Boa.
- Débito técnico:
  - Estado modal controlado em camada de seção; pode crescer em complexidade com mais gatilhos.
- Recomendações arquiteturais:
  - Considerar roteamento paralelo para modal compartilhável por URL quando necessário.

---

# ANÁLISE GLOBAL DA HOME

## Coerência entre sessões
- A HOME segue narrativa consistente: Header → Hero → Reel → Showcase → Featured Projects → Social Proof (Clients) → Conversão (Contact) → Footer.
- Encadeamento de intenção está claro e orientado à conversão.

## Consistência do Design System
- Forte aderência ao Ghost em paleta, atmosfera e ritmo visual.
- Inconsistências pontuais:
  - Uso residual de propriedades proibidas pelo Ghost em alguns pontos de UI (`scale` e microbounces).
  - Azul de footer (`#0057FF`) diferente do token principal (`#0048ff`).

## Problemas estruturais
- Estrutura semântica global contém problema crítico:
  - Há `main` aninhado e `id="main-content"` duplicado entre `src/app/layout.tsx` e `src/components/layout/ClientLayout.tsx`.
- Lacunas de heading:
  - Seção `Featured Projects` sem `h2` explícito.
- Governança de contexto:
  - Divergência de nomes em arquivos obrigatórios solicitados vs. arquivos existentes no projeto.

## Riscos de escalabilidade
- Custo cumulativo de runtime:
  - WebGL no hero + canvas no header desktop + polling/realtime em múltiplas camadas.
- Realtime/polling concorrentes podem elevar custo de rede em sessões longas.
- Dependência externa de formulário (FormSubmit) limita observabilidade operacional.

## Recomendações estratégicas
1. Corrigir semântica estrutural imediatamente:
- Remover duplicação de `main` e de `id="main-content"`.

2. Fechar conformidade Ghost Motion:
- Revisar componentes que usam `scale`, `rotate` e animações excessivas em conteúdo/UI.
- Centralizar validação de motion tokens em lint rule/checklist de PR.

3. Otimizar custo de render da HOME:
- Aplicar estratégia de degradação progressiva para canvas (hero/header) com heurística de device/performance.
- Priorizar fallback estático em hardware fraco.

4. Reforçar semântica e SEO on-page:
- Incluir `h2` explícito em `Featured Projects`.
- Evitar duplicação de `VideoObject` schema entre fontes JSON-LD.

5. Melhorar governança de conversão:
- Migrar envio de contato para endpoint controlado (Next/Firebase/Supabase) com logs, rate-limit e monitoramento.


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


## 9. Componentes Interativos

🎨 **Biblioteca de Componentes:**
| Componente | Descrição | Estados | Interações | Status |
|------------|-----------|---------|------------|--------|
| Botão CTA | CTA de continuidade para contato/portfólio | Default, Hover, Focus, Active | Navegação/anchor | Implementado |
| Modal | Detalhe de projeto em overlay com foco preso | Closed, Opening, Open, Closing | Abrir por card, fechar por Esc/backdrop | Implementado |
| Formulário | Não aplicável nesta sessão | N/A | N/A | Não se aplica |
| Slider | Não há slider clássico; há grid editorial responsivo | N/A | N/A | Não se aplica |
| Menu Mobile | Global via header | Closed/Open | Navegação global | Implementado (global) |

🔄 **Estados e Transições:**
- Hover: Cards destacam metadados e affordance de clique.
- Focus: Acesso por teclado em cards e CTA com foco visível.
- Loading: Skeleton/carregamento progressivo durante fetch de projetos.
- Error: Fallback de estado quando consulta falha.
- Success: Modal/roteamento de projeto inicia fluxo de exploração sem recarregar a página.

## 10. Estrutura de Páginas e Navegação
- Nó de navegação para detalhes de projetos em `/portfolio/[slug]` e modal contextual.
- Inclui CTA final para conversão no fluxo principal.

## 11. Informações Relevantes para Compreensão da Sessão
- Fonte dinâmica de dados com Supabase + fallback de polling para resiliência.
- A sessão é crítica para engajamento e deve manter INP sob controle em grids com animação.

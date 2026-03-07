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
  - Categorias quebradas sempre antes do `&`, em duas linhas.
  - Títulos com escala maior e peso light para reforçar leitura editorial no mobile.
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
  - Tipografia maior no mobile substitui densidade visual sem reintroduzir mídia pesada.
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

## 9. Componentes Interativos

🎨 **Biblioteca de Componentes:**
| Componente | Descrição | Estados | Interações | Status |
|------------|-----------|---------|------------|--------|
| Botão CTA | CTA “vamos trabalhar juntos” e ações secundárias de projeto | Default, Hover, Focus, Active | Anchor e navegação para projetos | Implementado |
| Modal | Abertura de detalhe de projeto (quando configurado) | Closed, Opening, Open, Closing | Click/Enter em card, Esc para fechar | Implementado |
| Formulário | Não aplicável nesta sessão | N/A | N/A | Não se aplica |
| Slider | Faixas/categorias com comportamento de movimento horizontal contextual | Idle, Moving | Scroll-driven transform | Parcial |
| Menu Mobile | Global via header | Closed/Open | Navegação global | Implementado (global) |

🔄 **Estados e Transições:**

- Hover: Cards e CTA com elevação/contraste sem scale agressivo.
- Focus: Cards acionáveis acessíveis por teclado.
- Loading: Assets de capa sob política lazy e priorização seletiva.
- Error: Fallback para placeholders quando asset dinâmico falhar.
- Success: Navegação para detalhe/modal sem quebra de contexto.

## 10. Estrutura de Páginas e Navegação

- Ponto de transição para aprofundamento em projetos e contato.
- Cards e CTAs orientam para `/portfolio`, detalhe de projeto e `#contact`.

## 11. Informações Relevantes para Compreensão da Sessão

- Referência de layout relacionada: `.context/PORTFOLIO-PAGE-LAYOUYT.jpg` (consistência visual).
- Parallax deve respeitar prefers-reduced-motion e limites de translate para preservar legibilidade.

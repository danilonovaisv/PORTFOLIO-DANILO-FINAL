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


## 9. Componentes Interativos

🎨 **Biblioteca de Componentes:**
| Componente | Descrição | Estados | Interações | Status |
|------------|-----------|---------|------------|--------|
| Botão CTA | Ação principal de conversão no hero | Default, Hover, Focus, Pressed | Scroll/roteamento para contato e portfólio | Implementado |
| Modal | Não aplicável nesta sessão | N/A | N/A | Não se aplica |
| Formulário | Não aplicável nesta sessão | N/A | N/A | Não se aplica |
| Slider | Não há slider dedicado no hero | N/A | N/A | Não se aplica |
| Menu Mobile | Consumido indiretamente via header global | Closed/Open | Acesso via topo | Implementado (global) |

🔄 **Estados e Transições:**
- Hover: CTAs e elementos interativos com realce de contraste e microtransição sutil.
- Focus: Ordem de tabulação prioriza conteúdo e CTA principal.
- Loading: Preloader e fallback de mídia até confirmação de recursos de animação.
- Error: Degradação para versão estática sem canvas/efeitos avançados.
- Success: Entrada do hero concluída sem shift; CTA pronto para ação.

## 10. Estrutura de Páginas e Navegação
- Conecta usuário ao fluxo de conversão via CTA para portfólio/contato.
- Opera como ponto inicial semântico da HOME (H1 principal).

## 11. Informações Relevantes para Compreensão da Sessão
- Referências visuais: `.context/HERO-PORTFOLIO-GHOST.jpg`, `.context/HERO.png`.
- A presença de preloader e gate de motion exige monitoramento de LCP e INP em mobile.

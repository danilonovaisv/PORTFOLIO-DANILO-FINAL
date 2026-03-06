# 📝 RELATÓRIO DE FIDELIDADE: HOME (PÁGINA PRINCIPAL)

## 🔍 ANÁLISE POR SESSÃO

### SESSÃO 01-HEADER
* STATUS: ⚠️ Desvio Visual / ❌ Crítico (Pendente Refatoração de Indicator e Glass)
* DIFERENÇAS ENCONTRADAS: A documentação exige uma "Fluid Glass Header" no desktop com um active state em formato de underline (usando `animate={{ scaleX: isActive ? 1 : 0 }}` e evitando `layoutId`). No mobile, o menu staggered precisa dominar a tela cheia.
* LAYOUT/UI: O componente `SiteHeader.tsx` possui a base, porém a alternância de cores em backgrounds claros (como a seção "Contato") precisa ser confirmada visualmente, garantindo o texto azul (`#0048ff`). O Z-index no desktop deve ser restrito a `z-40`.
* MOTION: Transições instantâneas proibidas; deve-se aplicar o `GHOST_EASE` definido no `motion.ts`. O link ativo deve escalar horizontalmente de seu centro para sinalizar estado.
* PROBLEMAS TÉCNICOS: O tracking excessivo do mouse (física de rebote/overshoot) no header fluído do Desktop quebra as regras de `prefers-reduced-motion` se não for tratado adequadamente.
* POSSÍVEL SOLUÇÃO: Assegurar no código de navegação a condicional `shouldReduceMotion` limitando o Header a um comportamento estático se a flag for disparada. Trocar lógicas dependentes de hover por validações ativas de rotas (client-side `motion.create(Link)`).

### SESSÃO 02-HERO
* STATUS: ✅ Fiel
* DIFERENÇAS ENCONTRADAS: A implementação do `HomeHero.tsx` e `HeroCopy.tsx` reflete o protótipo com alta fidelidade.
* LAYOUT/UI: O arranjo em Z-index (`z-[var(--z-layer-base)]`, `z-[var(--z-layer-content)]`, `z-[var(--z-layer-3d)]`, `z-[var(--z-layer-cta)]`) com `pointer-events-none` na camada 3D evita problemas de clique, seguindo à risca a especificação.
* MOTION: O código (`HeroCopy.tsx` e `motion.ts`) faz o uso correto de `GHOST_EASE` (`[0.22, 1, 0.36, 1]`) e respeita o threshold do eixo Y em exatos 18px (`MOTION_TOKENS.offset.standard`).
* PROBLEMAS TÉCNICOS: Fallbacks implementados com sucesso (Radial gradient vs WebGL).
* POSSÍVEL SOLUÇÃO: Não requer correções imediatas. Manter alinhamento e estrutura atuais.

### SESSÃO 03-VIDEO MANIFESTO
* STATUS: ⚠️ Desvio Visual / ❌ Pendência Técnica
* DIFERENÇAS ENCONTRADAS: A Documentação detalha o "Fullscreen Hold" (Scroll Y trava no Hero por 2 segundos ao alcançar tamanho total, som liga, e depois transita).
* LAYOUT/UI: No Desktop, o thumbnail nasce no "bottom-right" e expande `border-radius: 16px -> 0px` no scroll. No Mobile, isso não ocorre: vira seção nativa separada logo abaixo do Hero.
* MOTION: Necessita de State Machine (`thumbnail` -> `fullscreenHold` -> `released`) integrada ao scroll (`scrollYProgress` do Framer Motion). A implementação atual de `VideoManifesto.tsx` e `useRealtimeAsset` não cobre toda a lógica de retenção de Scroll e Unmute descrita no documento.
* PROBLEMAS TÉCNICOS: A lógica do áudio está passiva demais (deve desmutar automaticamente assim que atinge Fullscreen Desktop Hold).
* POSSÍVEL SOLUÇÃO: No arquivo responsável pela montagem do Manifesto dentro do Home, atrelar eventos do framer-motion (`useScroll`, `useTransform`) e travar o body `overflow` através de hook ou ref temporário enquanto o hold dos 2s estiver ativo. Adicionar a prop `posterUrl` correta para o fallback visual (conforme a memory guidelines).

### SESSÃO 04-PORTFOLIO SHOWCASE
* STATUS: ✅ Fiel
* DIFERENÇAS ENCONTRADAS: O `PortfolioShowcase.tsx` atende a todas as diretrizes de hierarquia e composição: Label flutuante, e três categorias.
* LAYOUT/UI: Alternância correta de alinhamento (`Brand` à direita, `Videos` centrado, `Tech` à esquerda). O inteligente sacrifício do GIF pesado por uma imagem WebP foi comentado no próprio arquivo para favorecer performance.
* MOTION: Aplica escalonamento via `viewportConfig` e esconde o "Thumbnail reveal" das labels em mobile. Efeito no botão centralizado "let's build something great →".
* PROBLEMAS TÉCNICOS: Sem problemas observados.
* POSSÍVEL SOLUÇÃO: Padrão aprovado. Apenas assegurar por testes reais que o Hover da Thumb pré-carrega rápido (`preload`).

### SESSÃO 05-FEATURED PROJECTS (BENTO GRID)
* STATUS: ✅ Fiel
* DIFERENÇAS ENCONTRADAS: Divisão coerente de módulos `FeaturedProjectCard` e `CTAProjectCard`. A arquitetura base segue o grid Bento Irregular (Desktop) e Vertical Stack (Mobile).
* LAYOUT/UI: Aspect Ratio e Gaps correspondem aos descritos.
* MOTION: O card hover translada levemente sem escalar o frame todo (`scale: 1.03` somente na imagem), combinando com `translateY: -1`.
* PROBLEMAS TÉCNICOS: Memórias do sistema alertam para mistura entre `posterUrl` e `thumbnailUrl`. Componentes devem acessar estritamente `posterUrl` para tags de imagem.
* POSSÍVEL SOLUÇÃO: Realizar refatoração varrendo a pasta `src/components/home/featured-projects` para checar se algum card de imagem está chamando `thumbnailUrl` (que normalmente aponta para vídeos).

---

## 🛠️ RESUMO DE AÇÕES PRIORITÁRIAS
1. **Vídeo Manifesto (Scroll-Hold e Áudio):** Adequar o component `VideoManifesto.tsx` ou seu wrapper ao comportamento do protótipo: prender scroll em Desktop por 2 segundos ao estourar Full Viewport, unmutar vídeo no Hold e devolver o scroll em seguida. Garantir design Mobile como bloco autônomo.
2. **Nav Active Indicator (Header):** Corrigir o sublinhado de aba ativa usando Framer Motion puro (`scaleX: isActive ? 1 : 0`), evitando bugs de layout dependentes de LayoutID ou hover. Testar a inversão de cores da Nav ao cruzar fundo branco.
3. **Auditoria de `posterUrl`:** Evitar bugs visuais checando em Featured Projects (Bento Grid) se as imagens dos cards estáticos puxam a variável `posterUrl` das tipagens do Supabase, evitando vazamento de chamadas de vídeo (`.mp4`) em tags `<img>`.

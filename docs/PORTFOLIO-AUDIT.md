# Auditoria Técnica e Plano de Melhorias do Ecossistema Front-End

Este documento apresenta uma auditoria detalhada "sob o capô" do portfólio institucional da Ghost Era, com foco estrito em engenharia de software, qualidade do código, animações e performance. Em conformidade com as diretrizes e constraints, **nenhuma alteração visual ou de layout está sendo proposta**, sendo as sugestões 100% voltadas para melhoria de desempenho, legibilidade, robustez e boas práticas arquiteturais.

---

## 1. Análise de Animações e Interações

As interações e transições do portfólio representam a assinatura de marca ("Ghost Era"). Elas utilizam uma combinação coordenada de WebGL procedural, animações declarativas CSS e sequenciamento via GSAP/Framer Motion.

### 1.1. Ghost 3D Hero Experience (WebGL / Three.js)
- **Localização:** `src/components/canvas/home/hero/`
- **Mecanismo:** Renderizado em Three.js puro (sem sobrecarga do React Three Fiber na thread de eventos), injetado via ref em uma div.
- **Geometria:** Uma `SphereGeometry(2, 40, 40)` cuja malha de vértices é deformada no carregamento por meio de um loop CPU iterando sobre a array de posições tridimensionais, adicionando ruído senoidal procedural (`Math.sin(x * 5) * 0.35 + Math.cos(z * 4) * 0.25...`).
- **Pós-processamento:** Executado via `EffectComposer` contendo uma passagem de renderização base (`RenderPass`), Bloom de brilho espectral (`UnrealBloomPass`), um shader personalizado de decaimento analógico (`ShaderPass` com `analogDecayShader`) e um pass de saída (`OutputPass`).
- **Timing & Easing:**
  - O movimento de flutuação vertical (`float`) é contínuo via onda senoidal (`Math.sin(time * floatSpeed * 1.5) * 0.03`).
  - O pulso de emissão do Bloom interpolado via LERP (`ghostMaterial.emissiveIntensity += (targetEmissive - intensity) * 0.08`).
  - A rotação e posição do fantasma seguem o movimento do cursor atenuado por LERP (`ghostGroup.position.x += (targetX - currentX) * followSpeed`).
- **Impacto de Performance:**
  - **Pontos Fortes:** O uso de Three.js puro minimiza renders desnecessários do ecossistema React. A detecção de hardware (`usePerformanceAdaptive`) rebaixa dinamicamente o DPR (de até 2.0 para 1.25 ou 1.0) e simplifica a contagem de partículas (de 50 para 25 ou 10) em celulares ou CPUs lentas (≤ 4 cores), aliviando o fill-rate.
  - **Pontos Fracos:** A deformação física da geometria é feita em CPU na inicialização. Embora seja apenas uma esfera, deformações dinâmicas por frame ou partículas complexas executadas na thread principal podem gerar gargalos de TBT (Total Blocking Time) em dispositivos de baixo custo.

### 1.2. Efeito de Revelação do Texto (Interactive 2D Masking)
- **Localização:** `src/components/home/hero/HeroCopy.tsx` e `src/hooks/useGhostReveal.ts`
- **Mecanismo:** O hook `useGhostReveal` captura a coordenada 3D world-space do fantasma, mapeia-a para percentual de tela (0-100%) no plano X/Y, e escreve as coordenadas dinamicamente no objeto `documentElement` do DOM como propriedades CSS personalizadas (`--ghost-x` e `--ghost-y`).
- **Mascara CSS:** Duas camadas de texto idênticas são renderizadas. A camada superior de alta luminosidade (com `text-shadow` e brilho neon) utiliza a propriedade `maskImage: radial-gradient(circle var(--ghost-radius)...)` posicionada em `var(--ghost-x)` e `var(--ghost-y)`.
- **Timing & Easing:** Atualização contínua via `requestAnimationFrame` garantindo sincronia perfeita com a taxa de atualização do monitor (Hz).
- **Impacto de Performance:** Excelente. A máscara é calculada diretamente pelo motor de renderização do navegador e a composição de layout é acelerada por GPU, sem forçar ciclos de repintura (reflows) no React.

### 1.3. Menu Lateral Responsivo (GSAP Mobile Menu)
- **Localização:** `src/hooks/useMobileMenuAnimation.ts`
- **Mecanismo:** Orquestração sequencial via GSAP.
- **Fluxo da Animação:**
  - **Fase 1 (Entrada das Membranas):** Deslize e fade das divs `.sm-prelayer` (`xPercent: 100` para `0`, `filter: blur(10px)` para `0`) staggered (atraso de `0.08s` por camada) usando a curva de easing característica `GSAP_GHOST_EASE` (`cubic-bezier(0.22, 1, 0.36, 1)`).
  - **Fase 2 (Painel Principal):** Exibição do painel central (`opacity: 1`, `xPercent: 0`) com duração de `0.8s`.
  - **Fase 3 (Itens de Navegação):** Entrada staggered (`0.06s`) dos links de navegação com deslocamento horizontal.
  - **Fase 4 (Botão Toggle & Textos):** Rotaciona os spans do botão plus em 45°/-45° para virar um fechar ("x"), enquanto rotaciona verticalmente o texto interno ("Menu" -> "Close") deslocando-o em `-50%` do seu eixo Y.
- **Impacto de Performance:** Executado via GSAP context para isolar instâncias de animações. Utiliza propriedades otimizadas por hardware (`xPercent` traduzido para `translate3d`). No entanto, o uso extensivo de `filter: blur()` nas transições móveis pode causar quedas momentâneas de frames por segundo (FPS) em GPUs móveis de baixo rendimento.

### 1.4. Manifesto e Crenças (`ManifestoScrollSection` / Sobre)
- **Localização:** `src/components/sobre/sections/ManifestoScrollSection.tsx`
- **Mecanismo:** Animações CSS puras acionadas por alteração de classe baseadas em hooks de timeout do React.
- **Timing & Easing:**
  - As frases são divididas em caracteres individuais. Cada caractere recebe um `animationDelay` inline incremental (`absoluteIdx * 30`ms).
  - Revelação (`charReveal`): dura `0.5s` com curva `cubic-bezier(0.2, 0.8, 0.2, 1)` aplicando opacidade, desfoque e translação vertical.
  - Saída (`charExit`): dura `0.35s` com curva `cubic-bezier(0.4, 0, 1, 1)` empurrando os caracteres para cima.
- **Acessibilidade:** Suporte completo ao `prefers-reduced-motion` via `@media` do CSS que desativa instantaneamente as transições, e uso de `aria-live="polite"` para anunciar a mudança de frase para leitores de tela.

### 1.5. Galeria de Projetos e LERP Scroll
- **Localização:** `src/components/portfolio/ProjectsGallery.tsx` e `src/hooks/useLERPScroll.ts`
- **Mecanismo:** Scroll horizontal/vertical suavizado por interpolação linear (factor `0.075`) que altera a posição absoluta do track apenas quando atinge a área visível.
- **Otimização:** Desativado em telas mobile ou se a galeria contiver menos de 6 projetos, evitando deformações em listas curtas.

---

## 2. Estrutura de Layout e Estilo

O ecossistema visual adota o Tailwind CSS v4 e uma folha de estilos estrutural contendo tokens de tipografia fluida e camadas de posicionamento rígidas.

### 2.1. Organização do Grid e Responsividade
- **Grid Padrão:** Implementado pela classe `.std-grid`, que atua como restritora de largura máxima e margem para as seções comuns do portfólio.
  - **Mobile:** `padding-left/right: 1.5rem` (24px).
  - **Tablet:** `padding-left/right: 3rem` (48px).
  - **Desktop:** `padding-left/right: 4rem` (64px) com `max-width: 1680px`.
- **Comportamento Breakpoints:** As adaptações responsivas ocorrem via classes nativas do Tailwind (`md:`, `lg:`) integradas a hooks React como `useMediaQuery` para controle fino de carregamento condicional (como a renderização do fantasma 3D que só ocorre em telas desktop).
- **Flexbox Scaffold:** O utilitário global `.flex > *, .inline-flex > * { min-width: 0; }` previne estouros de elementos flexíveis que poderiam causar quebras de layout horizontal inesperadas.

### 2.2. Tipografia Fluida (`clamp()`)
A escala tipográfica adota fórmulas matemáticas baseadas em `clamp()` para permitir uma transição orgânica e fluida entre dispositivos, dispensando redefinições pontuais por breakpoint:
- `font-display:` `clamp(2rem, 5vw, 4.5rem)` (32px a 72px)
- `font-h1:` `clamp(1.75rem, 4vw, 3.5rem)` (28px a 56px)
- `font-h2:` `clamp(1.25rem, 3vw, 2.5rem)` (20px a 40px)
- `font-body-mobile:` `clamp(1.25rem, 4.6vw, 1.375rem)` (Melhoria de contraste e legibilidade em dispositivos móveis)

### 2.3. Stacking Context (Layer Governance)
O projeto define uma rígida hierarquia de `z-index` baseada em tokens em `@theme` no `globals.css`. Essa centralização é crucial para evitar conflitos visuais e vazamento de camadas entre o Canvas WebGL, os textos da página e os overlays:
- `var(--z-layer-base)` = `0` (Vídeos de fundo, gradientes)
- `var(--z-layer-glass)` = `10` (Máscaras suaves, overlays de revelação)
- `var(--z-layer-content)` = `20` (Textos e mídias normais)
- `var(--z-layer-3d)` = `30` (Canvas R3F/Three.js - estrategicamente posicionado acima dos textos base, permitindo que o fantasma interaja por cima dos elementos, mas abaixo dos CTAs interativos)
- `var(--z-layer-cta)` = `40` (Botões flutuantes interativos)
- `var(--z-layer-overlay)` = `50` (Overlays internos)
- `var(--z-layer-header)` = `55` (Menu superior)
- `var(--z-layer-mobile-menu)` = `90` (Menu mobile fullscreen)
- `var(--z-layer-modal)` = `100` (Modais)
- `var(--z-layer-preloader)` = `1000` (Tela de carregamento)

---

## 3. Implementação Técnica e Execução do Código

A arquitetura do projeto está alinhada com as melhores práticas do ecossistema Next.js moderno (versão 16) e React 19.

### 3.1. Divisão de Componentes e Estrutura de Pastas
- **Arquitetura:** O projeto utiliza o Next.js App Router.
- **Divisão de Interatividade:** Separação explícita entre Server Components (ex: `/portfolio/page.tsx` que lida com pre-fetching de metadados, schemas JSON-LD e dados estáticos/Supabase) e Client Components (ex: `PortfolioClient.tsx` que gerencia modais, realtime subscriptions e renderização dinâmica).
- **Code Splitting:** Uso de `next/dynamic` para componentes pesados que não são exibidos no carregamento inicial (`ProjectsGallery` e `PortfolioModal`). Isso reduz significativamente o tamanho do bundle inicial e melhora a métrica LCP (Largest Contentful Paint).

### 3.2. Gerenciamento de Estado e Sincronização
- **Zustand:** Utilizado para o gerenciamento de estado leve e global.
- **Supabase Realtime:** O `PortfolioClient` assina atualizações do banco de dados na tabela `portfolio_projects` em ambiente de desenvolvimento. Ao detectar qualquer alteração, chama `router.refresh()` para invalidar o cache e re-renderizar os dados em tempo real no servidor, garantindo consistência sem recarregamento forçado do navegador.
- **Resiliência e Fallbacks:** Toda a rota `/portfolio` é envolvida em blocos `try/catch` robustos. Se as chaves do Supabase estiverem ausentes ou a rede falhar, o sistema ativa uma lista de projetos estáticos locais (`buildFallbackProjects()`), impedindo que a página caia em um erro 500.

### 3.3. Ciclo de Vida e Limpeza de Recursos (Garbage Collection 3D)
- O hook de cena `useGhostScene` e o componente `ShaderAnimation` possuem blocos de cleanup explícitos no retorno dos efeitos:
  - Iteração pela árvore do Three.js chamando `geometry.dispose()` e `material.dispose()`.
  - Remoção de event listeners de redimensionamento e scroll.
  - Liberação do renderizador com `renderer.dispose()` e do compositor com `composer.dispose()`.
  - Isso garante que a memória de GPU seja liberada imediatamente quando o usuário navega para fora da página, evitando vazamento de memória e travamentos em sessões prolongadas.

---

## 4. Plano de Melhorias (Task List)

Esta lista contém melhorias estritamente de engenharia e otimização de código, **sem qualquer alteração visual no layout atual**.

### 🛠️ Categoria A: Otimizações de Performance & WebGL
- [ ] **Mover deformação de vértices para GPU (Vertex Shader):** 
  - *Contexto:* Atualmente, a deformação da esfera do Ghost é feita no CPU iterando posições na inicialização em JavaScript. 
  - *Ação:* Reescrever essa lógica em um Custom Vertex Shader rodando diretamente na GPU. Isso reduz o tempo de bloqueio (TBT) na inicialização da página inicial.
- [ ] **Auditar e Otimizar Pós-processamento:**
  - *Contexto:* O `UnrealBloomPass` e o `ShaderPass` são executados a cada frame no desktop.
  - *Ação:* Avaliar se as passagens de renderização podem ser desativadas temporariamente quando o fantasma estiver estático ou fora da tela (usando a visibilidade do `IntersectionObserver` de forma mais agressiva).
- [ ] **Implementar cache de texturas e preloading otimizado:**
  - *Contexto:* Mídias 3D e vídeos podem atrasar a interatividade inicial se carregados concorrentemente.
  - *Ação:* Garantir o uso estrito de formatos compactados (ex: `.ktx2` para modelos 3D ou webp altamente compactados) e validar caminhos absolutos para o Supabase evitando redirecionamentos HTTP adicionais.

### 📁 Categoria B: Arquitetura & Qualidade de Código
- [ ] **Dividir componentes administrativos extensos (> 500 linhas):**
  - *Contexto:* Em conformidade com a regra de codificação da arquitetura, os arquivos `ProjectForm.tsx` (848 linhas) e `template-schema.ts` (886 linhas) excedem o limite saudável de 500 linhas.
  - *Ação:* Decompor esses arquivos em subcomponentes isolados e utilitários de validação separados na pasta `src/validations`.
- [ ] **Refatorar inline styles de animação em CSS dinâmico:**
  - *Contexto:* No `ManifestoScrollSection.tsx`, os atrasos dos caracteres são injetados em style inline (`style={{ animationDelay: ... }}`).
  - *Ação:* Criar classes de utilitário ou aplicar variáveis CSS dinâmicas para manter a marcação HTML 100% limpa de inline styles repetitivos.
- [ ] **Remover imports e exports mortos remanescentes (Knip Audit):**
  - *Contexto:* Limpar possíveis exportações não utilizadas para diminuir a árvore de importações e otimizar o Tree Shaking do Webpack.
  - *Ação:* Executar `pnpm run knip` e remover arquivos/funções mortas identificadas em `animated-backgrounds.ts` ou componentes órfãos.

### 🌐 Categoria C: Acessibilidade (WCAG / SEO)
- [ ] **Auditar foco do teclado em modais e menus:**
  - *Contexto:* Embora o trap de foco no modal do portfólio esteja funcional, precisamos garantir que o foco retorne exatamente para o card correspondente ao fechar o modal.
  - *Ação:* Validar e blindar a referência de retorno de foco em `PortfolioClient.tsx` (`lastFocusedRef`).
- [ ] **Melhorar semântica HTML em carrosséis:**
  - *Contexto:* No `ManifestoScrollSection`, as navegações utilizam botões sem identificação de status selecionado nativo do ARIA além das classes visuais.
  - *Ação:* Mapear atributos `aria-selected` e `aria-controls` nos dot buttons de forma correta e síncrona.

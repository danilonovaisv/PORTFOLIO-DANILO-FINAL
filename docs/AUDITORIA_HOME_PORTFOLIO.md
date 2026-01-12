 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.


// AuditReport.tsx
// Auditoria completa das páginas Home, Sobre e Portfolio + prompts para agente executor
// Ghost Design System v3.0 — portfoliodanilo.com

import React from "react";

/**
 * Relatório em Markdown seguindo o formato solicitado pelo usuário.
 * Use este conteúdo como fonte única de verdade para ajustes de layout/motion/WebGL.
 */
export const auditMarkdown = `
# 🔍 Auditoria HOME, SOBRE e PORTFOLIO  
Ghost Design System v3.0 — portfoliodanilo.com

---

## 1️⃣ Visão Geral

### Estado atual (produção + repositório)

- **Home (/)**  
  - Estrutura geral já segue a narrativa: Header → Hero Ghost → “portfólio showcase” → projetos em destaque → marcas → contato → footer.
  - **Header/Glass** e **Hero Ghost** já existem com WebGL/R3F e CTA "step inside", mas ainda não reproduzem com exatidão:
    - posição/escala do ghost em relação à headline
    - contraste e glow em relação à referência HERO-PORTFOLIO-GHOST
    - integração de z-index entre Header, Ghost e CTA.
  - **Portfolio Showcase (faixas)** e **Featured Projects** existem, porém:
    - grid/margens laterais variam entre seções
    - tipografia e espaçamentos não seguem exatamente os tokens/clamp do sistema
    - comportamentos de hover/motion ainda não refletem o motion “editorial silencioso” descrito.
  - **Clients/Brands, Contato e Footer** estão implementados, mas com:
    - variação de alinhamento lateral
    - diferenças entre mobile/desktop em relação às referências
    - footer fixo/comportamento diferente do especificado.

- **Sobre (/sobre)**  
  - A narrativa e o conteúdo estão presentes: Hero manifesto → blocos de origem → método → crenças/“ghost design” → fechamento → marcas → contato.
  - Porém:
    - Hero ainda não segue o novo **vídeo loop + texto alinhado à direita** com overlay controlado.
    - Sessão **Origem Criativa** é estática; não existe o **GSAP mask reveal pinned** com imagens à direita.
    - Sessões **O que eu faço**, **Como eu trabalho** e **O que me move** usam estrutura próxima, mas:
      - não têm o motion sequencial descrito (scroll-driven horizontal, parallax leve, frases rotativas, reveal final Ghost).
      - não respeitam 100% as regras mobile-first (títulos centralizados no mobile, ordering texto → mídia, etc.).
    - Ghost/IA em Sobre ainda não conversa visualmente com o Ghost da Home (coerência de linguagem).

- **Portfolio (/portfolio)**  
  - Página atual ainda é uma derivação da home, com:
    - hero estático com cards da Nestlé e ghost decorativo
    - grid de projetos em forma de mosaico/slider
  - O **Protótipo Interativo Portfolio Showcase v2.0 (video hero + parallax lerp + modal de projetos)** **não está implementado**:
    - sem Hero full-screen em vídeo loop
    - sem gallery com **Gallery Track fixo + Parallax Lerp**
    - sem PortfolioModal tipo A/B com timeline de animação
    - sem pausa do parallax durante o modal.

---

## 2️⃣ Diagnóstico por Dimensão

### Estrutura & Arquitetura

- App Router está configurado (\`src/app/page.tsx\`, \`src/app/sobre\`, \`src/app/portfolio\`, \`src/app/layout.tsx\`).
- Componentização existe (Header, HeroGhost, sections de home, contato, footer etc.), porém:
  - Ainda há **duplicação conceitual** entre home/portfolio/sobre (mesmos blocos reimplementados) em vez de componentes reutilizáveis com variações de layout.
  - Tokens de tipografia/spacing estão parcialmente no Tailwind, parcialmente hardcoded nos componentes.
  - WebGL Ghost está isolado em \`src/components/canvas/home/hero/Ghost.tsx\`, mas a orquestração com texto e CTA ainda não segue o “stack de z-index” e heurísticas da documentação Ghost.

### UI (tipografia, grid, cores)

- Tokens de cor estão coerentes (azul primário, fundo escuro, branco, textos secundários).
- Divergências mais claras:
  - **Tipografia**:
    - Nem todos os títulos usam \`clamp()\`/tokens (\`display\`, \`h1\`, \`h2\`, \`h3\`).
    - Escalas relativas entre h1/h2/body variam entre seções.
  - **Grid / margens laterais**:
    - Containers de cada seção usam larguras/paddings ligeiramente diferentes (ex.: Featured Projects vs Clients vs Contato), quebrando o “alinhamento duas laterais”.
  - **Ritmo vertical**:
    - Alguns blocos têm \`py\` muito maior/menor que os tokens (\`py-16 md:py-24\`) causando saltos visuais.

### UX

- Fluxo macro (Home → Portfolio Showcase → Featured → Sobre → Contato) está presente.
- Problemas:
  - Ghost Hero pode competir visualmente com texto/CTA em alguns breakpoints (glow muito intenso e centralizado).
  - Portfolio atual não oferece experiência de exploração contínua com parallax + modal (experiência esperada de “galeria editorial”).
  - Sobre ainda se comporta mais como landing do que como leitura editorial silenciosa (excesso de blocos similares, pouco contraste de ritmo entre seções).

### Fidelidade Visual (referências)

- **Home**: próxima, mas ainda não idêntica aos arquivos:
  - \`HOME-PORTFOLIO-BLACK---GHOST.jpg\`
  - \`HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg\`
- **Sobre**: conteúdo ok, motion/layout ainda divergentes de:
  - \`SOBRE-PORTFOLIO-BLACK---GHOST.jpg\`
  - \`SOBRE-MOBILE-BLACK---GHOST.jpg\`
- **Portfolio Showcase**: v2.0 parallax hero + modal **não implementado**.

### Responsividade mobile (mobile-first)

- Mobile tem suporte completo, mas com desvios:
  - Títulos nem sempre centralizados.
  - Alguns blocos mantêm grid pensado para desktop comprimido (ex.: cards de serviços na Sobre).
  - Canvas/WebGL Ghost ainda não reduz complexidade/DPR de forma agressiva em mobile (risco de performance).

### Alinhamento “duas laterais”

- Não está 100% consistente:
  - Cabeçalho/hero/portfólio showcase/featured/contato apresentam pequenas diferenças de margem lateral e largura de coluna, perceptíveis em scroll.
  - Em algumas transições de seção há um “salto” de coluna visível.

### Animações & Motion

- Framer Motion já é usado em alguns pontos (hero/home, CTA, seções).
- Ausentes:
  - Sequência canônica do **PortfolioModal** (backdrop → container → mídia → título → meta → secundário).
  - **Parallax Lerp** da galeria de portfolio.
  - **GSAP mask reveal** na Origem Criativa.
  - **Frases rotativas/manifesto final** em “O que me move”.
- Prefers-reduced-motion ainda não parece aplicado a todas as animações (principalmente GSAP/futuras).

### WebGL / 3D (Ghost)

- Ghost em Home atende parcialmente:
  - Canvas isolado, ghost segue cursor, glow presente.
- Pendências:
  - Ajuste milimétrico de posição/escala para coincidir com HERO-PORTFOLIO-GHOST.
  - Controle exato de camadas: texto sempre legível, CTA sempre no topo (\`z-35\`, ghost \`z-30\`).
  - Desligar follow mouse em touch + reduzir partículas / pós-processamento em mobile.
  - Fallback estático e respeito a \`prefers-reduced-motion\`.

### Performance

- Next.js + Tailwind + R3F bem usados, mas:
  - Ghost Canvas provavelmente ainda com DPR > 2 em alguns devices.
  - Manifesto vídeo e vídeos da página Sobre/Portfolio ainda sem lazy load + qualidade adaptativa em todos contextos.
  - Falta garantir orquestração do parallax lerp com \`requestAnimationFrame\` pausando quando não necessário.

### Acessibilidade

- Estrutura semântica geral é razoável (headings, seções).
- Pendências marcantes:
  - Modais de portfolio (quando existirem) precisam de foco gerenciado, \`role="dialog"\`, \`aria-modal\`.
  - Header mobile precisa de focus trap no menu aberto.
  - \`prefers-reduced-motion\` ainda não aplicado globalmente a animações de scroll/parallax.

---

## 3️⃣ Diagnóstico por Seção

Abaixo, cada seção auditada com o checklist obrigatório.

---

## 🎯 Seção: Header Global (Home / Sobre / Portfolio)

- 📌 Fidelidade visual (referência): ✗ — headers nas imagens desktop/mobile de todas as páginas
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/app/layout.tsx\`, \`src/components/layout/header/SiteHeader.tsx\`, \`src/components/layout/header/types.ts\`
- 🔗 Integrações: \`layout.tsx → SiteHeader → (GhostCanvas em HomeHero)\`

### ❌ Problema

1. **Desktop**  
   - Header em formato pill existe, mas:
     - largura, raio de borda e paddings não batem exatamente com a referência.
     - posição vertical (distância do topo) varia entre páginas e não respeita \`top: 24px\` + container centralizado.
   - Efeito “fluid glass” ainda não implementado ou não restrito ao desktop (cursor-follow, leve stretch).

2. **Mobile/Tablet**  
   - Header fixo em topo existe, mas:
     - menu hambúrguer/staggered overlay não reproduz o layout e animação descritos (full screen, itens grandes, stagger).
     - em alguns breakpoints tablet o header ainda tenta manter pill desktop comprimido.

3. **Integração com Hero**  
   - Z-index entre ghost/hero/header não segue a pilha explícita:
     - header precisa ficar em \`z-40\`, ghost em \`z-30\`, texto hero em \`z-20\`, CTA em \`z-35\`.
   - Em sobre/portfolio, o header não adapta contraste quando sobre seções claras (contato/rodapé).

### 🔧 Correção Técnica

- **O que mudar**
  - Centralizar a implementação do header em \`SiteHeader.tsx\` com dois modos:
    - \`DesktopFluidHeader\` (≥1024px) com fluid glass.
    - \`MobileStaggeredMenu\` (≤1023px) com overlay.
  - Ajustar paddings, border-radius, largura e comportamento sticky conforme especificações.

- **Onde mudar (arquivos)**
  - \`src/components/layout/header/SiteHeader.tsx\`
  - \`src/components/layout/header/types.ts\`
  - \`src/app/layout.tsx\` (incluir header sempre no topo do \`body\`)

- **Quais classes/props**
  - Usar Tailwind para pill desktop:
    - \`fixed\`, \`top-6\`, \`inset-x-0\`, \`mx-auto\`, \`max-w-[min(1680px,100%-3rem)]\`, \`rounded-full\`,
    - \`backdrop-blur-xl\`, \`bg-white/5\`, \`border border-white/10\`.
  - Mobile:
    - \`fixed top-0 inset-x-0 h-14 flex items-center justify-between px-4 z-40 bg-[#040013]/90\`.
  - Implementar variant prop \`mode="desktop" | "mobile"\` com \`useMediaQuery\` ou \`useEffect + window.matchMedia\`.

- **Critério de aceite**
  - Em screenshots comparativos (desktop e mobile), header deve encaixar pixel a pixel com as referências.
  - Efeito glass só ativo em desktop; no mobile, menu overlay fullscreen com staggered items.

### ✅ Resultado esperado

Header idêntico às imagens fornecidas, com pill estático em desktop, overlay staggered em mobile, alinhando sempre com as margens/colunas das seções de conteúdo abaixo.

---

## 🎯 Seção: Home — Hero Ghost + CTA

- 📌 Fidelidade visual (referência): ✗ — imagem HERO-PORTFOLIO-GHOST
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/home/hero/HomeHero.tsx\`, \`src/components/home/hero/HeroCTA.tsx\`, \`src/components/canvas/home/hero/Ghost.tsx\`, \`src/hooks/useReducedMotion.ts\`
- 🔗 Integrações: \`page.tsx → HomeHero → GhostCanvas + HeroCTA\`

### ❌ Problema

1. **Headline & Subheadline**
   - Textos existem, porém:
     - tokens tipográficos exatos (\`display\`, \`h1\`, \`h2\`) ainda não aplicados.
     - versão mobile não quebra exatamente em 3 linhas (“Você não” / “vê o” / “design.”) com fonte e tracking previstos.

2. **Ghost WebGL**
   - Posição/escala do ghost e do halo não coincidem com o lugar onde o glow encobre “Você não vê o design” na referência.
   - Movimento de seguir o mouse possivelmente ativo em mobile, gerando trabalho desnecessário e ruído.
   - DPR e quantidade de partículas/fireflies não adaptados agressivamente por device.

3. **Integração Z-Index / CTA**
   - CTA “step inside →” existe, mas:
     - não está garantido que esteja sempre acima do glow (\`z-35\`).
     - animação de entrada do bloco de texto (blur + scale + y) não segue a timeline única com easing \`[0.25, 0.46, 0.45, 0.94]\`.

### 🔧 Correção Técnica

- **O que mudar**
  - Refatorar \`HomeHero.tsx\` para:
    - usar os tokens de fonte via Tailwind (\`text-display\`, \`text-h1\`, \`text-h2\`),
    - separar versões Desktop vs Mobile das linhas.
  - Ajustar \`Ghost.tsx\` para:
    - posicionar ghost num eixo fixo (ex.: \`[x=-1,y=-0.2,z=0]\`) alinhado às referências,
    - limitar follow mouse a desktop (pointer fine),
    - reduzir DPR/partículas conforme config device.
  - Aplicar animação de entrada em \`HeroText\` com Framer Motion conforme snippet do documento.

- **Onde mudar**
  - \`src/components/home/hero/HomeHero.tsx\`
  - \`src/components/canvas/home/hero/Ghost.tsx\`
  - \`src/hooks/useReducedMotion.ts\`

- **Quais classes/props**
  - Mobile hero wrapper:
    - \`flex flex-col items-center text-center md:items-start md:text-left h-screen relative overflow-hidden\`.
  - Títulos:
    - Desktop: \`hidden md:block text-display font-black leading-[1.05]\`.
    - Mobile: \`md:hidden text-display font-black leading-[1.05]\`.
  - CTA:
    - base: \`mt-8\` + componente \`HeroCTA\` usando padrão do CTA global.

- **Critério de aceite**
  - Screenshot side-by-side mostra ghost, glow e texto sobrepostos exatamente como na imagem HERO-PORTFOLIO-GHOST.
  - Em mobile, ghost centralizado, follow desativado, animação apenas de flutuação.
  - FPS estável (scroll + idle) em devices medianos.

### ✅ Resultado esperado

Hero se torna a assinatura visual da home, com ghost posicionado milimetricamente, CTA legível e motion editorial controlado, sem ruídos em mobile.

---

## 🎯 Seção: Home — Vídeo Manifesto

- 📌 Fidelidade visual (referência): ✗ — especificação “VÍDEO MANIFESTO”
- 📐 Grid e margens laterais: ✗ (não ocupa 100vw/16:9 conforme descrito)
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/home/VideoManifesto.tsx\` (ou equivalente), \`src/app/page.tsx\`
- 🔗 Integrações: \`HomeHero → VideoManifesto → próximas seções\`

### ❌ Problema

- A sessão logo após o Hero atualmente é um mosaico/cards de vídeo, não um bloco **fullscreen 16:9 colado às bordas**.
- Não há:
  - fade-in único do vídeo/overlay,
  - botão de som persistente no canto,
  - lazy load + qualidade adaptativa (HD/SD) com \`navigator.connection\`,
  - auto-mute on leave section via IntersectionObserver.

### 🔧 Correção Técnica

- **O que mudar**
  - Criar/alinhar \`VideoManifesto.tsx\` exatamente como especificado no documento (já há código canônico pronto).
  - Substituir a sessão atual de “grade de vídeos” logo após Hero por este componente único.

- **Onde**
  - \`src/components/home/VideoManifesto.tsx\`
  - \`src/app/page.tsx\` (import e posicionamento)

- **Classes/props**
  - Wrapper: \`w-screen max-w-none mx-[calc(50%-50vw)]\` + \`aspect-video\`.
  - Animação Framer Motion:
    - \`initial={{ opacity: 0, scale: 0.95, y: 20 }}\`
    - \`whileInView={{ opacity: 1, scale: 1, y: 0 }}\`
    - \`transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}\`.

- **Critério de aceite**
  - Seção imediatamente abaixo do Hero é um único vídeo 16:9 colado às laterais, sem padding lateral de container.
  - Botão de som visível, mutando ao sair da seção.
  - Lazy loading e poster estático ok.

### ✅ Resultado esperado

Um único bloco de vídeo manifesto poderoso, limpo, sem competir com o ghost e alinhado ao grid global.

---

## 🎯 Seção: Home — Portfolio Showcase (3 faixas)

- 📌 Fidelidade visual (referência): ✗ — home desktop/mobile com \`portfólio showcase\`
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/home/PortfolioShowcaseStripes.tsx\` (nome ilustrativo), \`src/app/page.tsx\`
- 🔗 Integrações: \`Home → Portfolio Showcase → Featured Projects\`

### ❌ Problema

- A seção atual de “portfólio showcase” existe, mas:
  - Headline, label flutuante [what we love working on] e três faixas não obedecem 100%:
    - alinhamento alternado (1 direita, 2 centro, 3 esquerda),
    - revelação da thumbnail apenas em hover desktop,
    - ícone de seta com rotação \`-45deg → 0deg\`.
  - Em mobile:
    - não há a redução para “cards verticais full-width” com ícone de seta à direita e texto à esquerda,
    - label contextual é escondida, mas os paddings/margens laterais não seguem grid mobile.

### 🔧 Correção Técnica

- **O que mudar**
  - Reconstruir a seção como componente isolado seguindo o documento de Portfolio Showcase Home.
  - Desktop com 3 stripes interativas horizontais + hover reveal.
  - Mobile com cards verticais simples (sem hover) e CTA centralizada.

- **Onde**
  - \`src/components/home/portfolio/PortfolioShowcaseStripes.tsx\`
  - \`src/app/page.tsx\`

- **Classes básicas**
  - Container desktop: \`max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] py-16 md:py-24\`.
  - Headline: \`text-h2 font-bold text-center md:text-left\` com "portfólio" branco, "showcase" \`text-[#0048ff]\`.
  - Stripes: \`flex items-center justify-between border-y border-neutral/40 py-6 md:py-8 hover:bg-white/3 transition-colors\`.

- **Critério de aceite**
  - Comparação lado a lado mostra:
    - mesma posição de label flutuante,
    - títulos nas mesmas colunas,
    - ícones/bolhas de thumbnail idênticos.
  - Em mobile, fluxo exclusivamente vertical e touch-friendly.

### ✅ Resultado esperado

Seção editorial de categorias visualmente idêntica ao layout fundacional, servindo de ponte clara para o /portfolio completo.

---

## 🎯 Seção: Home — Featured Projects (Bento Grid)

- 📌 Fidelidade visual (referência): ✗ — bento grid descrito no protótipo
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✓ (os cards já empilham, mas com ajustes finos necessários)
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/home/featured/FeaturedProjects.tsx\`
- 🔗 Integrações: \`Home → Portfolio Showcase → Featured Projects → Clients\`

### ❌ Problema

- Grid de projetos em destaque existe, porém:
  - proporções dos cards (col-span, row-span) não seguem exato \`5/7/12/8/4\` de colunas.
  - CTA card final não está posicionado em \`md:col-span-4\` na última linha com contraste adequado.
- Animações de hover:
  - imagens não aplicam \`scale:1.03; translateY:-1\` com \`duration:500ms\`,
  - ícone seta não desliza 20px na horizontal em hover,
  - não há scroll reveal container + stagger nos cards.

### 🔧 Correção Técnica

- **O que mudar**
  - Ajustar bento grid para obedecer mapping exato do documento.
  - Implementar animações de hover e scroll reveal usando Framer Motion.

- **Onde**
  - \`src/components/home/featured/FeaturedProjects.tsx\`

- **Classes/props**
  - Grid wrapper: \`grid md:grid-cols-12 gap-6\`.
  - Row 1:
    - card1: \`md:col-span-5\`,
    - card2: \`md:col-span-7\`.
  - Row 2:
    - card3: \`md:col-span-12\`.
  - Row 3:
    - card4: \`md:col-span-8\`,
    - CTA: \`md:col-span-4\`.

- **Critério de aceite**
  - Layout dos 4 cards + CTA reproduz bento exato (tamanhos proporcionais, posicionamento).
  - Animações suaves confirmadas, respeitando \`prefers-reduced-motion\`.

### ✅ Resultado esperado

Grid editorial premium que reforça a curadoria, sem parecer um carrossel comum.

---

## 🎯 Seção: Clients / Brands (Home, Sobre, Portfolio)

- 📌 Fidelidade visual (referência): ✗ — barra azul + logos
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/common/ClientsBrands.tsx\` (ou similar)
- 🔗 Integrações: usado em Home, Sobre, Portfolio

### ❌ Problema

- A barra azul e grid de logos existem, porém:
  - colunas em mobile/desktop não correspondem aos tamanhos e espaçamentos definidos (2–3 colunas mobile, 6+ desktop).
  - logos não estão todos normalizados via \`filter: brightness(0) invert(1)\` (alguns podem vir coloridos).
  - não há scroll reveal com stagger controlado.

### 🔧 Correção Técnica

- **O que mudar**
  - Centralizar componente de logos seguindo especificação única.
  - Garantir responsividade das colunas e normalização de cor.

- **Onde**
  - \`src/components/sections/ClientsBrands.tsx\` (nome sugerido)
  - Pontos de uso: \`src/app/page.tsx\`, \`src/app/sobre/page.tsx\`, \`src/app/portfolio/page.tsx\`.

- **Critério de aceite**
  - Em qualquer página, a seção de marcas é idêntica visualmente.
  - Grid se adapta em 2–3 colunas mobile, 6+ em desktop conforme especificação.

---

## 🎯 Seção: Contato (Home, Sobre, Portfolio)

- 📌 Fidelidade visual (referência): ✗ — bloco claro + formulário
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/sections/ContactSection.tsx\`, \`src/validations/contact\`
- 🔗 Integrações: usada como âncora \`#contact\` em todas as páginas

### ❌ Problema

- Estrutura geral ok (informações + form + redes), mas:
  - no mobile, título/subtítulo nem sempre centralizados.
  - form não usa animação de entrada leve via Framer Motion (stagger inputs).
  - focus states e mensagens de erro/sucesso não estão 100% no padrão (pode não haver \`aria-describedby\`/mensagem atrelada).

### 🔧 Correção Técnica

- **O que mudar**
  - Unificar um único componente de contato compartilhado.
  - Ajustar alinhamento mobile (tudo centralizado).
  - Implementar scroll reveal leve e estados de foco/erro.

- **Critério de aceite**
  - Contato é idêntico visualmente em todas as páginas.
  - Fluxo de envio de formulário respeita FormSubmit.co e mostra feedback claro.

---

## 🎯 Seção: Footer

- 📌 Fidelidade visual (referência): ✗ — barra azul fixa em desktop, estática em mobile
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✓ (não há motion complexo exigido)
- 🧩 Componentes envolvidos: \`src/components/layout/SiteFooter.tsx\`
- 🔗 Integrações: \`layout.tsx → SiteFooter\`

### ❌ Problema

- Desktop:
  - footer nem sempre está fixo ao bottom com altura estável 48–64px.
  - pode competir visualmente com Contato quando ambas as áreas são azuis/brancas.
- Mobile:
  - em alguns breakpoints, footer ainda se comporta como fixo ou muito compacto; deveria ser bloco final estático, com \`py-10\`, links e sociais empilhados.

### 🔧 Correção Técnica

- **O que mudar**
  - Condicional de fixo apenas para \`lg+\`.
  - Mobile: remover \`fixed\`, usar fluxo normal.

- **Critério de aceite**
  - Desktop: footer sempre visível no fundo, sem sobrepor conteúdo.
  - Mobile: footer empilhado, sem comportamento fixo.

---

## 🎯 Seção: Sobre — Hero / Manifesto

- 📌 Fidelidade visual (referência): ✗ — HeroSobre.mp4 (desktop) / HeroSobreMobile.mp4 (mobile)
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/app/sobre/page.tsx\`, \`src/components/sobre/HeroSobre.tsx\`
- 🔗 Integrações: \`layout.tsx → SiteHeader\`, \`SobreHero → próxima sessão\`

### ❌ Problema

- Hero atual ainda usa imagem/combinação estática, não o vídeo loop oficial.
- Texto manifesto não está:
  - alinhado à direita acima do centro em desktop (colunas 7–12),
  - centralizado abaixo do vídeo em mobile, com overlay gradiente sutil.
- Não há motion linha a linha conforme timeline (0%/30%/60%/100%).

### 🔧 Correção Técnica

- **O que mudar**
  - Implementar componente HeroSobre com vídeo de fundo (desktop/mobile URLs distintos) e overlay.
  - Implementar animação do texto manifesto com Framer Motion (linha a linha, com delays).

- **Critério de aceite**
  - Hero em desktop: vídeo full-bleed, texto alinhado à direita, sem CTA.
  - Hero em mobile: vídeo 45–55vh, texto abaixo, centralizado, min 100vh total.

---

## 🎯 Seção: Sobre — Origem Criativa (Mask Reveal)

- 📌 Fidelidade visual (referência): ✗ — documento “Origem Criativa GSAP Mask Reveal”
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/sobre/OrigemCriativa.tsx\`
- 🔗 Integrações: \`SobreHero → OrigemCriativa → AboutWhatIDo\`

### ❌ Problema

- Seção estática (4 blocos texto+imagem empilhados).
- Não há pin da coluna direita com imagens, nem mask reveal por scroll.

### 🔧 Correção Técnica

- **O que mudar**
  - Implementar GSAP + ScrollTrigger + Lenis para:
    - pin da coluna de imagens à direita em desktop,
    - animação de \`clip-path: inset(0 0 100%) → inset(0)\` em cada imagem, em sequência, conforme scroll.
  - Mobile: layout intercalado texto → imagem, sem pin, com leve parallax de object-position.

- **Critério de aceite**
  - Em desktop, ao rolar, as imagens “sobem” dentro da máscara enquanto o texto à esquerda avança bloco a bloco.
  - Em mobile, cada bloco texto/imagem é lido em sequência vertical sem comportamento pegajoso.

---

## 🎯 Seção: Sobre — O que eu faço (AboutWhatIDo)

- 📌 Fidelidade visual (referência): ✗
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/sobre/AboutWhatIDo.tsx\`
- 🔗 Integrações: \`OrigemCriativa → AboutWhatIDo → AboutMethod\`

### ❌ Problema

- Cards/barras de capabilities não seguem o motion horizontal guiado por scroll (referência CodePen).
- Layout desktop não usa uma única linha horizontal de 7 blocos entrando da direita.
- Mobile não tem barras simples com animação de entrada leve.

### 🔧 Correção Técnica

- **O que mudar**
  - Implementar AboutWhatIDo com:
    - Desktop: \`flex-row\` sem wrap, 7 blocos azuis, animados via Framer Motion/GSAP \`translateX: 120vw → 0\`.
    - Mobile: pilha vertical dos 7 itens, com animação viewport-based \`x:80px→0\`, staggered.

- **Critério de aceite**
  - Em desktop, scroll da sessão faz os blocos entrarem da direita para a esquerda de forma progressiva e silenciosa.
  - Em mobile, cada barra aparece ao entrar na viewport.

---

## 🎯 Seção: Sobre — Como eu trabalho (About Method)

- 📌 Fidelidade visual (referência): ✗ — vídeos AboutMethod / aboutmetodo-mob
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/sobre/AboutMethod.tsx\`
- 🔗 Integrações: \`AboutWhatIDo → AboutMethod → OQueMeMove\`

### ❌ Problema

- Seção atual não utiliza vídeo abstrato de IA full-bleed como background.
- Cards de processo existem, mas sem overlay/gradiente ajustado e animações de entrada definidas.

### 🔧 Correção Técnica

- **O que mudar**
  - Desktop:
    - Vídeo \`AboutMethod.mp4\` como background com overlay \`linear-gradient(90deg, rgba(10,10,20,0.85), rgba(10,10,20,0.4))\`.
    - Conteúdo texto em colunas 2–7, cards com borda esquerda \`border-l-4 border-bluePrimary\`.
  - Mobile:
    - Vídeo \`aboutmetodo-mob.mp4\` sem overlay global; overlay apenas abaixo via gradiente no fim.
    - Conteúdo centralizado sobre fundo escuro.

- **Critério de aceite**
  - Em desktop, título “Criatividade com método.” e lista 01–06 aparecem sobre área escurecida à esquerda, vídeo respirando à direita.
  - Em mobile, vídeo ocupa topo da seção e o texto começa no meio para baixo.

---

## 🎯 Seção: Sobre — O que me move (Ghost Design)

- 📌 Fidelidade visual (referência): ✗
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: \`src/components/sobre/OQueMeMove.tsx\`
- 🔗 Integrações: \`AboutMethod → OQueMeMove → Closing → Clients\`

### ❌ Problema

- Título manifesto, frases rotativas e reveal final “ISSO É GHOST DESIGN” com ghost não seguem a timeline temporal (~25s total).
- Atual implementação provavelmente mostra tudo de uma vez (sem fases).

### 🔧 Correção Técnica

- **O que mudar**
  - Implementar máquina de estados/timeline (Framer Motion + \`useState\`/\`useEffect\` ou GSAP) para:
    - Fase 1: título fixo entra (fade + blur).
    - Fase 2: frases rotativas 1–6 com entrada/saída controladas (\`opacity/y\`).
    - Fase 3: reveal final com ghost + texto “ISSO É GHOST DESIGN”.

- **Critério de aceite**
  - Ao rolar até a seção e permanecer nela, o usuário vê a sequência completa sem loops infinitos.
  - Em \`prefers-reduced-motion: reduce\`, frases aparecem sem transições complexas (apenas fade curto).

---

## 🎯 Seção: Portfolio Showcase Page (/portfolio)

- 📌 Fidelidade visual (referência): ✗ — Protótipo Interativo v2.0
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos:  
  - \`src/app/portfolio/page.tsx\`  
  - \`src/components/portfolio/PortfolioShowcase.tsx\`  
  - \`src/components/portfolio/HeroVideo.tsx\`  
  - \`src/components/portfolio/ProjectsGallery.tsx\`  
  - \`src/components/portfolio/ProjectCard.tsx\`  
  - \`src/components/portfolio/PortfolioModal.tsx\`  
  - \`src/hooks/useParallax.ts\`, \`src/hooks/useBodyLock.ts\`

- 🔗 Integrações: \`layout.tsx → SiteHeader → PortfolioShowcase → Clients → Contact → Footer\`

### ❌ Problema

- Página atual não implementa:
  - Hero de vídeo looping com texto “portfólio showcase” sobreposto.
  - Gallery Parallax Lerp com track fixo + cards com parallax interno.
  - Modal de projeto tipos A/B com timeline canônica.

### 🔧 Correção Técnica

- **O que mudar**
  - Implementar exatamente o protótipo v2.0:
    - HeroSection com vídeos desktop/mobile.
    - ProjectsGallery com track fixo, altura dinâmica, parallax lerp.
    - PortfolioModal com backdrops, animação de entrada/saída e bloqueio de scroll.

- **Critério de aceite**
  - Página \`/portfolio\` se comporta como galeria editorial com scroll suave e modal de projeto, não mais como home estendida.
  - 60fps durante scroll em máquinas medianas, sem scroll hijacking.

---

## 4️⃣ Lista de Problemas (com severidade)

### 🔴 Alta

1. **Página /portfolio não segue o Protótipo Interativo v2.0** (hero vídeo, parallax lerp, modal A/B inexistentes).
2. **Sobre — Origem Criativa sem GSAP Mask Reveal** (perde diferencial editorial + demonstração técnica).
3. **Sobre — O que me move sem timeline de frases + reveal final Ghost**.
4. **Ghost Hero Home sem aderência milimétrica ao HERO-PORTFOLIO-GHOST** (posição/escala/glow e z-index).
5. **Header global inconsistentemente alinhado e sem fluid glass desktop + staggered menu mobile**.
6. **About Method sem vídeo de fundo/overlay correto**.

### 🟡 Média

7. **Portfolio Showcase (Home) com stripes e label não exatamente como especificado**.
8. **Featured Projects Bento Grid desproporcional e sem motion completo.**
9. **Clients/Brands sem grid responsivo e normalização visual idêntica.**
10. **Contato sem alinhamento central mobile e microinterações de foco/erro.**
11. **Footer com comportamento fixo incorreto em mobile/tablet.**

### 🟢 Baixa

12. **Inconsistência de tokens tipográficos (clamp) e spacing entre seções.**
13. **Prefers-reduced-motion não aplicado de forma global.**
14. **DPR/partículas no Ghost possivelmente acima do necessário em mobile.**

---

## 5️⃣ Recomendações Prioritárias (ordem de execução)

1. **Infraestrutura de layout & tokens** (baixa fricção, alto impacto global)  
   - Consolidar tipografia \`clamp()\` e espaçamentos globais em \`tailwind.config.ts\` + utilities.

2. **Header + Hero Ghost (Home)**  
   - Corrigir header global e alinhamento Ghost/CTA primeiro, pois são a “assinatura visual” do site.

3. **Página Portfolio (/portfolio)**  
   - Implementar Hero vídeo + Parallax Lerp + Modal, pois é o principal destino de trabalho do usuário.

4. **Sobre — Hero + Origem Criativa + Method + O que me move**  
   - Reimplementar motion e vídeo; fortalece o argumento editorial e a narrativa da marca.

5. **Shared sections (Clients/Brands, Contato, Footer)**  
   - Unificar componentes e alinhar com grid/tokens, garantindo consistência cross-page.

6. **Refino Ghost WebGL e prefers-reduced-motion**  
   - Ajustar performance e acessibilidade depois dos blocos estruturais.

---

## 🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR

Abaixo, prompts atômicos (um problema por prompt), formatados para execução direta.

---

### 🛠️ Prompt #01 — Normalizar Header Global (Desktop + Mobile)

**Objetivo**

- Tornar o header visualmente idêntico às referências desktop/mobile e consistente em todas as páginas.

**Arquivos/Rotas envolvidas**

- \`src/app/layout.tsx\`
- \`src/components/layout/header/SiteHeader.tsx\`
- \`src/components/layout/header/types.ts\`

**Ações**

1. Implementar dois modos no \`SiteHeader\`: \`DesktopFluidHeader\` (≥1024px) e \`MobileStaggeredMenu\` (≤1023px).
2. Ajustar layout desktop para um pill centralizado com \`top-6\`, \`max-w-[min(1680px,100%-3rem)]\`, \`rounded-full\`, \`backdrop-blur-xl\`, \`bg-white/5\`, \`border border-white/10\`.
3. Implementar menu mobile fixo \`top-0 inset-x-0 h-14 flex items-center justify-between px-4 bg-[#040013]/90 z-40\` com overlay full-screen e animação staggered nos links.
4. Garantir que o header use o mesmo componente em \`layout.tsx\` para Home, Sobre e Portfolio.
5. Ajustar estados de link ativo (\`home\`, \`sobre\`, \`portfólio showcase\`, \`contato\`) para refletir a rota atual com cor \`bluePrimary\`.

**Regras**

- ❌ Não alterar textos.
- ❌ Não inventar novo layout.
- ✅ Tailwind + App Router.
- ✅ Mobile-first.
- ✅ Comparar com: referências de header nos arquivos HOME/SOBRE/PORTFOLIO.

**Critérios de aceite (Checklist)**

- [ ] Pill desktop com dimensões/posição idênticas às imagens.
- [ ] Menu mobile full-screen com overlay e staggered items.
- [ ] Mesmo header em todas as páginas.
- [ ] Links ativos com cor correta.
- [ ] Nenhum regression em z-index vs hero/ghost.

---

### 🛠️ Prompt #02 — Ajustar Hero Ghost (Home) à Referência

**Objetivo**

- Alinhar completamente posição, escala e glow do Ghost + headline + CTA ao layout HERO-PORTFOLIO-GHOST.

**Arquivos/Rotas envolvidas**

- \`src/components/home/hero/HomeHero.tsx\`
- \`src/components/canvas/home/hero/Ghost.tsx\`
- \`src/hooks/useReducedMotion.ts\`

**Ações**

1. Aplicar tokens de tipografia via Tailwind: \`text-display\` para o h1, \`text-h2\` para o subtítulo.
2. Separar variantes desktop/mobile das linhas do h1 conforme especificação (\`Você não vê\` / \`o design.\` e 3 linhas em mobile).
3. Ajustar posição base do Ghost (ex.: position \`[-1, -0.2, 0]\`) e tamanho do halo, alinhando na tela para cobrir o centro do texto exatamente como a referência.
4. Mover Canvas do Ghost para z-index \`z-30\`, CTA em \`z-35\`, texto em \`z-20\`, header em \`z-40\`.
5. Adicionar detecção de \`pointer: coarse\` e \`prefers-reduced-motion\` em \`Ghost.tsx\` para:
   - desativar follow mouse em touch,
   - reduzir partículas/fireflies e pós-processamento em mobile,
   - opcionalmente renderizar fallback estático em reduced motion.

**Regras**

- ❌ Não alterar textos.
- ❌ Não inventar novo layout de texto.
- ✅ Tailwind + App Router + R3F/Drei.
- ✅ Mobile-first.
- ✅ Comparar com: imagem HERO-PORTFOLIO-GHOST.

**Critérios de aceite (Checklist)**

- [ ] Ghost e glow cobrem o texto no mesmo lugar da referência.
- [ ] CTA nunca é encoberto pelo glow.
- [ ] Follow mouse apenas em desktop.
- [ ] Ghost respeita prefers-reduced-motion.
- [ ] FPS aceitável em mobile.

---

### 🛠️ Prompt #03 — Implementar Vídeo Manifesto Fullscreen na Home

**Objetivo**

- Substituir a seção de cards múltiplos por um único vídeo manifesto fullscreen 16:9 colado às laterais.

**Arquivos/Rotas envolvidas**

- \`src/components/home/VideoManifesto.tsx\`
- \`src/app/page.tsx\`
- \`src/app/globals.css\` (classes \`.video-manifesto\`, \`.video-overlay\`)

**Ações**

1. Criar \`VideoManifesto\` seguindo o código canônico fornecido (com lazy load, mute automático, qualidade adaptativa).
2. Posicionar \`<VideoManifesto />\` logo após \`<HomeHero />\` em \`page.tsx\`.
3. Garantir \`w-screen\` e \`aspect-video\` com remoção de padding lateral (usar \`mx-[calc(50%-50vw)]\` se necessário).
4. Implementar botão de som fixo no canto superior direito do vídeo, que:
   - toggla \`muted\`,
   - muta ao sair da seção (IntersectionObserver).
5. Adicionar classes globais para overlay gradient e reset de margin/padding da seção.

**Regras**

- ❌ Não alterar os textos de metadados sobrepostos.
- ❌ Não alterar a ordem das seções.
- ✅ Tailwind + Framer Motion.
- ✅ Mobile-first.
- ✅ Comparar com: especificação da seção “VÍDEO MANIFESTO”.

**Critérios de aceite (Checklist)**

- [ ] Seção de vídeo ocupa 100% da largura da viewport, 16:9.
- [ ] Não existe scroll horizontal.
- [ ] Botão de som visível e funcional.
- [ ] Lazy loading e poster em uso.
- [ ] Performance não piorou (FCP/LCP estáveis).

---

### 🛠️ Prompt #04 — Reconstruir Portfolio Showcase (3 Faixas) na Home

**Objetivo**

- Fazer a seção “portfólio showcase” da Home ficar idêntica ao layout com 3 stripes interativas.

**Arquivos/Rotas envolvidas**

- \`src/components/home/portfolio/PortfolioShowcaseStripes.tsx\`
- \`src/app/page.tsx\`

**Ações**

1. Criar componente \`PortfolioShowcaseStripes\` com:
   - título \`portfólio showcase\` (com “showcase” em azul),
   - label flutuante \`[what we love working on]\` alinhada à esquerda.
2. Implementar 3 faixas:
   - “Brand & Campaigns” alinhada à direita,
   - “Videos & Motions” centralizada,
   - “Web Campaigns, Websites & Tech” alinhada à esquerda com quebra de linha após vírgula.
3. Em desktop:
   - faixas com thumbnail 288px que se revela no hover (width de 0 → 288px, opacity 0 → 1, easing \`[0.22,1,0.36,1]\`).
   - ícone seta em badge circular azul com rotação suave -45deg → 0deg.
4. Em mobile:
   - simplificar para cards verticais full-width, sem hover, ícone de seta à direita.

**Regras**

- ❌ Não alterar textos das categorias.
- ❌ Não mudar a ordem das faixas.
- ✅ Tailwind + Framer Motion.
- ✅ Mobile-first.
- ✅ Comparar com: layout textual do Portfolio Showcase descrito no documento da Home.

**Critérios de aceite (Checklist)**

- [ ] Grid e margens idênticos na Home desktop.
- [ ] Labels/CTAs coincidem com a referência.
- [ ] Mobile stack sem overflow horizontal.
- [ ] Motion sutil, sem exageros.

---

### 🛠️ Prompt #05 — Ajustar Featured Projects Bento Grid

**Objetivo**

- Corrigir o grid de projetos em destaque para o bento de 4 cards + CTA com col-spans corretos e motion.

**Arquivos/Rotas envolvidas**

- \`src/components/home/featured/FeaturedProjects.tsx\`

**Ações**

1. Atualizar grid para \`md:grid-cols-12 gap-6\`.
2. Distribuir os 4 projetos e CTA conforme spans definidos (5/7/12/8/4).
3. Implementar hover:
   - imagem: \`scale-105\`, \`translateY(-1px)\`, \`duration:0.5\`,
   - seta: \`translateX(20px)\`, \`duration:0.7\`.
4. Adicionar scroll reveal container + stagger children conforme padrões de motion do documento.

**Regras**

- ❌ Não trocar a ordem dos projetos.
- ❌ Não alterar textos/metadados.
- ✅ Tailwind + Framer Motion.
- ✅ Comparar com: especificação de Featured Projects.

**Critérios de aceite (Checklist)**

- [ ] Layout bento idêntico.
- [ ] Sem overflow em mobile.
- [ ] Motion suave e editorial.

---

### 🛠️ Prompt #06 — Unificar Clients/Brands Section

**Objetivo**

- Ter uma única implementação de Clients/Brands usada em todas as páginas com grid e cores normalizados.

**Arquivos/Rotas envolvidas**

- \`src/components/sections/ClientsBrands.tsx\`
- \`src/app/page.tsx\`, \`src/app/sobre/page.tsx\`, \`src/app/portfolio/page.tsx\`

**Ações**

1. Criar componente \`ClientsBrands\` com:
   - fundo \`bg-[#0048ff]\`,
   - título centralizado,
   - grid de 12 logos carregados de Supabase.
2. Aplicar \`filter: brightness(0) invert(1)\` em todos os \`<img>\`.
3. Responsividade:
   - mobile: 2–3 colunas com gap vertical 6,
   - desktop: 6+ colunas com logos em tamanho reduzido.
4. Adicionar animação de scroll reveal com stagger nos logos, desativada em \`prefers-reduced-motion\`.

**Regras**

- ❌ Não alterar textos.
- ✅ Tailwind + Framer Motion.
- ✅ Mobile-first.
- ✅ Comparar com: especificação da seção Clients/Brands.

**Critérios de aceite (Checklist)**

- [ ] Mesma aparência em Home, Sobre e Portfolio.
- [ ] Logos sempre brancos sobre azul.
- [ ] Sem overflow horizontal em nenhum breakpoint.

---

### 🛠️ Prompt #07 — Normalizar Contato (Seção + Formulário)

**Objetivo**

- Tornar a seção de contato idêntica ao layout + comportamento especificado, compartilhada entre páginas.

**Arquivos/Rotas envolvidas**

- \`src/components/sections/ContactSection.tsx\`
- \`src/validations/contact.ts\`
- \`src/app/page.tsx\`, \`src/app/sobre/page.tsx\`, \`src/app/portfolio/page.tsx\`

**Ações**

1. Criar componente \`ContactSection\` com:
   - título “contato” e subtítulo centralizados em mobile.
   - duas colunas em desktop: info à esquerda, form à direita.
2. Implementar form com campos Name, Email, Message, integrados ao FormSubmit.co.
3. Adicionar validação básica + mensagens de erro/sucesso específicas, ligadas via \`aria-describedby\`.
4. Adicionar scroll reveal da seção + stagger dos campos utilizando Framer Motion.
5. Garantir tamanho mínimo de hit-area 48x48 em mobile para botões e links.

**Regras**

- ❌ Não alterar textos.
- ❌ Não mudar o endpoint do FormSubmit.
- ✅ Tailwind + Framer Motion.
- ✅ Comparar com: especificações de Contact.

**Critérios de aceite (Checklist)**

- [ ] Mesmo componente usado nas três páginas.
- [ ] Layout responsivo sem quebra.
- [ ] Acessibilidade básica (labels, aria, foco).

---

### 🛠️ Prompt #08 — Corrigir Footer (Desktop Fixo, Mobile Estático)

**Objetivo**

- Ajustar o comportamento do footer para ser fixo apenas em desktop e estático em mobile/tablet.

**Arquivos/Rotas envolvidas**

- \`src/components/layout/SiteFooter.tsx\`
- \`src/app/layout.tsx\`

**Ações**

1. Adicionar condicional de breakpoint (via CSS ou hook) para:
   - desktop: \`fixed bottom-0 inset-x-0 h-12 bg-[#0057FF]\`,
   - mobile/tablet: \`relative w-full bg-[#0057FF] py-10\`.
2. Organizar conteúdo do footer: copyright, navegação, redes.
3. Garantir que o conteúdo principal tenha padding-bottom suficiente em desktop para o footer não cobrir nada.

**Regras**

- ❌ Não alterar textos.
- ✅ Tailwind.
- ✅ Mobile-first.
- ✅ Comparar com: especificação do Footer.

**Critérios de aceite (Checklist)**

- [ ] Em desktop, footer sempre visível no bottom.
- [ ] Em mobile, footer aparece como última seção normal.
- [ ] Sem conteúdo encoberto.

---

### 🛠️ Prompt #09 — Implementar Hero Vídeo Loop em /portfolio

**Objetivo**

- Substituir o hero atual estático da página /portfolio por um hero de vídeo loop com título e CTA corretos.

**Arquivos/Rotas envolvidas**

- \`src/app/portfolio/page.tsx\`
- \`src/components/portfolio/HeroSection.tsx\`

**Ações**

1. Criar \`HeroSection\` da página de portfolio com:
   - \`<video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">\`,
   - overlay gradiente escuro,
   - título \`<span className="text-bluePrimary">portfólio</span> showcase\` centralizado.
2. Adicionar CTA “vamos trabalhar juntos →” na base do hero, usando o mesmo padrão visual de CTA global.
3. Garantir variações de vídeo mobile/desktop conforme URLs do documento.

**Regras**

- ❌ Não alterar o texto do título e CTA.
- ✅ Tailwind.
- ✅ Comparar com: seção “HERO SECTION — VÍDEO LOOPING” do protótipo Portfolio.

**Critérios de aceite (Checklist)**

- [ ] Hero ocupa 100vh na página /portfolio.
- [ ] Título e CTA centralizados e legíveis.
- [ ] Vídeo loop funciona em mobile+desktop (muted).

---

### 🛠️ Prompt #10 — Criar Gallery Parallax Lerp em /portfolio

**Objetivo**

- Implementar a galeria de projetos com track fixo e parallax lerp suave na página /portfolio.

**Arquivos/Rotas envolvidas**

- \`src/components/portfolio/ProjectsGallery.tsx\`
- \`src/components/portfolio/ProjectCard.tsx\`
- \`src/hooks/useParallax.ts\`

**Ações**

1. Criar hook \`useParallax\` conforme especificação (lerp entre \`startY\` e \`endY\` com \`easing=0.05\`, \`requestAnimationFrame\`).
2. Implementar \`ProjectsGallery\` com:
   - seção \`<section ref={galleryRef} className="gallery">\`,
   - \`gallery-track\` posicionado como \`fixed top-0 left-0 w-full grid md:grid-cols-2 lg:grid-cols-3 gap-1 p-1\`.
3. Implementar \`ProjectCard\` com \`card-image-wrapper\` 135% height e parallax interno baseado em \`getBoundingClientRect\`.
4. Pausar RAF e parallax quando \`Math.abs(startY - window.scrollY) < 0.1\`.
5. Garantir mobile fallback com grid 1 coluna, sem track fixo exagerado, respeitando performance.

**Regras**

- ❌ Não mudar o conteúdo textual dos cards.
- ✅ Tailwind + React + requestAnimationFrame.
- ✅ Mobile-first.
- ✅ Comparar com: seção “GALLERY COM PARALLAX LERP” do protótipo Portfolio.

**Critérios de aceite (Checklist)**

- [ ] Gallery track fica fixo enquanto a seção de portfolio está em scroll.
- [ ] Cards têm parallax vertical interno suave.
- [ ] Sem scroll hijacking, apenas suavização.
- [ ] FPS estável (~60fps) em desktop.

---

### 🛠️ Prompt #11 — Implementar PortfolioModal Tipo A/B com Timeline Canônica

**Objetivo**

- Criar modal de projeto com dois layouts (zoom viewer e página interna) e animação em etapas.

**Arquivos/Rotas envolvidas**

- \`src/components/portfolio/PortfolioModal.tsx\`
- \`src/components/portfolio/ProjectContentTypeA.tsx\`
- \`src/components/portfolio/ProjectContentTypeB.tsx\`

**Ações**

1. Criar \`PortfolioModal\` usando \`AnimatePresence\` + \`Framer Motion\` com:
   - backdrop fade-in 0→180ms,
   - container scale+translate 120→380ms,
   - mídia principal, título, meta e conteúdo secundário em sequência conforme tempos do documento.
2. Implementar tipos A e B conforme estruturas fornecidas (zoom viewer e página interna).
3. Bloquear scroll do \`body\` enquanto o modal estiver aberto, liberando ao fechar.
4. Implementar fechamento por ESC, clique em X e clique no backdrop (\`target === currentTarget\`).
5. Gerenciar foco inicial no botão de fechar e retorno ao card original.

**Regras**

- ❌ Não mudar os textos dos projetos.
- ✅ Tailwind + Framer Motion.
- ✅ Comparar com: “ANIMAÇÃO — TIMELINE CANÔNICO DO MODAL”.

**Critérios de aceite (Checklist)**

- [ ] Modal abre e fecha com a sequência temporal correta.
- [ ] Scroll da página é bloqueado durante modal.
- [ ] Foco acessível e restauração funcionando.
- [ ] Parallax da gallery pausa enquanto modal está aberto.

---

### 🛠️ Prompt #12 — Implementar Hero Sobre com Vídeo Loop

**Objetivo**

- Alinhar o Hero da página /sobre ao vídeo loop + manifesto descritos.

**Arquivos/Rotas envolvidas**

- \`src/app/sobre/page.tsx\`
- \`src/components/sobre/HeroSobre.tsx\`

**Ações**

1. Criar \`HeroSobre\` com:
   - vídeo full-bleed (\`HeroSobre.mp4\` desktop), \`HeroSobreMobile.mp4\` em mobile,
   - overlay com gradiente escuro \`backgroundDark\`.
2. Posicionar bloco de texto manifesto:
   - Desktop: colunas 7–12, alinhado à direita, levemente acima do centro.
   - Mobile: abaixo do vídeo, centralizado.
3. Implementar animação linha a linha com Framer Motion (\`opacity/blur/translateY\` conforme tabela do documento).

**Regras**

- ❌ Não alterar o manifesto textual.
- ✅ Tailwind + Framer Motion.
- ✅ Comparar com: especificação da Seção 01 — HERO / MANIFESTO.

**Critérios de aceite (Checklist)**

- [ ] Hero da página /sobre coincide com as referências desktop/mobile.
- [ ] Sem overflow horizontal.
- [ ] Vídeo performático (muted, playsInline, preload="metadata").

---

### 🛠️ Prompt #13 — Implementar GSAP Mask Reveal na Origem Criativa

**Objetivo**

- Criar o efeito mask reveal pinned com 4 blocos de texto/imagem na seção Origem Criativa.

**Arquivos/Rotas envolvidas**

- \`src/components/sobre/OrigemCriativa.tsx\`

**Ações**

1. Adicionar GSAP + ScrollTrigger + Lenis apenas client-side (\`'use client'\`).
2. Estruturar layout desktop em 2 colunas: texto à esquerda, imagens pinned à direita.
3. Criar timeline que:
   - fixa a coluna de imagens (\`pin: ".arch__right"\`),
   - aplica \`clipPath: inset(0 0 100%) → inset(0)\` para cada imagem,
   - sincroniza blur/opacity e objectPosition.
4. Implementar fallback para mobile sem pin; apenas parallax leve em \`object-position\`.

**Regras**

- ❌ Não alterar textos dos blocos A–D.
- ✅ GSAP 3.13 + ScrollTrigger + Lenis.
- ✅ Comparar com: seção “Origem Criativa (ADAPTADA COM ANIMAÇÃO GSAP MASK REVEAL)”.

**Critérios de aceite (Checklist)**

- [ ] Em desktop, as imagens são reveladas verticalmente enquanto o texto avança.
- [ ] Mobile não sofre com pinning; apenas scroll normal.
- [ ] Sem jitter, 60fps em scroll suave.

---

### 🛠️ Prompt #14 — Implementar AboutWhatIDo (Blocos Horizontais de Serviços)

**Objetivo**

- Converter a seção de serviços em sequência horizontal guiada por scroll (desktop) e barras verticais (mobile).

**Arquivos/Rotas envolvidas**

- \`src/components/sobre/AboutWhatIDo.tsx\`

**Ações**

1. Desktop:
   - Criar linha única \`flex-row\` com 7 cards \`min-h-[140px] rounded-2xl bg-[#0048ff]\`.
   - Animar via Framer Motion ou GSAP \`x:120vw → 0\`, \`opacity:0→1\` com stagger.
2. Mobile:
   - Empilhar os 7 cards verticalmente; cada um com \`x:80px→0\` ao entrar em viewport.
3. Incluir numeração roxa (\`#8705f2\`) e textos exatamente como especificados.

**Regras**

- ❌ Não alterar textos dos 7 itens.
- ✅ Tailwind + Motion.
- ✅ Comparar com: seção “O QUE EU FAÇO - AboutWhatIDo”.

**Critérios de aceite (Checklist)**

- [ ] Desktop mostra linha contínua de 7 blocos animando da direita.
- [ ] Mobile mostra barras verticais com animação leve.
- [ ] Sem overflow horizontal indesejado.

---

### 🛠️ Prompt #15 — Implementar “O que me move” com Frases Rotativas + Ghost Final

**Objetivo**

- Criar a sequência temporal de frases rotativas e reveal final “ISSO É GHOST DESIGN” na página /sobre.

**Arquivos/Rotas envolvidas**

- \`src/components/sobre/OQueMeMove.tsx\`
- \`src/components/canvas/sobre/Ghost.tsx\` (ou reutilização do ghost da home)

**Ações**

1. Implementar título fixo superior com animação de entrada (fade + blur).
2. Criar array de 6 frases e máquina de estado temporal (\`setTimeout\` ou Framer Motion \`AnimatePresence\`) que:
   - anima cada frase com entrada/saída (~4.2s por frase),
   - total ~25s antes de avançar ao reveal final.
3. Após última frase, mostrar layout final:
   - ghost à esquerda (ou topo em mobile),
   - texto “ISSO É GHOST DESIGN” com “GHOST DESIGN” em azul.
4. Em \`prefers-reduced-motion: reduce\`, mostrar todas as frases em sequência estática (sem animação) e o ghost final sem efeito extra.

**Regras**

- ❌ Não alterar os textos das frases.
- ✅ Tailwind + Framer Motion.
- ✅ Comparar com: seção “O QUE ME MOVE” do documento Sobre.

**Critérios de aceite (Checklist)**

- [ ] Sequência de frases ocorre apenas uma vez ao entrar na seção.
- [ ] Reveal final destaca Ghost e texto conforme layout.
- [ ] Respeito a prefers-reduced-motion.

---

Esse conjunto de prompts cobre os principais gaps entre o estado atual e os protótipos canônicos da Home, Sobre e Portfolio, priorizando:

1. Consistência de grid/margens e tipografia (tokens).
2. Integração Header + Hero + Ghost.
3. Implementação fiel do Portfolio Showcase v2.0.
4. Motion editorial silencioso em Sobre.
5. Reutilização e consistência das seções compartilhadas.

`;

export default function AuditReport() {
  return (
    <article className="prose max-w-none whitespace-pre-wrap text-sm leading-relaxed">
      {auditMarkdown}
    </article>
  );
}

---

Pronto! Agora seu ghost está configurado para:

- ✅ Revelar o texto ao passar por cima.
- ✅ Ter olhos visíveis e pulsantes.
- ✅ Ter efeitos de scanlines, grain e CRT.
- ✅ Ter o visual idêntico ao do CodePen.

Se quiser, posso te ajudar a integrar os outros componentes como `Fireflies`, `Particles`, etc., para deixar tudo completo. Me avise! 🎃✨

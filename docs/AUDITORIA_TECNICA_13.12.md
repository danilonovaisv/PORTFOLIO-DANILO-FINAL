// docs/home-portfolio-audit-prompts.md.ts
// Este arquivo exporta (como string) um relatório em Markdown com diagnóstico + prompts executáveis
// para corrigir HOME e PORTFOLIO, mantendo fidelidade ao layout de referência.

export const HOME_PORTFOLIO_AUDIT_MD = String.raw`# Auditoria HOME + PORTFOLIO — portfoliodanilo.com

> Stack-alvo e premissas do projeto: Next.js (App Router) + React + TypeScript + Tailwind + R3F/Drei/Three + Framer Motion + Firebase Hosting + Supabase Storage.  :OaiMdDirective_Annotations_fq44m{attrs="eyJpbmRleCI6MH0"}  
> **Regra absoluta:** não alterar textos e não mudar ordem de seções.

## 📌 Referências obrigatórias (do repositório)
- Layout esperado: \`docs/HOME-PORTFOLIO-LAYOUYT.jpg\`
- Documento técnico: \`docs/PORT DAN REVISADO - NEXT.pdf\`

## 🧭 Escopo auditado
- HOME: rota \`/\` (arquivo \`app/page.tsx\`)
- PORTFOLIO: rota \`/portfolio\` (arquivo \`app/portfolio/page.tsx\`)
- Componentes diretamente relacionados (detectados no repo por nomenclatura/paths):
  - \`components/sections/Hero.tsx\`
  - \`components/three/HeroGlassCanvas.tsx\`
  - \`components/three/TorusDan.tsx\`
  - \`components/three/Model.tsx\`
  - \`public/media/torus_dan.jsx\`
  - \`components/home/PortfolioShowcase.tsx\`

---

# 1️⃣ Visão Geral (estado atual)

## Pontos fortes
- Estrutura App Router presente em \`/app\`, com rotas dedicadas (\`/\`, \`/portfolio\`, \`/sobre\`).
- Separação coerente entre UI (ex.: \`components/sections\`, \`components/home\`) e 3D (ex.: \`components/three\`).
- Uso de assets 3D via \`public/media\` (ex.: \`torus_dan.jsx\`) sugere pipeline com gltfjsx (boa prática para controlar materiais/meshes).

## Riscos/alertas principais (impactam fidelidade e UX)
- **Divergência entre estrutura descrita e estrutura real**: o projeto usa \`app/\` e \`components/\` na raiz, enquanto o briefing menciona \`src/app\` e \`src/components\`. Isso quebra automações de agentes se os prompts apontarem paths errados.
- **Sinais visuais de “espaços mortos” (blank sections)** em PORTFOLIO: geralmente causado por:
  - container com \`min-h\` excessivo,
  - fetch sem estado vazio/skeleton,
  - grid com colunas/linhas travadas e ausência de conteúdo.
- **Hero com 3D**: risco de performance (LCP/TBT) + problemas de responsividade/overflows + SSR/hydration se Canvas estiver fora de “use client”.

---

# 2️⃣ Diagnóstico por Dimensão

## 🧱 Estrutura / Arquitetura
**Status:** 🟡 Médio  
- O App Router está correto (pasta \`app/\`).  
- O risco maior é **padronização de caminhos e convenções** (briefing vs repo real).  
- Recomenda-se criar (ou reforçar) “single source of truth” para rotas/âncoras e para conteúdo (ex.: config central como já existe em \`components/config/homepageContent.ts\`).

## 🎨 UI (fidelidade visual)
**Status:** 🔴 Alto  
- A HOME e PORTFOLIO precisam ser “pixel-perfect” conforme \`docs/HOME-PORTFOLIO-LAYOUYT.jpg\`.  
- Alvos típicos de divergência:
  - grid/alinhamento do Hero (logo/nav/orb/título/subtítulo/CTA);
  - espaçamento vertical entre seções (Hero → vídeo/manifesto → portfolio showcase);
  - comportamento de cards do portfolio (raio, borda, hover, play icon overlay, paddings).

## 🧠 UX (fluxo, microinterações)
**Status:** 🟡 Médio  
- CTAs precisam ter estados consistentes (hover/focus/active).
- Navegação: itens precisam indicar estado ativo (ex.: underline/opacity) e respeitar acessibilidade (focus visível).
- Rolagem para seções (get to know me better / vamos trabalhar juntos): garantir offset correto (header fixo).

## 📱 Responsividade (mobile-first)
**Status:** 🔴 Alto  
- O Hero com 3D exige controle de:
  - dimensionamento do Canvas em breakpoints,
  - \`overflow-x-hidden\`/clip,
  - escalas e “safe areas” (iOS).

## 🎥 Motion (Framer Motion)
**Status:** 🟡 Médio  
- As animações devem ser suaves, mas **não podem “puxar” CLS** (ex.: animar height/width sem reserva de espaço).
- Respeitar \`prefers-reduced-motion\`.

## 🧊 3D / WebGL (R3F/Drei)
**Status:** 🔴 Alto (crítico por performance + estabilidade)
- Garantir que Canvas/Scene roda só no client.
- Evitar misturar Server Components dentro de Client Components (e :OaiMdDirective_Annotations_fq44m{attrs="eyJpbmRleCI6MX0"} vice-versa). 
- Carregamento de modelo: deve ter \`Suspense\` + fallback + preload quando fizer sentido.
- Performance: limitar DPR no mobile, reduzir sombras/AA quando necessário, e evitar re-render no React desnecessário.

## ⚡ Performance (LCP, CLS, TBT)
**Status:** 🔴 Alto  
- Hero é candidato a LCP: precisa reservar espaço (altura do bloco) e evitar que Canvas cause shift.
- Imagens/cards: precisam de aspect-ratio/altura mínima para não “pular”.

## ♿ Acessibilidade
**Status:** 🟡 Médio  
- Menu mobile (hamburger): precisa \`aria-expanded\`, \`aria-controls\`.
- Botões/links: garantir focus ring visível e área clicável adequada.
- Seções: usar landmarks (\`header\`, \`main\`, \`nav\`, \`footer\`) e headings em ordem.

---

# 3️⃣ (Opcional) Análise por Seção

## 🎯 Seção: Hero (HOME)

- 📌 Fidelidade visual à imagem: ✗ (prioridade máxima de ajuste fino)
- 📱 Responsividade mobile: ✗ (3D + tipografia)
- 🎥 Animações: 🟡 (depende de como está implementado)
- 💻 Componente: \`components/sections/Hero.tsx\`
- 🧩 Integrações:
  - \`app/page.tsx\` → \`components/sections/Hero.tsx\`
  - \`Hero.tsx\` → \`components/three/HeroGlassCanvas.tsx\`
  - \`HeroGlassCanvas.tsx\` → \`components/three/TorusDan.tsx\` e/ou \`components/three/Model.tsx\`
  - \`TorusDan/Model\` → asset \`public/media/torus_dan.jsx\`

### ❌ Problema (padrões comuns que quebram o layout)
1) Canvas “vaza” do grid e/ou empurra tipografia (overflow/CLS).  
2) Orb/elemento 3D não respeita breakpoints (fica grande demais no mobile).  
3) CTA não bate com o pill/button do layout (padding, radius, ícone, alinhamento).  

### 🔧 Solução técnica (diretrizes)
- Fixar “slots” do layout (texto e 3D) com grid + alturas previsíveis.
- Garantir Canvas em client component, com fallback e DPR controlado.
- Motion: animar opacidade/transform, evitar animar height.

---

## 🎯 Seção: Portfolio Showcase (HOME)

- 📌 Fidelidade visual à imagem: ✗ (muito sensível a spacing/typography)
- 📱 Responsividade mobile: 🟡
- 🎥 Animações: 🟡
- 💻 Componente: \`components/home/PortfolioShowcase.tsx\`

### ❌ Problema
- Cards e headings precisam bater exatamente com o layout: tamanhos, alinhamento, “dots” azuis, espaçamento vertical e comportamento de hover.

### 🔧 Solução técnica
- Ajustar grid com Tailwind em breakpoints fixos.
- Garantir que cards tenham \`aspect-[...]\` e \`min-h\` para evitar CLS.

---

## 🎯 Seção: Página Portfolio (/portfolio)

- 📌 Fidelidade visual à imagem: ✗
- 📱 Responsividade mobile: 🟡
- 🎥 Animações: 🟡
- 💻 Rota: \`app/portfolio/page.tsx\`

### ❌ Problema
- “Área vazia” grande indica falha de composição: ausência de conteúdo ou layout travado por height.
- Possível falta de estado vazio (loading/empty/error) para dados vindos de storage.

### 🔧 Solução técnica
- Implementar “estado carregando / vazio / erro” com placeholders fiéis ao layout.
- Remover min-height desnecessário e/ou condicionar a altura ao conteúdo real.

---

# 4️⃣ Lista de Problemas (por severidade)

## 🔴 Alta (corrigir primeiro)
1. Fidelidade visual do Hero (grid, tipografia, orb 3D, CTA).
2. Estabilidade/performance do Canvas (SSR/client boundary, Suspense, DPR).
3. PORTFOLIO com área vazia (estado de dados + layout height).

## 🟡 Média
4. Microinterações (hover/focus/active) consistentes em cards/CTAs.
5. Animações com Framer Motion sem CLS e com reduced motion.
6. Acessibilidade do menu mobile e navegação por teclado.

## 🟢 Baixa
7. Refino de semântica de headings/landmarks.
8. Pequenas otimizações de imagens (priority, sizes, decoding) sem alterar layout.

---

# 5️⃣ Recomendações Prioritárias (ordem sugerida)

1) **Fechar fidelidade do Hero** (é a primeira dobra, define percepção e costuma impactar LCP/CLS).  
2) **Estabilizar R3F** (client-only + fallback + DPR) para evitar travamentos e inconsistências.  
3) **Corrigir a página /portfolio** (área vazia e states).  
4) Depois: microinterações + acessibilidade + refinos de motion/perf.

---

# 🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR (ATÔMICOS E EXECUTÁVEIS)

> Regras globais para TODOS os prompts:
> - ❌ Não alterar textos
> - ❌ Não mudar ordem das seções
> - ✅ Usar Tailwind CSS
> - ✅ App Router (\`app/\`)
> - ✅ Validar contra \`docs/HOME-PORTFOLIO-LAYOUYT.jpg\` e \`docs/PORT DAN REVISADO - NEXT.pdf\`

---

### 🛠️ Prompt #01 — Normalizar paths do projeto (evitar automação quebrada)

**Objetivo:**  
Padronizar a documentação/execução para refletir a estrutura real (\`app/\`, \`components/\`) e evitar prompts/automação apontando para \`src/app\`.

**Ações:**
1. Confirmar que o projeto usa App Router na raiz em \`/app\` e componentes em \`/components\`.
2. Atualizar qualquer documentação interna/prompt executor que cite \`src/app\` para \`app\`.
3. Garantir que import paths (alias) não dependem de \`src/\` para componentes principais.

**Resultado esperado:**  
Agente consegue atuar nos arquivos corretos sem criar pastas novas ou quebrar imports.

---

### 🛠️ Prompt #02 — Correção do Hero (HOME) — grid e composição pixel-perfect

**Objetivo:**  
Deixar o Hero **idêntico** ao layout \`docs/HOME-PORTFOLIO-LAYOUYT.jpg\`.

**Arquivos-alvo:**
- \`components/sections/Hero.tsx\`
- (onde o Hero é usado) \`app/page.tsx\`

**Ações:**
1. Ajustar o grid do Hero para separar claramente:
   - header/nav (logo + links ou menu)
   - bloco 3D (orb/torus)
   - bloco de texto (título/subtítulo)
   - CTA (pill + ícone)
2. Garantir espaçamentos verticais e alinhamentos (centralização no mobile, distribuição no desktop) conforme referência.
3. Garantir que o Hero não cause overflow horizontal (usar \`overflow-x-clip\` ou \`overflow-hidden\` no wrapper correto).

**Resultado esperado:**  
Hero visualmente idêntico e sem “vazamentos”/quebras em 320px → desktop.

---

### 🛠️ Prompt #03 — Hero 3D: forçar Client Component + evitar hydration/SSR issues

**Objetivo:**  
Garantir que o Canvas R3F rode somente no client, evitando erros/hydration mismatch.

**Arquivos-alvo:**
- \`components/three/HeroGlassCanvas.tsx\` (ou o componente que contém \`<Canvas />\`)

**Ações:**
1. Verificar se o arquivo do Canvas tem \`"use client"\` no topo.
2. Garantir que nenhum Server Component seja importado dentro do Canv :OaiMdDirective_Annotations_fq44m{attrs="eyJpbmRleCI6Mn0"}as/scene (limite client/server no App Router). 
3. Se necessário, trocar o uso do Canvas por dynamic import (\`next/dynamic\`) com \`ssr: false\` no ponto de uso (ex.: dentro do Hero).

**Resultado esperado:**  
Hero 3D renderiza sem warnings/erros e sem inconsistências entre server/client.

---

### 🛠️ Prompt #04 — Hero 3D: performance (DPR, antialias, eventos e pointer)

**Objetivo:**  
Reduzir custo de render do 3D sem alterar aparência perceptível.

**Arquivos-alvo:**
- \`components/three/HeroGlassCanvas.tsx\`
- \`components/three/TorusDan.tsx\` e/ou \`components/three/Model.tsx\`

**Ações:**
1. Controlar DPR por breakpoint (ex.: limitar DPR no mobile).
2. Desabilitar sombras pesadas se existirem (ou reduzir shadow map).
3. Garantir que o Canvas não capture scroll/toques indevidamente:
   - configurar \`pointer-events\` no container (ex.: permitir scroll no mobile, se necessário).
4. Garantir fallback leve durante loading (Suspense).

**Resultado esperado:**  
Interação e scroll fluídos no mobile, sem “lag”, mantendo visual.

---

### 🛠️ Prompt #05 — Integração do modelo: validar pipeline TorusDan/torus_dan.jsx

**Objetivo:**  
Garantir que o modelo 3D usado no Hero esteja corretamente importado, com paths estáveis e sem 404.

**Arquivos-alvo:**
- \`components/three/TorusDan.tsx\`
- \`public/media/torus_dan.jsx\`

**Ações:**
1. Validar o import do asset (\`/public/media/torus_dan.jsx\`) e remover caminhos relativos frágeis.
2. Garantir que o modelo seja pré-carregado quando fizer sentido (ex.: \`useGLTF.preload\` se estiver usando drei/useGLTF internamente).
3. Garantir que materiais/transmission/refraction não estejam exagerando custo no mobile.

**Resultado esperado:**  
Modelo 3D sempre carrega e mantém aparência consistente.

---

### 🛠️ Prompt #06 — HOME: Portfolio Showcase (cards) — layout, tipografia e grid

**Objetivo:**  
Deixar o bloco “portfolio showcase” idêntico ao layout de referência.

**Arquivos-alvo:**
- \`components/home/PortfolioShowcase.tsx\`

**Ações:**
1. Ajustar tipografia (tamanho/weight/leading) dos títulos de categoria.
2. Ajustar “dots” azuis e alinhamento (baseline e distância do texto) conforme referência.
3. Ajustar espaçamento vertical entre linhas e entre cards.
4. Garantir responsividade sem overflow e sem quebra do grid.

**Resultado esperado:**  
Seção replica o layout de referência sem variações perceptíveis.

---

### 🛠️ Prompt #07 — HOME: Cards de projetos (grid) — aspecto, overlay e CLS

**Objetivo:**  
Corrigir cards (imagem/preview + overlay play + tags) para não haver CLS e manter fidelidade visual.

**Arquivos-alvo:**
- Componentes de cards (encontrar em \`components/\` por “Card”, “Project”, “Portfolio”)
- Possivelmente \`components/home/...\` e/ou \`app/page.tsx\`

**Ações:**
1. Garantir que cada card tenha altura/ratio fixo (\`aspect-\` e/ou \`min-h\`) antes de carregar imagem.
2. Garantir overlay (play icon) com posicionamento absoluto e responsivo.
3. Garantir hover e foco com transições suaves (Framer Motion ou Tailwind), sem alterar layout.

**Resultado esperado:**  
Cards não “pulam” ao carregar e ficam idênticos ao layout.

---

### 🛠️ Prompt #08 — PORTFOLIO: eliminar “área vazia” com estado vazio/loading/error

**Objetivo:**  
Remover o grande espaço vazio na página /portfolio mantendo a estrutura prevista no layout.

**Arquivos-alvo:**
- \`app/portfolio/page.tsx\`
- Componentes da página Portfolio (procurar em \`components/\` por “Portfolio”)

**Ações:**
1. Identificar a origem do “blank space”: \`min-h-screen\`, \`h-[...]\`, grid com rows fixas, ou ausência de dados.
2. Implementar estados:
   - loading: skeleton fiel ao layout
   - empty: fallback visual com altura correta (sem texto novo; apenas estrutura visual neutra/skeleton)
   - error: fallback discreto (sem inserir copy nova visível ao usuário, se isso violar o layout)
3. Garantir que o botão “veja mais” não fique “flutuando” no fim de uma área vazia sem conteúdo.

**Resultado esperado:**  
/portfolio sempre tem preenchimento visual consistente e sem “buracos”.

---

### 🛠️ Prompt #09 — Navegação (desktop + mobile): estado ativo, acessibilidade e consistência

**Objetivo:**  
Garantir que o header/nav siga o layout e tenha acessibilidade correta.

**Arquivos-alvo:**
- Componente de header/navbar (procurar em \`components/\` por “Header”, “Navbar”, “Menu”)

**Ações:**
1. Ajustar espaçamento/posição do logo e itens (home/sobre/portfolio showcase/contato) conforme referência.
2. Implementar estado ativo com estilo (underline/opacity) sem mudar textos.
3. Menu mobile:
   - \`aria-expanded\`, \`aria-controls\`
   - foco preso no menu quando aberto (focus trap simples) ou garantir tab order seguro
   - fechar com ESC

**Resultado esperado:**  
Nav idêntica visualmente e navegável por teclado/leitor de tela.

---

### 🛠️ Prompt #10 — Framer Motion: padronizar animações sem CLS e com reduced motion

**Objetivo:**  
Microinterações e entrance animations suaves e consistentes.

**Arquivos-alvo:**
- Componentes de seções HOME e PORTFOLIO (Hero, PortfolioShowcase, cards)

**Ações:**
1. Trocar animações baseadas em height/width por transform/opacity.
2. Aplicar easing/duração padronizados (ex.: 0.6–0.9s, easeOut) e stagger leve em grids.
3. Respeitar \`prefers-reduced-motion\` desativando motion pesado.

**Resultado esperado:**  
Animações fluídas, sem tremedeira, sem shift.

---

### 🛠️ Prompt #11 — Performance: LCP/CLS (imagens e seções críticas)

**Objetivo:**  
Reduzir CLS e melhorar LCP sem mudar layout.

**Arquivos-alvo:**
- Componentes com imagens grandes (Hero/manifesto/portfolio grid)

**Ações:**
1. Reservar espaço para imagens (aspect ratio, width/height).
2. Garantir que assets críticos não bloqueiem render (priorizar apenas o que é LCP real).
3. Evitar carregar 3D pesado antes do first paint (se necessário, lazy/idle load do Canvas mantendo placeholder).

**Resultado esperado:**  
Menos CLS e carregamento mais estável.

---

### 🛠️ Prompt #12 — Revisão final pixel-perfect (checklist de fidelidade)

**Objetivo:**  
Fechar todos os detalhes visuais comparando seção por seção com \`docs/HOME-PORTFOLIO-LAYOUYT.jpg\`.

**Ações:**
1. Comparar HOME:
   - header/nav
   - hero (orb + título + subtítulo + CTA)
   - manifesto/vídeo
   - portfolio showcase (categorias)
   - grid de projetos + “like what you see?”
   - brands bar + contato + footer
2. Comparar PORTFOLIO:
   - header/hero banner
   - “portfolio showcase” + CTA
   - área de projetos + “veja mais”
   - brands + contato + footer
3. Ajustar apenas Tailwind spacing/typography/positioning e motion timing (sem mudar conteúdo textual).

**Resultado esperado:**  
HOME e PORTFOLIO indistinguíveis da referência.
`;

export default HOME_PORTFOLIO_AUDIT_MD;

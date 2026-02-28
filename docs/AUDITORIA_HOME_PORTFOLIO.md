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

// código completo revisado aqui, e completo com os arquivos corrigidos e os arquivos que não precisou de correção. Todo material completo
// (arquivo ou arquivos prontos para colar no projeto)

// ============================================================================
// file: docs/copilot-playbook-portfoliodanilo.md
// ============================================================================

/*
# 🧠 Playbook de Prompts Corretivos — portfoliodanilo.com

**Stack alvo:** Next.js App Router (TS) + React + Tailwind + Framer Motion + React Three Fiber + Lenis  
**Escopo:** Páginas `Home`, `Sobre`, `Portfolio Showcase` + componentes compartilhados  
**Objetivo:** Fornecer prompts *atômicos* e encadeados para agentes Copilot/autônomos corrigirem e alinharem o código ao Ghost Design System e aos protótipos canônicos (HOME, SOBRE, PORTFOLIO).

---

## 0. Convenções Gerais

- **Formato de cada prompt:**
  - **ID**: identificador único, ex: `P-GLOBAL-01`
  - **Objetivo:** o que esse passo deve alcançar
  - **Contexto mínimo:** arquivos e docs de referência
  - **Prompt para o agente:** texto pronto para colar no Copilot/autônomo

- **Regras globais para todos os prompts:**
  - Nunca remover funcionalidades existentes sem motivo explícito.
  - Sempre manter tipagem TypeScript estrita (`strict`).
  - Seguir padrões do Ghost Design System: cores, tipografia fluida, grid 4/8/12, motion editorial silenciosa.
  - Respeitar `prefers-reduced-motion` em qualquer animação.
  - Manter acessibilidade (WCAG 2.1 AA) como requisito não-negociável.

---

## 1. Diagnóstico & Contexto Global

### P-GLOBAL-01 — Leitura de Documentação Canônica

**Objetivo:** Garantir que o agente entenda a visão geral e os protótipos.

**Prompt para o agente:**

Você é um agente Copilot responsável por alinhar o projeto `portfoliodanilo.com` ao Ghost Design System.

1. Localize e leia cuidadosamente os seguintes documentos de especificação (no próprio repositório ou anexos externos):
   - **HOME** — `HOME_-_PROTOTIPO_INTERATIVO.pdf`
   - **SOBRE** — `SOBRE-PROTOTIPO-INTERATIVO.pdf`
   - **PORTFOLIO** — `PORTFOLIO_-_PROTOTIPO_INTERATIVO.pdf`
2. Extraia, em um comentário próprio, um resumo em bullet points contendo:
   - Seções principais de cada página.
   - Regras de grid (4/8/12), tipografia fluid, cores, animação e acessibilidade.
3. Não faça modificações de código neste passo. Apenas crie ou atualize um arquivo de notas internas:
   - `docs/IMPLEMENTATION_NOTES.md` (ou similar existente).
   - Se o arquivo não existir, crie-o com esse resumo.

---

### P-GLOBAL-02 — Mapa de Arquivos Reais vs Protótipos

**Objetivo:** Mapear onde cada seção está implementada no código.

**Prompt para o agente:**

Você deve mapear o código atual para as seções descritas nos protótipos.

1. Escaneie as rotas do App Router em `src/app`:
   - `src/app/page.tsx` (Home)
   - `src/app/sobre/page.tsx`
   - `src/app/portfolio/page.tsx`
2. Para cada página, identifique quais componentes são usados:
   - Home: componentes em `src/components/home/**`.
   - Sobre: componentes em `src/components/sobre/**`.
   - Portfolio: componentes em `src/components/portfolio/**`.
3. Atualize `docs/IMPLEMENTATION_NOTES.md` com uma tabela:

   - Colunas: **Página**, **Seção protótipo**, **Componente(s)**, **Arquivo**.
   - Exemplo de linha:
     - `Home | Hero (Ghost + CTA "step inside") | <HomeHero /> | src/components/home/hero/HomeHero.tsx`

4. Não altere nenhum layout ainda; apenas documente o mapeamento real.

---

### P-GLOBAL-03 — Checklist de Stack & Dependências

**Objetivo:** Confirmar que as dependências necessárias estão instaladas e atualizadas.

**Prompt para o agente:**

Valide se o projeto tem todas as dependências necessárias e compatíveis com o Ghost Design System.

1. Abra `package.json` e verifique:
   - `next` (>= 14, preferencialmente 15).
   - `react` (>= 18.3).
   - `typescript` (>= 5.x).
   - `tailwindcss` (>= 3.4).
   - `framer-motion`.
   - `@react-three/fiber`, `@react-three/drei`.
   - `@studio-freight/lenis` (ou similar para smooth scroll).
2. Se alguma versão estiver muito desatualizada em relação às especificações, apenas registre isso em `docs/IMPLEMENTATION_NOTES.md` sob a seção “TODO: upgrade de stack”.
3. Não faça upgrades automáticos neste passo.

---

## 2. Design System Global (Cores, Tipografia, Grid)

### P-DS-01 — Cores & Tokens no Tailwind

**Objetivo:** Garantir que a paleta Ghost esteja declarada como tokens Tailwind.

**Prompt para o agente:**

Implemente a paleta de cores Ghost Design no `tailwind.config.ts` e garanta que seja usada globalmente.

1. Abra `tailwind.config.ts`.
2. Na seção `theme.extend.colors`, adicione (ou alinhe) os tokens abaixo, usando os valores dos protótipos:

   - `bluePrimary: "#0048ff"`
   - `blueAccent: "#4fe6ff"`
   - `purpleDetails: "#8705f2"`
   - `pinkDetails: "#f501d3"`
   - `background: "#040013"`
   - `backgroundLight: "#f0f0f0"`
   - `text: "#fcffff"`
   - `textInverse: "#0e0e0e"`
   - `textEmphasis: "#2E85F2"`
   - `textHighlight: "#4fe6ff"`
   - `textSecondary: "#a1a3a3"`
   - `surface: "#0b0d3a"`
   - `neutral: "#0b0d3a"`
   - `neutralLight: "#F5F5F5"`

3. Substitua usos “hard-coded” de hex em componentes principais (Home, Sobre, Portfolio, Header, Footer, Contact, Clients) por classes correspondentes a esses tokens.
4. Não altere a semântica visual além das cores; o objetivo é apenas tokens consistentes.

---

### P-DS-02 — Tipografia Fluida com Tokens

**Objetivo:** Configurar tipografia fluida alinhada à documentação.

**Prompt para o agente:**

Garanta que a tipografia fluida do Ghost System esteja definida e utilizada.

1. Abra `src/app/globals.css` e:
   - Adicione as variáveis CSS:

     - `--font-display`, `--font-h1`, `--font-h2`, `--font-h3`, `--font-body`, `--font-small`, `--font-micro` conforme especificado.
2. Em `tailwind.config.ts`, mapeie `fontSize` customizado:

   - `display`, `h1`, `h2`, `h3`, `body`, `small`, `micro` usando `clamp` conforme os protótipos.
3. Verifique nos componentes de Home, Sobre e Portfolio se títulos e textos estão utilizando classes (`text-display`, `text-h1`, `text-h2`, `text-body`, etc.).
   - Quando encontrar tamanhos fixos (ex: `text-4xl`, `text-6xl`) em seções principais, substitua por tokens sem quebrar layout.
4. Centralize qualquer utilitário repetido de tipografia em uma camada global (`@layer base`) se ainda não existir.

---

### P-DS-03 — Ghost Grid 4/8/12

**Objetivo:** Alinhar containers e seções ao grid Ghost.

**Prompt para o agente:**

Implemente o Ghost Grid (4/8/12 colunas) como padrão nas três páginas principais.

1. Crie um componente de **Container** reutilizável, se ainda não existir, em:
   - `src/components/layout/Container.tsx`
2. O componente deve renderizar um `div` com:
   - `className="w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24"`
   - Aceitar `className` adicional via props e combinar com `cn`.
3. Atualize as seções principais da Home, Sobre e Portfolio para usar:
   - `<Container>` + `grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-8` nas seções de conteúdo principais.
4. Em cada seção, ajuste `col-span` dos blocos para respeitar o layout indicado nos protótipos (por ex., hero texto 6 colunas, mídia 6 colunas em desktop).

---

## 3. Home — Hero, Manifesto, Portfolio Showcase, Featured Projects

### P-HOME-HERO-01 — Hero Layout & CTA “step inside”

**Objetivo:** Garantir que o hero da Home siga o layout Ghost + CTA.

**Prompt para o agente:**

Alinhe o hero da Home ao protótipo canônico.

1. Abra `src/components/home/hero/HomeHero.tsx` (ou componente equivalente usado em `src/app/page.tsx`).
2. Compare com o protótipo HOME:
   - Fundo escuro (`background`), fantasma/halo WebGL ou vídeo ao fundo.
   - Headline em duas linhas (desktop) / três linhas (mobile):  
     - “Você não vê o design.”  
     - Sub: “Mas ele vê você.”
   - Tag `[BRAND AWARENESS]`.
   - CTA em pílula: **“step inside →”** com pill azul + círculo com seta.
3. Ajuste o layout usando o Ghost Grid:
   - Mobile: tudo centralizado (`flex-col items-center text-center`).
   - Desktop: texto e canvas lado a lado (`lg:grid-cols-12`, texto ocupando 5–6 colunas).
4. Garanta que o CTA seja um `<button>` ou `<a>` semanticamente correto, com:
   - Classe base para pill azul (usando `bluePrimary`).
   - Animação hover com Framer Motion: leve `scale` e `y:-1`.

---

### P-HOME-HERO-02 — Animação de Entrada do Hero (Framer Motion)

**Objetivo:** Aplicar motion editorial de entrada para o bloco de texto.

**Prompt para o agente:**

Implemente animação de entrada suave no texto do hero.

1. No componente de hero da Home, envolva o bloco de texto principal (`tag + headline + sub + CTA`) em um `<motion.div>`.
2. Use o padrão:

   - `initial={{ opacity: 0, scale: 0.92, y: 60, filter: "blur(10px)" }}`
   - `animate={{ opacity: 1, scale: [1.02, 1], y: 0, filter: "blur(0px)" }}`
   - `transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}`

3. Respeite `useReducedMotion` (hook já existente ou crie com `framer-motion`):
   - Se `shouldReduceMotion` for verdadeiro, reduza a animação para um simples fade (`opacity` 0 → 1) sem `y`/`scale`.
4. Garanta que não existam animações infinitas no texto do hero após a entrada.

---

### P-HOME-MANIFESTO-01 — Seção de Vídeo Manifesto

**Objetivo:** Implementar/alinhar a seção de vídeo manifesto logo abaixo do hero.

**Prompt para o agente:**

Alinhe a seção de vídeo manifesto da Home.

1. Localize o componente de manifesto em `src/components/home/**` (ex: `VideoManifesto.tsx`).
   - Se não existir, crie um novo componente e importe em `src/app/page.tsx` após o Hero.
2. Estruture a seção conforme o protótipo:
   - Full-width (`w-screen`), `aspect-[16/9]` em desktop.
   - `video` com `autoPlay`, `loop`, `muted`, `playsInline`, `preload="metadata"`.
   - Overlay radial para garantir leitura de texto (`radial-gradient` especificado).
3. Adicione texto sobreposto no canto inferior esquerdo:
   - “Showreel 2025”
   - “Strategy • Branding • Motion”
4. Adicione um pequeno botão para togglar som (mute/unmute), com:
   - Ícone textual/visual, `aria-pressed` e `aria-label` apropriados.
5. Use `IntersectionObserver` (ou hook custom) para pausar/mutar o vídeo quando a seção sair da viewport.

---

### P-HOME-PORTFOLIO-01 — Seção “portfólio showcase” (Stripes)

**Objetivo:** Reproduzir as três faixas de categorias com look & feel editorial.

**Prompt para o agente:**

Atualize a seção “portfólio showcase” da Home.

1. Abra o componente em `src/components/home/portfolio-showcase/**`.
2. Garanta a estrutura:

   - Headline central: “portfólio showcase” (`portfólio` branco, `showcase` `bluePrimary`).
   - Label `[what we love working on]` à esquerda.
   - Três stripes/categorias:
     - `Brand & Campaigns`
     - `Videos & Motions`
     - `Web Campaigns, Websites & Tech`

3. Desktop:
   - Cada stripe com título grande alinhado conforme protótipo (esq/centro/dir).
   - Thumbnail expandindo em hover (largura animada de 0 → ~288px) com Framer Motion.
   - Clique no stripe deve navegar para `/portfolio?filter=[slug]` (slugs conforme protótipo).
4. Mobile:
   - Transformar stripes em cards empilhados, sem hover thumbnail, com ícone de seta à direita.
5. Adicione animação de scroll reveal com Framer Motion:
   - Container com `staggerChildren`.
   - Cada stripe com `initial={{ opacity: 0, y: 24 }}` e `whileInView={{ opacity: 1, y: 0 }}`.

---

### P-HOME-FEATURED-01 — Grid Bento de Projetos em Destaque

**Objetivo:** Ajustar o layout e motion dos projetos destacados na Home.

**Prompt para o agente:**

Alinhe a seção de Featured Projects à especificação do Bento Grid.

1. Localize o componente equivalente a Featured Projects em `src/components/home/featured-projects/**`.
2. Reestruture o grid para usar 12 colunas com o padrão:

   - Linha 1: card 1 (`md:col-span-5`), card 2 (`md:col-span-7`).
   - Linha 2: card 3 (`md:col-span-12`).
   - Linha 3: card 4 (`md:col-span-8`), CTA card (`md:col-span-4`).

3. Em cada `ProjectCard`:
   - Certifique-se que a imagem/vídeo use `object-cover` e ocupe o card inteiro.
   - Adicione overlay com título, meta (cliente • ano) e tags.
   - Aplique hover suave: `scale` leve na imagem, `translateX` na seta.
4. Implemente animação de entrada (scroll reveal) com `staggerChildren` no container da seção.

---

### P-HOME-FEATURED-02 — CTA “Like what you see?”

**Objetivo:** Implementar o card CTA no Bento Grid.

**Prompt para o agente:**

Crie/alinhe o CTA card “Like what you see?”.

1. Dentro de `FeaturedProjects`, identifique ou crie um `CTACard`.
2. Conteúdo:
   - Headline: **“Like what you see?”**
   - Botão: “view projects →” apontando para `/portfolio`.
3. Visual:
   - Fundo `background` escuro, bordas suaves.
   - Texto branco, em hover o texto muda para `#0057FF`, seta move levemente para a direita.
4. Animação:
   - Hover via Framer Motion em `whileHover={{ x: 4 }}` no botão/ícone.
   - Scroll reveal idêntico aos demais cards.

---

## 4. Seções Compartilhadas (Clientes, Contato, Footer)

### P-SHARED-CLIENTS-01 — Seção “marcas com as quais já trabalhei”

**Objetivo:** Alinhar grid de logos de clientes ao protótipo.

**Prompt para o agente:**

Ajuste a seção de clientes para o padrão Ghost.

1. Localize o componente de clientes, provavelmente em `src/components/home/clients/**` e reutilizado em Sobre/Portfolio.
2. Garanta:
   - Fundo `bluePrimary`.
   - Headline centralizada: “marcas com as quais já trabalhei.” em texto branco.
   - Grid responsiva de 2–3 colunas em mobile; 6+ colunas em desktop.
3. Todos os logos devem:
   - Usar imagens SVG monocromáticas (via Supabase).
   - Ter `alt="Logo da empresa [nome]"`.
   - Aplicar `filter: brightness(0) invert(1)` se o arquivo não for nativamente branco.
4. Adicione hover discreto em desktop (leve `scale` + `brightness` maior), mas desabilite ou reduza em `prefers-reduced-motion`.

---

### P-SHARED-CONTACT-01 — Padronização da Seção de Contato

**Objetivo:** Garantir que a seção de contato siga a especificação única.

**Prompt para o agente:**

Padronize a seção de contato nas páginas que a utilizam.

1. Localize o componente de contato (ex.: `src/components/home/contact/**`).
2. Compare com a especificação:
   - Título: “contato”.
   - Subheadline: “Tem uma pergunta ou quer trabalhar junto?”
   - Lista de contatos (tel, e-mails, portfólio) com links `tel:` e `mailto:`.
   - Ícones de redes (Instagram, Facebook, LinkedIn, Portfolio, Twitter) com `target="_blank"` + `rel="noopener noreferrer"`.
   - Formulário com campos Nome, Email, Telefone, Mensagem.
3. Extraia esse componente para algo compartilhado (`src/components/shared/ContactSection.tsx`) e reutilize em Home, Sobre, Portfolio, evitando duplicação.
4. Garanta validações mínimas:
   - `required` nos campos obrigatórios.
   - Mensagens de erro exibidas com alta legibilidade.
5. Estilize de forma que a transição do fundo escuro para a área clara seja suave, sem parecer “template genérico”; considere um topo com borda suave ou gradiente.

---

### P-SHARED-FOOTER-01 — Footer Fixo Desktop / Fluido Mobile

**Objetivo:** Ajustar comportamento do footer conforme especificação.

**Prompt para o agente:**

Ajuste o footer para ser fixo apenas em desktop e fluido em mobile.

1. Localize o footer em `src/components/layout/Footer.tsx` (ou equivalente).
2. Atualize o comportamento:
   - Desktop (`lg:`+): usar `fixed bottom-0 left-0 right-0 z-50`.
   - Mobile/tablet: footer deve ser parte normal do fluxo (sem `fixed`), garantindo margem inferior suficiente.
3. Conteúdo:
   - Navegação suplementar (home, portfólio showcase, sobre, contato).
   - Ícones sociais iguais aos da seção contato.
   - Texto de copyright: `© 2025 Danilo Novais Vilela — todos os direitos reservados`.
4. Aplique foco visível em todos os links (`focus-visible:ring` ou `outline` custom) e teste com teclado.

---

## 5. Página /sobre — Hero, Origem, Método, Manifesto

### P-SOBRE-HERO-01 — Hero com Vídeo + Manifesto

**Objetivo:** Reproduzir o hero da página Sobre conforme protótipo.

**Prompt para o agente:**

Alinhe o hero da página `/sobre`.

1. Abra `src/app/sobre/page.tsx` e os componentes em `src/components/sobre/**`.
2. Garanta a estrutura:
   - Vídeo background (`HeroSobre.mp4` / `HeroSobreMobile.mp4`) com `object-cover`.
   - Overlay gradiente (`from-background/90 to-background/40` em desktop, vertical em mobile).
   - Texto manifesto à direita (desktop) / abaixo (mobile):
     - H1: “Sou Danilo Novais.”
     - Manifesto H1 multiline: “Você não vê tudo o que eu faço. Mas sente quando funciona.”
     - Subheading com descrição de design que observa, entende e guia experiências.
3. Aplique layout:
   - Desktop: grid 12 colunas, com texto ocupando colunas 7–12.
   - Mobile: vídeo em ~50vh e texto em `px-6 py-12` abaixo.
4. Adicione animação de entrada linha-a-linha no manifesto, conforme especificação (stagger entre linhas).

---

### P-SOBRE-ORIGEM-01 — Seção “Origem Criativa” (Desktop Pin + Mobile Stack)

**Objetivo:** Implementar a seção Origem com transições visuais coerentes.

**Prompt para o agente:**

Ajuste a seção “Origem” na página Sobre.

1. Localize o componente em `src/components/sobre/**` relacionado à narrativa de origem.
2. Desktop:
   - Use `grid-cols-12`: textos em 6 colunas à esquerda, imagens pinned em 6 colunas à direita.
   - Utilize `position: sticky; top: 6rem` para a coluna de imagens.
   - Cada bloco de texto com título em `bluePrimary` (ex: “O QUE PERMANECE”) e parágrafo alinhado conforme protótipo.
3. Mobile:
   - Stack vertical: bloco de texto seguido da imagem correspondente.
   - Imagens com `w-full rounded-2xl` e `loading="lazy"`.
4. Se GSAP já estiver integrado, mantenha apenas animações leves de `clip-path`/`opacity` conforme documentação.
   - Se não houver GSAP configurado, foque em scroll reveal simples com Framer Motion (evitar introduzir nova dependência só para isso).

---

### P-SOBRE-WHATIDO-01 — Seção “O Que Eu Faço” (Cards Horizontais)

**Objetivo:** Implementar as barras de serviços numerados.

**Prompt para o agente:**

Ajuste/implemente a seção “O Que Eu Faço”.

1. Identifique o componente correspondente em `src/components/sobre/**` (ex: `AboutWhatIDo.tsx`).
2. Desktop:
   - Crie um container horizontal (`flex-row`) de cards com `min-w-[320px]`, `min-h-[140px]`, `bg-bluePrimary`.
   - Cada card com número grande em `purpleDetails` e texto com palavra-chave em `blueAccent`.
3. Mobile:
   - Empilhe os cards verticalmente, largura 100%.
   - Animação de entrada com Framer Motion (`x: 80 → 0`, `opacity: 0 → 1`).
4. Certifique-se de que o conteúdo textual dos 7 itens corresponde ao documento canônico (Direção criativa, Design estratégico, Identidades, etc.).

---

### P-SOBRE-METHOD-01 — Seção “Como Eu Trabalho” (Vídeo + Lista)

**Objetivo:** Reproduzir a seção de método com vídeo background.

**Prompt para o agente:**

Implemente corretamente a seção “Criatividade com método. Impacto sem ruído”.

1. Localize o componente em `src/components/sobre/**` (ex: `AboutMethod.tsx`).
2. Estrutura:
   - Seção `relative` com vídeo background em `absolute inset-0`.
   - Overlay gradiente `bg-gradient-to-r` com opacidades especificadas.
   - Grid 12 colunas com conteúdo textual em 7 colunas à esquerda.
3. Conteúdo:
   - Título com destaques em `bluePrimary`.
   - Parágrafos introdutórios.
   - Lista numerada de 6 pontos, cada um em um card semitransparente com `backdrop-blur`.
4. Aplique animações:
   - Título e parágrafos com `whileInView` fade-up.
   - Cards com `staggerChildren`.
   - Respeite `prefers-reduced-motion`.

---

### P-SOBRE-BELIEFS-01 — Seção “O Que Me Move” + Ghost Interativo

**Objetivo:** Implementar o manifesto final com frases rotativas e ghost.

**Prompt para o agente:**

Finalize a página Sobre com a seção “O Que Me Move”.

1. Identifique/crie o componente (ex: `AboutBeliefs.tsx`).
2. Estrutura:
   - Título central fixo (“Acredito no design que muda o dia de alguém...”).
   - Bloco de frases rotativas (6 frases com palavras em `bluePrimary`).
   - Bloco final com Ghost interativo à esquerda e texto “ISSO É GHOST DESIGN.” à direita (ou coluna em mobile).
3. Frases rotativas:
   - Use `useState` + `useEffect` para trocar a frase a cada ~4.2s.
   - Envolva com `AnimatePresence` e animação de entrada/saída vertical suave.
4. Ghost:
   - Implementar leve animação de flutuação e movimento de olhos seguindo o cursor (desktop).
   - Desativar tracking de cursor em `prefers-reduced-motion` ou em devices touch, mantendo apenas flutuação sutil.

---

## 6. Página /portfolio — Hero Vídeo + Parallax Lerp + Modal

### P-PORT-HERO-01 — Hero Vídeo da Página Portfolio

**Objetivo:** Implementar hero com vídeo loop conforme protótipo.

**Prompt para o agente:**

Alinhe o hero da página `/portfolio`.

1. Abra `src/app/portfolio/page.tsx` e componentes relacionados em `src/components/portfolio/**`.
2. Garanta:
   - `section` com `relative h-screen overflow-hidden`.
   - `video` fullscreen com `autoPlay`, `loop`, `muted`, `playsInline`.
   - Overlay `bg-gradient-to-b from-black/60 via-black/40 to-black/60`.
   - Headline central: `portfólio` (em `bluePrimary`) + `showcase` (branco).
   - CTA “vamos trabalhar juntos” chamando seção de contato ou `/sobre#contact`.
3. Ajuste responsividade para mobile (título menor, CTA reduzido) preservando o impacto.

---

### P-PORT-GALLERY-01 — Hook de Parallax Lerp

**Objetivo:** Implementar hook `useParallax` para controlar o gallery track.

**Prompt para o agente:**

Implemente o parallax lerp da galeria de projetos.

1. Crie o hook `useParallax.ts` em `src/hooks/useParallax.ts`.
2. Baseie-se no pseudocódigo fornecido no documento canônico:
   - `galleryRef`, `trackRef`, `cardsRef`, `rafRef`, `startYRef`, `endYRef`, `lerp`, `updateScroll`, `startScroll`.
3. Exponha do hook:
   - `galleryRef`, `trackRef`, `cardsRef`, e uma função `registerCardRef(index)` para associar refs de cada card.
4. No componente de galeria (`src/components/portfolio/ProjectsGallery.tsx`), conecte o hook:
   - Envolva a `<section>` com `ref={galleryRef}`.
   - Use `ref={trackRef}` no container fixo.
   - Passe `ref={registerCardRef(index)}` para cada `ProjectCard`.
5. Garanta que o `requestAnimationFrame` seja corretamente limpo no `useEffect` de cleanup.

---

### P-PORT-GALLERY-02 — Layout da Gallery Track & Responsividade

**Objetivo:** Alinhar o layout do grid da galeria.

**Prompt para o agente:**

Atualize o layout da gallery track no Portfolio.

1. Configure o container track como:

   - `className="gallery-track fixed top-0 left-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[0.25rem] p-[0.25rem]"`.

2. Em mobile (`<768px`), mantenha 1 coluna; tablet 2 colunas; desktop 3 colunas.
3. Garanta que a altura da `<section ref={galleryRef}>` seja dinamicamente ajustada para o `clientHeight` da track, evitando cortes de scroll.
4. Teste com 10+ cards para garantir que o scroll está fluido e sem “pulos”.

---

### P-PORT-CARD-01 — Componente `ProjectCard` com Parallax Interno

**Objetivo:** Implementar card visual com parallax interno da imagem.

**Prompt para o agente:**

Ajuste/implemente o componente `ProjectCard`.

1. Crie/edite `src/components/portfolio/ProjectCard.tsx` para aceitar `project` (interface `Project` fornecida no doc).
2. Estrutura:
   - `div.card` relativo, altura ~`h-[400px]` desktop / ajustada em mobile.
   - `div.card-image-wrapper` absoluto, `h-[135%]`, com `overflow-hidden`.
   - `<img>` ou `<Image>` com `object-cover`, `loading="lazy"`.
   - Overlay com título, meta (cliente • ano) e tags na base.
3. Exponha uma `ref` para o wrapper do card, usada pelo parallax hook para aplicar `translateY` na imagem interna baseada na posição na viewport.
4. Aplique hover suave (desktop):
   - Leve `translateY(-4px)` e `box-shadow` sutil.
   - Overlay `opacity` de 0 → 1.

---

### P-PORT-MODAL-01 — Modal de Projeto (Tipos A e B) com Timeline de Motion

**Objetivo:** Implementar modal acessível seguindo timeline de animação.

**Prompt para o agente:**

Implemente o modal de projeto com AnimatePresence.

1. Crie/edite `src/components/portfolio/PortfolioModal.tsx` com:
   - `role="dialog"`, `aria-modal="true"`.
   - Recebendo `project` (`Project`) e `onClose`.
   - Uso de `AnimatePresence` para entrada/saída.
2. Siga a timeline:
   - Backdrop: `opacity 0 → 1` em ~180ms.
   - Container: escala/translate + fade de 120ms a 380ms.
   - Pausa lógica (nenhuma animação) até ~520ms.
   - Mídia principal fade-in (520–760ms).
   - Título (760–960ms).
   - Meta (960–1120ms).
   - Conteúdo secundário com `stagger` (1120–1500ms).
3. Implemente dois tipos de layout interno:
   - Tipo A (Zoom viewer): foco em uma única peça visual.
   - Tipo B (Case): hero + coluna de informações + galeria.
4. Bloqueie scroll do body enquanto o modal estiver aberto e restaure ao fechar.
5. Adicione handlers para:
   - Fechar com ESC.
   - Fechar clicando no backdrop (apenas se `e.target === e.currentTarget`).
   - Gerenciar foco: ao abrir, foco no botão de fechar; ao fechar, foco volta ao card original.

---

## 7. Acessibilidade, Motion & Performance

### P-A11Y-01 — Focus Visible & Navegação por Teclado

**Objetivo:** Garantir foco visível e operabilidade via teclado.

**Prompt para o agente:**

Implemente foco visível e navegação por teclado consistente.

1. Verifique todos os componentes interativos (links, botões, cards clicáveis, ícones sociais, CTA pills).
2. Garanta:
   - `tabIndex={0}` em cards clicáveis e `role="button"` quando necessário.
   - Handlers de `onKeyDown` para Enter/Espaço imitarem `onClick` quando apropriado.
3. Aplique estilos globais em `globals.css`:

   - `*:focus-visible` com outline ou `ring` bem perceptível, em `bluePrimary`/`blueAccent`.

4. Teste manualmente com Tab/Shift+Tab na Home, Sobre e Portfolio.

---

### P-A11Y-02 — `prefers-reduced-motion` Global

**Objetivo:** Garantir respeito a pessoas que preferem menos movimento.

**Prompt para o agente:**

Aplique suporte a `prefers-reduced-motion` em animações-chave.

1. Em `globals.css`, adicione um bloco:

   - `@media (prefers-reduced-motion: reduce) { ... }` desativando animações complexas.

2. Nos componentes que utilizam Framer Motion (Hero, stripes, cards, modal, ghost etc.):
   - Use `useReducedMotion` e ajuste a animação:
     - Remova `y`, `scale`, `rotate` quando `shouldReduceMotion` for `true`.
     - Mantenha apenas transições de opacidade rápidas.
3. Evite qualquer parallax ou movimento contínuo quando `prefers-reduced-motion` for ativo.

---

### P-PERF-01 — Lazy Loading de Imagens e Vídeos

**Objetivo:** Otimizar carregamento inicial.

**Prompt para o agente:**

Otimize o carregamento de mídias em todo o site.

1. Substitua `<img>` por `next/image` onde apropriado (`import Image from "next/image"`), configurando `sizes` e `srcSet` de acordo com o tamanho esperado.
2. Garanta que:
   - Imagens fora do viewport inicial usem `loading="lazy"` ou `priority={false}`.
   - O vídeo manifesto e o hero de portfolio sejam carregados via IntersectionObserver quando próximos da viewport (não imediatamente no FCP).
3. Em elementos WebGL/Three mais pesados:
   - Use `dynamic(import(...), { ssr: false, loading: (...) => <div className="bg-background" /> })`.
   - Limite o pixel ratio e desabilite pós-processamento em mobile.

---

## 8. QA & Finalização

### P-QA-01 — Checklist de Regressão Visual

**Objetivo:** Garantir que as alterações não quebrem layout.

**Prompt para o agente:**

Rode um checklist visual após aplicar as correções.

1. Execute o projeto em desenvolvimento (`npm dev` ou equivalente).
2. Teste manualmente nos breakpoints:
   - 375px (mobile), 768px (tablet), 1440px (desktop), 1600px+ (wide).
3. Verifique:
   - Hero da Home, Sobre e Portfolio alinhados ao protótipo.
   - “portfólio showcase” e Featured Projects mantendo o ritmo editorial.
   - Seções de contato e footer coerentes com Ghost System.
4. Documente qualquer discrepância residual em `docs/IMPLEMENTATION_NOTES.md` com prioridade (Alta/Média/Baixa).

---

### P-QA-02 — Lighthouse & A11y Quick Pass

**Objetivo:** Medir rapidamente performance e acessibilidade.

**Prompt para o agente:**

Rode uma auditoria rápida com Lighthouse (no Chrome devtools) para a Home, Sobre e Portfolio.

1. Para cada página:
   - Gere relatórios de Performance, Acessibilidade, Best Practices e SEO.
   - Capture os scores e copie para uma seção “Lighthouse Snapshot” em `docs/IMPLEMENTATION_NOTES.md`.
2. Se houver violações de acessibilidade óbvias (contraste, labels, foco), abra TODOs em comentários no código relevante e priorize correções nos próximos ciclos.

---

## 9. Como Usar Este Playbook

1. **Passo 1:** Rodar `P-GLOBAL-01`, `P-GLOBAL-02`, `P-GLOBAL-03` para alinhar contexto.
2. **Passo 2:** Aplicar `P-DS-*` (Design System) para garantir base sólida.
3. **Passo 3:** Corrigir Home com `P-HOME-*`.
4. **Passo 4:** Corrigir Sobre com `P-SOBRE-*`.
5. **Passo 5:** Implementar Portfolio Showcase completo com `P-PORT-*`.
6. **Passo 6:** Unificar seções compartilhadas com `P-SHARED-*`.
7. **Passo 7:** Consolidar A11y e Performance com `P-A11Y-*` e `P-PERF-*`.
8. **Passo 8:** Finalizar com QA (`P-QA-*`).

Cada prompt é atômico o suficiente para ser colado diretamente em um agente Copilot/autônomo, que deverá seguir as instruções e aplicar as correções no repositório.

*/
---

Pronto! Agora seu ghost está configurado para:

- ✅ Revelar o texto ao passar por cima.
- ✅ Ter olhos visíveis e pulsantes.
- ✅ Ter efeitos de scanlines, grain e CRT.
- ✅ Ter o visual idêntico ao do CodePen.

Se quiser, posso te ajudar a integrar os outros componentes como `Fireflies`, `Particles`, etc., para deixar tudo completo. Me avise! 🎃✨

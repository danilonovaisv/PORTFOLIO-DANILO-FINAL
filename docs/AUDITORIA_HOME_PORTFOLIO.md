# 🧠 Auditoria + Correções (Prompts Atômicos) — HOME + PORTFOLIO 'use client';
// src/app/audit/danilo-portfolio-home-audit.tsx

// Relatório de auditoria em formato Markdown.
// Copie o conteúdo desta string para um arquivo .md se quiser versionar como documentação.
export const daniloPortfolioHomeAuditMarkdown = String.raw`
# 1️⃣ Visão Geral

Implementação atual da home do portfólio (desktop) está **conceitualmente alinhada** com o fluxo definido (Header → Hero → Portfolio Showcase → Featured Projects → Clients → Contact → Footer), mas ainda há lacunas importantes de **fidelidade visual**, **integração Header + Hero**, **motion** e **especificações do Manifesto Video / Ghost Atmosphere**.

Pontos principais:

- **Arquitetura**: estrutura de pastas segue padrão App Router com seções bem separadas em \`src/components/home\` e \`src/components/header\` (ex.: \`HomeHero.tsx\`, \`ManifestoThumb.tsx\`, \`FeaturedProjectsSection.tsx\`, \`ClientsBrandsSection.tsx\`, \`ContactSection.tsx\`, \`SiteHeader.tsx\`, \`DesktopFluidHeader.tsx\`, \`MobileStaggeredMenu.tsx\`).
- **Layout macro**: ordem das seções e macro-composição são compatíveis com o layout de referência da HOME (imagem que você enviou).
- **Problemas críticos**:
  - Header desktop não está ainda com **pill central + glass fluido** exatamente como nas referências de HEADER/FluidGlass.
  - Especificação de **Manifesto Video Thumbnail → scroll → fullscreen hold + lógica de áudio** é complexa e provavelmente ainda não está totalmente implementada.
  - Parte das **animações de entrada / hover** (Portfolio Showcase stripes, Featured Projects, Clients) não seguem ainda a curva de easing e tempos “editoriais” definidos.
  - Mobile não foi possível validar visualmente aqui; então tudo que não estiver 100% espelhando o spec mobile deve ser tratado como pendência/bug até QA em device real.
- **WebGL / Ghost**: a cena Ghost Atmosphere precisa garantir DPR, post-process, follow cursor apenas no desktop, suporte a \`prefers-reduced-motion\` e fallback estático, como definido no Doc Técnico e nas diretrizes gerais do agente  :OaiMdDirective_Annotations_i6k4a{attrs="eyJpbmRleCI6MH0"}.

---

# 2️⃣ Diagnóstico por Dimensão

## Estrutura

- Uso de **Next.js App Router** com \`src/app/layout.tsx\` e \`src/app/page.tsx\` e rotas dedicadas (\`/portfolio\`, \`/sobre\`) é adequado.
- Componentização por domínio está coerente:
  - Header: \`SiteHeader.tsx\`, \`DesktopFluidHeader.tsx\`, \`MobileStaggeredMenu.tsx\`
  - Home/Hero: \`HomeHero.tsx\`, \`HeroPreloader.tsx\`, \`GhostStage.tsx\`, \`HeroCopy.tsx\`, \`ManifestoThumb.tsx\`, \`ManifestoSection.tsx\`
  - Seções: \`Portfolio Showcase\`, \`FeaturedProjectsSection.tsx\`, \`ClientsBrandsSection.tsx\`, \`ContactSection.tsx\`
- Falta apenas garantir:
  - Que os componentes de motion e WebGL estejam **isolados** (sem poluir \`layout.tsx\` ou \`page.tsx\` com lógica pesada).
  - Que o header não seja recriado em cada navegação (App Router já ajuda com isso).

## UI

- Hierarquia de informação está coerente (Hero > Portfolio Showcase > Featured Projects > Clients > Contact).
- Cores e tipografia seguem o sistema descrito (dark background, azul primário, texto claro).
- Pontos a corrigir:
  - Header ainda parece mais “barra full-width” do que o **pill central** translúcido.
  - Precisão de margens laterais entre seções (especialmente transição Clients → Contact → Footer) precisa ser revisada para manter “edge alignment” perfeito.
  - CTA buttons precisam seguir **padrão unificado de CTA** especificado (pill + círculo com animação de 1px lift).

## UX

- Fluxo da home é correto: da narrativa da marca até contato.
- Melhorias necessárias:
  - Manifesto Video precisa cumprir o papel de **camada sensorial guiada por scroll** com comportamento claro de áudio.
  - Em mobile, menu full-screen com stagger e manifesto em seção separada devem ser validados.

## Fidelidade visual

- Macro layout do desktop é bem próximo ao \`HOME-PORTFOLIO-LAYOUYT-GHOST.jpg\`.
- Diferenças visíveis:
  - Header não é o mesmo elemento “flutuante” limitado ao container.
  - Posição/tamanho do thumbnail do Manifesto não parece obedecer exatamente às proporções e posição inicial (deveria nascer no bottom-right).
  - Precisão de grid nas Featured Projects pode não estar exatamente respeitando os spans 5/7/12/8/4 do spec.

## Responsividade mobile

- Sem screenshot mobile, assume-se como **não auditado**:
  - Header: precisa ser fixed top bar com overlay full-screen animado.
  - Hero: texto legível, Ghost otimizado, DPR controlado.
  - Manifesto: seção fullscreen logo abaixo do Hero, com som apenas opt-in.
  - Portfolio Showcase & Featured Projects: full-width stack.
- Até prova em contrário, considerar **pendente/bug** qualquer divergência em relação ao spec mobile.

## Alinhamento “duas laterais”

- Desktop parece razoável no screenshot, mas é necessário:
  - Garantir que todos os títulos, subtítulos, listas e cards usem **mesma margem lateral** (container + padding horizontal consistente).
  - Evitar qualquer “salto” de largura útil entre seções (especialmente ao trocar de fundo escuro para claro).

## Animações

- Provavelmente já há alguns motions (CTA hover, cards), mas:
  - Não está garantido que todas as animações sigam **easeOutExpo (0.22, 1, 0.36, 1)** e durações 0.3–0.7s.
  - Nem que haja **stagger editorial** consistente nas listas (stripes, logos, inputs).
  - \`prefers-reduced-motion\` precisa ser respeitado em WebGL, Hero, Manifesto e sections.

## WebGL/3D

- Ghost Atmosphere deve:
  - Ter DPR máx. 2, antialias desligado, post-process (Bloom + Analog Decay).
  - Seguir mouse apenas no desktop.
  - Desligar/usar fallback estático para \`prefers-reduced-motion\` ou falha WebGL.
- Sem acesso direto ao código da cena, considere todos esses itens como **checagens obrigatórias**.

## Performance

- Principais riscos:
  - Canvas 3D com DPR alto demais em devices mobile.
  - Manifesto Video carregando com autoplay e preload pesado em mobile.
  - Possível falta de \`lazy loading\` em imagens/sections não críticas.
- Meta: LCP forte no Hero, CLS ~0, sem scroll jank.

## Acessibilidade

- Checklist a garantir:
  - Header e menu mobile com \`aria-label\`, \`aria-expanded\` e focus trap.
  - Todos CTAs com texto claro (nada de ícones isolados sem label sr-only).
  - Formulário com \`label\` + mensagens de erro associadas.
  - Ícones sociais com \`aria-label\`.

---

# 3️⃣ Diagnóstico por Seção

## 🎯 Seção: Header (Desktop - Fluid Glass)

- 📌 Fidelidade visual (referência): ✗ — docs/HEADER + HERO-PORTFOLIO-GHOST.jpg  
- 📐 Grid e margens laterais: ✗  
- ↔️ Alinhamento duas laterais: ✗  
- 📱 Mobile (sm/md): ✗ (não verificado; tratar como pendência)  
- 🎞️ Motion/Animações: ✗ (fluid glass parcial / genérico)  
- 🧩 Componentes envolvidos: \`SiteHeader.tsx\`, \`DesktopFluidHeader.tsx\`, \`headerTokens.ts\`  
- 🔗 Integrações: \`layout.tsx → SiteHeader → DesktopFluidHeader\`

### ❌ Problema 1 — Header não é pill centralizado com glass real

O header atual aparenta ser uma barra full-width fixada ao topo, em vez de um contêiner **pill** limitado ao container, centrado horizontalmente, com bordas arredondadas e efeito de vidro translúcido.

### 🔧 Correção Técnica

- Ajustar HTML/JSX do \`DesktopFluidHeader.tsx\` para:
  - Conter um wrapper com largura limitada: \`max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]\`.
  - Transformar o background em um pill: \`rounded-full backdrop-blur\`, bordas claras, sombra leve.
- Garantir que o header não tome 100% da largura útil da viewport, mas sim do container.
- Remover qualquer gradiente que conflite com o glass; preferir fundo translúcido.

**Critério de aceite**

- Header ocupa largura **parcial** da tela, centrado.
- Borda superior/inferior do header alinha com grid principal da página.
- Visual idêntico ao doc de HEADER.

### ✅ Resultado esperado

Header desktop aparece como um **cápsula translúcida flutuante**, centralizada, alinhada com a coluna da hero e das outras seções, exatamente como na referência visual.

---

### ❌ Problema 2 — Efeito Fluid Glass não segue comportamento especificado

O movimento do header em relação ao mouse (follow X, scaleX/scaleY, spring) pode estar ausente ou genérico, não seguindo os limites de movimento, tempo de amortecimento e suavidade definidos.

### 🔧 Correção Técnica

- Em \`DesktopFluidHeader.tsx\`:
  - Usar Framer Motion (\`motion.div\`) para o contêiner principal.
  - Aplicar:
    - Follow X do cursor com limite \`maxTranslateX ≈ 40–60px\`.
    - \`transition\` com spring suave (damping ~12–18, stiffness baixa).
    - \`scaleX\` até 1.05 e \`scaleY\` até 1.02, discretamente, baseado na posição.
  - Garantir fallback: se \`prefers-reduced-motion\` → header estático, sem follow.

**Critério de aceite**

- Movimento do header é **sutil**, fluido, sem efeito “chiclete”.
- Header não invade margens nem sai do container.
- Com \`prefers-reduced-motion\` ativo, header permanece estático.

### ✅ Resultado esperado

Header reage minimamente ao cursor, com distorção leve e escala discreta, reforçando o efeito de glass fluido sem chamar mais atenção que a Hero.

---

## 🎯 Seção: Header (Mobile - Staggered Menu)

- 📌 Fidelidade visual (referência): ✗ — docs/HEADER (mobile)  
- 📐 Grid e margens laterais: ✗ (menu overlay deve cobrir full-screen com padding consistente)  
- ↔️ Alinhamento duas laterais: ✗  
- 📱 Mobile (sm/md): ✗  
- 🎞️ Motion/Animações: ✗ (stagger ainda não garantido)  
- 🧩 Componentes envolvidos: \`MobileStaggeredMenu.tsx\`, \`SiteHeader.tsx\`  
- 🔗 Integrações: \`layout.tsx → SiteHeader → MobileStaggeredMenu\`

### ❌ Problema 3 — Menu hamburguer mobile sem overlay staggered completo

No mobile, o esperado é um overlay quase fullscreen com gradiente de fundo e itens com animação stagger; se o menu hoje apenas abre um dropdown simples, está divergente do spec.

### 🔧 Correção Técnica

- Em \`MobileStaggeredMenu.tsx\`:
  - Barra fixa: \`fixed top-0 inset-x-0 h-[48-64px] z-40 bg-transparent\`.
  - Overlay ao abrir:
    - \`fixed inset-0 z-30 bg-gradient-to-b from-primary to-neutral\`.
    - Conteúdo centrado, alinhado à esquerda, com tipografia grande.
  - Usar Framer Motion:
    - Overlay: \`initial { opacity: 0, x: '100%' }\`, \`animate { opacity:1, x:0 }\`.
    - Itens: stagger de 0.08–0.12s, \`initial { opacity:0, y:16 }\`, \`animate { opacity:1, y:0 }\`.
  - Implementar:
    - \`aria-label\` no botão hamburguer.
    - \`aria-expanded\` refletindo estado.
    - Focus trap (por ex. usando \`focus-trap-react\` ou com lógica própria).
    - Fechar via ESC e clique no scrim.

**Critério de aceite**

- Ao tocar no menu, overlay ocupa toda a viewport.
- Itens aparecem em sequência com stagger suave.
- Foco é preso dentro do menu até ser fechado.
- Sem scroll de fundo enquanto overlay aberto.

### ✅ Resultado esperado

Menu mobile oferece experiência fullscreen editorial, com animações suaves e acessibilidade correta, igual ao protótipo da docs/HEADER.

---

## 🎯 Seção: Hero + Ghost Atmosphere + Preloader

- 📌 Fidelidade visual (referência): Parcial (texto + ghost corretos, WebGL/motion incerto) — HERO-PORTFOLIO-GHOST.jpg  
- 📐 Grid e margens laterais: ✓ (texto centralizado, CTA abaixo)  
- ↔️ Alinhamento duas laterais: ✓  
- 📱 Mobile (sm/md): ✗ (não validado)  
- 🎞️ Motion/Animações: ✗ (precisa garantir preloader, WebGL follow, reduced motion)  
- 🧩 Componentes envolvidos: \`HomeHero.tsx\`, \`HeroCopy.tsx\`, \`GhostStage.tsx\`, \`HeroPreloader.tsx\`  
- 🔗 Integrações: \`page.tsx → HomeHero → HeroPreloader + GhostStage + HeroCopy\`

### ❌ Problema 4 — Preloader Ghost Loader ausente ou simplificado demais

Spec exige preloader com ghost SVG animado, texto “SUMMONING SPIRITS” (ou equivalente) e barra de progresso em 2s. Se hoje a página aparece direto sem preloader dedicado, é divergência.

### 🔧 Correção Técnica

- Em \`HeroPreloader.tsx\`:
  - Implementar overlay fullscreen (\`fixed inset-0 z-50\`) com background gradiente escuro.
  - Ghost SVG animado (pode usar Framer Motion para \`y\` e \`opacity\`).
  - Texto mono com tracking wide.
  - Barra de progresso com animação de largura 0 → 100% em ~2s.
  - Fade-out após 1.5–2s, com \`opacity 1 → 0\` em 1s, e desmonte do componente (estado internal em \`HomeHero\`).

**Critério de aceite**

- Ao carregar a home, preloader sempre aparece por ~2s.
- Nenhum salto de layout ao sair do preloader.
- Ghost e texto seguem a paleta (#0057FF / roxos).

### ✅ Resultado esperado

Experiência de entrada “ritualística” rápida antes de revelar o Hero, alinhada ao tom “Summoning spirits” do portfólio.

---

### ❌ Problema 5 — Ghost Atmosphere/WebGL: garantir DPR, post-process, reduced motion e fallback

Spec define cena WebGL com ghost emissivo, partículas, fireflies, bloom forte, analog decay, follow suave do cursor e fallback completo se WebGL indisponível ou \`prefers-reduced-motion\`.

### 🔧 Correção Técnica

- Em \`GhostStage.tsx\` (e componentes em \`src/components/canvas\`, se existirem):
  - Configurar \`Canvas\` R3F com:
    - \`dpr={[1, 2]}\`
    - \`gl={{ antialias: false }}\`
  - Implementar ghost principal (esfera emissiva) com emissive azul.
  - Adicionar instâncias de partículas / fireflies com instanced meshes.
  - Usar post-process (\`@react-three/postprocessing\` ou pass custom) para:
    - Bloom com intensidade ~2.8.
    - Pass analog/fim-grain/vignette leve.
  - Follow de cursor:
    - Em desktop: atualizar posição target no \`useFrame\` com \`lerp 0.05\`.
    - Em mobile/touch: **desligar follow** (ghost apenas movimento senoidal).
  - \`prefers-reduced-motion\`:
    - Detectar via \`window.matchMedia('(prefers-reduced-motion: reduce)')\`.
    - Se true: não renderizar Canvas, exibir apenas \`StaticGradientBackground\`.
  - Fallback de erro:
    - Tentar/catch em redor do Canvas ou usar boundary: se WebGL falhar, renderizar background estático.

**Critério de aceite**

- Em desktop, ghost segue cursor suavemente, sem travar scroll.
- Em mobile, ghost não segue cursor e Canvas consome pouco FPS.
- Com \`prefers-reduced-motion\`, hero continua funcional sem Canvas.
- Se Canvas quebrar, site segue utilizável com background estático.

### ✅ Resultado esperado

Ghost Atmosphere entrega a aura “fantasma azul” com brilho e textura analógica, sem prejudicar performance ou acessibilidade.

---

## 🎯 Seção: Manifesto Video Thumbnail (Desktop) + Seção Manifesto (Mobile)

- 📌 Fidelidade visual (referência): ✗ — REFERENCIA_HERO-GHOST docs + descrição detalhada na especificação  
- 📐 Grid e margens laterais: Parcial (thumb posicionada, mas lógica de scroll/fullsreen não garantida)  
- ↔️ Alinhamento duas laterais: ✓ (thumb alinhada à direita)  
- 📱 Mobile (sm/md): ✗ (necessita seção dedicada)  
- 🎞️ Motion/Animações: ✗ (entrada, scroll scale, fullscreen hold, som)  
- 🧩 Componentes envolvidos: \`ManifestoThumb.tsx\`, \`ManifestoSection.tsx\`  
- 🔗 Integrações: \`HomeHero → ManifestoThumb\`, \`page.tsx → ManifestoSection (mobile)\`

### ❌ Problema 6 — Animação scroll-driven thumbnail → fullscreen hold não implementada

Spec exige que o video:

1. Comece como thumbnail no bottom-right, \`position: fixed\`.
2. Durante o scroll pela Hero, escale e se mova ao centro, expandindo até fullscreen.
3. Mantenha fullscreen por 2s com scroll “travado”.
4. Só então libere scroll para próxima seção.

Se hoje o vídeo é apenas uma thumb estática/hover ou um simples card responsivo, o comportamento está incompleto.

### 🔧 Correção Técnica

- Em \`ManifestoThumb.tsx\`:
  - Usar Framer Motion + \`useScroll\` (\`scrollYProgress\`) atrelado ao Hero.
  - Mapear \`scrollYProgress\` → \`scale\`, \`x\`, \`y\`, \`borderRadius\`:

    - \`scale: [0.3, 1]\`
    - \`x: ['50%', '0%'] ou ['100%', '50%']\` (ajustar para bottom-right → center).
    - \`y: ['100%', '50%']\`.
    - \`borderRadius: ['16px', '0px']\`.

  - Manter \`position: fixed\` enquanto \`scrollYProgress\` ∈ [0, 1].
  - Ao atingir fullscreen (\`scrollYProgress >= 1\`):
    - Entrar em estado \`fullscreenHold\`.
    - Desmutar áudio.
    - Bloquear scroll por ~2s (ex.: \`document.body.style.overflow = 'hidden'\` / overlay interceptando scroll).
    - Depois de 2s, liberar scroll e marcar \`state = 'released'\`.

- Reaplicar lógica em reverse se usuário rolar de volta para Hero.

**Critério de aceite**

- Scrolling pela Hero transforma thumb em fullscreen de forma suave.
- Durante fullscreen hold de 2s, scroll da página não avança.
- Áudio só é ativado durante fullscreen; fora disso, permanece mudo.

### ✅ Resultado esperado

Experiência do manifesto em desktop se torna uma micro-transição cinematográfica, coerente com referências tipo loandbehold.studio, mas sem disputar com o Ghost.

---

### ❌ Problema 7 — Mobile Manifesto como seção própria incompleta

Em mobile, manifesto deve ser uma seção fullscreen logo após o Hero, **sem thumb flutuante**, autoplay muted, com toggle de som explícito.

### 🔧 Correção Técnica

- Em \`ManifestoSection.tsx\`:
  - Mostrar apenas em breakpoints \`sm/md\` (condicional via \`useMediaQuery\` ou classes utilitárias + CSS).
  - Layout:
    - \`section\` com fundo \`#06071f\`, altura \`min-h-screen\` ou \`aspect-video\`.
    - \`<video>\` full-width, \`playsInline\`, \`loop\`, \`muted\`.
  - Botão de som:
    - Ícone + label (ex.: “Som ligado/desligado”) com \`aria-pressed\` e foco visível.
    - Ao ativar áudio, garantir que apenas ocorre após interação do usuário (regras mobile).
  - Ao sair da seção (observer de scroll ou \`onPause\` custom), voltar a mutar o vídeo.

**Critério de aceite**

- Em telas <1024px, manifesto aparece como seção própria abaixo do Hero.
- Som só é ativado por toque explícito; ao sair da seção, volta a ficar mudo.
- Sem thumb flutuante em mobile.

### ✅ Resultado esperado

Mobile oferece uma experiência limpa: Hero → Manifesto fullscreen → restante da home, sem elementos flutuantes poluindo o viewport pequeno.

---

## 🎯 Seção: Portfolio Showcase (3 stripes)

- 📌 Fidelidade visual (referência): Parcial — HOME-PORTFOLIO-LAYOUYT-GHOST.jpg  
- 📐 Grid e margens laterais: ✓ (macro)  
- ↔️ Alinhamento duas laterais: ✓ (alinhamento alternado R/C/L aparente)  
- 📱 Mobile (sm/md): ✗ (cards devem ser stackados, sem label flutuante)  
- 🎞️ Motion/Animações: ✗ (hover reveal, scroll stagger, color change)  
- 🧩 Componentes envolvidos: \`Portfolio Showcase\` (provavelmente em \`src/components/home/portfolio-showcase\` + \`CategoryThumbnail.tsx\`, \`CategoryText.tsx\`, \`CategoryArrow.tsx\` etc.)  
- 🔗 Integrações: \`page.tsx → PortfolioShowcaseSection → CategoryStripe components\`

### ❌ Problema 8 — Hover stripes sem reveal de thumbnail + ajustes de gap/icon

Especificação pede:

- Thumbnail 16:9 de 288px abrindo de 0 → 288px no hover com fade.
- Gap entre texto e thumb de \`gap-7 → gap-10\`.
- Ícone de seta rotacionando de -45° → 0°.

Se hoje o hover for apenas sublinhar texto ou mudar cor, está incompleto.

### 🔧 Correção Técnica

- Nos componentes de stripe (\`CategoryThumbnail.tsx\`, \`CategoryText.tsx\`, \`CategoryArrow.tsx\`):
  - Usar Framer Motion ou Tailwind transitions:

    - Wrapper da thumb:
      - \`w-0 opacity-0\` default.
      - No hover do stripe: \`w-[288px] opacity-100 duration-700 ease-[0.22,1,0.36,1]\`.
    - Container de conteúdo:
      - \`gap-7\` default, e no hover \`gap-10\` com \`duration-300\`.
    - Ícone:
      - \`rotate-[-45deg]\` default, \`rotate-0\` no hover, \`duration-500\`.

**Critério de aceite**

- Ao passar o mouse em cada stripe, thumbnail desliza e aparece suavemente.
- Seta gira para horizontal.
- Layout não quebra nem gera overflow.

### ✅ Resultado esperado

Stripes ganham um caráter editorial/curatorial, convidando o usuário a interagir sem ser chamativo demais.

---

### ❌ Problema 9 — Scroll reveal e cores de títulos não animados

Spec define:

- Quando seção entra ~30% na viewport:
  - Cada stripe faz fade-up com stagger.
  - Títulos mudam para azul \`#0057FF\`.

### 🔧 Correção Técnica

- Envolver seção com \`motion.section\` e stripes com \`motion.div\`:
  - Usar \`whileInView\` com \`viewport={{ once: true, amount: 0.3 }}\`.
  - \`initial={{ opacity: 0, y: 24 }}\`, \`animate={{ opacity: 1, y: 0 }}\`.
  - \`transition={{ duration: 0.8, ease: [0.22,1,0.36,1], staggerChildren: 0.12 }}\`.
- Ao entrar, aplicar classe de cor azul nos títulos (\`text-[#0057FF]\`).

**Critério de aceite**

- Entrando na seção pela primeira vez, stripes aparecem de forma sequencial e suave.
- Em \`prefers-reduced-motion\`, animação troca por \`opacity:1, y:0\` direto, sem transições.

### ✅ Resultado esperado

Seção “respira” editorialmente, os títulos ganham ênfase azul no momento certo, sem distrações.

---

## 🎯 Seção: Featured Projects (Bento Grid)

- 📌 Fidelidade visual (referência): Parcial — HOME-PORTFOLIO-LAYOUYT-GHOST.jpg  
- 📐 Grid e margens laterais: Parcial (estrutura geral ok, spans específicos precisam ser garantidos)  
- ↔️ Alinhamento duas laterais: ✓  
- 📱 Mobile (sm/md): ✓ (assumindo cards empilhados)  
- 🎞️ Motion/Animações: ✗ (hover + scroll reveal não garantidos)  
- 🧩 Componentes envolvidos: \`FeaturedProjectsSection.tsx\`, \`FeaturedProjectCard.tsx\`, \`CTAProjectCard.tsx\`  
- 🔗 Integrações: \`page.tsx → FeaturedProjectsSection → FeaturedProjectCard / CTAProjectCard\`

### ❌ Problema 10 — Grid não garante spans exatos 5/7/12/8/4

Spec pede:

- Row 1: col-span-5 + col-span-7.
- Row 2: col-span-12.
- Row 3: col-span-8 + col-span-4.

Se hoje for apenas um grid mais fluido (ex.: col-span iguais ou uso de \`md:grid-cols-2\` genérico), há ruptura de fidelidade.

### 🔧 Correção Técnica

- Em \`FeaturedProjectsSection.tsx\`:
  - Criar grid \`md:grid-cols-12 gap-8\`.
  - Mapear cards:

    - Card 1: \`md:col-span-5\`.
    - Card 2: \`md:col-span-7\`.
    - Card 3: \`md:col-span-12\`.
    - Card 4: \`md:col-span-8\`.
    - CTA Card: \`md:col-span-4\`.

- Em mobile: \`grid-cols-1\`.

**Critério de aceite**

- Layout em desktop replica exatamente o desenho da referência (com as mesmas proporções relativas).
- Em mobile/tablet, cards são empilhados sem horizontais cortados.

### ✅ Resultado esperado

Seção de projetos parece uma página de revista/bento grid, com proporções claras e intencionais.

---

### ❌ Problema 11 — Hover e scroll reveal premium ausentes ou tímidos

Spec define:

- Hover card:
  - Imagem: \`scale: 1 → 1.03, translateY: -1px\`.
  - Arrow no pill azul: \`translateX: 20px\`.
  - Shadow: \`shadow-xl shadow-blue-500/10\`.
- Scroll reveal:
  - Cards sobem levemente (\`y:40 → 0\`).
  - Escala 0.96 → 1 com stagger.

### 🔧 Correção Técnica

- Em \`FeaturedProjectCard.tsx\`:
  - Usar \`motion.article\` com:

    - \`whileHover={{ y: -1, scale: 1.03 }}\`.
    - \`transition={{ duration: 0.5, ease: 'easeOut' }}\`.
  - Aplicar \`shadow\` condicional no hover.
  - Para a arrow, \`motion.span\` com \`whileHover={{ x: 20 }}\`.

- No container \`FeaturedProjectsSection\`:
  - \`motion.section\` com \`initial={{ opacity:0, y:40 }}\`, \`whileInView={{ opacity:1, y:0 }}\`.
  - Stagger para children.

**Critério de aceite**

- Cards ganham sensação de “lift” editorial ao hover.
- Entrada dos cards acompanha scroll sem ser agressiva.
- Em reduced-motion, animações são desabilitadas.

### ✅ Resultado esperado

Motion transmite “polimento premium” sem roubar atenção do Hero/Ghost.

---

## 🎯 Seção: Clients/Brands

- 📌 Fidelidade visual (referência): ✓ (macro) — HOME-PORTFOLIO-LAYOUYT-GHOST.jpg  
- 📐 Grid e margens laterais: ✓  
- ↔️ Alinhamento duas laterais: ✓  
- 📱 Mobile (sm/md): ✓ (grid de 3–4 colunas provável)  
- 🎞️ Motion/Animações: ✗ (hover e stagger podem faltar)  
- 🧩 Componentes envolvidos: \`ClientsBrandsSection.tsx\`  
- 🔗 Integrações: \`page.tsx → ClientsBrandsSection\`

### ❌ Problema 12 — Animação de logos e título não segue padrão editorial

Spec define:

- Título: fade-up.
- Logos: stagger curto, escala 0.9 → 1, y:12 → 0.
- Hover: \`scale:1.04\`, brightness +10%.

### 🔧 Correção Técnica

- Em \`ClientsBrandsSection.tsx\`:
  - \`motion.h2\` com \`initial={{ opacity:0, y:16 }}\`, \`whileInView={{ opacity:1, y:0 }}\`.
  - Grid de logos com \`motion.div\` e children \`motion.img\`:

    - \`initial={{ opacity:0, y:12, scale:0.9 }}\`.
    - \`animate={{ opacity:1, y:0, scale:1 }}\`.
    - Stagger 0.03.
  - Hover no logo:
    - \`whileHover={{ scale:1.04 }}\` e aplicar \`filter brightness-110\`.

**Critério de aceite**

- Entrada suave da faixa de clientes.
- Logos reagem discretamente ao hover sem animação excessiva.
- Em reduced-motion, animações desligadas.

### ✅ Resultado esperado

Barra de clientes reforça credibilidade com movimento mínimo e sofisticado.

---

## 🎯 Seção: Contact

- 📌 Fidelidade visual (referência): ✓ (macro) — HOME-PORTFOLIO-LAYOUYT-GHOST.jpg  
- 📐 Grid e margens laterais: ✓  
- ↔️ Alinhamento duas laterais: ✓  
- 📱 Mobile (sm/md): ✓ (coluna única)  
- 🎞️ Motion/Animações: ✗ (scroll reveal de seção e campos)  
- 🧩 Componentes envolvidos: \`ContactSection.tsx\`, \`home/contact/*\`  
- 🔗 Integrações: \`page.tsx → ContactSection\`

### ❌ Problema 13 — Estados do formulário e acessibilidade provavelmente incompletos

Spec exige:

- Labels associados a inputs.
- Mensagens de erro por campo.
- Estado loading + success com feedback.
- Atributos ARIA corretos.

### 🔧 Correção Técnica

- Em \`ContactSection.tsx\`:
  - Garantir:

    - \`<label htmlFor="name">Nome</label>\` etc.
    - Inputs com \`id\` correspondente.
    - Mensagens de erro com \`aria-describedby\` para o input.
    - Botão com \`type="submit"\` e \`aria-busy\` durante envio.
  - Gerenciar estados locais: \`idle | loading | success | error\`.
  - Desabilitar botão durante envio.

**Critério de aceite**

- Formulário utilizável apenas com teclado.
- Leitores de tela anunciam labels e erros corretamente.
- Estados de loading e sucesso visíveis.

### ✅ Resultado esperado

Seção de contato confiável, profissional e inclusiva, pronta para leads reais.

---

## 🎯 Seção: Footer

- 📌 Fidelidade visual (referência): Parcial — HOME-PORTFOLIO-LAYOUYT-GHOST.jpg  
- 📐 Grid e margens laterais: ✓  
- ↔️ Alinhamento duas laterais: ✓  
- 📱 Mobile (sm/md): ✗ (footer deve ser estático, nunca fixo)  
- 🎞️ Motion/Animações: ✓ (apenas hovers sutis)  
- 🧩 Componentes envolvidos: provavelmente \`Footer.tsx\` dentro de \`src/components/layout\` ou similar  
- 🔗 Integrações: \`layout.tsx → Footer\` ou \`page.tsx → Footer\`

### ❌ Problema 14 — Comportamento fixo do footer em breakpoints incorretos

Spec é explícito:

- Desktop: \`position: fixed bottom-0\`.
- Mobile/Tablet: footer deve ser **estático** (em fluxo), nunca fixo.

Se hoje o footer for sempre fixo ou sempre estático, está fora da especificação.

### 🔧 Correção Técnica

- Em \`Footer.tsx\`:
  - Usar classes condicionais:

    - \`hidden lg:flex fixed bottom-0 inset-x-0\` para desktop.
    - \`flex lg:hidden static w-full\` para mobile/tablet.

  - Garantir que o conteúdo acima do footer não fique escondido em telas pequenas.

**Critério de aceite**

- Em desktop largo, footer sempre visível na base.
- Em mobile/tablet, footer rola junto com conteúdo e nunca cobre sections.

### ✅ Resultado esperado

Footer respeita o papel de “barra final” em desktop, mas não interfere na experiência mobile.

---

# 4️⃣ Lista de Problemas (com Severidade)

🔴 **Alta**

1. Header desktop sem pill + glass fluido fiel (Problemas 1 e 2).
2. Menu mobile sem overlay fullscreen stagger + acessibilidade completa (Problema 3).
3. Manifesto Video sem animação scroll-driven → fullscreen hold + lógica de áudio (Problemas 6 e 7).
4. Ghost Atmosphere sem garantias de DPR, reduced motion e fallback (Problema 5).
5. Footer com comportamento fixo incorreto em mobile ou não fixo em desktop (Problema 14).

🟡 **Média**

6. Preloader Ghost Loader ausente ou simplificado (Problema 4).
7. Portfolio Showcase stripes sem hover reveal completo, scroll reveal e color change (Problemas 8 e 9).
8. Featured Projects grid sem spans exatos do bento layout + hover/scroll premium (Problemas 10 e 11).
9. Clients/Brands sem animações de entrada/hover especificadas (Problema 12).
10. Contact form sem estados completos de erro/loading/sucesso + ARIA (Problema 13).

🟢 **Baixa**

11. Pequenos ajustes de margens laterais/edge alignment entre seções.
12. Uniformização de CTAs com o padrão \`CTAButton\` especificado.
13. Microinterações (hover em links de footer/header) refinadas para timing e easing premium.

---

# 5️⃣ Recomendações Prioritárias (Ordem de Execução)

1. **Header + Menu Mobile (Alta)**  
   Corrigir layout e motion do header e menu mobile antes de tudo, pois afetam todas as páginas e a percepção inicial do site.

2. **Hero: Ghost Atmosphere + Manifesto (Alta)**  
   Implementar corretamente WebGL (com reduced motion/fallback) e o comportamento completo do Manifesto Video (scroll → fullscreen hold → lógica de áudio).

3. **Footer (Alta)**  
   Garantir comportamento fixo apenas em desktop e estático em mobile para evitar problemas de UX.

4. **Portfolio Showcase + Featured Projects (Média)**  
   Ajustar grid, align e animações conforme specs — são o “miolo” do portfólio.

5. **Clients/Brands + Contact (Média)**  
   Refinar animações, acessibilidade e estados do formulário para consolidar credibilidade e conversão.

6. **Polimento Final (Baixa)**  
   Uniformizar CTAs, rever margens laterais, checar \`prefers-reduced-motion\` globalmente e garantir ausência de overflow horizontal em todos os breakpoints.

---

# 🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR

Abaixo, prompts atômicos (um problema por prompt) para uso em Codex/Copilot.

---

### 🛠️ Prompt #01 — Header desktop pill + glass centralizado

**Objetivo**

- Transformar o header desktop em um pill glass centralizado, com largura limitada ao container, alinhado ao spec de HEADER.

**Arquivos/Rotas envolvidas**

- \`src/components/header/SiteHeader.tsx\`
- \`src/components/header/DesktopFluidHeader.tsx\`
- \`src/components/header/DesktopFluidHeader.module.css\`

**Ações**

1. Ajustar o wrapper principal do header para usar container centralizado: \`max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]\`.
2. Atualizar estilos para aplicar \`rounded-full\`, \`backdrop-blur\`, borda translúcida e sombra leve, eliminando aparência de barra full-width.
3. Garantir que o header fique sticky (\`sticky top-0 z-40\`) sem ocupar a largura total da viewport.

**Regras**

- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Tailwind + App Router
- ✅ Mobile-first
- ✅ Comparar com: HEADER docs + HERO-PORTFOLIO-GHOST.jpg

**Critérios de aceite (Checklist)**

- [ ] Header ocupa largura parcial do viewport, centralizado
- [ ] Margens laterais alinhadas ao grid global
- [ ] Sem overflow horizontal (mobile)
- [ ] Fidelidade visual confirmada (HEADER doc)
- [ ] Performance não piorou (sem re-renders desnecessários)

---

### 🛠️ Prompt #02 — Efeito Fluid Glass com follow X sutil e spring

**Objetivo**

- Implementar movimento fluido do header em resposta ao cursor, com translateX e escala sutis, respeitando reduced motion.

**Arquivos/Rotas envolvidas**

- \`src/components/header/DesktopFluidHeader.tsx\`
- \`src/components/header/headerTokens.ts\`

**Ações**

1. Converter o contêiner visual principal em \`motion.div\` (Framer Motion).
2. Implementar lógica de follow X baseada na posição do cursor com limite de movimento (±40–60px) e animação com spring suave.
3. Aplicar leve \`scaleX\` (~1.05) e \`scaleY\` (~1.02) em função da posição, desativando tudo se \`prefers-reduced-motion\` estiver ativo.

**Regras**

- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Tailwind + App Router
- ✅ Mobile-first (efeito só em desktop)
- ✅ Comparar com: HEADER docs

**Critérios de aceite**

- [ ] Header reage ao cursor com deslocamento e escala sutis
- [ ] Animação desligada em \`prefers-reduced-motion\`
- [ ] Sem jitter ou “chiclete” visual
- [ ] Sem overflow horizontal
- [ ] Performance estável (sem frame drops)

---

### 🛠️ Prompt #03 — Menu mobile fullscreen staggered

**Objetivo**

- Implementar menu mobile fullscreen com overlay gradiente, itens em coluna e animação staggered, conforme spec.

**Arquivos/Rotas envolvidas**

- \`src/components/header/MobileStaggeredMenu.tsx\`
- \`src/components/header/SiteHeader.tsx\`

**Ações**

1. Garantir que o menu mobile use \`fixed top-0 inset-x-0 h-[48-64px]\` para a barra e um overlay \`fixed inset-0\` ao abrir.
2. Usar Framer Motion para animar o overlay (slide-in from right) e itens com stagger (opacity + y).
3. Implementar acessibilidade: \`aria-label\`, \`aria-expanded\`, focus trap, fechamento via ESC e clique no scrim.

**Regras**

- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Tailwind + App Router
- ✅ Mobile-first
- ✅ Comparar com: docs/HEADER (mobile)

**Critérios de aceite**

- [ ] Overlay cobre toda a viewport ao abrir
- [ ] Itens entram em ordem com stagger
- [ ] Foco é preso no menu enquanto aberto
- [ ] Sem overflow horizontal (mobile)
- [ ] Fidelidade visual confirmada com referência

---

### 🛠️ Prompt #04 — Preloader Ghost Loader

**Objetivo**

- Implementar preloader fullscreen com ghost SVG animado, texto e barra de progresso de ~2s antes do Hero.

**Arquivos/Rotas envolvidas**

- \`src/components/home/HeroPreloader.tsx\`
- \`src/components/home/HomeHero.tsx\`

**Ações**

1. Criar overlay fullscreen em \`HeroPreloader\` com background gradiente escuro.
2. Adicionar ghost SVG animado com leve movimento vertical e fade.
3. Implementar barra de progresso com animação de largura 0 → 100% em ~2s e fade-out do preloader em ~1s.
4. Integrar com \`HomeHero\` para só renderizar seção principal após preloader encerrar.

**Regras**

- ❌ Não alterar textos da hero
- ❌ Não mudar layout do Hero
- ✅ Tailwind + Framer Motion
- ✅ Respeitar \`prefers-reduced-motion\` (desabilitar animações, manter apenas transição rápida)
- ✅ Comparar com: HERO-PORTFOLIO-GHOST.jpg + docs de preloader

**Critérios de aceite**

- [ ] Preloader sempre aparece ao carregar a home
- [ ] Duração total ~2–3s sem travar a página
- [ ] Ghost e barra respeitam paleta definida
- [ ] Em reduced motion, animações são simples/instantâneas
- [ ] Sem impacto perceptível no LCP

---

### 🛠️ Prompt #05 — Ghost Atmosphere: DPR, follow cursor e fallback

**Objetivo**

- Ajustar Ghost Atmosphere para usar DPR controlado, follow de cursor apenas no desktop, animação senoidal orgânica e fallback estático.

**Arquivos/Rotas envolvidas**

- \`src/components/home/GhostStage.tsx\`
- \`src/components/canvas/*\` (ghost, particles, fireflies)

**Ações**

1. Configurar \`<Canvas>\` com \`dpr={[1,2]}\` e \`gl={{ antialias:false }}\`.
2. Implementar mesh principal emissivo com movimento senoidal em \`useFrame\`.
3. Ler posição do cursor em desktop e interpolar posição do ghost com \`lerp = 0.05\`.
4. Detectar \`prefers-reduced-motion\` e, se ativo, não renderizar o Canvas (usar componente de background estático).
5. Envolver Canvas em boundary para fallback em caso de erro WebGL.

**Regras**

- ❌ Não alterar textos
- ❌ Não mover hero copy
- ✅ React Three Fiber + Drei
- ✅ Respeitar reduced motion
- ✅ Comparar com: HERO-PORTFOLIO-GHOST.jpg + docs de Ghost Blue

**Critérios de aceite**

- [ ] DPR máximo 2 e antialias desabilitado
- [ ] Ghost segue cursor apenas em desktop
- [ ] Fallback estático ativo em reduced motion / erro WebGL
- [ ] Sem quedas de FPS notáveis
- [ ] Fidelidade visual forte com referência

---

### 🛠️ Prompt #06 — Manifesto Thumbnail scroll → fullscreen hold

**Objetivo**

- Implementar animação do manifesto vídeo do thumbnail fixo → fullscreen via scroll, com hold de 2s e lógica de áudio.

**Arquivos/Rotas envolvidas**

- \`src/components/home/ManifestoThumb.tsx\`
- \`src/components/home/HomeHero.tsx\`

**Ações**

1. Usar \`useScroll\` e \`useTransform\` (Framer Motion) para mapear \`scrollYProgress\` da Hero em \`scale\`, \`x\`, \`y\` e \`borderRadius\` do vídeo.
2. Manter \`position: fixed\` da thumb durante a transição, fixada em bottom-right no início.
3. Ao atingir fullscreen (progress ~1), entrar em estado \`fullscreenHold\`: desmutar vídeo, travar scroll por 2s e só então liberar.
4. Ao sair da Hero (rolar para baixo), mutar o vídeo novamente; repetir lógica ao voltar.

**Regras**

- ❌ Não alterar textos
- ❌ Não mudar ordem das seções
- ✅ Framer Motion + Tailwind
- ✅ Mobile-first (efeito só desktop; mobile usa seção separada)
- ✅ Comparar com: REFERENCIA_HERO-GHOST + descrição na spec

**Critérios de aceite**

- [ ] Thumbnail cresce suavemente até fullscreen em função do scroll
- [ ] Scroll é segurado por 2s no momento fullscreen
- [ ] Som só toca em fullscreen e é mutado ao sair
- [ ] Sem travar o resto da página
- [ ] Fidelidade visual e de comportamento confirmada

---

### 🛠️ Prompt #07 — Manifesto Section mobile fullscreen

**Objetivo**

- Criar seção mobile dedicada ao manifesto, fullscreen, logo abaixo do Hero, com comportamento de áudio opt-in.

**Arquivos/Rotas envolvidas**

- \`src/components/home/ManifestoSection.tsx\`
- \`src/app/page.tsx\`

**Ações**

1. Exibir a seção manifesto apenas em breakpoints mobile/tablet, escondendo thumb flutuante.
2. Renderizar vídeo fullscreen (width 100%, aspect-video) com autoplay, loop, muted, playsInline.
3. Adicionar botão de som com ícone e texto, controlando \`muted\` do vídeo.
4. Ao sair da seção, resetar vídeo para muted.

**Regras**

- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Tailwind + Framer Motion (scroll reveal leve)
- ✅ Mobile-first
- ✅ Comparar com: especificação “Manifesto Section (Mobile)”

**Critérios de aceite**

- [ ] Manifesto aparece como seção logo após o Hero em mobile
- [ ] Som só é ativado por toque explícito
- [ ] Ao sair da seção, volta a ficar mudo
- [ ] Sem overflow horizontal
- [ ] Fidelidade visual/fluxo confirmados

---

### 🛠️ Prompt #08 — Portfolio Showcase stripes: hover + scroll reveal

**Objetivo**

- Implementar hover reveal de thumbnails, ajuste de gaps e animação de seta, além de scroll reveal staggered para as três stripes.

**Arquivos/Rotas envolvidas**

- \`src/components/home/portfolio-showcase/category-stripe/CategoryThumbnail.tsx\`
- \`src/components/home/portfolio-showcase/category-stripe/CategoryText.tsx\`
- \`src/components/home/portfolio-showcase/category-stripe/CategoryArrow.tsx\`
- \`src/components/home/PortfolioShowcaseSection.tsx\` (ou equivalente)

**Ações**

1. Definir thumb como \`w-0 opacity-0\` por padrão e expandi-la para \`w-[288px] opacity-100\` no hover do stripe com duração de ~700ms e ease expo.
2. Ajustar gap entre áreas de texto/thumbnail de \`gap-7\` para \`gap-10\` no hover.
3. Rotacionar seta de \`-45deg\` para \`0deg\` com duração ~500ms.
4. No container, utilizar Framer Motion para scroll reveal com \`staggerChildren: 0.12\`.

**Regras**

- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Tailwind + Framer Motion
- ✅ Mobile-first (efeitos apenas desktop, mobile cards estáticos)
- ✅ Comparar com: HOME-PORTFOLIO-LAYOUYT-GHOST.jpg

**Critérios de aceite**

- [ ] Thumbnails aparecem e somem suavemente no hover
- [ ] Seta anima de forma fluida
- [ ] Stripes entram na tela com fade-up e stagger
- [ ] Sem overflow horizontal
- [ ] Fidelidade visual confirmada

---

### 🛠️ Prompt #09 — Featured Projects Bento grid spans exatos

**Objetivo**

- Garantir que a seção Featured Projects use grid 12 colunas com spans 5/7/12/8/4, conforme spec.

**Arquivos/Rotas envolvidas**

- \`src/components/home/FeaturedProjectsSection.tsx\`
- \`src/components/home/featured-projects/FeaturedProjectCard.tsx\`
- \`src/components/home/featured-projects/CTAProjectCard.tsx\`

**Ações**

1. Definir container com \`md:grid-cols-12 gap-8\`.
2. Atribuir col-spans:
   - Card 1: \`md:col-span-5\`
   - Card 2: \`md:col-span-7\`
   - Card 3: \`md:col-span-12\`
   - Card 4: \`md:col-span-8\`
   - CTA Card: \`md:col-span-4\`
3. Em mobile, garantir \`grid-cols-1\` e stack vertical.

**Regras**

- ❌ Não alterar textos
- ❌ Não mudar ordem dos cards
- ✅ Tailwind
- ✅ Mobile-first
- ✅ Comparar com: HOME-PORTFOLIO-LAYOUYT-GHOST.jpg

**Critérios de aceite**

- [ ] Grid reproduz exatamente o layout desenhado
- [ ] Cards não quebram nem criam buracos na malha
- [ ] Sem overflow horizontal
- [ ] Fidelidade visual confirmada
- [ ] Performance intacta

---

### 🛠️ Prompt #10 — Clients/Brands animations

**Objetivo**

- Implementar animação de entrada e hover das logos e do título, mantendo motion sutil.

**Arquivos/Rotas envolvidas**

- \`src/components/home/ClientsBrandsSection.tsx\`

**Ações**

1. Transformar título em \`motion.h2\` com fade-up curto.
2. Envolver cada logo em \`motion.div\` ou \`motion.img\` com \`initial={{ opacity:0, y:12, scale:0.9 }}\` e \`animate={{ opacity:1, y:0, scale:1 }}\` usando stagger.
3. Adicionar hover \`whileHover={{ scale:1.04 }}\` e aumento de brightness.

**Regras**

- ❌ Não alterar textos
- ❌ Não mudar ordem dos logos
- ✅ Tailwind + Framer Motion
- ✅ Respeito a reduced motion
- ✅ Comparar com: HOME-PORTFOLIO-LAYOUYT-GHOST.jpg

**Critérios de aceite**

- [ ] Título e logos entram com animação suave ao scroll
- [ ] Hover discreto nas logos
- [ ] Em reduced motion, efeitos desligados
- [ ] Sem overflow horizontal
- [ ] Fidelidade visual confirmada

---

### 🛠️ Prompt #11 — Contact form estados, acessibilidade e motion sutil

**Objetivo**

- Completar estados do formulário (erro/loading/sucesso) e acessibilidade, além de scroll reveal suave.

**Arquivos/Rotas envolvidas**

- \`src/components/home/ContactSection.tsx\`
- \`src/components/home/contact/*\`

**Ações**

1. Garantir que todos inputs tenham \`<label htmlFor>\` e \`id\` correspondentes.
2. Implementar estados internos: \`idle | loading | success | error\`.
3. Associar mensagens de erro com \`aria-describedby\` e \`role="alert"\`.
4. Adicionar scroll reveal leve para seção e campos com Framer Motion.
5. Desabilitar botão e mostrar spinner durante loading.

**Regras**

- ❌ Não alterar textos
- ❌ Não mudar ordem das seções
- ✅ Tailwind + Framer Motion
- ✅ Mobile-first
- ✅ Comparar com: HOME-PORTFOLIO-LAYOUYT-GHOST.jpg (contato)

**Critérios de aceite**

- [ ] Formulário teclável e lido corretamente por screen readers
- [ ] Mensagens de erro e sucesso claras
- [ ] Loading visível com botão desabilitado
- [ ] Motion sutil, desabilitável via reduced motion
- [ ] Sem overflow horizontal

---

### 🛠️ Prompt #12 — Footer fixo apenas em desktop, estático em mobile

**Objetivo**

- Ajustar comportamento do footer para ser fixo no desktop e estático em mobile/tablet.

**Arquivos/Rotas envolvidas**

- \`src/components/layout/Footer.tsx\` (ou equivalente)
- \`src/app/layout.tsx\`

**Ações**

1. Separar markup em duas variantes condicionadas por breakpoint:
   - Desktop: \`hidden lg:flex fixed bottom-0 inset-x-0 z-10\`.
   - Mobile/Tablet: \`flex lg:hidden static w-full\`.
2. Garantir padding-bottom adequado em desktop para que conteúdo acima não fique escondido atrás do footer.
3. Validar que em mobile nunca haja footer cobrindo formulário ou CTAs.

**Regras**

- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Tailwind + App Router
- ✅ Mobile-first
- ✅ Comparar com: HOME-PORTFOLIO-LAYOUYT-GHOST.jpg

**Critérios de aceite**

- [ ] Footer sempre visível na base em desktop
- [ ] Footer rola junto com conteúdo em mobile/tablet
- [ ] Sem overlap de conteúdo
- [ ] Sem overflow horizontal
- [ ] Fidelidade visual confirmada

---

Esses 12 prompts cobrem os principais gaps de fidelidade visual, motion, WebGL e responsividade da home. Eles podem ser executados em paralelo por um agente/copiloto, priorizando a ordem descrita na seção de recomendações.

`;

export function DaniloPortfolioHomeAuditPage() {
  // Componente opcional para visualizar o relatório dentro do App Router.
  return (
    <main className="min-h-screen bg-[#060010] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold mb-6">
          Relatório de Auditoria — Home / Header / Hero / Portfolio (Danilo Novais)
        </h1>
        <p className="text-sm text-gray-300 mb-4">
          Este arquivo expõe o relatório em formato Markdown na constante
          <code className="mx-1">daniloPortfolioHomeAuditMarkdown</code>.  
          Copie-o para um arquivo <code>.md</code> ou use um renderer de Markdown para exibição rica.
        </p>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-black/40 rounded-lg p-4 border border-white/10 overflow-x-auto">
          {daniloPortfolioHomeAuditMarkdown}
        </pre>
      </div>
    </main>
  );
}

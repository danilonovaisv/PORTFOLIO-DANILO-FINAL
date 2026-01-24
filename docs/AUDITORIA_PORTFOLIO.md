1️⃣ Visão Geral

Com base na estrutura do repositório (src/app + src/components) e na segmentação em componentes por página, o portfólio está organizado em três rotas principais:

Home: src/app/page.tsx + src/components/home/...

Sobre: src/app/sobre/page.tsx + src/components/sobre/...

Portfolio: src/app/portfolio/page.tsx + src/components/portfolio/...

Consistência de layout

A arquitetura é bem modular: cada página é composta por seções isoladas (home/hero, home/featured-projects, sobre/AboutOrigin, sobre/AboutMethod, sobre/what-i-do, portfolio/PortfolioMosaicGrid etc.).

Existe um mix de CSS Modules (HomeHero.module.css, HeroCopy.module.css, GhostStage.module.css, PortfolioHeroGallery.module.css, GhostEyes.module.css) e componentes de UI genéricos (pasta ui/, claramente inspirados em shadcn). Isso favorece consistência de componentes, mas aumenta o risco de pequenas variações de espaçamento e tipografia entre seções se não houver tokens/sistema de design unificado.

A stack indicada (Next App Router, React, Tailwind, Framer Motion, R3F) está alinhada com o foco em experiências imersivas, animações suaves e design minimalista definido na configuração do agente 
‌
.

Coerência das animações

A Home tem um hook dedicado de animação do hero (useHeroAnimation.ts) e componentes separados para texto, header, CTA e camada visual (HeroCopy.tsx, HeroHeader.tsx, HeroCTA.tsx, GhostAura.tsx, VideoManifesto.tsx).

A página Sobre centraliza parte dos variants em src/components/sobre/motion.ts.

Outras seções parecem definir animações localmente (ex.: Featured Projects, Portfolio Grid), sem um núcleo único de presets de motion compartilhado entre todas as páginas.

Arquiteturalmente, isso tende a gerar microdiferenças de timing/easing entre elementos que deveriam ter o mesmo “dialeto” de movimento (cards, headings, CTAs).

Fluidez de scroll

Componentes com muitos elementos e interação (ex.: AboutOrigin.tsx ~14kB, AboutMethod.tsx, ProjectsGallery.tsx, PortfolioModalNew.tsx) são pontos naturais de atenção para fluidez de scroll:

Muitas animações on-scroll ou modais complexos no mesmo trecho podem introduzir micro travadas se não forem 100% baseadas em transform/opacity.

Sem acesso ao runtime, não dá para cravar jank, mas a arquitetura indica pontos de maior risco de custo de renderização.

Responsividade

A seção What I Do usa duas implementações distintas para o mesmo conceito de card:

Desktop: DesktopCard.tsx

Mobile: MobileCard.tsx

Isso é positivo para UX específica por breakpoint, mas cria vetor de drift:

Espaçamentos internos ligeiramente diferentes

Alturas e proporções incoerentes

Motion configurado de forma separada

O Portfolio usa um único fluxo de componentes (PortfolioMosaicGrid.tsx, MosaicCard.tsx, ProjectsGallery.tsx, PortfolioCard.tsx), sugerindo que a responsividade é tratada na camada de layout (Tailwind/CSS) – o que é ótimo para consistência, desde que os breakpoints e as regras de grid/flex estejam bem calibrados.

Hierarquia visual

A presença de múltiplos “heróis” (Home Hero, About Hero, Portfolio Hero) e headers fixos (BeliefFixedHeader.tsx) indica uma hierarquia visual bem pensada.

O risco principal é de escala e ritmo diferentes entre páginas:

Headings do About entrando com curvas/timings levemente diferentes da Home/Portfolio.

Offsets de scroll variados para início/fim de seções longas (Origin, Method, Portfolio Grid).

2️⃣ Diagnóstico por Seção

Observação: abaixo estão pontos de atenção técnicos, derivados da arquitetura de código (componentização, CSS Modules, separação mobile/desktop, uso de motion). Cada item deve ser validado visualmente no site em produção antes de ser tratado como bug confirmado.

Home Hero
Arquivos-chave

Layout / estilos:

src/components/home/hero/HomeHero.tsx

src/components/home/hero/HomeHero.module.css

src/components/home/hero/HeroCopy.tsx

src/components/home/hero/HeroCopy.module.css

src/components/home/hero/HeroHeader.tsx

src/components/home/hero/GhostAura.tsx

src/components/home/hero/GhostStage.module.css

Motion:

src/components/home/hero/HeroCTA.tsx

src/components/home/hero/VideoManifesto.tsx

src/components/home/hero/useHeroAnimation.ts

Possíveis problemas de alinhamento / espaçamento

CSS Modules separados (HomeHero.module.css, HeroCopy.module.css, GhostStage.module.css) controlando blocos que, visualmente, deveriam fazer parte de um mesmo sistema de grid/flex:

Risco de gutters laterais ligeiramente diferentes entre texto e “stage” visual.

Possíveis diferenças de max-width / alinhamento horizontal entre header, manifesto e CTA.

Animações e scroll

useHeroAnimation.ts orquestra a primeira dobra:

Se não houver um timeline único para copy + CTA + camada visual, a entrada pode ficar levemente dessincronizada (scroll, mount, load de vídeo).

Em devices mais lentos, isso se acentua.

Responsividade / breakpoints

Sem ver o CSS, os principais pontos de atenção:

Garantir que a base da composição é mobile-first (stack vertical limpo; nada “espremido” em 360–414px).

Confirmar que não há heights rígidos no CSS module que causem clipping de conteúdo em viewports baixos.

Manifesto (texto + vídeo)
Arquivos-chave

src/components/home/hero/VideoManifesto.tsx

src/components/home/hero/HeroCopy.tsx

docs/HOME/Hero_Manifesto_Danilo_Novais.md (referência de intenção)

Possíveis problemas de ritmo / alinhamento

Se o vídeo depende de load de mídia e o texto entra on-mount:

Risco de o manifesto textual estar visível sem o reforço visual do vídeo por alguns instantes em redes lentas.

Risco inverso: vídeo começar a rodar antes de o texto/CTA estar totalmente presente e lido.

Responsividade

Em mobile:

Vídeo + texto podem gerar um bloco muito alto logo na primeira dobra, quebrando o “respiro” entre hero e próxima seção se não houver espaçamento vertical consistente e/ou “folds” visuais bem marcados.

Featured Projects
Arquivos-chave

src/components/home/featured-projects/FeaturedProjectsSection.tsx

src/components/home/featured-projects/FeaturedProjectCard.tsx

src/components/home/featured-projects/CTAProjectCard.tsx

Cards / alinhamento / alturas

Dois tipos de card no mesmo container:

FeaturedProjectCard (provavelmente com imagem, texto, tags)

CTAProjectCard (card de ação, possivelmente com copy mais curta)

Sem h-full e items-stretch explícitos:

Risco de cada card assumir altura pela quantidade de texto, gerando linhas “serrilhadas”.

CTA com padding/typography distintos pode sobressair visualmente como “fora do grid”.

Animações

Se cada card configura variants Framer Motion localmente:

Durations/easing ligeiramente diferentes entre cards.

Stagger inconsistente (por ex.: CTA entrando com delay diferente do resto sem intenção).

Breakpoints

Zona crítica: entre 768px e 1024px (2 colunas):

Ordem visual (qual card aparece primeiro/segundo) precisa deixar claro o que é destaque e o que é CTA.

Altura dos cards em 2 colunas tende a mostrar mais nitidamente qualquer discrepância.

About (macro)
Arquivos-chave

src/app/sobre/page.tsx

src/components/sobre/AboutHero.tsx

src/components/sobre/AboutBeliefs.tsx

src/components/sobre/BeliefSection.tsx

src/components/sobre/BeliefFixedHeader.tsx

src/components/sobre/BeliefFinalSection.tsx

src/components/sobre/motion.ts

Ritmo de seções / espaçamento vertical

Estrutura longa, com blocos distintos que podem ter:

py-* e space-y-* diferentes em cada componente.

Sem um “token” de spacing vertical global:

Risco de algumas seções “grudadas” e outras com respiro exagerado.

Headers fixos

BeliefFixedHeader.tsx:

Se o offset não compensar corretamente a altura do header em todas as larguras, pode:

Cobrir parte do conteúdo nos primeiros pixels de scroll.

Gerar jumps na rolagem quando o header fixa/desfixa.

Motion

motion.ts centraliza variants para a página:

Ponto positivo para consistência interna.

Se as curvas/timings forem diferentes das utilizadas na Home/Portfolio, About pode “parecer outro site” em termos de movimento.

Origin
Arquivos-chave

src/components/sobre/AboutOrigin.tsx

Layout / alinhamento

Tamanho do arquivo indica:

Várias subsecções, possivelmente timeline e/ou colunas.

Riscos comuns:

Alinhamento inconsistente entre datas/labels e blocos de texto em layouts de duas colunas.

Elementos de linha de tempo (linha central/pontos) não se alinharem perfeitamente com cards de conteúdo em heights variáveis.

Scroll + Motion

Se o componente usar on-scroll reveals:

Necessário garantir uso de transform (translateY, scale) e opacity, sem animar layout (height/margin) para evitar reflows.

Breakpoints

Em viewports intermediários (768–1024px):

Timelines originalmente pensadas para desktop podem quebrar em ordens estranhas (texto muito abaixo/à frente do marcador).

Method
Arquivos-chave

src/components/sobre/AboutMethod.tsx

Altura de cartões / alinhamento

Estrutura típica em Method:

Vários passos/pilares em grid.

Problema clássico:

Cards com textos de tamanhos diferentes resultando em colunas de alturas desiguais quando o container não força items-stretch em flex/grid e h-full nos cards.

Motion

Se houver stagger:

Em desktop pode ficar agradável, mas em mobile se o stagger for longo demais, o usuário pode ver elementos entrando devagar demais na rolagem rápida.

Importante que os parâmetros venham do mesmo motion.ts para manter padrão com outras seções.

What I Do
Arquivos-chave

src/components/sobre/AboutWhatIDo.tsx

src/components/sobre/what-i-do/DesktopCard.tsx

src/components/sobre/what-i-do/MobileCard.tsx

src/components/sobre/motion.ts

Desktop vs Mobile

Dois componentes distintos: DesktopCard e MobileCard:

Se o mobile não for a “fonte da verdade” (mobile-first), existe risco de:

Hierarquia diferente (ordem de informações, ícones, subtítulos).

Paddings/line-heights inconsistentes.

Em desktop:

Sem h-full nos cards e container com items-stretch ou grid-auto-rows, os cards em uma mesma linha podem ter alturas diferentes devido ao texto.

Motion

Variants possivelmente duplicados em cada tipo de card:

Risco de easing/duração diferentes entre mobile e desktop.

Em About, o ideal é todos os cards (independente do breakpoint) seguirem os presets definidos em motion.ts.

Portfolio Grid
Arquivos-chave

src/components/portfolio/PortfolioMosaicGrid.tsx

src/components/portfolio/MosaicCard.tsx

src/components/portfolio/PortfolioCard.tsx

src/components/portfolio/ProjectsGallery.tsx

src/components/portfolio/CategoryFilter.tsx

src/components/portfolio/ProjectModal.tsx

src/components/portfolio/PortfolioModalNew.tsx

Grid / alturas

Mosaico com vários tipos de card:

MosaicCard

PortfolioCard

Risco alto de:

Linhas com alturas visivelmente diferentes quando conteúdo/descrição variam.

“Vãos” verticais estranhos, principalmente em combinações de cards que spanam mais colunas/linhas.

Filtragem + motion

CategoryFilter + ProjectsGallery + modais:

Ao mudar filtros, cards entram/saem do grid.

Se as transições de filtro forem muito longas e os modais também tiverem fade/scale/backdrop blur pesados, é fácil gerar sensação de lentidão.

Responsividade

Em 2 colunas (md):

Mosaico pode produzir pares de cards grandes+pequenos que enfatizam ainda mais qualquer falta de alinhamento vertical.

É o breakpoint crucial para revisar equalização de alturas.

3️⃣ Lista de Problemas (Severidade)

Abaixo, problemas/riscos priorizados. Cada item deve ser validado no site em produção antes de ser tratado como bug confirmado.

🟡 Global — Inconsistência de tokens de layout entre CSS Modules e Tailwind

Seção afetada: Home Hero, Sobre (GhostEyes/beliefs), Portfolio Hero, grids em geral.

Descrição objetiva: Espaçamentos, larguras máximas e gutters definidos em múltiplos CSS Modules (HomeHero.module.css, HeroCopy.module.css, GhostStage.module.css, PortfolioHeroGallery.module.css, GhostEyes.module.css) em paralelo a utilitários Tailwind.

Impacto: Microdiferenças de padding/margin entre seções, quebrando o ritmo de scroll e aumentando o custo de manutenção.

🟡 Global — Falta de um sistema único de motion presets

Seção afetada: Home Hero (useHeroAnimation.ts), Sobre (motion.ts), Featured Projects, Portfolio Grid.

Descrição objetiva: Variants Framer Motion definidos em múltiplos arquivos, sem uma camada única de presets reutilizáveis.

Impacto: Animações equivalentes (ex.: fade-in de cards) com durations/easing distintos, reduzindo a unidade visual.

🟡 Home Hero — Possível descompasso entre texto, CTA e camada visual

Seção afetada: Home Hero / Manifesto.

Descrição objetiva: Hero montado a partir de vários componentes (copy, header, CTA, GhostAura, vídeo), com motion orquestrado via hook específico; sem timeline única, elementos podem entrar em tempos ligeiramente diferentes.

Impacto: Primeira dobra com ritmo irregular, especialmente visível em redes/devices mais lentos.

🟡 Home Hero / Manifesto — Dependência do load de vídeo para composição da dobra

Seção afetada: Manifesto.

Descrição objetiva: Vídeo manifesto e copy textual provavelmente entram com triggers diferentes (load x mount).

Impacto: Quebra de unidade da narrativa se o vídeo atrasar ou entrar muito depois do texto/CTA.

🟡 Featured Projects — Alturas e alinhamento irregulares entre cards e CTA

Seção afetada: Featured Projects.

Descrição objetiva: FeaturedProjectCard e CTAProjectCard no mesmo grid sem garantia explícita de h-full e items-stretch.

Impacto: Linhas “serrilhadas”, CTA descolado dos demais cards e sensação de grid pouco polido.

🟡 About — Offsets e gutters verticais inconsistentes entre blocos longos

Seção afetada: About (Hero, Origin, Beliefs, Method, What I Do, Closing).

Descrição objetiva: Cada seção define seus próprios espaçamentos, sem um token vertical global.

Impacto: Scroll que alterna entre blocos comprimidos e blocos com respiro demais, quebrando a narrativa contínua.

🟡 Origin — Risco de desalinhamento da timeline em breakpoints intermediários

Seção afetada: Origin.

Descrição objetiva: Componentização complexa em AboutOrigin.tsx facilita bugs de alinhamento entre marcadores, anos e conteúdo em 768–1024px.

Impacto: Timeline difícil de seguir visualmente em tablets/notebooks pequenos.

🟡 Method — Alturas diferentes entre etapas da mesma linha

Seção afetada: Method.

Descrição objetiva: Cards de etapas com quantidades de texto diferentes sem forçar h-full e items-stretch.

Impacto: Etapas que “parecem menos importantes” apenas porque ocupam menos altura.

🟡 What I Do — Drift visual entre DesktopCard e MobileCard

Seção afetada: What I Do.

Descrição objetiva: Dois componentes separados para a mesma informação, com risco de divergência em padding, tipografia e animações.

Impacto: Experiência diferente entre mobile e desktop, quebrando a ideia de uma mesma seção adaptativa.

🔴 Portfolio Grid — Falta de garantia forte de alturas uniformes por linha

Seção afetada: Portfolio Grid.

Descrição objetiva: Combinação de PortfolioMosaicGrid, MosaicCard, PortfolioCard e filtragem dinâmica sem evidência de grid-auto-rows + h-full.

Impacto: Cards desalinhados dentro da mesma linha, jumps visíveis ao filtrar categorias, perda de clareza na hierarquia de projetos.

🟡 Portfolio Grid — Sobreposição de animações de filtro + modais

Seção afetada: Portfolio Grid / Modals.

Descrição objetiva: Animações de entrada/saída do grid (filtro) e de modais (ProjectModal, PortfolioModalNew) potencialmente ocorrendo ao mesmo tempo.

Impacto: Sensação de peso, micro travadas em devices medianos e ruído no foco visual.

4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

Cada prompt é independente e já segue o modelo que você definiu. O foco é correção incremental, mobile-first, sem alterar texto ou hierarquia.

🛠️ Prompt #01 — Unificar tokens de layout entre CSS Modules e Tailwind
Objetivo:
Corrigir variações de espaçamento e largura entre seções causadas pelo uso paralelo de CSS Modules e Tailwind, garantindo gutters e paddings consistentes em Home, Sobre e Portfolio.

Arquivos:

src/app/globals.css

src/app/style.css

src/components/home/hero/HomeHero.module.css

src/components/home/hero/HeroCopy.module.css

src/components/home/hero/GhostStage.module.css

src/components/portfolio/PortfolioHeroGallery.module.css

src/components/sobre/GhostEyes.module.css

Ações:

Ajustar lógica de layout (grid/flex) para alinhamento consistente entre containers principais de cada página, usando a mesma escala de max-w-* e px-*.

Garantir altura uniforme dos blocos principais (dobras hero, seções About, hero do Portfolio) normalizando py-*/space-y-* com Tailwind, reduzindo variações em CSS Modules.

Refinar transições visuais entre seções evitando “degraus” bruscos de padding/margin entre blocos consecutivos.

Validar comportamento mobile-first conferindo especialmente 360–414px, 768–1024px e >1280px.

Regras:

Tailwind CSS apenas.

Framer Motion para animações existentes (não criar novas aqui).

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes.

Critérios de Aceite:



Gutters horizontais e verticais consistentes entre Home, Sobre e Portfolio.



Nenhuma quebra em <768px.



Transições suaves entre seções ao rolar.



Nenhuma regressão visual.

🛠️ Prompt #02 — Padronizar sistema de motion entre Home, Sobre e Portfolio
Objetivo:
Corrigir falta de padronização de timing/easing/stagger, criando um núcleo de presets de motion reutilizável.

Arquivos:

src/components/home/hero/useHeroAnimation.ts

src/components/sobre/motion.ts

src/components/home/featured-projects/FeaturedProjectsSection.tsx

src/components/portfolio/PortfolioMosaicGrid.tsx

src/components/portfolio/ProjectsGallery.tsx

src/components/ui/FloatingCards.tsx

Ações:

Ajustar lógica de layout (grid/flex) para facilitar aplicação de motion com layout/layoutId quando necessário, evitando reflows.

Garantir altura uniforme dos elementos animados em grids/listas para que as animações de entrada não distorçam o layout.

Refinar animação Framer Motion centralizando durations, easings e stagger em um módulo comum e aplicando-o em Hero, Featured Projects, About e Portfolio.

Validar comportamento mobile-first, reduzindo duração total de animações iniciais em mobile (<800ms na primeira dobra).

Regras:

Tailwind CSS apenas.

Framer Motion para animações.

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes (apenas módulo utilitário de motion).

Critérios de Aceite:



Animações de cards e headings com timing/easing uniforme em todo o site.



Nenhuma quebra em <768px.



Animações suaves e consistentes.



Nenhuma regressão visual.

🛠️ Prompt #03 — Sincronizar texto, vídeo e CTA no Home Hero
Objetivo:
Corrigir possíveis descompassos entre HeroCopy, VideoManifesto, GhostAura e CTA, garantindo uma entrada coordenada.

Arquivos:

src/components/home/hero/HomeHero.tsx

src/components/home/hero/HeroCopy.tsx

src/components/home/hero/HeroHeader.tsx

src/components/home/hero/HeroCTA.tsx

src/components/home/hero/GhostAura.tsx

src/components/home/hero/VideoManifesto.tsx

src/components/home/hero/useHeroAnimation.ts

Ações:

Ajustar lógica de layout (grid/flex) para assegurar que texto, vídeo e CTA compartilhem o mesmo baseline visual em desktop e uma ordem clara em mobile.

Garantir altura uniforme da dobra hero em diferentes alturas de viewport, evitando clipping de vídeo ou CTA.

Refinar animação Framer Motion no useHeroAnimation.ts para orquestrar copy, CTA e camada visual em uma timeline única, considerando estados de loading do vídeo.

Validar comportamento mobile-first, garantindo leitura completa da mensagem principal sem necessidade de scroll imediato.

Regras:

Tailwind CSS apenas.

Framer Motion para animações.

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes.

Critérios de Aceite:



Texto, vídeo e CTA entram de forma sincronizada e previsível.



Nenhuma quebra em <768px.



Animações suaves e consistentes.



Nenhuma regressão visual.

🛠️ Prompt #04 — Normalizar altura e alinhamento dos cards de Featured Projects
Objetivo:
Corrigir diferenças de altura e desalinhamento entre FeaturedProjectCard e CTAProjectCard dentro da mesma linha.

Arquivos:

src/components/home/featured-projects/FeaturedProjectsSection.tsx

src/components/home/featured-projects/FeaturedProjectCard.tsx

src/components/home/featured-projects/CTAProjectCard.tsx

Ações:

Ajustar lógica de layout (grid/flex) para items-stretch e garantir que todos os cards recebam h-full.

Garantir altura uniforme dos cards usando grid-auto-rows consistente ou flex com flex-grow em cada card.

Refinar animação Framer Motion (timing, easing, stagger) para que cards de projeto e card CTA sigam exatamente o mesmo preset.

Validar comportamento mobile-first, garantindo que em 1 coluna não haja cards desproporcionalmente altos.

Regras:

Tailwind CSS apenas.

Framer Motion para animações.

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes.

Critérios de Aceite:



Cards com mesma altura na mesma linha (incluindo CTA).



Nenhuma quebra em <768px.



Animações suaves e consistentes.



Nenhuma regressão visual.

🛠️ Prompt #05 — Equalizar alturas e ritmo das etapas em Method
Objetivo:
Corrigir alturas irregulares entre cards de etapas e harmonizar o ritmo das animações.

Arquivos:

src/components/sobre/AboutMethod.tsx

src/components/sobre/motion.ts

Ações:

Ajustar lógica de layout (grid/flex) para que todas as etapas usem h-full e o container aplique items-stretch/grid-auto-rows.

Garantir altura uniforme dos cards independente do volume de texto, alinhando ícones, títulos e descrições dentro de uma mesma estrutura de flex.

Refinar animação Framer Motion em motion.ts para aplicar o mesmo stagger/timing em todas as etapas, evitando discrepâncias entre linhas.

Validar comportamento mobile-first assegurando boa leitura em 1 coluna, sem gaps exagerados entre etapas.

Regras:

Tailwind CSS apenas.

Framer Motion para animações.

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes.

Critérios de Aceite:



Cards/etapas com mesma altura visual na mesma linha.



Nenhuma quebra em <768px.



Animações suaves e consistentes.



Nenhuma regressão visual.

🛠️ Prompt #06 — Harmonizar DesktopCard e MobileCard na seção What I Do
Objetivo:
Corrigir divergências de layout, altura e animação entre os componentes DesktopCard e MobileCard.

Arquivos:

src/components/sobre/AboutWhatIDo.tsx

src/components/sobre/what-i-do/DesktopCard.tsx

src/components/sobre/what-i-do/MobileCard.tsx

src/components/sobre/motion.ts

Ações:

Ajustar lógica de layout (grid/flex) em AboutWhatIDo.tsx para garantir que o fluxo seja mobile-first (MobileCard como base) e DesktopCard apenas em breakpoints maiores via Tailwind.

Garantir altura uniforme dos cards desktop usando h-full e containers com items-stretch ou grids com grid-auto-rows.

Refinar animação Framer Motion para que DesktopCard e MobileCard usem o mesmo preset de entrada, adaptado apenas em intensidade se necessário.

Validar comportamento mobile-first garantindo que ordem e hierarquia de conteúdo sejam equivalentes entre mobile e desktop.

Regras:

Tailwind CSS apenas.

Framer Motion para animações.

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes.

Critérios de Aceite:



Cards desktop com mesma altura por linha.



Hierarquia e ordem do conteúdo equivalentes entre mobile e desktop.



Nenhuma quebra em <768px.



Animações suaves e consistentes.

🛠️ Prompt #07 — Refinar layout e responsividade da timeline de Origin
Objetivo:
Corrigir desalinhamentos e quebras de layout na timeline da seção Origin, especialmente em breakpoints intermediários.

Arquivos:

src/components/sobre/AboutOrigin.tsx

src/components/sobre/motion.ts

Ações:

Ajustar lógica de layout (grid/flex) para que cada bloco (ano/marcador + texto) se comporte como unidade, evitando que elementos se separem entre colunas/linhas.

Garantir altura uniforme dos blocos de timeline por linha, se houver uma grade de duas colunas, para evitar zig-zag visual.

Refinar animação Framer Motion (timing, easing, stagger) garantindo uso apenas de transform/opacity, evitando animar propriedades de layout e sombras.

Validar comportamento mobile-first garantindo leitura linear (1 coluna) sem que marcadores fiquem visualmente deslocados.

Regras:

Tailwind CSS apenas.

Framer Motion para animações.

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes.

Critérios de Aceite:



Blocos de timeline alinhados horizontal e verticalmente em todos os breakpoints.



Nenhuma quebra em <768px e 768–1024px.



Animações suaves e sem jank.



Nenhuma regressão visual.

🛠️ Prompt #08 — Normalizar alturas e transições no Portfolio Mosaic Grid
Objetivo:
Corrigir alturas irregulares de cards e movimentos bruscos de layout durante filtragem na grade de Portfolio.

Arquivos:

src/app/portfolio/page.tsx

src/app/portfolio/PortfolioClient.tsx

src/components/portfolio/PortfolioMosaicGrid.tsx

src/components/portfolio/MosaicCard.tsx

src/components/portfolio/PortfolioCard.tsx

src/components/portfolio/ProjectsGallery.tsx

src/components/portfolio/CategoryFilter.tsx

Ações:

Ajustar lógica de layout (grid/flex) em PortfolioMosaicGrid/ProjectsGallery para aplicar items-stretch/grid-auto-rows garantindo altura uniforme por linha.

Garantir altura uniforme dos diferentes tipos de card (MosaicCard, PortfolioCard) usando h-full em seus wrappers.

Refinar animação Framer Motion na filtragem (CategoryFilter → ProjectsGallery) para minimizar jumps de layout, usando layout/layoutId e transições curtas.

Validar comportamento mobile-first, conferindo que em 1–2 colunas o grid não produza overflows horizontais nem lacunas grandes.

Regras:

Tailwind CSS apenas.

Framer Motion para animações.

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes.

Critérios de Aceite:



Cards com mesma altura na mesma linha.



Nenhuma quebra em <768px.



Animações de filtro suaves, sem saltos de layout.



Nenhuma regressão visual.

🛠️ Prompt #09 — Otimizar sobreposição de animações de modais no Portfolio
Objetivo:
Reduzir sobreposição de animações pesadas entre grid, filtro e modais de projeto para melhorar fluidez.

Arquivos:

src/components/portfolio/ProjectsGallery.tsx

src/components/portfolio/ProjectModal.tsx

src/components/portfolio/PortfolioModalNew.tsx

src/components/portfolio/modal/...

Ações:

Ajustar lógica de layout (grid/flex) para que, ao abrir o modal, o grid permaneça estável, sem reflows desnecessários.

Garantir altura uniforme dos cards mesmo com o modal aberto, evitando que o open/close do overlay influencie o layout do grid.

Refinar animação Framer Motion dos modais, reduzindo combinações simultâneas pesadas (fade + scale + blur) e privilegiando opacity + transform simples.

Validar comportamento mobile-first testando abertura/fechamento de modais em devices mais lentos e conexões 3G.

Regras:

Tailwind CSS apenas.

Framer Motion para animações.

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes.

Critérios de Aceite:



Grid estável com modal aberto/fechado.



Nenhuma quebra em <768px.



Animações de modal suaves, sem lags perceptíveis.



Nenhuma regressão visual.

🛠️ Prompt #10 — Equalizar offsets e espaçamento vertical na página About
Objetivo:
Corrigir variações de espaçamento vertical entre AboutHero, Origin, Method, What I Do e Beliefs, garantindo narrativa de scroll contínua.

Arquivos:

src/components/sobre/AboutHero.tsx

src/components/sobre/AboutOrigin.tsx

src/components/sobre/AboutMethod.tsx

src/components/sobre/AboutWhatIDo.tsx

src/components/sobre/AboutBeliefs.tsx

src/components/sobre/BeliefSection.tsx

src/components/sobre/BeliefFinalSection.tsx

src/components/sobre/BeliefFixedHeader.tsx

Ações:

Ajustar lógica de layout (grid/flex) dos wrappers de cada seção para que usem a mesma escala de py-* global.

Garantir altura uniforme do “inicio” visual de cada bloco (hero, origin, method, what I do) medindo a distância da borda superior do viewport quando entram em foco.

Refinar animações Framer Motion existentes apenas para adequar offsets de entrada (por ex.: initial/whileInView) sem alterar a intenção visual.

Validar comportamento mobile-first verificando a narrativa completa de cima a baixo em 360–414px, ajustando qualquer seção que pareça “grudada” ou com respiro excessivo.

Regras:

Tailwind CSS apenas.

Framer Motion apenas onde já existe.

Não alterar conteúdo textual.

Comparar visualmente com site em produção.

Não introduzir novos componentes.

Critérios de Aceite:



Gutters verticais consistentes entre seções da página About.



Nenhuma quebra em <768px.



Transições suaves no scroll, sem “saltos” visuais.



Nenhuma regressão visual.

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


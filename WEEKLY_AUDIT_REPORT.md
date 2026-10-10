# 📊 RELATÓRIO DE AUDITORIA SEMANAL AUTOMATIZADA
**Data:** 03 de Janeiro de 2026
**Projeto:** Portfólio Danilo Novais (`portfoliodanilo.com`)
**Status do Repositório:** Totalmente Tipado (0 Type Errors / 0 Lint Errors)

---

### 1️⃣ Visão Geral

O repositório do portfólio de Danilo Novais apresenta uma arquitetura robusta baseada em **Next.js 16 (App Router)**, **React 19**, **TypeScript (Strict Mode)**, **Tailwind CSS v4**, **Framer Motion 12**, **React Three Fiber (WebGL)** e **Supabase Storage**. A suíte de validação automatizada (`pnpm run build-check`) passa sem nenhum erro de tipagem ou linting, indicando um alto nível de higiene no código.

As três páginas principais da aplicação e o módulo Admin mantêm um alinhamento funcional elevado, porém foram identificadas inconsistências pontuais entre o comportamento em tempo de execução e a **Documentação de Referência (Verdade Absoluta)** em `.context/DOCS-PORTFOLIO-PAGES/`:

1. **Home Page (`/`):** A estrutura de empilhamento `z-index` e a transição da miniatura do Manifesto em vídeo na viewport Desktop diferem parcialmente do estado de "Hold de 2 segundos + Unmute" especificado na documentação da seção Hero.
2. **Sobre Page (`/sobre`):** O layout horizontal da seção "O Que Eu Faço" e a sticky gallery de "Origem Criativa" apresentam comportamentos assíncronos no cálculo de offset e transições de entrada no mobile.
3. **Portfólio Grid (`/portfolio`):** O cálculo das alturas dos cards em linhas idênticas e o comportamento de troca de vídeo/imagem estática no hover necessitam de padronização estrita de conteinerização flex/grid.
4. **Painel Admin (`/admin`):** Módulos funcionais e rotas protegidas operam com integridade, necessitando ajuste de alinhamento visual nos cards de mídia e preenchimento responsivo.

---

### 2️⃣ Diagnóstico por Seção

#### 🏠 Home Hero
- **Z-Index Stack:** No componente `HomeHero.tsx`, as camadas de texto (`HeroCopy`), canvas 3D (`GhostSceneWrapper`) e CTA (`HeroCTA`) utilizam variáveis CSS (`var(--z-layer-content)`, `var(--z-layer-3d)`). A regra da documentação exige a ordem rigorosa: `Preloader (z-50) > ManifestoThumb (z-30) > Ghost WebGL (z-20) > Hero Text (z-10) > Background (z-0)`, garantindo `pointer-events-none` no container 3D.
- **Scroll Sequence:** No desktop, a transição entre o hero e o manifesto ocorre em dois componentes separados (`HomeHero` e `VideoManifesto`), em vez da transição fluida de miniatura flutuante com trava de scroll (*scroll hold*) descrita na especificação de UX da Home.

#### 🎬 Manifesto
- **Comportamento de Áudio e Hold:** O `VideoManifesto.tsx` possui alternador de som manual, porém não executa o desmudo automático ao atingir estado fullscreen com travamento de 2s no scroll e retorno ao estado mudo ao sair da viewport no desktop.
- **Enquadramento Responsivo:** O vídeo utiliza `aspect-square` no mobile e `aspect-[752/423]` no desktop com `object-contain`. Em telas intermediárias (tablets e laptops com aspect ratio diferente), surgem bordas pretas laterais não desejadas.

#### 🗂️ Featured Projects
- **Alinhamento Vertical de Cards (Regra das Alturas Identicas):** Em `FeaturedProjectsSection.tsx`, os cards ocupam um Bento Grid de 12 colunas (`md:col-span-5` + `md:col-span-7` na linha 1; `md:col-span-8` + `md:col-span-4` na linha 3). Embora o container grid utilize `items-stretch`, a variação no número de linhas dos títulos dos projetos faz com que os blocos de metadados (`pt-6 mt-auto`) variem de altura, exigindo um container com `h-full flex flex-col justify-between` unificado.
- **Transição CTA Project Card:** O card final de CTA possui altura fixa por breakpoint (`min-h-[320px] md:min-h-[360px]`), o que pode causar desalinhamento de 8px a 16px em relação ao Card 4 adjacente.

#### 👤 About (Origin / Method / What I Do)
- **Origem Criativa (`AboutOrigin.tsx`):** O componente `OriginStickyGallery` realiza o cálculo de offset via GSAP/Framer Motion. Em telas mobile (< 768px), os blocos textuais verticais empilhados acumulam espaço em branco antes do término da galeria sticky.
- **O Que Eu Faço (`AboutWhatIDo.tsx`):** No desktop, o track horizontal desliza no eixo X (`10%` a `-40%`) baseado no scroll vertical (`180vh`). No mobile, a animação utiliza `useSpring` para cards individuais que entram da direita; em dispositivos de baixo desempenho, pode ocorrer travamento por recalculação de layout no evento de scroll.
- **Como Eu Trabalho (`AboutMethod.tsx`):** A lista de passos utiliza `border-b border-bluePrimary/30`. O padding dos itens no mobile fica comprimido em telas com largura inferior a 360px.

#### 🖼️ Portfolio Grid
- **Padronização de Sizing (`ProjectCard.tsx`):** Os tamanhos de card (`sm`, `md`, `lg`, `wide`, `tall`) aplicam proporções `aspect-[4/5]`, `aspect-[8/5]`, `aspect-[16/9]`. Em linhas mistas (ex: dois cards `sm` de 4 colunas + um card de 4 colunas), pequenas diferenças no padding e borda causam variações sutis na altura total renderizada no browser.
- **Carregamento de Mídia no Hover:** O vídeo no hover é renderizado condicionalmente ao primeiro passe de hover (`hasHoverRef.current`). Quando o cursor passa rapidamente por múltiplos cards, ocorrem chamadas paralelas de prefetch de vídeo sem cancelamento via `AbortController`.

---

### 3️⃣ Lista de Problemas e Backlog Priorizado

| ID | Severidade | Seção | Descrição do Problema | Impacto |
| :--- | :--- | :--- | :--- | :--- |
| **P0-1** | 🔴 P0 (Crítico) | Featured Projects | Desalinhamento na altura vertical dos cards e do CTA card em linhas compartilhadas do Bento Grid devido a variações na quantidade de linhas de título. | Violação direta da Regra Absoluta do projeto (Cards na mesma linha devem ter altura idêntica). |
| **P0-2** | 🔴 P0 (Crítico) | Home Hero / WebGL | Divergência na hierarquia de `z-index` do `HomeHero.tsx` em relação à especificação da documentação e `AGENTS.md` (WebGL layer cobrindo interatividade de texto). | Risco de bloquear eventos de clique/hover nos links de CTA e títulos do Hero. |
| **P1-1** | 🟡 P1 (Estrutural) | Video Manifesto | Ausência do ciclo automatizado de Unmute/Mute baseado na posição de scroll em estado Fullscreen. | Experiência de UX incompleta na transição do vídeo de apresentação da marca. |
| **P1-2** | 🟡 P1 (Estrutural) | Portfolio Grid | Disparo descontrolado de requisições de vídeo no hover em galerias com múltiplos cards em sequência rápida. | Aumento desnecessário do consumo de banda no Supabase Storage e travamento leve da thread principal. |
| **P1-3** | 🟡 P1 (Estrutural) | About (What I Do) | Cálculo de scroll horizontal na seção "O Que Eu Faço" no mobile causando layout shift e stuttering em CPUs móveis. | Redução da fluidez (FPS < 50) e queda no score do Core Web Vitals (CLS/INP). |
| **P2-1** | 🟢 P2 (Polimento) | About (Origin) | Espaçamento vertical acumulado nos blocos de texto da Origem Criativa no mobile. | Ajuste fino de layout e ritmo editorial. |
| **P2-2** | 🟢 P2 (Polimento) | Portfolio Filter | Animação do indicador de filtro ativo (`layoutId="activeFilter"`) apresentando pequeno salto de posição ao trocar de página via paginação. | Polimento visual de microinteração. |
| **P2-3** | 🟢 P2 (Polimento) | Admin Media | Grid de cards do modal de mídias no Admin sem min-height fixo nos contêineres de imagem. | Polimento de layout no painel gerencial. |
| **P2-4** | 🟢 P2 (Polimento) | Footer Mobile | Espaçamento de toque dos links do rodapé no mobile ligeiramente inferior a 48px em telas pequenas. | Acessibilidade (WCAG Touch Target Size). |

---

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Ajuste Rigoroso de Altura Identica e Flex Stretch no Bento Grid de Featured Projects**
> **Objetivo:** Garantir que todos os cards de projetos e o card CTA na mesma linha do Bento Grid tenham rigorosamente a mesma altura vertical e preenchimento horizontal de 100%.
> **Arquivos:** `src/components/home/featured-projects/FeaturedProjectsSection.tsx`, `src/components/home/featured-projects/FeaturedProjectCard.tsx`, `src/components/home/featured-projects/CTAProjectCard.tsx`
> **Ações:**
> 1. Inspecionar as classes dos contêineres pai no `FeaturedProjectsSection.tsx` e aplicar `grid items-stretch` de forma estrita em cada linha (`row`).
> 2. No `FeaturedProjectCard.tsx` e `CTAProjectCard.tsx`, alterar o invólucro para `h-full w-full flex flex-col justify-between items-stretch`.
> 3. Ajustar o elemento de mídia interno e a área de metadados (`pt-6 mt-auto`) para que o frame de mídia expanda flexivelmente (`flex-1 min-h-0`) e force os blocos de texto de todos os cards da mesma linha a alinharem seus rodapés perfeitamente.
> 4. Remover min-heights fixos incompatíveis no `CTAProjectCard.tsx` e utilizar `h-full` para herdar a altura exata do card de projeto adjacente.
> **Regras:**
> - Usar estritamente utilitários Tailwind CSS (`flex-1`, `h-full`, `items-stretch`, `min-h-0`).
> - Manter padrão mobile-first (pilha vertical em telas de até 767px e grid de 12 colunas a partir de 1024px).
> - Comparar o resultado com a especificação em `.context/DOCS-PORTFOLIO-PAGES/01-HOME/05-FEATURED-PROJECTS/`.
> **Critérios de Aceite:**
> - [ ] Cards da linha 1 (Card 1 e Card 2) possuem exata mesma altura vertical medida em pixels.
> - [ ] Cards da linha 3 (Card 4 e CTA Card) possuem exata mesma altura vertical medida em pixels.
> - [ ] Zero overflow horizontal ou quebra do grid em viewport móvel ou desktop.

---

> **### 🛠️ Prompt #02 — Correção da Hierarquia de Z-Index e Pointer-Events no Home Hero**
> **Objetivo:** Ajustar a pilha de z-index do `HomeHero.tsx` conforme a regra absoluta do `AGENTS.md` e garantir que o Canvas WebGL não bloqueie interações de texto e CTA.
> **Arquivos:** `src/components/home/hero/HomeHero.tsx`, `src/components/canvas/home/hero/GhostSceneWrapper.tsx`
> **Ações:**
> 1. Atualizar a declaração dos z-indexes em `HomeHero.tsx` para seguir exatamente: Preloader (`z-[50]`), Miniatura Manifesto (`z-[30]`), WebGL Canvas Layer (`z-[20]`), Texto Editorial Hero Copy (`z-[10]`), Background (`z-[0]`).
> 2. Assegurar que o container da camada WebGL possua a classe `pointer-events-none` e que apenas o canvas R3F capture eventos de mouse se o hover 3D estiver ativo.
> 3. Verificar se o CTA botão do Hero (`HeroCTA`) permanece na camada superior (`z-[40]` ou `z-[50]`) com `pointer-events-auto` totalmente clicável.
> **Regras:**
> - Obedecer rigorosamente à hierarquia Z-Index definida em `AGENTS.md` (Seção 5).
> - Garantir que a camada WebGL seja decorativa e nunca intercepte cliques nos textos ou links.
> **Critérios de Aceite:**
> - [ ] Textos e CTA do Hero são perfeitamente selecionáveis e clicáveis via mouse e touch.
> - [ ] Preloader aparece sobre todos os elementos durante o carregamento inicial.
> - [ ] NENHUM erro de console relacionado a eventos de ponteiro no Canvas.

---

> **### 🛠️ Prompt #03 — Sincronização do Ciclo de Áudio e Scroll Hold no Video Manifesto**
> **Objetivo:** Implementar o desmudo automático com travamento suave de scroll de 2s quando o vídeo manifesto atinge o estado fullscreen na Home.
> **Arquivos:** `src/components/home/hero/VideoManifesto.tsx`, `src/config/brand.ts`
> **Ações:**
> 1. Adicionar lógica de observação de interseção precisa em `VideoManifesto.tsx` monitorando quando o progresso de scroll da seção atinge o estado de tela cheia (`scrollYProgress === 1`).
> 2. Quando em tela cheia na viewport Desktop, acionar temporizador de 2 segundos de retenção visual e alternar a propriedade `muted` do elemento de vídeo para `false` (com tratamento para política de Autoplay do browser).
> 3. Ao rolar para fora do estado de tela cheia ou sair da viewport, retornar o áudio para `muted = true`.
> 4. Garantir que em dispositivos móveis ou sob preferência por movimento reduzido (`prefers-reduced-motion`), o vídeo permaneça sempre mudo até que o usuário clique explicitamente no botão de alternância de áudio.
> **Regras:**
> - Utilizar Framer Motion / Lenis scroll callbacks sem bloquear a renderização.
> - Tratar rejeições de promessa no método `.play()` do HTMLVideoElement graciosamente.
> **Critérios de Aceite:**
> - [ ] O vídeo desmuta automaticamente ao atingir 100% de presença central no desktop se houver interação prévia do usuário.
> - [ ] O vídeo volta ao estado mudo imediatamente ao rolar para a próxima seção.
> - [ ] O botão manual de som continua funcionando como override em qualquer momento.

---

> **### 🛠️ Prompt #04 — Otimização de Prefetch e Debounce de Mídia no Hover do Portfolio Grid**
> **Objetivo:** Evitar requisições de mídia em cascata quando o usuário passa o cursor rapidamente por múltiplos cards no grid de portfólio.
> **Arquivos:** `src/components/portfolio/ProjectCard.tsx`, `src/components/portfolio/ProjectsGallery.tsx`
> **Ações:**
> 1. Implementar um pequeno debounce (ex: 150ms) antes de alterar o estado `hasHoverRef.current` / `isHovered` em `ProjectCard.tsx`.
> 2. Se o cursor sair do card (`onMouseLeave`) antes do limite de 150ms, cancelar o carregamento do recurso de vídeo.
> 3. Utilizar atribuição condicional de atributos de prefetch/preload (`preload="none"` por padrão até que o debounce seja confirmado).
> **Regras:**
> - Manter o card renderizando a imagem estática WebP por padrão.
> - Não causar recomposição visual ou layout shift ao carregar o vídeo.
> **Critérios de Aceite:**
> - [ ] Passar o cursor rapidamente por 10 cards no grid dispara 0 requisições de vídeo desnecessárias no Network Tab.
> - [ ] Manter o cursor sobre um card por mais de 150ms inicia o carregamento e reprodução suave do vídeo no hover.

### 1️⃣ Visão Geral
O portfólio de Danilo Novais (portfoliodanilo.com) encontra-se em um estado maduro, com a arquitetura `App Router` do Next.js estabelecida e com o padrão "Ghost Design" amplamente aplicado por todo o frontend. As rotas principais (`/`, `/sobre`, `/portfolio`) exibem aderência considerável aos layouts especificados. A UI faz uso robusto de renderização via WebGL (`React Three Fiber`) coordenada com scroll responsivo e revelações graduais via `Framer Motion`.

A área `ADMIN` possui sistema de autenticação sólido integrado ao Supabase, layouts organizados que aderem ao design de "Terminal / System Console", e gerencia com sucesso os modelos e blocos das Landing Pages (V1, V2, V3_ALPA). Contudo, há discrepâncias entre a Verdade Absoluta (arquivos `.context/DOCS-PORTFOLIO-PAGES/`) e o estado atual do código-fonte em termos de alinhamento vertical dos cards, margens dos grids (falta do uso correto da classe `std-grid` em alguns containers em detrimento de abordagens mistas com classes inline) e certas sobreposições da UI que afetam interações de cliques por causa dos layouts de z-index, particularmente quando se usa motion layers sem a aplicação consistente de `pointer-events-none`.

### 2️⃣ Diagnóstico por Seção

**Home Hero & Manifesto**
- **Sincronia Framer Motion e Three.js**: Implementada corretamente. A sincronia do overlay 2D text (via máscara de opacidade animada) sobre o modelo 3D WebGL (GhostCanvas) funciona. A regra do `.context` exige que camadas atmosféricas que cobrem links ou CTAs não bloqueiem o usuário. A classe `pointer-events-none` foi verificada na div do wrapper principal 3D e nos backgrounds.
- **Vídeo Manifesto**: No mobile, há um problema potencial de `aspect-video` forçado (`sm:aspect-video`) contra o layout que requer que ele não sofra cortes e ocupe toda a largura disponível sem amassar a proporção. Há `pointer-events` consistentes no container do controle de volume.

**Featured Projects**
- **Visualização da Landing Page e Cards**: Utiliza um "bento grid" dinâmico com proporções fixas (Row 1 com 4/7 ou 5/7 colunas, etc). A lógica do CSS para "card heights" dita as larguras com classes flexíveis, mas *não garante vertical heights padronizados e idênticos na mesma row para resoluções fluidas de tablet/desktop abaixo do breakpoint max*, resultando em quebras caso as descrições ou thumbnails sejam diferentes.
- O card `CTAProjectCard` tem seu bloco com altura explícita forçada, o que pode causar desalinhamento em relação ao card adjacente.

**About (Origin/Method/What I Do)**
- A seção `AboutWhatIDo` em Mobile possui um problema potencial de navegação no carrossel/scroll se depender unicamente das animações do `Framer Motion`.
- `AboutMethod` possui as sobreposições de overlay gradiente escuro ok, no entanto está misturando a estrutura de grid antiga com a classe `std-grid` e criando paddings redundantes (`lg:grid-cols-12` mesclado com utilitários flexbox flex-col em áreas que deveriam ser puramente baseadas na classe global `std-grid`).

**Portfolio Grid & Trabalhos Postados**
- **Listagem e Renderização**: O grid implementa paginação e embaralhamento nativo (`shufflePortfolioProjects`) se não houver backend de suporte. Os links do componente baseiam-se em Next `Link` envolvido com Framer (ou não dependendo do context), o que obedece a restrição do framework sobre recarregamento da página.
- **Roteamento de Projetos**: Os projetos diferenciam entre `/projects/[slug]` (Internal Landing Pages V1/V2/V3) ou redirecionamento para Modais (quando o external url não é passado).

### 3️⃣ Lista de Problemas e Backlog Priorizado

**🔴 P0 (Crítico)**
- Nenhum problema de quebra imediata ou bloqueio de navegação detectado.

**🟡 P1 (Estrutural)**
- **Alinhamento Vertical dos Cards (Home - Featured Projects):** Os cards na section `FeaturedProjectsSection` dependem de classes flex e proporções de width variadas (bento grid), porém quando dispostos lado a lado, o conteúdo dinâmico altera suas alturas originais no fluxo normal do documento flex. Eles devem compartilhar exatamente a mesma altura vertical.
- **Consistência do Contêiner Global (`std-grid` vs Múltiplos utilitários):** A seção `AboutMethod` implementa um wrapper `std-grid` mas logo em seguida declara divs internas com `lg:grid-cols-12`, que conflita ou duplica configurações do layout global de grids estabelecido nos padrões do tailwind.

**🟢 P2 (Polimento Rápido)**
- **Aspect Ratio no Video Manifesto Mobile**: Revisar as opções de enquadramento do componente `<video>` para assegurar que ele respeite sua proporção original no view e não sofra deformações usando object-cover atrelado a tamanhos rígidos de tela em breakpoints menores.

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Padronização Vertical Bento Grid Home**
> **Objetivo:** Corrigir grid de cards no Featured Projects para preenchimento 100% vertical garantindo a mesma altura na linha.
> **Arquivos:** `src/components/home/featured-projects/FeaturedProjectsSection.tsx`, `src/components/home/featured-projects/FeaturedProjectCard.tsx`
> **Ações:**
> 1. Na definição do Grid pai (Bento Grid), adicionar ou confirmar o uso do utilitário `items-stretch` ou `grid-rows-[1fr]`.
> 2. Alterar a div root em `FeaturedProjectCard.tsx` para assegurar a distribuição do eixo Y (`h-full flex flex-col justify-between`).
> 3. Certificar-se de que a tag/thumbnail expande utilizando todo o resíduo da div com `flex-1` ou `flex-grow`.
> **Regras:** Usar o sistema Tailwind existente sem introduzir CSS Modules ou arquivos externos adicionais. Manter Mobile-first com alturas dinâmicas para empilhamento nativo.
> **Critérios de Aceite:**
> - [ ] Os dois cards do topo (`md:col-span-4` e `md:col-span-8` ou combinações equivalentes) possuem a exata mesma altura computada ao lado um do outro.
> - [ ] O container da miniatura do projeto preenche todo o espaço vertical disponível no card sem afetar o espaço destinado ao rodapé de meta-descrição.
> - [ ] As atualizações não interferem com a variante de animação `framer-motion` acoplada ao parent container.

> **### 🛠️ Prompt #02 — Unificação de Grid em AboutMethod**
> **Objetivo:** Refatorar a malha de marcação da seção "Method" para usar puramente a convenção `std-grid` ou uma variação simplificada de containers limitantes, eliminando conflitos de largura na Viewport Desktop.
> **Arquivos:** `src/components/sobre/sections/AboutMethod.tsx`
> **Ações:**
> 1. Remover grids aninhados redundantes: Retirar a lógica `lg:grid-cols-12` da div interna caso já esteja englobada por um `std-grid`.
> 2. Configurar o padding correto (horizontal layout clamp) via variáveis de design ou padronização Tailwind especificada nos docs.
> **Regras:** Respeitar rigidamente o espaçamento horizontal ditado no `GHOST-DESIGN-SYSTEM.md` ou documentação core do projeto.
> **Critérios de Aceite:**
> - [ ] O bloco de texto do Method Section alinha-se perfeitamente com os limites impostos pelos componentes ao redor.
> - [ ] Nenhuma nova sobreposição ou z-index quebrado afeta os fundos gradientes sobre o vídeo que toca de fundo.
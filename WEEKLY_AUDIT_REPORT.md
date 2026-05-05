### 1️⃣ Visão Geral
O portfólio de Danilo Novais (portfoliodanilo.com) encontra-se com a arquitetura `App Router` do Next.js estabelecida e com o padrão "Ghost Design" amplamente aplicado por todo o frontend. As rotas principais (`/`, `/sobre`, `/portfolio`) exibem aderência considerável aos layouts especificados. A UI faz uso robusto de renderização via WebGL (`React Three Fiber`) coordenada com scroll responsivo e revelações graduais via `Framer Motion`.

A área `ADMIN` possui sistema de autenticação sólido integrado ao Supabase, layouts organizados que aderem ao design de "Terminal / System Console", e gerencia com sucesso os modelos e blocos das Landing Pages. Contudo, há discrepâncias entre a Verdade Absoluta (arquivos `.context/DOCS-PORTFOLIO-PAGES/`) e o estado atual do código-fonte em termos de alinhamento vertical dos cards (Home), e as margens dos grids (falta do uso correto da classe `std-grid` no componente `AboutMethod.tsx` em detrimento de abordagens mistas com classes inline).

### 2️⃣ Diagnóstico por Seção
- **Home Hero & Manifesto**
  A sincronia do Framer Motion e Three.js está implementada corretamente. O overlay 2D sobre o modelo 3D WebGL (GhostCanvas) não bloqueia a interação, e o `pointer-events-none` foi verificado no wrapper do 3D. Em relação ao vídeo Manifesto no mobile, ele utiliza classes responsivas como `object-cover` mas deve ser revisado se não há "cortes" inesperados dependendo da proporção da tela.
- **Featured Projects**
  A seção de Featured Projects está utilizando um "bento grid" dinâmico. O comportamento atual do grid faz com que as alturas não sejam as mesmas em cards pareados nas mesmas linhas. Há uma violação da regra obrigatória sobre garantir que todos os cards em uma mesma linha tenham sempre a mesma altura vertical. O `CTAProjectCard` tem seu bloco com altura explícita forçada, o que também causa desalinhamento.
- **About (Origin/Method/What I Do)**
  A seção `AboutMethod` aplica um background de vídeo com overlay, o que funciona bem, porém o container principal está com grids aninhados desnecessários (misturando `std-grid` e `lg:grid-cols-12`). Isso conflita com a organização fluida global definida pelo `std-grid` em `globals.css`.
- **Portfolio Grid & Trabalhos Postados**
  A listagem implementa paginação e renderização correta com Next `Link` envolto em `motion.create()` mantendo as animações de Client-Side Routing perfeitas. Visualização e abertura dos projetos estão de acordo com o padrão do portfólio.

### 3️⃣ Lista de Problemas e Backlog Priorizado
- 🟡 P1 (Estrutural) - **Alinhamento Vertical dos Cards (Home - Featured Projects):** Os cards na seção `FeaturedProjectsSection` usam proporções variadas. Quando dispostos na mesma linha, as alturas variam dependendo do conteúdo interno. Eles devem ser padronizados (flex ou grid) para terem exatamente a mesma altura em suas linhas correspondentes.
- 🟡 P1 (Estrutural) - **Consistência do Contêiner Global em AboutMethod:** A seção `AboutMethod` implementa um wrapper com classe `std-grid` mas logo em seguida declara grids inline (`lg:grid-cols-12`), que duplica e confunde os paddings/margens e pode causar overflows não previstos.
- 🟢 P2 (Polimento Rápido) - **Aspect Ratio no Video Manifesto Mobile:** Certificar que o container de vídeo não distorce seu próprio `object-cover` durante as trocas de resolução (Portrait/Landscape).

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)
> **### 🛠️ Prompt #01 — Padronização Vertical Bento Grid Home**
> **Objetivo:** Corrigir grid de cards na seção Featured Projects para garantir a mesma altura em todas as colunas de uma mesma linha.
> **Arquivos:** `src/components/home/featured-projects/FeaturedProjectsSection.tsx`, `src/components/home/featured-projects/FeaturedProjectCard.tsx`
> **Ações:**
> 1. No `FeaturedProjectsSection.tsx`, aplique a regra de altura preenchida no Bento Grid (e.g. usando os utilitários de `items-stretch` ou grid implícito para `1fr` rows).
> 2. No `FeaturedProjectCard.tsx`, certifique-se que o card-shell interno (ou div raiz) tenha `h-full flex flex-col justify-between`.
> 3. Na div interna que encapsula o projeto, garanta que ela expanda verticalmente com `flex-1` empurrando os metadados para baixo de forma uniforme.
> **Regras:** Utilize puramente as classes utilitárias do Tailwind CSS. Siga a filosofia Mobile-first: cards empilham no mobile sem esticamentos não naturais.
> **Critérios de Aceite:**
> - [ ] Os dois cards na Row 1 possuem a exata mesma altura computada ao lado um do outro, indiferente da quantidade de texto nos metadados.
> - [ ] O container visual (imagem/vídeo) preenche o espaço livre da div pai sem ser cortado irregularmente.

> **### 🛠️ Prompt #02 — Unificação de Grid em AboutMethod**
> **Objetivo:** Refatorar a estrutura do componente AboutMethod para aderir estritamente à classe `std-grid` do projeto, eliminando aninhamento de `grid-cols-12`.
> **Arquivos:** `src/components/sobre/sections/AboutMethod.tsx`
> **Ações:**
> 1. Remover a regra explícita `lg:grid-cols-12` das divs filhas da `std-grid`.
> 2. Se as colunas 12 eram necessárias para limitar a largura do conteúdo de leitura, utilize classes utilitárias de `max-w-` ou ajuste para um simples bloco flex limitando o max width e deixando que `std-grid` cuide das margens.
> **Regras:** Respeitar o padding fluído nativo estipulado por `.std-grid`. Mobile-first sempre.
> **Critérios de Aceite:**
> - [ ] O bloco de texto na seção Method está perfeitamente alinhado com o eixo esquerdo global sem margens duplas.
> - [ ] Não há scroll horizontal quebrado (overflow-x).
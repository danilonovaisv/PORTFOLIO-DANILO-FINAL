# 07-PROVA-AUTORIDADE

## 0. Estrutura de arquivos da seção

- Arquivos principais:
  - `src/components/sobre/sections/AboutProof.tsx`
- Dependências:
  - Framer Motion (`motion/react`)
  - Configuração de conteúdo (`src/config/content.ts`)
  - Hook de acessibilidade de movimento (`src/hooks/useMotionGate.ts`)
  - Componente de imagem otimizada para Supabase (`src/components/ui/shared/DynamicAssetImage.tsx`)
- Padrão arquitetural:
  - Renderização condicional baseada em dados reais ("Real Content Only"). Métricas e depoimentos só são montados no DOM se existirem no objeto de dados.

## 1. Objetivo da Página/Seção

Apresentar evidências empíricas de impacto profissional e autoridade no mercado (prova social) por meio de métricas de projetos realizados, logos das principais marcas parceiras atendidas e depoimentos de clientes chave. Fica posicionada estrategicamente após a seção do Manifesto e antes do fechamento/CTA final.

## 2. Estrutura de Conteúdo

- **Eyebrow:** Texto curto de destaque superior definido em `ABOUT_CONTENT.proof.eyebrow`.
- **Heading principal:** Título composto por duas partes definido em `ABOUT_CONTENT.proof.title` (segunda parte em destaque com cor primária).
- **Métricas de Impacto:** Lista de blocos numéricos exibindo conquistas e labels explicativas (ex: "Visualizações", "Cliques", "Conversões").
- **Grid de Clientes:** Exibe os logotipos de até 12 marcas parceiras (ex: Honda, Mercado Livre, etc.) integrados nativamente com o Supabase Asset Pipeline.
- **Blocos de Depoimento:** Cards contendo citações de clientes, indicando o autor e seu cargo correspondente.

## 3. Identidade Visual

- **Cores aplicadas:**
  - Fundo neutro e escuro da página (`#040013`).
  - Textos em branco de alto contraste (`#fcffff`).
  - Acentos de texto em azul primário (`#0048ff`).
  - Cards de depoimento com borda azul translúcida (`border-bluePrimary/15`).
- **Logotipos de Marcas:**
  - Imagens de logotipos convertidas para escala de cinza/negativo (`brightness-0 invert opacity-50`).
  - Transição suave de opacidade (`group-hover:opacity-90`) para destacar a marca sob hover.

## 4. Interatividade & Animações

- **Scroll Reveal (Framer Motion):**
  - Entrada coordenada por bloco via `m.div` e `m.ul` usando `whileInView`.
  - Animação de entrada aplica transição combinada de `opacity: 0 ➔ 1`, `translateY: 18px ➔ 0px` e `filter: blur(6px) ➔ blur(0px)` com a curva de aceleração Ghost Easing (`[0.22, 1, 0.36, 1]`).
- **Reduced Motion Support:**
  - Quando ativado no sistema operacional, o hook `useMotionGate()` cancela a translação vertical e o desfoque de transição, executando apenas o fade de opacidade para prevenir desconforto visual.

## 5. Responsividade

- **Grid de Métricas:**
  - 1 coluna em mobile ➔ 3 colunas em desktop.
- **Grid de Logotipos:**
  - 2 colunas em telas pequenas ➔ 3 colunas em tablets ➔ 6 colunas em computadores e telas amplas.
- **Cards de Depoimento:**
  - 1 coluna em mobile ➔ 2 colunas em telas desktop.

## 6. Acessibilidade & SEO

- **Semântica HTML5:**
  - Seção envolta em `<section>` com `aria-labelledby="proof-heading"`.
  - Listas ordenadas por papel semântico (`role="list"` e `role="listitem"`).
- **Acessibilidade de Imagens:**
  - Todos os logotipos usam a tag `alt` mapeada a partir do nome da marca (`alt={logo.alt}`).
- **Contraste Tipográfico:**
  - Contraste texto/fundo supera o ratio de 12:1 (excedendo os requisitos AAA da WCAG).

## 7. Integrações ou Recursos Especiais

- **Supabase Asset Sync:**
  - Carregamento de imagens pelo `DynamicAssetImage` que resolve as chaves de assets cadastrados na tabela do banco (`SITE_ASSET_KEYS.clients.strips`) e aplica fallback caso o servidor local esteja desconectado.

## 8. Considerações Técnicas

- **Performance:**
  - Carregamento assíncrono e prioritário desativado para logos para não competir com imagens LCP críticas do topo da página.
- **Resiliência:**
  - Caso os campos de métricas ou depoimentos no arquivo de conteúdo estejam vazios, a seção se adapta sem deixar espaços em branco ou quebrar a grid.

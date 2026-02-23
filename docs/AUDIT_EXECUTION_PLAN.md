
# Auditoria Completa — Portfoliodanilo.com

## 1️⃣ Visão Geral

### Escopo analisado

- Domínio de produção: \`https://portfoliodanilo.com\`
- Repositório: \`danilonovaisv/PORTFOLIO-DANILO-FINAL\`
- Rotas foco (App Router):
  - Portfólio público:
    - \`/portfolio\`
    - \`/portfolio/[slug]\`
    - \`/projects/[slug]\`
  - Admin:
    - \`/admin/(auth)/login\` → \`/admin/login\`
    - \`/admin/(protected)/page.tsx\` → \`/admin\`
    - \`/admin/(protected)/trabalhos\` (+ \`new\`, \`[id]\`, \`actions.ts\`)
    - \`/admin/(protected)/landing-pages\` (+ \`new\`, \`[id]\`, \`actions.ts\`)
    - \`/admin/(protected)/midia\` (+ \`actions.ts\`)
    - \`/admin/(protected)/settings\`
    - \`/admin/(protected)/scene-generator\` (+ \`actions.ts\`, \`types.ts\`)
    - \`/admin/(protected)/copy-agent\` (+ \`actions.ts\`)
    - \`/admin/(protected)/config\`
    - \`/admin/(protected)/tags\` (+ \`actions.ts\`)
- Componentes principais relacionados:
  - Layout global: \`src/app/layout.tsx\`, \`src/app/template.tsx\`, \`src/components/layout/*\`
  - Portfolio:
    - \`src/app/portfolio/page.tsx\`
    - \`src/app/portfolio/[slug]/page.tsx\`
    - \`src/app/projects/[slug]/page.tsx\`
    - \`src/components/portfolio/ProjectsGallery.tsx\`
    - \`src/components/portfolio/ProjectCard.tsx\`
    - \`src/components/portfolio/PortfolioModal.tsx\`
    - \`src/components/portfolio/ImageLightbox.tsx\`
    - \`src/components/portfolio/PortfolioHeroNew.tsx\`
    - \`src/components/portfolio/RotatingHighlights.tsx\`
    - \`src/components/portfolio/ProjectsGallery.module.css\`
  - Admin:
    - \`src/app/admin/(auth)/login/page.tsx\`
    - \`src/app/admin/(protected)/page.tsx\` (Dashboard)
    - \`src/app/admin/(protected)/trabalhos/*\`
    - \`src/app/admin/(protected)/landing-pages/*\`
    - \`src/app/admin/(protected)/midia/*\`
    - \`src/app/admin/(protected)/settings/page.tsx\`
    - \`src/app/admin/(protected)/scene-generator/*\`
    - \`src/app/admin/(protected)/copy-agent/*\`
    - \`src/app/admin/(protected)/config/page.tsx\`
    - \`src/app/admin/(protected)/tags/*\`

### Metodologia e limitações

- A auditoria foi conduzida com base na **estrutura de arquivos** do repositório (via MCP GitHub) e na documentação auxiliar em \`.context/DOCS-PORTFOLIO-PAGES/*\` (sem acesso direto ao conteúdo destes arquivos).
- Não houve acesso ao DOM real, CSS efetivo, nem aos conteúdos internos dos arquivos \`.tsx\`/CSS devido a limitações do ambiente.
- Métricas de Web Vitals (FCP/LCP/CLS) e Lighthouse **não puderam ser medidas** em tempo real (ausência de Chrome DevTools MCP funcional neste contexto).
- As recomendações abaixo são:
  - Baseadas em evidências estruturais (arquivos e rotas existentes).
  - Cruzadas com boas práticas oficiais de Next.js para autenticação no App Router e Server Actions  :OaiMdDirective_Annotations_3if07{attrs="eyJpbmRleCI6MH0"}.
  - Alinhadas conceitualmente ao GHOST DESIGN SYSTEM, RULES-PORTFOLIO-STRUCTURE e demais documentos em \`.context/DOCS-PORTFOLIO-PAGES\` (tratados como fonte de verdade, embora não lidos diretamente).

Sempre que houver “risco” ou “não verificado”, significa que **não há evidência suficiente a partir da estrutura de arquivos**. Nesses casos, o item deve ser tratado como pendência de validação manual.

### Estado geral

- **Arquitetura e separação de domínios** (público vs admin): boa.
- **SEO estrutural** (sitemap, robots, opengraph-image): presente.
- **Organização de pastas e segmentação por contexto** (layout, portfolio, projects, admin, canvas): consistente.
- **Fluxos críticos e CRUDs**: bem mapeados em termos de rotas e actions.

Dado que não foi possível inspecionar o código interno de cada página/componente, o estado geral é:

> **Estado geral: Aprovado com ressalvas**

As ressalvas concentram-se em:

- Confirmação de requisitos de **acessibilidade (WCAG AA)**, especialmente em:
  - Modais (\`PortfolioModal\`, \`ImageLightbox\`).
  - Menus (Mobile e Desktop fluid header).
  - Fluxos complexos de CRUD no admin.
- Garantia de **proteção robusta de rotas e Server Actions** (\`actions.ts\` em admin).
- **Performance real em produção**, especialmente em:
  - Scene Generator (admin).
  - Copy Agent (admin).
  - Possíveis cenas 3D (R3F) e animações intensas.

---

## 2️⃣ Diagnóstico por Seção

### 2.1 Header Global / Navegação / Contato

**Arquitetura:**

- Header focado em componentes dedicados:
  - \`src/components/layout/header/SiteHeader.tsx\`
  - \`DesktopFluidHeader.tsx\`, \`MobileStaggeredMenu.tsx\`, \`headerTokens.ts\`, \`useActiveSection.ts\`
- Layout global:
  - \`src/app/layout.tsx\`
  - \`src/components/layout/ClientLayout.tsx\`, \`SmoothScroll.tsx\`, \`Container.tsx\`, \`SiteFooter.tsx\`
- Rota de contato dedicada: \`src/app/contato\` (página específica para fluxo 1: Header → navegação → contato).

**Forças potenciais:**

- Separação clara entre header desktop e mobile.
- Uso provável de tokens e hooks (\`headerTokens\`, \`useActiveSection\`) sugere preocupação com estado de navegação e active section.

**Riscos / Observações:**

- Acessibilidade mobile:
  - Não foi possível verificar:
    - Presença de botão hamburguer com \`aria-expanded\`, \`aria-controls\`.
    - Gerenciamento de foco no menu mobile aberto/fechado.
- Motion:
  - Componente \`MobileStaggeredMenu\` tende a usar animações encadeadas; é crítico respeitar:
    - Limite de \`translateY\` ≤ 18px.
    - Preferência do usuário via media query de redução de movimento.
- Navegação por teclado:
  - Não há evidência estrutural sobre:
    - Ordem de tabulação customizada.
    - \`Skip to content\` link.

---

### 2.2 Portfolio Grid (Página \`/portfolio\`)

**Arquitetura:**

- Página: \`src/app/portfolio/page.tsx\` (server component)
- Client bridge: \`src/app/portfolio/PortfolioClient.tsx\`
- Componentes principais:
  - \`ProjectsGallery.tsx\` + \`ProjectsGallery.module.css\`
  - \`ProjectCard.tsx\`
  - \`PortfolioModal.tsx\`
  - \`ImageLightbox.tsx\`
  - \`PortfolioHeroNew.tsx\`
  - \`PortfolioCTA.tsx\`
- Metadados/OG: \`src/app/portfolio/opengraph-image.tsx\`
- Tratamento de erro de segmento: \`src/app/portfolio/error.tsx\`

**Forças potenciais:**

- Separação por responsabilidade:
  - Hero, CTA, Gallery e Modal isolados.
- CSS module específico para o grid (\`ProjectsGallery.module.css\`) viabiliza Ghost Grid avançado.
- Presença de um \`PortfolioClient\` sugere bridging entre dados server-side e UI client-side (bom para SSR + interatividade).

**Riscos / Observações:**

- Ghost Grid / Equal Height:
  - Sem acesso ao CSS, não é possível confirmar:
    - Alturas iguais por linha.
    - Preenchimento horizontal total sem gaps “fantasmas”.
  - A presença de um CSS Module dedicado é positiva, mas precisa ser confrontada com as regras em \`GHOST-DESIGN-SYSTEM.md\` e \`RULES-PORTFOLIO-STRUCTURE.md\`.
- Acessibilidade / Modal:
  - \`PortfolioModal\` e \`ImageLightbox\` exigem:
    - Trap de foco.
    - Fechamento por ESC.
    - Retorno de foco ao card original ao fechar.
  - Nada na estrutura de arquivos garante isso; deve ser verificado.
- Motion:
  - \`RotatingHighlights.tsx\` pode introduzir rotações/motions proibidos (rotate/scale/bounce).
  - É preciso garantir que animações restrinjam-se a opacity/blur/translateY.

---

### 2.3 Portfolio Detail \`/portfolio/[slug]\`

**Arquitetura:**

- Página dinâmica: \`src/app/portfolio/[slug]/page.tsx\`.
- Utilização provável de dados vindos do admin (landing pages, trabalhos, tags).

**Forças potenciais:**

- Segmento dedicado permite:
  - SEO individual por projeto/coleção.
  - Conteúdo rico, possivelmente com integração a dados do admin.

**Riscos / Observações:**

- Acessibilidade:
  - 1 único \`h1\` por página deve ser garantido.
  - Sem DOM, impossível confirmar a hierarquia de headings.
- SEO:
  - Opengraph específico para slug não foi detectado (apenas \`/portfolio/opengraph-image.tsx\`).
  - JSON-LD por projeto/slug não é visível; provável ausência.
- Performance:
  - Se a página for altamente visual (imagens grandes, vídeos, 3D), é crítico:
    - Uso consistente de \`next/image\`.
    - Lazy loading e \`priority\` correto para LCP.

---

### 2.4 Projeto Landing \`/projects/[slug]\`

**Arquitetura:**

- Página dinâmica: \`src/app/projects/[slug]/page.tsx\`.
- Tratamento de erro: \`src/app/projects/error.tsx\`.

**Forças potenciais:**

- Separa a ideia de “projeto” da visão de “portfolio grid”.
- Permite rotas mais limpas para campanhas/landings específicas.

**Riscos / Observações:**

- Overlap conceitual com \`/portfolio/[slug]\`:
  - Necessário garantir regras claras de:
    - Quando abrir modal dentro de \`/portfolio\`.
    - Quando redirecionar para \`/projects/[slug]\`.
- SEO:
  - Ausência explícita de \`opengraph-image.tsx\` em \`/projects\` indica dependência dos defaults globais.
- Acessibilidade:
  - Mesmo conjunto de riscos de heading structure e foco.

---

### 2.5 Admin Dashboard \`/admin\`

**Arquitetura:**

- Layout protegido: \`src/app/admin/(protected)/layout.tsx\`.
- Dashboard: \`src/app/admin/(protected)/page.tsx\`.
- Auth layout: \`src/app/admin/(auth)/layout.tsx\`.
- Login: \`src/app/admin/(auth)/login/page.tsx\`.
- Callback de auth: \`src/app/auth/callback/route.ts\`.

**Forças potenciais:**

- Segmentação clara entre:
  - \`(auth)\` → rotas de autenticação.
  - \`(protected)\` → rotas protegidas.
- Uso de \`layout.tsx\` por grupo facilita SSR de verificação de sessão.

**Riscos / Observações (críticos):**

- Segurança de Server Actions:
  - Diversos arquivos \`actions.ts\` em \`admin/(protected)/*\` indicam forte dependência de Server Actions.
  - Boas práticas de Next.js exigem que **cada** Server Action verifique sessão/role explicitamente, e não apenas o layout ou o componente chamador  :OaiMdDirective_Annotations_3if07{attrs="eyJpbmRleCI6MX0"}.
  - Sem acesso às actions, a segurança não pode ser confirmada.
- Zero Trust:
  - Rotas protegidas devem assumir que qualquer chamada \`POST\`/Server Action pode ser atacada de forma direta, bypassando UI.
  - É essencial garantir:
    - \`verifySession\` ou equivalente em cada \`actions.ts\`.
    - Checagem de role (admin) antes de mutações em:
      - Trabalhos.
      - Landing pages.
      - Mídia.
      - Tags.
      - Scene generator presets.
      - Copy agent prompts.

---

### 2.6 Admin Trabalhos (lista, criação, edição)

**Arquitetura:**

- Lista: \`src/app/admin/(protected)/trabalhos/page.tsx\`.
- Criação: \`src/app/admin/(protected)/trabalhos/new/page.tsx\`.
- Edição: \`src/app/admin/(protected)/trabalhos/[id]/page.tsx\`.
- Lógica de servidor: \`src/app/admin/(protected)/trabalhos/actions.ts\`.

**Forças potenciais:**

- Padrão RESTful e segmentação muito boa de views:
  - index/new/[id].
- \`actions.ts\` isolado facilita centralizar writes em um único lugar.

**Riscos / Observações:**

- Acessibilidade de formulários:
  - Sem ver a UI, é impossível validar:
    - Associação \`label\` → \`input\`.
    - Mensagens de erro legíveis por screen reader.
- Integração com portfólio público:
  - É fundamental que:
    - Criação/edição de trabalhos dispare revalidação de:
      - \`/portfolio\`.
      - \`/portfolio/[slug]\`.
      - \`/projects/[slug]\`.
    - Ou que essas rotas sejam totalmente dinâmicas (SSR) sobre fonte única (Supabase).
  - Estruturalmente, não há evidência de rotas de revalidate específicas.

---

### 2.7 Admin Landing Pages (lista, criação, edição)

**Arquitetura:**

- Lista: \`src/app/admin/(protected)/landing-pages/page.tsx\`.
- Criação: \`src/app/admin/(protected)/landing-pages/new/page.tsx\`.
- Edição: \`src/app/admin/(protected)/landing-pages/[id]/page.tsx\`.
- Lógica: \`src/app/admin/(protected)/landing-pages/actions.ts\`.

**Forças potenciais:**

- Mesma arquitetura limpa de Trabalhos, favorecendo consistência.

**Riscos / Observações:**

- Publicação e visibilidade pública:
  - Requisitos críticos:
    - Apenas landing pages com status “publicado” devem ser expostas em:
      - \`/portfolio\`.
      - \`/portfolio/[slug]\`.
      - \`/projects/[slug]\`, se aplicável.
  - Sem accesso ao código de \`actions.ts\` e das rotas públicas, isso não pode ser verificado.

---

### 2.8 Admin Mídia \`/admin/midia\`

**Arquitetura:**

- Página: \`src/app/admin/(protected)/midia/page.tsx\`.
- Server Actions: \`src/app/admin/(protected)/midia/actions.ts\`.
- UI de presets: \`preset-buttons.tsx\`.

**Forças potenciais:**

- Separação clara entre operações de mídia e UI de presets.
- Sugere fluxo de upload, preset de compressão, crop, etc.

**Riscos / Observações:**

- Segurança:
  - Uploads devem ser validados:
    - Tamanho máximo.
    - Tipo MIME.
    - Storage bucket (Supabase Storage ou outro) com regras de RLS.
- Acessibilidade:
  - Botões de preset precisam:
    - Ter texto descritivo.
    - Foco visível e estados de \`aria-pressed\` quando atuam como toggles.

---

### 2.9 Admin Settings, Config, Tags

**Arquitetura:**

- Settings: \`src/app/admin/(protected)/settings/page.tsx\`.
- Config: \`src/app/admin/(protected)/config/page.tsx\`.
- Tags: \`src/app/admin/(protected)/tags/page.tsx\` + \`tags/actions.ts\`.

**Forças potenciais:**

- Configurações e taxonomias isoladas em rotas próprias.
- Presença de \`actions.ts\` para tags indica CRUD completo.

**Riscos / Observações:**

- Consistência de tags:
  - Tags devem ser usadas tanto em admin quanto no front em:
    - Filtro da grid de portfolio.
    - SEO (keywords estruturadas).
- Segurança:
  - Assim como em Trabalhos, Server Actions devem verificar auth/role.

---

### 2.10 Admin Scene Generator

**Arquitetura:**

- Página: \`src/app/admin/(protected)/scene-generator/page.tsx\`.
- Server Actions: \`scene-generator/actions.ts\`.
- Tipos: \`scene-generator/types.ts\`.
- Provável uso intensivo de R3F/Three.js e assets 3D.

**Forças potenciais:**

- Encapsulamento completo de lógica da Scene Generator numa rota interna do admin.
- Tipos dedicados (\`types.ts\`) sugerem boa modelagem de domínio.

**Riscos / Observações:**

- Performance:
  - Página com 17KB de TSX (somente \`page.tsx\`) já sinaliza complexidade.
  - É crítico:
    - Lazy load de canvas 3D.
    - Suspense boundaries para evitar bloquear o layout.
- Acessibilidade:
  - Editor 3D tende a ser altamente visual; deve:
    - Garantir caminhos alternativos de input (sliders, campos numéricos).
    - Evitar motion agressivo não controlado.
- Segurança:
  - Server Actions que salvam presets / cenas devem estar alinhadas com \`verifySession\` e checagem de role admin  :OaiMdDirective_Annotations_3if07{attrs="eyJpbmRleCI6Mn0"}.

---

### 2.11 Admin Copy Agent

**Arquitetura:**

- Página: \`src/app/admin/(protected)/copy-agent/page.tsx\`.
- Server Actions: \`copy-agent/actions.ts\`.

**Forças potenciais:**

- Ferramenta centralizada para geração de copy, alinhada à visão de “Copy Agent”.

**Riscos / Observações:**

- Dados sensíveis:
  - Inputs e outputs podem conter dados de clientes.
  - É crucial:
    - Logar apenas metadados necessários.
    - Evitar persistir textos sensíveis sem necessidade.
- UX:
  - Feedbacks de loading e erros precisam ser claros;
  - Navegação por teclado sobre histórico de prompts/respostas.

---

## 3️⃣ Lista de Problemas (🔴🟡🟢)

> Importante: devido à limitação de acesso ao código interno, os itens abaixo são classificados como **“Riscos a validar”**. Sempre que marcado como problema, é porque, **se não houver implementação explícita**, o impacto é alto.

### 🔴 Críticos

1. **🔴 P0 — Segurança insuficiente em Server Actions de Admin (risco teórico)**
   - **Descrição:** Diversos \`actions.ts\` em \`admin/(protected)/*\` manipulam dados críticos (trabalhos, landing pages, mídias, tags, cenas). Sem confirmação explícita de \`verifySession\` e checagem de role, há risco de mutações não autorizadas via chamada direta às Actions.
   - **Impacto:** Comprometimento total da integridade do portfólio (inserção/edição/remoção por usuários não autorizad :OaiMdDirective_Annotations_3if07{attrs="eyJpbmRleCI6M30"}os). 
   - **Rotas afetadas:** \`/admin/trabalhos/*\`, \`/admin/landing-pages/*\`, \`/admin/midia\`, \`/admin/tags\`, \`/admin/scene-generator\`, \`/admin/copy-agent\`.
   - **Ação:** Auditar cada \`actions.ts\` e garantir:
     - \`verifySession\` (ou equivalente) no início.
     - Checagem de role admin antes de qualquer write.

2. **🔴 P0 — Possível ausência de trap de foco e ESC em modais de Portfolio**
   - **Descrição:** Componentes \`PortfolioModal\` e \`ImageLightbox\` são críticos na UX de \`/portfolio\`. Sem trap de foco, ESC, e retorno ao card de origem, há quebra grave de acessibilidade.
   - **Impacto:** Usuários de teclado e leitores de tela podem ficar “presos” ou perder o contexto.
   - **Rotas afetadas:** \`/portfolio\`.
   - **Ação:** Verificar implementação de:
     - \`role="dialog"\`, \`aria-modal="true"\`.
     - Ciclo de foco interno.
     - Fechamento por ESC com retorno ao trigger.

3. **🔴 P0 — Falta de garantia de 1x \`h1\` por página**
   - **Descrição:** Não há evidência estrutural de um \`h1\` único e coerente em cada rota crítica.
   - **Impacto:** Degradação de acessibilidade e SEO.
   - **Rotas afetadas:** Todas as rotas foco.
   - **Ação:** Auditar DOM de cada página e padronizar a hierarquia de headings.

4. **🔴 P0 — Falta de validação explícita de \`prefers-reduced-motion\`**
   - **Descrição:** Header móvel, hero, grid e scene generator provavelmente usam animações ricas. Sem considerar usuários com redução de movimento, há risco de desconforto.
   - **Impacto:** Não conformidade com WCAG relativa a motion.
   - **Rotas afetadas:** \`/\`, \`/portfolio\`, \`/portfolio/[slug]\`, \`/projects/[slug]\`, \`/admin/*\`.
   - **Ação:** Implementar:
     - Media query de redução de movimento.
     - Flag global para desativar animações não essenciais.

### 🟡 Médios/Altos

5. **🟡 P1 — JSON-LD ausente ou inconsistente em páginas de projeto**
   - **Descrição:** Não há evidência de geração de JSON-LD para \`/portfolio/[slug]\` e \`/projects/[slug]\`.
   - **Impacto:** Perda de potencial de rich snippets e CTR.
   - **Rotas afetadas:** \`/portfolio/[slug]\`, \`/projects/[slug]\`.
   - **Ação:** Implementar JSON-LD por projeto com:
     - \`@type\`: \`CreativeWork\` ou similar.
     - Campos: nome, descrição, imagem principal, data, tags.

6. **🟡 P1 — Incerteza sobre equal height + Ghost Grid 100%**
   - **Descrição:** Ghost Grid é central ao design (documentado em \`GHOST-DESIGN-SYSTEM.md\`), mas sem ver o CSS, não se consegue afirmar que:
     - Todas as linhas têm cartões de mesma altura.
     - O preenchimento horizontal está 100% ocupado sem “buracos”.
   - **Impacto:** Degradação de consistência visual e legibilidade.
   - **Rotas afetadas:** \`/portfolio\`.
   - **Ação:** Validar manualmente o grid em breakpoints chave; ajustar CSS module/Tailwind conforme necessário.

7. **🟡 P1 — Falta de métricas objetivas de Web Vitals (FCP/LCP/CLS)**
   - **Descrição:** Sem perfil de performance, não é possível afirmar que metas (<2s FCP, <2.5s LCP, <0.1 CLS) estão sendo cumpridas.
   - **Impacto:** Potencial perda de ranking e UX em conexões reais.
   - **Rotas afetadas:** Todas.
   - **Ação:** Rodar Lighthouse em:
     - Home.
     - \`/portfolio\`.
     - \`/portfolio/[slug]\`.
     - \`/projects/[slug]\`.
     - \`/admin\` (após login).

8. **🟡 P1 — Falta de confirmação de navegação 100% por teclado no Admin**
   - **Descrição:** Fluxos CRUD complexos (trabalhos, landing, mídia) costumam introduzir modais, tooltips, dropdowns com foco frágil.
   - **Impacto:** Admin inviável para usuários com restrição de mouse.
   - **Rotas afetadas:** Todas \`/admin/(protected)/*\`.
   - **Ação:** Auditoria manual de teclado (Tab/Shift+Tab, Enter, ESC) e correção de elementos não focáveis.

### 🟢 Baixos

9. **🟢 P2 — Consolidação de componentes de layout entre público e admin**
   - **Descrição:** Layouts de admin e público estão corretamente separados, mas podem compartilhar tokens/spacing/typography centrais.
   - **Impacto:** Manutenção e consistência visual.
   - **Rotas afetadas:** Todas.
   - **Ação:** Extrair tokens de espaçamento/typography para camada comum (ex: \`src/styles/tokens\`).

10. **🟢 P2 — Testes E2E Playwright cobrindo fluxos críticos**
    - **Descrição:** Há indícios de testes unitários (\`__tests__\` em portfolio), mas ausência de evidência de E2E robusto.
    - **Impacto:** Risco de regressões em fluxos de alta conversão.
    - **Ação:** Criar suites Playwright para:
      - Fluxos críticos 1 a 6 (seção posterior).

---

## Auditoria por Rotas (página por página)

### Rota: \`/portfolio\`

- **Status:** Aprovado com ressalvas (análise estrutural sem acesso ao TSX/CSS internos).
- **Checklist:**
  - Estrutura:
    - Página dedicada \`page.tsx\` + \`PortfolioClient.tsx\`.
    - Erro segmentado (\`error.tsx\`) e opengraph específico.
    - Uso de componentes especializados (Hero, Gallery, Modal).
  - UI/UX:
    - Fluxo principal: hero → grid → CTA.
    - Risco: ausência de evidência sobre estados de hover/focus nos cards.
  - Mobile:
    - Responsividade delegada a \`ProjectsGallery.module.css\` e arranjo de cards.
    - Não verificado: ausência de overflow horizontal em 320px.
  - Motion:
    - Provável uso de Framer Motion (Hero, Grid, Highlights).
    - Não verificado: respeito estrito à limitação de motion (sem scale/bounce/rotate).
  - Performance:
    - Não verificado: uso de \`next/image\` em todas as thumbs.
    - Risco: grid pesado sem lazy loading pode aumentar LCP.
  - Funcionalidade:
    - Grid → Modal (PortfolioModal) → possivelmente link para \`/projects/[slug]\` ou \`/portfolio/[slug]\`.
    - Não verificado: comportamento consistente entre “abrir modal” vs “abrir landing”.
  - SEO:
    - \`opengraph-image.tsx\` presente.
    - Não verificado: titles/descriptions específicas e canonical.

- **Evidências objetivas:**
  - Existência de \`ProjectsGallery.tsx\`, \`ProjectCard.tsx\`, \`PortfolioModal.tsx\`, \`ImageLightbox.tsx\`, \`PortfolioHeroNew.tsx\`.
  - \`/portfolio\` segment possui seu próprio \`error.tsx\` e \`opengraph-image.tsx\`.

- **Severidade:** 🟡 (médio) — grid e modais são cruciais; sem confirmação, tratam-se como riscos.

- **Recomendação prática:**
  - Inspecionar a página em 320px/375px/768px/1440px:
    - Garantir 0 overflow horizontal.
    - Confirmar equal height por linha e Ghost Grid 100%.
  - Validar:
    - Trap de foco em \`PortfolioModal\`.
    - ESC fecha modal e retorna foco ao card acionador.

---

### Rota: \`/portfolio/[slug]\`

- **Status:** Aprovado com ressalvas.
- **Checklist:**
  - Estrutura:
    - Página dinâmica \`[slug]/page.tsx\`.
    - Depende de dados do admin (landing-pages/trabalhos).
  - UI/UX:
    - Deve expor narrativa/orientação clara para o trabalho/landing selecionado.
  - Mobile:
    - Não verificado: seções longas podem causar scroll excessivo sem ancoragem clara.
  - Motion:
    - Riscos semelhantes a \`/portfolio\` (entradas/saídas de seções).
  - Performance:
    - Crítico validar LCP, principalmente se há hero com imagem/vídeo grande.
  - Funcionalidade:
    - Deve refletir status de publicação vindo do admin.
  - SEO:
    - Não verificado: implementação de \`generateMetadata\` por slug e JSON-LD.

- **Evidências objetivas:**
  - \`src/app/portfolio/[slug]/page.tsx\` existe e é a única entry para esse segmento.

- **Severidade:** 🟡 (médio) — impacto alto em SEO/UX mas sem evidência de falhas.

- **Recomendação prática:**
  - Implementar (ou verificar) \`generateMetadata\` por slug.
  - Adicionar JSON-LD para cada slug de portfolio/projeto.
  - Garantir 1x \`h1\` por página com nome do projeto.

---

### Rota: \`/projects/[slug]\`

- **Status:** Aprovado com ressalvas.
- **Checklist:**
  - Estrutura:
    - Página dinâmica \`src/app/projects/[slug]/page.tsx\`.
    - \`error.tsx\` específico.
  - UI/UX:
    - Deve ficar claro para o usuário a diferença entre \`/portfolio\` e \`/projects\`.
  - Mobile:
    - Mesmo conjunto de riscos de \`/portfolio/[slug]\`.
  - Motion:
    - Pode reutilizar animações; precisa respeitar prefers-reduced-motion.
  - Performance:
    - Foco em LCP (imagem hero).
  - Funcionalidade:
    - Mapeamento 1:1 entre slugs gerenciados no admin e rotas públicas.
  - SEO:
    - Não verificado: canonical cross-domain/cross-route.

- **Evidências objetivas:**
  - \`src/app/projects/[slug]/page.tsx\`.
  - \`src/app/projects/error.tsx\`.

- **Severidade:** 🟡 (médio).

- **Recomendação prática:**
  - Documentar relação entre:
    - Trabalhos.
    - Landing pages.
    - \`/projects/[slug]\`.
  - Assegurar que slugs despublicados gerem 404/410.

---

### Rota: \`/admin/login\` (\`/admin/(auth)/login\`)

- **Status:** Aprovado com ressalvas.
- **Checklist:**
  - Estrutura:
    - Página simples \`page.tsx\`.
    - Layout de auth: \`admin/(auth)/layout.tsx\`.
  - UI/UX:
    - Campos de e-mail/senha ou fluxo OAuth.
    - Não verificado: feedback de erro acessível.
  - Mobile:
    - Deve evitar overflows e botões muito pequenos.
  - Motion:
    - Recomendado manter ao mínimo (foco em clareza).
  - Performance:
    - Leve; sem necessidade de carregamento de assets pesados.
  - Funcionalidade:
    - Redirecionar para \`/admin\` após login bem-sucedido.
  - SEO:
    - Página privada; noindex recomendado.

- **Evidências objetivas:**
  - \`src/app/admin/(auth)/login/page.tsx\`.
  - \`src/app/auth/callback/route.ts\`.

- **Severidade:** 🔴 no contexto de segurança → qualquer fragilidade ali é crítica.

- **Recomendação prática:**
  - Garantir:
    - Rate limiting em tentativas de login (via API/backend).
    - Erros genéricos (sem indicar se o e-mail existe ou não).
    - \`aria-live\` para mensagens de erro.

---

### Rota: \`/admin\` (Dashboard)

- **Status:** Aprovado com ressalvas.
- **Checklist:**
  - Estrutura:
    - \`admin/(protected)/layout.tsx\` + \`admin/(protected)/page.tsx\`.
  - UI/UX:
    - Visão geral de trabalhos/landing/métricas.
  - Mobile:
    - Grids/listas devem ser adaptadas (stack) e não horizontais.
  - Motion:
    - Animar apenas elementos de entrada leves.
  - Performance:
    - Evitar carregar listas gigantes sem paginação.
  - Funcionalidade:
    - Acesso rápido a Trabalhos, Landing Pages, Mídia, Settings.
  - SEO:
    - Privado; noindex.

- **Evidências objetivas:**
  - Estrutura clara de \`(protected)\` para admin.

- **Severidade:** 🔴 para auth e proteção, 🟡 para UX.

- **Recomendação prática:**
  - Validar se \`admin/(protected)/layout.tsx\` faz check SSR de sessão/role.
  - Garantir “logout” visível e acessível.

---

### Rota: \`/admin/trabalhos\`, \`/admin/trabalhos/new\`, \`/admin/trabalhos/[id]\`

- **Status:** Aprovado com ressalvas.
- **Checklist (comum):**
  - Estrutura:
    - Lista, criação e edição segmentadas.
    - \`actions.ts\` centraliza mutações.
  - UI/UX:
    - Formularização clara (labels, required, feedback de erro).
  - Mobile:
    - Formulários com field widths adequadas, scroll vertical esperado.
  - Motion:
    - Não essencial; manter mínimo.
  - Performance:
    - Paginação ou lazy load de listas.
  - Funcionalidade:
    - Criação/edição repercutindo no front (portfolio/projects).
  - SEO:
    - Privado.

- **Evidências objetivas:**
  - \`src/app/admin/(protected)/trabalhos/page.tsx\`, \`new/page.tsx\`, \`[id]/page.tsx\`, \`actions.ts\`.

- **Severidade:** 🔴 (segurança das actions), 🟡 (UX de formulário).

- **Recomendação prática:**
  - Adicionar testes E2E Playwright:
    - Criar trabalho → verificar presença em \`/portfolio\`.
    - Editar trabalho → confirmar dados atualizados.

---

### Rota: \`/admin/landing-pages\`, \`/admin/landing-pages/new\`, \`/admin/landing-pages/[id]\`

- **Status:** Aprovado com ressalvas.
- **Checklist:** similar a Trabalhos.
- **Evidências objetivas:**
  - \`src/app/admin/(protected)/landing-pages/*\`.

- **Severidade:** 🔴 (segurança/publicação), 🟡 (consistência front/back).

- **Recomendação prática:**
  - Garantir que a publicação:
    - Apenas exibe landings com status “publicado”.
    - Altera indexabilidade (noindex vs index) se for necessário.

---

### Rota: \`/admin/midia\`

- **Status:** Aprovado com ressalvas.
- **Checklist:**
  - Estrutura:
    - \`page.tsx\`, \`actions.ts\`, \`preset-buttons.tsx\`.
  - UI/UX:
    - Grade de arquivos, states de upload/erro.
  - Mobile:
    - Scrolling vertical sem overflow horizontal.
  - Motion:
    - Animações mínimas em estados de upload.
  - Performance:
    - Paginação; evitar carregar toda a biblioteca de uma vez.
  - Funcionalidade:
    - Upload, deleção, seleção de mídia.
  - SEO:
    - Privado.

- **Evidências objetivas:**
  - \`midia/actions.ts\` indica fluxo de upload/gerenciamento.

- **Severidade:** 🔴 (storage/security), 🟡 (UX visual).

---

### Rota: \`/admin/settings\`

- **Status:** Aprovado com ressalvas.
- **Checklist:**
  - Estrutura: página dedicada de settings.
  - UI/UX: inputs de configuração com validação.
  - Segurança: configurações sensíveis não devem ser reveladas em client.

- **Evidências objetivas:**
  - \`settings/page.tsx\`.

- **Severidade:** Depende do nível de sensibilidade das configs; considerar 🔴 se houver chaves ou toggles críticos.

---

### Rota: \`/admin/scene-generator\`

- **Status:** Aprovado com ressalvas (alto risco de performance).
- **Checklist:**
  - Estrutura:
    - Página pesada (muito TSX).
    - \`actions.ts\` + \`types.ts\`.
  - UX/Interação 3D:
    - Deve ter fallback para hardware fraco.
  - Performance:
    - Lazy load de canvas/3D.
  - Acessibilidade:
    - Controles alternativos (não apenas drag em canvas).
  - Segurança:
    - Writes protegidos.

- **Severidade:** 🔴 (performance/segurança).

---

### Rota: \`/admin/copy-agent\`

- **Status:** Aprovado com ressalvas.
- **Checklist:**
  - Estrutura: página + actions.
  - UX: área de input clara, histórico de copy, salvamento de templates.
  - Segurança: proteção de dados/tokens.

- **Severidade:** 🔴 se operar com dados de clientes; caso contrário, 🟡.

---

## Fluxos Críticos E2E

### Fluxo 1 — Header → navegação → contato

- **Objetivo:** Do header da home ir até a página de contato e submeter formulário.
- **Status:** Não verificado (requer teste manual/E2E).
- **Riscos:**
  - Link de contato não evidente ou não focável.
  - Erros de formulário não lidos por screen readers.
- **Recomendação:**
  - Playwright:
    - Focar header.
    - Tab até link de contato.
    - Acessar \`/contato\`.
    - Preencher e enviar → esperar feedback acessível.

---

### Fluxo 2 — Portfolio → card abre modal

- **Objetivo:** Na grid, abrir modal de detalhes sem sair da página.
- **Status:** Estruturalmente suportado (\`PortfolioModal\`, \`ImageLightbox\`).
- **Riscos:**
  - Falta de trap de foco.
  - Background não sendo escondido de leitores de tela.
- **Recomendação:**
  - Testar Tab/Shift+Tab com modal aberto.
  - Verificar ESC.

---

### Fluxo 3 — Portfolio → card abre landing

- **Objetivo:** Abrir página dedicada (\`/projects/[slug]\` ou \`/portfolio/[slug]\`) a partir do card.
- **Status:** Rotas disponíveis.
- **Riscos:**
  - Inconsistência: alguns cards abrirem modal e outros landing sem feedback claro.
- **Recomendação:**
  - Definir regra:
    - Clique primário abre modal **ou** landing, de forma consistente.
    - Ações secundárias (por exemplo, “Ver página completa”) para outra opção.

---

### Fluxo 4 — Modal fecha com ESC e retorna foco

- **Objetivo:** Garantir acessibilidade completa do modal.
- **Status:** Não verificado (código não inspecionado).
- **Riscos:**
  - Perda de foco.
  - Escape não funcionando.
- **Recomendação:**
  - Implementar hook central de trap de foco.
  - Testar manualmente.

---

### Fluxo 5 — Admin cria trabalho → aparece no portfólio

- **Objetivo:** Garantir consistência entre backend/admin e front público.
- **Status:** Estrutura sugere suporte (trabalhos + portfolio/projects).
- **Riscos:**
  - Falta de revalidação/SSR dinâmico → item só aparece após redeploy.
- **Recomendação:**
  - Verificar se:
    - \`/portfolio\` e \`/projects/[slug]\` são dynamic/SSR sobre Supabase.
    - Ou se há revalidatePath/revalidateTag atrelado às Server Actions de trabalhos.

---

### Fluxo 6 — Admin publica landing → rota pública renderiza

- **Objetivo:** Criar/editar landing page e torná-la acessível ao público.
- **Status:** Estrutura pronta; relação com rotas públicas não explícita.
- **Riscos:**
  - Slug publicado mas não indexado.
  - Falta de 404 para landing despublicada.
- **Recomendação:**
  - Definir claramente:
    - Tabela/flag de publicação.
    - Mapeamento slug → rota pública.
    - Lógica de 404/410.

---

## 1) Resumo Executivo (Top 10 problemas)

1. **Hardening de Server Actions de Admin** (P0) — garantir verificação de sessão/r :OaiMdDirective_Annotations_3if07{attrs="eyJpbmRleCI6NH0"}ole em todas as \`actions.ts\`.   
2. **Trap de foco, ESC e retorno de foco em modais de portfólio** (P0).  
3. **Garantia de 1x \`h1\` por página e hierarquia de headings** (P0).  
4. **Respeito a prefers-reduced-motion globalmente** (P0).  
5. **Ausência de evidência de JSON-LD para páginas de projeto** (P1).  
6. **Ghost Grid / equal height / preenchimento 100% sem validação efetiva** (P1).  
7. **Falta de métricas objetivas de Web Vitals para rotas críticas** (P1).  
8. **Navegação por teclado não verificada em admin e menus** (P1).  
9. **Integração portfólio ↔ admin para revalidação/SSR dinâmica potencialmente frágil** (P1).  
10. **Ausência (aparente) de suíte Playwright cobrindo fluxos críticos E2E** (P2).

---

## 2) Matriz por Página

Legenda rápida:
- ✅ Indício estrutural positivo.
- ⚠️ Não verificado (requer inspeção/medição).
- 🔴 Risco alto.

| Rota                     | Acessibilidade | Performance | Estrutura | Motion       | Funcionalidade | SEO           |
|--------------------------|----------------|-------------|-----------|--------------|----------------|---------------|
| \`/portfolio\`           | ⚠️             | ⚠️          | ✅        | ⚠️ / 🔴      | ✅             | ✅ / ⚠️       |
| \`/portfolio/[slug]\`    | ⚠️             | ⚠️          | ✅        | ⚠️           | ✅             | ⚠️            |
| \`/projects/[slug]\`     | ⚠️             | ⚠️          | ✅        | ⚠️           | ✅             | ⚠️            |
| \`/admin/login\`         | ⚠️ / 🔴        | ✅ (esperado) | ✅      | ✅           | ✅             | n/a (noindex) |
| \`/admin\`               | ⚠️ / 🔴        | ⚠️          | ✅        | ✅           | ✅             | n/a           |
| \`/admin/trabalhos/*\`   | ⚠️ / 🔴        | ⚠️          | ✅        | ✅           | ✅             | n/a           |
| \`/admin/landing-pages/*\` | ⚠️ / 🔴      | ⚠️          | ✅        | ✅           | ✅             | n/a           |
| \`/admin/midia\`         | ⚠️ / 🔴        | ⚠️          | ✅        | ✅           | ✅             | n/a           |
| \`/admin/settings\`      | ⚠️             | ✅          | ✅        | ✅           | ✅             | n/a           |
| \`/admin/scene-generator\` | ⚠️ / 🔴      | ⚠️ / 🔴     | ✅        | ⚠️           | ✅             | n/a           |
| \`/admin/copy-agent\`    | ⚠️ / 🔴        | ⚠️          | ✅        | ✅           | ✅             | n/a           |

---

## 3) Backlog P0 / P1 / P2

### P0 (Críticos)

1. Revisar **todas** as \`Server Actions\` em:
   - \`admin/(protected)/trabalhos/actions.ts\`
   - \`admin/(protected)/landing-pages/actions.ts\`
   - \`admin/(protected)/midia/actions.ts\`
   - \`admin/(protected)/tags/actions.ts\`
   - \`admin/(protected)/scene-generator/actions.ts\`
   - \`admin/(protected)/copy-agent/actions.ts\`  
   Para garantir:
   - Verificação de sessão.
   - Role admin.
   - Early return/throw para não autorizados.
2. Implementar/validar **trap de foco, ESC e retorno de foco** em:
   - \`PortfolioModal.tsx\`.
   - \`ImageLightbox.tsx\`.
3. Garantir **1x \`h1\` por página** e revisão de hierarquia de headings.
4. Implementar **prefers-reduced-motion** global e path-level, especialmente para:
   - Header (DesktopFluidHeader, MobileStaggeredMenu).
   - Hero (Home, Portfolio).
   - Scene Generator.

### P1 (Médio/Alto)

5. Implementar **JSON-LD por slug**:
   - \`/portfolio/[slug]\`, \`/projects/[slug]\`.
6. Validar e corrigir, se necessário, a **Ghost Grid**:
   - Equal height por linha.
   - Preenchimento 100%.
7. Medir e otimizar **FCP/LCP/CLS** prioritariamente em:
   - Home.
   - \`/portfolio\`.
   - \`/portfolio/[slug]\`.
   - \`/projects/[slug]\`.
8. Auditar navegação por teclado em:
   - Header global.
   - Admin Dashboard.
   - CRUDs de Trabalhos/Landings/Mídia.

### P2 (Baixo)

9. Consolidar tokens visuais e spacing entre layout público/admin.
10. Criar e expandir suíte **Playwright** para fluxos 1–6 descritos.

---

## 4) Plano de Correção (Rápido / Estrutural / Polimento)

### 4.1 Fase Rápida (1–3 dias)

- Acessibilidade:
  - Adicionar/validar \`h1\` único em todas as páginas.
  - Garantir foco visível em links/botões principais (Tailwind focus states).
  - Implementar mínimo de ARIA em header, menus e modais.
- Motion:
  - Envolver animações globais em verificação de prefers-reduced-motion.
- Admin Auth (Quick pass):
  - Nos \`actions.ts\`, adicionar wrapper básico de verificação de sessão/rol :OaiMdDirective_Annotations_3if07{attrs="eyJpbmRleCI6NX0"}e (seguindo padrão das docs do App Router ).

### 4.2 Fase Estrutural (1–2 semanas)

- Hardening de segurança:
  - Refatorar padrões de Server Actions para:
    - Função comum de autorização.
    - Logs auditáveis.
- SEO avançado:
  - Implementar JSON-LD por slug.
  - Revisar canonical/OG por rota dinâmica.
- Ghost Grid:
  - Ajustar \`ProjectsGallery.module.css\` para:
    - Equal height.
    - Preenchimento total horizontal.
    - Comportamento consistente por breakpoint.

### 4.3 Fase de Polimento (2–4 semanas)

- Playwright:
  - Escrever testes E2E dos fluxos críticos.
- Micro-UX:
  - Ajustar micro-motions dentro dos limites (opacity/blur/translateY).
  - Refinar feedbacks de erro em formulários.
- Documentação:
  - Atualizar \`RULES-PORTFOLIO-STRUCTURE.md\` e GHOST DESIGN SYSTEM com qualquer regra refinada surgida do processo.

---

## 4️⃣ Prompts Técnicos Atômicos (Google Antigravity)

> ### 🛠️ Prompt #01 — Hardening de Server Actions de Admin
> Objetivo:  
> Garantir que todas as Server Actions de \`/admin/(protected)/*\` verifiquem sessão e role admin antes de qualquer mutação.
> Arquivos:  
> - \`src/app/admin/(protected)/trabalhos/actions.ts\`  
> - \`src/app/admin/(protected)/landing-pages/actions.ts\`  
> - \`src/app/admin/(protected)/midia/actions.ts\`  
> - \`src/app/admin/(protected)/tags/actions.ts\`  
> - \`src/app/admin/(protected)/scene-generator/actions.ts\`  
> - \`src/app/admin/(protected)/copy-agent/actions.ts\`  
> Ações:  
> - Implementar função utilitária de autorização (ex: \`requireAdmin()\`) que:
>   - Verifica sessão via Supabase/Next Auth.
>   - Lança erro ou retorna early caso o usuário não seja admin.  
> - Aplicar essa função no topo de todas as Actions.  
> Regras:  
> - Nunca confiar apenas em checagens client-side.  
> - Ac :OaiMdDirective_Annotations_3if07{attrs="eyJpbmRleCI6Nn0"}tions devem falhar fechadas (fail closed).   
> Critérios de Aceite:  
> - Toda Action com mutação dispara erro explícito quando chamada sem sessão/role admin.  
> - Testes (unit ou integration) cobrindo pelo menos um caminho não autorizado e um autorizado.

> ### 🛠️ Prompt #02 — Trap de Foco e ESC em PortfolioModal
> Objetivo:  
> Implementar acessibilidade completa em \`PortfolioModal\` e \`ImageLightbox\`.
> Arquivos:  
> - \`src/components/portfolio/PortfolioModal.tsx\`  
> - \`src/components/portfolio/ImageLightbox.tsx\`  
> Ações:  
> - Adicionar trap de foco para manter foco dentro do modal.  
> - Implementar listener de ESC para fechar modal.  
> - Restaurar foco ao elemento que abriu o modal.  
> Regras:  
> - Usar \`role="dialog"\` e \`aria-modal="true"\`.  
> - Garantir que elementos de fundo não sejam focáveis enquanto o modal está aberto.  
> Critérios de Aceite:  
> - Teste manual de teclado (Tab/Shift+Tab/ESC) mostra foco preso ao modal enquanto aberto.  
> - Ao fechar, foco retorna ao card original.

> ### 🛠️ Prompt #03 — Garantir 1x h1 por Página
> Objetivo:  
> Padronizar a hierarquia de headings em todas as rotas foco.
> Arquivos:  
> - \`src/app/page.tsx\`  
> - \`src/app/portfolio/page.tsx\`  
> - \`src/app/portfolio/[slug]/page.tsx\`  
> - \`src/app/projects/[slug]/page.tsx\`  
> - \`src/app/admin/(auth)/login/page.tsx\`  
> - \`src/app/admin/(protected)/page.tsx\`  
> - Demais páginas relevantes do admin.  
> Ações:  
> - Revisar JSX e garantir um único \`h1\` por página.  
> - Adequar \`h2\`/ \`h3\` subsequentes a uma estrutura semântica clara.  
> Regras:  
> - Não usar \`div\` estilizada como heading sem markup de heading.  
> Critérios de Aceite:  
> - Validação via axe/lighthouse não retorna issues de headings incorretos nas rotas foco.

> ### 🛠️ Prompt #04 — Prefers-Reduced-Motion Global
> Objetivo:  
> Respeitar preferências de redução de movimento dos usuários.
> Arquivos:  
> - \`src/components/layout/header/DesktopFluidHeader.tsx\`  
> - \`src/components/layout/header/MobileStaggeredMenu.tsx\`  
> - \`src/components/portfolio/PortfolioHeroNew.tsx\`  
> - \`src/components/portfolio/RotatingHighlights.tsx\`  
> - \`src/app/admin/(protected)/scene-generator/page.tsx\`  
> Ações:  
> - Criar hook/utilitário para consultar prefers-reduced-motion.  
> - Condicionar animações de entrada/scroll/3D a esse flag.  
> Regras:  
> - Substituir animações intensas por estados estáticos quando reduzido.  
> Critérios de Aceite:  
> - Com prefers-reduced-motion ativo, nenhuma animação perceptível é disparada nas rotas foco.

> ### 🛠️ Prompt #05 — Ghost Grid 100% e Equal Height na \`ProjectsGallery\`
> Objetivo:  
> Garantir que a grid de \`/portfolio\` siga fielmente o Ghost Design System.
> Arquivos:  
> - \`src/components/portfolio/ProjectsGallery.tsx\`  
> - \`src/components/portfolio/ProjectsGallery.module.css\`  
> - \`.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md\`  
> - \`.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md\`  
> Ações:  
> - Ajustar CSS/grid para equal height por linha.  
> - Garantir preenchimento total horizontal (sem buracos).  
> Regras:  
> - Mobile-first; checar 320px/375px/768px/1024px/1440px.  
> Critérios de Aceite:  
> - Em todos os breakpoints alvo, não há gaps estranhos e os cards de mesma linha têm alturas coerentes.

> ### 🛠️ Prompt #06 — JSON-LD para \`/portfolio/[slug]\` e \`/projects/[slug]\`
> Objetivo:  
> Melhorar SEO com dados estruturados por projeto.
> Arquivos:  
> - \`src/app/portfolio/[slug]/page.tsx\`  
> - \`src/app/projects/[slug]/page.tsx\`  
> Ações:  
> - Implementar função que gera script JSON-LD para cada slug.  
> Regras:  
> - Incluir nome, descrição, imagem principal, data, tags.  
> Critérios de Aceite:  
> - Google Rich Results Test reconhece os dados estruturados sem warnings críticos.

> ### 🛠️ Prompt #07 — E2E Playwright para Fluxos Críticos 1–6
> Objetivo:  
> Garantir estabilidade dos fluxos de maior impacto de conversão e operação.
> Arquivos:  
> - Configuração Playwright (\`tests/e2e/*\`).  
> - Rotas foco.  
> Ações:  
> - Escrever testes cobrindo:
>   1. Header → \`/contato\` → submit.  
>   2. \`/portfolio\`: abrir/fechar modal por teclado.  
>   3. \`/portfolio\`: abrir landing \`/projects/[slug]\`.  
>   4. Modal: ESC + retorno de foco.  
>   5. Admin: criar trabalho → ver em \`/portfolio\`.  
>   6. Admin: publicar landing → rota pública renderiza.  
> Regras:  
> - Não depender de dados estáticos frágéis; usar fixtures ou seeds.  
> Critérios de Aceite:  
> - Todos os testes passam em CI em ambiente limpo.

> ### 🛠️ Prompt #08 — Otimização de Scene Generator
> Objetivo:  
> Reduzir impacto de performance da rota \`/admin/scene-generator\`.
> Arquivos:  
> - \`src/app/admin/(protected)/scene-generator/page.tsx\`  
> - \`src/app/admin/(protected)/scene-generator/actions.ts\`  
> - \`src/components/canvas/*\` (se aplicável)  
> Ações:  
> - Introduzir dynamic import para canvas/3D.  
> - Adicionar Suspense/loader leve.  
> - Garantir que a cena não bloqueia primeiro paint do layout.  
> Regras:  
> - Não carregar assets 3D antes do layout mínimo estar visível.  
> Critérios de Aceite:  
> - LCP da rota admin principal não é significativamente afetado pela Scene Generator.

`;
> ### 🛠️ Prompt #09 — TASK: Refatoração de Templates de Projeto e Correção de Erros de Hydration/Keys
Objetivo: Corrigir bugs de alinhamento, remover blocos de texto redundantes e sanar erros críticos de console no template MasterProjectTemplateV3Editor.tsx e similares.

1. Ajustes Visuais e de Conteúdo (UI/UX)
Bloco 'quote-band' (Faixa de Citação Full): Centralize o conteúdo deste bloco no arquivo MasterProjectTemplateV3Editor.tsx. Atualmente ele apresenta desalinhamento. Verifique e aplique a mesma correção em outros templates de projeto (ex: V1, V2, ALPA) caso o erro se repita.

Remoção de Texto de Contexto: Localize e exclua permanentemente o bloco de texto fixo no final da landing page que começa com "Contexto do Projeto: Este case apresenta um recorte completo do processo criativo...". Este texto não deve ser renderizado por padrão nos templates.

2. Correção de Erros de Console (Next.js 16.1.6)
Erro de Unique "key" Prop: O console reporta erro em OuterLayoutRouter. Analise todos os loops (.map()) dentro dos templates de projeto e garanta que o elemento pai imediato de cada iteração possua uma key única e estável (evite usar apenas o index se houver um ID disponível).

Erro de Hydration Mismatch: - Analise o arquivo src/components/projects/templates/ProjectTemplateALPARenderer.tsx (especialmente por volta da linha 678).

O erro indica que os atributos src e srcSet das imagens (Supabase) gerados no servidor não batem com os do cliente.

Ação: Certifique-se de que a lógica de geração de URL de imagem seja determinística. Se houver verificações de window ou valores dinâmicos no render inicial, mova-os para um useEffect ou utilize supressão de aviso de hidratação apenas se for estritamente necessário (suppressHydrationWarning).

Verifique se o uso de motion.div (Framer Motion) com initial e animate está causando conflito de renderização entre as camadas de servidor e cliente.

3. Verificação de Escopo
Aplique estas correções de forma transversal. Se o ProjectRenderer.tsx ou outros componentes compartilhados forem a raiz do erro de "keys", ajuste-os lá para que todos os templates sejam beneficiados.

4. Resultado Esperado
Código limpo e sem erros no console do navegador.

Bloco de citação visualmente centralizado.

Landing pages de projeto sem o texto de "Contexto" genérico no rodapé.





Dicas para a implementação (Parceiro de Programação):
O Problema da Key: Geralmente, esse erro acontece quando você renderiza uma lista de blocos (como o seu sistema de gallery_grid). Certifique-se de que o Agent verifique se o block.id está sendo usado como key: <div key={block.id}>...</div>.

O Problema da Hidratação: No erro que você postou, o Next.js reclama da diferença na string da URL da imagem do Supabase. Isso acontece muito se a URL é "montada" no lado do cliente usando alguma variável que não está disponível no servidor no momento do "build" ou do primeiro "render". O Agent deve garantir que o NEXT_PUBLIC_SUPABASE_URL esteja acessível em ambos os contextos.

Centralização do Quote: Peça ao agent para usar classes utilitárias do Tailwind (como text-center, flex justify-center, items-center ou mx-auto) dependendo da estrutura do componente de citação.


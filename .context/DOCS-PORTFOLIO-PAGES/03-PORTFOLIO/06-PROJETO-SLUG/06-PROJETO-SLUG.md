# 06-PROJETO-SLUG

## 0. Estrutura de arquivos das rotas de projeto

- **Rota Clássica de Detalhes de Projeto:**
  - Rota: `/portfolio/[slug]`
  - Código: `src/app/portfolio/[slug]/page.tsx`
  - Helpers: `src/lib/portfolio/project-mappers.ts`, `src/lib/supabase/queries/projects.ts`
  - Componentes: `RotatingHighlights`, `ReactMarkdown`
- **Rota de Landing Page Editorial (Template ALPA V3):**
  - Rota: `/projects/[slug]`
  - Código: `src/app/projects/[slug]/page.tsx`
  - Renderizador: `src/components/projects/ProjectRenderer.tsx`
  - Template Principal: `src/components/projects/templates/ProjectTemplateMasterRenderer.tsx` (ALPA V3)
  - Banco de dados: Tabela `landing_pages` do Supabase

## 1. Objetivo das Rotas

Exibir casos de estudo detalhados e específicos de cada projeto do portfólio. A aplicação possui duas estratégias distintas para renderizar projetos, dependendo do destino definido nas configurações do card no admin: uma página padrão de metadados e markdown (rota clássica), ou um construtor de blocos ricos orientados a grids e seções interativas complexas (rota ALPA).

---

## 2. Rota Clássica: `/portfolio/[slug]`

### Estratégia de Dados
- **Consulta ao Banco:** Tenta buscar o projeto no banco de dados primeiro através da view `public_projects_view` comparando o slug recebido e suas variações com traço/sublinhado.
- **Fallback Estático:** Se o banco de dados estiver inacessível ou o registro não for encontrado, realiza fallback resiliente para as informações estáticas mapeadas em `HOME_CONTENT.featuredProjects`.

### Estrutura de Conteúdo e Layout
1. **Navegação Superior:** Link simplificado "Back to Portfolio" com ícone de seta.
2. **Meta Header:** Exibe o título do projeto em grande destaque tipográfico (`text-4xl md:text-7xl`), o cliente, a categoria e o ano do projeto separados por bordas.
3. **Mídia Principal (Hero):** Banner em proporção adaptativa (`aspect-video md:aspect-[2.4/1]`) contendo a imagem de destaque ou um vídeo de reprodução automática silenciado em loop.
4. **Narrativa do Case:** Renderiza o texto detalhado do projeto (Markdown) interpretando blocos de texto e vídeos do YouTube dinamicamente.
5. **Highlights Dinâmicos:** Exibe destaques rotativos do projeto via componente `<RotatingHighlights />` a cada 4.2 segundos.
6. **Galeria de Mídias:** Grade contendo imagens e vídeos secundários do projeto.
7. **Fechamento:** Termina com a `<SiteClosure />` global.

---

## 3. Rota de Landing Page (Template ALPA V3): `/projects/[slug]`

### Estratégia de Dados
- Busca os dados estruturados do case diretamente na tabela `landing_pages` no Supabase pelo slug do projeto.

### Arquitetura de Renderização
- **Dispatcher (`ProjectRenderer`):** Intercepta o formato de conteúdo armazenado e despacha para o renderizador master apropriado caso o template corresponda a `MASTER_PROJECT_TEMPLATE`, `MASTER_PROJECT_TEMPLATE_V2` ou `MASTER_PROJECT_TEMPLATE_V3`.
- **Renderizador ALPA V3 (`ProjectTemplateMasterRenderer`):** Controla e empilha até 10 blocos editoriais dinâmicos e flexíveis criados na interface administrativa (como blocos de texto, vídeos, imagens em tela cheia, colunas com imagem e texto, grids de mídias, etc.).
- **Fechamento:** Exibe o rodapé do site (`SiteFooter`).

---

## 4. SEO, Acessibilidade & Metadata

- **Metadata Dinâmico:** Ambas as rotas utilizam a função `generateMetadata` para extrair descrições e títulos reais de SEO e imagens OpenGraph baseadas nas informações do projeto cadastrado, otimizando o rankeamento individual de cada projeto no Google.
- **JSON-LD (Structured Data):**
  - Injeta esquemas estruturados de `"project"` (dados do case como cliente, categoria, ano e URL) e `"VideoObject"` (caso a mídia principal seja vídeo) para otimizar indexação semântica.

:PORT DAN REVISADO - NEXT.md

# Documento de Especificação Técnica — Home Page

**Projeto:** Portfólio Institucional de Danilo Novais  
**Páginas Principais:** Home, Sobre, Portfólio, Contato  
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

---

# **SECTION NAME: Featured Projects**

**SECTION PURPOSE:**

- Exibir projetos em destaque
- Direcionar o usuário para mais detalhes

**PRIMARY MESSAGE / HEADLINE:**

- "Projetos em Destaque"

**SECONDARY MESSAGE / SUPPORT TEXT:**

- N/A

**KEY CONTENT ELEMENTS:**

- Grid de cards com imagens dos projetos
- Título, cliente, ano e categoria para cada projeto
- CTA "view projects"

**CALL TO ACTION:**

- Texto: "view projects"
- Comportamento: Ao clicar, redireciona para a página Portfólio Showcase (`/portfolio`)

**LAYOUT TYPE:**

- Grid responsivo com 1, 2 ou 3 colunas

**ALIGNMENT:**

- Horizontal: Cards centralizados
- Vertical: Centralizado verticalmente

**SPACING:**

- Padding interno: `py-12`
- Margem entre os cards: `gap-6`

**BACKGROUND:**

- Cor sólida cinza claro (`bg-[#F4F5F7]`)

**SECTION COLORS:**

- Título: `text-[#0057FF]`
- Texto dos cards: `text-[#111111]`
- CTA: `bg-[#0057FF]`, `text-white`

**TYPOGRAPHY:**

- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold para o título, Regular para o conteúdo dos cards
- Tamanho: Título `text-2xl`, Conteúdo dos cards `text-lg`

**IMAGERY:**

- Imagens dos projetos

**MEDIA:**

- N/A

**COMPONENTS USED:**

- `<section>`, `<div>`, `<h2>`, `<div>` (card), `<img>`, `<h3>`, `<p>`, `<a>`

**STATE VARIANTS:**

- Hover no card: Leve elevação (`translateY(-5px)`) e sombra
- Hover no CTA: Leve elevação (`translateY(-1px)`)

**INTERACTIONS:**

- Clique no card: Redireciona para a página do projeto
- Clique no CTA: Redireciona para `/portfolio`

**SCROLL BEHAVIOUR:**

- Reveal on scroll: Animação de entrada staggered ao entrar na viewport

**ANIMATIONS:**

- Entrada da seção:
  - Container: initial={{ opacity: 0, y: 40 }} → whileInView={{ opacity: 1, y: 0 }}
  - Cards: staggerChildren: 0.08
  - Cada card:
    - initial={{ opacity: 0, y: 24, scale: 0.96 }}
    - whileInView={{ opacity: 1, y: 0, scale: 1 }}
- Hover nos cards:
  - Imagem: whileHover={{ scale: 1.03, y: -4 }}
  - Overlay gradiente suave escuro + título em branco com fadeUp
  - Shadow: shadow-xl + shadow-blue-500/15
- Card "Like what you see? view projects":
  - Botão com o mesmo hover do CTA da hero
  - Ícone de seta com animação sutil de x (0 → 4px → 0) em loop lento

**MICRO-INTERACTIONS:**

- Feedback visual ao hover no card e no CTA

**TEXT LIMITS:**

- Título: Máximo 30 caracteres
- Título dos projetos: Máximo 50 caracteres
- Cliente: Máximo 30 caracteres
- Categoria: Máximo 30 caracteres
- CTA: Máximo 30 caracteres

**CONTENT PRIORITY:**

- Alta: Título e cards
- Média: CTA

**ALTERNATIVE CONTENT:**

- Se nenhuma imagem for exibida, mostrar um placeholder com o texto "Imagem do projeto"

**LINKS / DESTINATIONS:**

- Cards: Link para a página do projeto
- CTA: `/portfolio`

### Projetos

- **Slug:** `magic-radio-branding`  
  **Título:** Magic — devolvendo a magia ao rádio  
  **Categoria:** branding & campanha  
  **Cliente:** Magic  
  **Ano:** 2023  
  **Imagem URL:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp

- **Slug:** `branding-project-01`  
  **Título:** Uma marca ousada e consistente  
  **Categoria:** branding  
  **Cliente:** Cliente confidencial  
  **Ano:** 2022  
  **Imagem URL:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp

- **Slug:** `key-visual-campaign`  
  **Título:** Key visual para campanha sazonal  
  **Categoria:** campanha  
  **Cliente:** Cliente confidencial  
  **Ano:** 2021  
  **Imagem URL:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp

- **Slug:** `webdesigner-motion`  
  **Título:** Experiência web em movimento  
  **Categoria:** web & motion  
  **Cliente:** Cliente confidencial  
  **Ano:** 2023  
  **Imagem URL:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif

**DATA HOOKS / TRACKING:**

- Eventos de clique nos cards e no CTA para analytics

**DEPENDENCIES:**

- `HOMEPAGE_CONTENT.projectCards`

**ACCESSIBILITY NOTES:**

- As imagens dos projetos devem ter `alt` descritivo
- Os cards devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de entrada

**SPECIAL STATES:**

- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro

**NOTES / INSPIRATION:**

- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`

**NON-NEGOTIABLES:**

- Grid de cards com imagens dos projetos
- Informações de cada projeto (título, cliente, ano, categoria)
- CTA que redireciona para a página Portfólio Showcase

---

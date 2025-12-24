
# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais
**Páginas Principais:** Home, Sobre, Portfólio, Contato
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto,Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)
---
## INFORMAÇÕES GLOBAIS

### 1. Contexto do Projeto
- Projeto: Portfólio Institucional de Danilo Novais.
- Páginas principais:
  - Home
  - Sobre
  - Portfólio
  - Contato

**Ordem das seções da Home:**
1. Header
2. Hero
3. Vídeo Manifesto (Manifesto)
4. Portfolio Showcase
5. Featured Projects
6. Clients / Brands
7. Contact
8. Footer

---

### 2. Assets Globais
- **Logo Light:**  ["./src/assets/logos/LogoLight.svg"]
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg
- **Logo Dark:**  ["./src/assets/logos/LogoDark.svg"]
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg
- **Favicon:**  ["./src/assets/logos/Favicon.svg"]
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg
 - **Favicon Light:**  ["./src/assets/logos/FaviconLight.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logoHeaderClaro.svg

---

### 3. Conteúdo Global por Seção (dados base)

#### Hero
- Tag: `[BRAND AWARENESS]`
- Título:
  ```
  Design, não é
  só estética.
  ```
- Subtítulo: `[É intenção, é estratégia, é experiência.]`
- CTA label: `get to know me better →`
- CTA secundário (scroll): `#manifesto`
- **WebGL Atmosférico:** Ghost abstrato + pós-processamento (substitui qualquer modelo GLB)

**TYPOGRAPHY:**
- Fonte: TT Norms Pro

#### Manifesto (Vídeo)
- Vídeo URL (usado na Hero e na seção Manifesto):  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4

---

### 4. Princípios Globais de Animação
- **DOM:** Framer Motion
  - Reveals (`whileInView`)
  - Microinterações (`whileHover`, `whileTap`)
  - Scroll (`useScroll`, `useTransform`)
- Animar apenas `transform` e `opacity`
- **WebGL:** React Three Fiber (`useFrame`)
- `prefers-reduced-motion: reduce`
  - Desativa follow, bloom intenso e parallax
  - Mantém layout e fades simples


- **Portfolio Showcase**
- Título: `portfólio showcase`
- Categorias:
| ID | Label (UI) |
Label PT (explicativo) | Thumbnail URL
|
| ---------------------------- | -------------------------------- |
-------------------------------- |
-----------------------------------------------------------------------
------------------------------------ |
| `brand-campaigns` | `Brand & Campaigns` |
`Brand & Campanhas` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp` |
| `videos-motions` | `Videos & Motions` |
`Vídeos & Motions` |
`https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/y2mate.com%20-%20promoao_ta_podendo_nestle_ta_de_volta__wanzLKTQOE_1080p.mp4` |
| `websites-webcampaigns-tech` | `Web Campaigns, Websites & Tech` |
`Campanhas Web, Websites & Tech` |
`https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp` |


- CTA final:
- Label: `VEJA MAIS →`
- Href: `/portfolio`




- **Featured Projects — cards**
| Slug | Título |
Categoria | Cliente | Ano | Imagem URL
|
| ---------------------- | ------------------------------------- |
--------------------- | ---------------------- | ---- |
-------------------------------------------------------------------------
------------------------------------ |
| `magic-radio-branding` | `Magic — devolvendo a magia ao rádio` |
`branding & campanha` | `Magic` | 2023 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp` |
| `branding-project-01` | `Uma marca ousada e consistente` |
`branding` | `Cliente confidencial` | 2022 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp` |
| `key-visual-campaign` | `Key visual para campanha sazonal` |
`campanha` | `Cliente confidencial` | 2021 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Key-Visual.webp` |
| `webdesigner-motion` | `Experiência web em movimento` | `web &
motion` | `Cliente confidencial` | 2023 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif` |





- **Clients / Brands**
- Título: `marcas com as quais já trabalhei`
- Logos (monocromáticos claros):
| # | URL
|
| --- |
-----------------------------------------------------------------------
---------------------- |
| 1 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client1.svg` |
| 2 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client2.svg` |
| 3 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client3.svg` |
| 4 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client4.svg` |
| 5 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client5.svg` |
| 6 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client6.svg` |
| 7 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client7.svg` |
| 8 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client8.svg` |
| 9 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client9.svg` |
| 10 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client10.svg` |
| 11 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client11.svg` |
| 12 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client12.svg` |


- **Contact**
- Título: `contato`
- Subtítulo: `Tem uma pergunta ou quer trabalhar junto?`
- Form:
- Action: `https://formsubmit.co/danilo@portfoliodanilo.com`
- Button label: `Enviar Mensagem`
- Links:
- Telefone: `tel:+5511983966838`
- Email primário: `mailto:dannovaisv@gmail.com`
- Email secundário: `mailto:danilo@portfoliodanilo.com`
- Instagram: `https://instagram.com/danilo_novais`
- Facebook: `https://facebook.com/danilonovaisvilela`
- LinkedIn: `https://linkedin.com/in/danilonovais`
- Portfolio: `https://portfoliodanilo.com`
- Twitter: `https://twitter.com/danilo_novais`
- **Footer**
- Copyright:
- Home: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
- Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos
reservados.`
**[SUGESTÃO]** Unificar para `© 2025 ...` em todo o site.
- Links:
- `home` → `#hero`
- `portfólio showcase` → `#portfolio-showcase`
- `Sobre` → `#clients` (atual) **[SUGESTÃO]** preferir `/sobre`
- `contato` → `#contact`
### 4. Princípios Globais de Animação
- Usar Framer Motion para:
- Reveals no scroll (`whileInView`, `useInView`).
- Microinterações (`whileHover`, `whileTap`).
- Animações de scroll (`useScroll`, `useTransform`).
- Animar apenas `transform` e `opacity`.
- Respeitar `prefers-reduced-motion: reduce`:
- Desativar rotação 3D contínua, parallax e morph thumb→vídeo.
- Manter estados estáticos + fades simples.
**implementação padrão**
para animações de scroll, com JS puro (`requestAnimationFrame`) apenas
como alternativa se necessário.
---

## ESPECIFICAÇÃO POR SEÇÃO (TEMPLATE COMPLETO)
---

# **SECTION NAME: Header (SiteHeader)**
### Desktop: Fluid Glass Navigation  
### Mobile & Tablet: Staggered Menu Navigation

---

## SECTION PURPOSE (what this section must achieve)
- Fornecer navegação global e identidade visual do site.
- Permanecer visível em todas as páginas.
- Reforçar a identidade **premium + experimental** do projeto.
- Atuar como camada atmosférica complementar à Hero Ghost.

---

## RESPONSABILIDADE CONCEITUAL

### Desktop
- O header se comporta como um **objeto óptico fluido**.
- Utiliza **refração real em WebGL** (Fluid Glass).
- Não disputa atenção com a Hero — apenas dialoga visualmente.

### Mobile & Tablet
- O header é **funcional e minimalista**.
- A navegação ocorre via **menu fullscreen staggered**.
- Performance e clareza são priorizadas sobre efeitos visuais.

---

## BREAKPOINT STRATEGY

| Device | Behaviour |
|------|----------|
| Desktop ≥ 1024px | Fluid Glass Header |
| Tablet ≤ 1023px | Staggered Menu |
| Mobile ≤ 640px | Staggered Menu |

---

## DESKTOP — FLUID GLASS HEADER

### VISUAL REFERENCE
https://reactbits.dev/components/fluid-glass

---

### VISUAL BEHAVIOR
- Elemento translúcido com refração real (MeshTransmissionMaterial)
- Distorção óptica sutil
- Chromatic aberration controlada
- Movimento leve seguindo o cursor
- Renderiza o conteúdo por trás (não possui fundo sólido)

---

### CONTENT (DESKTOP)
- Logo (Light)
- Navigation links:
  - Home → `/` ou `#hero`
  - Sobre → `/sobre`
  - Portfolio → `/portfolio`
  - Contato → `#contact`

---

### LAYOUT TYPE
- Header flutuante
- Centralizado horizontalmente
- Altura compacta
- Não ocupa 100% da largura (aspecto de “objeto”)

---

### FILE ARCHITECTURE (DESKTOP)

```
components/header/
 ├─ SiteHeader.tsx
 ├─ DesktopFluidHeader.tsx
 └─ webgl/
     └─ FluidGlass.tsx
```

---

### FLUID GLASS — DEFAULT CONFIGURATION

```tsx
<FluidGlass
  mode="lens"
  lensProps={{
    scale: 0.25,
    ior: 1.15,
    thickness: 5,
    chromaticAberration: 0.1,
    anisotropy: 0.01
  }}
/>
```

---

### INTERACTIONS (DESKTOP)
- Hover nos links:
  - Apenas alteração de opacidade
  - ❌ Sem underline
  - ❌ Sem animações chamativas
- Pointer move:
  - Vidro acompanha suavemente o cursor
- Scroll:
  - Header permanece fixo
  - ❌ Sem morph de tamanho
  - ❌ Sem animação por scroll

---

### PERFORMANCE (DESKTOP)
- Canvas WebGL isolado
- Sem ScrollControls
- DPR limitado
- Geometria simples (`lens.glb`)
- Fallback automático se WebGL falhar

---

### ACCESSIBILITY (DESKTOP)
- Navegação por teclado funcional
- Links com `aria-label`
- Fallback HTML:
  - Logo + links estáticos se WebGL não estiver disponível

---

## MOBILE & TABLET — STAGGERED MENU

### VISUAL REFERENCE
https://reactbits.dev/components/staggered-menu

---

### VISUAL BEHAVIOR
- Menu fullscreen
- Entrada lateral
- Animação staggered editorial
- Camadas de cor animadas (prelayers)
- Ícone Menu ↔ Close animado

---

### STAGGERED MENU — DEFAULT CONFIGURATION

```tsx
<StaggeredMenu
  position="right"
  items={menuItems}
  socialItems={socialItems}
  displaySocials={true}
  displayItemNumbering={true}
  menuButtonColor="#e9e9ef"
  openMenuButtonColor="#000"
  changeMenuColorOnOpen={true}
  colors={['#B19EEF', '#5227FF']}
  accentColor="#5227FF"
  isFixed
/>
```

---

## Z-INDEX STRATEGY

```
z-40 → Header / Menu
z-20 → Hero Content
z-0  → WebGL Hero Canvas
```

---

## NON-NEGOTIABLES (HEADER)
- ❌ Header não compete com a Hero
- ❌ Sem glassmorphism fake em CSS
- ❌ Sem animações decorativas gratuitas
- ✅ WebGL apenas no Desktop
- ✅ Mobile sem WebGL pesado
- ✅ Fallback funcional obrigatório

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
- Comportamento: Ao clicar, redireciona para a página Portfólio Showcase
(`/portfolio`)
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
- Fonte: TT Norms Pro
- Peso: Bold para o título, Regular para o conteúdo dos cards
- Tamanho: Título `text-2xl`, Conteúdo dos cards `text-lg`
**IMAGERY:**
- Imagens dos projetos
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<div>` (card), `<img>`, `<h3>`, `<p>`,
`<a>`
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
- Container: initial={{ opacity: 0, y: 40 }} → whileInView={{ opacity: 1,
y: 0 }}
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
- Se nenhuma imagem for exibida, mostrar um placeholder com o texto "Imagem
do projeto"
**LINKS / DESTINATIONS:**
- Cards: Link para a página do projeto
- CTA: `/portfolio`
### Projetos
- **Slug:** `magic-radio-branding`
**Título:** Magic — devolvendo a magia ao rádio
**Categoria:** branding & campanha
**Cliente:** Magic
**Ano:** 2023
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp
- **Slug:** `branding-project-01`
**Título:** Uma marca ousada e consistente
**Categoria:** branding
**Cliente:** Cliente confidencial
**Ano:** 2022
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp
- **Slug:** `key-visual-campaign`
**Título:** Key visual para campanha sazonal
**Categoria:** campanha
**Cliente:** Cliente confidencial
**Ano:** 2021
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Key-Visual.webp
- **Slug:** `webdesigner-motion`
**Título:** Experiência web em movimento
**Categoria:** web & motion
**Cliente:** Cliente confidencial
**Ano:** 2023
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif
**DATA HOOKS / TRACKING:**
- Eventos de clique nos cards e no CTA para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.projectCards`
**ACCESSIBILITY NOTES:**
- As imagens dos projetos devem ter `alt` descritivo
- Os cards devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de
entrada
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


# **SECTION NAME: Clients/Brands**
**SECTION PURPOSE:**
- Mostrar marcas com as quais o designer já trabalhou
- Construir confiança e credibilidade
**PRIMARY MESSAGE / HEADLINE:**
- "marcas com as quais já trabalhei"
**SECONDARY MESSAGE / SUPPORT TEXT:**
- N/A
**KEY CONTENT ELEMENTS:**
- Logos das marcas
- Faixa azul de fundo
**CALL TO ACTION:**
- N/A
**LAYOUT TYPE:**
- Grid de logos
**ALIGNMENT:**
- Horizontal: Logos centralizadas
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-12`
- Margem entre os logos: `gap-4`
**BACKGROUND:**
- Cor sólida azul (`bg-[#0057FF]`)
**SECTION COLORS:**
- Título: `text-white`
- Logos: Branco (`filter brightness-0 invert`)
**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold
- Tamanho: `text-xl md:text-2xl`
**IMAGERY:**
- Logos das marcas
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<div>` (logo), `<img>`
**STATE VARIANTS:**
- Hover no logo: Leve escala (`scale(1.02)`)
**INTERACTIONS:**
- Hover no logo: Leve escala (`scale(1.02)`)
**SCROLL BEHAVIOUR:**
- Reveal on scroll: Animação de entrada staggered ao entrar na viewport
**ANIMATIONS:**
- Entrada:
- Título: initial={{ opacity: 0, y: 16 }} → whileInView={{ opacity: 1, y:
0 }}
- Logos: staggerChildren: 0.03
- Cada logo: initial={{ opacity: 0, y: 12, scale: 0.9 }} → animate={{
opacity: 1, y: 0, scale: 1 }}
- Hover:
- whileHover={{ scale: 1.04 }} + leve brightness(1.1)
**MICRO-INTERACTIONS:**
- Feedback visual ao hover no logo
**TEXT LIMITS:**
- Título: Máximo 50 caracteres
**CONTENT PRIORITY:**
- Alta: Título e logos
**ALTERNATIVE CONTENT:**
- Se nenhum logo for exibido, mostrar uma mensagem de erro
**LINKS / Globais:**
1.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client1.svg`
2.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client2.svg`
3.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client3.svg`
4.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client4.svg`
5.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client5.svg`
6.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client6.svg`
7.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client7.svg`
8.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client8.svg`
9.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client9.svg`
10.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client10.svg`
11.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client11.svg`
12.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client12.svg`
**DATA HOOKS / TRACKING:**
- Eventos de hover nos logos para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.clients`
**ACCESSIBILITY NOTES:**
- Os logos devem ter `alt` descritivo
- Os logos devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de
entrada
**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
**NON-NEGOTIABLES:**
- Faixa azul de fundo
- Logos das marcas
- Título "marcas com as quais já trabalhei"
---


# **SECTION NAME: Contact**
**SECTION PURPOSE:**
- Fornecer informações de contato
- Permitir que os usuários enviem mensagens
**PRIMARY MESSAGE / HEADLINE:**
- "contato"
**SECONDARY MESSAGE / SUPPORT TEXT:**
- "Tem uma pergunta ou quer trabalhar junto?"
**KEY CONTENT ELEMENTS:**
- Informações de contato (telefone, email, site)
- Formulário de contato
- Redes sociais
**CALL TO ACTION:**
- Texto: "Enviar Mensagem"
- Comportamento: Ao enviar, envia o formulário para o endpoint definido
**LAYOUT TYPE:**
- Duas colunas em desktop, uma em mobile
**ALIGNMENT:**
- Horizontal: Informações à esquerda, formulário à direita
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-12`
- Margem entre as colunas: `space-x-8`
**BACKGROUND:**
- Cor sólida branca (`bg-white`)
**SECTION COLORS:**
- Título: `text-[#0057FF]`
- Texto: `text-[#111111]`
- Botão: `bg-[#0057FF]`, `text-white`
**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold para o título, Regular para o conteúdo
- Tamanho: Título `text-2xl`, Conteúdo `text-lg`
**IMAGERY:**
- Ícones de redes sociais
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<p>`, `<form>`, `<input>`, `<textarea>`,
`<button>`, `<a>`
**STATE VARIANTS:**
- Focus nos inputs: Borda e sombra
- Hover no botão: Leve elevação (`translateY(-1px)`)
**INTERACTIONS:**
- Envio do formulário: Envia os dados para o endpoint definido
- Clique nas redes sociais: Abre o link em nova aba
**SCROLL BEHAVIOUR:**
- N/A
**ANIMATIONS:**
- Entrada:
- Seção: whileInView={{ opacity: 1, y: 0 }} partindo de initial={{
opacity: 0, y: 24 }}
- Campos do formulário com staggerChildren
- Interações:
- Inputs com focus-visible: ring-2 ring-blue-500 ring-offset-2
ring-offset-[#f5f5f7]
- Botão "enviar mensagem":
- whileHover={{ scale: 1.02, y: -1 }}
- whileTap={{ scale: 0.98 }}
**MICRO-INTERACTIONS:**
- Feedback visual ao focus nos inputs e ao hover no botão
**TEXT LIMITS:**
- Título: Máximo 30 caracteres
- Subtítulo: Máximo 100 caracteres
- Inputs: Máximo 100 caracteres
- Botão: Máximo 30 caracteres
**CONTENT PRIORITY:**
- Alta: Título e formulário
- Média: Informações de contato e redes sociais
**ALTERNATIVE CONTENT:**
- Se o formulário não carregar, mostrar uma mensagem de erro
**LINKS / DESTINATIONS:**
- Formulário: Endpoint definido em `HOMEPAGE_CONTENT.contact.form.action`
- Action: `https://formsubmit.co/danilo@portfoliodanilo.com`
- **Redes sociais: Links externos:**
- Telefone: `tel:+5511983966838`
- Email primário: `mailto:dannovaisv@gmail.com`
- Email secundário: `mailto:danilo@portfoliodanilo.com`
- Instagram: `https://instagram.com/danilo_novais`
- Facebook: `https://facebook.com/danilonovaisvilela`
- LinkedIn: `https://linkedin.com/in/danilonovais`
- Portfolio: `https://portfoliodanilo.com`
- Twitter: `https://twitter.com/danilo_novais`
**DATA HOOKS / TRACKING:**
- Eventos de envio do formulário para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.contact`
**ACCESSIBILITY NOTES:**
- Todos os inputs devem ter `label` associado
- O formulário deve ser acessível via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações
**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
- Sucesso: Mostrar mensagem de sucesso
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`
**NON-NEGOTIABLES:**
- Formulário de contato
- Informações de contato
- Redes sociais
---


## **SECTION NAME: Footer**
**SECTION PURPOSE:**
- Fornecer informações legais e de contato
- Permitir que os usuários voltem ao topo da página
**PRIMARY MESSAGE / HEADLINE:**
- N/A
**SECONDARY MESSAGE / SUPPORT TEXT:**
- "© 2025 Danilo Novais Vilela — todos os direitos reservados"
**KEY CONTENT ELEMENTS:**
- Copyright
- Links de navegação (Home, Portfolio Showcase, Brands, Contact)
- Redes sociais
**CALL TO ACTION:**
- N/A
**LAYOUT TYPE:**
- Barra fixa no rodapé da página
**ALIGNMENT:**
- Horizontal: Copyright à esquerda, links e redes sociais à direita
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-4`
- Margem entre os elementos: `space-x-4`
**BACKGROUND:**
- Cor sólida azul (`bg-[#0057FF]`)
**SECTION COLORS:**
- Texto: `text-white`
- Links: `text-white`, `hover:text-[#0057FF]`
**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Regular
- Tamanho: `text-sm`
**IMAGERY:**
- Ícones de redes sociais
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<footer>`, `<div>`, `<p>`, `<ul>`, `<li>`, `<a>`
**STATE VARIANTS:**
- Hover nos links: Muda a cor do texto para azul (`text-[#0057FF]`)
**INTERACTIONS:**
- Clique nos links: Redireciona para a página ou faz scroll até a seção
- Clique nas redes sociais: Abre o link em nova aba
**SCROLL BEHAVIOUR:**
- Fixo no rodapé da página (`fixed bottom-0 left-0 right-0`)
**ANIMATIONS:**
- Apenas um fadeIn simples:
- initial={{ opacity: 0 }}
- whileInView={{ opacity: 1 }}
- Links com sublinhado animado igual ao header; ícones sociais com hover
scale(1.05) + leve mudança de opacidade
**MICRO-INTERACTIONS:**
- Feedback visual ao hover nos links
**TEXT LIMITS:**
- Copyright: Máximo 100 caracteres
- Links: Máximo 30 caracteres
**CONTENT PRIORITY:**
- Alta: Copyright e links de navegação
- Média: Redes sociais
**ALTERNATIVE CONTENT:**
- Se nenhuma rede social for exibida, mostrar uma mensagem de erro
**LINKS / DESTINATIONS:**
- Copyright:
- Home: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
- Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos
reservados.`
- Links:
- `home` → `#hero`
- `portfólio showcase` → `#portfolio-showcase`
- `sobre` → `#clients`
- `contato` → `#contact`
**DATA HOOKS / TRACKING:**
- Eventos de clique nos links e redes sociais para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.footer`
**ACCESSIBILITY NOTES:**
- Todos os links devem ter `aria-label` descritivo
- O footer deve ser navegável via teclado (tab)
**SPECIAL STATES:**
- N/A
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
**NON-NEGOTIABLES:**
- Footer fixo
- Copyright
- Links de navegação
- Redes sociais
---


# **ANEXO TÉCNICO — WEBGL ATMOSFÉRICO (GHOST)**

## Objetivo
Documentar o pipeline técnico da Hero Ghost WebGL, substituindo completamente a abordagem anterior baseada em vidro líquido, GLB e MeshTransmissionMaterial.

---

## Paradigma Atual
- Sem modelos GLB
- Sem MeshTransmissionMaterial
- Sem ScrollControls
- WebGL como camada sensorial
- Pós-processamento como linguagem visual

---

## Canvas
```tsx
<Canvas
  dpr={[1, 2]}
  gl={{ antialias: false }}
  camera={{ position: [0, 0, 5], fov: 45 }}
>
```

---

## Loop de Animação
```ts
useFrame((state, delta) => {
  ghost.position.lerp(target, 0.08)
  material.emissiveIntensity =
    1 + Math.sin(state.clock.elapsedTime) * 0.2
})
```

---

## Postprocessing
- Bloom para aura
- Analog Decay para textura temporal
- Intensidade moderada (premium)

---

## Regras Não-Negociáveis
- WebGL nunca controla layout
- Texto nunca depende de shader
- Se o Canvas falhar, a Hero continua funcional

---

## Regra de Ouro
> WebGL apoia a narrativa. Nunca a substitui.

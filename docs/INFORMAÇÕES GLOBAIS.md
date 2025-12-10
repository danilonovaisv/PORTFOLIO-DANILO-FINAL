:PORT DAN REVISADO - NEXT.md

# Documento de Especificação Técnica — Home Page

**Projeto:** Portfólio Institucional de Danilo Novais  
**Páginas Principais:** Home, Sobre, Portfólio, Contato  
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

---

## INFORMAÇÕES GLOBAIS

### 1. Contexto do Projeto

- Projeto: Portfólio Institucional de Danilo Novais.
- Páginas principais:
  - Home
  - Sobre
  - Portfólio
  - Contato
- Seções da Home (ordem):
  1. Header
  2. Hero
  3. Vídeo Manifesto (Manifesto)
  4. Portfolio Showcase
  5. Featured Projects
  6. Clients / Brands
  7. Contact
  8. Footer

### 2. Assets Globais

- **Logo Light:**  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg`
- **Logo Dark:**  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg`
- **Favicon:**  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg`

### 3. Conteúdo Global por Seção (dados base)

- **Hero**
  - Tag: `[BRAND AWARENESS]`
  - Título: `Design, não é só estética.`
  - Subtítulo: `[É intenção, é estratégia, é experiência.]`
  - CTA label: `get to know me better →`
  - CTA target ID secundário (scroll): `#manifesto`
  - Model 3D path: `/media/abstract_element.glb` (ou `/public/models/torus_dan.glb`)

- **Manifesto (Vídeo)**
  - Vídeo URL:  
    `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

- **Portfolio Showcase**
  - Título: `portfólio showcase`
  - Categorias:

    | ID                           | Label (UI)                       | Label PT (explicativo)           | Thumbnail URL                                                                                               |
    | ---------------------------- | -------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
    | `brand-campaigns`            | `Brand & Campaigns`              | `Brand & Campanhas`              | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`    |
    | `videos-motions`             | `Videos & Motions`               | `Vídeos & Motions`               | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`    |
    | `websites-webcampaigns-tech` | `Web Campaigns, Websites & Tech` | `Campanhas Web, Websites & Tech` | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp` |

  - CTA final:
    - Label: `VEJA MAIS →`
    - Href: `/portfolio`

- **Featured Projects — cards**

  | Slug                   | Título                                | Categoria             | Cliente                | Ano  | Imagem URL                                                                                                    |
  | ---------------------- | ------------------------------------- | --------------------- | ---------------------- | ---- | ------------------------------------------------------------------------------------------------------------- |
  | `magic-radio-branding` | `Magic — devolvendo a magia ao rádio` | `branding & campanha` | `Magic`                | 2023 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp` |
  | `branding-project-01`  | `Uma marca ousada e consistente`      | `branding`            | `Cliente confidencial` | 2022 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`      |
  | `key-visual-campaign`  | `Key visual para campanha sazonal`    | `campanha`            | `Cliente confidencial` | 2021 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp`            |
  | `webdesigner-motion`   | `Experiência web em movimento`        | `web & motion`        | `Cliente confidencial` | 2023 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`      |

- **Clients / Brands**
  - Título: `marcas com as quais já trabalhei`
  - Logos (monocromáticos claros):

    | #   | URL                                                                                           |
    | --- | --------------------------------------------------------------------------------------------- |
    | 1   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg`  |
    | 2   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg`  |
    | 3   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg`  |
    | 4   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg`  |
    | 5   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg`  |
    | 6   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg`  |
    | 7   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg`  |
    | 8   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg`  |
    | 9   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg`  |
    | 10  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg` |
    | 11  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg` |
    | 12  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg` |

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
    - Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos reservados.`  
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
    para animações de scroll, com JS puro (`requestAnimationFrame`) apenas como alternativa se necessário.

---

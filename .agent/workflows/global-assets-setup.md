---
description: # Workflow: Configuração de Assets e Tokens Globais
---

# Workflow: Configuração de Assets e Tokens Globais

**Contexto:**
Centralizar toda a configuração visual e textual do projeto (`src/config/`).
**Regra de Ouro:** NENHUM valor deve estar "hardcoded" nos componentes (`.tsx`) ou arquivos CSS soltos. Sempre importe destes arquivos de configuração ou utilize as variáveis CSS/Tailwind definidas aqui.

**Arquivos Alvo:**

1. `src/config/brand.ts` (Design Tokens: Cores, Tipografia, Assets)
2. `src/styles/fonts.css` (Definição de `@font-face`)
3. `src/styles/globals.css` (Variáveis CSS e Clamps)
4. `src/config/navigation.ts` (Links, Redes Sociais, Contato)
5. `src/config/content.ts` (Textos da Home e Projetos)

---

## Passo 1: Configuração de Marca (`src/config/brand.ts`)

Defina a identidade visual, paleta de cores exata e assets estáticos.

```typescript
export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Design Tokens (Palette 2.1)
  colors: {
    bluePrimary: '#0048ff', // Cor primária, CTAs, links
    blueAccent: '#4fe6ff', // Destaques secundários, brilhos Ghost
    purpleDetails: '#8705f2', // Pequenos detalhes
    pinkDetails: '#f501d3', // Ênfases pontuais

    background: '#040013', // Fundo escuro principal
    backgroundLight: '#f0f0f0', // Seções claras (forms)

    text: '#fcffff', // Texto principal (Dark Mode)
    textInverse: '#0e0e0e', // Texto em fundos claros
    textEmphasis: '#2E85F2', // Palavras destacadas
    textHighlight: '#4fe6ff', // Destaques curtos
    textSecondary: '#a1a3a3', // Metadata

    neutral: '#0b0d3a', // Gradientes, fundos sutis
    neutralLight: '#F5F5F5', // Fundos secundários claros
  },

  typography: {
    fontFamily: {
      primary: 'TT Norms Pro',
      mono: 'PPSupplyMono',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    // Definições de peso para uso no Tailwind
    weights: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
  },

  // Assets Globais
  logos: {
    // Para fundo claro
    light:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg',
    // Para fundo escuro
    dark: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg',

    favicon:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg',
    faviconLight:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg',
  },

  video: {
    // Usado na Hero e Manifesto (mesma URL para cache)
    manifesto:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  },
};
```

---

## Passo 1.1: Configuração de Fontes (`src/styles/fonts.css`)

Implemente as fontes self-hosted via Supabase para garantir performance e consistência visual.

```css
/* TT Norms Pro - Primary Font */
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Thin.woff2')
    format('woff2');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Light.woff2')
    format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Regular.woff2')
    format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Medium.woff2')
    format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2')
    format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Black.woff2')
    format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

/* PPSupplyMono - Tag/Micro Font */
@font-face {
  font-family: 'PPSupplyMono';
  src: url('https://assets.codepen.io/7558/PPSupplyMono-Variable.woff2')
    format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

---

## Passo 1.2: Variáveis Globais e Clamp (`src/styles/globals.css`)

Defina a tipografia fluida para evitar media queries excessivas.

```css
@import './fonts.css';

:root {
  /* Tipografia Fluida (Mobile -> Desktop) */
  --font-display: clamp(2.5rem, 5vw, 4.5rem); /* 40px -> 72px */
  --font-h1: clamp(2rem, 4vw, 3.5rem); /* 32px -> 56px */
  --font-h2: clamp(1.5rem, 3vw, 2.5rem); /* 24px -> 40px */
  --font-h3: clamp(1.25rem, 2vw, 1.75rem); /* 20px -> 28px */
  --font-body: clamp(1rem, 1.2vw, 1.125rem); /* 16px -> 18px */

  --font-small: 0.875rem; /* 14px */
  --font-micro: 0.75rem; /* 12px */
}

body {
  font-family: 'TT Norms Pro', ui-sans-serif, system-ui, sans-serif;
  background-color: #040013; /* BRAND.colors.background */
  color: #fcffff; /* BRAND.colors.text */
  -webkit-font-smoothing: antialiased;
}

/* Classes utilitárias para Tipografia */
.type-display {
  font-size: var(--font-display);
  font-weight: 900;
  line-height: 1.1;
}
.type-h1 {
  font-size: var(--font-h1);
  font-weight: 700;
  line-height: 1.1;
}
.type-h2 {
  font-size: var(--font-h2);
  font-weight: 700;
  line-height: 1.15;
}
.type-h3 {
  font-size: var(--font-h3);
  font-weight: 500;
  line-height: 1.2;
}
.type-body {
  font-size: var(--font-body);
  font-weight: 400;
  line-height: 1.5;
}
.type-micro {
  font-family: 'PPSupplyMono', monospace;
  font-size: var(--font-micro);
}
```

---

## Passo 2: Configuração de Navegação (`src/config/navigation.ts`)

Centralize links externos, IDs de seção e formulários.

```typescript
export const SOCIALS = {
  instagram: 'https://instagram.com/danilo_novais',
  facebook: 'https://facebook.com/danilonovaisvilela',
  linkedin: 'https://linkedin.com/in/danilonovais',
  twitter: 'https://twitter.com/danilo_novais',
  emailPrimary: 'mailto:danilo@portfoliodanilo.com',
  emailSecondary: 'mailto:dannovaisv@gmail.com',
  phone: 'tel:+5511983966838',
};

export const CONTACT_FORM = {
  action: 'https://formsubmit.co/danilo@portfoliodanilo.com',
  buttonLabel: 'Enviar Mensagem',
};

export const NAVIGATION = {
  header: [
    { label: 'home', href: '#hero' },
    { label: 'sobre', href: '/sobre' },
    { label: 'portfólio showcase', href: '#portfolio-showcase' }, // ou /portfolio para página dedicada
    { label: 'contato', href: '#contact' },
  ],
  footer: {
    copyright: '© 2025 Danilo Novais Vilela — todos os direitos reservados.',
    links: [
      { label: 'home', href: '#hero' },
      { label: 'portfólio showcase', href: '#portfolio-showcase' },
      { label: 'sobre', href: '/sobre' },
      { label: 'contato', href: '#contact' },
    ],
  },
};
```

---

## Passo 3: Conteúdo da Home (`src/config/content.ts`)

Estruture os dados que alimentam as seções da Home Page.

```typescript
export const HOME_CONTENT = {
  hero: {
    tag: '[BRAND AWARENESS]',
    title: ['Você não vê o design.'],
    subtitle: '[Mas ele vê você.]',
    cta: 'step inside →',
    scrollHint: '#sobre',
  },

  showcase: {
    title: 'portfólio showcase',
    label: '[what we love working on]',
    cta: { label: "let's build something great →", href: '/portfolio' },
    categories: [
      {
        id: 'brand-campaigns',
        label: 'Brand & Campaigns',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      },
      {
        id: 'videos-motions',
        label: 'Videos & Motions',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      },
      {
        id: 'websites-webcampaigns-tech',
        label: 'Web Campaigns, Websites & Tech',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
      },
    ],
  },

  featuredProjects: [
    {
      slug: 'magic-radio-branding',
      title: 'Magic — devolvendo a magia ao rádio',
      category: 'branding & campanha',
      client: 'Magic',
      year: 2023,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    },
    {
      slug: 'branding-project-01',
      title: 'Uma marca ousada e consistente',
      category: 'branding',
      client: 'Cliente confidencial',
      year: 2022,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    },
    {
      slug: 'key-visual-campaign',
      title: 'Key visual para campanha sazonal',
      category: 'campanha',
      client: 'Cliente confidencial',
      year: 2021,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    },
    {
      slug: 'webdesigner-motion',
      title: 'Experiência web em movimento',
      category: 'web & motion',
      client: 'Cliente confidencial',
      year: 2023,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    },
  ],

  clients: {
    title: 'marcas com as quais já trabalhei',
    // URL Base para referência
    basePath:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/',
    // Gerar URLs programaticamente de 1 a 12 na implementação
    logos: Array.from(
      { length: 12 },
      (_, i) =>
        `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client${i + 1}.svg`
    ),
  },

  contact: {
    title: 'contato',
    subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
  },
};
```

---

## Passo 4: Princípios de Animação e Implementação

Ao implementar ou refatorar componentes, siga **ESTRITAMENTE** estas regras:

1. **Tecnologias de Animação:**

- **DOM:** Use `Framer Motion`.
- `whileInView` para reveals.
- `whileHover`, `whileTap` para micro-interações.
- `useScroll`, `useTransform` para efeitos de scroll (Parallax).

- **WebGL:** Use `React Three Fiber` (`useFrame`).
- **Propriedades:** Anime APENAS `transform` e `opacity` para performance.

2. **Acessibilidade (Reduced Motion):**

- Se `prefers-reduced-motion: reduce` for detectado:
- Desativar rotação 3D contínua.
- Desativar parallax e efeitos de "follow mouse".
- Manter estados estáticos e transições de fade simples.

3. **Ordem das Seções (Home):**
1. Header
1. Hero (com Ghost WebGL)
1. Portfolio Showcase
1. Featured Projects (Bento Grid)
1. Clients / Brands
1. Contact
1. Footer

1. **Ordem das Seções (Sobre):**
1. Header
1. About Hero (Video Loop)
1. About Origin (Grid Alternado)
1. About What I Do
1. About Method
1. About Beliefs (Ghost Manifesto)
1. About Closing (CTA)
1. Clients / Brands
1. Contact
1. Footer

---

## Passo 5: Execução da Refatoração

1. **Criar/Atualizar Arquivos:** Copie o conteúdo acima para os respectivos arquivos em `src/config/` e `src/styles/`.
2. **Tailwind Config:** Atualize `tailwind.config.ts` para usar `BRAND.colors` e `BRAND.typography` como fonte da verdade.
3. **Cleanup:** Faça um _grep search_ no projeto por strings hardcoded antigas (ex: "faivcon", URLs antigas, cores hexadecimais solta

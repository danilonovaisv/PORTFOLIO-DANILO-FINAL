---
description: Workflow para configurar e centralizar a fonte da verdade do projeto (Brand, Assets, Textos e Links), garantindo consistência com o Design System e conteúdo oficial.
---

# Workflow: Configuração de Assets e Tokens Globais

**Contexto:**
Centralizar toda a configuração visual e textual do projeto (`src/config/`).
NENHUM valor deve estar "hardcoded" nos componentes (`.tsx`). Sempre importe destes arquivos.

**Arquivos Alvo:**

1. `src/config/brand.ts` (Identidade, Cores, Logos, Vídeos)
2. `src/config/navigation.ts` (Links, Redes Sociais, Contato)
3. `src/config/content.ts` (Textos da Home e Projetos)

---

## Passo 1: Configuração de Marca (`src/config/brand.ts`)

Defina a identidade visual, cores e assets estáticos.

```typescript
export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Design Tokens
  colors: {
    primary: '#0057FF', // Destaque e interação
    bg: '#f0f0f0', // Fundo padrão neutro
    text: '#000000', // Texto padrão
    textInverse: '#FFFFFF', // Texto sobre fundo escuro
    neutralLight: '#F5F5F5', // Fundo secundário
  },

  typography: {
    primary: 'TT Norms Pro',
    fallbacks: ['ui-sans-serif', 'system-ui'],
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
    // Defina se houver menu no header, seguindo a ordem da home
  ],
  footer: {
    copyright: '© 2025 Danilo Novais Vilela — todos os direitos reservados.',
    links: [
      { label: 'home', href: '#hero' },
      { label: 'portfólio showcase', href: '#portfolio-showcase' },
      { label: 'sobre', href: '/sobre' }, // Sugestão: página dedicada ou #about se for one-page
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
    title: ['Design, não é', 'só estética.'],
    subtitle: '[É intenção, é estratégia, é experiência.]',
    cta: 'get to know me better →',
    scrollHint: '#manifesto',
  },

  showcase: {
    title: 'portfólio showcase',
    cta: { label: 'VEJA MAIS →', href: '/portfolio' },
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
    // Gerar URLs programaticamente de 1 a 12
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

Ao implementar ou refatorar componentes, siga STRICTLY estas regras:

1.  **Tecnologias de Animação:**
    - **DOM:** Use `Framer Motion`.
      - `whileInView` para reveals.
      - `whileHover`, `whileTap` para micro-interações.
      - `useScroll`, `useTransform` para efeitos de scroll.
    - **WebGL:** Use `React Three Fiber` (`useFrame`).
    - **Propriedades:** Anime APENAS `transform` e `opacity`.

2.  **Acessibilidade (Reduced Motion):**
    - Se `prefers-reduced-motion: reduce` for detectado:
      - Desativar rotação 3D contínua.
      - Desativar parallax e efeitos de "follow mouse".
      - Desativar morphing complexo (Video Thumb -> Video Player).
      - Manter estados estáticos e transições de fade simples.

3.  **Ordem das Seções (Home):**
    1.  Header
    2.  Hero (com Ghost WebGL)
    3.  Portfolio Showcase
    4.  Featured Projects
    5.  Clients / Brands
    6.  Contact
    7.  Footer

---

## Passo 5: Execução da Refatoração

1.  Atualize os arquivos em `src/config/` com o conteúdo acima.
2.  Verifique `tailwind.config.ts` e garanta que as cores (primary, bg, etc) estejam lá.
3.  Faça um grep search no projeto por strings hardcoded antigas (ex: "faivcon", URLs antigas) e substitua pelos imports do config.

---
description: # Workflow: Configuração de Assets e Tokens Globais
---

# Workflow: Configuração de Assets e Tokens Globais

**Contexto:**
Centralizar toda a configuração visual e textual do projeto (`src/config/`).
**Regra de Ouro:** NENHUM valor deve estar "hardcoded" nos componentes (`.tsx`) ou arquivos CSS soltos. Sempre importe destes arquivos de configuração ou utilize as variáveis CSS/Tailwind definidas aqui.

**Arquivos Alvo:**

1. `src/config/brand.ts` (Cores hexadecimais corretas e URLs finais)
2. `src/styles/fonts.css` (URLs self-hosted corrigidas)
3. `src/styles/globals.css` (Novos Clamps matemáticos e classes utilitárias)
4. `src/config/navigation.ts` (Estrutura de links revisada)
5. `src/config/content.ts` (Adaptação para a nova arquitetura)

---

## Passo 1: Configuração de Marca (`src/config/brand.ts`)

Centralização da Paleta de Cores (Design System 2.1) e Assets (2.6).

```typescript
export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Paleta de Cores (Design System 2.1)
  colors: {
    bluePrimary: '#0048ff', // CTAs, links, interativos
    blueAccent: '#4fe6ff', // Destaques secundários, brilhos
    purpleDetails: '#8705f2', // Pequenos detalhes
    pinkDetails: '#f501d3', // Ênfases pontuais

    background: '#040013', // Fundo escuro principal
    backgroundLight: '#f0f0f0', // Seções claras

    text: '#fcffff', // Texto principal (dark mode)
    textInverse: '#0e0e0e', // Texto em fundos claros
    textEmphasis: '#2E85F2', // Palavras destacadas
    textHighlight: '#4fe6ff', // Destaques curtos
    textSecondary: '#a1a3a3', // Infos secundárias

    neutral: '#0b0d3a', // Gradientes sutis
    neutralLight: '#F5F5F5', // Fundos secundários
  },

  // Assets Globais (2.6 Global Assets)
  assets: {
    logos: {
   Favicon  - Aba do navegador (tab): `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/Faivcon.svg`
Favicon Light - Aba do navegador (tab): `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/FaivconLight.svg`
Logo Light (full - Usar no header): `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg`
Logo Dark (full - Usar no header): `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg`
    },
    video: {
      manifesto:
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
    },
    fonts: {
      primary: 'TT Norms Pro',
      mono: 'PPSupplyMono',
    },
  },
};
```

---

## Passo 1.1: Configuração de Fontes (`src/styles/fonts.css`)

URLs atualizadas conforme documentação 2.7.

```css
/* TT Norms Pro - Primary Font */
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Thin.woff2')
    format('woff2');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Light.woff2')
    format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Regular.woff2')
    format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Medium.woff2')
    format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2')
    format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Black.woff2')
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

Atualizado com os valores exatos de `clamp()` fornecidos na tabela de Tipografia (2.2).

```css
@import './fonts.css';

:root {
  /* Tipografia Fluida (Mobile -> Desktop) */
  /* Valores exatos do Design System 2.2 */
  --font-display: clamp(2.5rem, 5vw, 4.5rem); /* 40px -> 72px */
  --font-h1: clamp(2rem, 4vw, 3.5rem); /* 32px -> 56px */
  --font-h2: clamp(1.5rem, 3vw, 2.5rem); /* 24px -> 40px */
  --font-h3: clamp(1.25rem, 2vw, 1.75rem); /* 20px -> 28px */
  --font-body: clamp(1rem, 1.2vw, 1.125rem); /* 16px -> 18px */

  --font-small: 0.875rem; /* 14px */
  --font-micro: 0.75rem; /* 12px */

  /* Espaçamento Global */
  --container-padding: clamp(24px, 5vw, 96px);
}

body {
  font-family: 'TT Norms Pro', ui-sans-serif, system-ui, sans-serif;
  background-color: #040013; /* BRAND.colors.background */
  color: #fcffff; /* BRAND.colors.text */
  -webkit-font-smoothing: antialiased;
}

/* Utilitários de Tipografia baseados nos Tokens */
.text-display {
  font-size: var(--font-display);
  font-weight: 900; /* Black */
  line-height: 1.1;
}
.text-h1 {
  font-size: var(--font-h1);
  font-weight: 700; /* Bold */
  line-height: 1.1;
}
.text-h2 {
  font-size: var(--font-h2);
  font-weight: 700; /* Bold */
  line-height: 1.15;
}
.text-h3 {
  font-size: var(--font-h3);
  font-weight: 500; /* Medium */
  line-height: 1.2;
}
.text-body {
  font-size: var(--font-body);
  font-weight: 400; /* Regular */
  line-height: 1.5;
}
.text-micro {
  font-family: 'PPSupplyMono', monospace;
  font-size: var(--font-micro);
  line-height: 1.4;
}
```

---

## Passo 2: Configuração de Navegação (`src/config/navigation.ts`)

Estrutura alinhada com "3.1 Information Architecture" e "3.2 Navigation Structure".

```typescript
export const SOCIALS = {
  instagram: 'https://instagram.com/danilo_novais',
  facebook: 'https://facebook.com/danilonovaisvilela',
  linkedin: 'https://linkedin.com/in/danilonovais',
  twitter: 'https://twitter.com/danilo_novais',
  emailPrimary: 'mailto:danilo@portfoliodanilo.com',
};

export const NAVIGATION = {
  header: [
    { label: 'home', href: '/' }, // ou #hero se estiver na home
    { label: 'sobre', href: '/sobre' },
    { label: 'portfólio', href: '/portfolio' },
    { label: 'contato', href: '#contact' }, // Always anchor
  ],
  footer: {
    copyright: '© 2025 Danilo Novais Vilela — todos os direitos reservados.',
    links: [
      { label: 'home', href: '/' },
      { label: 'sobre', href: '/sobre' },
      { label: 'portfólio', href: '/portfolio' },
      { label: 'contato', href: '#contact' },
    ],
  },
};
```

---

## Passo 3: Conteúdo e Assets Dinâmicos (`src/config/content.ts`)

Atualizado para gerar as URLs dos 12 logos de clientes automaticamente e refletir a estrutura "Showcase".

```typescript
export const HOME_CONTENT = {
  hero: {
    title: ['Você não vê o design.'],
    subtitle: '[Mas ele vê você.]',
    cta: 'step inside →',
  },

  showcase: {
    title: 'portfólio showcase',
    cta: { label: 'vamos trabalhar juntos', href: '/portfolio' },
    categories: [
      { id: 'brand-campaigns', label: 'Brand & Campaigns' },
      { id: 'videos-motions', label: 'Videos & Motions' },
      { id: 'websites-tech', label: 'Web Campaigns, Websites & Tech' },
    ],
  },

  clients: {
    title: 'marcas com as quais já trabalhei',
    // Gerador de URLs para os 12 SVGs monocromáticos
    logos: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/client-logos/client${i + 1}.svg`,
      alt: `Client Logo ${i + 1}`,
    })),
  },

  contact: {
    title: 'contato',
    subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
  },
};
```

---

## Passo 4: Atualização da Ordem das Seções

Conforme solicitado nos dados verdadeiros, certifique-se de que seus componentes de página (`page.tsx`) sigam esta ordem exata:

### A. Home Page (`/`)

1. **Header** (Navegação persistente)
2. **Hero + Manifesto Video** (Impacto emocional)
3. **Portfolio Showcase** (3 categorias com ritmo editorial)
4. **Featured Projects** (4 trabalhos em destaque/bento grid)
5. **Clients/Brands** (Grid de 12 logos)
6. **Contact** (Formulário + Info)
7. **Footer**

### B. Sobre (`/sobre`)

1. **Header**
2. **About Hero** (Video Loop)
3. **About Origin**
4. **About What I Do**
5. **About Method**
6. **About Beliefs**
7. **About Closing**
8. **Clients / Brands**
9. **Contact**
10. **Footer**

### C. Página Portfólio (`/portfolio`)

Esta página possui uma arquitetura específica focada em imersão visual e navegação fluida ("Parallax Lerp"). O estado do modal deve ser gerenciado globalmente ou via contexto para garantir que o `AnimatePresence` funcione corretamente ao sair.

**Hierarquia de Componentes:**

```mermaid
graph TD
    Page[Page: /portfolio] --> Hero[Hero Section]
    Page --> Gallery[Projects Gallery]
    Page --> Clients[Clients / Brands]
    Page --> Contact[Contact]
    Page --> Footer[Footer]
    Page --> Modal[Portfolio Modal]

    Hero --> H_Video[Video Loop Background]
    Hero --> H_Overlay[Overlay Gradient]
    Hero --> H_Title[Título: 'portfólio showcase']
    Hero --> H_CTA[CTA: 'vamos trabalhar juntos']

    Gallery --> G_Container[Gallery Container (Fixed)]
    G_Container --> G_Track[Gallery Track (Animated)]
    G_Track --> G_Card[ProjectCard[]]
    G_Card --> G_Wrapper[Card Image Wrapper (Parallax Interno)]

    Modal --> M_Backdrop[Backdrop (Blur/Darken)]
    Modal --> M_Container[Modal Container]
    M_Container --> M_Close[Close Button]
    M_Container --> M_Content[Project Content (Tipo A ou B)]
    M_Content --> MC_Media[Main Media]
    M_Content --> MC_Title[Project Title]
    M_Content --> MC_Meta[Project Meta]
    M_Content --> MC_Sec[Secondary Content (Galeria/Texto)]

```

**Detalhamento Técnico da Implementação:**

1. **Hero Section:**

- **Background:** Vídeo em _loop_ (mudo, _playsinline_).
- **Overlay:** Gradiente sutil para garantir legibilidade do título "portfólio showcase".

2. **Projects Gallery (Core Interaction):**

- **Mecanismo:** Scroll horizontal transformado em movimento vertical (ou vice-versa) usando `useScroll` e `useTransform` do Framer Motion.
- **Parallax Lerp:** A "Gallery Track" se move em uma velocidade diferente do scroll da página, e as imagens dentro dos "ProjectCard" têm um parallax interno adicional para profundidade.

3. **Portfolio Modal (Interatividade):**

- **Trigger:** Clicar em um `ProjectCard` abre o modal sem navegar para outra rota (interceptação de rota ou estado local), mantendo o contexto da galeria ao fundo.
- **AnimatePresence:** Essencial

## Próximo Passo Sugerido

## ANALISAR E CORRIGIR E/GERAR O arquivo **`tailwind.config.ts`** completo, integrando essas variáveis (cores e clamps) para que você possa usar classes como `bg-background` ou `text-bluePrimary`

## Passo 5: Execução da Refatoração

1. **Criar/Atualizar Arquivos:** Copie o conteúdo acima para os respectivos arquivos em `src/config/` e `src/styles/`.
2. **Tailwind Config:** Atualize `tailwind.config.ts` para usar `BRAND.colors` e `BRAND.typography` como fonte da verdade.
3. **Cleanup:** Faça um _grep search_ no projeto por strings hardcoded antigas (ex: "faivcon", URLs antigas, cores hexadecimais solta

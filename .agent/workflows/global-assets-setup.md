---
description: # Workflow: Configuração e Correção de Assets Globais  **Contexto:** Centralizar a "Fonte da Verdade" do projeto. O conteúdo textual, links, URLs de imagens e configurações de terceiros (Supabase, FormSubmit) não devem estar espalhados em componentes
---

# Workflow: Configuração e Correção de Assets Globais

**Contexto:**
Centralizar a "Fonte da Verdade" do projeto. O conteúdo textual, links, URLs de imagens e configurações de terceiros (Supabase, FormSubmit) não devem estar espalhados em componentes UI, mas sim importados de arquivos de configuração.

**Agente Responsável:** @TechLead
**Arquivos Alvo:** `src/config/brand.ts`, `src/config/navigation.ts`, `src/config/content.ts`

---

## Passo 1: Configuração de Marca e Assets (`src/config/brand.ts`)

Crie ou atualize este arquivo exportando as constantes de assets visuais.

```typescript
export const BRAND = {
  name: "Danilo Novais",
  typography: "TT Norms Pro",
  logos: {
    light: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg)",
    dark: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg)",
    favicon: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg)",
  },
  video: {
    manifesto: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4)", // Usado na Hero e Manifesto
  }

Passo 2: Configuração de Navegação e Contato (src/config/navigation.ts)
Centralize links, redes sociais e rodapé.

export const SOCIALS = {
  instagram: "[https://instagram.com/danilo_novais](https://instagram.com/danilo_novais)",
  facebook: "[https://facebook.com/danilonovaisvilela](https://facebook.com/danilonovaisvilela)",
  linkedin: "[https://linkedin.com/in/danilonovais](https://linkedin.com/in/danilonovais)",
  twitter: "[https://twitter.com/danilo_novais](https://twitter.com/danilo_novais)",
  emailPrimary: "dannovaisv@gmail.com",
  emailSecondary: "danilo@portfoliodanilo.com",
  phone: "+5511983966838",
};

export const CONTACT_FORM = {
  action: "[https://formsubmit.co/danilo@portfoliodanilo.com](https://formsubmit.co/danilo@portfoliodanilo.com)",
};

export const FOOTER = {
  copyright: "© 2025 Danilo Novais Vilela — todos os direitos reservados.",
  links: [
    { label: "home", href: "#hero" },
    { label: "portfólio showcase", href: "#portfolio-showcase" },
    { label: "sobre", href: "/sobre" }, // Preferência por rota dedicada
    { label: "contato", href: "#contact" },
  ]
};

Passo 3: Dados de Conteúdo e Projetos (src/config/content.ts)
Estruture os dados da Home Page para alimentar os componentes.

export const HOME_CONTENT = {
  hero: {
    tag: "[BRAND AWARENESS]",
    title: ["Design, não é", "só estética."],
    subtitle: "[É intenção, é estratégia, é experiência.]",
    cta: "get to know me better →",
  },
  showcase: {
    title: "portfólio showcase",
    categories: [
      { id: "brand-campaigns", label: "Brand & Campaigns", thumb: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp)" },
      { id: "videos-motions", label: "Videos & Motions", thumb: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif)" },
      { id: "websites-webcampaigns-tech", label: "Web Campaigns, Websites & Tech", thumb: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp)" },
    ]
  },
  featuredProjects: [
    { slug: "magic-radio-branding", title: "Magic — devolvendo a magia ao rádio", category: "branding & campanha", client: "Magic", year: 2023, img: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp)" },
    { slug: "branding-project-01", title: "Uma marca ousada e consistente", category: "branding", client: "Cliente confidencial", year: 2022, img: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp)" },
    { slug: "key-visual-campaign", title: "Key visual para campanha sazonal", category: "campanha", client: "Cliente confidencial", year: 2021, img: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp)" },
    { slug: "webdesigner-motion", title: "Experiência web em movimento", category: "web & motion", client: "Cliente confidencial", year: 2023, img: "[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif)" },
  ],
  clients: [
    // Gerar array de 1 a 12 usando base URL:
    // [https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client){N}.svg
  ]
};

Passo 4: Execução
Crie os arquivos acima.

Varra os componentes Hero.tsx, Footer.tsx, Contact.tsx e substitua strings soltas pelos imports destes arquivos.

Valide se todas as imagens carregam corretamente.
}
```

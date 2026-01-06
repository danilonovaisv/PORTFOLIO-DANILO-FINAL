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

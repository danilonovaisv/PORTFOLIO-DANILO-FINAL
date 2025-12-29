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
    subtitle: 'Vamos construir algo grande juntos?',
  },
};

export const PORTFOLIO_MOSAIC_DATA = [
  {
    id: 'row-1',
    columns: 2 as const,
    items: [
      {
        id: 'magic-brand',
        imageSrc:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
        gradient: 'linear-gradient(to bottom right, #0057FF, #001f5c)',
        title: 'Magic Radio',
        subtitle: 'Branding & Identity',
        aspectRatio: 1.3,
      },
      {
        id: 'nestle-promo',
        imageSrc:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
        gradient: 'linear-gradient(to bottom right, #FF3366, #5c001f)',
        title: 'Nestlé Promo',
        subtitle: 'Key Visual & Campaign',
        aspectRatio: 1.3,
      },
    ],
  },
  {
    id: 'row-2',
    columns: 1 as const,
    items: [
      {
        id: 'tech-web',
        imageSrc:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
        gradient: 'linear-gradient(to right, #1a1a1a, #333333)',
        title: 'Web Experience Motion',
        subtitle: 'Interactive Design & Development',
        aspectRatio: 2.4, // ultra wide
      },
    ],
  },
  {
    id: 'row-3',
    columns: 2 as const,
    items: [
      {
        id: 'branding-confidential',
        imageSrc:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
        gradient: 'linear-gradient(to top right, #333, #000)',
        title: 'Confidential Client',
        subtitle: 'Corporate Branding',
        aspectRatio: 1,
      },
      {
        id: 'campaign-visuals',
        imageSrc:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
        gradient: 'linear-gradient(to bottom left, #0057FF, #000)',
        title: 'Campaign Visuals',
        subtitle: 'Art Direction',
        aspectRatio: 1,
      },
    ],
  },
];

export const ABOUT_CONTENT = {
  hero: {
    title: 'More than pixels, logic_.',
    subtitle: 'Danilo Novais — Creative Developer',
    description:
      'Combinando excelência técnica com visão artística para criar experiências digitais que se parecem vivas.',
  },
  bio: [
    'Sou um Creative Developer brasileiro, obcecado pela intersecção entre Design e Tecnologia.',
    'Com background em ambas as áreas, eu crio a ponte entre o design estático e a realidade interativa, usando código como minha ferramenta primária de expressão.',
    'Acredito que a web não deve ser apenas funcional, mas memorável. Cada scroll, click e transição é uma oportunidade de contar uma história.',
  ],
  stats: [
    { label: 'Anos Exp.', value: '5+' },
    { label: 'Projetos', value: '40+' },
    { label: 'Prêmios', value: '12' },
  ],
};

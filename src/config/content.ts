export const HOME_CONTENT = {
  hero: {
    tag: '[BRAND AWARENESS]',
    title: ['Você não vê o', 'design.'],
    subtitle: 'Mas ele vê você.',
    cta: 'step inside →',
    scrollHint: '#manifesto',
  },

  showcase: {
    title: 'portfólio showcase',
    cta: { label: 'VEJA MAIS →', href: '/portfolio' },
    categories: [
      {
        id: 'brand-campaigns',
        label: 'Brand & Campaigns',
        align: 'end',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      },
      {
        id: 'videos-motion',
        label: 'Videos & Motions',
        align: 'center',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/y2mate.com%20-%20promoao_ta_podendo_nestle_ta_de_volta__wanzLKTQOE_1080p.mp4',
      },
      {
        id: 'websites-tech',
        label: 'Web Campaigns,\nWebsites & Tech',
        labelMobile: 'Websites & Tech',
        align: 'start',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
      },
    ],
  },

  featuredProjects: [
    {
      id: 1,
      slug: 'magic-radio-branding',
      title: 'Magic — devolvendo a magia ao rádio',
      category: 'branding & campanha',
      client: 'Magic',
      year: 2023,
      tags: ['Branding', 'Strategy', 'Campaign'],
      image:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/converted-(10).webp',
      layout: {
        h: 'h-[340px] md:h-[500px]',
        cols: 'md:col-span-5',
        sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 44vw, 36vw',
      },
    },
    {
      id: 2,
      slug: 'branding-project-01',
      title: 'Uma marca ousada e consistente',
      category: 'branding',
      client: 'Cliente confidencial',
      year: 2022,
      tags: ['Branding', 'Identity'],
      image:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/converted-(4).webp',
      layout: {
        h: 'h-[340px] md:h-[500px]',
        cols: 'md:col-span-7',
        sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 56vw, 58vw',
      },
    },
    {
      id: 3,
      slug: 'key-visual-campaign',
      title: 'Key visual para campanha sazonal',
      category: 'campanha',
      client: 'Cliente confidencial',
      year: 2021,
      tags: ['Campaign', 'Print', 'Art Direction'],
      image:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/converted-(5).webp',
      layout: {
        h: 'h-[340px] md:h-[600px]',
        cols: 'md:col-span-12',
        sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 94vw, 100vw',
      },
    },
    {
      id: 4,
      slug: 'webdesigner-motion',
      title: 'Experiência web em movimento',
      category: 'web & motion',
      client: 'Cliente confidencial',
      year: 2023,
      tags: ['Web', 'Motion', 'UX'],
      image:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEOMANIFESTOGLAD_2.mp4',
      layout: {
        h: 'h-[280px] md:h-[400px]',
        cols: 'md:col-span-8',
        sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 68vw, 64vw',
      },
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
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/converted.webp',
        gradient: 'linear-gradient(to bottom right, #0057FF, #001f5c)',
        title: 'Magic Radio',
        subtitle: 'Branding & Identity',
        aspectRatio: 1.3,
      },
      {
        id: 'nestle-promo',
        imageSrc:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/converted-(9).webp',
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
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/converted-(4).webp',
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
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/converted.webp',
        gradient: 'linear-gradient(to top right, #333, #000)',
        title: 'Confidential Client',
        subtitle: 'Corporate Branding',
        aspectRatio: 1,
      },
      {
        id: 'campaign-visuals',
        imageSrc:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/converted-(10).webp',
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
    videos: {
      desktop:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4',
      mobile:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4',
    },
    title: {
      line1: 'Sou Danilo Novais.',
      line2: 'Você não vê tudo o que eu faço.',
      line3: 'Mas sente quando funciona.',
    },
    description: [
      'Crio design que observa, entende',
      'e guia experiências com intenção,',
      'estratégia e tecnologia — na medida certa.',
    ],
  },
  method: {
    video:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/VideoAboutMethod.mp4',
    title: {
      text: 'Criatividade com método.',
      highlight: 'método.',
    },
    intro: [
      'Antes da estética, existe intenção.',
      'Antes do layout, existe lógica.',
      'Antes do impacto, existe silêncio.',
    ],
    steps: [
      'Briefings bem construídos para decisões claras',
      'Estratégia como base de qualquer criação',
      'Design com propósito, não só beleza',
      'Revisões inteligentes, sem ruído desnecessário',
      'IA e automações para escalar com qualidade',
      'Métricas criativas: engajamento, retenção e resultado',
    ],
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
  origin: {
    sectionLabel: 'Origem',
    // Estrutura intercalada: Frase → Imagem → Frase → Imagem
    // highlight: palavra-chave para destaque ghost-accent (1-2 por frase)
    content: [
      {
        type: 'text' as const,
        text: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia.',
        highlight: 'ficava',
      },
      {
        type: 'image' as const,
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/photo.mp4',
        alt: 'Memória visual - foto pessoal',
        aspectRatio: 'aspect-[3/4]',
      },
      {
        type: 'text' as const,
        text: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros.',
        highlight: 'rastros',
      },
      {
        type: 'image' as const,
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/squetch.webp',
        alt: 'Desenho e rabiscos iniciais',
        aspectRatio: 'aspect-video',
      },
      {
        type: 'text' as const,
        text: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação.',
        highlight: 'transformação',
      },
      {
        type: 'image' as const,
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/design.webp',
        alt: 'Momento criativo',
        aspectRatio: 'aspect-square',
      },
      {
        type: 'text' as const,
        text: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação.',
        highlight: 'essência humana',
        isClosing: true,
      },
      {
        type: 'image' as const,
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/AI.mp4',
        alt: 'Inteligência Artificial e criação',
        aspectRatio: 'aspect-[4/5]',
      },
    ],
  },
};

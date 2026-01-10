export const HOME_CONTENT = {
  hero: {
    tag: '[BRAND AWARENESS]',
    // Desktop/Tablet: 2 linhas
    title: ['Você não vê', 'o design.'],
    // Mobile: 3 linhas
    titleMobile: ['Você não', 'vê o', 'design.'],
    subtitle: 'Mas ele vê você.',
    cta: 'step inside →',
    scrollHint: '#sobre',
  },

  showcase: {
    title: 'portfólio showcase',
    floatingLabel: '[what we love working on]',
    cta: { label: "let's build something great →", href: '/#contact' },
    categories: [
      {
        id: 'brand-campaigns',
        label: 'Brand & Campaigns',
        labelMobile: 'Brand & Campaigns',
        align: 'end',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      },
      {
        id: 'videos-motions',
        label: 'Videos & Motions',
        labelMobile: 'Videos & Motions',
        align: 'center',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      },
      {
        id: 'websites-webcampaigns-tech',
        label: 'Web Campaigns,\nWebsites & Tech',
        labelMobile: 'Web Campaigns, Websites & Tech',
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
      tags: ['Branding', 'Strategy', 'Visual Identity'],
      client: 'Magic',
      year: 2023,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
      layout: {
        h: 'h-[400px] md:h-[640px]',
        cols: 'md:col-span-5',
        sizes: '(max-width: 768px) 100vw, 66vw',
      },
    },
    {
      id: 2,
      slug: 'branding-project-01',
      title: 'Uma marca ousada e consistente',
      category: 'branding',
      tags: ['Design System', 'Logo Design'],
      client: 'Cliente confidencial',
      year: 2022,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      layout: {
        h: 'h-[400px] md:h-[640px]',
        cols: 'md:col-span-7',
        sizes: '(max-width: 768px) 100vw, 33vw',
      },
    },
    {
      id: 3,
      slug: 'key-visual-campaign',
      title: 'Key visual para campanha sazonal',
      category: 'campanha',
      tags: ['Art Direction', 'Advertising', 'Retouching'],
      client: 'Cliente confidencial',
      year: 2021,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
      layout: {
        h: 'h-[400px] md:h-[520px]',
        cols: 'md:col-span-12',
        sizes: '(max-width: 768px) 100vw, 42vw',
      },
    },
    {
      id: 4,
      slug: 'webdesigner-motion',
      title: 'Experiência web em movimento',
      category: 'web & motion',
      tags: ['Web Design', 'UI/UX', 'Animation'],
      client: 'Cliente confidencial',
      year: 2023,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      layout: {
        h: 'h-[400px] md:h-[520px]',
        cols: 'md:col-span-8',
        sizes: '(max-width: 768px) 100vw, 58vw',
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
    subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
  },
};

export const PORTFOLIO_CONTENT = {
  hero: {
    video: {
      desktop:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/video-heroPort.mp4',
      mobile:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/video-heroPort-mobile.mp4',
    },
    items: [
      {
        id: 'brand-identity',
        label: 'Brand Identity',
        image:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
      },
      {
        id: 'key-visual',
        label: 'Key Visual',
        image:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
      },
      {
        id: 'web-design',
        label: 'Web Design',
        image:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      },
      {
        id: 'motion-design',
        label: 'Motion Design',
        image:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/videos-motions-thumb.webp',
      },
    ],
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
  beliefs: [
    {
      text: 'Acredito no design que muda o dia de alguém. Não pelo choque — mas pela conexão.',
      highlight: 'conexão',
    },
    {
      text: 'Um vídeo que respira. Uma marca que se reconhece. Um detalhe que fica.',
      highlight: 'respira',
    },
    {
      text: 'Crio para gerar presença. Mesmo quando não estou ali. Mesmo quando ninguém percebe o esforço.',
      highlight: 'presença',
    },
    { text: 'Isso é ghost design.', highlight: 'ghost design' },
  ],
  closing: {
    text: [
      'Hoje sou Diretor de Criação, com mais de 10 anos de estrada.',
      'Já liderei marcas, agências, eventos e criei experiências para todos os canais.',
      'Agora, quero criar algo que permaneça — com você.',
    ],
    ctas: [
      { label: 'Fale comigo', href: '/contato' },
      { label: 'Download Curriculum', href: '/cv.pdf', external: true },
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
        text: 'Desde cedo, sempre prestei atenção no que ficava —\nnão só no que aparecia.',
        highlight: 'ficava',
      },
      {
        type: 'image' as const,
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp',
        alt: 'Memória visual - Danilo Novais',
        aspectRatio: 'aspect-square',
      },
      {
        type: 'text' as const,
        text: 'Rabiscos viraram ideias.\nIdeias viraram projetos.\nE os projetos começaram a deixar rastros.',
        highlight: 'rastros',
      },
      {
        type: 'image' as const,
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp',
        alt: 'Processo criativo e rabiscos',
        aspectRatio: 'aspect-square',
      },
      {
        type: 'text' as const,
        text: 'Foi ali que entendi:\ndesign não é enfeite.\nÉ ferramenta invisível de transformação.',
        highlight: 'transformação',
      },
      {
        type: 'image' as const,
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp',
        alt: 'Design como ferramenta',
        aspectRatio: 'aspect-square',
      },
      {
        type: 'text' as const,
        text: 'Estudei Comunicação, mergulhei no design, no branding\ne hoje uso inteligência artificial para expandir o alcance\nsem perder a essência humana da criação.',
        highlight: 'essência humana',
        isClosing: true,
      },
      {
        type: 'image' as const,
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp',
        alt: 'IA e essência humana',
        aspectRatio: 'aspect-square',
      },
    ],
  },
  whatIDo: {
    title: {
      line1: 'Do insight ao impacto.',
      line2: 'Mesmo quando você não percebe.',
    },
    items: [
      { id: 1, title: 'Direção criativa', description: 'que organiza o caos' },
      { id: 2, title: 'Design estratégico', description: 'que guia decisões' },
      { id: 3, title: 'Identidades', description: 'que permanecem na memória' },
      {
        id: 4,
        title: 'Campanhas',
        description: 'multicanais com lógica e emoção',
      },
      { id: 5, title: 'Branding', description: 'que não grita — mas marca' },
      {
        id: 6,
        title: 'Inteligência artificial',
        description: 'aplicada à criação e automação',
      },
      {
        id: 7,
        title: 'Liderança criativa',
        description: 'com visão e método',
      },
    ],
  },
};

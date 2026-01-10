export const HOME_CONTENT = {
  hero: {
    title: ['Você não vê o design.'],
    subtitle: '[Mas ele vê você.]',
    cta: 'step inside →',
  },

  showcase: {
    title: 'portfólio showcase',
    cta: { label: 'vamos trabalhar juntos', href: '/portfolio' },
    floatingLabel: 'select project',
    categories: [
      {
        id: 'brand-campaigns',
        titleDesktop: 'Brand &\nCampaigns',
        titleMobile: 'Brand & Campaigns',
        align: 'start',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      },
      {
        id: 'videos-motions',
        titleDesktop: 'Videos &\nMotions',
        titleMobile: 'Videos & Motions',
        align: 'center',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      },
      {
        id: 'websites-tech',
        titleDesktop: 'Websites &\nTech',
        titleMobile: 'Websites & Tech',
        align: 'end',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
      },
    ],
  },

  featuredProjects: [
    {
      id: 1,
      slug: 'brand-campaign-alpha',
      title: 'Alpha Campaign',
      client: 'Alpha Industries',
      category: 'Brand & Campaigns',
      year: 2024,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      tags: ['Strategy', 'Art Direction'],
      description: 'Uma campanha completa de reposicionamento de marca.',
      layout: {
        cols: 'md:col-span-6',
        h: 'min-h-[420px] md:min-h-[560px]',
        sizes: '(max-width: 768px) 100vw, 50vw',
      },
    },
    {
      id: 2,
      slug: 'motion-reel-2024',
      title: 'Motion Reel',
      client: 'Various Clients',
      category: 'Videos & Motions',
      year: 2024,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      tags: ['Motion Design', '3D'],
      description: 'Compilado de animações e motion graphics.',
      layout: {
        cols: 'md:col-span-6',
        h: 'min-h-[420px] md:min-h-[560px]',
        sizes: '(max-width: 768px) 100vw, 50vw',
      },
    },
    {
      id: 3,
      slug: 'tech-platform-beta',
      title: 'Beta Platform',
      client: 'Beta Tech',
      category: 'Websites & Tech',
      year: 2023,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
      tags: ['UX/UI', 'Development'],
      description: 'Plataforma digital imersiva para tech startup.',
      layout: {
        cols: 'md:col-span-12',
        h: 'min-h-[420px] md:min-h-[640px]',
        sizes: '100vw',
      },
    },
  ],

  clients: {
    title: 'marcas com as quais já trabalhei',
    // Gerador de URLs para os 12 SVGs monocromáticos
    logos: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client${i + 1}.svg`,
      alt: `Client Logo ${i + 1}`,
    })),
  },

  contact: {
    title: 'contato',
    subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
  },
};

export const ABOUT_CONTENT = {
  hero: {
    title: 'Sou Danilo Novais.',
    manifesto: [
      'Você não vê tudo',
      'o que eu faço. Mas',
      'sente quando',
      'funciona.',
    ],
    subtitle:
      'Crio design que observa, entende e guia experiências com intenção, estratégia e tecnologia — na medida certa.',
    keywords: ['Danilo Novais', 'não vê tudo', 'funciona'],
    videos: {
      desktop:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4',
      mobile:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4',
    },
  },
  origin: {
    title: 'Origem',
    blocks: [
      {
        type: 'block',
        id: 'A',
        title: 'O QUE PERMANECE',
        text: 'A essência das coisas sempre falou mais alto do que a superfície.',
        description:
          'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. Enquanto muitos olhavam para o brilho imediato, eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.',
        highlight: 'essência',
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp',
        alt: 'Detalhe arquitetônico minimalista',
        align: 'right',
      },
      {
        type: 'block',
        id: 'B',
        title: 'DO TRAÇO À INTENÇÃO',
        text: 'Aos poucos, aquilo que era instinto virou direção.',
        description:
          'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Com cada tentativa, aprendi a dar forma ao invisível.',
        highlight: 'instinto',
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp',
        alt: 'Processo criativo com skecthes',
        align: 'left',
      },
      {
        type: 'block',
        id: 'C',
        title: 'A DESCOBERTA DO INVISÍVEL',
        text: 'Design não é enfeite. É ferramenta invisível de transformação.',
        description:
          'Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem.',
        highlight: 'ferramenta invisível',
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp',
        alt: 'Design minimalista e tipografia',
        align: 'right',
      },
      {
        type: 'block',
        id: 'D',
        title: 'EXPANSÃO COM PROPÓSITO',
        text: 'O futuro pede novas ferramentas — e eu as abracei.',
        description:
          'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia.',
        highlight: 'novas ferramentas',
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp',
        alt: 'Tecnologia e arte digital',
        align: 'left',
      },
    ],
  },
  services: {
    title: {
      line1: 'Do insight ao impacto.',
      line2: 'Mesmo quando você não percebe.',
    },
    items: [
      {
        id: 1,
        text: 'Direção criativa que organiza o caos',
        highlight: 'Direção criativa',
      },
      {
        id: 2,
        text: 'Design estratégico que guia decisões',
        highlight: 'Design estratégico',
      },
      {
        id: 3,
        text: 'Identidades que permanecem na memória',
        highlight: 'Identidades',
      },
      {
        id: 4,
        text: 'Campanhas multicanais com lógica e emoção',
        highlight: 'Campanhas',
      },
      {
        id: 5,
        text: 'Branding que não grita — mas marca',
        highlight: 'Branding',
      },
      {
        id: 6,
        text: 'Inteligência artificial aplicada à criação e automação',
        highlight: 'Inteligência artificial',
      },
      {
        id: 7,
        text: 'Liderança criativa com visão e método',
        highlight: 'Liderança criativa',
      },
    ],
    marquee: [
      'DIREÇÃO CRIATIVA',
      'DESIGN ESTRATÉGICO',
      'IDENTIDADES',
      'CAMPANHAS',
      'BRANDING',
      'INTELIGÊNCIA ARTIFICIAL',
      'LIDERANÇA CRIATIVA',
    ],
  },
  method: {
    title: {
      line1: 'Criatividade com método.',
      line2: 'Impacto sem ruído.',
    },
    intro: [
      'Meu processo combina estrutura e fluidez.',
      'Para cada projeto, um caminho claro que transforma',
      'problemas complexos em soluções visuais elegantes e funcionais.',
    ],
    description: 'Meu processo combina estrutura e fluidez.',
    video:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4', // Ref placeholder
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
    { text: 'Um vídeo que respira.', highlight: 'respira.' },
    { text: 'Uma marca que se reconhece.', highlight: 'reconhece.' },
    { text: 'Um detalhe que fica.', highlight: 'fica.' },
    { text: 'Crio para gerar presença.', highlight: 'Crio' },
    { text: 'Mesmo quando não estou ali.', highlight: 'Mesmo' },
    { text: 'Mesmo quando ninguém percebe o esforço.', highlight: 'Mesmo' },
  ],
  closing: {
    ctas: [
      { href: '#contact', label: 'Fale comigo' },
      { href: '/cv.pdf', label: 'Download CV', external: true },
    ],
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
  },
};

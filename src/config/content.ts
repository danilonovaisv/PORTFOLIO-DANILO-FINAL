import { getAssetUrl } from '@/lib/utils';

const siteAsset = (path: string) => getAssetUrl(path);

export const HOME_CONTENT = {
  hero: {
    tag: '[BRAND AWARENESS]',
    // Otimizado: Array permite animação escalonada (stagger) linha a linha
    title: ['Você não vê o design.'],
    titleDesktop: ['Você não vê ', 'o design.'],
    titleMobile: ['Você não ', 'vê o ', 'design.'],
    subtitle: 'Mas ele vê você.',
    cta: 'step inside',
  },

  showcase: {
    title: 'portfólio showcase',
    floatingLabel: '[what we love working on]',
    cta: {
      label: 'let’s build something great →',
      href: '/#contact',
    },
    ctas: [
      { label: 'fale comigo', href: '#contact', variant: 'primary' },
      {
        label: 'baixar apresentação',
        href: '/cv-danilo-novais.pdf',
        variant: 'secondary',
        external: true,
      },
    ],
    categories: [
      {
        id: 'brand-campaigns',
        label: 'Brand & Campaigns',
        titleDesktop: 'Brand & Campaigns',
        // Otimizado: Quebra forçada para evitar viúva em mobile pequeno
        titleMobile: 'Brand\n& Campaigns',
        align: 'end',
        thumb: siteAsset('home/showcase/Branding-Project.webp'),
      },
      {
        id: 'videos-motions',
        label: 'Videos & Motions',
        titleDesktop: 'Videos & Motions',
        titleMobile: 'Videos\n& Motions',
        align: 'center',
        thumb: siteAsset('home/showcase/Key-Visual.webp'),
      },
      {
        id: 'web-tech',
        label: 'Web Campaigns, Websites & Tech',
        // Otimizado: Balanceamento visual para desktop
        titleDesktop: 'Web Campaigns,\nWebsites & Tech',
        // Otimizado: Quebra estratégica para mobile (3 linhas equilibradas)
        titleMobile: 'Web Campaigns, Websites\n& Tech',
        align: 'start',
        thumb: siteAsset('home/showcase/webdesigner-2.gif'),
      },
    ],
  },

  featuredProjects: [
    {
      id: 1,
      slug: 'key-vision',
      landingPageSlug: 'key-vision',
      title: 'Honda Civic — Key Visual & Campanha',
      category: 'Brand & Campaigns',
      client: 'Honda',
      year: 2024,
      tags: ['Key Visual', 'Art Direction', 'Campaign'],
      img: siteAsset(
        'portfolio-media/civic/key-visual/assets-do-projeto/cover-16x9/thumb-honda.c2d0c6ccb21001ea.webp'
      ),
      imgSquare: siteAsset(
        'portfolio-media/civic/key-visual/assets-do-projeto/cover-1x1/thumb-honda.c2d0c6ccb21001ea.webp'
      ),
      homeFeatured: {
        enabled: true,
        cardStyle: 'ANIMATED_BG_THUMB_OVERLAY_5' as const,
        logoPath:
          'portfolio-media/civic/key-visual/assets-do-projeto/home-featured-logo/logo-honda-a85702e811bf9bb0.b265753cbbc12865.webp',
      },
      layout: {
        // Otimizado: 'min-h' previne overflow de texto, 'aspect' mantém proporção visual
        h: 'min-h-[400px] md:h-[500px] aspect-[4/5] md:aspect-auto',
        cols: 'md:col-span-5',
        sizes: '(max-width: 1024px) 100vw, 42vw',
      },
    },
    {
      id: 2,
      slug: 'campanhas-digitais',
      landingPageSlug: 'campanhas-digitais',
      title: 'Nescafé Dolce Gusto — Ecossistema Digital',
      category: 'Brand & Campaigns',
      client: 'Nestlé Dolce Gusto',
      year: 2024,
      tags: ['Branding', 'Campaign', 'Key Visual'],
      img: siteAsset(
        'portfolio-media/dolce-gusto/campaign/assets-do-projeto/cover-16x9/thumb-dg-16-9.8ef92ed37a30b3b2.webp'
      ),
      imgSquare: siteAsset(
        'portfolio-media/dolce-gusto/campaign/assets-do-projeto/cover-1x1/thumb-dg-1-1.1e424f3b05e8f5a8.webp'
      ),
      layout: {
        h: 'min-h-[400px] md:h-[500px] aspect-[4/5] md:aspect-auto',
        cols: 'md:col-span-7',
        sizes: '(max-width: 1024px) 100vw, 58vw',
      },
    },
    {
      id: 3,
      slug: 'swift',
      landingPageSlug: 'swift',
      title: 'Swift — Campanha Sazonal & Motion',
      category: 'Videos & Motions',
      client: 'Swift',
      year: 2024,
      tags: ['Motion', 'Campaign', 'Art Direction'],
      img: siteAsset(
        'portfolio-media/swift/swift-kvs/assets-do-projeto/cover-16x9/thumb-swift-16-9.1507b4336165323f.mp4'
      ),
      imgSquare: siteAsset(
        'portfolio-media/swift/swift-kvs/assets-do-projeto/cover-1x1/thumb-swift-1-1.27eb9f106724b5fb.mp4'
      ),
      layout: {
        // Otimizado: Altura maior para destaque full-width
        h: 'min-h-[400px] md:h-[600px]',
        cols: 'md:col-span-12',
        sizes: '100vw',
      },
    },
    {
      id: 4,
      slug: 'conid',
      landingPageSlug: 'conid',
      title: 'Conib — Plataforma & Experiência Digital',
      category: 'Websites & Tech',
      client: 'Conib',
      year: 2024,
      tags: ['UX/UI', 'Web Design', 'Platform'],
      img: siteAsset(
        'portfolio-media/conib/website/assets-do-projeto/cover-16x9/thumb-16-9.12da695978c19ce4.webp'
      ),
      imgSquare: siteAsset(
        'portfolio-media/conib/website/assets-do-projeto/cover-1x1/thumb-1-1.e36c592987d0fd48.webp'
      ),
      layout: {
        h: 'min-h-[400px] md:h-[400px] aspect-video md:aspect-auto',
        cols: 'md:col-span-8',
        sizes: '(max-width: 1024px) 100vw, 66vw',
      },
    },
  ],

  clients: {
    title: 'marcas com as quais já trabalhei',
    logos: [
      'Swift',
      'Nestlé',
      'Nivea',
      'Ambev',
      'Zé Delivery',
      'Pernod Ricard',
      'Algar Telecom',
      'Mapfre',
      'AON',
      'O Boticário',
      'Grupo Iguatemi',
      'Unilever',
    ].map((brand, i) => ({
      id: i + 1,
      src: siteAsset(`clients/clients.strip.${i + 1}.svg`),
      alt: `Logo da marca ${brand}`,
    })),
  },

  contact: {
    title: 'contato',
    subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
  },
};

// CORREÇÃO APLICADA: Espaço adicionado entre 'export' e 'const'
export const ABOUT_CONTENT = {
  hero: {
    title: {
      text: 'Sou ',
      highlight: 'Danilo Novais. ',
    },
    manifesto: [
      {
        text: 'Você ',
        highlight: 'não vê tudo ',
        textEnd: 'o que eu faço. Mas sente',
      },
      { text: 'quando ', highlight: 'funciona.' },
    ],
    description: [
      'Crio designs que observam,\n',
      'entendem e guiam experiências com intenção,\n',
      'estratégia e tecnologia,\n na medida exata.',
    ],
    videos: {
      desktop: siteAsset('about/hero/about.hero.desktop_video.mp4'),
      mobile: siteAsset('about/hero/about.hero.mobile_video.mp4'),
    },
  },
  beliefsIntro: [
    { text: 'Acredito no ' },
    { text: 'design que muda o dia', highlight: true },
    { text: ' de alguém.', newLine: true }, // newLine mantido para controle visual
    { text: 'Não pelo choque, ' },
    { text: 'mas pela conexão.', highlight: true },
  ],
  intro: {
    origin:
      'Goiânia, 2012. O início foi em agências, mas a inquietude era maior.',
  },
  origin: {
    title: 'Origem',
    blocks: [
      {
        type: 'block',
        id: '1',
        title: 'O QUE PERMANECE',
        text: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. Enquanto muitos olhavam para o brilho imediato, eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo. A essência das coisas sempre falou mais alto do que a superfície.',
        description: '',
        src: 'https://assets.portfoliodanilo.com/site-assets/about/origin/origin2/cena-01.webp',
        alt: 'Observando os detalhes',
        align: 'right',
      },
      {
        type: 'block',
        id: '2',
        title: 'DO TRAÇO À INTENÇÃO',
        text: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
        description: '',
        src: 'https://assets.portfoliodanilo.com/site-assets/about/origin/origin2/cena-02.webp',
        alt: 'Processo criativo',
        align: 'left',
      },
      {
        type: 'block',
        id: '3',
        title: 'A DESCOBERTA DO INVISÍVEL',
        text: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
        description: '',
        src: 'https://assets.portfoliodanilo.com/site-assets/about/origin/origin2/cena-03.webp',
        alt: 'Design invisível',
        align: 'right',
      },
      {
        type: 'block',
        id: '4',
        title: 'EXPANSÃO COM PROPÓSITO',
        text: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
        description: '',
        src: 'https://assets.portfoliodanilo.com/site-assets/about/origin/origin2/cena-04.webp',
        alt: 'Expansão e tecnologia',
        align: 'left',
      },
    ],
  },
  whatIDo: {
    title: ['Do insight ao impacto.', 'Mesmo quando você não percebe.'],
    cards: [
      { id: '1', text: 'Direção criativa que organiza o caos' },
      { id: '2', text: 'Design estratégico que guia decisões' },
      { id: '3', text: 'Identidades que permanecem na memória' },
      { id: '4', text: 'Campanhas multicanais com lógica e emoção' },
      { id: '5', text: 'Branding que não grita, mas marca' },
      {
        id: '6',
        text: 'Inteligência Artificial aplicada à criação',
      },
      { id: '7', text: 'Liderança Criativa com visão e método' },
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
    title: ['Criatividade com método.', 'Impacto sem ruído.'],
    videos: {
      desktop: siteAsset('about/method/about.method.desktop_video.mp4'),
      mobile: siteAsset('about/method/about.method.mobile_video.mp4'),
    },
    intro: [
      'Antes da estética, existe intenção.',
      'Antes do layout, existe lógica.',
      'Antes do impacto, existe silêncio.',
    ],
    steps: [
      { id: '1', text: 'Briefings bem construídos para decisões claras' },
      { id: '2', text: 'Estratégia como base de qualquer criação' },
      { id: '3', text: 'Design com propósito, não só beleza' },
      { id: '4', text: 'Revisões inteligentes, sem ruído desnecessário' },
      { id: '5', text: 'IA e automações para escalar com qualidade' },
      {
        id: '6',
        text: 'Métricas criativas: engajamento, retenção e resultado',
      },
    ],
  },
  beliefs: [
    { text: 'Um vídeo que respira.', highlight: 'respira' },
    { text: 'Uma marca que se reconhece.', highlight: 'reconhece' },
    { text: 'Um detalhe que fica.', highlight: 'fica' },
    { text: 'Crio para gerar presença.', highlight: 'Crio' },
    { text: 'Mesmo quando não estou ali.', highlight: 'Mesmo' },
    { text: 'Mesmo quando ninguém percebe o esforço.', highlight: 'Mesmo' },
  ],
  // Bloco de Prova/Autoridade — âncora de credibilidade antes do Fechamento.
  // ⚠️ REAL CONTENT ONLY: métricas e depoimentos DEVEM ser dados reais.
  // Slots vazios não renderizam (nada de números/depoimentos inventados).
  // Logos vêm de HOME_CONTENT.clients.logos (reais, via Supabase).
  proof: {
    eyebrow: 'PROVA',
    title: ['Marcas que', 'confiaram no processo.'],
    metrics: [
      { value: '12+ anos', label: 'de liderança criativa' },
      { value: '+14 marcas', label: 'líderes atendidas' },
      { value: '+3.500', label: 'peças e campanhas/ano' },
    ] as Array<{ value: string; label: string }>,
    testimonials: [] as Array<{
      quote: string;
      author: string;
      role: string;
    }>,
  },
  closing: {
    title: 'Hoje sou Diretor de Criação, com mais de 12 anos de estrada.',
    text: [
      'Já liderei marcas, agências, eventos e criei experiências para todos os canais.',
      'Agora, quero criar algo que permaneça — com você.',
    ],
    ghostText: {
      prefix: 'ISSO É',
      main: 'GHOST DESIGN',
    },
    ctas: [
      { label: 'fale comigo', href: '#contact', variant: 'primary' },
      {
        label: 'baixar currículo',
        href: '/cv-danilo-novais.pdf',
        variant: 'secondary',
        external: true,
      },
    ],
  },
};

export const PORTFOLIO_CONTENT = {
  hero: {
    video: {
      desktop: '/site.assets/portfolio/portfolio.hero_desktop_video.mp4',
      mobile: '/site.assets/portfolio/portfolio.hero_mobile_video.mp4',
    },
  },
};

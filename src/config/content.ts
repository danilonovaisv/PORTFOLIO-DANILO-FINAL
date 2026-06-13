import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';

const siteAsset = (path: string) =>
  buildSupabaseStorageUrl('site-assets', path);

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
      slug: 'magic-radio-branding',
      title: 'Magic — devolvendo a magia ao rádio',
      category: 'branding & campanha',
      client: 'Magic',
      year: 2023,
      tags: ['Branding', 'Campaign'],
      img: siteAsset('projects/creative-direction/hero.webp'),
      layout: {
        // Otimizado: 'min-h' previne overflow de texto, 'aspect' mantém proporção visual
        h: 'min-h-[400px] md:h-[500px] aspect-[4/5] md:aspect-auto',
        cols: 'md:col-span-5',
        sizes: '(max-width: 1024px) 100vw, 42vw',
      },
    },
    {
      id: 2,
      slug: 'branding-project-01',
      title: 'Uma marca ousada e consistente',
      category: 'Branding',
      client: 'Cliente confidencial',
      year: 2022,
      tags: ['Strategy', 'Identity'],
      img: siteAsset('projects/campaign/cover.webp'),
      layout: {
        h: 'min-h-[400px] md:h-[500px] aspect-[4/5] md:aspect-auto',
        cols: 'md:col-span-7',
        sizes: '(max-width: 1024px) 100vw, 58vw',
      },
    },
    {
      id: 3,
      slug: 'key-visual-campaign',
      title: 'Key visual para campanha sazonal',
      category: 'Campanha',
      client: 'Cliente confidencial',
      year: 2021,
      tags: ['Art Direction'],
      img: siteAsset('projects/key-vision/gallery/converted-5-webp.webp'),
      layout: {
        // Otimizado: Altura maior para destaque full-width
        h: 'min-h-[400px] md:h-[600px]',
        cols: 'md:col-span-12',
        sizes: '100vw',
      },
    },
    {
      id: 4,
      slug: 'webdesigner-motion',
      title: 'Experiência web em movimento',
      category: 'Web & Motion',
      client: 'Cliente confidencial',
      year: 2023,
      tags: ['UX/UI', 'Animation'],
      img: siteAsset('projects/key_vision/hero.webp'),
      layout: {
        h: 'min-h-[400px] md:h-[400px] aspect-video md:aspect-auto',
        cols: 'md:col-span-8',
        sizes: '(max-width: 1024px) 100vw, 66vw',
      },
    },
  ],

  clients: {
    title: 'marcas com as quais já trabalhei',
    logos: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: siteAsset(`clients/clients.strip.${i + 1}.svg`),
      alt: `Logo do cliente ${i + 1}`, // Otimizado: Português para consistência
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
        src: siteAsset('about/origin/about.origin_image.1.webp'),
        alt: 'Observando os detalhes',
        align: 'right',
      },
      {
        type: 'block',
        id: '2',
        title: 'DO TRAÇO À INTENÇÃO',
        text: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
        description: '',
        src: siteAsset('about/origin/about.origin_image.2.webp'),
        alt: 'Processo criativo',
        align: 'left',
      },
      {
        type: 'block',
        id: '3',
        title: 'A DESCOBERTA DO INVISÍVEL',
        text: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
        description: '',
        src: siteAsset('about/origin/about.origin_image.3.webp'),
        alt: 'Design invisível',
        align: 'right',
      },
      {
        type: 'block',
        id: '4',
        title: 'EXPANSÃO COM PROPÓSITO',
        text: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
        description: '',
        src: siteAsset('about/origin/about.origin_image.4.webp'),
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
    metrics: [] as Array<{ value: string; label: string }>,
    testimonials: [] as Array<{
      quote: string;
      author: string;
      role: string;
    }>,
  },
  closing: {
    title: 'Hoje sou Diretor de Criação, com mais de 10 anos de estrada.',
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
        label: 'baixar apresentação',
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

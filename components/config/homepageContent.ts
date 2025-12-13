export interface HeroContent {
  tag: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTargetId: string;
}

export interface AboutContent {
  videoUrl: string;
}

export type PortfolioCategoryId =
  | 'brand-campaigns'
  | 'videos-motions'
  | 'websites-webcampaigns-tech';

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  label: string;
  thumbnailUrl?: string;
}

export interface PortfolioShowcaseContent {
  title: string;
  categories: PortfolioCategory[];
  finalCtaLabel: string;
  finalCtaHref: string;
}

export interface ProjectCard {
  slug: string;
  title: string;
  category: string;
  client?: string;
  year?: number;
  imageUrl: string;
}

export interface ClientsSectionContent {
  title: string;
  logos: string[];
}

export interface ContactFormConfig {
  action: string;
  buttonLabel: string;
}

export interface ContactContent {
  title: string;
  subtitle: string;
  form: ContactFormConfig;
  links: {
    phone: string;
    emailPrimary: string;
    emailSecondary: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    portfolio: string;
    twitter: string;
  };
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  copyright: string;
  links: FooterLink[];
}

export interface VideoManifestoContent {
  videoUrl: string;
}

export interface HomepageContent {
  hero: HeroContent;
  about: AboutContent;
  videoManifesto: VideoManifestoContent;
  portfolioShowcase: PortfolioShowcaseContent;
  projectCards: ProjectCard[];
  clients: ClientsSectionContent;
  contact: ContactContent;
  footer: FooterContent;
}

export const HOMEPAGE_CONTENT: HomepageContent = {
  hero: {
    tag: '[BRAND AWARENESS]',
    title: 'Design, não é só estética.',
    subtitle: '[É intenção, é estratégia, é experiência.]',
    ctaLabel: 'get to know me better →',
    ctaTargetId: 'about',
  },

  about: {
    videoUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  },

  videoManifesto: {
    videoUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  },

  portfolioShowcase: {
    title: 'portfólio showcase',
    categories: [
      {
        id: 'brand-campaigns',
        label: 'Brand & Campaigns',
        thumbnailUrl:
          'https://loandbehold.studio/app/uploads/2025/04/Magic-1.png',
      },
      {
        id: 'videos-motions',
        label: 'Videos & Motions',
        thumbnailUrl: 'https://loandbehold.studio/app/uploads/2025/04/Epic.png',
      },
      {
        id: 'websites-webcampaigns-tech',
        label: 'Websites, Web Campaigns & Tech',
        thumbnailUrl:
          'https://loandbehold.studio/app/uploads/2025/04/Unilever.png',
      },
    ],
    finalCtaLabel: 'VEJA MAIS →',
    finalCtaHref: '/portfolio',
  },

  projectCards: [
    {
      slug: 'magic-radio-branding',
      title: 'Bringing the Magic Back to Radio',
      category: 'branding',
      client: 'Magic',
      year: 2023,
      imageUrl:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    },
    {
      slug: 'branding-project-01',
      title: 'Shaping a Bold New Brand',
      category: 'branding',
      client: 'Client Name',
      year: 2022,
      imageUrl:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    },
    {
      slug: 'key-visual-campaign',
      title: 'Key Visual for Seasonal Campaign',
      category: 'campaign',
      client: 'Client Name',
      year: 2021,
      imageUrl:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    },
    {
      slug: 'webdesigner-motion',
      title: 'Web Experience in Motion',
      category: 'web/motion',
      client: 'Client Name',
      year: 2023,
      imageUrl:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    },
  ],

  clients: {
    title: 'Marcas com quem colaborei',
    logos: [
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg',
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg',
    ],
  },

  contact: {
    title: 'Entre em Contato',
    subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
    form: {
      action: 'https://formsubmit.co/danilo@portfoliodanilo.com',
      buttonLabel: 'Enviar Mensagem',
    },
    links: {
      phone: 'tel:+5511983966838',
      emailPrimary: 'mailto:dannovaisv@gmail.com',
      emailSecondary: 'mailto:danilo@portfoliodanilo.com',
      instagram: 'https://instagram.com/danilo_novais',
      facebook: 'https://facebook.com/danilonovaisvilela',
      linkedin: 'https://linkedin.com/in/danilonovais',
      portfolio: 'https://portfoliodanilo.com',
      twitter: 'https://twitter.com/danilo_novais',
    },
  },

  footer: {
    copyright: '© 2025 Danilo Novais Vilela — Todos os direitos reservados.',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'Sobre', href: '#Sobre' },
      { label: 'Portfolio', href: '#portfolio-showcase' },
      { label: 'Contact', href: '#contact' },
    ],
  },
};

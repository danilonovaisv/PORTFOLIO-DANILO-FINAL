import { BRAND } from '@/config/brand';

type BreadcrumbItem = {
  name: string;
  url: string;
};

type ProjectSchema = {
  title: string;
  description: string;
  image: string;
  client: string;
  category: string;
  year: number;
  url: string;
};

type JsonLdProps = {
  logoUrl?: string;
  pageType?: 'home' | 'about' | 'contact' | 'portfolio' | 'project';
  breadcrumbs?: BreadcrumbItem[];
  project?: ProjectSchema;
};

export default function JsonLd({
  logoUrl,
  pageType = 'home',
  breadcrumbs,
  project,
}: JsonLdProps) {
  const baseUrl = `https://${BRAND.domain}`;

  // Core Person Schema (sempre incluído)
  const personSchema = {
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: BRAND.name,
    url: baseUrl,
    email: 'contato@portfoliodanilo.com',
    image: logoUrl ?? BRAND.assets.logos.logoLight,
    jobTitle: 'Creative Developer & Designer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance / Independent',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    nationality: {
      '@type': 'Country',
      name: 'Brazil',
    },
    sameAs: [
      'https://github.com/danilonovaisv',
      'https://www.linkedin.com/in/danilonovaisv',
      'https://instagram.com/_novais',
      'https://x.com/_novais',
    ],
    description:
      'Creative Developer especializado em WebGL, React Three Fiber, Next.js e experiências digitais interativas premium.',
    knowsAbout: [
      'WebGL',
      'React Three Fiber',
      'Three.js',
      'GLSL Shaders',
      'Next.js',
      'TypeScript',
      'Motion Design',
      'Branding',
      'Creative Development',
      'Interactive Design',
      'Framer Motion',
      'GSAP',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Creative Developer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Brazil',
      },
      skills: 'WebGL, Three.js, React, Next.js, TypeScript, Motion Design',
    },
  };

  // Website Schema (sempre incluído)
  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: `${BRAND.name} | Creative Developer`,
    url: baseUrl,
    description:
      'Você não vê o design. Mas ele vê você. Portfólio de experiências digitais premium.',
    inLanguage: 'pt-BR',
    publisher: {
      '@id': `${baseUrl}/#person`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/portfolio?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Schemas condicionais por tipo de página
  const pageSchemas: Record<string, object> = {};

  // Portfolio Collection Page
  if (pageType === 'home' || pageType === 'portfolio') {
    pageSchemas.portfolio = {
      '@type': 'CollectionPage',
      '@id': `${baseUrl}/portfolio#collection`,
      name: 'Portfolio - Danilo Novais',
      description:
        'Seleção curada de projetos de Branding, Motion Design e Creative Development.',
      url: `${baseUrl}/portfolio`,
      isPartOf: {
        '@id': `${baseUrl}/#website`,
      },
      about: {
        '@id': `${baseUrl}/#person`,
      },
    };
  }

  // About/Profile Page
  if (pageType === 'about') {
    pageSchemas.profilePage = {
      '@type': 'ProfilePage',
      '@id': `${baseUrl}/sobre#profile`,
      name: 'Sobre | Danilo Novais',
      description: 'Trajetória, método e visão criativa de Danilo Novais.',
      url: `${baseUrl}/sobre`,
      mainEntity: {
        '@id': `${baseUrl}/#person`,
      },
    };
    pageSchemas.videoObject = {
      '@type': 'VideoObject',
      '@id': `${baseUrl}/sobre#video-manifesto`,
      name: 'Manifesto Danilo Novais',
      description:
        'Manifesto em vídeo com direção criativa e linguagem visual autoral.',
      thumbnailUrl: `${baseUrl}/opengraph-image`,
      uploadDate: '2025-01-01',
      contentUrl: BRAND.assets.video.manifesto,
      embedUrl: `${baseUrl}/sobre`,
    };
  }

  // Contact Page
  if (pageType === 'contact') {
    pageSchemas.contactPage = {
      '@type': 'ContactPage',
      '@id': `${baseUrl}/contato#contact`,
      name: 'Contato | Danilo Novais',
      description:
        'Entre em contato para projetos de branding, motion e experiências digitais.',
      url: `${baseUrl}/contato`,
      mainEntity: {
        '@id': `${baseUrl}/#person`,
      },
    };
  }

  if (pageType === 'home' || pageType === 'portfolio') {
    pageSchemas.videoObject = {
      '@type': 'VideoObject',
      '@id': `${baseUrl}/${pageType === 'home' ? '' : 'portfolio'}#video-manifesto`,
      name: 'Showreel Danilo Novais',
      description:
        'Showreel com projetos de branding, motion e experiências digitais.',
      thumbnailUrl: `${baseUrl}/opengraph-image`,
      uploadDate: '2025-01-01',
      contentUrl: BRAND.assets.video.manifesto,
      embedUrl: pageType === 'home' ? baseUrl : `${baseUrl}/portfolio`,
    };
  }

  // Project/Case Study (CreativeWork)
  if (pageType === 'project' && project) {
    pageSchemas.creativeWork = {
      '@type': 'CreativeWork',
      '@id': `${project.url}#project`,
      name: project.title,
      description: project.description,
      image: project.image,
      url: project.url,
      dateCreated: `${project.year}-01-01`,
      creator: {
        '@id': `${baseUrl}/#person`,
      },
      provider: {
        '@type': 'Organization',
        name: project.client,
      },
      genre: project.category,
      keywords: [project.category, 'Creative Development', 'Danilo Novais'],
    };
  }

  // Breadcrumb Schema (se fornecido)
  if (breadcrumbs && breadcrumbs.length > 0) {
    pageSchemas.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  const graph = [personSchema, websiteSchema, ...Object.values(pageSchemas)];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph,
        }),
      }}
    />
  );
}

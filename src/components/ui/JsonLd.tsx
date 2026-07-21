import { BRAND } from '@/config/brand';
import { toAbsoluteUrl } from '@/lib/seo';
import type { PortfolioProject } from '@/types/project';

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
  pageType?: 'home' | 'about' | 'contact' | 'portfolio' | 'project' | 'legal';
  breadcrumbs?: BreadcrumbItem[];
  project?: ProjectSchema;
  projects?: PortfolioProject[];
};

export default function JsonLd({
  logoUrl,
  pageType = 'home',
  breadcrumbs,
  project,
  projects,
}: JsonLdProps) {
  const baseUrl = `https://${BRAND.domain}`;
  const logo = toAbsoluteUrl(logoUrl ?? BRAND.assets.logos.logoLight, baseUrl);

  // Logo Image Object Schema to ensure structured data validation resolves '#logo'
  const logoImageSchema = {
    '@type': 'ImageObject',
    '@id': `${baseUrl}/#logo`,
    url: logo,
    caption: `${BRAND.name} Logo`,
  };

  // Organization Schema
  // NOTE: schema.org requires Organization.logo to be a URL string, not an ImageObject reference.
  // Using the absolute logo URL directly to pass JSON-LD validation.
  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: BRAND.name,
    url: baseUrl,
    foundingDate: '2015',
    areaServed: 'BR',
    // Must be a string URL — ImageObject @id reference fails schema.org validation
    logo: toAbsoluteUrl(logoUrl ?? BRAND.assets.logos.logoLight, baseUrl),
    image: toAbsoluteUrl(logoUrl ?? BRAND.assets.logos.logoLight, baseUrl),
    sameAs: [
      'https://github.com/danilonovaisv',
      'https://linkedin.com/in/danilonovais',
      'https://instagram.com/_novais',
      'https://x.com/_novais',
    ],
  };

  // Core Person Schema (sempre incluído)
  // NOTE: Person.image must be an absolute URL string per schema.org spec,
  // not an ImageObject @id reference, to pass validator checks.
  const personSchema = {
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: BRAND.name,
    url: baseUrl,
    email: 'contato@portfoliodanilo.com',
    // Must be absolute URL string — @id reference fails schema.org validation
    image: toAbsoluteUrl(logoUrl ?? BRAND.assets.logos.logoLight, baseUrl),
    jobTitle: 'Head de Criação & Diretor de Criação Sênior',
    worksFor: {
      '@id': `${baseUrl}/#organization`,
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
      'https://linkedin.com/in/danilonovais',
      'https://instagram.com/_novais',
      'https://x.com/_novais',
    ],
    description:
      'Head de Criação & Diretor de Criação Sênior especializado em branding, campanhas, vídeo, motion e soluções digitais que conectam design, movimento e tecnologia para transformar ideias em experiências visuais marcantes.',
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
      name: 'Head de Criação & Diretor de Criação Sênior',
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
    name: `${BRAND.name} | Head de Criação & Diretor de Criação Sênior`,
    url: baseUrl,
    description:
      'Você não vê o design. Mas ele vê você. Portfólio de experiências digitais premium.',
    inLanguage: 'pt-BR',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  };

  // Schemas condicionais por tipo de página
  const pageSchemas: Record<string, object> = {};

  // Portfolio Collection Page
  if (pageType === 'home' || pageType === 'portfolio') {
    pageSchemas.portfolio = {
      '@type': 'CollectionPage',
      '@id': `${baseUrl}/portfolio#collection`,
      name: `Portfolio | ${BRAND.name}`,
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
      name: `Sobre | ${BRAND.name}`,
      description: 'Trajetória, método e visão criativa de Danilo Novais.',
      url: `${baseUrl}/sobre`,
      dateModified: new Date().toISOString().split('T')[0],
      mainEntity: {
        '@id': `${baseUrl}/#person`,
      },
    };
    // VideoObject with duration for schema.org compliance (validator requires duration on VideoObject)
    pageSchemas.videoObject = {
      '@type': 'VideoObject',
      '@id': `${baseUrl}/sobre#video-manifesto`,
      name: 'Manifesto Danilo Novais',
      description:
        'Manifesto em vídeo com direção criativa e linguagem visual autoral.',
      thumbnailUrl: `${baseUrl}/opengraph-image`,
      uploadDate: '2025-01-01',
      duration: 'PT2M',
      contentUrl: BRAND.assets.video.manifesto,
      embedUrl: `${baseUrl}/sobre`,
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
    };
  }

  // Contact Page
  if (pageType === 'contact') {
    pageSchemas.contactPage = {
      '@type': 'ContactPage',
      '@id': `${baseUrl}/contato#contact`,
      name: `Contato | ${BRAND.name}`,
      description:
        'Entre em contato para projetos de branding, motion e experiências digitais.',
      url: `${baseUrl}/contato`,
      dateModified: new Date().toISOString().split('T')[0],
      mainEntity: {
        '@id': `${baseUrl}/#person`,
      },
    };
  }

  // VideoObject schema: required for pages that embed video (home, portfolio, portfolio categories)
  // Squirrel audit flags "Page has video but no VideoObject schema" without this.
  if (pageType === 'home' || pageType === 'portfolio') {
    const pageSlug = pageType === 'home' ? '' : 'portfolio';
    pageSchemas.videoObject = {
      '@type': 'VideoObject',
      '@id': `${baseUrl}/${pageSlug}#video-manifesto`,
      name: 'Showreel Danilo Novais',
      description:
        'Showreel com projetos de branding, motion e experiências digitais.',
      thumbnailUrl: `${baseUrl}/opengraph-image`,
      uploadDate: '2025-01-01',
      duration: 'PT2M',
      contentUrl: BRAND.assets.video.manifesto,
      embedUrl: pageType === 'home' ? baseUrl : `${baseUrl}/portfolio`,
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
    };

    // Adiciona esquemas de vídeo dinâmicos para cada projeto que contenha conteúdo de vídeo
    if (projects && projects.length > 0) {
      projects.forEach((proj) => {
        const isMotion = proj.category === 'motion';
        const hasVideo = !!proj.videoPreview || !!proj.thumbnailMedia;
        if (isMotion || hasVideo) {
          const rawVideoUrl =
            proj.videoPreview ||
            proj.thumbnailMedia ||
            BRAND.assets.video.manifesto;
          const videoUrl = toAbsoluteUrl(rawVideoUrl, baseUrl);
          pageSchemas[`video-${proj.id}`] = {
            '@type': 'VideoObject',
            '@id': `${baseUrl}/portfolio#video-${proj.slug}`,
            name: proj.title,
            description:
              proj.shortDescription ||
              proj.subtitle ||
              `Projeto de ${proj.displayCategory} por Danilo Novais.`,
            thumbnailUrl: toAbsoluteUrl(
              proj.image || BRAND.assets.logos.logoLight,
              baseUrl
            ),
            uploadDate: proj.year ? `${proj.year}-01-01` : '2025-01-01',
            duration: 'PT2M',
            contentUrl: videoUrl,
            embedUrl: `${baseUrl}/portfolio?project=${proj.slug}`,
            publisher: {
              '@id': `${baseUrl}/#organization`,
            },
          };
        }
      });
    }
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
        '@id': `${baseUrl}/#organization`,
      },
      genre: project.category,
      keywords: [project.category, 'Creative Development', 'Danilo Novais'],
    };
  }

  // Legal/Privacy Page
  if (pageType === 'legal') {
    pageSchemas.webPage = {
      '@type': 'WebPage',
      '@id': `${baseUrl}/privacidade#legal`,
      name: 'Política de Privacidade',
      description: 'Termos e políticas de privacidade.',
      url: `${baseUrl}/privacidade`,
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
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

  const graph = [
    logoImageSchema,
    organizationSchema,
    personSchema,
    websiteSchema,
    ...Object.values(pageSchemas),
  ];

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

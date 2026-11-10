import { HOME_CONTENT } from '@/config/content';
import type { PortfolioProject, ProjectCategory } from '@/types/project';
import { COLORS } from '@/config/colors';
import { getAssetUrl } from '@/lib/utils';

const FALLBACK_CATEGORY_MAP: Record<string, ProjectCategory> = {
    'branding & campanha': 'branding',
    branding: 'branding',
    campanha: 'branding',
    'brand & campaigns': 'branding',
    'web & motion': 'web',
    'web & digital': 'web',
    'websites & tech': 'web',
    'web campaigns, websites & tech': 'web',
    'motion & video': 'motion',
    'video & motion': 'motion',
    motion: 'motion',
    'videos & motions': 'motion',
};

type FallbackCatalogEntry = {
    id: number | string;
    slug: string;
    landingPageSlug?: string;
    title: string;
    category: string;
    client: string;
    year: number;
    tags: string[];
    img: string;
    imgSquare?: string;
    featuredOnHome?: boolean;
    homeFeatured?: {
        enabled: boolean;
        cardStyle: 'ANIMATED_BG_INVERTED_LOGO' | 'ANIMATED_BG_THUMB_OVERLAY_5';
        logoPath?: string;
    };
    layout?: {
        h?: string;
        cols?: string;
        sizes?: string;
        aspect?: string;
        aspectRatio?: string;
    };
};

const ADDITIONAL_PORTFOLIO_FALLBACKS: FallbackCatalogEntry[] = [
    {
        id: 5,
        slug: 'hellmanns-parcerias',
        title: "Hellmann's — Parcerias & Campanha",
        category: 'Brand & Campaigns',
        client: "Hellmann's",
        year: 2024,
        tags: ['Campaign', 'Key Visual', 'Brand'],
        img: getAssetUrl(
            'portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-16x9/thumb-hellmanns-16-9.d08e71a295035fae.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-1x1/thumb-hellmanns-1-1.04460c10601d0801.webp'
        ),
        featuredOnHome: true,
    },
    {
        id: 6,
        slug: 'ambev-bees',
        title: 'Ambev BEES — Plataforma B2B & Motion',
        category: 'Videos & Motions',
        client: 'Ambev BEES',
        year: 2024,
        tags: ['Motion', 'Digital Platform', 'Campaign'],
        img: getAssetUrl(
            'portfolio-media/bees/bees/assets-do-projeto/cover-16x9/thumb-ambev-16-9.4f0c04fa3464689a.mp4'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/bees/bees/assets-do-projeto/cover-1x1/thumb-ambev-1-1.71a6da2d91c10594.mp4'
        ),
        featuredOnHome: true,
    },
    {
        id: 7,
        slug: 'animale',
        landingPageSlug: 'animale',
        title: 'Animale — Fashion Film & Direção Criativa',
        category: 'Videos & Motions',
        client: 'Animale',
        year: 2024,
        tags: ['Motion', 'Fashion', 'Art Direction'],
        img: getAssetUrl(
            'portfolio-media/animale/animale/assets-do-projeto/cover-16x9/thumb-animale-16-9.a7b6875341232e0c.mp4'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/animale/animale/assets-do-projeto/cover-1x1/thumb-animale-1-1.54723c79bed30c41.mp4'
        ),
        featuredOnHome: true,
        homeFeatured: {
            enabled: true,
            cardStyle: 'ANIMATED_BG_THUMB_OVERLAY_5',
            logoPath:
                'portfolio-media/animale/animale/assets-do-projeto/home-featured-logo/animale-logo-2022.c955d61e52adfb46.png',
        },
    },
    {
        id: 8,
        slug: 'zevi-identidade-visual-branding-cafe-premium',
        landingPageSlug: 'zevi-identidade-visual-branding-cafe-premium',
        title: 'Zevi — Identidade Visual & Branding Café Premium',
        category: 'Brand & Campaigns',
        client: 'Zevi',
        year: 2024,
        tags: ['Branding', 'Packaging', 'Identity'],
        img: getAssetUrl(
            'portfolio-media/zevi/branding/assets-do-projeto/cover-16x9/thumb-16-9-2.8810c51054ecf8bd.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/zevi/branding/assets-do-projeto/cover-1x1/thumb-1-1-2.6bcd729356262bd9.webp'
        ),
        featuredOnHome: true,
    },
    {
        id: 9,
        slug: 'mercado-livre-ai-video-mp',
        title: 'Mercado Pago — AI Video & Campanha Digital',
        category: 'Videos & Motions',
        client: 'Mercado Pago',
        year: 2024,
        tags: ['AI Video', 'Motion', 'Campaign'],
        img: getAssetUrl(
            'portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/cover-16x9/thumb-mercado-pago-16-9.9a0285e1eb6eb784.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/cover-1x1/thumb-mercado-pago-1-1.1f603aece005b0c5.webp'
        ),
        featuredOnHome: false,
        homeFeatured: {
            enabled: false,
            cardStyle: 'ANIMATED_BG_THUMB_OVERLAY_5',
            logoPath:
                'portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/home-featured-logo/mp-logo.b35db998902eb999.png',
        },
    },
    {
        id: 10,
        slug: 'cbre',
        landingPageSlug: 'cbre',
        title: 'CBRE — Experiência Digital & Real Estate',
        category: 'Websites & Tech',
        client: 'CBRE',
        year: 2024,
        tags: ['Web Design', 'UX/UI', 'Corporate'],
        img: getAssetUrl(
            'portfolio-media/cbre/cbre/assets-do-projeto/cover-16x9/thumb-cbre-16-9.48ff5db28c951dd6.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/cbre/cbre/assets-do-projeto/cover-1x1/thumb-cbre-1-1.a697d3ba547adcee.webp'
        ),
        featuredOnHome: false,
    },
    {
        id: 11,
        slug: 'mapfre',
        landingPageSlug: 'mapfre',
        title: 'Fundación Mapfre — Ecossistema Institucional',
        category: 'Websites & Tech',
        client: 'Fundación Mapfre',
        year: 2024,
        tags: ['Websites & Tech', 'UX/UI', 'Digital'],
        img: getAssetUrl(
            'portfolio-media/fundaci-n-mapfre/mapfre/assets-do-projeto/cover-16x9/thumb-mapfre-16-9.4d1b6f477776d2f6.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/fundaci-n-mapfre/mapfre/assets-do-projeto/cover-1x1/thumb-mapfre-1-1.f84e44febddde052.webp'
        ),
        featuredOnHome: false,
    },
    {
        id: 12,
        slug: 'bidaya-parfums-scents-without-borders',
        landingPageSlug: 'bidaya-parfums-scents-without-borders',
        title: 'Bidaya Parfums — Scents Without Borders',
        category: 'Websites & Tech',
        client: 'Bidaya Parfums',
        year: 2024,
        tags: ['AI Direction', 'E-commerce', 'Luxury'],
        img: getAssetUrl(
            'portfolio-media/bidaya/ai-case/assets-do-projeto/cover-16x9/thumb-16-9.cae9e3d095a461ad.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/bidaya/ai-case/assets-do-projeto/cover-1x1/thumb-1-1.f0b1ec55504e7f86.webp'
        ),
        featuredOnHome: false,
    },
    {
        id: 13,
        slug: 'eudora',
        title: 'Eudora — Direção de Arte & Campanha',
        category: 'Brand & Campaigns',
        client: 'Eudora',
        year: 2023,
        tags: ['Brand', 'Beauty', 'Campaign'],
        img: getAssetUrl(
            'portfolio-media/eudora/eudora/assets-do-projeto/cover-16x9/thumb-16-9.0eb82e6304067ac5.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/eudora/eudora/assets-do-projeto/cover-1x1/thumb-1-1.5a12ad6b73a3c927.webp'
        ),
        featuredOnHome: false,
    },
    {
        id: 14,
        slug: 'nestle',
        landingPageSlug: 'nestle',
        title: 'Nestlé — Brand & Campaigns',
        category: 'Brand & Campaigns',
        client: 'Nestlé',
        year: 2024,
        tags: ['Brand', 'Campaign', 'Key Visual'],
        img: getAssetUrl(
            'portfolio-media/nestl/brand-campaigns/assets-do-projeto/cover-16x9/thumb-nestle-16-9.63a36567aa9ee520.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/nestl/brand-campaigns/assets-do-projeto/cover-1x1/thumb-nestle-1-1.0e1ef137fb2ceb32.webp'
        ),
        featuredOnHome: false,
    },
    {
        id: 15,
        slug: 'tcotton',
        landingPageSlug: 'tcotton',
        title: 'TCotton — Identidade Visual & Posicionamento',
        category: 'Brand & Campaigns',
        client: 'TCotton',
        year: 2024,
        tags: ['Branding', 'Identity', 'Fashion'],
        img: getAssetUrl(
            'portfolio-media/tcotton/tcotton/assets-do-projeto/cover-16x9/thumb-tcotton-16-9.9f1a032aa68f32ea.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/tcotton/tcotton/assets-do-projeto/cover-1x1/thumb-tcotton-1-1.8e66892a4c5d6807.webp'
        ),
        featuredOnHome: false,
    },
    {
        id: 16,
        slug: 'cartoon-network-packaging',
        title: 'Cartoon Network — Packaging & Licensing',
        category: 'Brand & Campaigns',
        client: 'Cartoon Network',
        year: 2023,
        tags: ['Packaging', 'Illustration', 'Branding'],
        img: getAssetUrl(
            'portfolio-media/cartoon-network/packing/assets-do-projeto/cover-16x9/thumb-16-9.4e7b48e091c2bfec.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/cartoon-network/packing/assets-do-projeto/cover-1x1/thumb-1-1.3715a95d534711b4.webp'
        ),
        featuredOnHome: false,
    },
    {
        id: 17,
        slug: 'dntro',
        landingPageSlug: 'dntro',
        title: 'DNTRO — Motion Design & Identidade Dinâmica',
        category: 'Videos & Motions',
        client: 'DNTRO',
        year: 2024,
        tags: ['Motion', 'Identity', 'Video'],
        img: getAssetUrl(
            'portfolio-media/dntro/dntro/assets-do-projeto/cover-16x9/thumb-16-9.11aff041d0e8a1ca.mp4'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/dntro/dntro/assets-do-projeto/cover-1x1/thumb-1-1.54f9cb8c351ac49d.mp4'
        ),
        featuredOnHome: false,
    },
    {
        id: 18,
        slug: 'glad',
        landingPageSlug: 'glad',
        title: 'Glad / Dow Química — Vídeo Manifesto',
        category: 'Videos & Motions',
        client: 'Glad',
        year: 2023,
        tags: ['Manifesto', 'Video', 'Campaign'],
        img: getAssetUrl(
            'portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-1x1/thumb-glad-1-1.ebbdf481eb783c7f.webp'
        ),
        featuredOnHome: false,
    },
    {
        id: 19,
        slug: 'swift-week',
        landingPageSlug: 'swift-week',
        title: 'Swift Week — Campanha Promocional & Motion',
        category: 'Videos & Motions',
        client: 'Swift',
        year: 2024,
        tags: ['Motion', 'Retail', 'Campaign'],
        img: getAssetUrl(
            'portfolio-media/swift/swift-week/assets-do-projeto/cover-16x9/thumb.5b0e14348c108da3.mp4'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/swift/swift-week/assets-do-projeto/cover-1x1/thumb.5b0e14348c108da3.mp4'
        ),
        featuredOnHome: false,
    },
    {
        id: 20,
        slug: 'ai-video',
        landingPageSlug: 'ai-video',
        title: 'AI Video — Exploração Criativa & GenAI',
        category: 'Videos & Motions',
        client: 'Ghost Lab',
        year: 2024,
        tags: ['AI Video', 'Creative Coding', 'Motion'],
        img: getAssetUrl(
            'portfolio-media/projeto-pessoal/ai-video/assets-do-projeto/cover-16x9/ai-thumb-16-9-compressed.59c39fd6662e48d1.mp4'
        ),
        imgSquare: getAssetUrl(
            'portfolio-media/projeto-pessoal/ai-video/assets-do-projeto/cover-1x1/ai-thumb-1-1-compressed.6ae532a6f68a3b42.mp4'
        ),
        featuredOnHome: false,
    },
];

export function mapFallbackCategory(label?: string): ProjectCategory {
    if (!label) return 'branding';
    const normalized = label.trim().toLowerCase();
    return FALLBACK_CATEGORY_MAP[normalized] ?? 'branding';
}

export function buildFallbackProjects(options?: {
    featuredOnHomeOnly?: boolean;
}): PortfolioProject[] {
    const baseEntries: FallbackCatalogEntry[] = [
        ...(HOME_CONTENT.featuredProjects ?? []).map((p) => ({
            ...p,
            featuredOnHome: true,
        })),
        ...ADDITIONAL_PORTFOLIO_FALLBACKS,
    ];

    const filteredEntries = options?.featuredOnHomeOnly
        ? baseEntries.filter((entry) => entry.featuredOnHome !== false)
        : baseEntries;

    return filteredEntries.map((project, index) => {
        const layout = project.layout ?? {};
        const category = mapFallbackCategory(project.category);
        const displayCategory =
            category === 'motion'
                ? 'Videos & Motions'
                : category === 'web'
                    ? 'Websites & Tech'
                    : 'Brand & Campaigns';

        const landingSlug = project.landingPageSlug;

        return {
            id: `fallback-${project.id ?? index}`,
            slug: project.slug ?? `fallback-${index}`,
            landingPageSlug: landingSlug,
            destination: landingSlug
                ? { type: 'internal_landing', landingSlug }
                : { type: 'modal' },
            title: project.title ?? 'Projeto de portfólio',
            subtitle: project.category,
            client: project.client ?? 'Cliente confidencial',
            category,
            displayCategory,
            tags: project.tags ?? [],
            year:
                typeof project.year === 'number'
                    ? project.year
                    : Number(project.year) || new Date().getFullYear(),
            image: project.img || '',
            imageLandscape: project.img || undefined,
            imageSquare: project.imgSquare ?? project.img ?? undefined,
            type: index < 4 ? 'A' : 'B',
            layout: {
                cols: layout.cols ?? 'md:col-span-4',
                height: layout.h ?? 'min-h-[320px]',
                aspectRatio: layout.aspect ?? layout.aspectRatio,
                sizes: layout.sizes,
            },
            detail: {
                description: project.title ?? 'Projeto de portfólio',
                highlights: project.tags,
            },
            accentColor:
                category === 'branding'
                    ? COLORS.bluePrimary
                    : undefined,
            featuredOnHome: project.featuredOnHome ?? true,
            homeFeatured: project.homeFeatured ?? {
                enabled: project.featuredOnHome ?? true,
                cardStyle: 'ANIMATED_BG_THUMB_OVERLAY_5',
            },
            featuredOnPortfolio: true,
        };
    });
}

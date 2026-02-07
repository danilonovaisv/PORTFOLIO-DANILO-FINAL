import { HOME_CONTENT } from '@/config/content';
import type { PortfolioProject, ProjectCategory } from '@/types/project';

const FALLBACK_CATEGORY_MAP: Record<string, ProjectCategory> = {
    'branding & campanha': 'branding',
    branding: 'branding',
    campanha: 'campanha',
    'web & motion': 'web',
    'web & digital': 'web',
    'motion & video': 'motion',
    'video & motion': 'motion',
    'motion': 'motion',
    'videos & motions': 'motion',
};

export function mapFallbackCategory(label?: string): ProjectCategory {
    if (!label) return 'branding';
    const normalized = label.trim().toLowerCase();
    return FALLBACK_CATEGORY_MAP[normalized] ?? 'branding';
}

export function buildFallbackProjects(): PortfolioProject[] {
    return (HOME_CONTENT.featuredProjects ?? []).map((project, index) => {
        const layout =
            (project.layout as {
                h?: string;
                cols?: string;
                sizes?: string;
                aspect?: string;
                aspectRatio?: string;
            }) ?? {};
        const category = mapFallbackCategory(project.category);

        return {
            id: `fallback-${project.id ?? index}`,
            slug: project.slug ?? `fallback-${index}`,
            title: project.title ?? 'Projeto de portfólio',
            subtitle: project.category,
            client: project.client ?? 'Cliente confidencial',
            category,
            displayCategory: project.category ?? 'Projeto',
            tags: project.tags ?? [],
            year:
                typeof project.year === 'number'
                    ? project.year
                    : Number(project.year) || new Date().getFullYear(),
            image: project.img || '',
            imageLandscape: project.img || undefined,
            imageSquare: project.img || undefined,
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
                    ? '#0057ff'
                    : category === 'campanha'
                        ? '#ff3366'
                        : undefined,
            featuredOnPortfolio: true,
        };
    });
}

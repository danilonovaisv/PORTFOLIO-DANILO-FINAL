import { getModalHeroMedia } from '@/components/portfolio/content/modal-media';
import type { PortfolioProject } from '@/types/project';

function buildProject(overrides: Partial<PortfolioProject> = {}): PortfolioProject {
  return {
    id: 'project-1',
    slug: 'project-1',
    title: 'Project 1',
    client: 'Client',
    category: 'branding',
    displayCategory: 'Brand & Campaigns',
    year: 2026,
    image: 'https://cdn.example.com/thumb.webp',
    imageLandscape: 'https://cdn.example.com/landscape.webp',
    imageSquare: 'https://cdn.example.com/square.webp',
    thumbnailMedia: 'https://cdn.example.com/thumb.webp',
    type: 'B',
    layout: {
      cols: 'lg:col-span-4',
      height: 'min-h-[320px]',
    },
    detail: {
      description: 'Descricao',
      gallery: ['https://cdn.example.com/gallery-1.webp'],
    },
    ...overrides,
  };
}

describe('getModalHeroMedia', () => {
  it('nao reutiliza a thumb quando ha midia interna de conteudo', () => {
    const project = buildProject();
    expect(getModalHeroMedia(project)).toBe(project.imageLandscape);
  });

  it('prioriza video real da galeria para projetos motion', () => {
    const project = buildProject({
      category: 'motion',
      detail: {
        description: 'Descricao',
        gallery: [
          'https://cdn.example.com/gallery-video.mp4',
          'https://cdn.example.com/gallery-1.webp',
        ],
      },
    });

    expect(getModalHeroMedia(project)).toBe(
      'https://cdn.example.com/gallery-video.mp4'
    );
  });

  it('usa a galeria como fallback quando nao ha variantes dedicadas', () => {
    const project = buildProject({
      image: 'https://cdn.example.com/thumb.webp',
      imageLandscape: undefined,
      imageSquare: undefined,
      detail: {
        description: 'Descricao',
        gallery: ['https://cdn.example.com/gallery-1.webp'],
      },
    });

    expect(getModalHeroMedia(project)).toBe(
      'https://cdn.example.com/gallery-1.webp'
    );
  });
});

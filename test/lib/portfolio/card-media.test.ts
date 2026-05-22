import {
  getCardMediaCandidates,
  resolveProjectMedia,
} from '@/lib/portfolio/card-media';
import type { PortfolioProject } from '@/types/project';

const baseProject: PortfolioProject = {
  id: 'media-test',
  slug: 'media-test',
  title: 'Media Test',
  category: 'web',
  displayCategory: 'Web',
  year: 2026,
  image: '/media/default.jpg',
  imageLandscape: '/media/landscape.jpg',
  imageSquare: '/media/square.jpg',
  type: 'B',
  layout: {
    cols: 'col-span-1',
    height: 'h-[400px]',
  },
};

describe('portfolio card media resolver', () => {
  it('preserves the legacy candidate order for string callers', () => {
    expect(getCardMediaCandidates(baseProject, 'landscape')).toEqual([
      '/media/landscape.jpg',
      '/media/square.jpg',
      '/media/default.jpg',
    ]);
  });

  it('resolves landscape image media with explicit metadata', () => {
    expect(resolveProjectMedia(baseProject, 'landscape', { alt: 'Alt text' })).toEqual({
      kind: 'image',
      src: '/media/landscape.jpg',
      format: 'landscape',
      fit: undefined,
      alt: 'Alt text',
    });
  });

  it('resolves square video media without changing its aspect contract', () => {
    const media = resolveProjectMedia(
      {
        ...baseProject,
        imageSquare: '/media/square-preview.mp4',
      },
      'square'
    );

    expect(media).toMatchObject({
      kind: 'video',
      src: '/media/square-preview.mp4',
      format: 'square',
    });
  });
});

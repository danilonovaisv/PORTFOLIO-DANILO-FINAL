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

  it('prioritizes HTML video code in thumbnailHtml over static image fallbacks', () => {
    const htmlCode = '<!DOCTYPE html><html><body><video src="honda.mp4" autoplay loop muted playsinline></video></body></html>';
    const media = resolveProjectMedia(
      {
        ...baseProject,
        thumbnailMedia: '/media/fallback-thumb.webp',
        thumbnailHtml: htmlCode,
      },
      'landscape'
    );

    expect(media).toEqual({
      kind: 'html',
      src: htmlCode,
      format: 'landscape',
      fit: undefined,
      alt: undefined,
    });
  });

  it('prioritizes HTML video snippet in imageLandscape cover over thumbnailMedia fallback', () => {
    const htmlSnippet = '<iframe src="https://player.vimeo.com/video/123456" allow="autoplay"></iframe>';
    const media = resolveProjectMedia(
      {
        ...baseProject,
        thumbnailMedia: '/media/honda-thumb.jpg',
        imageLandscape: htmlSnippet,
      },
      'landscape'
    );

    expect(media).toEqual({
      kind: 'html',
      src: htmlSnippet,
      format: 'landscape',
      fit: undefined,
      alt: undefined,
    });
  });
});

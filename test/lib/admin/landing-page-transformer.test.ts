import {
  sanitizeMasterV3BlockContent,
  stripMasterV3Draft,
  toMasterV3Draft,
} from '@/lib/admin/transformers/landing-page';
import { MASTER_PROJECT_TEMPLATE_V3 } from '@/types/project-template';

describe('landing-page V3 transformer', () => {
  it('normalizes missing block order when loading the editor draft', () => {
    const draft = toMasterV3Draft({
      schema_version: '3.0',
      template: MASTER_PROJECT_TEMPLATE_V3,
      project_slug: 'alpa-case',
      project_title: 'ALPA',
      project_tags: [],
      highlight_color: '#0048ff',
      gallery_grid: [
        {
          id: 'block-1',
          type: 'image',
          content: {
            media: 'media/cover.webp',
            alt: 'Cover',
          },
        },
        {
          id: 'block-2',
          type: 'video',
          order: 7,
          content: {
            media1: 'media/legacy-video.mp4',
            alt1: 'Legacy video',
            previewUrl: '/blob/video',
          },
        },
      ],
    });

    expect(draft.gallery_grid[0].order).toBe(0);
    expect(draft.gallery_grid[1].order).toBe(7);
    expect(draft.gallery_grid[1].content.media).toBe('media/legacy-video.mp4');
    expect(draft.gallery_grid[1].content.alt).toBe('Legacy video');
    expect(draft.gallery_grid[1].content.media1).toBeUndefined();
    expect(draft.gallery_grid[1].content.alt1).toBeUndefined();
  });

  it('strips transient editor fields and preserves normalized order on persistence', () => {
    const persisted = stripMasterV3Draft({
      schema_version: '3.0',
      template: MASTER_PROJECT_TEMPLATE_V3,
      project_slug: 'alpa-case',
      project_title: 'ALPA',
      project_tags: [],
      highlight_color: '#0048ff',
      gallery_grid: [
        {
          id: 'block-1',
          type: 'image',
          content: {
            media: 'media/cover.webp',
            media1: 'should-be-removed',
            alt: 'Cover',
            file: 'transient-file',
            previewUrl: '/blob/cover',
          },
          file: {} as File,
          previewUrl: '/blob/cover',
        },
        {
          id: 'block-2',
          type: 'video',
          content: {
            media: 'media/video.mp4',
            poster1: 'legacy-poster.webp',
            previewUrl2: '/blob/poster',
          },
        },
      ],
    });

    expect(persisted.gallery_grid).toEqual([
      {
        id: 'block-1',
        type: 'image',
        order: 0,
        content: {
          media: 'media/cover.webp',
          alt: 'Cover',
          poster: undefined,
          media2: undefined,
          alt2: undefined,
          poster2: undefined,
        },
      },
      {
        id: 'block-2',
        type: 'video',
        order: 1,
        content: {
          media: 'media/video.mp4',
          alt: undefined,
          poster: 'legacy-poster.webp',
          media2: undefined,
          alt2: undefined,
          poster2: undefined,
        },
      },
    ]);
  });

  it('removes legacy/transient aliases from block content', () => {
    const sanitized = sanitizeMasterV3BlockContent({
      media1: 'media/cover.webp',
      alt1: 'Cover',
      poster1: 'poster.webp',
      file1: 'transient',
      previewUrl1: '/blob/cover',
      media2: 'media/detail.webp',
      alt2: 'Detail',
      previewUrl2: '/blob/detail',
    });

    expect(sanitized).toEqual({
      media: 'media/cover.webp',
      alt: 'Cover',
      poster: 'poster.webp',
      media2: 'media/detail.webp',
      alt2: 'Detail',
      poster2: undefined,
    });
  });
});

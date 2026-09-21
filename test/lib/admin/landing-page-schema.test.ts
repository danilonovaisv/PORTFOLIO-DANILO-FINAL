import { landingPageContentSchema } from '@/lib/admin/schemas/landing-page';
import {
  createDefaultMasterProjectTemplate,
  createDefaultMasterProjectTemplateV2,
  createDefaultMasterProjectTemplateV3,
} from '@/lib/projects/template-schema-defaults';
import {
  toMasterDraft,
  toMasterV2Draft,
  toMasterV3Draft,
  stripMasterDraft,
  stripMasterV2Draft,
  stripMasterV3Draft,
} from '@/lib/admin/transformers/landing-page';
import type { BlockType, LandingPageBlock } from '@/types/landing-page';
import type {
  MasterProjectGalleryLayout,
  MasterProjectV2GalleryLayoutType,
} from '@/types/project-template';
import {
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
  MASTER_PROJECT_TEMPLATE_V3_HERO,
} from '@/types/project-template';

describe('landing page write contract', () => {
  it('accepts real default templates after draft serialization', () => {
    const fallback = {
      slug: 'portfolio-case',
      title: 'Portfolio Case',
      cover: '/cover.webp',
    };
    const payloads = [
      stripMasterDraft(
        toMasterDraft(createDefaultMasterProjectTemplate(fallback))
      ),
      stripMasterV2Draft(
        toMasterV2Draft(createDefaultMasterProjectTemplateV2(fallback))
      ),
      stripMasterV3Draft(
        toMasterV3Draft(createDefaultMasterProjectTemplateV3(fallback))
      ),
    ];
    for (const payload of payloads)
      expect(landingPageContentSchema.parse(payload)).toEqual(payload);
  });

  it('round trips every typed gallery layout and block type with populated metadata', () => {
    // Records make newly added public variants require a matching fixture.
    const layouts: Record<MasterProjectGalleryLayout, true> = {
      grid: true,
      'full-highlight': true,
      full: true,
      'quote-band': true,
      feature: true,
      'split-left': true,
      'split-right': true,
    };
    const v2Layouts: Record<MasterProjectV2GalleryLayoutType, true> = {
      'full-width': true,
      contain: true,
      'grid-2': true,
      'grid-1': true,
      'with-features': true,
      'features-3': true,
      quote: true,
      split: true,
      grid_2_col: true,
      grid_1_col: true,
      grid_feat: true,
      grid_features_3: true,
      grid_quote: true,
      grid_split: true,
    };
    const blockTypes: Record<BlockType, true> = {
      text: true,
      image: true,
      video: true,
      'video-autoplay': true,
      'html-video': true,
      'image-text': true,
      'text-image': true,
      'image-image': true,
      'image-video': true,
      'video-text': true,
      'quote-band': true,
      'media-1x': true,
      'media-2x': true,
      'media-3x': true,
    };
    const metadata = {
      project_title: 'A full case',
      project_slug: 'full-case',
      project_year: 2026,
      project_tags: ['design', 'motion'],
      project_services: ['art direction'],
      project_subtitle: 'Case subtitle',
      project_summary: 'Case summary',
      navigation: { back_label: 'Back', next_project_slug: 'next-case' },
      seo: { description: 'Case description', og_image: '/cover.webp' },
    };
    const v1 = stripMasterDraft(
      toMasterDraft({
        ...createDefaultMasterProjectTemplate(),
        ...metadata,
        gallery_grid: (
          Object.keys(layouts) as MasterProjectGalleryLayout[]
        ).map((layout) => ({
          id: layout,
          layout,
          src: '/movie.mp4',
          kind: 'video',
          poster: '/poster.webp',
          title: 'Gallery item',
          description: 'Gallery description',
        })),
      })
    );
    const v2 = stripMasterV2Draft(
      toMasterV2Draft({
        ...createDefaultMasterProjectTemplateV2(),
        ...metadata,
        gallery_grid: (
          Object.keys(v2Layouts) as MasterProjectV2GalleryLayoutType[]
        ).map((layout_type) => ({
          id: layout_type,
          layout_type,
          src: '/image.webp',
          kind: 'image',
          media_align: 'right',
          features: [{ title: 'Feature', description: 'Detail' }],
        })),
      })
    );
    const gallery: LandingPageBlock[] = (
      Object.keys(blockTypes) as BlockType[]
    ).map((type) => ({
      id: type,
      type,
      content: {
        text: 'Text',
        media: '/movie.mp4',
        mediaType: 'video',
        media2: '/photo.webp',
        mediaType2: 'image',
        media3: '/third.mp4',
        mediaType3: 'video',
        html: '<video src="/movie.mp4"></video>',
        autoplay: false,
      },
    }));
    const v3 = stripMasterV3Draft(
      toMasterV3Draft({
        ...createDefaultMasterProjectTemplateV3(),
        ...metadata,
        gallery_grid: gallery,
        intro_body: [
          'Legacy intro',
          {
            type: 'text',
            value: 'Markdown intro',
            settings: { autoplay: false },
          },
        ],
      })
    );
    const hero = {
      ...v3,
      template: MASTER_PROJECT_TEMPLATE_V3_HERO,
      hero_top_media: {
        src: '/hero.mp4',
        kind: 'video',
        poster: '/poster.webp',
      },
    };
    for (const payload of [v1, v2, v3, hero, gallery]) {
      expect(landingPageContentSchema.parse(payload)).toEqual(payload);
    }
  });

  it('rejects excessive nesting and cyclic extensions without overflowing the stack', () => {
    let nested: unknown = 'leaf';
    for (let index = 0; index < 10000; index++) nested = { nested };
    const payload = {
      template: MASTER_PROJECT_TEMPLATE_V3,
      gallery_grid: [],
      extension: nested,
    };
    expect(() => landingPageContentSchema.safeParse(payload)).not.toThrow();
    expect(landingPageContentSchema.safeParse(payload).success).toBe(false);
    const cyclic: { self?: unknown } = {};
    cyclic.self = cyclic;
    expect(
      landingPageContentSchema.safeParse({ ...payload, extension: cyclic })
        .success
    ).toBe(false);
  });

  it.each([
    MASTER_PROJECT_TEMPLATE,
    MASTER_PROJECT_TEMPLATE_V2,
    MASTER_PROJECT_TEMPLATE_V3,
    MASTER_PROJECT_TEMPLATE_V3_HERO,
  ])('preserves optional and extension data for %s', (template) => {
    const payload = {
      template,
      gallery_grid: [],
      custom_metadata: { note: 'kept' },
    };
    expect(landingPageContentSchema.parse(payload)).toEqual(payload);
  });

  it('preserves legacy blocks and both V3 intro formats without changing playback', () => {
    const blocks = [
      {
        id: 'one',
        type: 'video',
        content: { media: '/movie.mp4', mediaType: 'video', autoplay: false },
      },
    ];
    expect(landingPageContentSchema.parse(blocks)).toEqual(blocks);
    const payload = {
      template: MASTER_PROJECT_TEMPLATE_V3,
      gallery_grid: blocks,
      intro_body: [
        'Legacy text',
        {
          type: 'video_youtube',
          value: 'https://youtu.be/example',
          settings: { autoplay: false },
        },
      ],
    };
    expect(landingPageContentSchema.parse(payload)).toEqual(payload);
  });

  it.each([
    null,
    'text',
    42,
    undefined,
    {},
    { template: 'future-version', gallery_grid: [] },
    { template: MASTER_PROJECT_TEMPLATE_V3, gallery_grid: 'bad' },
    {
      template: MASTER_PROJECT_TEMPLATE,
      schema_version: '3.0',
      gallery_grid: [],
    },
  ])('rejects invalid content %#', (payload) => {
    expect(landingPageContentSchema.safeParse(payload).success).toBe(false);
  });

  it('rejects invalid media kinds, dimensions and incompatible gallery layouts', () => {
    expect(
      landingPageContentSchema.safeParse([
        { id: 'a', type: 'video', content: { mediaType: 'arbitrary' } },
      ]).success
    ).toBe(false);
    expect(
      landingPageContentSchema.safeParse({
        template: MASTER_PROJECT_TEMPLATE_V3,
        gallery_grid: [],
        hero_cover_image: { src: '/video.mp4', width: -1 },
      }).success
    ).toBe(false);
    expect(
      landingPageContentSchema.safeParse({
        template: MASTER_PROJECT_TEMPLATE_V2,
        gallery_grid: [{ id: 'a', src: '/a.jpg', layout_type: 'arbitrary' }],
      }).success
    ).toBe(false);
  });

  it('rejects non-JSON extensions but accepts optional undefined object properties', () => {
    const valid = {
      template: MASTER_PROJECT_TEMPLATE_V3,
      gallery_grid: [],
      hero_cover_image: undefined,
    };
    expect(landingPageContentSchema.safeParse(valid).success).toBe(true);
    expect(
      landingPageContentSchema.safeParse({ ...valid, extension: new Date() })
        .success
    ).toBe(false);
    expect(
      landingPageContentSchema.safeParse({ ...valid, extension: Infinity })
        .success
    ).toBe(false);
  });
});

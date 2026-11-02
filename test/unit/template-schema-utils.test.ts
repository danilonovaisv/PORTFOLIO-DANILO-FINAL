import {
  asRecord,
  asString,
  asNumber,
  asBoolean,
  asStringArray,
  asIntroParagraphs,
  asV3IntroBlocks,
  asMediaKind,
  asGalleryLayout,
  normalizeLegacyLayoutToV2,
  asGalleryLayoutV2,
  asMediaAlign,
  asBlockType,
  inferMediaType,
  asTextAlign,
  normalizeTextConfig,
  normalizeAsset,
  normalizeGalleryItem,
  normalizeFeatureItems,
  normalizeGalleryItemV2,
  normalizeLandingBlock,
  hasV3BlockType,
  V3_BLOCK_TYPES,
} from '@/lib/projects/template-schema-utils';

describe('template-schema-utils', () => {
  describe('Primitivos & Type Guards', () => {
    it('asRecord extrai apenas objetos não-nulos e não-arrays', () => {
      expect(asRecord(null)).toBeNull();
      expect(asRecord(undefined)).toBeNull();
      expect(asRecord('string')).toBeNull();
      expect(asRecord(123)).toBeNull();
      expect(asRecord([1, 2, 3])).toBeNull();
      expect(asRecord({ key: 'value' })).toEqual({ key: 'value' });
    });

    it('asString normaliza strings com trim e descarta vazias', () => {
      expect(asString(null)).toBeUndefined();
      expect(asString('')).toBeUndefined();
      expect(asString('   ')).toBeUndefined();
      expect(asString(123)).toBeUndefined();
      expect(asString('  Ghost Design  ')).toBe('Ghost Design');
    });

    it('asNumber converte e valida números finitos', () => {
      expect(asNumber(null)).toBeUndefined();
      expect(asNumber(undefined)).toBeUndefined();
      expect(asNumber('abc')).toBeUndefined();
      expect(asNumber(NaN)).toBeUndefined();
      expect(asNumber(Infinity)).toBeUndefined();
      expect(asNumber(42)).toBe(42);
      expect(asNumber('100.5')).toBe(100.5);
    });

    it('asBoolean avalia booleans e strings booleanas', () => {
      expect(asBoolean(true)).toBe(true);
      expect(asBoolean(false)).toBe(false);
      expect(asBoolean('true')).toBe(true);
      expect(asBoolean('false')).toBe(false);
      expect(asBoolean('other')).toBeUndefined();
      expect(asBoolean(null)).toBeUndefined();
    });

    it('asStringArray filtra duplicatas, valores vazios e tipos inválidos', () => {
      expect(asStringArray(null)).toEqual([]);
      expect(asStringArray(['tag1', '  tag2  ', 'tag1', '', '   '])).toEqual([
        'tag1',
        'tag2',
      ]);
      expect(asStringArray('not-an-array')).toEqual([]);
    });

    it('asIntroParagraphs lida com arrays de strings, records e texto multiline', () => {
      expect(asIntroParagraphs(null)).toEqual([]);
      expect(
        asIntroParagraphs([
          'Primeiro parágrafo',
          { value: 'Segundo parágrafo' },
        ])
      ).toEqual(['Primeiro parágrafo', 'Segundo parágrafo']);
      expect(asIntroParagraphs('Linha 1\n\nLinha 2\n')).toEqual([
        'Linha 1',
        'Linha 2',
      ]);
    });
  });

  describe('asV3IntroBlocks', () => {
    it('retorna undefined para entrada não array ou array vazio', () => {
      expect(asV3IntroBlocks(null)).toBeUndefined();
      expect(asV3IntroBlocks([])).toBeUndefined();
    });

    it('normaliza strings simples em blocos de texto', () => {
      const res = asV3IntroBlocks(['Introdução do projeto']);
      expect(res).toEqual([
        {
          type: 'text',
          value: 'Introdução do projeto',
          settings: { autoplay: false },
        },
      ]);
    });

    it('normaliza bloco do tipo video_youtube com normalização de URL e autoplay default', () => {
      const res = asV3IntroBlocks([
        {
          type: 'video_youtube',
          value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ]);
      expect(res?.[0]).toEqual({
        type: 'video_youtube',
        value: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        settings: { autoplay: true },
      });
    });
  });

  describe('Layout & Mapeamentos Enums', () => {
    it('asMediaKind categoriza image, video e html', () => {
      expect(asMediaKind('html')).toBe('html');
      expect(asMediaKind('video')).toBe('video');
      expect(asMediaKind('image')).toBe('image');
      expect(asMediaKind('unknown')).toBe('image');
    });

    it('asGalleryLayout valida layouts legados e novos', () => {
      expect(asGalleryLayout('grid')).toBe('grid');
      expect(asGalleryLayout('quote-band')).toBe('quote-band');
      expect(asGalleryLayout('invalid')).toBe('full');
    });

    it('normalizeLegacyLayoutToV2 converte layouts legados para padrão V2', () => {
      expect(normalizeLegacyLayoutToV2('grid')).toBe('grid_2_col');
      expect(normalizeLegacyLayoutToV2('full')).toBe('grid_1_col');
      expect(normalizeLegacyLayoutToV2('full-highlight')).toBe('grid_feat');
      expect(normalizeLegacyLayoutToV2('feature')).toBe('grid_feat');
      expect(normalizeLegacyLayoutToV2('quote-band')).toBe('grid_quote');
      expect(normalizeLegacyLayoutToV2('split-left')).toBe('grid_split');
      expect(normalizeLegacyLayoutToV2('split-right')).toBe('grid_split');
      expect(normalizeLegacyLayoutToV2('unknown')).toBe('grid_1_col');
    });

    it('asGalleryLayoutV2 preserva tipos válidos de V2', () => {
      expect(asGalleryLayoutV2('grid_features_3')).toBe('grid_features_3');
      expect(asGalleryLayoutV2('grid')).toBe('grid_2_col');
    });

    it('asMediaAlign retorna right ou left', () => {
      expect(asMediaAlign('right')).toBe('right');
      expect(asMediaAlign('left')).toBe('left');
      expect(asMediaAlign('center')).toBe('left');
    });

    it('asBlockType valida tipos V3 suportados', () => {
      V3_BLOCK_TYPES.forEach((type) => {
        expect(asBlockType(type)).toBe(type);
      });
      expect(asBlockType('invalid-type')).toBe('text');
    });

    it('hasV3BlockType identifica blocos suportados', () => {
      expect(hasV3BlockType(null)).toBe(false);
      expect(hasV3BlockType([{ type: 'media-1x' }])).toBe(true);
      expect(hasV3BlockType([{ type: 'custom-unsupported' }])).toBe(false);
    });
  });

  describe('inferMediaType & Text Config', () => {
    it('infere youtube e video a partir de padrões de URL e extensão', () => {
      expect(inferMediaType('https://youtu.be/dQw4w9WgXcQ')).toBe('youtube');
      expect(inferMediaType('projects/hero.mp4')).toBe('video');
      expect(inferMediaType('projects/hero.webm')).toBe('video');
      expect(inferMediaType('projects/hero.png')).toBe('image');
      expect(inferMediaType(undefined, 'youtube')).toBe('youtube');
      expect(inferMediaType(undefined)).toBeUndefined();
    });

    it('asTextAlign normaliza alinhamentos suportados', () => {
      expect(asTextAlign('text-center')).toBe('center');
      expect(asTextAlign('right')).toBe('right');
      expect(asTextAlign('justify')).toBe('justify');
      expect(asTextAlign('invalid')).toBeUndefined();
    });

    it('normalizeTextConfig mapeia tipografia e alinhamento', () => {
      expect(normalizeTextConfig(null)).toBeUndefined();
      expect(
        normalizeTextConfig({
          fontSize: '18px',
          fontWeight: '600',
          textAlign: 'center',
          color: '#ffffff',
        })
      ).toEqual({
        fontSize: '18px',
        fontWeight: '600',
        textAlign: 'center',
        color: '#ffffff',
      });
    });
  });

  describe('normalizeAsset & Galeria', () => {
    it('normalizeAsset processa html e assets convencionais com fallback', () => {
      const htmlAsset = normalizeAsset(
        { kind: 'html', src: '<iframe></iframe>', alt: 'Demo' },
        'Fallback Alt'
      );
      expect(htmlAsset.kind).toBe('html');
      expect(htmlAsset.src).toBe('<iframe></iframe>');
      expect(htmlAsset.alt).toBe('Demo');

      const imageAsset = normalizeAsset(
        { src: 'home/cover.webp' },
        'Default Cover'
      );
      expect(imageAsset.kind).toBe('image');
      expect(imageAsset.alt).toBe('Default Cover');
    });

    it('normalizeGalleryItem valida requisitos de layout quote-band vs media', () => {
      expect(normalizeGalleryItem(null, 0, 'Alt')).toBeNull();
      // quote-band não exige src
      const quoteItem = normalizeGalleryItem(
        { layout: 'quote-band', quote: 'Design sees you' },
        0,
        'Quote Alt'
      );
      expect(quoteItem?.layout).toBe('quote-band');
      expect(quoteItem?.quote).toBe('Design sees you');

      // layout full sem src é rejeitado
      expect(normalizeGalleryItem({ layout: 'full' }, 0, 'Alt')).toBeNull();
    });

    it('normalizeFeatureItems mapeia listas de features', () => {
      expect(normalizeFeatureItems(null)).toBeUndefined();
      expect(
        normalizeFeatureItems([
          { title: 'Feature 1', description: 'Desc 1' },
          { invalid: true },
        ])
      ).toEqual([
        {
          id: 'feature-1',
          title: 'Feature 1',
          description: 'Desc 1',
        },
      ]);
    });

    it('normalizeGalleryItemV2 trata legacy split layouts e features', () => {
      const splitItem = normalizeGalleryItemV2(
        {
          layout: 'split-right',
          src: 'projects/shot.webp',
          title: 'Split Section',
        },
        0,
        'Default Alt'
      );
      expect(splitItem?.layout_type).toBe('grid_split');
      expect(splitItem?.media_align).toBe('right');
      expect(splitItem?.title).toBe('Split Section');
    });

    it('normalizeLandingBlock normaliza blocos V3 polimórficos', () => {
      expect(normalizeLandingBlock(null, 0, 'Alt')).toBeNull();

      const block = normalizeLandingBlock(
        {
          type: 'media-1x',
          content: {
            media: 'projects/video.mp4',
            alt: 'Hero Video',
            autoplay: true,
          },
        },
        0,
        'Default Alt'
      );

      expect(block?.type).toBe('media-1x');
      expect(block?.content.alt).toBe('Hero Video');
      expect(block?.content.autoplay).toBe(true);
      expect(block?.content.mediaType).toBe('video');
    });
  });
});

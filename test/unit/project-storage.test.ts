import {
  collectProjectStoragePaths,
  findRemovedProjectStoragePaths,
  rewriteStoragePath,
} from '../../src/lib/admin/project-storage';

describe('project storage reconciliation', () => {
  it('collects only portfolio media paths referenced by a project', () => {
    expect(
      collectProjectStoragePaths({
        url_landscape:
          'https://demo.supabase.co/storage/v1/object/public/portfolio-media/acme/case/assets-do-projeto/cover/image.webp',
        url_square:
          'portfolio-media/acme/case/assets-do-projeto/cover/square.webp',
        home_featured: {
          logoPath: 'acme/case/assets-do-projeto/home-featured/logo.webp',
        },
        gallery: [
          { path: 'acme/case/assets-do-projeto/gallery/item-1.webp' },
          { path: 'https://example.com/external.webp' },
          { path: 'site-assets/home/hero.webp' },
        ],
      })
    ).toEqual([
      'acme/case/assets-do-projeto/cover/image.webp',
      'acme/case/assets-do-projeto/cover/square.webp',
      'acme/case/assets-do-projeto/home-featured/logo.webp',
      'acme/case/assets-do-projeto/gallery/item-1.webp',
    ]);
  });

  it('rewrites renamed storage prefixes using anchored replacement', () => {
    expect(
      rewriteStoragePath(
        'acme-old/case-old/assets-do-projeto/gallery/item.webp',
        [
          {
            from: 'acme-old/case-old/assets-do-projeto',
            to: 'acme-new/case-new/assets-do-projeto',
          },
        ]
      )
    ).toBe('acme-new/case-new/assets-do-projeto/gallery/item.webp');
  });

  it('detects orphaned files after replacement and removal', () => {
    expect(
      findRemovedProjectStoragePaths(
        {
          url_landscape:
            'acme-old/case-old/assets-do-projeto/cover/old-cover.webp',
          url_square: 'acme-old/case-old/assets-do-projeto/cover/square.webp',
          gallery: [
            { path: 'acme-old/case-old/assets-do-projeto/gallery/keep.webp' },
            {
              path: 'acme-old/case-old/assets-do-projeto/gallery/remove.webp',
            },
          ],
        },
        {
          url_landscape:
            'acme-new/case-new/assets-do-projeto/cover/new-cover.webp',
          url_square: 'acme-new/case-new/assets-do-projeto/cover/square.webp',
          gallery: [
            { path: 'acme-new/case-new/assets-do-projeto/gallery/keep.webp' },
          ],
        },
        [
          {
            from: 'acme-old/case-old/assets-do-projeto',
            to: 'acme-new/case-new/assets-do-projeto',
          },
        ]
      )
    ).toEqual([
      'acme-new/case-new/assets-do-projeto/cover/old-cover.webp',
      'acme-new/case-new/assets-do-projeto/gallery/remove.webp',
    ]);
  });
});

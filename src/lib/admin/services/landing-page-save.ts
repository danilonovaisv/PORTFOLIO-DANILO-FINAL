import { v4 as uuidv4 } from 'uuid';
import type { LandingPageBlock } from '@/types/landing-page';
import type { MasterProjectTemplateDraft } from '@/components/admin/MasterProjectTemplateEditor';
import type { MasterProjectTemplateV2Draft } from '@/components/admin/MasterProjectTemplateV2Editor';
import type { MasterProjectTemplateV3Draft } from '@/components/admin/MasterProjectTemplateV3Editor';
import { uploadSiteAsset } from '@/lib/supabase/storage';
import {
  sanitizeMasterV3BlockContent,
  stripMasterDraft,
  stripMasterV2Draft,
  stripMasterV3Draft,
} from '@/lib/admin/transformers/landing-page';
import {
  type AssetTypeHint,
  requireResolvedAsset,
  resolveSupabaseUrl,
} from '@/lib/media/asset-contract';
import { isHtmlMedia } from '@/lib/portfolio/card-media';
import {
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
  ProjectTemplateId,
} from '@/types/project-template';

interface SaveContext {
  id?: string;
  title: string;
  slug: string;
  cover: File | null;
  initialCover: string | null;
  template: ProjectTemplateId;
  sections: LandingPageBlock[];
  masterTemplate: MasterProjectTemplateDraft;
  masterTemplateV2: MasterProjectTemplateV2Draft;
  masterTemplateV3: MasterProjectTemplateV3Draft;
}

type UploadAsset = (_file: File, _key: string) => Promise<string>;

export async function prepareLandingPageData(ctx: SaveContext) {
  const handleFileUpload = async (file: File, key: string) => {
    const path = await uploadSiteAsset({
      file,
      key,
      page: 'landing-pages',
      subPath: ctx.slug || 'general',
      bucket: 'site-assets',
    });
    const url = resolveSupabaseUrl(path, 'site-assets');
    if (!url)
      throw new Error('SYSTEM_ERR: STORAGE_PUBLIC_URL_RESOLUTION_FAILED');
    return url;
  };

  let finalContent;
  let finalCover: string | null = ctx.initialCover;

  if (ctx.template === MASTER_PROJECT_TEMPLATE) {
    const result = await saveMasterTemplateV1(ctx, handleFileUpload);
    finalContent = result.content;
    finalCover = result.coverPath;
  } else if (ctx.template === MASTER_PROJECT_TEMPLATE_V2) {
    const result = await saveMasterTemplateV2(ctx, handleFileUpload);
    finalContent = result.content;
    finalCover = result.coverPath;
  } else if (ctx.template === MASTER_PROJECT_TEMPLATE_V3) {
    const result = await saveMasterTemplateV3(ctx, handleFileUpload);
    finalContent = result.content;
    finalCover = result.coverPath;
  } else {
    const result = await saveLegacyContent(ctx, handleFileUpload);
    finalContent = result.content;
    finalCover = result.coverPath;
  }

  return { finalContent, finalCover };
}

async function saveLegacyContent(ctx: SaveContext, upload: UploadAsset) {
  let coverPath = normalizePersistedAsset(ctx.initialCover, 'image');
  if (ctx.cover) {
    const path = await upload(ctx.cover, `cover-${uuidv4()}`);
    if (path) coverPath = path;
  }

  const uploadedSections = await Promise.all(
    ctx.sections.map(async (section) => {
      let mediaPath = section.content.media;
      let media2Path = section.content.media2;
      const mediaType = section.content.mediaType as AssetTypeHint | undefined;
      const mediaType2 = section.content.mediaType2 as
        AssetTypeHint | undefined;

      if (section.file) {
        const path = await upload(section.file, `block-${section.id}-media1`);
        if (path) mediaPath = path;
      } else if (mediaPath) {
        mediaPath = normalizePersistedAsset(mediaPath, mediaType);
      }

      if (section.file2) {
        const path = await upload(section.file2, `block-${section.id}-media2`);
        if (path) media2Path = path;
      } else if (media2Path) {
        media2Path = normalizePersistedAsset(media2Path, mediaType2);
      }

      return {
        id: section.id,
        type: section.type,
        content: {
          ...section.content,
          media: mediaPath,
          media2: media2Path,
        },
      };
    })
  );

  return { coverPath, content: uploadedSections };
}

async function saveMasterTemplateV1(ctx: SaveContext, upload: UploadAsset) {
  const nextTemplate = {
    ...ctx.masterTemplate,
    project_slug: ctx.slug,
    project_title: ctx.masterTemplate.project_title || ctx.title,
  };

  let heroCoverSrc = nextTemplate.hero_cover_image.src;
  if (nextTemplate.hero_cover_image.file) {
    const path = await upload(
      nextTemplate.hero_cover_image.file,
      `master-hero-${uuidv4()}`
    );
    if (path) heroCoverSrc = path;
  } else {
    heroCoverSrc = normalizePersistedAsset(
      heroCoverSrc,
      nextTemplate.hero_cover_image.kind
    );
  }

  let heroLogo = nextTemplate.hero_logo_image;
  if (heroLogo?.file) {
    const path = await upload(heroLogo.file, `master-logo-${uuidv4()}`);
    if (path) {
      heroLogo = { ...heroLogo, src: path, file: null, previewUrl: '' };
    }
  } else if (heroLogo?.src) {
    heroLogo = {
      ...heroLogo,
      src: normalizePersistedAsset(heroLogo.src, heroLogo.kind),
    };
  }

  const galleryGrid = await Promise.all(
    nextTemplate.gallery_grid.map(async (item) => {
      let src = item.src;
      if (item.file) {
        const path = await upload(item.file, `master-grid-${item.id}`);
        if (path) src = path;
      } else {
        src = normalizePersistedAsset(src, item.kind);
      }
      return {
        ...item,
        src,
        poster: normalizePersistedAsset(item.poster, 'image'),
        file: null,
        previewUrl: '',
      };
    })
  );

  const cleanTemplate = stripMasterDraft({
    ...nextTemplate,
    hero_cover_image: {
      ...nextTemplate.hero_cover_image,
      src: heroCoverSrc,
      file: null,
      previewUrl: '',
    },
    hero_logo_image: heroLogo,
    gallery_grid: galleryGrid,
    seo: {
      ...nextTemplate.seo,
      og_image: nextTemplate.seo?.og_image
        ? normalizePersistedAsset(nextTemplate.seo.og_image, 'image')
        : heroCoverSrc,
    },
  });

  return { coverPath: heroCoverSrc, content: cleanTemplate };
}

async function saveMasterTemplateV2(ctx: SaveContext, upload: UploadAsset) {
  const nextTemplate = {
    ...ctx.masterTemplateV2,
    project_slug: ctx.slug,
    project_title: ctx.masterTemplateV2.project_title || ctx.title,
  };

  if (
    nextTemplate.hero_cover_image.kind !== 'video' &&
    !nextTemplate.hero_cover_image.alt?.trim()
  ) {
    throw new Error(
      'SYSTEM_ERR: HERO_COVER_ALT_TEXT_REQUIRED — IMAGE_HERO_REQUIRES_ACCESSIBILITY_TEXT'
    );
  }

  let heroCoverSrc = nextTemplate.hero_cover_image.src;
  if (nextTemplate.hero_cover_image.file) {
    const path = await upload(
      nextTemplate.hero_cover_image.file,
      `master-v2-hero-${uuidv4()}`
    );
    if (path) heroCoverSrc = path;
  } else {
    heroCoverSrc = normalizePersistedAsset(
      heroCoverSrc,
      nextTemplate.hero_cover_image.kind
    );
  }

  let heroLogo = nextTemplate.hero_logo_image;
  if (heroLogo?.file) {
    const path = await upload(heroLogo.file, `master-v2-logo-${uuidv4()}`);
    if (path) {
      heroLogo = { ...heroLogo, src: path, file: null, previewUrl: '' };
    }
  } else if (heroLogo?.src) {
    heroLogo = {
      ...heroLogo,
      src: normalizePersistedAsset(heroLogo.src, heroLogo.kind),
    };
  }

  const galleryGrid = await Promise.all(
    nextTemplate.gallery_grid.map(async (item) => {
      let src = item.src;
      if (item.file) {
        const path = await upload(item.file, `master-v2-grid-${item.id}`);
        if (path) src = path;
      } else {
        src = normalizePersistedAsset(src, item.kind);
      }
      return {
        ...item,
        src,
        poster: normalizePersistedAsset(item.poster, 'image'),
        file: null,
        previewUrl: '',
      };
    })
  );

  const cleanTemplate = stripMasterV2Draft({
    ...nextTemplate,
    hero_cover_image: {
      ...nextTemplate.hero_cover_image,
      src: heroCoverSrc,
      file: null,
      previewUrl: '',
    },
    hero_logo_image: heroLogo,
    gallery_grid: galleryGrid,
    seo: {
      ...nextTemplate.seo,
      og_image: nextTemplate.seo?.og_image
        ? normalizePersistedAsset(nextTemplate.seo.og_image, 'image')
        : heroCoverSrc,
    },
  });

  return { coverPath: heroCoverSrc, content: cleanTemplate };
}

function normalizeTemplateV3IntroBody(introBody: unknown) {
  if (!Array.isArray(introBody)) return [];

  return introBody
    .map((item) => {
      if (typeof item === 'string') {
        if (!item.trim()) return null;
        return {
          type: 'text' as const,
          value: item,
          settings: { autoplay: false },
        };
      }

      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return null;
      }

      const block = item as {
        type?: unknown;
        value?: unknown;
        settings?: { autoplay?: unknown };
      };

      const value = typeof block.value === 'string' ? block.value : '';
      if (!value.trim()) return null;

      const type = block.type === 'video_youtube' ? 'video_youtube' : 'text';
      const normalizedValue =
        type === 'video_youtube'
          ? normalizePersistedAsset(value, 'youtube')
          : value;
      const autoplay =
        typeof block.settings?.autoplay === 'boolean'
          ? block.settings.autoplay
          : type === 'video_youtube';

      return {
        type,
        value: normalizedValue,
        settings: { autoplay },
      };
    })
    .filter(
      (
        item
      ): item is {
        type: 'text' | 'video_youtube';
        value: string;
        settings: { autoplay: boolean };
      } => Boolean(item)
    );
}

async function saveMasterTemplateV3(ctx: SaveContext, upload: UploadAsset) {
  const nextTemplate = {
    ...ctx.masterTemplateV3,
    project_slug: ctx.slug,
    project_title: ctx.masterTemplateV3.project_title || ctx.title,
    intro_body: normalizeTemplateV3IntroBody(ctx.masterTemplateV3.intro_body),
  };

  let heroCoverSrc = nextTemplate.hero_cover_image?.src || '';
  if (nextTemplate.hero_cover_image?.file) {
    const path = await upload(
      nextTemplate.hero_cover_image.file,
      `master-v3-hero-${uuidv4()}`
    );
    if (path) heroCoverSrc = path;
  } else if (heroCoverSrc) {
    heroCoverSrc = normalizePersistedAsset(
      heroCoverSrc,
      nextTemplate.hero_cover_image?.kind
    );
  }

  let heroLogo = nextTemplate.hero_logo_image;
  if (heroLogo?.file) {
    const path = await upload(heroLogo.file, `master-v3-logo-${uuidv4()}`);
    if (path) {
      heroLogo = { ...heroLogo, src: path, file: null, previewUrl: '' };
    }
  } else if (heroLogo?.src) {
    heroLogo = {
      ...heroLogo,
      src: normalizePersistedAsset(heroLogo.src, heroLogo.kind),
    };
  }

  let heroTopMedia = nextTemplate.hero_top_media;
  if (heroTopMedia?.file) {
    const path = await upload(
      heroTopMedia.file,
      `master-v3-hero-top-${uuidv4()}`
    );
    if (path) {
      heroTopMedia = {
        ...heroTopMedia,
        src: path,
        file: null,
        previewUrl: '',
      };
    }
  } else if (heroTopMedia) {
    const isHtml =
      heroTopMedia.kind === 'html' ||
      Boolean(heroTopMedia.html) ||
      isHtmlMedia(heroTopMedia.src);

    heroTopMedia = {
      ...heroTopMedia,
      src: isHtml
        ? (heroTopMedia.src || '')
        : (heroTopMedia.src
            ? normalizePersistedAsset(
                heroTopMedia.src,
                heroTopMedia.kind as any
              )
            : ''),
      kind: isHtml ? 'html' : (heroTopMedia.kind || 'image'),
      html: heroTopMedia.html || (isHtml ? heroTopMedia.src : undefined),
      file: null,
      previewUrl: '',
    };
  }

  const galleryGrid = await Promise.all(
    nextTemplate.gallery_grid.map(async (rawBlock) => {
      const block = {
        ...rawBlock,
        content: sanitizeMasterV3BlockContent(rawBlock.content),
      };
      let mediaPath = block.content.media;
      let media2Path = block.content.media2;

      const isBlockHtml1 =
        block.type === 'html-video' ||
        block.content.mediaType === 'html' ||
        Boolean(block.content.html) ||
        isHtmlMedia(mediaPath);

      if (block.file) {
        const path = await upload(block.file, `master-v3-grid-${block.id}-m1`);
        if (path) mediaPath = path;
      } else if (mediaPath && !isBlockHtml1) {
        mediaPath = normalizePersistedAsset(mediaPath, block.content.mediaType);
      }

      const isBlockHtml2 =
        block.content.mediaType2 === 'html' ||
        Boolean(block.content.html2) ||
        isHtmlMedia(media2Path);

      if (block.file2) {
        const path = await upload(block.file2, `master-v3-grid-${block.id}-m2`);
        if (path) media2Path = path;
      } else if (media2Path && !isBlockHtml2) {
        media2Path = normalizePersistedAsset(
          media2Path,
          block.content.mediaType2
        );
      }

      const posterPath = block.content.poster
        ? normalizePersistedAsset(block.content.poster, 'image')
        : '';
      const poster2Path = block.content.poster2
        ? normalizePersistedAsset(block.content.poster2, 'image')
        : '';

      const finalHtml1 =
        block.content.html || (isBlockHtml1 ? mediaPath : undefined);
      const finalHtml2 =
        block.content.html2 || (isBlockHtml2 ? media2Path : undefined);

      return {
        ...block,
        content: sanitizeMasterV3BlockContent({
          ...block.content,
          media: mediaPath,
          media2: media2Path,
          html: finalHtml1,
          html2: finalHtml2,
          mediaType: isBlockHtml1 ? 'html' : block.content.mediaType,
          mediaType2: isBlockHtml2 ? 'html' : block.content.mediaType2,
          poster: posterPath,
          poster2: poster2Path,
        }),
        file: null,
        file2: null,
        previewUrl: '',
        previewUrl2: '',
      };
    })
  );

  const cleanTemplate = stripMasterV3Draft({
    ...nextTemplate,
    hero_cover_image: nextTemplate.hero_cover_image
      ? {
          ...nextTemplate.hero_cover_image,
          src: heroCoverSrc,
          file: null,
          previewUrl: '',
        }
      : undefined,
    hero_logo_image: heroLogo,
    hero_top_media: heroTopMedia,
    gallery_grid: galleryGrid,
    seo: {
      ...nextTemplate.seo,
      og_image: nextTemplate.seo?.og_image
        ? normalizePersistedAsset(nextTemplate.seo.og_image, 'image')
        : heroCoverSrc,
    },
  });

  return { coverPath: heroCoverSrc, content: cleanTemplate };
}

function normalizePersistedAsset(
  value?: string | null,
  hint?: AssetTypeHint | 'image' | 'video'
) {
  if (!value?.trim()) return '';
  if (hint === 'html' || isHtmlMedia(value)) return value.trim();
  return requireResolvedAsset(value, hint as AssetTypeHint | undefined);
}

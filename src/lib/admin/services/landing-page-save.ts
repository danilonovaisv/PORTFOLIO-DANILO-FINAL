import { v4 as uuidv4 } from 'uuid';
import { uploadSiteAsset } from '@/lib/supabase/storage';
import {
  toStoragePath,
  stripMasterDraft,
  stripMasterV2Draft,
  stripMasterV3Draft,
} from '@/lib/admin/transformers/landing-page';
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
  sections: any[];
  masterTemplate: any;
  masterTemplateV2: any;
  masterTemplateV3: any;
}

export async function prepareLandingPageData(ctx: SaveContext) {
  const handleFileUpload = async (file: File, key: string) => {
    return await uploadSiteAsset({
      file,
      key,
      page: 'landing-pages',
      subPath: ctx.slug || 'general',
      bucket: 'site-assets',
    });
  };

  let finalContent: any;
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

async function saveLegacyContent(ctx: SaveContext, upload: Function) {
  let coverPath = ctx.initialCover || '';
  if (ctx.cover) {
    const path = await upload(ctx.cover, `cover-${uuidv4()}`);
    if (path) coverPath = path;
  }

  const uploadedSections = await Promise.all(
    ctx.sections.map(async (section) => {
      let mediaPath = section.content.media;
      let media2Path = section.content.media2;

      if (section.file) {
        const path = await upload(section.file, `block-${section.id}-media1`);
        if (path) mediaPath = path;
      } else if (mediaPath) {
        mediaPath = toStoragePath(mediaPath);
      }

      if (section.file2) {
        const path = await upload(section.file2, `block-${section.id}-media2`);
        if (path) media2Path = path;
      } else if (media2Path) {
        media2Path = toStoragePath(media2Path);
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

async function saveMasterTemplateV1(ctx: SaveContext, upload: Function) {
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
    heroCoverSrc = toStoragePath(heroCoverSrc);
  }

  let heroLogo = nextTemplate.hero_logo_image;
  if (heroLogo?.file) {
    const path = await upload(heroLogo.file, `master-logo-${uuidv4()}`);
    if (path) {
      heroLogo = { ...heroLogo, src: path, file: null, previewUrl: '' };
    }
  } else if (heroLogo?.src) {
    heroLogo = { ...heroLogo, src: toStoragePath(heroLogo.src) };
  }

  const galleryGrid = await Promise.all(
    nextTemplate.gallery_grid.map(async (item: any) => {
      let src = item.src;
      if (item.file) {
        const path = await upload(item.file, `master-grid-${item.id}`);
        if (path) src = path;
      } else {
        src = toStoragePath(src);
      }
      return {
        ...item,
        src,
        poster: item.poster ? toStoragePath(item.poster) : item.poster,
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
        ? toStoragePath(nextTemplate.seo.og_image)
        : heroCoverSrc,
    },
  });

  return { coverPath: heroCoverSrc, content: cleanTemplate };
}

async function saveMasterTemplateV2(ctx: SaveContext, upload: Function) {
  const nextTemplate = {
    ...ctx.masterTemplateV2,
    project_slug: ctx.slug,
    project_title: ctx.masterTemplateV2.project_title || ctx.title,
  };

  if (
    nextTemplate.hero_cover_image.kind !== 'video' &&
    !nextTemplate.hero_cover_image.alt?.trim()
  ) {
    throw new Error('Hero cover precisa de alt text quando for imagem.');
  }

  let heroCoverSrc = nextTemplate.hero_cover_image.src;
  if (nextTemplate.hero_cover_image.file) {
    const path = await upload(
      nextTemplate.hero_cover_image.file,
      `master-v2-hero-${uuidv4()}`
    );
    if (path) heroCoverSrc = path;
  } else {
    heroCoverSrc = toStoragePath(heroCoverSrc);
  }

  let heroLogo = nextTemplate.hero_logo_image;
  if (heroLogo?.file) {
    const path = await upload(heroLogo.file, `master-v2-logo-${uuidv4()}`);
    if (path) {
      heroLogo = { ...heroLogo, src: path, file: null, previewUrl: '' };
    }
  } else if (heroLogo?.src) {
    heroLogo = { ...heroLogo, src: toStoragePath(heroLogo.src) };
  }

  const galleryGrid = await Promise.all(
    nextTemplate.gallery_grid.map(async (item: any) => {
      let src = item.src;
      if (item.file) {
        const path = await upload(item.file, `master-v2-grid-${item.id}`);
        if (path) src = path;
      } else {
        src = toStoragePath(src);
      }
      return {
        ...item,
        src,
        poster: item.poster ? toStoragePath(item.poster) : item.poster,
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
        ? toStoragePath(nextTemplate.seo.og_image)
        : heroCoverSrc,
    },
  });

  return { coverPath: heroCoverSrc, content: cleanTemplate };
}

async function saveMasterTemplateV3(ctx: SaveContext, upload: Function) {
  const nextTemplate = {
    ...ctx.masterTemplateV3,
    project_slug: ctx.slug,
    project_title: ctx.masterTemplateV3.project_title || ctx.title,
  };

  let heroCoverSrc = nextTemplate.hero_cover_image?.src || '';
  if (nextTemplate.hero_cover_image?.file) {
    const path = await upload(
      nextTemplate.hero_cover_image.file,
      `master-v3-hero-${uuidv4()}`
    );
    if (path) heroCoverSrc = path;
  } else if (heroCoverSrc) {
    heroCoverSrc = toStoragePath(heroCoverSrc);
  }

  let heroLogo = nextTemplate.hero_logo_image;
  if (heroLogo?.file) {
    const path = await upload(heroLogo.file, `master-v3-logo-${uuidv4()}`);
    if (path) {
      heroLogo = { ...heroLogo, src: path, file: null, previewUrl: '' };
    }
  } else if (heroLogo?.src) {
    heroLogo = { ...heroLogo, src: toStoragePath(heroLogo.src) };
  }

  const galleryGrid = await Promise.all(
    nextTemplate.gallery_grid.map(async (block: any) => {
      let mediaPath = block.content.media;
      let media2Path = block.content.media2;

      if (block.file) {
        const path = await upload(block.file, `master-v3-grid-${block.id}-m1`);
        if (path) mediaPath = path;
      } else if (mediaPath) {
        mediaPath = toStoragePath(mediaPath);
      }

      if (block.file2) {
        const path = await upload(block.file2, `master-v3-grid-${block.id}-m2`);
        if (path) media2Path = path;
      } else if (media2Path) {
        media2Path = toStoragePath(media2Path);
      }

      return {
        ...block,
        content: {
          ...block.content,
          media: mediaPath,
          media2: media2Path,
        },
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
    gallery_grid: galleryGrid,
    seo: {
      ...nextTemplate.seo,
      og_image: nextTemplate.seo?.og_image
        ? toStoragePath(nextTemplate.seo.og_image)
        : heroCoverSrc,
    },
  });

  return { coverPath: heroCoverSrc, content: cleanTemplate };
}

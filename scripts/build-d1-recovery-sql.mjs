import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const R2_PUBLIC_BASE = 'https://assets.portfoliodanilo.com';

const MEDIA_DIR_BY_SLUG = {
  'key-vision': 'civic/key-visual',
  'campanhas-digitais': 'dolce-gusto/campaign',
  swift: 'swift/swift-kvs',
  conid: 'conib/website',
  'hellmanns-parcerias': 'hellmann-s/hellmanns-parcerias',
  'ambev-bees': 'bees/bees',
  animale: 'animale/animale',
  'zevi-identidade-visual-branding-cafe-premium': 'zevi/branding',
  'mercado-livre-ai-video-mp': 'mercado-livre/ai-video-mp',
  cbre: 'cbre/cbre',
  mapfre: 'fundaci-n-mapfre/mapfre',
  'bidaya-parfums-scents-without-borders': 'bidaya/ai-case',
  eudora: 'eudora/eudora',
  nestle: 'nestl/brand-campaigns',
  tcotton: 'tcotton/tcotton',
  dntro: 'dntro/dntro',
  glad: 'down-qu-mica/video-manifesto',
  'swift-week': 'swift/swift-week',
  'ai-video': 'projeto-pessoal/ai-video',
};

const COVER_OVERRIDES = {
  nestle: {
    landscape:
      'site-assets/landing-pages/nestle/STORIES-NESTLE-100-ANOS--PROMO1920X1080px-v2.webp',
    square:
      'site-assets/landing-pages/nestle/KV-SAUDAVEIS-NESTLE-08.webp',
  },
  'bidaya-parfums-scents-without-borders': {
    landscape:
      'site-assets/landing-pages/bidaya-parfums-scents-without-borders/anima-5/BG.webp',
    square:
      'site-assets/landing-pages/bidaya-parfums-scents-without-borders/anima-1/8.webp',
  },
  'ai-video': {
    landscape:
      'portfolio-media/projeto-pessoal/ai-video/assets-do-projeto/cover-1x1/ai-thumb-1-1-compressed.6ae532a6f68a3b42.mp4',
    square:
      'portfolio-media/projeto-pessoal/ai-video/assets-do-projeto/cover-1x1/ai-thumb-1-1-compressed.6ae532a6f68a3b42.mp4',
  },
};

export function toR2Url(key) {
  if (!key) return '';
  if (/^https?:\/\//i.test(key)) return key;
  const cleanKey = key.replace(/^\/+/, '');
  const encoded = cleanKey
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
  return `${R2_PUBLIC_BASE}/${encoded}`;
}

function sqlString(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function isVideoUrl(url) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url ?? '');
}

function humanizeFilename(key, projectTitle) {
  const base = path.basename(key, path.extname(key));
  const clean = base
    .replace(/\.[a-f0-9]{12,}$/i, '')
    .replace(/^master-v3-grid-block-\d+-\d+-m[12]$/i, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return clean ? `${projectTitle} — ${clean}` : `${projectTitle}`;
}

function extractMasterV3Blocks(keys, prefix, projectTitle) {
  const regex = new RegExp(
    `^${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}master-v3-grid-block-(\\d+)-(\\d+)-m([12])\\.`,
    'i'
  );
  const grouped = new Map();

  for (const key of keys) {
    const match = key.match(regex);
    if (!match) continue;
    const orderIdx = Number(match[2]);
    const slot = Number(match[3]);
    const entry = grouped.get(orderIdx) ?? { orderIdx };
    if (slot === 1) entry.m1 = key;
    if (slot === 2) entry.m2 = key;
    grouped.set(orderIdx, entry);
  }

  const ordered = Array.from(grouped.values()).sort(
    (a, b) => a.orderIdx - b.orderIdx
  );

  return ordered.map((entry, idx) => {
    if (entry.m1 && entry.m2) {
      return {
        id: `block-v3-${entry.orderIdx}`,
        type: 'image-image',
        order: idx + 1,
        content: {
          media: toR2Url(entry.m1),
          media2: toR2Url(entry.m2),
          mediaType: 'image',
          mediaType2: 'image',
          alt: `${projectTitle} — frame ${entry.orderIdx}A`,
          alt2: `${projectTitle} — frame ${entry.orderIdx}B`,
        },
      };
    }

    const single = entry.m1 || entry.m2;
    return {
      id: `block-v3-${entry.orderIdx}`,
      type: 'image',
      order: idx + 1,
      content: {
        media: toR2Url(single),
        mediaType: 'image',
        alt: `${projectTitle} — visual ${entry.orderIdx}`,
      },
    };
  });
}

function pairImageBlocks(imageKeys, projectTitle, startOrder = 1) {
  const blocks = [];
  for (let i = 0; i < imageKeys.length; i += 2) {
    const first = imageKeys[i];
    const second = imageKeys[i + 1];
    const order = startOrder + blocks.length;
    if (first && second) {
      blocks.push({
        id: `block-pair-${order}`,
        type: 'image-image',
        order,
        content: {
          media: toR2Url(first),
          media2: toR2Url(second),
          mediaType: 'image',
          mediaType2: 'image',
          alt: humanizeFilename(first, projectTitle),
          alt2: humanizeFilename(second, projectTitle),
        },
      });
    } else if (first) {
      blocks.push({
        id: `block-single-${order}`,
        type: 'image',
        order,
        content: {
          media: toR2Url(first),
          mediaType: 'image',
          alt: humanizeFilename(first, projectTitle),
        },
      });
    }
  }
  return blocks;
}

export function buildRecoveredProjectBundle({
  snapshot,
  verifiedR2Keys,
}) {
  const r2Set = new Set(verifiedR2Keys);
  const projects = snapshot.projects;
  const landingPagesById = new Map(
    snapshot.landing_pages.map((lp) => [lp.id, lp])
  );

  const recoveredProjects = projects.map((project, index) => {
    const slug = project.slug;
    const lp = landingPagesById.get(project.landing_page_id);
    const mediaDir = MEDIA_DIR_BY_SLUG[slug];
    const override = COVER_OVERRIDES[slug];

    const landscapeUrl = override
      ? toR2Url(override.landscape)
      : project.url_landscape;
    const squareUrl = override ? toR2Url(override.square) : project.url_square;

    const pmGalleryKeys = mediaDir
      ? verifiedR2Keys.filter(
          (k) =>
            k.startsWith(`portfolio-media/${mediaDir}/assets-do-projeto/gallery/`) &&
            !k.endsWith('/')
        )
      : [];

    const pmLogos = mediaDir
      ? verifiedR2Keys.filter((k) =>
          k.startsWith(`portfolio-media/${mediaDir}/assets-do-projeto/home-featured-logo/`)
        )
      : [];

    const pmWebms = mediaDir
      ? verifiedR2Keys.filter(
          (k) =>
            k.startsWith(`portfolio-media/${mediaDir}/assets-do-projeto/`) &&
            k.endsWith('.webm')
        )
      : [];

    const lpPrefix = `site-assets/landing-pages/${slug}/`;
    const lpKeys = verifiedR2Keys.filter((k) => k.startsWith(lpPrefix));
    const lpHeroKey = lpKeys.find((k) =>
      path.basename(k).startsWith('master-v3-hero-')
    );
    const lpLogoKey =
      lpKeys.find((k) => path.basename(k).startsWith('master-v3-logo-')) ??
      lpKeys.find((k) => path.basename(k) === 'logo.png');

    const heroMediaUrl = lpHeroKey ? toR2Url(lpHeroKey) : landscapeUrl;
    const heroLogoUrl = lpLogoKey
      ? toR2Url(lpLogoKey)
      : pmLogos[0]
        ? toR2Url(pmLogos[0])
        : null;

    // Build landing page blocks exclusively from verified R2 objects
    const galleryBlocks = [];

    if (lpKeys.some((k) => k.includes('master-v3-grid-block-'))) {
      galleryBlocks.push(
        ...extractMasterV3Blocks(lpKeys, lpPrefix, project.title)
      );
    } else if (slug === 'nestle') {
      const nestleImages = lpKeys.filter(
        (k) => !k.endsWith('logo.png') && /\.(webp|png|jpe?g)$/i.test(k)
      );
      galleryBlocks.push(...pairImageBlocks(nestleImages, project.title, 1));
    } else if (slug === 'bidaya-parfums-scents-without-borders') {
      const bidayaImages = lpKeys.filter((k) => /\.(webp|png|jpe?g)$/i.test(k));
      galleryBlocks.push(...pairImageBlocks(bidayaImages, project.title, 1));
    }

    if (pmGalleryKeys.length > 0) {
      galleryBlocks.push(
        ...pairImageBlocks(
          pmGalleryKeys,
          project.title,
          galleryBlocks.length + 1
        )
      );
    }

    if (pmWebms.length > 0) {
      const uniqueWebms = Array.from(new Set(pmWebms));
      galleryBlocks.push({
        id: `block-video-${galleryBlocks.length + 1}`,
        type: 'video-autoplay',
        order: galleryBlocks.length + 1,
        content: {
          media: toR2Url(uniqueWebms[0]),
          mediaType: 'video',
          poster: !isVideoUrl(landscapeUrl) ? landscapeUrl : undefined,
          alt: `${project.title} — Motion Showcase`,
        },
      });
    } else if (lpHeroKey && isVideoUrl(landscapeUrl)) {
      galleryBlocks.unshift({
        id: 'block-motion-cover',
        type: 'video-autoplay',
        order: 0,
        content: {
          media: landscapeUrl,
          mediaType: 'video',
          poster: toR2Url(lpHeroKey),
          alt: `${project.title} — Campaign Film`,
        },
      });
    }

    // Reorder cleanly 1..N
    const normalizedBlocks = galleryBlocks.map((block, bIdx) => ({
      ...block,
      order: bIdx + 1,
    }));

    // Build project modal gallery list (ordered unique verified R2 URLs)
    const modalGallerySet = new Set();
    for (const k of pmGalleryKeys) modalGallerySet.add(toR2Url(k));
    if (modalGallerySet.size === 0 && lpKeys.length > 0) {
      for (const k of lpKeys) {
        if (k !== lpLogoKey && /\.(webp|png|jpe?g)$/i.test(k)) {
          modalGallerySet.add(toR2Url(k));
        }
      }
    }
    const projectGallery = Array.from(modalGallerySet).map((url) => ({
      path: url,
      alt: project.title,
      type: 'image',
    }));

    const tagLabels = (project.tags ?? []).map((t) => t.label);
    const clientName = project.client_name || project.brand_name || project.title;
    const summaryText =
      projectGallery.length > 0 || normalizedBlocks.length > 0
        ? `Projeto de ${project.project_type} desenvolvido para ${clientName} (${project.year ?? 2024}), reunindo entregas visuais e direção criativa em alta definição.`
        : `Projeto de ${project.project_type} desenvolvido para ${clientName} (${project.year ?? 2024}).`;

    const ogImageCandidate = !isVideoUrl(heroMediaUrl)
      ? heroMediaUrl
      : projectGallery[0]?.path ?? heroLogoUrl ?? heroMediaUrl;

    const nextProject = projects[(index + 1) % projects.length];

    const landingContent = {
      schema_version: '3.0',
      template: 'master-project-v3-alpa-hero',
      project_slug: slug,
      hero_cover_image: {
        src: heroMediaUrl,
        alt: `Capa de ${project.title}`,
        kind: isVideoUrl(heroMediaUrl) ? 'video' : 'image',
      },
      hero_top_media: {
        src: heroMediaUrl,
        alt: `${project.title} — Hero Media`,
        kind: isVideoUrl(heroMediaUrl) ? 'video' : 'image',
      },
      ...(heroLogoUrl
        ? {
            hero_logo_image: {
              src: heroLogoUrl,
              alt: `Logo de ${clientName}`,
              kind: 'image',
            },
            client_logo_image: {
              src: heroLogoUrl,
              alt: `Logo de ${clientName}`,
              kind: 'image',
            },
          }
        : {}),
      hero_media_type: isVideoUrl(heroMediaUrl) ? 'video' : 'image',
      project_title: project.title,
      project_subtitle: `${clientName} · ${project.project_type}`,
      project_client: clientName,
      project_year: project.year ?? 2024,
      project_tags: tagLabels,
      project_services: [project.project_type, ...tagLabels.slice(0, 2)],
      project_summary: summaryText,
      intro_headline: project.title,
      intro_body: [summaryText],
      highlight_color: '#0048ff',
      theme_color: '#0048ff',
      gallery_grid: normalizedBlocks,
      navigation: {
        back_label: 'Voltar ao Portfólio',
        next_label: nextProject.title,
        next_project_slug: nextProject.slug,
      },
      cta: {
        label: 'Vamos trabalhar juntos',
        href: '#contact',
      },
      seo: {
        description: summaryText,
        og_image: ogImageCandidate,
      },
    };

    const destination = {
      type: 'internal_landing',
      landingSlug: lp?.slug ?? slug,
    };

    return {
      project,
      landingPageId: lp?.id ?? project.landing_page_id,
      landingPageSlug: lp?.slug ?? slug,
      thumbnailPath: landscapeUrl,
      heroImagePath: heroMediaUrl,
      urlLandscape: landscapeUrl,
      urlSquare: squareUrl,
      description: summaryText,
      caseBody: summaryText,
      clientSlug: slug.split('-')[0],
      destination,
      projectGallery,
      landingContent,
    };
  });

  // Assert every candidate R2 asset URL resolves back to a verified key in 02-asset-inventory.json
  for (const item of recoveredProjects) {
    for (const url of [
      item.urlLandscape,
      item.urlSquare,
      item.thumbnailPath,
      item.heroImagePath,
    ]) {
      const key = decodeURIComponent(url.replace(`${R2_PUBLIC_BASE}/`, ''));
      if (!r2Set.has(key)) {
        throw new Error(`Unverified R2 key referenced for ${item.project.slug}: ${key}`);
      }
    }
  }

  return recoveredProjects;
}

export function generateRecoverySql(recoveredProjects) {
  const lines = [
    '-- Auto-generated by scripts/build-d1-recovery-sql.mjs',
    '-- Pure SQLite DML compatible with Cloudflare D1',
    '',
  ];

  for (const item of recoveredProjects) {
    lines.push(
      `UPDATE portfolio_projects SET` +
        ` thumbnail_path = ${sqlString(item.thumbnailPath)},` +
        ` hero_image_path = ${sqlString(item.heroImagePath)},` +
        ` url_landscape = ${sqlString(item.urlLandscape)},` +
        ` url_square = ${sqlString(item.urlSquare)},` +
        ` description = ${sqlString(item.description)},` +
        ` gallery = ${sqlString(JSON.stringify(item.projectGallery))},` +
        ` destination = ${sqlString(JSON.stringify(item.destination))},` +
        ` case_body = ${sqlString(item.caseBody)},` +
        ` client_slug = ${sqlString(item.clientSlug)}` +
        ` WHERE id = ${sqlString(item.project.id)};`
    );

    if (item.landingPageId) {
      lines.push(
        `UPDATE landing_pages SET` +
          ` cover = ${sqlString(item.heroImagePath)},` +
          ` content = ${sqlString(JSON.stringify(item.landingContent))}` +
          ` WHERE id = ${sqlString(item.landingPageId)};`
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

export function generateLocalDevSeedSql(snapshot, recoveredProjects) {
  const lines = [
    '-- Auto-generated local development/E2E seed for Cloudflare D1 (--local)',
    '',
  ];

  for (const lp of snapshot.landing_pages) {
    const recovered = recoveredProjects.find(
      (r) => r.landingPageId === lp.id
    );
    lines.push(
      `INSERT OR REPLACE INTO landing_pages (id, title, slug, cover, content) VALUES (` +
        `${sqlString(lp.id)}, ${sqlString(lp.title)}, ${sqlString(lp.slug)}, ` +
        `${sqlString(recovered?.heroImagePath ?? lp.cover)}, ` +
        `${sqlString(JSON.stringify(recovered?.landingContent ?? []))});`
    );
  }
  lines.push('');

  for (const tag of snapshot.tags) {
    lines.push(
      `INSERT OR REPLACE INTO portfolio_tags (id, slug, label, kind, sort_order) VALUES (` +
        `${sqlString(tag.id)}, ${sqlString(tag.slug)}, ${sqlString(tag.label)}, ` +
        `${sqlString(tag.kind ?? 'category')}, ${tag.sort_order ?? 0});`
    );
  }
  lines.push('');

  for (const item of recoveredProjects) {
    const p = item.project;
    lines.push(
      `INSERT OR REPLACE INTO portfolio_projects (` +
        `id, slug, client_slug, title, client_name, brand_name, year, project_type, ` +
        `description, thumbnail_path, hero_image_path, url_landscape, url_square, gallery, ` +
        `featured_on_home, featured_on_portfolio, featured_home_order, featured_portfolio_order, ` +
        `home_featured, destination, case_body, is_published, landing_page_id` +
        `) VALUES (` +
        `${sqlString(p.id)}, ${sqlString(p.slug)}, ${sqlString(item.clientSlug)}, ` +
        `${sqlString(p.title)}, ${sqlString(p.client_name)}, ${sqlString(p.brand_name)}, ` +
        `${p.year ?? 2024}, ${sqlString(p.project_type)}, ${sqlString(item.description)}, ` +
        `${sqlString(item.thumbnailPath)}, ${sqlString(item.heroImagePath)}, ` +
        `${sqlString(item.urlLandscape)}, ${sqlString(item.urlSquare)}, ` +
        `${sqlString(JSON.stringify(item.projectGallery))}, ` +
        `${p.featured_on_home ? 1 : 0}, ${p.featured_on_portfolio ? 1 : 0}, ` +
        `${p.featured_home_order ?? 'NULL'}, ${p.featured_portfolio_order ?? 'NULL'}, ` +
        `${sqlString(typeof p.home_featured === 'string' ? p.home_featured : JSON.stringify(p.home_featured ?? {}))}, ` +
        `${sqlString(JSON.stringify(item.destination))}, ${sqlString(item.caseBody)}, ` +
        `${p.is_published ? 1 : 0}, ${sqlString(item.landingPageId)});`
    );
  }
  lines.push('');

  for (const pt of snapshot.project_tags) {
    lines.push(
      `INSERT OR REPLACE INTO portfolio_project_tags (project_id, tag_id) VALUES (` +
        `${sqlString(pt.project_id)}, ${sqlString(pt.tag_id)});`
    );
  }
  lines.push('');

  for (const asset of snapshot.site_assets) {
    lines.push(
      `INSERT OR REPLACE INTO site_assets (id, key, bucket, file_path, asset_type, page, description, is_active, sort_order, metadata) VALUES (` +
        `${sqlString(asset.id)}, ${sqlString(asset.key)}, ${sqlString(asset.bucket)}, ` +
        `${sqlString(asset.file_path)}, ${sqlString(asset.asset_type)}, ${sqlString(asset.page)}, ` +
        `${sqlString(asset.description)}, ${asset.is_active ? 1 : 0}, ${asset.sort_order ?? 0}, ` +
        `${sqlString(typeof asset.metadata === 'string' ? asset.metadata : JSON.stringify(asset.metadata ?? {}))});`
    );
  }

  return lines.join('\n');
}

function main() {
  const root = process.cwd();
  const snapshot = JSON.parse(
    fs.readFileSync(
      path.join(root, 'cloudflare/seeds/canonical-d1-snapshot.json'),
      'utf8'
    )
  );
  const inventory = JSON.parse(
    fs.readFileSync(
      path.join(root, '.agents/artifacts/asset-recovery/02-asset-inventory.json'),
      'utf8'
    )
  );
  const verifiedR2Keys = Array.from(
    new Set(
      inventory.records
        .map((r) => r.matchedR2Key)
        .filter((k) => typeof k === 'string' && k.length > 0)
    )
  ).sort();

  const recovered = buildRecoveredProjectBundle({ snapshot, verifiedR2Keys });
  fs.writeFileSync(
    path.join(root, 'cloudflare/seeds/recover-portfolio-content.sql'),
    generateRecoverySql(recovered),
    'utf8'
  );
  fs.writeFileSync(
    path.join(root, 'cloudflare/seeds/local-dev-seed.sql'),
    generateLocalDevSeedSql(snapshot, recovered),
    'utf8'
  );
  // Export normalized JSON bundle usable by static fallback layer
  fs.writeFileSync(
    path.join(root, 'src/config/recovered-portfolio.json'),
    JSON.stringify(
      recovered.map((r) => ({
        ...r.project,
        client_slug: r.clientSlug,
        thumbnail_path: r.thumbnailPath,
        hero_image_path: r.heroImagePath,
        url_landscape: r.urlLandscape,
        url_square: r.urlSquare,
        description: r.description,
        case_body: r.caseBody,
        destination: r.destination,
        gallery: r.projectGallery,
        landing_page_slug: r.landingPageSlug,
        landing_page_content: r.landingContent,
      })),
      null,
      2
    ),
    'utf8'
  );
  console.log(
    `Generated recovery SQL + local seed + src/config/recovered-portfolio.json for ${recovered.length} projects.`
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}


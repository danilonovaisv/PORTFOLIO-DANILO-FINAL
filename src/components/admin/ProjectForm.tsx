'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, type Resolver, type SubmitHandler } from 'react-hook-form';

import { uploadToBucket } from '@/lib/supabase/storage';
import type { DbProject, DbTag, DbLandingPage } from '@/types/admin';
import { FieldTooltip } from '@/components/admin/FieldTooltip';
import {
  GalleryManager,
  type GalleryItem,
} from '@/components/admin/GalleryManager';
import { upsertProjectAction } from '@/app/admin/(protected)/trabalhos/actions';
import {
  PROJECT_TYPE_OPTIONS,
  projectFormSchema,
  type ProjectFormValues,
} from '@/lib/admin/schemas/project';
import {
  DEFAULT_HOME_FEATURED_CARD_STYLE,
} from '@/lib/portfolio/home-featured';
import {
  LEGACY_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
} from '@/types/project-template';

import { ProjectBasicDetailsSection } from './form-sections/ProjectBasicDetailsSection';
import { HomeFeaturedSection } from './form-sections/HomeFeaturedSection';
import { MediaUploadSection } from './form-sections/MediaUploadSection';
import { TagsSection } from './form-sections/TagsSection';

type Props = {
  project?: DbProject;
  tags: DbTag[];
  landingPages: Pick<DbLandingPage, 'id' | 'title' | 'slug' | 'content'>[];
  selectedTagIds?: string[];
};

export function ProjectForm({
  project,
  tags,
  landingPages,
  selectedTagIds = [],
}: Props) {
  const hasExistingLandscape = Boolean(
    project?.url_landscape ?? project?.thumbnail_path
  );
  const hasExistingSquare = Boolean(
    project?.url_square ?? project?.hero_image_path
  );
  
  const [landscapeVariant, setLandscapeVariant] = useState<File | null>(null);
  const [squareVariant, setSquareVariant] = useState<File | null>(null);
  const [homeFeaturedLogoVariant, setHomeFeaturedLogoVariant] =
    useState<File | null>(null);
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() =>
    Array.isArray(project?.gallery)
      ? project?.gallery.map((g, i) => ({
          id: `existing-${i}`,
          path: g.path,
          caption: g.caption,
          type: g.type as 'image' | 'video' | 'youtube' | undefined,
          youtube_video_id: g.youtube_video_id,
        }))
      : []
  );
  
  const [availableTags, setAvailableTags] = useState<DbTag[]>(() =>
    [...tags].sort((a, b) =>
      a.label.localeCompare(b.label, 'pt-BR', { sensitivity: 'base' })
    )
  );
  
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema) as Resolver<ProjectFormValues>,
    defaultValues: {
      title: project?.title ?? '',
      slug: project?.slug ?? '',
      client_name: project?.client_name ?? '',
      brand_name: project?.brand_name ?? '',
      year: project?.year ?? undefined,
      project_type: project?.project_type ?? PROJECT_TYPE_OPTIONS[0],
      short_label: project?.short_label ?? '',
      description: project?.description ?? '',
      featured_on_home: project?.featured_on_home ?? false,
      featured_on_portfolio: project?.featured_on_portfolio ?? false,
      featured_home_order: project?.featured_home_order ?? null,
      featured_portfolio_order: project?.featured_portfolio_order ?? null,
      home_featured: {
        cardStyle:
          project?.home_featured?.cardStyle ?? DEFAULT_HOME_FEATURED_CARD_STYLE,
        logoPath: project?.home_featured?.logoPath ?? null,
      },
      is_published: project?.is_published ?? true,
      landing_page_id: project?.landing_page_id ?? '',
      tags: selectedTagIds,
      destination: (project?.destination as any) ?? { type: 'modal' },
      case_body: project?.case_body ?? '',
    },
  });

  const selectedTags = form.watch('tags') || [];
  const landingPagesWithTemplate = useMemo(
    () =>
      landingPages.map((page) => {
        const template =
          page.content &&
          typeof page.content === 'object' &&
          'template' in page.content &&
          ((page.content as { template?: string }).template ===
            MASTER_PROJECT_TEMPLATE ||
            (page.content as { template?: string }).template ===
              MASTER_PROJECT_TEMPLATE_V2 ||
            (page.content as { template?: string }).template ===
              MASTER_PROJECT_TEMPLATE_V3)
            ? ((page.content as { template?: string }).template as
                | typeof MASTER_PROJECT_TEMPLATE
                | typeof MASTER_PROJECT_TEMPLATE_V2
                | typeof MASTER_PROJECT_TEMPLATE_V3)
            : LEGACY_PROJECT_TEMPLATE;

        return {
          ...page,
          template,
        };
      }),
    [landingPages]
  );

  const toErrorMessage = (err: unknown) => {
    if (err instanceof Error) return err.message;
    if (
      err &&
      typeof err === 'object' &&
      'message' in err &&
      typeof (err as { message?: unknown }).message === 'string'
    ) {
      return (err as { message: string }).message;
    }
    return 'SYSTEM_ERR: UNKNOWN_FAILURE';
  };

  const slugify = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120);

  const onSubmit: SubmitHandler<ProjectFormValues> = (values) => {
    setError(null);
    startTransition(async () => {
      try {
        let url_landscape = project?.url_landscape ?? null;
        let url_square = project?.url_square ?? null;
        const galleryEntries: Array<{
          path?: string;
          caption?: string;
          type?: 'image' | 'youtube' | 'video';
          youtube_video_id?: string;
        }> = [];

        const clientSlug = slugify(values.client_name);

        if (!landscapeVariant && !hasExistingLandscape) {
          setError('SYSTEM_ERR: ASSET_16x9_REQUIRED — UPLOAD_BEFORE_SAVE');
          return;
        }

        if (!squareVariant && !hasExistingSquare) {
          setError('SYSTEM_ERR: ASSET_1x1_REQUIRED — UPLOAD_BEFORE_SAVE');
          return;
        }

        let homeFeaturedLogoPath =
          project?.home_featured?.logoPath ??
          values.home_featured?.logoPath ??
          null;

        if (landscapeVariant) {
          url_landscape = await uploadToBucket(
            'portfolio-media',
            `${clientSlug}/${values.slug}/assets-do-projeto`,
            'cover-16x9',
            landscapeVariant,
            {
              brand: values.brand_name || values.client_name,
              project: values.slug,
              kind: 'cover-16x9',
            }
          );
        }

        if (squareVariant) {
          url_square = await uploadToBucket(
            'portfolio-media',
            `${clientSlug}/${values.slug}/assets-do-projeto`,
            'cover-1x1',
            squareVariant,
            {
              brand: values.brand_name || values.client_name,
              project: values.slug,
              kind: 'cover-1x1',
            }
          );
        }

        if (homeFeaturedLogoVariant) {
          homeFeaturedLogoPath = await uploadToBucket(
            'portfolio-media',
            `${clientSlug}/${values.slug}/assets-do-projeto/home-featured`,
            'logo-inverted',
            homeFeaturedLogoVariant,
            {
              brand: values.brand_name || values.client_name,
              project: values.slug,
              kind: 'home-featured-logo',
            }
          );
        }

        const homeFeaturedCardStyle =
          values.home_featured?.cardStyle ?? DEFAULT_HOME_FEATURED_CARD_STYLE;

        if (
          values.featured_on_home &&
          homeFeaturedCardStyle === 'ANIMATED_BG_INVERTED_LOGO' &&
          !homeFeaturedLogoPath
        ) {
          setError(
            'SYSTEM_ERR: INVERTED_LOGO_REQUIRED — ACTIVATE_ANIMATED_BG_INVERT_LOGO_LAYOUT'
          );
          return;
        }

        if (galleryItems.length > 0) {
          const uploadPromises = galleryItems.map(async (item) => {
            if (item.type === 'youtube' && item.youtube_video_id) {
              return {
                type: 'youtube' as const,
                youtube_video_id: item.youtube_video_id,
                caption: item.caption,
              };
            } else if (item.file) {
              const path = await uploadToBucket(
                'portfolio-media',
                `${clientSlug}/${values.slug}/assets-do-projeto/gallery`,
                item.file.name.replace(/\W+/g, '-'),
                item.file,
                {
                  brand: values.brand_name || values.client_name,
                  project: values.slug,
                  kind: 'gallery',
                }
              );
              if (path) {
                return {
                  path,
                  caption: item.caption,
                  type: (item.file.type.startsWith('video/')
                    ? 'video'
                    : 'image') as 'video' | 'image',
                };
              }
            } else if (item.path) {
              return {
                path: item.path,
                caption: item.caption,
                type: (item.type ||
                  (item.path.match(/\.(mp4|webm|mov)(\?.*)?$/i)
                    ? 'video'
                    : 'image')) as 'video' | 'image',
              };
            }
            return null;
          });

          const results = await Promise.all(uploadPromises);
          for (const res of results) {
            if (res) {
              galleryEntries.push(res);
            }
          }
        }

        const landingPageId =
          values.landing_page_id === '' ? null : values.landing_page_id;

        const result = await upsertProjectAction({
          id: project?.id,
          title: values.title,
          slug: values.slug,
          client_name: values.client_name,
          brand_name: values.brand_name || null,
          year: values.year ?? null,
          project_type: values.project_type,
          short_label: values.short_label || null,
          description: values.description || null,
          featured_on_home: values.featured_on_home ?? false,
          featured_on_portfolio: values.featured_on_portfolio ?? false,
          featured_home_order: values.featured_home_order ?? null,
          featured_portfolio_order: values.featured_portfolio_order ?? null,
          home_featured: {
            enabled: values.featured_on_home ?? false,
            cardStyle: homeFeaturedCardStyle,
            logoPath: homeFeaturedLogoPath,
          },
          is_published: values.is_published ?? true,
          landing_page_id: landingPageId,
          tags: selectedTags,
          thumbnail_path: project?.thumbnail_path ?? null,
          hero_image_path: project?.hero_image_path ?? null,
          url_landscape,
          url_square,
          gallery: galleryEntries,
          destination: values.destination,
          case_body: values.case_body,
        });

        if (!result.ok) {
          throw new Error(result.error ?? 'SYSTEM_ERR: UNKNOWN_SAVE_FAILURE');
        }

        router.push('/admin/trabalhos');
        router.refresh();
      } catch (err) {
        setError(toErrorMessage(err));
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <ProjectBasicDetailsSection availableTags={availableTags} />

        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
            <input type="checkbox" {...form.register('is_published')} />
            System_Publish_State
          </label>
          <label className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
            <input type="checkbox" {...form.register('featured_on_portfolio')} />
            System_Feature_Override: PORTFOLIO_HIGHLIGHT
          </label>
          <label className="flex flex-col gap-1 font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
            System_Portfolio_Order
            <input
              type="number"
              min={0}
              max={9999}
              inputMode="numeric"
              placeholder="auto"
              className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-sm text-white font-mono outline-none transition-colors focus:border-bluePrimary/50"
              {...form.register('featured_portfolio_order', {
                setValueAs: (value) =>
                  value === '' || value === null || value === undefined
                    ? null
                    : Number(value),
              })}
            />
          </label>
        </div>

        <HomeFeaturedSection
          logoPath={project?.home_featured?.logoPath}
          onChangeLogoFile={setHomeFeaturedLogoVariant}
        />

        <div className="p-6 bg-bluePrimary/[0.02] border border-white/5 rounded-md space-y-4">
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-bluePrimary">
            System_Destination_Node
          </h3>
          <label className="flex flex-col gap-2">
            <FieldTooltip
              label="System_Landing_Link"
              description="When set, clicking the card opens the dynamic /projects/[slug] page instead of the default modal."
              className="flex items-center gap-1"
            />
            <select
              className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm text-white font-mono focus:border-bluePrimary/50 outline-none transition-colors"
              {...form.register('landing_page_id')}
            >
              <option value="">System_Node_Null (Default)</option>
              {landingPagesWithTemplate.map((lp) => (
                <option key={lp.id} value={lp.id}>
                  {lp.title} (/{lp.slug}) ·{' '}
                  {lp.template === MASTER_PROJECT_TEMPLATE
                    ? 'Template Mestre V1'
                    : lp.template === MASTER_PROJECT_TEMPLATE_V3
                      ? 'Template Mestre V3'
                      : lp.template === MASTER_PROJECT_TEMPLATE_V2
                        ? 'Template Mestre V2'
                        : 'Legacy'}
                </option>
              ))}
            </select>
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-tight italic">
              System_Route_Note: When linked, project entry triggers landing page
              routing instead of modal kernel.
            </p>
          </label>
        </div>

        <MediaUploadSection
          urlLandscape={project?.url_landscape}
          urlSquare={project?.url_square}
          onChangeLandscapeFile={setLandscapeVariant}
          onChangeSquareFile={setSquareVariant}
        />

        <div className="mt-8 border-t border-white/5 pt-6">
          <label className="flex flex-col gap-4">
            <FieldTooltip
              label="System_Gallery_Orchestrator"
              description="Core portfolio assets. Drag to reorder sequence."
              className="flex items-center gap-1 font-mono font-bold text-white/60 text-xs uppercase tracking-widest"
            />
            <GalleryManager items={galleryItems} onChange={setGalleryItems} />
          </label>
        </div>

        <TagsSection
          availableTags={availableTags}
          setAvailableTags={setAvailableTags}
          onError={setError}
        />

        {error && <div className="text-sm text-red-400">{error}</div>}

        <button
          type="submit"
          className="w-full md:w-auto inline-flex items-center justify-center rounded bg-bluePrimary px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white shadow-2xl shadow-bluePrimary/20 transition-all duration-fast hover:bg-bluePrimary/90 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'SYSTEM_SYNC_IN_PROGRESS...' : 'SYSTEM_PUSH_CHANGES'}
        </button>
      </form>
    </FormProvider>
  );
}

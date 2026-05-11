'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';

import { createClientComponentClient } from '@/lib/supabase/client';
import { uploadToBucket } from '@/lib/supabase/storage';
import type { DbProject, DbTag, DbLandingPage } from '@/types/admin';
import { FieldTooltip } from '@/components/admin/FieldTooltip';
import {
  GalleryManager,
  type GalleryItem,
} from '@/components/admin/GalleryManager';
import { CaseBodyRenderer } from '@/components/portfolio/CaseBodyRenderer';
import { upsertTagAction } from '@/app/admin/(protected)/tags/actions';
import { upsertProjectAction } from '@/app/admin/(protected)/trabalhos/actions';
import {
  PROJECT_TYPE_OPTIONS,
  projectFormSchema,
  type ProjectFormValues,
} from '@/lib/admin/schemas/project';
import {
  DEFAULT_HOME_FEATURED_CARD_STYLE,
  HOME_FEATURED_CARD_STYLE_OPTIONS,
} from '@/lib/portfolio/home-featured';
import {
  LEGACY_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
} from '@/types/project-template';

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
  const [newTagLabel, setNewTagLabel] = useState('');
  const [isCreatingTag, setIsCreatingTag] = useState(false);
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
  const featuredOnHome = form.watch('featured_on_home') ?? false;
  const caseBody = form.watch('case_body') ?? '';
  const homeFeaturedCardStyle =
    form.watch('home_featured.cardStyle') ?? DEFAULT_HOME_FEATURED_CARD_STYLE;
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
        // const supabase = createClientComponentClient(); // Used ONLY for Storage uploads
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

        // Upload Logic (Client-Side)
        // Thumbnail and Hero no longer sent from UI

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
          for (const item of galleryItems) {
            if (item.type === 'youtube' && item.youtube_video_id) {
              galleryEntries.push({
                type: 'youtube',
                youtube_video_id: item.youtube_video_id,
                caption: item.caption,
              });
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
                galleryEntries.push({
                  path,
                  caption: item.caption,
                  type: item.file.type.startsWith('video/') ? 'video' : 'image',
                });
              }
            } else if (item.path) {
              galleryEntries.push({
                path: item.path,
                caption: item.caption,
                type:
                  item.type ||
                  (item.path.match(/\.(mp4|webm|mov)(\?.*)?$/i)
                    ? 'video'
                    : 'image'),
              });
            }
          }
        }

        // Clean landing_page_id
        const landingPageId =
          values.landing_page_id === '' ? null : values.landing_page_id;

        // Collect Tag IDs
        const selectedTagIds = form.watch('tags') || [];

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
          home_featured: {
            enabled: values.featured_on_home ?? false,
            cardStyle: homeFeaturedCardStyle,
            logoPath: homeFeaturedLogoPath,
          },
          is_published: values.is_published ?? true,
          landing_page_id: landingPageId,
          tags: selectedTagIds,
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

  const handleCreateTag = async () => {
    const label = newTagLabel.trim();
    if (!label) return;

    const slug = slugify(label);
    if (!slug) {
      setError('SYSTEM_ERR: INVALID_TAG_LABEL — SLUG_GENERATION_FAILED');
      return;
    }

    setIsCreatingTag(true);
    setError(null);

    try {
      await upsertTagAction({
        label,
        slug,
        kind: 'category',
      });

      const supabase = createClientComponentClient();
      const { data, error: fetchError } = await supabase
        .from('portfolio_tags')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!data) throw new Error('SYSTEM_ERR: TAG_CREATED_BUT_LOAD_FAILED');

      setAvailableTags((prev) =>
        [...prev, data].sort((a, b) =>
          a.label.localeCompare(b.label, 'pt-BR', { sensitivity: 'base' })
        )
      );
      form.setValue('tags', [...selectedTags, data.id]);
      setNewTagLabel('');
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsCreatingTag(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Title"
            description="Public name of the project displayed in the portfolio and home view."
            className="flex items-center gap-1"
          />
          <input
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
            {...form.register('title')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Slug"
            description="Unique URL identifier. Use hyphens instead of spaces."
            className="flex items-center gap-1"
          />
          <div className="flex flex-col gap-2">
            {availableTags.length > 0 && (
              <select
                className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm text-white/80 font-mono focus:border-bluePrimary/50 outline-none transition-colors"
                defaultValue=""
                onChange={(event) => {
                  const selectedSlug = event.target.value;
                  if (selectedSlug) {
                    form.setValue('slug', selectedSlug);
                  }
                }}
              >
                <option value="">SYSTEM_SELECT_TAG_SLUG</option>
                {availableTags.map((tag) => (
                  <option key={tag.id} value={tag.slug}>
                    {tag.label} — {tag.slug}
                  </option>
                ))}
              </select>
            )}
            <input
              className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
              {...form.register('slug')}
            />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Client"
            description="Brand or company name linked to the project."
            className="flex items-center gap-1"
          />
          <input
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
            {...form.register('client_name')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Brand"
            description="Optional. Use when the final brand differs from the direct client."
            className="flex items-center gap-1"
          />
          <input
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
            {...form.register('brand_name')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Year"
            description="Primary year of publication."
            className="flex items-center gap-1"
          />
          <input
            type="number"
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
            {...form.register('year')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Project_Type"
            description="Primary category for filters and editorial grid display."
            className="flex items-center gap-1"
          />
          <select
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
            {...form.register('project_type')}
          >
            {PROJECT_TYPE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <FieldTooltip
            label="System_Short_Label"
            description="Short subtitle for cards and quick context."
            className="flex items-center gap-1"
          />
          <input
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
            {...form.register('short_label')}
          />
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <FieldTooltip
            label="System_Description"
            description="Editorial summary of the case for modal and internal pages."
            className="flex items-center gap-1"
          />
          <textarea
            rows={4}
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors resize-none"
            {...form.register('description')}
          />
        </label>

        <div className="p-6 bg-bluePrimary/[0.02] border border-white/5 rounded-md space-y-6 md:col-span-2">
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-bluePrimary">
            System_Case_Structure_Nav
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <FieldTooltip
                label="System_Destination_Type"
                description="Define how the project is accessed: standard modal, dynamic landing page, or external link."
                className="flex items-center gap-1 font-mono text-[10px] text-white/60 uppercase tracking-widest"
              />
              <select
                className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm text-white font-mono focus:border-bluePrimary/50 outline-none transition-colors"
                {...form.register('destination.type')}
              >
                <option value="modal">System_Modal_Default</option>
                <option value="internal_landing">System_Landing_Dynamic</option>
                <option value="external_url">System_External_Node</option>
                <option value="page">System_Direct_Route</option>
              </select>
            </label>

            {(form.watch('destination.type') === 'external_url' ||
              form.watch('destination.type') === 'page') && (
              <label className="flex flex-col gap-2">
                <FieldTooltip
                  label="System_Destination_URL"
                  description="Full link to external destination or internal route."
                  className="flex items-center gap-1 font-mono text-[10px] text-white/60 uppercase tracking-widest"
                />
                <input
                  className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
                  {...form.register('destination.url')}
                  placeholder="https://... ou /rota"
                />
              </label>
            )}
          </div>

          <label className="flex flex-col gap-2">
            <FieldTooltip
              label="System_Case_Markdown"
              description="Long-form narrative describing process, challenges, and results."
              className="flex items-center gap-1 font-mono text-[10px] text-white/60 uppercase tracking-widest"
            />
            <textarea
              rows={12}
              className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors resize-y"
              {...form.register('case_body')}
              placeholder="Write project narrative using Markdown..."
            />
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-tight">
              Kernel_Hint: Use Copy Agent to synthesize narrative from project
              metrics.
            </p>
          </label>

          <div className="rounded border border-white/5 bg-black/20 p-6">
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
              Preview Markdown
            </p>
            {caseBody.trim() ? (
              <CaseBodyRenderer
                content={caseBody}
                className="prose-sm md:prose-base"
              />
            ) : (
              <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                System_Preview_Standby: Awaiting markdown input stream...
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
          <input type="checkbox" {...form.register('is_published')} />
          System_Publish_State
        </label>
      </div>

      <div className="rounded border border-purple-500/10 bg-purple-500/[0.02] p-6 space-y-6">
        <div className="space-y-1">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-purple-400">
            System_Featured_Home_Core
          </p>
          <p className="font-mono text-[9px] text-white/20 uppercase tracking-tight leading-relaxed">
            Exclusive configuration for Home Featured Projects. Background
            synchronization is handled dynamically via kernel seed.
          </p>
        </div>

        <label className="flex items-center gap-2 font-mono text-[10px] text-white/60 uppercase tracking-widest">
          <input type="checkbox" {...form.register('featured_on_home')} />
          System_Feature_Override: EXPOSE_ON_HOME
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <FieldTooltip
              label="System_Featured_Style"
              description="Selects only the card layout. Animated background is drawn dynamically on Home."
              className="flex items-center gap-1"
            />
            <select
              className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm text-white font-mono focus:border-bluePrimary/50 outline-none transition-colors"
              {...form.register('home_featured.cardStyle')}
              disabled={!featuredOnHome}
            >
              {HOME_FEATURED_CARD_STYLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === 'ANIMATED_BG_INVERTED_LOGO'
                    ? 'System_Layout: ANIM_BG_INVERT_LOGO'
                    : 'System_Layout: ANIM_BG_THUMB_OVERLAY'}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <FieldTooltip
              label="System_Inverted_Logo"
              description="Required only for inverted logo mode. PNG, SVG, or WebP with transparent background."
              className="flex items-center gap-1"
            />
            <input
              type="file"
              className="w-full text-[10px] font-mono text-white/30 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[9px] file:font-bold file:uppercase file:tracking-widest file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30 disabled:opacity-60 transition-all cursor-pointer"
              accept="image/png,image/svg+xml,image/webp"
              disabled={!featuredOnHome}
              onChange={(event) =>
                setHomeFeaturedLogoVariant(event.target.files?.[0] ?? null)
              }
            />
            {project?.home_featured?.logoPath ? (
              <span className="text-[10px] text-white/40 break-all font-mono">
                Current_Asset: {project.home_featured.logoPath}
              </span>
            ) : null}
            {homeFeaturedCardStyle === 'ANIMATED_BG_INVERTED_LOGO' ? (
              <p className="text-[9px] text-white/40 uppercase tracking-tight">
                System_Render_Notice: Logo is anchored in center of viewport,
                independent of hover state.
              </p>
            ) : (
              <p className="font-mono text-[9px] text-white/20 uppercase tracking-tight">
                System_Render_Notice: Thumb variant uses 5% luminance overlay on
                dynamic background.
              </p>
            )}
          </label>
        </div>
      </div>

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

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Cover_16x9"
            description="Landscape cover used for hero/full-highlight and wide containers."
            className="flex items-center gap-1"
          />
          <input
            type="file"
            className="w-full text-[11px] text-white/40 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-bluePrimary/10 file:text-bluePrimary hover:file:bg-bluePrimary/20 transition-colors cursor-pointer"
            accept="image/*,video/*"
            onChange={(e) => setLandscapeVariant(e.target.files?.[0] ?? null)}
          />
          {project?.url_landscape && (
            <span className="font-mono text-[9px] text-white/20 break-all uppercase">
              Current_Blob: {project.url_landscape}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Cover_1x1"
            description="Square cover for compact cards and dense grids."
            className="flex items-center gap-1"
          />
          <input
            type="file"
            className="w-full text-[11px] text-white/40 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-bluePrimary/10 file:text-bluePrimary hover:file:bg-bluePrimary/20 transition-colors cursor-pointer"
            accept="image/*,video/*"
            onChange={(e) => setSquareVariant(e.target.files?.[0] ?? null)}
          />
          {project?.url_square && (
            <span className="font-mono text-[9px] text-white/20 break-all uppercase">
              Current_Blob: {project.url_square}
            </span>
          )}
        </label>
      </div>
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
      <div>
        <FieldTooltip
          label="System_Tags"
          description="Used for quick highlights on cards and editorial categorization."
          className="mb-2 flex items-center gap-1"
        />
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={newTagLabel}
            onChange={(event) => setNewTagLabel(event.target.value)}
            placeholder="SYSTEM_INIT_TAG_LABEL"
            className="flex-1 min-w-0 rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
          />
          <button
            type="button"
            onClick={handleCreateTag}
            disabled={isCreatingTag || !newTagLabel.trim()}
            className="rounded-md border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            {isCreatingTag ? 'SYSTEM_INIT...' : 'SYSTEM_CREATE_TAG'}
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {availableTags.map((tag) => (
            <label
              key={tag.id}
              className="flex items-center gap-2 font-mono text-[10px] text-white/60 uppercase tracking-widest"
            >
              <input
                type="checkbox"
                value={tag.id}
                checked={selectedTags.includes(tag.id)}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  if (checked) {
                    form.setValue('tags', [...selectedTags, value]);
                  } else {
                    form.setValue(
                      'tags',
                      selectedTags.filter((id) => id !== value)
                    );
                  }
                }}
              />
              {tag.label}
            </label>
          ))}
        </div>
      </div>

      {error && <div className="text-sm text-red-400">{error}</div>}

      <button
        type="submit"
        className="w-full md:w-auto inline-flex items-center justify-center rounded bg-bluePrimary px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white shadow-2xl shadow-bluePrimary/20 transition-all duration-fast hover:bg-bluePrimary/90 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? 'SYSTEM_SYNC_IN_PROGRESS...' : 'SYSTEM_PUSH_CHANGES'}
      </button>
    </form>
  );
}

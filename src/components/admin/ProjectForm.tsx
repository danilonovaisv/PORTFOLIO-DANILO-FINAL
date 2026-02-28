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
import { upsertTagAction } from '@/app/admin/(protected)/tags/actions';
import {
  PROJECT_TYPE_OPTIONS,
  projectFormSchema,
  type ProjectFormValues,
} from '@/lib/admin/schemas/project';
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
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() =>
    Array.isArray(project?.gallery)
      ? project.gallery.map((g, i) => ({
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
    return 'Ocorreu um erro desconhecido';
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
          setError('Envie a variante 16:9 antes de salvar o projeto.');
          return;
        }

        if (!squareVariant && !hasExistingSquare) {
          setError('Envie a variante 1:1 antes de salvar o projeto.');
          return;
        }

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

        // Server Action Call
        // Dynamic import to avoid cycles or ensure correct loading if necessary,
        // but standard import is preferred. I'll add the import at the top later.
        const { upsertProjectAction } =
          await import('@/app/admin/(protected)/trabalhos/actions');

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
          throw new Error(result.error ?? 'Erro desconhecido ao salvar.');
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
      setError('Informe uma tag válida para gerar o slug.');
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
      if (!data)
        throw new Error('Tag criada, mas não foi possível carregá-la.');

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
            label="Título"
            description="Nome público do projeto exibido no portfólio e na Home."
            className="flex items-center gap-1"
          />
          <input
            className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('title')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="Slug"
            description="Identificador único da URL. Use hífen no lugar de espaços."
            className="flex items-center gap-1"
          />
          <div className="flex flex-col gap-2">
            {availableTags.length > 0 && (
              <select
                className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm text-slate-200"
                defaultValue=""
                onChange={(event) => {
                  const selectedSlug = event.target.value;
                  if (selectedSlug) {
                    form.setValue('slug', selectedSlug);
                  }
                }}
              >
                <option value="">Usar slug das tags existentes</option>
                {availableTags.map((tag) => (
                  <option key={tag.id} value={tag.slug}>
                    {tag.label} — {tag.slug}
                  </option>
                ))}
              </select>
            )}
            <input
              className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
              {...form.register('slug')}
            />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="Cliente"
            description="Nome da marca ou empresa vinculada ao trabalho."
            className="flex items-center gap-1"
          />
          <input
            className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('client_name')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="Marca"
            description="Opcional. Use quando a marca final for diferente do cliente direto."
            className="flex items-center gap-1"
          />
          <input
            className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('brand_name')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="Ano"
            description="Ano principal de publicação do trabalho."
            className="flex items-center gap-1"
          />
          <input
            type="number"
            className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('year')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="Tipo de projeto"
            description="Categoria principal para filtros e exibição no grid editorial."
            className="flex items-center gap-1"
          />
          <select
            className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('project_type')}
          >
            {PROJECT_TYPE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <FieldTooltip
            label="Short label"
            description="Subtítulo curto para cards e contexto rápido."
            className="flex items-center gap-1"
          />
          <input
            className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('short_label')}
          />
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <FieldTooltip
            label="Descrição"
            description="Resumo editorial do case para modal e páginas internas."
            className="flex items-center gap-1"
          />
          <textarea
            rows={4}
            className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('description')}
          />
        </label>

        <div className="p-6 bg-indigo-500/5 border border-white/5 rounded-xl space-y-4 md:col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400/80">
            Estrutura do Case & Navegação
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <FieldTooltip
                label="Tipo de Destino"
                description="Define como o projeto será aberto ao ser clicado: modal padrão, landing page dinâmica ou link externo."
                className="flex items-center gap-1 font-medium text-slate-200"
              />
              <select
                className="w-full rounded-md bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white"
                {...form.register('destination.type')}
              >
                <option value="modal">Modal (Padrão)</option>
                <option value="internal_landing">Landing Page Interna</option>
                <option value="external_url">URL Externa</option>
                <option value="page">Página Direta</option>
              </select>
            </label>

            {(form.watch('destination.type') === 'external_url' ||
              form.watch('destination.type') === 'page') && (
              <label className="flex flex-col gap-2">
                <FieldTooltip
                  label="URL de Destino"
                  description="Link completo para o destino externo ou rota interna."
                  className="flex items-center gap-1 font-medium text-slate-200"
                />
                <input
                  className="w-full rounded-md bg-slate-950 border border-white/10 px-3 py-2 text-sm"
                  {...form.register('destination.url')}
                  placeholder="https://... ou /rota"
                />
              </label>
            )}
          </div>

          <label className="flex flex-col gap-2">
            <FieldTooltip
              label="Corpo do Case (Markdown)"
              description="Texto longo e detalhado descrevendo o processo, desafios e resultados do projeto."
              className="flex items-center gap-1 font-medium text-slate-200"
            />
            <textarea
              rows={8}
              className="w-full rounded-md bg-slate-950 border border-white/10 px-3 py-2 text-sm font-mono"
              {...form.register('case_body')}
              placeholder="Escreva a narrativa do projeto usando Markdown..."
            />
            <p className="text-[10px] text-slate-500">
              Dica: Use o Agent de Copy para gerar este conteúdo a partir das
              informações do projeto.
            </p>
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" {...form.register('featured_on_home')} />
          Destaque Home
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" {...form.register('is_published')} />
          Publicado
        </label>
      </div>

      <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400">
          Página de Destino (Link Interno)
        </h3>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="Landing Page vinculada"
            description="Quando definida, o clique no card abre a página dinâmica /projects/[slug] em vez do modal padrão."
            className="flex items-center gap-1"
          />
          <select
            className="w-full rounded-md bg-slate-900 border border-white/10 px-3 py-2 text-sm text-white"
            {...form.register('landing_page_id')}
          >
            <option value="">Nenhuma (Default)</option>
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
          <p className="text-[10px] text-slate-500 italic">
            Quando vinculado, o clique no trabalho abrirá a Landing Page
            customizada em vez de uma visualização padrão.
          </p>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="Capa 16:9 (obrigatória)"
            description="Variante horizontal usada em hero/full-highlight e containers amplos."
            className="flex items-center gap-1"
          />
          <input
            type="file"
            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            accept="image/*,video/*"
            onChange={(e) => setLandscapeVariant(e.target.files?.[0] ?? null)}
          />
          {project?.url_landscape && (
            <span className="text-xs text-slate-400 break-all">
              Atual: {project.url_landscape}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="Capa 1:1 (obrigatória)"
            description="Variante quadrada para cards compactos e grid denso."
            className="flex items-center gap-1"
          />
          <input
            type="file"
            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            accept="image/*,video/*"
            onChange={(e) => setSquareVariant(e.target.files?.[0] ?? null)}
          />
          {project?.url_square && (
            <span className="text-xs text-slate-400 break-all">
              Atual: {project.url_square}
            </span>
          )}
        </label>
      </div>
      <div className="mt-8 border-t border-white/5 pt-6">
        <label className="flex flex-col gap-4">
          <FieldTooltip
            label="Galeria (gerenciador de peças)"
            description="Peças completas do portfólio. As peças podem ser reordenadas arrastando."
            className="flex items-center gap-1 font-semibold text-slate-200 text-lg"
          />
          <GalleryManager items={galleryItems} onChange={setGalleryItems} />
        </label>
      </div>
      <div>
        <FieldTooltip
          label="Tags"
          description="Usadas para highlights rápidos no card e categorização editorial."
          className="mb-2 flex items-center gap-1"
        />
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={newTagLabel}
            onChange={(event) => setNewTagLabel(event.target.value)}
            placeholder="Criar nova tag"
            className="flex-1 min-w-0 rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleCreateTag}
            disabled={isCreatingTag || !newTagLabel.trim()}
            className="rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {isCreatingTag ? 'Criando...' : 'Criar tag'}
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {availableTags.map((tag) => (
            <label
              key={tag.id}
              className="flex items-center gap-2 text-sm text-slate-200"
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
        className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-600 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? 'Salvando...' : 'Salvar projeto'}
      </button>
    </form>
  );
}

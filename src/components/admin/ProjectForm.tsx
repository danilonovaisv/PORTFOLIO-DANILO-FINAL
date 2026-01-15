'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { createClientComponentClient } from '@/lib/supabase/client';
import { uploadToBucket } from '@/lib/supabase/storage';
import type { DbProject, DbTag } from '@/types/admin';

const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  client_name: z.string().min(2),
  brand_name: z.string().optional(),
  year: z.coerce.number().int().optional(),
  project_type: z.string().min(2),
  short_label: z.string().optional(),
  description: z.string().optional(),
  featured_on_home: z.boolean().optional(),
  featured_on_portfolio: z.boolean().optional(),
  featured_home_order: z.coerce.number().int().optional().nullable(),
  featured_portfolio_order: z.coerce.number().int().optional().nullable(),
  is_published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof projectSchema>;

type Props = {
  project?: DbProject;
  tags: DbTag[];
  selectedTagIds?: string[];
};

export function ProjectForm({ project, tags, selectedTagIds = [] }: Props) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [hero, setHero] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(projectSchema) as Resolver<FormValues>,
    defaultValues: {
      title: project?.title ?? '',
      slug: project?.slug ?? '',
      client_name: project?.client_name ?? '',
      brand_name: project?.brand_name ?? '',
      year: project?.year ?? undefined,
      project_type: project?.project_type ?? 'Branding & Identity',
      short_label: project?.short_label ?? '',
      description: project?.description ?? '',
      featured_on_home: project?.featured_on_home ?? false,
      featured_on_portfolio: project?.featured_on_portfolio ?? false,
      featured_home_order: project?.featured_home_order ?? undefined,
      featured_portfolio_order: project?.featured_portfolio_order ?? undefined,
      is_published: project?.is_published ?? true,
      tags: selectedTagIds,
    },
  });

  const selectedTags = form.watch('tags') || [];

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setError(null);
    startTransition(async () => {
      try {
        const supabase = createClientComponentClient();
        let thumbnail_path = project?.thumbnail_path ?? null;
        let hero_image_path = project?.hero_image_path ?? null;
        const galleryEntries: Array<{ path: string }> = Array.isArray(
          project?.gallery
        )
          ? project?.gallery?.map((item) => ({ path: item.path }))
          : [];

        if (thumbnail) {
          thumbnail_path = await uploadToBucket(
            'portfolio-media',
            `projects/${values.slug}`,
            'thumb',
            thumbnail
          );
        }

        if (hero) {
          hero_image_path = await uploadToBucket(
            'portfolio-media',
            `projects/${values.slug}`,
            'hero',
            hero
          );
        }

        if (gallery.length > 0) {
          for (const file of gallery) {
            const path = await uploadToBucket(
              'portfolio-media',
              `projects/${values.slug}/gallery`,
              file.name.replace(/\W+/g, '-'),
              file
            );
            galleryEntries.push({ path });
          }
        }

        const { tags: formTags = [], ...payloadData } = values;
        const { data, error: upsertError } = await supabase
          .from('portfolio_projects')
          .upsert(
            {
              id: project?.id,
              ...payloadData,
              gallery: galleryEntries,
              thumbnail_path,
              hero_image_path,
            },
            { onConflict: 'id' }
          )
          .select()
          .single();

        if (upsertError) throw upsertError;

        if (data?.id) {
          await supabase
            .from('portfolio_project_tags')
            .delete()
            .eq('project_id', data.id);
          const tagIds = formTags.length > 0 ? formTags : selectedTags;
          if (tagIds.length > 0) {
            await supabase.from('portfolio_project_tags').insert(
              tagIds.map((tagId) => ({
                project_id: data.id,
                tag_id: tagId,
              }))
            );
          }
        }

        router.push('/admin/trabalhos');
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Ocorreu um erro desconhecido'
        );
      }
    });
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Título</span>
          <input
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('title')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Slug</span>
          <div className="flex flex-col gap-2">
            {tags.length > 0 && (
              <select
                className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm text-slate-200"
                defaultValue=""
                onChange={(event) => {
                  const selectedSlug = event.target.value;
                  if (selectedSlug) {
                    form.setValue('slug', selectedSlug);
                  }
                }}
              >
                <option value="">Usar slug das tags existentes</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.slug}>
                    {tag.label} — {tag.slug}
                  </option>
                ))}
              </select>
            )}
            <input
              className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
              {...form.register('slug')}
            />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Cliente</span>
          <input
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('client_name')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Marca</span>
          <input
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('brand_name')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Ano</span>
          <input
            type="number"
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('year')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Tipo de projeto</span>
          <select
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('project_type')}
          >
            <option>Branding & Identity</option>
            <option>Campanhas & Advertising</option>
            <option>Web & Digital</option>
            <option>Motion & Video</option>
            <option>Institucional & Retail</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm text-slate-300">Short label</span>
          <input
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('short_label')}
          />
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm text-slate-300">Descrição</span>
          <textarea
            rows={4}
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('description')}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" {...form.register('featured_on_home')} />
          Destaque Home
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" {...form.register('featured_on_portfolio')} />
          Destaque Portfólio
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" {...form.register('is_published')} />
          Publicado
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Ordem Home</span>
          <input
            type="number"
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('featured_home_order')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Ordem Portfólio</span>
          <input
            type="number"
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('featured_portfolio_order')}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Thumbnail</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
          />
          {project?.thumbnail_path && (
            <span className="text-xs text-slate-400 break-all">
              {project.thumbnail_path}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Hero image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setHero(e.target.files?.[0] ?? null)}
          />
          {project?.hero_image_path && (
            <span className="text-xs text-slate-400 break-all">
              {project.hero_image_path}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Galeria</span>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => setGallery(Array.from(e.target.files ?? []))}
          />
          {Array.isArray(project?.gallery) && project.gallery.length > 0 && (
            <span className="text-xs text-slate-400">
              {project.gallery.length} itens já cadastrados
            </span>
          )}
        </label>
      </div>

      <div>
        <p className="text-sm text-slate-300 mb-2">Tags</p>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
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

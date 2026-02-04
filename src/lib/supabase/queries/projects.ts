import { createClient } from '@/lib/supabase/server';
import type { DbProject, DbTag } from '@/types/admin';
import type { SupabaseClient } from '@supabase/supabase-js';

type ProjectFilters = {
  tagSlug?: string;
  year?: number;
  search?: string;
  includeUnpublished?: boolean;
  featuredOnHome?: boolean;
  featuredOnPortfolio?: boolean;
};

export type DbProjectWithTags = DbProject & {
  tags?: Array<{ tag: DbTag } | null> | null;
  landing_page?: { slug: string } | null;
};

export async function listProjects(
  filters: ProjectFilters = {},
  supabaseClient?: SupabaseClient
) {
  const supabase = supabaseClient ?? (await createClient());

  let query = supabase
    .from('portfolio_projects')
    .select(
      '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind)), landing_page:landing_pages(slug)'
    )
    .order('featured_portfolio_order', { ascending: true, nullsFirst: false });

  if (!filters.includeUnpublished) {
    query = query.eq('is_published', true);
  }

  if (filters.tagSlug) {
    query = query.eq('tags.tag.slug', filters.tagSlug);
  }

  if (filters.year) {
    query = query.eq('year', filters.year);
  }

  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,client_name.ilike.%${filters.search}%`
    );
  }

  if (filters.featuredOnHome) {
    query = query.eq('featured_on_home', true);
  }

  if (filters.featuredOnPortfolio) {
    query = query.eq('featured_on_portfolio', true);
  }

  const { data, error } = await query.returns<DbProjectWithTags[]>();
  if (error) throw error;
  return data;
}

export async function getProject(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select(
      '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))'
    )
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as DbProject;
}

export async function upsertProject(
  payload: Partial<DbProject> & { id?: string; tagIds?: string[] }
) {
  const supabase = await createClient();

  const { tagIds, ...projectData } = payload;

  const { data, error } = await supabase
    .from('portfolio_projects')
    .upsert(projectData, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;

  if (tagIds && data?.id) {
    await supabase
      .from('portfolio_project_tags')
      .delete()
      .eq('project_id', data.id);
    if (tagIds.length > 0) {
      const relations = tagIds.map((tagId) => ({
        project_id: data.id,
        tag_id: tagId,
      }));
      const { error: relError } = await supabase
        .from('portfolio_project_tags')
        .insert(relations);
      if (relError) throw relError;
    }
  }

  return data as DbProject;
}

export async function togglePublish(formData: FormData) {
  'use server';
  const projectId = formData.get('id') as string;
  const nextStatus = (formData.get('nextStatus') as string) === 'true';
  const supabase = await createClient();
  const { error } = await supabase
    .from('portfolio_projects')
    .update({ is_published: nextStatus })
    .eq('id', projectId);
  if (error) throw error;
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('portfolio_projects')
    .delete()
    .eq('id', projectId);
  if (error) throw error;
}

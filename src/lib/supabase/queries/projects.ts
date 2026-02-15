import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import { createClient } from '@/lib/supabase/server';
import type { TablesInsert } from '@/lib/supabase.types';
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
  landing_page_slug?: string | null;
  landing_page?: { slug?: string | null } | null;
};

export async function listProjects(
  filters: ProjectFilters = {},
  supabaseClient?: SupabaseClient
) {
  const supabase = supabaseClient ?? (await createClient());

  // [REF] Zero Deploy: Use public_projects_view (No-Select Rule)
  // public_projects_view filters is_published=true by default.
  let query = supabase
    .from('public_projects_view')
    .select(
      '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))'
    );

  // [NOTE] includeUnpublished is now ignored for public lists.
  // Admin tools must use a separate admin-only query function.

  if (filters.tagSlug) {
    // public_projects_view inherits relations if properly defined.
    // Based on curl test, standard joining works.
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
    // Use the view's column for sorting
    query = query.order('featured_home_order', {
      ascending: true,
      nullsFirst: false,
    });
  } else if (filters.featuredOnPortfolio) {
    query = query.eq('featured_on_portfolio', true);
    query = query.order('featured_portfolio_order', {
      ascending: true,
      nullsFirst: false,
    });
  } else {
    // Default sort
    query = query.order('year', { ascending: false });
  }

  const { data, error } = await query.returns<DbProjectWithTags[]>();
  if (error) throw error;
  return data;
}

export async function getProject(id: string) {
  const supabase = await createClient();
  // [REF] Zero Deploy: Use public_projects_view
  const { data, error } = await supabase
    .from('public_projects_view')
    .select(
      '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))'
    )
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as DbProject;
}

export async function upsertProject(
  payload: TablesInsert<'portfolio_projects'> & {
    id?: string;
    tagIds?: string[];
  }
) {
  const { supabase, user } = await requireAdminAccess();

  const { tagIds, ...projectData } = payload;

  const { data, error } = await supabase
    .from('portfolio_projects')
    .upsert(projectData, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    await logAdminAudit(supabase, user, {
      action: payload.id ? 'project.update' : 'project.create',
      resource: 'portfolio_projects',
      resourceId: payload.id ?? null,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

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

  await logAdminAudit(supabase, user, {
    action: payload.id ? 'project.update' : 'project.create',
    resource: 'portfolio_projects',
    resourceId: data?.id ?? payload.id ?? null,
    status: 'success',
  });

  return data as DbProject;
}

export async function deleteProject(projectId: string) {
  const { supabase, user } = await requireAdminAccess();
  const { error } = await supabase
    .from('portfolio_projects')
    .delete()
    .eq('id', projectId);
  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'project.delete',
      resource: 'portfolio_projects',
      resourceId: projectId,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }
  await logAdminAudit(supabase, user, {
    action: 'project.delete',
    resource: 'portfolio_projects',
    resourceId: projectId,
    status: 'success',
  });
}

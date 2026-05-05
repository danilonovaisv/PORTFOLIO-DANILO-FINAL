import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import { createClient } from '@/lib/supabase/server';
import type { TablesInsert, Database } from '@/lib/supabase.types';
import type { DbProject, DbTag } from '@/types/admin';
import type { SupabaseClient } from '@supabase/supabase-js';

type ProjectFilters = {
  tagSlug?: string;
  year?: number;
  search?: string;
  projectTypes?: string[];
  includeUnpublished?: boolean;
  featuredOnHome?: boolean;
  featuredOnPortfolio?: boolean;
};

type Pagination = {
  page?: number; // 1-based
  pageSize?: number;
};

export type DbProjectWithTags = DbProject & {
  tags?: Array<{ tag: DbTag } | null> | null;
  landing_page_slug?: string | null;
  landing_page?: { slug?: string | null } | null;
};

export async function listProjects(
  filters: ProjectFilters = {},
  supabaseClient?: SupabaseClient<Database>
) {
  const supabase = supabaseClient ?? (await createClient());

  // [REF] Zero Deploy: Use public_projects_view (No-Select Rule)
  // public_projects_view filters is_published=true by default.
  const selectQuery = filters.tagSlug
    ? '*, tags:portfolio_project_tags!inner(tag:portfolio_tags!inner(id, slug, label, kind))'
    : '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))';

  let query = supabase.from('public_projects_view').select(selectQuery);

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

  if (filters.projectTypes?.length) {
    query = query.in('project_type', filters.projectTypes);
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
    // Default sort - Ensure featured projects appear first and respect their order
    query = query
      .order('featured_on_portfolio', { ascending: false, nullsFirst: false })
      .order('featured_portfolio_order', { ascending: true, nullsFirst: false })
      .order('year', { ascending: false });
  }

  // Cast needed: let query re-assignment prevents TS from propagating the Database generic
  const result = (await (query as any).returns()) as {
    data: DbProjectWithTags[] | null;
    error: { message: string } | null;
  };
  if (result.error) throw result.error;
  return (result.data ?? []) as DbProjectWithTags[];
}

// Paginado opcional: retorna itens e contagem total para UX.
export async function listProjectsPaged(
  filters: ProjectFilters = {},
  pagination: Pagination = {},
  supabaseClient?: SupabaseClient<Database>
) {
  const supabase = supabaseClient ?? (await createClient());

  const selectQuery = filters.tagSlug
    ? '*, tags:portfolio_project_tags!inner(tag:portfolio_tags!inner(id, slug, label, kind))'
    : '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))';

  const { page = 1, pageSize } = pagination;
  const useRange = pageSize && pageSize > 0;

  let query = supabase
    .from('public_projects_view')
    .select(selectQuery, { count: 'exact' });

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

  if (filters.projectTypes?.length) {
    query = query.in('project_type', filters.projectTypes);
  }

  if (filters.featuredOnHome) {
    query = query.eq('featured_on_home', true);
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
    query = query
      .order('featured_on_portfolio', { ascending: false, nullsFirst: false })
      .order('featured_portfolio_order', { ascending: true, nullsFirst: false })
      .order('year', { ascending: false });
  }

  if (useRange) {
    const from = (page - 1) * pageSize!;
    const to = from + pageSize! - 1;
    query = query.range(from, to);
  }

  const result = (await (query as any).returns()) as {
    data: DbProjectWithTags[] | null;
    error: { message: string } | null;
    count: number | null;
  };
  if (result.error) throw result.error;

  return {
    data: result.data as DbProjectWithTags[],
    count: result.count ?? result.data?.length ?? 0,
  };
}

export async function upsertProject(
  payload: TablesInsert<'portfolio_projects'> & {
    id?: string;
    tagIds?: string[];
  }
) {
  const { supabase, user } = await requireAdminAccess({
    requireServiceRole: true,
  });

  const { tagIds, ...projectData } = payload;

  const { data, error } = await supabase
    .from('portfolio_projects')
    .upsert(projectData, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    const errorDetails = {
      message: error.message,
      code: (error as any).code,
      details: (error as any).details,
      hint: (error as any).hint,
    };

    await logAdminAudit(supabase, user, {
      action: payload.id ? 'project.update' : 'project.create',
      resource: 'portfolio_projects',
      resourceId: payload.id ?? null,
      status: 'error',
      errorMessage: `${error.message}${errorDetails.code ? ` [${errorDetails.code}]` : ''}`,
    });
    console.error('[Supabase Query Error] upsertProject failed:', errorDetails);
    throw error;
  }

  if (tagIds && data?.id) {
    await supabase
      .from('portfolio_project_tags')
      .delete()
      .eq('project_id', data.id);
    if (tagIds.length > 0) {
      const relations = tagIds.map((tagId: string) => ({
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
  const { supabase, user } = await requireAdminAccess({
    requireServiceRole: true,
  });
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

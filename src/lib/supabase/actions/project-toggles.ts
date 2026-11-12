'use server';

import { revalidatePath } from 'next/cache';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import { getD1Database } from '@/lib/d1/client';
import { toggleProjectColumnInD1 } from '@/lib/d1/admin';

function parseTogglePayload(formData: FormData) {
  const projectId = formData.get('id');
  const nextStatus = formData.get('nextStatus');

  if (typeof projectId !== 'string' || typeof nextStatus !== 'string') {
    throw new Error('Invalid toggle payload.');
  }

  return {
    projectId,
    enabled: nextStatus === 'true',
  };
}

function revalidateProjectSurfaces() {
  revalidatePath('/admin/trabalhos');
  revalidatePath('/');
  revalidatePath('/portfolio');
}

export async function togglePublish(formData: FormData) {
  const { projectId, enabled } = parseTogglePayload(formData);
  const { supabase, user } = await requireAdminAccess();
  const d1 = await getD1Database();

  if (d1) {
    await toggleProjectColumnInD1(d1, projectId, 'is_published', enabled);
    revalidateProjectSurfaces();
    return;
  }

  const { error } = await supabase
    .from('portfolio_projects')
    .update({ is_published: enabled })
    .eq('id', projectId);

  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'project.toggle_publish',
      resource: 'portfolio_projects',
      resourceId: projectId,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

  await logAdminAudit(supabase, user, {
    action: 'project.toggle_publish',
    resource: 'portfolio_projects',
    resourceId: projectId,
    status: 'success',
    metadata: { is_published: enabled },
  });

  revalidateProjectSurfaces();
}

export async function toggleFeaturedOnPortfolio(formData: FormData) {
  const { projectId, enabled } = parseTogglePayload(formData);
  const { supabase, user } = await requireAdminAccess();
  const d1 = await getD1Database();

  if (d1) {
    await toggleProjectColumnInD1(
      d1,
      projectId,
      'featured_on_portfolio',
      enabled
    );
    revalidateProjectSurfaces();
    return;
  }

  const { error } = await supabase
    .from('portfolio_projects')
    .update({ featured_on_portfolio: enabled })
    .eq('id', projectId);

  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'project.toggle_featured_on_portfolio',
      resource: 'portfolio_projects',
      resourceId: projectId,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

  await logAdminAudit(supabase, user, {
    action: 'project.toggle_featured_on_portfolio',
    resource: 'portfolio_projects',
    resourceId: projectId,
    status: 'success',
    metadata: { featured_on_portfolio: enabled },
  });

  revalidateProjectSurfaces();
}

export async function toggleFeaturedOnHome(formData: FormData) {
  const { projectId, enabled } = parseTogglePayload(formData);
  const { supabase, user } = await requireAdminAccess();
  const d1 = await getD1Database();

  if (d1) {
    await toggleProjectColumnInD1(d1, projectId, 'featured_on_home', enabled);
    revalidateProjectSurfaces();
    return;
  }

  const { error } = await supabase
    .from('portfolio_projects')
    .update({ featured_on_home: enabled })
    .eq('id', projectId);

  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'project.toggle_featured_on_home',
      resource: 'portfolio_projects',
      resourceId: projectId,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

  await logAdminAudit(supabase, user, {
    action: 'project.toggle_featured_on_home',
    resource: 'portfolio_projects',
    resourceId: projectId,
    status: 'success',
    metadata: { featured_on_home: enabled },
  });

  revalidateProjectSurfaces();
}

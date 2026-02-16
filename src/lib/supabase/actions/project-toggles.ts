'use server';

import { revalidatePath } from 'next/cache';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';

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

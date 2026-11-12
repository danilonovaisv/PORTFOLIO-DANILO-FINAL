'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import type { TablesInsert, TablesUpdate } from '@/lib/supabase.types';
import { landingPageMutationSchema } from '@/lib/admin/schemas/landing-page';

export type SaveLandingPageInput = z.infer<typeof landingPageMutationSchema>;

export async function listLandingPagesAction() {
  try {
    const { supabase } = await requireAdminAccess();
    const { data, error } = await supabase
      .from('landing_pages')
      .select('id, title, slug, created_at, content')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
    if (error) {
      console.warn(
        '[listLandingPagesAction] Supabase query warning:',
        error.message
      );
    }
  } catch (err) {
    console.warn(
      '[listLandingPagesAction] Supabase connection failed, attempting D1 fallback:',
      err instanceof Error ? err.message : err
    );
  }

  // Fallback para Cloudflare D1 Database
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as { DB?: any })?.DB;
    if (db) {
      const stmt = db.prepare(
        'SELECT id, title, slug, created_at, content FROM landing_pages ORDER BY created_at DESC'
      );
      const { results } = await stmt.all();
      if (results && results.length > 0) {
        return results.map((row: any) => ({
          ...row,
          content:
            typeof row.content === 'string'
              ? JSON.parse(row.content || '[]')
              : row.content,
        }));
      }
    }
  } catch (d1Err) {
    console.warn(
      '[listLandingPagesAction] D1 fallback failed:',
      d1Err instanceof Error ? d1Err.message : d1Err
    );
  }

  return [];
}

export async function getLandingPageAction(id: string) {
  const parsedId = z.string().uuid().parse(id);
  try {
    const { supabase } = await requireAdminAccess();
    const { data, error } = await supabase
      .from('landing_pages')
      .select('id, title, slug, cover, content')
      .eq('id', parsedId)
      .single();

    if (!error && data) return data;
  } catch (err) {
    console.warn(
      '[getLandingPageAction] Supabase query failed, trying D1 fallback:',
      err instanceof Error ? err.message : err
    );
  }

  // Fallback para Cloudflare D1 Database
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as { DB?: any })?.DB;
    if (db) {
      const stmt = db
        .prepare(
          'SELECT id, title, slug, cover, content FROM landing_pages WHERE id = ?'
        )
        .bind(parsedId);
      const row = await stmt.first();
      if (row) {
        return {
          ...row,
          content:
            typeof (row as any).content === 'string'
              ? JSON.parse((row as any).content || '[]')
              : (row as any).content,
        };
      }
    }
  } catch (d1Err) {
    console.warn(
      '[getLandingPageAction] D1 fallback failed:',
      d1Err instanceof Error ? d1Err.message : d1Err
    );
  }

  return null;
}

export async function saveLandingPageAction(input: SaveLandingPageInput) {
  const parsed = landingPageMutationSchema.parse(input);
  const { supabase, user } = await requireAdminAccess({
    requireServiceRole: true,
  });

  const payload: TablesUpdate<'landing_pages'> = {
    title: parsed.title,
    slug: parsed.slug,
    cover: parsed.cover ?? null,
    content: parsed.content,
  };

  if (parsed.id) {
    const { error } = await supabase
      .from('landing_pages')
      .update(payload)
      .eq('id', parsed.id);

    if (error) {
      await logAdminAudit(supabase, user, {
        action: 'landing_page.update',
        resource: 'landing_pages',
        resourceId: parsed.id,
        status: 'error',
        errorMessage: error.message,
      });
      throw error;
    }

    await logAdminAudit(supabase, user, {
      action: 'landing_page.update',
      resource: 'landing_pages',
      resourceId: parsed.id,
      status: 'success',
    });

    revalidatePath('/admin/landing-pages');
    revalidatePath('/portfolio');
    revalidatePath('/');
    revalidatePath(`/projects/${parsed.slug}`);
    return { ok: true as const, id: parsed.id };
  }

  const insertPayload: TablesInsert<'landing_pages'> = {
    title: parsed.title,
    slug: parsed.slug,
    cover: parsed.cover ?? null,
    content: parsed.content,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('landing_pages')
    .insert(insertPayload)
    .select('id')
    .single();

  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'landing_page.create',
      resource: 'landing_pages',
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

  await logAdminAudit(supabase, user, {
    action: 'landing_page.create',
    resource: 'landing_pages',
    resourceId: data?.id ?? null,
    status: 'success',
  });

  revalidatePath('/admin/landing-pages');
  revalidatePath('/portfolio');
  revalidatePath('/');
  revalidatePath(`/projects/${parsed.slug}`);
  return { ok: true as const, id: data.id };
}

export async function deleteLandingPageAction(id: string) {
  const parsedId = z.string().uuid().parse(id);
  const { supabase, user } = await requireAdminAccess({
    requireServiceRole: true,
  });

  // Capture slug BEFORE delete so we can revalidate the public landing route.
  const { data: existing } = await supabase
    .from('landing_pages')
    .select('slug')
    .eq('id', parsedId)
    .maybeSingle();

  const { error } = await supabase
    .from('landing_pages')
    .delete()
    .eq('id', parsedId);

  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'landing_page.delete',
      resource: 'landing_pages',
      resourceId: parsedId,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

  await logAdminAudit(supabase, user, {
    action: 'landing_page.delete',
    resource: 'landing_pages',
    resourceId: parsedId,
    status: 'success',
  });

  revalidatePath('/admin/landing-pages');
  revalidatePath('/portfolio');
  revalidatePath('/');
  if (existing?.slug) {
    revalidatePath(`/projects/${existing.slug}`);
  }
  return { ok: true as const };
}

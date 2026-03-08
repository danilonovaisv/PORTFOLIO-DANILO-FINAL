'use server';

import { revalidatePath } from 'next/cache';
import { buildAbsoluteAuthUrl } from '@/lib/auth/redirects';
import { logAdminAudit } from '@/lib/admin/audit';
import {
  getAdminAppMetadataRole,
  normalizeAdminUserRole,
  type AdminUserRole,
  type AdminUserStatus,
} from '@/lib/admin/admin-users';
import { requireAdminAccess } from '@/lib/admin/server-access';
import {
  normalizeTokenProvider,
  type AdminTokenEnvironment,
  type AdminTokenStatus,
} from '@/lib/admin/tokens';

type ActionResult = {
  ok: boolean;
  error?: string;
  message?: string;
};

type TokenPayload = {
  name: string;
  provider: string;
  description?: string;
  secret?: string;
  status: AdminTokenStatus;
  environment: AdminTokenEnvironment;
};

type AdminUserPayload = {
  email: string;
  fullName: string;
  role: AdminUserRole;
  status: AdminUserStatus;
};

const DISABLED_BAN_DURATION = '876000h';

const normalizeText = (value?: string | null) => value?.trim() ?? '';

async function ensureTokenTableReady(supabase: Awaited<ReturnType<typeof requireAdminAccess>>['supabase']) {
  const { error } = await supabase.from('admin_tokens').select('id').limit(1);
  if (error) {
    throw new Error(
      'Tabela admin_tokens indisponivel. Execute as migrations pendentes do Supabase antes de usar o CRUD de tokens.'
    );
  }
}

async function ensureLastOwnerGuard(
  supabase: Awaited<ReturnType<typeof requireAdminAccess>>['supabase'],
  targetUserId: string
) {
  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('role', 'owner');

  if (error) {
    throw new Error(error.message);
  }

  const remainingOwners = (data ?? []).filter((row) => row.user_id !== targetUserId);
  if (remainingOwners.length === 0) {
    throw new Error('Nao e permitido remover ou rebaixar o ultimo owner do dashboard ADMIN.');
  }
}

async function syncAdminRow(
  supabase: Awaited<ReturnType<typeof requireAdminAccess>>['supabase'],
  userId: string,
  role: AdminUserRole
) {
  const { error } = await supabase.from('admin_users').upsert(
    {
      user_id: userId,
      role,
    },
    { onConflict: 'user_id' }
  );

  if (error) {
    throw new Error(error.message);
  }
}

async function revokeAdminRow(
  supabase: Awaited<ReturnType<typeof requireAdminAccess>>['supabase'],
  userId: string
) {
  const { error } = await supabase.from('admin_users').delete().eq('user_id', userId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function createAdminToken(input: TokenPayload): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireAdminAccess({
      requireServiceRole: true,
    });
    await ensureTokenTableReady(supabase);

    const name = normalizeText(input.name);
    const provider = normalizeTokenProvider(input.provider);
    const secret = normalizeText(input.secret);

    if (!name || !provider || !secret) {
      return { ok: false, error: 'Nome, provider e valor do token sao obrigatorios.' };
    }

    const { error } = await supabase.from('admin_tokens').insert({
      name,
      provider,
      description: normalizeText(input.description) || null,
      secret,
      status: input.status,
      environment: input.environment,
        created_by: user?.id ?? null,
        updated_by: user?.id ?? null,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    await logAdminAudit(supabase, user, {
      action: 'admin_token.create',
      resource: 'admin_tokens',
      status: 'success',
      metadata: { provider, environment: input.environment, name },
    });

    revalidatePath('/admin/settings');
    return { ok: true, message: 'Token criado com sucesso.' };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erro desconhecido ao criar token.',
    };
  }
}

export async function updateAdminToken(
  tokenId: string,
  input: TokenPayload
): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireAdminAccess({
      requireServiceRole: true,
    });
    await ensureTokenTableReady(supabase);

    const { data: existing, error: existingError } = await supabase
      .from('admin_tokens')
      .select('*')
      .eq('id', tokenId)
      .maybeSingle();

    if (existingError) {
      return { ok: false, error: existingError.message };
    }

    if (!existing) {
      return { ok: false, error: 'Token nao encontrado.' };
    }

    const name = normalizeText(input.name);
    const provider = normalizeTokenProvider(input.provider);
    const nextSecret = normalizeText(input.secret) || existing.secret;

    if (!name || !provider || !nextSecret) {
      return { ok: false, error: 'Nome, provider e valor do token sao obrigatorios.' };
    }

    const { error } = await supabase
      .from('admin_tokens')
      .update({
        name,
        provider,
        description: normalizeText(input.description) || null,
        secret: nextSecret,
        status: input.status,
        environment: input.environment,
        updated_by: user?.id ?? null,
      })
      .eq('id', tokenId);

    if (error) {
      return { ok: false, error: error.message };
    }

    await logAdminAudit(supabase, user, {
      action: 'admin_token.update',
      resource: 'admin_tokens',
      resourceId: tokenId,
      status: 'success',
      metadata: { provider, environment: input.environment, name },
    });

    revalidatePath('/admin/settings');
    return { ok: true, message: 'Token atualizado com sucesso.' };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erro desconhecido ao atualizar token.',
    };
  }
}

export async function deleteAdminToken(tokenId: string): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireAdminAccess({
      requireServiceRole: true,
    });
    await ensureTokenTableReady(supabase);

    const { error } = await supabase.from('admin_tokens').delete().eq('id', tokenId);
    if (error) {
      return { ok: false, error: error.message };
    }

    await logAdminAudit(supabase, user, {
      action: 'admin_token.delete',
      resource: 'admin_tokens',
      resourceId: tokenId,
      status: 'success',
    });

    revalidatePath('/admin/settings');
    return { ok: true, message: 'Token excluido com sucesso.' };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erro desconhecido ao excluir token.',
    };
  }
}

export async function testAdminToken(tokenId: string): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireAdminAccess({
      requireServiceRole: true,
    });
    await ensureTokenTableReady(supabase);

    const { data, error } = await supabase
      .from('admin_tokens')
      .select('*')
      .eq('id', tokenId)
      .maybeSingle();

    if (error) {
      return { ok: false, error: error.message };
    }

    if (!data) {
      return { ok: false, error: 'Token nao encontrado.' };
    }

    if (data.provider !== 'openai') {
      return {
        ok: false,
        error: 'Teste automatico disponivel apenas para tokens com provider "openai".',
      };
    }

    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${data.secret}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const body = await response.text();
      await logAdminAudit(supabase, user, {
        action: 'admin_token.test',
        resource: 'admin_tokens',
        resourceId: tokenId,
        status: 'error',
        errorCode: `http_${response.status}`,
        errorMessage: body.slice(0, 300),
      });
      return {
        ok: false,
        error: `Falha ao validar token OpenAI (${response.status}).`,
      };
    }

    await logAdminAudit(supabase, user, {
      action: 'admin_token.test',
      resource: 'admin_tokens',
      resourceId: tokenId,
      status: 'success',
      metadata: { provider: data.provider },
    });

    return { ok: true, message: 'Token validado com sucesso.' };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erro desconhecido ao testar token.',
    };
  }
}

export async function createAdminUser(input: AdminUserPayload): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireAdminAccess({
      requireServiceRole: true,
    });

    const email = normalizeText(input.email).toLowerCase();
    const fullName = normalizeText(input.fullName);
    const role = normalizeAdminUserRole(input.role);

    if (!email || !fullName) {
      return { ok: false, error: 'Nome e email sao obrigatorios.' };
    }

    const listed = await supabase.auth.admin.listUsers({ page: 1, perPage: 500 });
    if (listed.error) {
      return { ok: false, error: listed.error.message };
    }

    const existing = listed.data.users.find(
      (entry) => entry.email?.toLowerCase() === email
    );

    let targetUserId = existing?.id ?? null;

    if (!existing) {
      const invited = await supabase.auth.admin.inviteUserByEmail(email, {
        data: { full_name: fullName },
        redirectTo: buildAbsoluteAuthUrl('/admin/login'),
      });

      if (invited.error || !invited.data.user) {
        return { ok: false, error: invited.error?.message ?? 'Falha ao convidar usuario.' };
      }

      targetUserId = invited.data.user.id;
    }

    if (!targetUserId) {
      return { ok: false, error: 'Nao foi possivel resolver o usuario administrativo.' };
    }

    const userUpdate = await supabase.auth.admin.updateUserById(targetUserId, {
      email,
      app_metadata: {
        ...(existing?.app_metadata ?? {}),
        role: getAdminAppMetadataRole(role),
        admin_access: true,
      },
      user_metadata: {
        ...(existing?.user_metadata ?? {}),
        full_name: fullName,
      },
      ban_duration: input.status === 'disabled' ? DISABLED_BAN_DURATION : 'none',
    });

    if (userUpdate.error) {
      return { ok: false, error: userUpdate.error.message };
    }

    await syncAdminRow(supabase, targetUserId, role);

    await logAdminAudit(supabase, user, {
      action: 'admin_user.create',
      resource: 'admin_users',
      resourceId: targetUserId,
      status: 'success',
      metadata: { email, role, status: input.status },
    });

    revalidatePath('/admin/settings');
    return {
      ok: true,
      message: existing
        ? 'Usuario existente promovido para ADMIN.'
        : 'Convite administrativo enviado com sucesso.',
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erro desconhecido ao criar usuario ADMIN.',
    };
  }
}

export async function updateAdminUser(
  userId: string,
  input: AdminUserPayload
): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireAdminAccess({
      requireServiceRole: true,
    });

    const role = normalizeAdminUserRole(input.role);
    const email = normalizeText(input.email).toLowerCase();
    const fullName = normalizeText(input.fullName);

    if (!email || !fullName) {
      return { ok: false, error: 'Nome e email sao obrigatorios.' };
    }

    const currentUser = await supabase.auth.admin.getUserById(userId);
    if (currentUser.error || !currentUser.data.user) {
      return { ok: false, error: currentUser.error?.message ?? 'Usuario nao encontrado.' };
    }

    const { data: currentRow } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (
      currentRow?.role === 'owner' &&
      (role !== 'owner' || input.status === 'disabled')
    ) {
      await ensureLastOwnerGuard(supabase, userId);
    }

    const updateResult = await supabase.auth.admin.updateUserById(userId, {
      email,
      app_metadata: {
        ...(currentUser.data.user.app_metadata ?? {}),
        role: getAdminAppMetadataRole(role),
        admin_access: true,
      },
      user_metadata: {
        ...(currentUser.data.user.user_metadata ?? {}),
        full_name: fullName,
      },
      ban_duration: input.status === 'disabled' ? DISABLED_BAN_DURATION : 'none',
    });

    if (updateResult.error) {
      return { ok: false, error: updateResult.error.message };
    }

    await syncAdminRow(supabase, userId, role);

    await logAdminAudit(supabase, user, {
      action: 'admin_user.update',
      resource: 'admin_users',
      resourceId: userId,
      status: 'success',
      metadata: { email, role, status: input.status },
    });

    revalidatePath('/admin/settings');
    return { ok: true, message: 'Usuario ADMIN atualizado com sucesso.' };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erro desconhecido ao atualizar usuario ADMIN.',
    };
  }
}

export async function deleteAdminUser(userId: string): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireAdminAccess({
      requireServiceRole: true,
    });

    const currentUser = await supabase.auth.admin.getUserById(userId);
    if (currentUser.error || !currentUser.data.user) {
      return { ok: false, error: currentUser.error?.message ?? 'Usuario nao encontrado.' };
    }

    const { data: currentRow } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (currentRow?.role === 'owner') {
      await ensureLastOwnerGuard(supabase, userId);
    }

    const nextAppMetadata = { ...(currentUser.data.user.app_metadata ?? {}) };
    delete nextAppMetadata.role;
    delete nextAppMetadata.admin_access;

    const revoke = await supabase.auth.admin.updateUserById(userId, {
      app_metadata: nextAppMetadata,
    });

    if (revoke.error) {
      return { ok: false, error: revoke.error.message };
    }

    await revokeAdminRow(supabase, userId);

    await logAdminAudit(supabase, user, {
      action: 'admin_user.delete',
      resource: 'admin_users',
      resourceId: userId,
      status: 'success',
      metadata: { email: currentUser.data.user.email ?? null },
    });

    revalidatePath('/admin/settings');
    return { ok: true, message: 'Acesso ADMIN removido com sucesso.' };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erro desconhecido ao excluir usuario ADMIN.',
    };
  }
}

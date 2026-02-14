import type { User } from '@supabase/supabase-js';

const ADMIN_ROLES = new Set(['admin', 'owner', 'super_admin']);

function parseAllowedEmails(): Set<string> {
  const raw = process.env.ADMIN_ALLOWED_EMAILS ?? '';
  return new Set(
    raw
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function isAdminUser(user: User | null | undefined): boolean {
  if (!user) return false;

  const appRole = user.app_metadata?.role;
  if (typeof appRole === 'string' && ADMIN_ROLES.has(appRole.toLowerCase())) {
    return true;
  }

  const userRole = user.user_metadata?.role;
  if (typeof userRole === 'string' && ADMIN_ROLES.has(userRole.toLowerCase())) {
    return true;
  }

  if (user.email) {
    const allowedEmails = parseAllowedEmails();
    if (allowedEmails.has(user.email.toLowerCase())) {
      return true;
    }
  }

  return false;
}

export function shouldEnforceAdminRole(): boolean {
  const value = process.env.ADMIN_ENFORCE_ROLE?.trim().toLowerCase();
  return value !== 'false' && value !== '0' && value !== 'off';
}

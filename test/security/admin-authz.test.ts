import { isAdminUser, shouldEnforceAdminRole } from '@/lib/admin/authz';

describe('admin authz helpers', () => {
  const previousEnforceRole = process.env.ADMIN_ENFORCE_ROLE;
  const previousAllowedEmails = process.env.ADMIN_ALLOWED_EMAILS;

  afterEach(() => {
    process.env.ADMIN_ENFORCE_ROLE = previousEnforceRole;
    process.env.ADMIN_ALLOWED_EMAILS = previousAllowedEmails;
  });

  it('accepts app_metadata admin roles', () => {
    const user = {
      app_metadata: { role: 'admin' },
      user_metadata: {},
      email: 'user@domain.com',
    } as any;

    expect(isAdminUser(user)).toBe(true);
  });

  it('accepts app_metadata owner role', () => {
    const user = {
      app_metadata: { role: 'owner' },
      user_metadata: {},
      email: 'user@domain.com',
    } as any;

    expect(isAdminUser(user)).toBe(true);
  });

  it('accepts allowlisted admin emails', () => {
    process.env.ADMIN_ALLOWED_EMAILS = 'admin@domain.com,ops@domain.com';
    const user = {
      app_metadata: {},
      user_metadata: {},
      email: 'ops@domain.com',
    } as any;

    expect(isAdminUser(user)).toBe(true);
  });

  it('rejects non-admin users', () => {
    process.env.ADMIN_ALLOWED_EMAILS = 'admin@domain.com';
    const user = {
      app_metadata: { role: 'editor' },
      user_metadata: {},
      email: 'viewer@domain.com',
    } as any;

    expect(isAdminUser(user)).toBe(false);
  });

  it('enforces role checks by default', () => {
    delete process.env.ADMIN_ENFORCE_ROLE;
    expect(shouldEnforceAdminRole()).toBe(true);
  });

  it('supports disabling role enforcement by env flag', () => {
    process.env.ADMIN_ENFORCE_ROLE = 'false';
    expect(shouldEnforceAdminRole()).toBe(false);
  });
});

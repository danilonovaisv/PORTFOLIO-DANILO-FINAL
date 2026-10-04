import {
  assertAdminAccess,
  requireAdminAccess,
  AdminAccessError,
} from '@/lib/admin/server-access';
import { createClient } from '@/lib/supabase/server';

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

describe('admin server access guard', () => {
  const previousEnforceRole = process.env.ADMIN_ENFORCE_ROLE;
  const previousAllowedEmails = process.env.ADMIN_ALLOWED_EMAILS;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env.ADMIN_ENFORCE_ROLE = previousEnforceRole;
    process.env.ADMIN_ALLOWED_EMAILS = previousAllowedEmails;
  });

  describe('assertAdminAccess', () => {
    it('throws unauthorized when user is missing', () => {
      expect(() => assertAdminAccess(null)).toThrow(AdminAccessError);
      expect(() => assertAdminAccess(null)).toThrow(/UNAUTHORIZED/i);
    });

    it('throws forbidden when user is not admin and enforcement is enabled', () => {
      process.env.ADMIN_ENFORCE_ROLE = 'true';
      process.env.ADMIN_ALLOWED_EMAILS = '';
      const user = {
        email: 'viewer@domain.com',
        app_metadata: {},
        user_metadata: {},
      } as any;

      expect(() => assertAdminAccess(user)).toThrow(AdminAccessError);
      expect(() => assertAdminAccess(user)).toThrow(/FORBIDDEN/i);
    });

    it('allows non-admin user when enforcement is disabled', () => {
      process.env.ADMIN_ENFORCE_ROLE = 'false';
      const user = {
        email: 'viewer@domain.com',
        app_metadata: {},
        user_metadata: {},
      } as any;

      expect(() => assertAdminAccess(user)).not.toThrow();
    });
  });

  describe('requireAdminAccess', () => {
    it('throws unauthorized when createClient fails to initialize', async () => {
      (createClient as jest.Mock).mockRejectedValueOnce(
        new Error('MISSING_ENV')
      );

      await expect(requireAdminAccess()).rejects.toThrow(
        /SUPABASE_CLIENT_UNAVAILABLE/i
      );
    });

    it('throws unauthorized when getUser returns an error', async () => {
      const mockClient = {
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: { user: null },
            error: { message: 'jwt expired' },
          }),
        },
      };
      (createClient as jest.Mock).mockResolvedValueOnce(mockClient);

      await expect(requireAdminAccess()).rejects.toThrow(AdminAccessError);
    });

    it('returns service_role client when admin client succeeds', async () => {
      process.env.ADMIN_ENFORCE_ROLE = 'false';
      const mockUser = { id: 'admin-1', email: 'danilo@portfolio.com' };
      const requestClient = {
        auth: {
          getUser: jest
            .fn()
            .mockResolvedValue({ data: { user: mockUser }, error: null }),
        },
      };
      const adminClient = {
        auth: {},
        from: jest.fn(),
      };

      (createClient as jest.Mock)
        .mockResolvedValueOnce(requestClient)
        .mockResolvedValueOnce(adminClient);

      const result = await requireAdminAccess();
      expect(result.privilegeLevel).toBe('service_role');
      expect(result.user).toEqual(mockUser);
      expect(result.supabase).toBe(adminClient);
    });

    it('falls back to request_scoped when admin client fails', async () => {
      process.env.ADMIN_ENFORCE_ROLE = 'false';
      const mockUser = { id: 'admin-1', email: 'danilo@portfolio.com' };
      const requestClient = {
        auth: {
          getUser: jest
            .fn()
            .mockResolvedValue({ data: { user: mockUser }, error: null }),
        },
      };

      (createClient as jest.Mock)
        .mockResolvedValueOnce(requestClient)
        .mockRejectedValueOnce(new Error('No service role key'));

      const result = await requireAdminAccess();
      expect(result.privilegeLevel).toBe('request_scoped');
      expect(result.user).toEqual(mockUser);
      expect(result.supabase).toBe(requestClient);
    });

    it('throws forbidden when requireServiceRole is true but service_role is unavailable', async () => {
      process.env.ADMIN_ENFORCE_ROLE = 'false';
      const mockUser = { id: 'admin-1', email: 'danilo@portfolio.com' };
      const requestClient = {
        auth: {
          getUser: jest
            .fn()
            .mockResolvedValue({ data: { user: mockUser }, error: null }),
        },
      };

      (createClient as jest.Mock)
        .mockResolvedValueOnce(requestClient)
        .mockRejectedValueOnce(new Error('No service role key'));

      await expect(
        requireAdminAccess({ requireServiceRole: true })
      ).rejects.toThrow(/SERVICE_ROLE_REQUIRED/i);
    });
  });
});

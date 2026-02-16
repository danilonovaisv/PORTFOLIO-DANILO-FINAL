import { buildAdminAuditRecord } from '@/lib/admin/audit';

describe('admin audit payload', () => {
  it('builds consistent audit payload for authenticated user', () => {
    const user = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'admin@domain.com',
    } as any;

    const record = buildAdminAuditRecord(user, {
      action: 'tag.create',
      resource: 'portfolio_tags',
      resourceId: '00000000-0000-0000-0000-000000000010',
      status: 'success',
      metadata: { source: 'admin-ui' },
    });

    expect(record.actor_user_id).toBe(user.id);
    expect(record.actor_email).toBe(user.email);
    expect(record.action).toBe('tag.create');
    expect(record.resource).toBe('portfolio_tags');
    expect(record.resource_id).toBe('00000000-0000-0000-0000-000000000010');
    expect(record.status).toBe('success');
    expect(record.metadata).toEqual({ source: 'admin-ui' });
  });

  it('truncates long error fields to avoid oversized log entries', () => {
    const longError = 'x'.repeat(800);
    const record = buildAdminAuditRecord(null, {
      action: 'project.update',
      resource: 'portfolio_projects',
      status: 'error',
      errorCode: 'invalid'.repeat(40),
      errorMessage: longError,
    });

    expect(record.error_code).not.toBeNull();
    expect(record.error_message).not.toBeNull();
    expect((record.error_code ?? '').length).toBeLessThanOrEqual(120);
    expect((record.error_message ?? '').length).toBeLessThanOrEqual(500);
  });
});

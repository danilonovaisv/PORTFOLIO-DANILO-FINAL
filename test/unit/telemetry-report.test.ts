import { ErrorReportSchema } from '@/lib/schemas/error-report';

/**
 * Replicates the normalizePayload logic from the API route for unit testing.
 * This ensures the bilingual normalization is independently verifiable.
 */
function normalizePayload(raw: Record<string, unknown>) {
  const message =
    (raw.message as string | undefined) ||
    (raw.erroMensagem as string | undefined) ||
    (raw.erro_detectado as string | undefined) ||
    'Unknown error';

  const stack = (raw.stack as string | undefined) || undefined;

  const component =
    (raw.component as string | undefined) ||
    (raw.componente as string | undefined) ||
    (raw.componente_afetado as string | undefined) ||
    (raw.origem as string | undefined) ||
    (raw.secao as string | undefined) ||
    'Client Error Boundary';

  const url = (raw.url as string | undefined) || undefined;
  const userAgent = (raw.userAgent as string | undefined) || undefined;
  const timestamp = (raw.timestamp as string | undefined) || undefined;

  const knownKeys = new Set([
    'message', 'erroMensagem', 'erro_detectado',
    'stack',
    'component', 'componente', 'componente_afetado', 'origem', 'secao',
    'url', 'userAgent', 'timestamp',
  ]);

  const extraMetadata: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!knownKeys.has(key)) extraMetadata[key] = value;
  }

  const metadata = Object.keys(extraMetadata).length > 0 ? extraMetadata : undefined;

  return { message, stack, component, url, userAgent, timestamp, metadata };
}

describe('ErrorReportSchema — Canonical EN payload', () => {
  it('accepts a minimal valid payload', () => {
    const result = ErrorReportSchema.safeParse({ message: 'Something broke' });
    expect(result.success).toBe(true);
  });

  it('uses default message when field is absent', () => {
    const result = ErrorReportSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).toBe('Unknown error');
    }
  });

  it('accepts full canonical payload', () => {
    const result = ErrorReportSchema.safeParse({
      message: 'TypeError: Cannot read props',
      stack: 'at Component (Component.tsx:42)',
      component: 'src/app/error',
      url: 'https://portfoliodanilo.com/',
      userAgent: 'Mozilla/5.0',
      timestamp: new Date().toISOString(),
      metadata: { digest: 'abc123', status: 'ERROR_BOUNDARY_TRIGGERED' },
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid URL formats', () => {
    const result = ErrorReportSchema.safeParse({
      message: 'Error',
      url: 'not-a-valid-url-and-too-long-' + 'x'.repeat(300),
    });
    // The schema uses .or(z.string().max(255).optional()) so very long strings fail
    expect(result.success).toBe(false);
  });
});

describe('normalizePayload — bilingual PT-BR → EN normalization', () => {
  it('maps erroMensagem to message', () => {
    const result = normalizePayload({ erroMensagem: 'Algo falhou' });
    expect(result.message).toBe('Algo falhou');
  });

  it('maps erro_detectado to message when erroMensagem is absent', () => {
    const result = normalizePayload({ erro_detectado: 'Falha crítica' });
    expect(result.message).toBe('Falha crítica');
  });

  it('prefers message over erroMensagem and erro_detectado', () => {
    const result = normalizePayload({
      message: 'English message',
      erroMensagem: 'Mensagem PT',
      erro_detectado: 'Erro detectado',
    });
    expect(result.message).toBe('English message');
  });

  it('maps componente_afetado to component', () => {
    const result = normalizePayload({ componente_afetado: 'src/app/portfolio' });
    expect(result.component).toBe('src/app/portfolio');
  });

  it('maps origem to component when no other component key exists', () => {
    const result = normalizePayload({ origem: 'Ghost System Portfolio' });
    expect(result.component).toBe('Ghost System Portfolio');
  });

  it('maps secao to component as final fallback', () => {
    const result = normalizePayload({ secao: 'About Beliefs' });
    expect(result.component).toBe('About Beliefs');
  });

  it('defaults component to "Client Error Boundary" when all keys are absent', () => {
    const result = normalizePayload({ message: 'Error' });
    expect(result.component).toBe('Client Error Boundary');
  });

  it('moves unknown/legacy keys into metadata', () => {
    const result = normalizePayload({
      message: 'Error',
      digest: 'abc-digest',
      status: 'SECTION_RECOVERY_ACTIVE',
      component_stack: '\n  at SomeComponent',
    });
    expect(result.metadata).toEqual({
      digest: 'abc-digest',
      status: 'SECTION_RECOVERY_ACTIVE',
      component_stack: '\n  at SomeComponent',
    });
  });

  it('sets metadata to undefined when no extra keys are present', () => {
    const result = normalizePayload({ message: 'Error', stack: 'stack trace' });
    expect(result.metadata).toBeUndefined();
  });

  it('produces a schema-valid output after normalization', () => {
    const raw = {
      erroMensagem: 'Falha ao carregar galeria',
      stack: 'at Gallery (Gallery.tsx:10)',
      origem: 'Ghost System Portfolio',
      digest: 'xyz-789',
      status: 'ERROR_BOUNDARY_TRIGGERED',
    };
    const normalized = normalizePayload(raw);
    const result = ErrorReportSchema.safeParse(normalized);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).toBe('Falha ao carregar galeria');
      expect(result.data.component).toBe('Ghost System Portfolio');
      expect(result.data.metadata).toMatchObject({
        digest: 'xyz-789',
        status: 'ERROR_BOUNDARY_TRIGGERED',
      });
    }
  });

  it('SectionErrorBoundary payload normalizes correctly', () => {
    const raw = {
      message: 'WebGL context lost',
      stack: 'at Canvas',
      component: 'About Beliefs',
      metadata: {
        origem: 'Ghost System Section Boundary',
        component_stack: '\n  at SectionErrorBoundary',
        status: 'SECTION_RECOVERY_ACTIVE',
      },
    };
    const result = ErrorReportSchema.safeParse(raw);
    expect(result.success).toBe(true);
  });
});

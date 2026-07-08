export const runtime = 'edge';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { ErrorReportSchema } from '@/lib/schemas/error-report';

/**
 * Normalizes raw error payloads from all error boundaries (legacy PT-BR keys
 * and canonical EN keys) into a single unified shape before Zod validation.
 *
 * Supported legacy keys:
 *   erroMensagem, erro_detectado  → message
 *   componente, componente_afetado, origem, secao → component
 *
 * All remaining/unknown keys are folded into `metadata` for full fidelity.
 */
function normalizePayload(raw: Record<string, unknown>) {
  // Canonical message resolution (EN → PT-BR fallback chain)
  const message =
    (raw.message as string | undefined) ||
    (raw.erroMensagem as string | undefined) ||
    (raw.erro_detectado as string | undefined) ||
    'Unknown error';

  // Canonical stack (same key in all senders)
  const stack = (raw.stack as string | undefined) || undefined;

  // Canonical component resolution
  const component =
    (raw.component as string | undefined) ||
    (raw.componente as string | undefined) ||
    (raw.componente_afetado as string | undefined) ||
    (raw.origem as string | undefined) ||
    (raw.secao as string | undefined) ||
    'Client Error Boundary';

  // URL is always passed as-is
  const url = (raw.url as string | undefined) || undefined;

  // userAgent is passed in or derived server-side (injected later)
  const userAgent = (raw.userAgent as string | undefined) || undefined;

  // Timestamp (fall through to default in schema)
  const timestamp = (raw.timestamp as string | undefined) || undefined;

  // Collect all extra/legacy keys into metadata for diagnostic fidelity
  const knownKeys = new Set([
    'message',
    'erroMensagem',
    'erro_detectado',
    'stack',
    'component',
    'componente',
    'componente_afetado',
    'origem',
    'secao',
    'url',
    'userAgent',
    'timestamp',
  ]);

  const extraMetadata: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!knownKeys.has(key)) {
      extraMetadata[key] = value;
    }
  }

  const metadata =
    Object.keys(extraMetadata).length > 0 ? extraMetadata : undefined;

  return { message, stack, component, url, userAgent, timestamp, metadata };
}

export async function POST(req: Request) {
  try {
    const rawBody = (await req.json()) as Record<string, unknown>;

    // 1. Bilingual normalization — translate legacy PT-BR keys → canonical EN schema
    const normalized = normalizePayload(rawBody);

    // Inject server-side userAgent if not provided by client
    if (!normalized.userAgent) {
      normalized.userAgent = req.headers.get('user-agent') ?? undefined;
    }

    // 2. Validate normalized payload against canonical Zod schema
    const result = ErrorReportSchema.safeParse(normalized);

    if (!result.success) {
      console.warn(
        '[api/report-error] Invalid error payload received:',
        result.error.format()
      );
      return NextResponse.json(
        { error: 'INVALID_PAYLOAD', details: result.error.issues },
        { status: 400 }
      );
    }

    const report = result.data;
    const timestamp = new Date().toISOString();

    // 3. Server-side structured logging (Secure — no PII from raw body)
    console.error('[api/report-error] Client Exception captured:', {
      captured_at: timestamp,
      message: report.message,
      component: report.component,
      url: report.url,
      stack_preview: report.stack?.slice(0, 300),
      metadata: report.metadata,
    });

    // 4. Persistence — non-blocking, graceful degradation
    try {
      const supabase = await createClient();
      const { error: dbError } = await supabase.from('client_errors').insert([
        {
          error_data: report,
          captured_at: timestamp,
          severity: 'high',
          source: 'browser',
        },
      ]);

      if (dbError) {
        console.warn(
          '[api/report-error] Database persistence failed:',
          dbError
        );
      }
    } catch (dbErr) {
      console.warn(
        '[api/report-error] Persistence service unavailable:',
        dbErr
      );
    }

    return NextResponse.json(
      { ok: true, reportId: timestamp },
      { status: 200 }
    );
  } catch (err) {
    console.error('[api/report-error] Critical failure in route handler:', err);
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}

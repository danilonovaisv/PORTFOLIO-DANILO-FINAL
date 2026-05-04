import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { ErrorReportSchema } from '@/lib/schemas/error-report';

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    
    // 1. Validate Payload
    const result = ErrorReportSchema.safeParse(rawBody);
    
    if (!result.success) {
      console.warn('[api/report-error] Invalid error payload received:', result.error.format());
      return NextResponse.json(
        { error: 'INVALID_PAYLOAD', details: result.error.issues },
        { status: 400 }
      );
    }

    const report = result.data;
    const timestamp = new Date().toISOString();

    // 2. Server-side structured logging (Secure)
    console.error('[api/report-error] Client Exception captured:', {
      captured_at: timestamp,
      ...report
    });

    // 3. Persistence Attempt
    try {
      const supabase = await createClient();
      const { error: dbError } = await supabase.from('client_errors').insert([{
        error_data: report,
        captured_at: timestamp,
        severity: 'high', // Default for client reports
        source: 'browser'
      }]);

      if (dbError) {
        console.warn('[api/report-error] Database persistence failed:', dbError);
      }
    } catch (dbErr) {
      // Non-blocking failure for persistence
      console.warn('[api/report-error] Persistence service unavailable:', dbErr);
    }

    return NextResponse.json({ ok: true, reportId: timestamp }, { status: 200 });
  } catch (err) {
    console.error('[api/report-error] Critical failure in route handler:', err);
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}

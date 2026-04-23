import { z } from 'zod';

export type ActionResponse<T = any> =
  | { ok: true; data: T }
  | { ok: false; error: string; issues?: string[] };

/**
 * Returns a standardized error response without exposing sensitive details,
 * but maintaining technical information useful for the Admin interface.
 */
export function errorResponse(
  message: string,
  error?: unknown
): ActionResponse {
  console.error(`[Admin Action Error] ${message}`, error);

  const isProduction = process.env.NODE_ENV === 'production';

  let details = '';
  let code = '';
  let hint = '';

  if (error && typeof error === 'object') {
    details = (error as any).message || (error as any).details || '';
    code = (error as any).code || '';
    hint = (error as any).hint || '';
  } else if (error instanceof Error) {
    details = error.message;
  }

  if (isProduction) {
    return {
      ok: false,
      error: code ? `[${code}] ${message}` : message,
    };
  }

  const finalMessage = details ? `${message} Details: ${details}` : message;
  const fullError = code ? `[${code}] ${finalMessage}` : finalMessage;

  return {
    ok: false,
    error: hint ? `${fullError} (Hint: ${hint})` : fullError,
  };
}

/**
 * Helper to format Zod errors.
 */
export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.join('.');
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join('; ');
}

/**
 * Validates a payload against a schema and returns typed data or standardized error.
 */
export function validatePayload<T>(
  schema: z.Schema<T>,
  payload: unknown
):
  | { success: true; data: T }
  | {
      success: false;
      response: { ok: false; error: string; issues?: string[] };
    } {
  const result = schema.safeParse(payload);
  if (!result.success) {
    return {
      success: false,
      response: {
        ok: false,
        error: `INVALID_PAYLOAD: ${formatZodError(result.error)}`,
      },
    };
  }
  return { success: true, data: result.data };
}

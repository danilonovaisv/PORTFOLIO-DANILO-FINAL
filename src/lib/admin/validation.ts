import { z } from 'zod';

export type ActionResponse<T = any> =
  | { ok: true; data: T }
  | { ok: false; error: string; issues?: string[] };

/**
 * Retorna uma resposta de erro padronizada sem expor detalhes sensíveis,
 * mas mantendo informações técnicas úteis para o Admin.
 */
export function errorResponse(
  message: string,
  error?: unknown
): ActionResponse {
  console.error(`[Admin Action Error] ${message}`, error);

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

  const finalMessage = details ? `${message} Detalhes: ${details}` : message;
  const fullError = code ? `[${code}] ${finalMessage}` : finalMessage;

  return {
    ok: false,
    error: hint ? `${fullError} (Dica: ${hint})` : fullError,
  };
}

/**
 * Helper para formatar erros do Zod.
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
 * Valida um payload contra um schema e retorna o dado tipado ou erro padronizado.
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
        error: `Dados inválidos: ${formatZodError(result.error)}`,
      },
    };
  }
  return { success: true, data: result.data };
}

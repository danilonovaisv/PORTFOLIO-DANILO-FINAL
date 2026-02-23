import { z } from 'zod';

export type ActionResponse<T = any> =
  | { ok: true; data: T }
  | { ok: false; error: string; issues?: string[] };

/**
 * Retorna uma resposta de erro padronizada sem expor detalhes sensíveis.
 */
export function errorResponse(
  message: string,
  error?: unknown
): ActionResponse {
  console.error(`[Admin Action Error] ${message}`, error);

  // No futuro, podemos mapear erros específicos (ex: Supabase, OpenAI) aqui
  return {
    ok: false,
    error: message,
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

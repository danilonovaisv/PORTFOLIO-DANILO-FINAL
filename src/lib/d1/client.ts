import 'server-only';

export interface D1ResultLike<T = Record<string, unknown>> {
  results?: T[];
  success?: boolean;
  meta?: Record<string, unknown>;
}

export interface D1PreparedStatementLike {
  bind: (..._values: unknown[]) => D1PreparedStatementLike;
  all: <T = Record<string, unknown>>() => Promise<D1ResultLike<T>>;
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  run: () => Promise<D1ResultLike>;
}

export interface D1DatabaseLike {
  prepare: (_query: string) => D1PreparedStatementLike;
}

/**
 * Safely retrieves the Cloudflare D1 `DB` binding in Next.js App Router / OpenNext runtimes.
 * Returns `null` during local Node/Jest execution or build-time static passes without Worker bindings.
 */
export async function getD1Database(): Promise<D1DatabaseLike | null> {
  try {
    const mod = await import('@opennextjs/cloudflare');
    if (typeof mod.getCloudflareContext !== 'function') {
      return null;
    }
    const ctx = await mod.getCloudflareContext({ async: true });
    const env = ctx?.env as { DB?: D1DatabaseLike } | undefined;
    return env?.DB ?? null;
  } catch {
    return null;
  }
}


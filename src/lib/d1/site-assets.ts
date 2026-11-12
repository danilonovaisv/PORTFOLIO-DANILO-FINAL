import type { D1DatabaseLike } from '@/lib/d1/client';
import {
  normalizeAssetRecord,
  type NormalizedSiteAsset,
} from '@/lib/supabase/site-asset-utils';
import type { DbAsset } from '@/types/admin';

export interface D1SiteAssetsFilters {
  page?: string;
  activeOnly?: boolean;
}

function parseMetadata(value: unknown): Record<string, unknown> | null {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  return typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

export async function listSiteAssetsFromD1(
  db: D1DatabaseLike,
  filters: D1SiteAssetsFilters = {}
): Promise<NormalizedSiteAsset[]> {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filters.activeOnly ?? true) {
    conditions.push('is_active = 1');
  }
  if (filters.page) {
    conditions.push('page = ?');
    params.push(filters.page);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `
    SELECT id, key, bucket, file_path, asset_type, page, description, is_active, sort_order, metadata, created_at, updated_at
    FROM site_assets
    ${whereClause}
    ORDER BY COALESCE(sort_order, 0) ASC, key ASC
  `;

  const res = await db.prepare(sql).bind(...params).all<Record<string, unknown>>();
  return (res.results ?? []).map((row) => {
    const dbAsset: DbAsset = {
      id: String(row.id ?? ''),
      key: String(row.key ?? ''),
      bucket: String(row.bucket ?? 'site-assets'),
      file_path: String(row.file_path ?? ''),
      asset_type: (typeof row.asset_type === 'string'
        ? row.asset_type
        : 'image') as DbAsset['asset_type'],
      page: typeof row.page === 'string' ? row.page : 'global',
      description:
        typeof row.description === 'string' ? row.description : null,
      is_active:
        typeof row.is_active === 'number'
          ? row.is_active !== 0
          : Boolean(row.is_active),
      sort_order: typeof row.sort_order === 'number' ? row.sort_order : 0,
      metadata: parseMetadata(row.metadata) as DbAsset['metadata'],
      created_at:
        typeof row.created_at === 'string'
          ? row.created_at
          : new Date(0).toISOString(),
      updated_at:
        typeof row.updated_at === 'string'
          ? row.updated_at
          : new Date(0).toISOString(),
    };

    return normalizeAssetRecord(dbAsset);
  });
}


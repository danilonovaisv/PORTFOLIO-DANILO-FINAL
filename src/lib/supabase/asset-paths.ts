const VALID_KEY_CHARS = /[^a-z0-9._-]/g;

export function sanitizeAssetKey(key: string) {
  return key
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(VALID_KEY_CHARS, '');
}

export function normalizePage(page?: string | null) {
  return page && page.trim().length > 0 ? page.trim() : 'global';
}

export function buildAssetFilePath({
  page,
  key,
  subPath,
  extension,
}: {
  page?: string | null;
  key: string;
  subPath?: string;
  extension: string;
}) {
  const targetPage = normalizePage(page);
  const segments = [targetPage];
  if (subPath) {
    segments.push(subPath.trim().replace(/^\/+|\/+$/g, ''));
  }

  const sanitizedKey = sanitizeAssetKey(key);
  const normalizedExtension =
    extension.toLowerCase().replace(/^\.+/, '') || 'bin';
  const fileName = `${sanitizedKey}.${normalizedExtension}`;
  return `${segments.join('/')}/${fileName}`;
}

export function getFileExtension(filePath: string | null | undefined) {
  if (!filePath) return '';
  const parts = filePath.split('.');
  if (parts.length <= 1) return '';
  return parts.pop() ?? '';
}

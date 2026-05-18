/**
 * Utilitários para a página de slug do portfolio.
 * Extraído de app/portfolio/[slug]/page.tsx (TASK-044: componentes > 500 linhas).
 */

export type PortfolioBodyBlock = {
  type: 'text' | 'video_youtube';
  value: string;
  settings: {
    autoplay: boolean;
  };
};

export function extractYoutubeId(rawValue: string): string | null {
  const value = rawValue.trim();
  if (!value) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  const safeUrl = value.startsWith('http') ? value : `https://${value}`;

  try {
    const parsed = new URL(safeUrl);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.replace('/', '');
      return id.length === 11 ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const byQuery = parsed.searchParams.get('v');
      if (byQuery?.length === 11) return byQuery;

      const parts = parsed.pathname.split('/').filter(Boolean);
      const embedIndex = parts.findIndex((part) =>
        ['embed', 'shorts', 'v'].includes(part)
      );
      if (embedIndex >= 0) {
        const id = parts[embedIndex + 1];
        return id?.length === 11 ? id : null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function parsePortfolioBodyBlocks(value?: string | null): PortfolioBodyBlock[] {
  if (!value?.trim()) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      const isYoutube = extractYoutubeId(value);
      return [{ type: isYoutube ? 'video_youtube' : 'text', value, settings: { autoplay: false } }];
    }

    const blocks = parsed.reduce<PortfolioBodyBlock[]>((acc, item) => {
      if (!item || typeof item !== 'object') {
        if (typeof item === 'string' && item.trim()) {
          const isYoutube = extractYoutubeId(item);
          acc.push({
            type: isYoutube ? 'video_youtube' : 'text',
            value: item,
            settings: { autoplay: !!isYoutube },
          });
        }
        return acc;
      }

      const block = item as {
        type?: unknown;
        value?: unknown;
        settings?: { autoplay?: unknown };
      };

      if (typeof block.value !== 'string' || !block.value.trim()) return acc;

      const isYoutube = extractYoutubeId(block.value);
      const type =
        block.type === 'video_youtube' || isYoutube ? 'video_youtube' : 'text';

      acc.push({
        type,
        value: block.value,
        settings: {
          autoplay:
            typeof block.settings?.autoplay === 'boolean'
              ? block.settings.autoplay
              : type === 'video_youtube',
        },
      });

      return acc;
    }, []);

    if (blocks.length > 0) return blocks;

    const isYoutube = extractYoutubeId(value);
    return [{ type: isYoutube ? 'video_youtube' : 'text', value, settings: { autoplay: false } }];
  } catch {
    const isYoutube = extractYoutubeId(value);
    return [{ type: isYoutube ? 'video_youtube' : 'text', value, settings: { autoplay: false } }];
  }
}

export function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

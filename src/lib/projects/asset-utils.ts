export const YOUTUBE_HOST_WHITELIST = ['youtube.com', 'm.youtube.com'];

export const getYouTubeId = (url: string): string | null => {
  const candidate = url.trim();
  if (!candidate) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(candidate)) return candidate;

  const withProtocol = candidate.startsWith('http')
    ? candidate
    : `https://${candidate}`;

  try {
    const parsed = new URL(withProtocol);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.replace('/', '');
      return id.length === 11 ? id : null;
    }

    if (YOUTUBE_HOST_WHITELIST.includes(host)) {
      const videoParam = parsed.searchParams.get('v');
      if (videoParam && videoParam.length === 11) return videoParam;

      const pathParts = parsed.pathname.split('/').filter(Boolean);
      const embedIndex = pathParts.findIndex(
        (part) => part === 'embed' || part === 'shorts' || part === 'v'
      );
      if (embedIndex >= 0) {
        const id = pathParts[embedIndex + 1];
        return id && id.length === 11 ? id : null;
      }
    }
  } catch {
    return null;
  }

  return null;
};

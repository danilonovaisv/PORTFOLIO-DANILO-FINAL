import type { HomeFeaturedCardStyle, HomeFeaturedConfig } from '@/types/project';

export const HOME_FEATURED_CARD_STYLE_OPTIONS = [
  'ANIMATED_BG_INVERTED_LOGO',
  'ANIMATED_BG_THUMB_OVERLAY_50',
] as const;

export const DEFAULT_HOME_FEATURED_CARD_STYLE: HomeFeaturedCardStyle =
  'ANIMATED_BG_THUMB_OVERLAY_50';

type HomeFeaturedLike = {
  enabled?: unknown;
  cardStyle?: unknown;
  logoPath?: unknown;
} | null;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function isHomeFeaturedCardStyle(
  value: unknown
): value is HomeFeaturedCardStyle {
  return (
    typeof value === 'string' &&
    HOME_FEATURED_CARD_STYLE_OPTIONS.includes(
      value as HomeFeaturedCardStyle
    )
  );
}

export function normalizeHomeFeaturedConfig(
  value: unknown,
  fallbackEnabled = false
): HomeFeaturedConfig {
  const input = (isRecord(value) ? value : null) as HomeFeaturedLike;
  const rawLogoPath =
    typeof input?.logoPath === 'string' ? input.logoPath.trim() : '';

  return {
    enabled:
      typeof input?.enabled === 'boolean' ? input.enabled : fallbackEnabled,
    cardStyle: isHomeFeaturedCardStyle(input?.cardStyle)
      ? input.cardStyle
      : DEFAULT_HOME_FEATURED_CARD_STYLE,
    logoPath: rawLogoPath || null,
  };
}

export function resolveHomeFeaturedConfig(
  value: unknown,
  fallbackEnabled = false
): HomeFeaturedConfig {
  const normalized = normalizeHomeFeaturedConfig(value, fallbackEnabled);

  if (
    normalized.cardStyle === 'ANIMATED_BG_INVERTED_LOGO' &&
    !normalized.logoPath
  ) {
    return {
      ...normalized,
      cardStyle: DEFAULT_HOME_FEATURED_CARD_STYLE,
    };
  }

  return normalized;
}

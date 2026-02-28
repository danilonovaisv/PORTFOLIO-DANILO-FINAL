/**
 * VideoObject structured data for SEO
 * @see https://schema.org/VideoObject
 */
export interface VideoObject {
  '@context': 'https://schema.org';
  '@type': 'VideoObject';
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 duration (e.g., "PT1M30S")
  contentUrl?: string;
  embedUrl?: string;
}

/**
 * Generate VideoObject structured data for SEO
 * Improves visibility in Google Video Search
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/video
 */
export function generateVideoSchema(params: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 duration (e.g., "PT1M30S" for 1 min 30 sec)
  contentUrl?: string;
  embedUrl?: string;
}): VideoObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: params.name,
    description: params.description,
    thumbnailUrl: params.thumbnailUrl,
    uploadDate: params.uploadDate,
    ...(params.duration && { duration: params.duration }),
    ...(params.contentUrl && { contentUrl: params.contentUrl }),
    ...(params.embedUrl && { embedUrl: params.embedUrl }),
  };
}

/**
 * Convert seconds to ISO 8601 duration format
 * @example secondsToISO8601(90) => "PT1M30S"
 */
export function secondsToISO8601(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  let duration = 'PT';
  if (hours > 0) duration += `${hours}H`;
  if (minutes > 0) duration += `${minutes}M`;
  if (secs > 0 || duration === 'PT') duration += `${secs}S`;

  return duration;
}

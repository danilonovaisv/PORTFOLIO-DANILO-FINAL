import { generateVideoSchema, secondsToISO8601 } from '@/lib/schema';

describe('secondsToISO8601', () => {
  it('formats 0 seconds correctly', () => {
    expect(secondsToISO8601(0)).toBe('PT0S');
  });

  it('formats seconds only correctly', () => {
    expect(secondsToISO8601(45)).toBe('PT45S');
  });

  it('formats minutes only correctly', () => {
    expect(secondsToISO8601(60)).toBe('PT1M');
  });

  it('formats minutes and seconds correctly', () => {
    expect(secondsToISO8601(90)).toBe('PT1M30S');
  });

  it('formats hours only correctly', () => {
    expect(secondsToISO8601(3600)).toBe('PT1H');
  });

  it('formats hours, minutes, and seconds correctly', () => {
    expect(secondsToISO8601(3661)).toBe('PT1H1M1S');
  });
});

describe('generateVideoSchema', () => {
  const baseParams = {
    name: 'Test Video',
    description: 'A test video description',
    thumbnailUrl: 'https://example.com/thumbnail.jpg',
    uploadDate: '2023-10-27T10:00:00Z',
  };

  it('generates basic video schema with required fields', () => {
    const schema = generateVideoSchema(baseParams);

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: baseParams.name,
      description: baseParams.description,
      thumbnailUrl: baseParams.thumbnailUrl,
      uploadDate: baseParams.uploadDate,
    });
  });

  it('includes optional duration field', () => {
    const params = { ...baseParams, duration: 'PT1M30S' };
    const schema = generateVideoSchema(params);

    expect(schema.duration).toBe('PT1M30S');
  });

  it('includes optional contentUrl field', () => {
    const params = {
      ...baseParams,
      contentUrl: 'https://example.com/video.mp4',
    };
    const schema = generateVideoSchema(params);

    expect(schema.contentUrl).toBe('https://example.com/video.mp4');
  });

  it('includes optional embedUrl field', () => {
    const params = { ...baseParams, embedUrl: 'https://example.com/embed/123' };
    const schema = generateVideoSchema(params);

    expect(schema.embedUrl).toBe('https://example.com/embed/123');
  });

  it('includes all optional fields when provided', () => {
    const params = {
      ...baseParams,
      duration: 'PT1M30S',
      contentUrl: 'https://example.com/video.mp4',
      embedUrl: 'https://example.com/embed/123',
    };
    const schema = generateVideoSchema(params);

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: baseParams.name,
      description: baseParams.description,
      thumbnailUrl: baseParams.thumbnailUrl,
      uploadDate: baseParams.uploadDate,
      duration: 'PT1M30S',
      contentUrl: 'https://example.com/video.mp4',
      embedUrl: 'https://example.com/embed/123',
    });
  });
});

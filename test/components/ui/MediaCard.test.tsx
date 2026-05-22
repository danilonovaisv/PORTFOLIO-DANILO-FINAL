import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MediaCard } from '@/components/ui/media/MediaCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
    fill: _fill,
    loader: _loader,
    ...props
  }: any) => (
    <span
      role="img"
      aria-label={alt as string}
      data-src={src as string}
      className={className as string}
      {...props}
    />
  ),
}));

describe('MediaCard', () => {
  it('renders square images without distortion metadata loss', () => {
    const { container } = render(
      <MediaCard
        media={{
          kind: 'image',
          src: '/media/square.jpg',
          format: 'square',
          alt: 'Square media',
        }}
      />
    );

    expect(container.firstElementChild).toHaveClass('aspect-square');
    expect(screen.getByRole('img', { name: 'Square media' })).toHaveClass(
      'object-cover'
    );
  });

  it('renders landscape images with the video aspect ratio class', () => {
    const { container } = render(
      <MediaCard
        media={{
          kind: 'image',
          src: '/media/landscape.jpg',
          format: 'landscape',
          alt: 'Landscape media',
        }}
      />
    );

    expect(container.firstElementChild).toHaveClass('aspect-video');
  });

  it('defaults videos to contain so the full frame remains visible', () => {
    const { container } = render(
      <MediaCard
        media={{
          kind: 'video',
          src: '/media/preview.mp4',
          format: 'landscape',
        }}
      />
    );

    expect(container.querySelector('video')).toHaveClass('object-contain');
  });
});

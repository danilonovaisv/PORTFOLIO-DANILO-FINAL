import React from 'react';
import { render, screen } from '@testing-library/react';
import { HTMLVideoBlock } from '@/components/ui/HTMLVideoBlock';
import {
  BASIC_PRESETS,
  createBlockDraft,
} from '@/components/admin/templates/v3/presets';
import {
  normalizeLandingBlock,
  V3_BLOCK_TYPES,
} from '@/lib/projects/template-schema-utils';

describe('HTMLVideoBlock & Preset System', () => {
  it('registers html-video in BASIC_PRESETS for the Admin UI menu', () => {
    const htmlVideoPreset = BASIC_PRESETS.find((p) => p.type === 'html-video');
    expect(htmlVideoPreset).toBeDefined();
    expect(htmlVideoPreset?.label).toBe('HTML Video');
  });

  it('includes html-video in V3_BLOCK_TYPES schema list', () => {
    expect(V3_BLOCK_TYPES).toContain('html-video');
  });

  it('creates block draft correctly for html-video', () => {
    const draft = createBlockDraft('html-video', 0);
    expect(draft.type).toBe('html-video');
    expect(draft.content.mediaType).toBe('html');
    expect(draft.content).toHaveProperty('html');
  });

  it('normalizes landing block with html property', () => {
    const rawBlock = {
      id: 'block-html-1',
      type: 'html-video',
      content: {
        text: 'Custom HTML Preview',
        html: '<div class="custom-video">HTML Content</div>',
      },
    };

    const normalized = normalizeLandingBlock(rawBlock, 0, 'Fallback Alt');
    expect(normalized).not.toBeNull();
    expect(normalized?.type).toBe('html-video');
    expect(normalized?.content.html).toBe(
      '<div class="custom-video">HTML Content</div>'
    );
  });

  it('renders HTMLVideoBlock with html content', () => {
    const htmlSnippet =
      '<div data-testid="custom-html-node">Custom Video Code</div>';
    render(<HTMLVideoBlock html={htmlSnippet} title="Test Title" />);
    expect(screen.getByTestId('custom-html-node')).toBeInTheDocument();
  });

  it('contains inline videos without rewriting playback attributes', () => {
    const html =
      '<video src="/sample.mp4" autoplay muted loop playsinline controls></video>';
    const { container } = render(
      <HTMLVideoBlock html={html} frameless preserveVideoFrame />
    );
    const video = container.querySelector('video')!;
    expect(video.parentElement).toHaveClass('[&_video]:object-contain!');
    for (const attribute of [
      'autoplay',
      'muted',
      'loop',
      'playsinline',
      'controls',
    ]) {
      expect(video).toHaveAttribute(attribute);
    }
  });

  it('injects frame containment into full documents while keeping original markup', () => {
    const markup =
      '<video src="/sample.mp4" autoplay muted loop playsinline></video>';
    const html = `<!doctype html><HTML><HEAD></HEAD><body>${markup}</body></HTML>`;
    render(
      <HTMLVideoBlock
        html={html}
        title="Document video"
        frameless
        preserveVideoFrame
      />
    );
    const iframe = screen.getByTitle('Document video');
    expect(iframe.getAttribute('srcdoc')).toContain(
      'object-fit: contain !important'
    );
    expect(iframe.getAttribute('srcdoc')).toContain(markup);
    expect(iframe).toHaveAttribute('allow', 'autoplay');
  });

  it('does not inject containment for consumers that did not opt in', () => {
    render(
      <HTMLVideoBlock
        html="<!DOCTYPE html><html><body>Scene</body></html>"
        title="Existing scene"
      />
    );
    expect(
      screen.getByTitle('Existing scene').getAttribute('srcdoc')
    ).not.toContain('object-fit: contain');
  });

  it('renders fullscreen button and opens uncropped overlay on click', () => {
    const { fireEvent } = require('@testing-library/react');
    render(
      <HTMLVideoBlock
        html="<video src='/glad.mp4' autoplay></video>"
        title="Glad Video"
        frameless
        allowFullscreenToggle
      />
    );

    const fullscreenButton = screen.getByLabelText('Visualizar em tela cheia');
    expect(fullscreenButton).toBeInTheDocument();

    fireEvent.click(fullscreenButton);

    const dialog = screen.getByRole('dialog', {
      name: 'Visualização em tela cheia do vídeo',
    });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByLabelText('Sair da tela cheia')).toBeInTheDocument();

    // Closes on ESC
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(
      screen.queryByRole('dialog', {
        name: 'Visualização em tela cheia do vídeo',
      })
    ).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { HTMLVideoBlock } from '@/components/ui/HTMLVideoBlock';
import { BASIC_PRESETS, createBlockDraft } from '@/components/admin/templates/v3/presets';
import { normalizeLandingBlock, V3_BLOCK_TYPES } from '@/lib/projects/template-schema-utils';

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
    expect(normalized?.content.html).toBe('<div class="custom-video">HTML Content</div>');
  });

  it('renders HTMLVideoBlock with html content', () => {
    const htmlSnippet = '<div data-testid="custom-html-node">Custom Video Code</div>';
    render(<HTMLVideoBlock html={htmlSnippet} title="Test Title" />);
    expect(screen.getByTestId('custom-html-node')).toBeInTheDocument();
  });
});

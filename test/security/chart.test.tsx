import React from 'react';
import { render } from '@testing-library/react';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';

describe('Chart Component Security', () => {
  it('SECURITY: prevents CSS injection in color values', () => {
    const maliciousPayload = 'red; } body { background: red; }';
    const maliciousConfig: ChartConfig = {
      test: {
        color: maliciousPayload,
      },
    };

    const { container } = render(
      <ChartContainer config={maliciousConfig}>
        <div>Chart Content</div>
      </ChartContainer>
    );

    const styleTag = container.querySelector('style');
    // The style tag might exist for indicator styles, but shouldn't contain the payload
    const content = styleTag?.innerHTML || '';

    // The payload should NOT be present in the generated CSS
    expect(content).not.toContain('body { background: red; }');
    expect(content).not.toContain(maliciousPayload);
  });

  it('allows valid color values', () => {
    const validConfig: ChartConfig = {
      test: {
        color: 'red',
      },
    };

    const { container } = render(
      <ChartContainer config={validConfig}>
        <div>Chart Content</div>
      </ChartContainer>
    );

    const styleTag = container.querySelector('style');
    const content = styleTag?.innerHTML || '';

    expect(content).toContain('--color-test: red;');
  });
});

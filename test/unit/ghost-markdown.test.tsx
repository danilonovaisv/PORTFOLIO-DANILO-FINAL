import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GhostMarkdown } from '@/components/ui/GhostMarkdown';

// Mock react-markdown to verify component mapping and output structure
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({
    children,
    components,
  }: {
    children: string;
    components?: Record<string, React.ComponentType<any>>;
  }) {
    if (!components) {
      return <div data-testid="mock-markdown">{children}</div>;
    }

    const Heading1 = components.h1 as any;
    const Heading2 = components.h2 as any;
    const Paragraph = components.p as any;
    const Strong = components.strong as any;
    const LinkComp = components.a as any;
    const Blockquote = components.blockquote as any;

    return (
      <div data-testid="mock-markdown">
        {Heading1 && <Heading1>Título H1 Teste</Heading1>}
        {Heading2 && <Heading2>Título H2 Teste</Heading2>}
        {Paragraph && (
          <Paragraph>
            Texto com {Strong && <Strong>negrito</Strong>} e{' '}
            {LinkComp && (
              <LinkComp href="https://portfoliodanilo.com">
                link externo
              </LinkComp>
            )}
          </Paragraph>
        )}
        {Blockquote && <Blockquote>Citação teste</Blockquote>}
        <div data-testid="raw-normalized-text">{children}</div>
      </div>
    );
  };
});

describe('GhostMarkdown Component', () => {
  it('returns null when content is empty or null', () => {
    const { container: c1 } = render(<GhostMarkdown content="" />);
    expect(c1.firstChild).toBeNull();

    const { container: c2 } = render(<GhostMarkdown content={null} />);
    expect(c2.firstChild).toBeNull();
  });

  it('normalizes literal \\n and renders semantic components correctly', () => {
    render(
      <GhostMarkdown
        content={
          '## Título\\n\\nParágrafo com **negrito** e [link](https://portfoliodanilo.com)'
        }
        textConfig={{ textAlign: 'center', fontSize: 'text-xl' }}
      />
    );

    // Verify headings
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Título H1 Teste'
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Título H2 Teste'
    );

    // Verify bold
    expect(screen.getByText('negrito')).toBeInTheDocument();

    // Verify external link security attributes
    const link = screen.getByRole('link', { name: 'link externo' });
    expect(link).toHaveAttribute('href', 'https://portfoliodanilo.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify unescaping of literal \\n
    const rawNormalized = screen.getByTestId('raw-normalized-text');
    expect(rawNormalized.textContent).not.toContain('\\n');
  });

  it('strips unsafe inline styles and classes', () => {
    render(
      <GhostMarkdown
        content={'<span style="color:red" class="evil">Texto limpo</span>'}
      />
    );
    const raw = screen.getByTestId('raw-normalized-text');
    expect(raw.textContent).not.toContain('style=');
    expect(raw.textContent).not.toContain('class=');
  });
});

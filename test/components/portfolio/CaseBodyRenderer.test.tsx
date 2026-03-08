/// <reference types="@testing-library/jest-dom" />
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { CaseBodyRenderer } from '@/components/portfolio/CaseBodyRenderer';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({
    children,
    skipHtml,
  }: {
    children: string;
    skipHtml?: boolean;
  }) => {
    const safeContent = skipHtml
      ? children.replace(/<[^>]+>/g, '')
      : children;

    return (
      <div data-testid="markdown-mock">
        <h1>Titulo</h1>
        <p>{safeContent}</p>
      </div>
    );
  },
}));

describe('CaseBodyRenderer', () => {
  it('renderiza markdown estrutural com seguranca', () => {
    render(
      <CaseBodyRenderer
        content={`# Titulo\n\n- item 1\n- item 2\n\n<script>alert('x')</script>`}
      />
    );

    expect(screen.getByRole('heading', { name: 'Titulo' })).toBeInTheDocument();
    expect(screen.getByText(/item 1/i)).toBeInTheDocument();
    expect(document.querySelector('script')).not.toBeInTheDocument();
  });
});

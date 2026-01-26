/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlockRenderer from '../../../src/components/projects/BlockRenderer';
import { LandingPageBlock } from '@/types/landing-page';

// Mock dependencies
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock framer-motion
// Mock framer-motion
jest.mock('framer-motion', () => {
  const MockComponent = ({
    children,
    className,
    style,
    onClick,
    role,
    tabIndex,
    'aria-label': ariaLabel,
    onKeyDown,
  }: any) => (
    <div
      className={className}
      style={style}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );

  return {
    motion: {
      section: ({
        children,
        className,
        style,
        id,
        'aria-label': ariaLabel,
      }: any) => (
        <section
          className={className}
          style={style}
          id={id}
          aria-label={ariaLabel}
        >
          {children}
        </section>
      ),
      div: MockComponent,
    },
  };
});

// Mock react-markdown
jest.mock('react-markdown', () => (props: any) => (
  <div data-testid="markdown-content">{props.children}</div>
));

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321';

describe('BlockRenderer Sanitization', () => {
  const createTextBlock = (text: string): LandingPageBlock => ({
    id: 'test-block',
    type: 'text',
    content: {
      text,
      textConfig: { color: 'black' },
    },
  });

  it('renders clean text without error', () => {
    const block = createTextBlock('Hello World');
    render(<BlockRenderer block={block} index={0} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('strips double-quoted style attributes', () => {
    const text = 'Hello <span style="color: red">World</span>';
    const block = createTextBlock(text);
    const { container } = render(<BlockRenderer block={block} index={0} />);
    // Since ReactMarkdown with skipHtml=true is used:
    // "Hello <span ...>World</span>" -> "Hello World" (tags stripped/ignored)
    // Or if it renders tag as text?
    // Usually standard Markdown ignores HTML tags unless rehype-raw is used.
    // If they are ignored, they don't appear in output.
    // Ensure "style" is NOT in the output HTML.
    expect(container.innerHTML).not.toContain('style="color: red"');
  });

  it('strips single-quoted style attributes (Fix for Error #62)', () => {
    const text = "Hello <span style='color: red'>World</span>";
    const block = createTextBlock(text);
    const { container } = render(<BlockRenderer block={block} index={0} />);
    // If sanitization fails, this might contain style='color: red'
    // BUT React would throw Error #62 if it tried to render it as a prop.
    // Since we are running in JSDOM, React will just warn or throw.
    expect(container.innerHTML).not.toContain("style='color: red'");
  });

  it('strips usage with spaces around equals', () => {
    const text = 'Hello <span style = "color: red">World</span>';
    const block = createTextBlock(text);
    const { container } = render(<BlockRenderer block={block} index={0} />);
    expect(container.innerHTML).not.toContain('style');
  });

  it('handles mixed quotes', () => {
    const text = `Hello <div style="font-family: 'Arial'">World</div>`;
    const block = createTextBlock(text);
    const { container } = render(<BlockRenderer block={block} index={0} />);
    expect(container.innerHTML).not.toContain('style');
  });
});

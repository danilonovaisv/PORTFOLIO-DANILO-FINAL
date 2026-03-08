'use client';

import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import type { TextConfig } from '@/types/landing-page';

type GhostMarkdownProps = {
  content?: string | null;
  className?: string;
  proseClassName?: string;
  textConfig?: TextConfig;
};

function normalizeMarkdownLineBreaks(content: string) {
  // We avoid lookbehind as it can fail in older browsers and causes issues
  // Instead, we will rely on CSS `whitespace-pre-wrap` in the bodyClass
  return content.replace(/\r\n/g, '\n');
}

function resolveAlignmentClass(textAlign?: TextConfig['textAlign']) {
  if (!textAlign) return '';
  return {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }[textAlign];
}

export function GhostMarkdown({
  content,
  className,
  proseClassName,
  textConfig,
}: GhostMarkdownProps) {
  if (!content || typeof content !== 'string') return null;

  const normalized = normalizeMarkdownLineBreaks(
    content
      .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
      .replace(/\sclass(Name)?\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
  );

  const alignClass = resolveAlignmentClass(textConfig?.textAlign);
  const bodyClass = cn(
    'text-body leading-relaxed text-white/84 whitespace-pre-wrap',
    textConfig?.fontSize,
    textConfig?.fontWeight,
    alignClass
  );
  const headingProps =
    textConfig?.color && textConfig.color.startsWith('#')
      ? { style: { color: textConfig.color } }
      : {};

  return (
    <div
      className={cn(
        'max-w-none prose prose-invert prose-p:my-0 prose-img:rounded-xl prose-a:text-blueAccent hover:prose-a:text-blueAccent/80 prose-strong:text-white prose-li:marker:text-blueAccent',
        proseClassName,
        className
      )}
    >
      <ReactMarkdown
        skipHtml
        components={{
          p: ({ children }) => (
            <p className={cn(bodyClass, 'mb-4')}>{children}</p>
          ),
          h1: ({ children }) => (
            <h1
              className={cn(
                'text-h1 mb-6 text-balance font-semibold text-white',
                alignClass
              )}
              {...headingProps}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className={cn(
                'text-h2 mb-5 text-balance font-semibold text-white',
                alignClass
              )}
              {...headingProps}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              className={cn(
                'text-h3 mb-4 text-balance font-semibold text-white',
                alignClass
              )}
              {...headingProps}
            >
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className={cn(bodyClass, 'mb-4 list-disc space-y-2 pl-6')}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className={cn(bodyClass, 'mb-4 list-decimal space-y-2 pl-6')}>
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l border-bluePrimary/60 pl-4 text-white/78">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-white/90">{children}</em>
          ),
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}

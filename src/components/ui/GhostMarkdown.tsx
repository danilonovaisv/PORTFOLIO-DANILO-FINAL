'use client';

import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import type { TextConfig } from '@/types/landing-page';
import { useMemo } from 'react';

type GhostMarkdownProps = {
  content?: string | null;
  className?: string;
  proseClassName?: string;
  textConfig?: TextConfig;
};

function normalizeMarkdownContent(content: string): string {
  // 1. Unescape literal \n if present (e.g. from JSON/form serialization)
  let text = content.replace(/\\n/g, '\n');
  // 2. Normalize Windows \r\n to \n
  text = text.replace(/\r\n/g, '\n');
  // 3. Strip any unsafe inline html style / class attributes
  text = text
    .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
    .replace(/\sclass(Name)?\s*=\s*(?:"[^"]*"|'[^']*')/gi, '');
  return text;
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

  const normalized = normalizeMarkdownContent(content);

  const alignClass = resolveAlignmentClass(textConfig?.textAlign);
  const bodyClass = cn(
    'text-base md:text-lg leading-relaxed text-white/80',
    textConfig?.fontSize,
    textConfig?.fontWeight,
    alignClass
  );
  const headingProps =
    textConfig?.color && textConfig.color.startsWith('#')
      ? { style: { color: textConfig.color } }
      : {};

  const components = useMemo(
    () => ({
      p: ({ children }: any) => (
        <p className={cn(bodyClass, 'mb-4 last:mb-0')}>{children}</p>
      ),
      h1: ({ children }: any) => (
        <h1
          className={cn(
            'text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 text-balance',
            alignClass
          )}
          {...headingProps}
        >
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2
          className={cn(
            'text-2xl md:text-4xl font-semibold tracking-tight text-white mb-5 text-balance',
            alignClass
          )}
          {...headingProps}
        >
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3
          className={cn(
            'text-xl md:text-3xl font-semibold tracking-tight text-white mb-4 text-balance',
            alignClass
          )}
          {...headingProps}
        >
          {children}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4
          className={cn(
            'text-lg md:text-xl font-semibold tracking-tight text-white mb-3 text-balance',
            alignClass
          )}
          {...headingProps}
        >
          {children}
        </h4>
      ),
      h5: ({ children }: any) => (
        <h5
          className={cn(
            'text-base md:text-lg font-semibold tracking-tight text-white mb-2',
            alignClass
          )}
          {...headingProps}
        >
          {children}
        </h5>
      ),
      h6: ({ children }: any) => (
        <h6
          className={cn(
            'text-sm md:text-base font-semibold tracking-tight text-white mb-2',
            alignClass
          )}
          {...headingProps}
        >
          {children}
        </h6>
      ),
      ul: ({ children }: any) => (
        <ul
          className={cn(
            bodyClass,
            'mb-4 list-disc list-outside pl-6 space-y-2 marker:text-blueAccent'
          )}
        >
          {children}
        </ul>
      ),
      ol: ({ children }: any) => (
        <ol
          className={cn(
            bodyClass,
            'mb-4 list-decimal list-outside pl-6 space-y-2 marker:text-blueAccent'
          )}
        >
          {children}
        </ol>
      ),
      li: ({ children }: any) => (
        <li className="leading-relaxed text-white/80">{children}</li>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="my-4 border-l-2 border-bluePrimary bg-white/[0.02] py-2 pl-4 italic text-white/80 rounded-r">
          {children}
        </blockquote>
      ),
      strong: ({ children }: any) => (
        <strong className="font-semibold text-white">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic text-white/90">{children}</em>
      ),
      a: ({ href, children, node: _node, ...props }: any) => {
        const isExternal =
          href?.startsWith('http://') || href?.startsWith('https://');
        return (
          <a
            href={href}
            className="text-blueAccent underline underline-offset-4 transition-colors hover:text-blueAccent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent"
            {...(isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            {...props}
          >
            {children}
          </a>
        );
      },
      code: ({ children, className: codeClassName, node: _node, ...props }: any) => (
        <code
          className={cn(
            'rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-blueAccent',
            codeClassName
          )}
          {...props}
        >
          {children}
        </code>
      ),
      pre: ({ children }: any) => (
        <pre className="my-4 overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-4 font-mono text-sm text-white/90">
          {children}
        </pre>
      ),
      hr: () => <hr className="my-6 border-white/10" />,
    }),
    [bodyClass, alignClass, headingProps]
  );

  return (
    <div className={cn('ghost-markdown w-full max-w-none', proseClassName, className)}>
      <ReactMarkdown components={components}>{normalized}</ReactMarkdown>
    </div>
  );
}


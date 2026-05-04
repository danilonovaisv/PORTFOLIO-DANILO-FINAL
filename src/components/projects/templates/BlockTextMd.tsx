'use client';

import { GhostMarkdown } from '@/components/ui/GhostMarkdown';
import type { TextConfig } from '@/types/landing-page';

interface BlockTextMdProps {
  text?: string;
  textConfig?: TextConfig;
  alignClass?: string;
}

export function BlockTextMd({
  text,
  textConfig,
  alignClass,
}: BlockTextMdProps) {
  if (!text?.trim()) return null;

  const mergedConfig = textConfig
    ? {
        ...textConfig,
        textAlign:
          textConfig.textAlign ??
          ((alignClass?.includes('right')
            ? 'right'
            : alignClass?.includes('center')
              ? 'center'
              : undefined) as TextConfig['textAlign']),
      }
    : alignClass?.includes('right')
      ? { textAlign: 'right' as const }
      : alignClass?.includes('center')
        ? { textAlign: 'center' as const }
        : undefined;

  return (
    <GhostMarkdown
      content={text}
      textConfig={mergedConfig}
      className="w-full"
      proseClassName="prose-headings:text-white"
    />
  );
}

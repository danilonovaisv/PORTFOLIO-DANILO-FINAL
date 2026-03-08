'use client';

import { GhostMarkdown } from '@/components/ui/GhostMarkdown';

interface CaseBodyRendererProps {
  content: string;
  className?: string;
}

export function CaseBodyRenderer({
  content,
  className = '',
}: CaseBodyRendererProps) {
  return (
    <GhostMarkdown
      content={content}
      className={`case-body-content ${className}`}
      proseClassName="prose-lg prose-headings:font-display prose-headings:text-balance prose-p:text-balance"
    />
  );
}

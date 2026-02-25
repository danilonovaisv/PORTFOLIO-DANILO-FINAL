/**
 * CaseBodyRenderer - Ghost Era v3.0
 *
 * Reliable Markdown-to-HTML rendering using react-markdown.
 * Allows safe rendering and robust markdown support without writing custom regex.
 */

'use client';

import ReactMarkdown from 'react-markdown';

interface CaseBodyRendererProps {
    content: string;
    className?: string;
}

export function CaseBodyRenderer({ content, className = '' }: CaseBodyRendererProps) {
    if (!content || typeof content !== 'string') return null;

    return (
        <div className={`case-body-content prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-balance prose-p:text-balance prose-img:rounded-xl prose-a:text-[#4fe6ff] hover:prose-a:text-[#4fe6ff]/80 ${className}`}>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div>
    );
}

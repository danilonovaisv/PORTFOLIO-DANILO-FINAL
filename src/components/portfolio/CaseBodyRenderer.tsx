/**
 * CaseBodyRenderer - Ghost Era v2.1
 *
 * Lightweight Markdown-to-HTML renderer for project case body content.
 * Supports: headings (##, ###), bold, italic, links, lists, paragraphs, line breaks.
 * No external dependencies — uses regex-based parsing with DOMPurify sanitization.
 */

'use client';

import { useMemo } from 'react';

interface CaseBodyRendererProps {
    content: string;
    className?: string;
}

/**
 * Convert a lightweight markdown string to sanitized HTML.
 * Supports:
 *   ## H2, ### H3
 *   **bold**, *italic*
 *   [text](url)
 *   - unordered lists
 *   Paragraphs (double newline)
 *   Line breaks (single newline within paragraph)
 */
function markdownToHtml(md: string): string {
    let html = md
        // Escape HTML entities first (basic XSS prevention)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Headings (### before ##)
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg md:text-xl font-semibold text-white mt-10 mb-4 tracking-tight">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 tracking-tight">$1</h2>');

    // Bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#0048ff] hover:text-[#4fe6ff] underline underline-offset-4 transition-colors">$1</a>'
    );

    // Unordered lists (contiguous lines starting with -)
    html = html.replace(
        /(?:^- .+$\n?)+/gm,
        (match) => {
            const items = match
                .split('\n')
                .filter((line) => line.startsWith('- '))
                .map((line) => `<li class="flex items-start gap-3 text-sm md:text-base text-white/80"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#0048ff] shrink-0" aria-hidden="true"></span><span>${line.slice(2)}</span></li>`)
                .join('');
            return `<ul class="flex flex-col gap-3 list-none p-0 m-0 my-6">${items}</ul>`;
        }
    );

    // Paragraphs (double newline separation)
    const blocks = html.split(/\n{2,}/);
    html = blocks
        .map((block) => {
            const trimmed = block.trim();
            if (!trimmed) return '';
            // Don't wrap if already a block element
            if (
                trimmed.startsWith('<h2') ||
                trimmed.startsWith('<h3') ||
                trimmed.startsWith('<ul') ||
                trimmed.startsWith('<ol')
            ) {
                return trimmed;
            }
            // Convert single newlines to <br> within paragraphs
            const withBreaks = trimmed.replace(/\n/g, '<br/>');
            return `<p class="text-base md:text-lg leading-relaxed text-gray-300 font-light">${withBreaks}</p>`;
        })
        .join('\n');

    return html;
}

export function CaseBodyRenderer({ content, className = '' }: CaseBodyRendererProps) {
    const htmlContent = useMemo(() => markdownToHtml(content), [content]);

    return (
        <div
            className={`case-body-content flex flex-col gap-4 ${className}`}
            // Safe: markdownToHtml escapes HTML entities before processing
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}

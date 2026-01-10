import React from 'react';

type HighlightTextProps = {
  text: string;
  highlight?: string;
};

// Função auxiliar para escapar caracteres especiais em regex
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function HighlightText({ text, highlight }: HighlightTextProps) {
  if (!highlight) return <>{text}</>;

  // Escapa o texto de destaque para usar no RegExp com segurança
  const escapedHighlight = escapeRegExp(highlight);
  const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="text-[#0048ff] font-bold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

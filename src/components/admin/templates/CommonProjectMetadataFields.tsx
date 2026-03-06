'use client';

import {
  inputClasses,
  labelClasses,
  splitTokenList,
  splitLines,
} from './CommonTemplateStyles';

interface CommonProjectMetadataFieldsProps {
  value: {
    project_title: string;
    project_subtitle?: string;
    project_slug: string;
    project_client?: string;
    project_year?: number;
    project_tags: string[];
    project_summary?: string;
    intro_headline?: string;
    intro_body?: string[];
    highlight_color?: string;
    theme_color?: string;
  };
  update: (_updates: any) => void;
  showThemeColor?: boolean;
}

export function CommonProjectMetadataFields({
  value,
  update,
  showThemeColor = false,
}: CommonProjectMetadataFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="space-y-1">
        <span className={labelClasses}>Título do projeto</span>
        <input
          className={inputClasses}
          value={value.project_title}
          onChange={(e) => update({ project_title: e.target.value })}
        />
      </label>

      <label className="space-y-1">
        <span className={labelClasses}>Subtítulo</span>
        <input
          className={inputClasses}
          value={value.project_subtitle || ''}
          onChange={(e) => update({ project_subtitle: e.target.value })}
        />
      </label>

      <label className="space-y-1">
        <span className={labelClasses}>Slug do projeto</span>
        <input
          className={inputClasses}
          value={value.project_slug}
          onChange={(e) => update({ project_slug: e.target.value })}
        />
      </label>

      <label className="space-y-1">
        <span className={labelClasses}>Cliente</span>
        <input
          className={inputClasses}
          value={value.project_client || ''}
          onChange={(e) => update({ project_client: e.target.value })}
        />
      </label>

      <label className="space-y-1">
        <span className={labelClasses}>Ano</span>
        <input
          className={inputClasses}
          type="number"
          value={value.project_year || ''}
          onChange={(e) =>
            update({
              project_year: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </label>

      <label className="space-y-1">
        <span className={labelClasses}>
          {showThemeColor ? 'Cor do tema' : 'Cor de destaque'}
        </span>
        <div className="flex gap-2">
          <input
            type="color"
            className="h-10 w-12 border border-white/10 bg-transparent"
            value={
              (showThemeColor ? value.theme_color : value.highlight_color) ||
              '#0048ff'
            }
            onChange={(e) =>
              update({
                [showThemeColor ? 'theme_color' : 'highlight_color']:
                  e.target.value,
              })
            }
            title="Cor"
          />
          <input
            className={inputClasses}
            value={
              (showThemeColor ? value.theme_color : value.highlight_color) ||
              '#0048ff'
            }
            onChange={(e) =>
              update({
                [showThemeColor ? 'theme_color' : 'highlight_color']:
                  e.target.value,
              })
            }
          />
        </div>
      </label>

      <label className="space-y-1 md:col-span-2">
        <span className={labelClasses}>
          Tags (separadas por espaço ou vírgula)
        </span>
        <input
          className={inputClasses}
          value={value.project_tags.join(', ')}
          onChange={(e) =>
            update({ project_tags: splitTokenList(e.target.value) })
          }
        />
      </label>

      <label className="space-y-1 md:col-span-2">
        <span className={labelClasses}>Resumo</span>
        <textarea
          className={`${inputClasses} min-h-24`}
          value={value.project_summary || ''}
          onChange={(e) => update({ project_summary: e.target.value })}
        />
      </label>

      <label className="space-y-1 md:col-span-2">
        <span className={labelClasses}>Headline da intro</span>
        <input
          className={inputClasses}
          value={value.intro_headline || ''}
          onChange={(e) => update({ intro_headline: e.target.value })}
        />
      </label>

      <label className="space-y-1 md:col-span-2">
        <span className={labelClasses}>Parágrafos da intro (1 por linha)</span>
        <textarea
          className={`${inputClasses} min-h-28`}
          value={(value.intro_body || []).join('\n')}
          onChange={(e) => update({ intro_body: splitLines(e.target.value) })}
        />
      </label>
    </div>
  );
}

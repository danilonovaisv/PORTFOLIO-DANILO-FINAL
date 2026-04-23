'use client';

import { inputClasses, labelClasses } from './CommonTemplateStyles';
import {
  MasterProjectTemplateNavigation,
  MasterProjectTemplateCta,
  MasterProjectTemplateSeo,
} from '@/types/project-template';

interface CommonSEOAndNavFieldsProps {
  navigation?: MasterProjectTemplateNavigation;
  cta?: MasterProjectTemplateCta;
  seo?: MasterProjectTemplateSeo;
  update: (_updates: any) => void;
}

export function CommonSEOAndNavFields({
  navigation,
  cta,
  seo,
  update,
}: CommonSEOAndNavFieldsProps) {
  return (
    <section className="space-y-4 border border-white/5 bg-white/[0.02] p-5">
      <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500/80">
        System_SEO_&_Navigation
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className={labelClasses}>Back_Navigation_Label</span>
          <input
            className={inputClasses}
            value={navigation?.back_label || ''}
            onChange={(e) =>
              update({
                navigation: { ...navigation, back_label: e.target.value },
              })
            }
          />
        </label>

        <label className="space-y-1">
          <span className={labelClasses}>Next_Navigation_Label</span>
          <input
            className={inputClasses}
            value={navigation?.next_label || ''}
            onChange={(e) =>
              update({
                navigation: { ...navigation, next_label: e.target.value },
              })
            }
          />
        </label>

        <label className="space-y-1">
          <span className={labelClasses}>Next_Project_Slug</span>
          <input
            className={inputClasses}
            value={navigation?.next_project_slug || ''}
            onChange={(e) =>
              update({
                navigation: {
                  ...navigation,
                  next_project_slug: e.target.value,
                },
              })
            }
          />
        </label>

        <label className="space-y-1">
          <span className={labelClasses}>CTA_Final_Label</span>
          <input
            className={inputClasses}
            value={cta?.label || ''}
            onChange={(e) => update({ cta: { ...cta, label: e.target.value } })}
          />
        </label>

        <label className="space-y-1">
          <span className={labelClasses}>CTA_Redirect_URI</span>
          <input
            className={inputClasses}
            value={cta?.href || ''}
            onChange={(e) => update({ cta: { ...cta, href: e.target.value } })}
          />
        </label>

        <label className="space-y-1 md:col-span-2">
          <span className={labelClasses}>SEO_Description</span>
          <textarea
            className={`${inputClasses} min-h-24`}
            value={seo?.description || ''}
            onChange={(e) =>
              update({ seo: { ...seo, description: e.target.value } })
            }
          />
        </label>

        <label className="space-y-1 md:col-span-2">
          <span className={labelClasses}>SEO_OG_Asset_URI</span>
          <input
            className={inputClasses}
            value={seo?.og_image || ''}
            onChange={(e) =>
              update({ seo: { ...seo, og_image: e.target.value } })
            }
          />
        </label>
      </div>
    </section>
  );
}

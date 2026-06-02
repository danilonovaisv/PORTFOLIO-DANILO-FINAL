'use client';

import { useFormContext } from 'react-hook-form';
import { FieldTooltip } from '@/components/admin/FieldTooltip';
import {
  DEFAULT_HOME_FEATURED_CARD_STYLE,
  HOME_FEATURED_CARD_STYLE_OPTIONS,
} from '@/lib/portfolio/home-featured';
import type { ProjectFormValues } from '@/lib/admin/schemas/project';

interface HomeFeaturedSectionProps {
  logoPath?: string | null;
  onChangeLogoFile: (file: File | null) => void;
}

export function HomeFeaturedSection({
  logoPath,
  onChangeLogoFile,
}: HomeFeaturedSectionProps) {
  const { register, watch } = useFormContext<ProjectFormValues>();
  const featuredOnHome = watch('featured_on_home') ?? false;
  const homeFeaturedCardStyle =
    watch('home_featured.cardStyle') ?? DEFAULT_HOME_FEATURED_CARD_STYLE;

  return (
    <div className="rounded border border-purple-500/10 bg-purple-500/[0.02] p-6 space-y-6">
      <div className="space-y-1">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-purple-400">
          System_Featured_Home_Core
        </p>
        <p className="font-mono text-[9px] text-white/20 uppercase tracking-tight leading-relaxed">
          Exclusive configuration for Home Featured Projects. Background
          synchronization is handled dynamically via kernel seed.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-center gap-2 font-mono text-[10px] text-white/60 uppercase tracking-widest">
          <input type="checkbox" {...register('featured_on_home')} />
          System_Feature_Override: EXPOSE_ON_HOME
        </label>
        <label className="flex flex-col gap-1 font-mono text-[10px] text-white/60 uppercase tracking-widest">
          System_Home_Order
          <input
            type="number"
            min={0}
            max={9999}
            inputMode="numeric"
            placeholder="auto"
            disabled={!featuredOnHome}
            className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-sm text-white font-mono outline-none transition-colors focus:border-bluePrimary/50 disabled:opacity-50"
            {...register('featured_home_order', {
              setValueAs: (value) =>
                value === '' || value === null || value === undefined
                  ? null
                  : Number(value),
            })}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Featured_Style"
            description="Selects only the card layout. Animated background is drawn dynamically on Home."
            className="flex items-center gap-1"
          />
          <select
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm text-white font-mono focus:border-bluePrimary/50 outline-none transition-colors"
            {...register('home_featured.cardStyle')}
            disabled={!featuredOnHome}
          >
            {HOME_FEATURED_CARD_STYLE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'ANIMATED_BG_INVERTED_LOGO'
                  ? 'System_Layout: ANIM_BG_INVERT_LOGO'
                  : 'System_Layout: ANIM_BG_THUMB_OVERLAY'}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Inverted_Logo"
            description="Required only for inverted logo mode. PNG, SVG, or WebP with transparent background."
            className="flex items-center gap-1"
          />
          <input
            type="file"
            className="w-full text-[10px] font-mono text-white/30 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[9px] file:font-bold file:uppercase file:tracking-widest file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30 disabled:opacity-60 transition-all cursor-pointer"
            accept="image/png,image/svg+xml,image/webp"
            disabled={!featuredOnHome}
            onChange={(event) =>
              onChangeLogoFile(event.target.files?.[0] ?? null)
            }
          />
          {logoPath ? (
            <span className="text-[10px] text-white/40 break-all font-mono">
              Current_Asset: {logoPath}
            </span>
          ) : null}
          {homeFeaturedCardStyle === 'ANIMATED_BG_INVERTED_LOGO' ? (
            <p className="text-[9px] text-white/40 uppercase tracking-tight">
              System_Render_Notice: Logo is anchored in center of viewport,
              independent of hover state.
            </p>
          ) : (
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-tight">
              System_Render_Notice: Thumb variant uses 5% luminance overlay on
              dynamic background.
            </p>
          )}
        </label>
      </div>
    </div>
  );
}

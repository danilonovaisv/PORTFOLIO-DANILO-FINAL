'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/lib/utils';

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfigEntry = {
  label?: React.ReactNode;
  icon?: React.ComponentType;
} & (
  | { color?: string; theme?: never }
  | { color?: never; theme: Record<keyof typeof THEMES, string> }
);

export type ChartConfig = Record<string, ChartConfigEntry>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

const sanitizeConfigKey = (key: string) => {
  const sanitized = key.replace(/[^a-zA-Z0-9_-]/g, '-');
  return sanitized || 'default';
};

const getConfigClassName = (key: string, prefix: string) =>
  `${prefix}-${sanitizeConfigKey(key)}`;

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'Chart';

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  );

  if (!colorConfig.length) {
    return null;
  }

  const themeStyles = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const declarations = colorConfig
        .map(([key, itemConfig]) => {
          const safeKey = sanitizeConfigKey(key);
          const color =
            itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
            itemConfig.color;

          return color ? `  --color-${safeKey}: ${color};` : null;
        })
        .filter(Boolean)
        .join('\n');

      if (!declarations) {
        return null;
      }

      return `
${prefix} [data-chart=${id}] {
${declarations}
}

`;
    })
    .filter(Boolean)
    .join('');

  const indicatorStyles = colorConfig
    .map(([key]) => {
      const safeKey = sanitizeConfigKey(key);
      return `
[data-chart=${id}] .chart-tooltip-indicator-${safeKey} {
  background-color: var(--color-${safeKey});
  border-color: var(--color-${safeKey});
}

[data-chart=${id}] .chart-legend-color-${safeKey} {
  background-color: var(--color-${safeKey});
}

`;
    })
    .join('');

  const styleContent = [themeStyles, indicatorStyles]
    .filter(Boolean)
    .join('\n');

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: styleContent,
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

// Interfaces para tipagem estrita
interface PayloadItem {
  dataKey?: string;
  name?: string;
  value?: number | string;
  payload?: Record<string, unknown>;
  color?: string;
  [key: string]: any;
}

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: PayloadItem[];
  indicator?: 'dot' | 'line' | 'dashed';
  hideLabel?: boolean;
  hideIndicator?: boolean;
  label?: string | number;
  labelFormatter?: (_value: any, _payload: PayloadItem[]) => React.ReactNode;
  labelClassName?: string;
  formatter?: (
    _value: unknown,
    _name: string,
    _item: PayloadItem,
    _index: number,
    _payload: unknown
  ) => React.ReactNode;
  nameKey?: string;
  labelKey?: string;
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || 'value'}`;
      const { config: payloadConfigEntry } = getPayloadConfigFromPayload(
        config,
        item,
        key
      );
      const value =
        !labelKey && typeof label === 'string'
          ? config[label as keyof typeof config]?.label || label
          : payloadConfigEntry?.label;

      if (labelFormatter) {
        return (
          <div className={cn('font-medium', labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn('font-medium', labelClassName)}>{value}</div>;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item: PayloadItem, index: number) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`;
            const { config: payloadConfigEntry, key: payloadConfigKey } =
              getPayloadConfigFromPayload(config, item, key);
            const indicatorClassKey = payloadConfigKey || key;
            const hasPayloadColor = Boolean(
              payloadConfigEntry?.color || payloadConfigEntry?.theme
            );

            return (
              <div
                key={item.dataKey}
                className={cn(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
                  indicator === 'dot' && 'items-center'
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {payloadConfigEntry?.icon ? (
                      <payloadConfigEntry.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            'shrink-0 rounded-[2px] border',
                            indicator === 'dot' && 'h-2.5 w-2.5',
                            indicator === 'line' && 'h-2.5 w-1',
                            indicator === 'dashed' &&
                              'w-0 border-[1.5px] border-dashed bg-transparent',
                            nestLabel && indicator === 'dashed' && 'my-0.5',
                            hasPayloadColor &&
                              getConfigClassName(
                                indicatorClassKey,
                                'chart-tooltip-indicator'
                              )
                          )}
                        />
                      )
                    )}
                    <div
                      className={cn(
                        'flex flex-1 justify-between leading-none',
                        nestLabel ? 'items-end' : 'items-center'
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {payloadConfigEntry?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = 'ChartTooltip';

const ChartLegend = RechartsPrimitive.Legend;

interface ChartLegendContentProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: PayloadItem[];
  verticalAlign?: 'top' | 'middle' | 'bottom';
  hideIcon?: boolean;
  nameKey?: string;
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(
  (
    { className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey },
    ref
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-4',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className
        )}
      >
        {payload.map((item: PayloadItem) => {
          const key = `${nameKey || item.dataKey || 'value'}`;
          const { config: payloadConfigEntry, key: payloadConfigKey } =
            getPayloadConfigFromPayload(config, item, key);
          const legendClassKey = payloadConfigKey || key;
          const hasPayloadColor = Boolean(
            payloadConfigEntry?.color || payloadConfigEntry?.theme
          );

          return (
            <div
              key={item.value}
              className={cn(
                'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground'
              )}
            >
              {payloadConfigEntry?.icon && !hideIcon ? (
                <payloadConfigEntry.icon />
              ) : (
                <div
                  className={cn(
                    'h-2 w-2 shrink-0 rounded-[2px]',
                    hasPayloadColor
                      ? getConfigClassName(legendClassKey, 'chart-legend-color')
                      : 'bg-muted-foreground/50'
                  )}
                />
              )}
              {payloadConfigEntry?.label}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = 'ChartLegend';

type PayloadConfigResult = {
  config?: ChartConfigEntry;
  key: string;
};

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
): PayloadConfigResult {
  if (typeof payload !== 'object' || payload === null) {
    return { config: undefined, key };
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  const configEntry =
    configLabelKey in config
      ? config[configLabelKey]
      : config[key as keyof typeof config];

  return { config: configEntry, key: configLabelKey };
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

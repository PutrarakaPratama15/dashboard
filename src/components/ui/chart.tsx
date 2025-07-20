"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [key: string]: {
    label?: string
    icon?: React.ComponentType<{ className?: string }>
  } & ({
    color?: string
    theme?: never
  } | {
    color?: never
    theme: Record<keyof typeof THEMES, string>
  })
}

interface ChartContextProps {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig
  children: React.ReactNode // Updated to React.ReactNode
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, config, ...props }, ref) => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          data-slot="chart"
          data-chart={chartId}
          className={cn(
            "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

interface ChartStyleProps {
  id: string
  config: ChartConfig
}

const ChartStyle = React.memo(({ id, config }: ChartStyleProps) => {
  const colorConfig = React.useMemo(
    () => Object.entries(config).filter(([, config]) => config.theme || config.color),
    [config]
  )

  if (!colorConfig.length) return null

  const styleContent = Object.entries(THEMES)
    .map(([theme, prefix]) => `
      ${prefix} [data-chart=${id}] {
        ${colorConfig
          .map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
            return color ? `  --color-${key}: ${color};` : null
          })
          .filter(Boolean)
          .join("\n")}
      }`)
    .join("\n")

  return <style dangerouslySetInnerHTML={{ __html: styleContent }} />
})
ChartStyle.displayName = "ChartStyle"

const ChartTooltip = RechartsPrimitive.Tooltip

interface ChartPayloadItem {
  color?: string
  name?: string
  value?: number | string
  dataKey?: string
  payload: Record<string, unknown>
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: ChartPayloadItem[]
  label?: string | number
  className?: string
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  labelFormatter?: (
    label: string | number | undefined,
    payload: ChartPayloadItem[] | undefined
  ) => string
  labelClassName?: string
  color?: string
  nameKey?: string
  labelKey?: string
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    color,
    nameKey,
    labelKey
  }, ref) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null
      const [item] = payload
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value = !labelKey && typeof label !== "undefined"
        ? config[String(label)]?.label || label
        : itemConfig?.label

      if (labelFormatter && (typeof label === "string" || typeof label === "number")) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(label, payload)}
          </div>
        )
      }
      return value ? <div className={cn("font-medium", labelClassName)}>{value}</div> : null
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

    if (!active || !payload || payload.length === 0) return null

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel && tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey || index}
                className={cn(
                  "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                  indicator === "dot" && "items-center"
                )}
              >
                {!hideIndicator && (
                  <div
                    className={cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed",
                      }
                    )}
                    style={{
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor,
                    } as React.CSSProperties}
                  />
                )}
                <div
                  className={cn(
                    "flex flex-1 justify-between leading-none",
                    nestLabel ? "items-end" : "items-center"
                  )}
                >
                  <div className="grid gap-1.5">
                    {nestLabel && tooltipLabel}
                    <span className="text-muted-foreground">
                      {itemConfig?.label || item.name}
                    </span>
                  </div>
                  {item.value && (
                    <span className="text-foreground font-mono font-medium tabular-nums">
                      {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

interface ChartLegendContentProps extends React.ComponentProps<"div"> {
  payload?: Array<{
    value?: string
    dataKey?: string
    color?: string
    payload?: Record<string, unknown>
  }>
  verticalAlign?: 'top' | 'bottom'
  hideIcon?: boolean
  nameKey?: string
}

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({
    className,
    hideIcon = false,
    payload,
    verticalAlign = "bottom",
    nameKey,
    ...props
  }, ref) => {
    const { config } = useChart()
    if (!payload || payload.length === 0) return null

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
        {...props}
      >
        {payload.map((item, index) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          return (
            <div
              key={item.value?.toString() || index}
              className="[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon className="h-3 w-3" />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              )}
              {itemConfig?.label || item.value}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegendContent"

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) return undefined

  const payloadWithKey = payload as Record<string, unknown>
  let configLabelKey = key

  if ('payload' in payloadWithKey && 
      typeof payloadWithKey.payload === 'object' && 
      payloadWithKey.payload !== null) {
    const payloadObj = payloadWithKey.payload as Record<string, unknown>
    if (key in payloadObj && typeof payloadObj[key] === 'string') {
      configLabelKey = payloadObj[key] as string
    }
  } else if (key in payloadWithKey && typeof payloadWithKey[key] === 'string') {
    configLabelKey = payloadWithKey[key] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

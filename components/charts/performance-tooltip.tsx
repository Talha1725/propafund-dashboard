interface PerformanceTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  labelKey?: string;
  labelPrefix?: string;
  valueKey?: string;
  valueLabel?: string;
  formatValue?: (value: number) => string;
}

export default function PerformanceTooltip({ 
  active, 
  payload, 
  label,
  labelKey = "name",
  labelPrefix = "",
 
  valueLabel = "Value",
  formatValue = (value: number) => `$${value.toFixed(2)}`
}: PerformanceTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = payload[0].value;
    const displayLabel = data[labelKey] || label;
    
    return (
      <div 
        className="bg-white dark:bg-gray-800 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded shadow-lg"
        style={{ borderStyle: 'dashed' }}
      >
        <p className="text-sm font-medium text-black dark:text-white">
          {labelPrefix}{displayLabel}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {valueLabel}: <span className={value >= 0 ? 'text-skyBright' : 'text-red-400'}>
            {formatValue(value)}
          </span>
        </p>
      </div>
    );
  }
  return null;
}
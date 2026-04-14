import { useEffect, useState } from 'react';

interface MonitoringGaugeProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  warningThreshold: number;
  dangerThreshold: number;
}

export default function MonitoringGauge({
  label,
  value,
  unit,
  min,
  max,
  warningThreshold,
  dangerThreshold,
}: MonitoringGaugeProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue((prev) => {
        const delta = (Math.random() - 0.5) * (max - min) * 0.02;
        return Math.max(min, Math.min(max, prev + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [min, max]);

  const percentage = ((displayValue - min) / (max - min)) * 100;
  const status =
    displayValue >= dangerThreshold
      ? 'danger'
      : displayValue >= warningThreshold
      ? 'warning'
      : 'healthy';

  const statusClass =
    status === 'danger'
      ? 'status-danger'
      : status === 'warning'
      ? 'status-warning'
      : 'status-healthy';

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className={`text-xs font-mono uppercase ${statusClass}`}>
          {status}
        </span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className={`reading-value ${statusClass}`}>
          {displayValue.toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground font-mono">{unit}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            status === 'danger'
              ? 'bg-destructive'
              : status === 'warning'
              ? 'bg-accent'
              : 'bg-secondary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

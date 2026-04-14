import { AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';

const alerts = [
  { id: 1, type: 'warning', message: 'Grid Sync latency above threshold (89ms)', time: '2 min ago', system: 'Grid Sync' },
  { id: 2, type: 'info', message: 'AI model retrained with latest sensor data', time: '15 min ago', system: 'AI Engine' },
  { id: 3, type: 'success', message: 'Blockchain ledger verification complete', time: '32 min ago', system: 'Blockchain' },
  { id: 4, type: 'danger', message: 'Temperature spike detected in Unit-03', time: '1 hr ago', system: 'IoT Sensors' },
  { id: 5, type: 'warning', message: 'Carbon emission approaching daily target', time: '2 hr ago', system: 'Carbon Monitor' },
];

const iconMap = {
  warning: AlertTriangle,
  info: Info,
  danger: XCircle,
  success: CheckCircle,
};

const colorMap = {
  warning: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  info: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  danger: 'text-destructive bg-destructive/10 border-destructive/20',
  success: 'text-primary bg-primary/10 border-primary/20',
};

export default function AlertsPanel() {
  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Recent Alerts
        </span>
        <span className="text-[10px] font-mono text-primary cursor-pointer hover:underline">View All</span>
      </div>
      <div className="space-y-2">
        {alerts.map((alert) => {
          const Icon = iconMap[alert.type as keyof typeof iconMap];
          const colors = colorMap[alert.type as keyof typeof colorMap];
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-2.5 rounded-lg border ${colors} transition-all hover:scale-[1.01]`}
            >
              <Icon className="h-4 w-4 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs leading-relaxed">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono text-muted-foreground">{alert.system}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">•</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

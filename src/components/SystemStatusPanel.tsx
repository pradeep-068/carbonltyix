import { Activity, Wifi, Shield, Cpu } from 'lucide-react';

const systems = [
  { name: 'IoT Sensors', icon: Wifi, status: 'online', latency: '12ms' },
  { name: 'AI Engine', icon: Cpu, status: 'online', latency: '45ms' },
  { name: 'Blockchain Ledger', icon: Shield, status: 'online', latency: '230ms' },
  { name: 'Grid Sync', icon: Activity, status: 'warning', latency: '89ms' },
];

export default function SystemStatusPanel() {
  return (
    <div className="panel space-y-3">
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        System Status
      </span>
      <div className="space-y-2">
        {systems.map((sys) => (
          <div
            key={sys.name}
            className="flex items-center justify-between py-2 grid-line last:border-0"
          >
            <div className="flex items-center gap-2">
              <sys.icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm">{sys.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground">
                {sys.latency}
              </span>
              <div className="flex items-center gap-1.5">
                <div
                  className={`h-2 w-2 rounded-full pulse-glow ${
                    sys.status === 'online' ? 'bg-secondary' : 'bg-accent'
                  }`}
                />
                <span
                  className={`text-xs font-mono uppercase ${
                    sys.status === 'online' ? 'status-healthy' : 'status-warning'
                  }`}
                >
                  {sys.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

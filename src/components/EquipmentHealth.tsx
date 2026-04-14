import { Battery, Thermometer, Droplets, Wind } from 'lucide-react';

const equipment = [
  { name: 'Transformer Unit-01', health: 96, icon: Battery, temp: '62°C', oil: 'Normal', cooling: 'Active' },
  { name: 'Transformer Unit-02', health: 88, icon: Battery, temp: '71°C', oil: 'Normal', cooling: 'Active' },
  { name: 'Transformer Unit-03', health: 74, icon: Battery, temp: '85°C', oil: 'Low', cooling: 'High' },
  { name: 'Bus Reactor BR-01', health: 92, icon: Battery, temp: '55°C', oil: 'Normal', cooling: 'Idle' },
];

function getHealthColor(health: number) {
  if (health >= 90) return 'bg-primary';
  if (health >= 75) return 'bg-yellow-500';
  return 'bg-destructive';
}

function getHealthText(health: number) {
  if (health >= 90) return 'text-primary';
  if (health >= 75) return 'text-yellow-500';
  return 'text-destructive';
}

export default function EquipmentHealth() {
  return (
    <div className="panel space-y-3">
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        Equipment Health
      </span>
      <div className="space-y-3">
        {equipment.map((eq) => (
          <div key={eq.name} className="space-y-2 p-3 rounded-lg bg-muted/20 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{eq.name}</span>
              <span className={`text-sm font-mono font-bold ${getHealthText(eq.health)}`}>
                {eq.health}%
              </span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getHealthColor(eq.health)}`}
                style={{ width: `${eq.health}%` }}
              />
            </div>
            <div className="flex gap-4 text-[10px] font-mono text-muted-foreground">
              <div className="flex items-center gap-1">
                <Thermometer className="h-3 w-3" />
                {eq.temp}
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="h-3 w-3" />
                Oil: {eq.oil}
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-3 w-3" />
                {eq.cooling}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

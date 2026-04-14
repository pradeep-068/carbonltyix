import { LucideIcon } from 'lucide-react';

interface CommandStatsCardProps {
  label: string;
  value: string;
  unit: string;
  subtitle?: string;
  icon?: LucideIcon;
}

export default function CommandStatsCard({ label, value, unit, subtitle, icon: Icon }: CommandStatsCardProps) {
  return (
    <div className="panel group hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-mono text-2xl font-bold text-primary" style={{ textShadow: 'var(--glow-primary)' }}>
              {value}
            </span>
            <span className="text-sm font-mono text-muted-foreground">{unit}</span>
          </div>
          {subtitle && (
            <p className="text-[10px] font-mono text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <Icon className="h-4 w-4 text-primary/40" />
        )}
      </div>
    </div>
  );
}

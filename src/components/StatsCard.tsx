import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend?: number;
  status?: 'healthy' | 'warning' | 'danger';
}

export default function StatsCard({ label, value, unit, icon: Icon, trend, status = 'healthy' }: StatsCardProps) {
  return (
    <div className="panel group hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className={`font-mono text-2xl font-bold ${
            status === 'danger' ? 'status-danger' : status === 'warning' ? 'status-warning' : 'text-primary'
          }`} style={{ textShadow: status === 'healthy' ? 'var(--glow-primary)' : undefined }}>
            {value}
          </span>
          <span className="text-sm text-muted-foreground font-mono">{unit}</span>
        </div>

        {trend !== undefined && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-mono ${
            trend >= 0 ? 'text-primary' : 'text-destructive'
          }`}>
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{trend >= 0 ? '+' : ''}{trend}%</span>
            <span className="text-muted-foreground ml-1">vs last hour</span>
          </div>
        )}
      </div>
    </div>
  );
}

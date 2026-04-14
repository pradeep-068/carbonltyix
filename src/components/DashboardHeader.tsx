import { Bell, Search } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 border border-border">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none w-40 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors border border-border">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary pulse-glow" />
        </button>
        <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">OP</span>
        </div>
      </div>
    </header>
  );
}

import { Zap, Bell, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold tracking-tight">
            Smart Carbon <span className="text-primary">UHV</span> Monitor
          </h1>
        </div>
        <div className="h-4 w-px bg-border mx-2" />
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Substation Alpha • Live
        </span>
        <div className="h-2 w-2 rounded-full bg-secondary pulse-glow" />
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-md hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="p-2 rounded-md hover:bg-muted transition-colors">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}

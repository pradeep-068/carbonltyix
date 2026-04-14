import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Box, Monitor, Leaf, Zap, Settings as SettingsIcon, Bell, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/digital-twin', icon: Box, label: 'Digital Twin' },
  { to: '/sensors', icon: Monitor, label: 'Sensors' },
  { to: '/carbon', icon: Leaf, label: 'Carbon' },
  { to: '/energy', icon: Zap, label: 'Energy' },
  { to: '/equipment', icon: SettingsIcon, label: 'Equipment' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
];

export default function Sidebar() {
  return (
    <aside className="w-52 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full border border-primary/40 flex items-center justify-center">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-sm font-bold tracking-wider">
              <span className="text-foreground">UHV </span>
              <span className="text-primary">SYNC</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation label */}
      <div className="px-4 pt-4 pb-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Main Navigation</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 font-mono',
                isActive
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Status */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary pulse-glow" />
          <span className="text-[10px] font-mono text-primary uppercase tracking-wider">System Online</span>
        </div>
      </div>
    </aside>
  );
}

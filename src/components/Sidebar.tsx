import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Box, Activity, Leaf, Shield, Settings, Bell, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/digital-twin', icon: Box, label: 'Digital Twin' },
  { to: '/monitoring', icon: Activity, label: 'Monitoring' },
  { to: '/carbon', icon: Leaf, label: 'Carbon Analytics' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/security', icon: Shield, label: 'Security' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-sm font-bold tracking-wider text-primary">SMART UHV</h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Carbon Monitor</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group',
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-border">
        <div className="panel-glow p-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary pulse-glow" />
            <span className="text-xs font-mono text-primary uppercase tracking-wider">System Online</span>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground">
            Substation Alpha • Live Feed
          </p>
        </div>
      </div>
    </aside>
  );
}

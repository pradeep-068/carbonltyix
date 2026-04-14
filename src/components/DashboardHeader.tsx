import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour12: false });
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Split title to highlight second word in green
  const titleParts = title.split(' ');
  const firstPart = titleParts.slice(0, -1).join(' ');
  const lastPart = titleParts[titleParts.length - 1];

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/80">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground tracking-wider">UHV-NET-A-1</span>
        <div className="flex items-center gap-1.5">
          <Shield className="h-3 w-3 text-primary" />
          <span className="text-xs font-mono text-primary uppercase tracking-wider">Secure Connection</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-wider">
        <span>TIME (UTC)</span>
        <span className="text-primary">{formatTime(time)}</span>
      </div>
    </header>
  );
}

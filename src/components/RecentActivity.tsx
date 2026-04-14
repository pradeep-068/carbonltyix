const activities = [
  { time: '16:02:15', event: 'Sensor S-042 calibrated', type: 'info' },
  { time: '15:58:03', event: 'Load balanced to Unit-02', type: 'success' },
  { time: '15:45:22', event: 'AI model prediction updated', type: 'info' },
  { time: '15:30:11', event: 'Carbon offset verified via blockchain', type: 'success' },
  { time: '15:15:44', event: 'Temperature alert cleared (Unit-03)', type: 'warning' },
];

export default function RecentActivity() {
  return (
    <div className="panel h-full">
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        Recent Activity
      </span>
      <div className="mt-3 space-y-2.5">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3 py-1.5 border-b border-border/20 last:border-0">
            <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">{a.time}</span>
            <span className="text-xs font-mono text-foreground/80">{a.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

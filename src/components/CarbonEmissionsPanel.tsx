import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Leaf, TrendingDown } from 'lucide-react';

const data = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  emissions: Math.max(0, 45 + Math.sin(i * 0.5) * 20 + (Math.random() - 0.5) * 10),
  target: 40,
}));

export default function CarbonEmissionsPanel() {
  const currentEmission = data[data.length - 1].emissions;
  const avgEmission = data.reduce((sum, d) => sum + d.emissions, 0) / data.length;

  return (
    <div className="panel space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-secondary" />
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Carbon Emissions (24h)
          </span>
        </div>
        <div className="flex items-center gap-1 text-secondary text-xs font-mono">
          <TrendingDown className="h-3 w-3" />
          <span>-12.4%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground font-mono">Current</p>
          <p className="reading-value text-lg">{currentEmission.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground font-mono">tCO₂/h</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-mono">Average</p>
          <p className="reading-value text-lg">{avgEmission.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground font-mono">tCO₂/h</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-mono">Target</p>
          <p className="font-mono text-lg font-bold text-secondary" style={{ textShadow: 'var(--glow-success)' }}>40.0</p>
          <p className="text-xs text-muted-foreground font-mono">tCO₂/h</p>
        </div>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="emissionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)' }}
              tickLine={false}
              axisLine={false}
              interval={5}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: 'hsl(220, 40%, 10%)',
                border: '1px solid hsl(220, 30%, 18%)',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono',
              }}
              labelStyle={{ color: 'hsl(200, 20%, 90%)' }}
            />
            <Area
              type="monotone"
              dataKey="emissions"
              stroke="hsl(187, 94%, 43%)"
              fill="url(#emissionGrad)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="hsl(160, 84%, 39%)"
              strokeDasharray="4 4"
              fill="none"
              strokeWidth={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

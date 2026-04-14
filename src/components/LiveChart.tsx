import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { useEffect, useState } from 'react';

interface LiveChartProps {
  title: string;
  dataKey: string;
  color?: string;
  unit?: string;
}

function generateData() {
  return Array.from({ length: 30 }, (_, i) => ({
    time: `${i}m`,
    value: 60 + Math.sin(i * 0.3) * 15 + (Math.random() - 0.5) * 8,
    predicted: 60 + Math.sin(i * 0.3) * 12,
  }));
}

export default function LiveChart({ title, dataKey, color = 'hsl(142, 71%, 45%)', unit = '' }: LiveChartProps) {
  const [data, setData] = useState(generateData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newPoint = {
          time: `${prev.length}m`,
          value: prev[prev.length - 1].value + (Math.random() - 0.5) * 5,
          predicted: prev[prev.length - 1].predicted + (Math.random() - 0.5) * 2,
        };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{title}</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-mono text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            <span className="text-[10px] font-mono text-muted-foreground">AI Predicted</span>
          </div>
        </div>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 12%)" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: 'hsl(150, 5%, 45%)' }}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'hsl(150, 5%, 45%)' }}
              tickLine={false}
              axisLine={false}
              width={35}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(0, 0%, 7%)',
                border: '1px solid hsl(0, 0%, 14%)',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono',
              }}
              labelStyle={{ color: 'hsl(150, 10%, 88%)' }}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="hsl(150, 5%, 35%)"
              strokeDasharray="4 4"
              fill="none"
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#grad-${dataKey})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

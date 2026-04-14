import DashboardLayout from '@/layouts/DashboardLayout';
import PageTitle from '@/components/PageTitle';
import CommandStatsCard from '@/components/CommandStatsCard';
import CarbonEmissionsPanel from '@/components/CarbonEmissionsPanel';
import LiveChart from '@/components/LiveChart';
import { motion } from 'framer-motion';
import { Factory, Leaf, TrendingDown, Sun } from 'lucide-react';

const CarbonAnalytics = () => {
  return (
    <DashboardLayout title="Carbon Analytics" subtitle="">
      <div className="p-5 space-y-5">
        <PageTitle first="CARBON" highlight="ANALYTICS" subtitle="CO2 emissions tracking and analysis" />

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-4">
          <CommandStatsCard label="Today's Emissions" value="38.4" unit="tCO2" subtitle="Daily total" icon={Factory} />
          <CommandStatsCard label="This Month" value="892" unit="tCO2" subtitle="Monthly cumulative" icon={Leaf} />
          <CommandStatsCard label="Reduction vs Baseline" value="18.5" unit="%" subtitle="30-day average" icon={TrendingDown} />
          <CommandStatsCard label="Renewable Share" value="35" unit="%" subtitle="Carbon Score: 72" icon={Sun} />
        </motion.div>

        {/* Carbon Score gauge + Emissions by source + Daily trend */}
        <div className="grid grid-cols-3 gap-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <CarbonNeutralScore score={72} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <EmissionsBySource />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <LiveChart title="Daily Trend (21 Days)" dataKey="daily" />
          </motion.div>
        </div>

        {/* AI Carbon Forecast */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="panel">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">AI Carbon Forecast (Next 24H)</span>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary pulse-glow" />
                <span className="text-[10px] font-mono text-primary">AI Prediction Active</span>
              </div>
            </div>
            <div className="h-48">
              <LiveChart title="" dataKey="forecast" />
            </div>
          </div>
        </motion.div>

        {/* Recent emission records */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <EmissionRecords />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

function CarbonNeutralScore({ score }: { score: number }) {
  const rotation = (score / 100) * 180 - 90;
  return (
    <div className="panel flex flex-col items-center justify-center h-full">
      <svg viewBox="0 0 200 120" className="w-48 h-auto mb-2">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="hsl(0, 0%, 14%)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="hsl(45, 93%, 47%)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 251} 251`}
        />
        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2={100 + Math.cos((rotation * Math.PI) / 180) * 60}
          y2={100 + Math.sin((rotation * Math.PI) / 180) * 60}
          stroke="hsl(45, 93%, 47%)"
          strokeWidth="2"
        />
        <circle cx="100" cy="100" r="4" fill="hsl(45, 93%, 47%)" />
      </svg>
      <span className="font-mono text-3xl font-bold text-yellow-500" style={{ textShadow: 'var(--glow-warning)' }}>{score}</span>
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">Carbon Neutral Score</span>
    </div>
  );
}

function EmissionsBySource() {
  const sources = [
    { name: 'Transformer Losses', value: 45, color: 'bg-primary' },
    { name: 'Cooling Systems', value: 25, color: 'bg-yellow-500' },
    { name: 'Auxiliary Power', value: 20, color: 'bg-blue-400' },
    { name: 'SF6 Leakage', value: 10, color: 'bg-destructive' },
  ];
  return (
    <div className="panel h-full">
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Emissions by Source</span>
      <div className="mt-4 space-y-3">
        {sources.map(s => (
          <div key={s.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-muted-foreground">{s.name}</span>
              <span className="text-[10px] font-mono text-foreground">{s.value}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmissionRecords() {
  const records = [
    { source: 'Transformer Unit-01', amount: '4.2', location: 'Bay A1', time: '16:00' },
    { source: 'Cooling System', amount: '2.1', location: 'Main Hall', time: '15:45' },
    { source: 'Auxiliary Generator', amount: '1.8', location: 'Bay B2', time: '15:30' },
    { source: 'Transformer Unit-02', amount: '3.9', location: 'Bay A2', time: '15:15' },
  ];
  return (
    <div className="panel">
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Recent Emission Records</span>
      <table className="w-full mt-3">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-[10px] font-mono text-muted-foreground uppercase tracking-wider py-2">Source</th>
            <th className="text-left text-[10px] font-mono text-muted-foreground uppercase tracking-wider py-2">Amount (tCO2)</th>
            <th className="text-left text-[10px] font-mono text-muted-foreground uppercase tracking-wider py-2">Location</th>
            <th className="text-left text-[10px] font-mono text-muted-foreground uppercase tracking-wider py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i} className="border-b border-border/20">
              <td className="text-xs font-mono text-foreground py-2.5">{r.source}</td>
              <td className="text-xs font-mono text-primary py-2.5">{r.amount}</td>
              <td className="text-xs font-mono text-muted-foreground py-2.5">{r.location}</td>
              <td className="text-xs font-mono text-muted-foreground py-2.5">{r.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarbonAnalytics;

import DashboardLayout from '@/layouts/DashboardLayout';
import PageTitle from '@/components/PageTitle';
import CommandStatsCard from '@/components/CommandStatsCard';
import GridNetworkViz from '@/components/GridNetworkViz';
import LiveChart from '@/components/LiveChart';
import AlertsPanel from '@/components/AlertsPanel';
import RecentActivity from '@/components/RecentActivity';
import { motion } from 'framer-motion';
import { Monitor, AlertTriangle, Zap, Leaf, Globe, TrendingDown, Activity, Settings } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const Index = () => {
  return (
    <DashboardLayout title="Command Overview" subtitle="">
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <PageTitle first="COMMAND" highlight="OVERVIEW" subtitle="Smart Carbon Neutral UHV Monitoring System" />
          <div className="flex items-center gap-2 panel-glow px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-primary pulse-glow" />
            <span className="text-[10px] font-mono text-primary uppercase tracking-wider">LIVE</span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Stats Row 1 */}
        <motion.div {...fadeIn} className="grid grid-cols-4 gap-4">
          <CommandStatsCard label="Active Sensors" value="247" unit="" subtitle="3 offline" icon={Monitor} />
          <CommandStatsCard label="Active Alerts" value="2" unit="" subtitle="0 critical" icon={AlertTriangle} />
          <CommandStatsCard label="Grid Voltage" value="1000.0" unit="kV" subtitle="50.00 Hz" icon={Zap} />
          <CommandStatsCard label="Renewable Share" value="35" unit="%" subtitle="Carbon Score: 72" icon={Leaf} />
        </motion.div>

        {/* Stats Row 2 */}
        <motion.div {...fadeIn} transition={{ delay: 0.05 }} className="grid grid-cols-4 gap-4">
          <CommandStatsCard label="Carbon Rate" value="12.4" unit="t/hr" subtitle="Real-time CO2 output" icon={Globe} />
          <CommandStatsCard label="Current Load" value="3,200" unit="MW" subtitle="Peak: 3,450 MW" icon={TrendingDown} />
          <CommandStatsCard label="System Efficiency" value="98.2" unit="%" subtitle="Transmission efficiency" icon={Activity} />
          <CommandStatsCard label="Equipment Faults" value="1" unit="" subtitle="of 24 units" icon={Settings} />
        </motion.div>

        {/* Grid Network + Carbon Trend */}
        <div className="grid grid-cols-2 gap-5">
          <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="h-[300px]">
            <GridNetworkViz />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
            <div className="panel">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">30-Day Carbon Emissions Trend</span>
                <span className="text-[10px] font-mono text-primary">18.5% reduction vs baseline</span>
              </div>
              <div className="h-[240px]">
                <LiveChart title="" dataKey="emissions" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Alerts + Recent Activity */}
        <div className="grid grid-cols-2 gap-5">
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <AlertsPanel />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.25 }}>
            <RecentActivity />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

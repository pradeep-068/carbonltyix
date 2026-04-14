import DashboardLayout from '@/layouts/DashboardLayout';
import PageTitle from '@/components/PageTitle';
import CommandStatsCard from '@/components/CommandStatsCard';
import LiveChart from '@/components/LiveChart';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Battery, Sun } from 'lucide-react';

const Energy = () => {
  return (
    <DashboardLayout title="Energy" subtitle="">
      <div className="p-5 space-y-5">
        <PageTitle first="ENERGY" highlight="ANALYTICS" subtitle="Power generation, distribution and renewable integration" />

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-4">
          <CommandStatsCard label="Total Generation" value="4,520" unit="MW" subtitle="Active capacity" icon={Zap} />
          <CommandStatsCard label="Peak Demand" value="3,890" unit="MW" subtitle="Today's peak" icon={TrendingUp} />
          <CommandStatsCard label="Storage Level" value="78" unit="%" subtitle="Battery reserves" icon={Battery} />
          <CommandStatsCard label="Renewable Mix" value="35" unit="%" subtitle="Solar + Wind" icon={Sun} />
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <LiveChart title="Power Generation (MW)" dataKey="power" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <LiveChart title="Grid Frequency (Hz)" dataKey="frequency" color="hsl(45, 93%, 47%)" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <LiveChart title="Renewable Integration %" dataKey="renewable" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <LiveChart title="Transmission Loss (MW)" dataKey="loss" color="hsl(0, 72%, 51%)" />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Energy;

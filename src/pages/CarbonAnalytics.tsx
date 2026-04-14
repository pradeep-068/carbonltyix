import DashboardLayout from '@/layouts/DashboardLayout';
import CarbonEmissionsPanel from '@/components/CarbonEmissionsPanel';
import LiveChart from '@/components/LiveChart';
import StatsCard from '@/components/StatsCard';
import { motion } from 'framer-motion';
import { Leaf, TreePine, Factory, Target } from 'lucide-react';

const CarbonAnalytics = () => {
  return (
    <DashboardLayout title="Carbon Analytics" subtitle="Emissions Tracking & Sustainability Metrics">
      <div className="p-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-4">
          <StatsCard label="Daily Emissions" value="38.4" unit="tCO₂" icon={Factory} trend={-12.4} />
          <StatsCard label="Carbon Credits" value="156" unit="units" icon={Leaf} trend={8.2} />
          <StatsCard label="Trees Equivalent" value="2,340" unit="saved" icon={TreePine} trend={15.1} />
          <StatsCard label="Target Progress" value="87" unit="%" icon={Target} trend={3.4} />
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <CarbonEmissionsPanel />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <LiveChart title="Renewable Integration %" dataKey="renewable" color="hsl(142, 71%, 45%)" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <LiveChart title="Grid Carbon Intensity" dataKey="intensity" color="hsl(45, 93%, 47%)" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <LiveChart title="Emission Reduction Rate" dataKey="reduction" />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CarbonAnalytics;

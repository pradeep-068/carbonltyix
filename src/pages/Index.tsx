import DashboardLayout from '@/layouts/DashboardLayout';
import TransformerScene from '@/components/TransformerScene';
import MonitoringGauge from '@/components/MonitoringGauge';
import CarbonEmissionsPanel from '@/components/CarbonEmissionsPanel';
import SystemStatusPanel from '@/components/SystemStatusPanel';
import StatsCard from '@/components/StatsCard';
import AlertsPanel from '@/components/AlertsPanel';
import LiveChart from '@/components/LiveChart';
import EquipmentHealth from '@/components/EquipmentHealth';
import { motion } from 'framer-motion';
import { Zap, Thermometer, Gauge, BatteryCharging } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const Index = () => {
  return (
    <DashboardLayout title="Dashboard" subtitle="Real-time UHV Substation Overview">
      <div className="p-5 space-y-5">
        {/* Stats row */}
        <motion.div {...fadeIn} className="grid grid-cols-4 gap-4">
          <StatsCard label="Voltage" value="765.2" unit="kV" icon={Zap} trend={0.3} />
          <StatsCard label="Temperature" value="62.4" unit="°C" icon={Thermometer} trend={-1.2} />
          <StatsCard label="Load Factor" value="72.1" unit="%" icon={Gauge} trend={2.1} />
          <StatsCard label="Efficiency" value="98.7" unit="%" icon={BatteryCharging} trend={0.1} />
        </motion.div>

        {/* Main content: 3D + Charts */}
        <div className="grid grid-cols-3 gap-5">
          {/* 3D Digital Twin */}
          <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="col-span-2 h-[420px] rounded-lg overflow-hidden border border-border">
            <TransformerScene />
          </motion.div>

          {/* Monitoring Gauges */}
          <motion.div {...fadeIn} transition={{ delay: 0.15 }} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <MonitoringGauge label="Voltage" value={765} unit="kV" min={700} max={800} warningThreshold={780} dangerThreshold={795} />
              <MonitoringGauge label="Current" value={3200} unit="A" min={0} max={5000} warningThreshold={4000} dangerThreshold={4500} />
              <MonitoringGauge label="Temperature" value={62} unit="°C" min={20} max={120} warningThreshold={85} dangerThreshold={100} />
              <MonitoringGauge label="Load" value={72} unit="%" min={0} max={100} warningThreshold={80} dangerThreshold={95} />
            </div>
            <SystemStatusPanel />
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-5">
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <CarbonEmissionsPanel />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.25 }}>
            <LiveChart title="Power Output" dataKey="power" />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <AlertsPanel />
          </motion.div>
        </div>

        {/* Equipment Health */}
        <motion.div {...fadeIn} transition={{ delay: 0.35 }}>
          <EquipmentHealth />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

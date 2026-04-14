import DashboardLayout from '@/layouts/DashboardLayout';
import LiveChart from '@/components/LiveChart';
import MonitoringGauge from '@/components/MonitoringGauge';
import EquipmentHealth from '@/components/EquipmentHealth';
import { motion } from 'framer-motion';

const Monitoring = () => {
  return (
    <DashboardLayout title="Monitoring" subtitle="Real-time Sensor Data & Analytics">
      <div className="p-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-3">
          <MonitoringGauge label="Voltage" value={765} unit="kV" min={700} max={800} warningThreshold={780} dangerThreshold={795} />
          <MonitoringGauge label="Current" value={3200} unit="A" min={0} max={5000} warningThreshold={4000} dangerThreshold={4500} />
          <MonitoringGauge label="Temperature" value={62} unit="°C" min={20} max={120} warningThreshold={85} dangerThreshold={100} />
          <MonitoringGauge label="Load" value={72} unit="%" min={0} max={100} warningThreshold={80} dangerThreshold={95} />
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <LiveChart title="Voltage Trend" dataKey="voltage" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <LiveChart title="Temperature Trend" dataKey="temp" color="hsl(45, 93%, 47%)" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <LiveChart title="Current Load" dataKey="current" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <LiveChart title="Power Factor" dataKey="pf" color="hsl(200, 80%, 50%)" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <EquipmentHealth />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Monitoring;

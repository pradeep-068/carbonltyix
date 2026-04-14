import DashboardLayout from '@/layouts/DashboardLayout';
import TransformerScene from '@/components/TransformerScene';
import MonitoringGauge from '@/components/MonitoringGauge';
import { motion } from 'framer-motion';

const DigitalTwin = () => {
  return (
    <DashboardLayout title="Digital Twin" subtitle="3D Interactive Transformer Model">
      <div className="p-5 grid grid-cols-4 gap-5 h-[calc(100vh-65px)]">
        {/* 3D Scene - large */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-3 rounded-lg overflow-hidden border border-border"
        >
          <TransformerScene />
        </motion.div>

        {/* Side panel */}
        <div className="space-y-4 overflow-y-auto">
          <MonitoringGauge label="Voltage" value={765} unit="kV" min={700} max={800} warningThreshold={780} dangerThreshold={795} />
          <MonitoringGauge label="Current" value={3200} unit="A" min={0} max={5000} warningThreshold={4000} dangerThreshold={4500} />
          <MonitoringGauge label="Temperature" value={62} unit="°C" min={20} max={120} warningThreshold={85} dangerThreshold={100} />
          <MonitoringGauge label="Load" value={72} unit="%" min={0} max={100} warningThreshold={80} dangerThreshold={95} />
          <MonitoringGauge label="Oil Level" value={87} unit="%" min={0} max={100} warningThreshold={30} dangerThreshold={15} />
          <MonitoringGauge label="Vibration" value={2.3} unit="mm/s" min={0} max={10} warningThreshold={5} dangerThreshold={8} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DigitalTwin;

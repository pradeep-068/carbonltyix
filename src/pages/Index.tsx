import Header from '@/components/Header';
import TransformerScene from '@/components/TransformerScene';
import MonitoringGauge from '@/components/MonitoringGauge';
import CarbonEmissionsPanel from '@/components/CarbonEmissionsPanel';
import SystemStatusPanel from '@/components/SystemStatusPanel';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* 3D Viewer - takes 2/3 */}
        <div className="lg:col-span-2 h-[50vh] lg:h-auto border-b lg:border-b-0 lg:border-r border-border">
          <TransformerScene />
        </div>

        {/* Right sidebar - monitoring panels */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-57px)]">
          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <div className="grid grid-cols-2 gap-3">
              <MonitoringGauge
                label="Voltage"
                value={765}
                unit="kV"
                min={700}
                max={800}
                warningThreshold={780}
                dangerThreshold={795}
              />
              <MonitoringGauge
                label="Current"
                value={3200}
                unit="A"
                min={0}
                max={5000}
                warningThreshold={4000}
                dangerThreshold={4500}
              />
              <MonitoringGauge
                label="Temperature"
                value={62}
                unit="°C"
                min={20}
                max={120}
                warningThreshold={85}
                dangerThreshold={100}
              />
              <MonitoringGauge
                label="Load"
                value={72}
                unit="%"
                min={0}
                max={100}
                warningThreshold={80}
                dangerThreshold={95}
              />
            </div>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <CarbonEmissionsPanel />
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <SystemStatusPanel />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import DashboardLayout from '@/layouts/DashboardLayout';
import PageTitle from '@/components/PageTitle';
import MonitoringGauge from '@/components/MonitoringGauge';
import LiveChart from '@/components/LiveChart';
import { motion } from 'framer-motion';
import { useState } from 'react';

const sensorTypes = ['ALL', 'VOLTAGE', 'CURRENT', 'TEMPERATURE', 'LOAD', 'CARBON', 'RENEWABLE'];

const sensors = [
  { id: 'S-001', type: 'VOLTAGE', label: 'Bus Voltage A', value: 765, unit: 'kV', min: 700, max: 800, warning: 780, danger: 795, status: 'online' as const },
  { id: 'S-002', type: 'VOLTAGE', label: 'Bus Voltage B', value: 762, unit: 'kV', min: 700, max: 800, warning: 780, danger: 795, status: 'online' as const },
  { id: 'S-003', type: 'CURRENT', label: 'Line Current A', value: 3200, unit: 'A', min: 0, max: 5000, warning: 4000, danger: 4500, status: 'online' as const },
  { id: 'S-004', type: 'CURRENT', label: 'Line Current B', value: 3150, unit: 'A', min: 0, max: 5000, warning: 4000, danger: 4500, status: 'online' as const },
  { id: 'S-005', type: 'TEMPERATURE', label: 'Transformer Temp', value: 62, unit: '°C', min: 20, max: 120, warning: 85, danger: 100, status: 'online' as const },
  { id: 'S-006', type: 'TEMPERATURE', label: 'Oil Temperature', value: 55, unit: '°C', min: 20, max: 120, warning: 85, danger: 100, status: 'online' as const },
  { id: 'S-007', type: 'LOAD', label: 'Load Factor', value: 72, unit: '%', min: 0, max: 100, warning: 80, danger: 95, status: 'online' as const },
  { id: 'S-008', type: 'LOAD', label: 'Power Factor', value: 96, unit: '%', min: 80, max: 100, warning: 90, danger: 85, status: 'online' as const },
  { id: 'S-009', type: 'CARBON', label: 'CO₂ Emissions', value: 12.4, unit: 't/hr', min: 0, max: 50, warning: 30, danger: 40, status: 'online' as const },
  { id: 'S-010', type: 'RENEWABLE', label: 'Solar Input', value: 35, unit: '%', min: 0, max: 100, warning: 20, danger: 10, status: 'warning' as const },
  { id: 'S-011', type: 'VOLTAGE', label: 'Bus Voltage C', value: 0, unit: 'kV', min: 700, max: 800, warning: 780, danger: 795, status: 'offline' as const },
  { id: 'S-012', type: 'TEMPERATURE', label: 'Ambient Temp', value: 28, unit: '°C', min: -10, max: 50, warning: 40, danger: 45, status: 'online' as const },
];

const Sensors = () => {
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL' ? sensors : sensors.filter(s => s.type === filter);

  const onlineCount = sensors.filter(s => s.status === 'online').length;
  const warningCount = sensors.filter(s => s.status === 'warning').length;
  const offlineCount = sensors.filter(s => s.status === 'offline').length;

  return (
    <DashboardLayout title="IoT Sensors" subtitle="">
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <PageTitle first="IOT" highlight="SENSORS" subtitle="Real-time IoT sensor grid monitoring" />
          <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Online: {onlineCount}</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-yellow-500" />Warning: {warningCount}</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Offline: {offlineCount}</span>
          </div>
        </div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
          {sensorTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider border transition-all ${
                filter === type
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'text-muted-foreground border-border hover:border-primary/20 hover:text-foreground'
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Sensor grid */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-3">
          {filtered.map(sensor => (
            <div key={sensor.id} className={`panel relative ${sensor.status === 'offline' ? 'opacity-40' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-muted-foreground">{sensor.id}</span>
                <div className={`h-2 w-2 rounded-full ${
                  sensor.status === 'online' ? 'bg-primary pulse-glow' :
                  sensor.status === 'warning' ? 'bg-yellow-500' : 'bg-muted-foreground'
                }`} />
              </div>
              <p className="text-xs font-mono text-foreground mb-1">{sensor.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-xl font-bold text-primary" style={{ textShadow: 'var(--glow-primary)' }}>
                  {sensor.value}
                </span>
                <span className="text-xs font-mono text-muted-foreground">{sensor.unit}</span>
              </div>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <LiveChart title="Voltage Trend" dataKey="voltage" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <LiveChart title="Temperature Trend" dataKey="temp" color="hsl(45, 93%, 47%)" />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sensors;

import DashboardLayout from '@/layouts/DashboardLayout';
import PageTitle from '@/components/PageTitle';
import { motion } from 'framer-motion';
import { useState } from 'react';

type EquipmentStatus = 'operational' | 'maintenance' | 'fault' | 'offline';

interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  status: EquipmentStatus;
  health: number;
  temp: string;
  lastMaintenance: string;
  location: string;
}

const equipmentData: EquipmentItem[] = [
  { id: 'TF-001', name: 'Transformer Unit-01', type: 'Power Transformer', status: 'operational', health: 96, temp: '62°C', lastMaintenance: '2026-03-15', location: 'Bay A1' },
  { id: 'TF-002', name: 'Transformer Unit-02', type: 'Power Transformer', status: 'operational', health: 88, temp: '71°C', lastMaintenance: '2026-02-28', location: 'Bay A2' },
  { id: 'TF-003', name: 'Transformer Unit-03', type: 'Power Transformer', status: 'maintenance', health: 74, temp: '45°C', lastMaintenance: '2026-04-10', location: 'Bay A3' },
  { id: 'BR-001', name: 'Bus Reactor BR-01', type: 'Shunt Reactor', status: 'operational', health: 92, temp: '55°C', lastMaintenance: '2026-03-20', location: 'Bay B1' },
  { id: 'CB-001', name: 'Circuit Breaker CB-01', type: 'SF6 Breaker', status: 'operational', health: 98, temp: '38°C', lastMaintenance: '2026-03-01', location: 'Bay C1' },
  { id: 'CB-002', name: 'Circuit Breaker CB-02', type: 'SF6 Breaker', status: 'fault', health: 45, temp: '92°C', lastMaintenance: '2026-01-15', location: 'Bay C2' },
  { id: 'CT-001', name: 'Current Transformer CT-01', type: 'Instrument', status: 'operational', health: 95, temp: '42°C', lastMaintenance: '2026-03-22', location: 'Bay D1' },
  { id: 'DS-001', name: 'Disconnect Switch DS-01', type: 'Isolator', status: 'offline', health: 0, temp: '--', lastMaintenance: '2026-04-05', location: 'Bay E1' },
];

const statusColors: Record<EquipmentStatus, string> = {
  operational: 'bg-primary text-primary border-primary/30',
  maintenance: 'bg-yellow-500 text-yellow-500 border-yellow-500/30',
  fault: 'bg-destructive text-destructive border-destructive/30',
  offline: 'bg-muted-foreground text-muted-foreground border-muted/30',
};

const Equipment = () => {
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { key: 'all', label: 'ALL' },
    { key: 'operational', label: `OPERATIONAL: ${equipmentData.filter(e => e.status === 'operational').length}` },
    { key: 'maintenance', label: `MAINTENANCE: ${equipmentData.filter(e => e.status === 'maintenance').length}` },
    { key: 'fault', label: `FAULT: ${equipmentData.filter(e => e.status === 'fault').length}` },
    { key: 'offline', label: `OFFLINE: ${equipmentData.filter(e => e.status === 'offline').length}` },
  ];

  const filtered = filter === 'all' ? equipmentData : equipmentData.filter(e => e.status === filter);

  return (
    <DashboardLayout title="Equipment" subtitle="">
      <div className="p-5 space-y-5">
        <PageTitle first="EQUIPMENT" highlight="CONTROL" subtitle="Infrastructure health and status management" />

        {/* Status filter tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
          {filters.map(f => {
            const statusColor = f.key === 'all' ? 'border-border' :
              f.key === 'operational' ? 'border-primary/30' :
              f.key === 'maintenance' ? 'border-yellow-500/30' :
              f.key === 'fault' ? 'border-destructive/30' : 'border-muted/30';
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider border transition-all ${
                  filter === f.key
                    ? `${statusColor} bg-primary/10 text-primary`
                    : `${statusColor} text-muted-foreground hover:text-foreground`
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>

        {/* Equipment grid */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
          {filtered.map(eq => {
            const statusCls = statusColors[eq.status];
            return (
              <div key={eq.id} className={`panel ${eq.status === 'offline' ? 'opacity-50' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-muted-foreground">{eq.id}</span>
                      <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border bg-opacity-10 ${statusCls}`}>
                        {eq.status}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-foreground font-medium">{eq.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{eq.type} • {eq.location}</p>
                  </div>
                  <span className={`font-mono text-lg font-bold ${
                    eq.health >= 90 ? 'text-primary' : eq.health >= 70 ? 'text-yellow-500' : 'text-destructive'
                  }`}>{eq.health}%</span>
                </div>

                <div className="h-1 bg-muted rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all ${
                      eq.health >= 90 ? 'bg-primary' : eq.health >= 70 ? 'bg-yellow-500' : 'bg-destructive'
                    }`}
                    style={{ width: `${eq.health}%` }}
                  />
                </div>

                <div className="flex gap-4 text-[10px] font-mono text-muted-foreground">
                  <span>Temp: {eq.temp}</span>
                  <span>Last Service: {eq.lastMaintenance}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Equipment;

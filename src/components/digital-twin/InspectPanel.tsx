import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface EquipmentData {
  id: string;
  type: string;
  status: string;
  params: Record<string, string>;
}

const EQUIPMENT_DATA: Record<string, EquipmentData> = {
  'TR-01': { id: 'TR-01', type: 'Power Transformer', status: 'Operational', params: { 'Voltage': '1000 kV', 'Current': '3200 A', 'Oil Temp': '62°C', 'Load': '72%', 'Cooling': 'ONAN Active', 'DGA': 'Normal', 'Health': '98.2%' } },
  'TR-02': { id: 'TR-02', type: 'Power Transformer', status: 'Operational', params: { 'Voltage': '1000 kV', 'Current': '2850 A', 'Oil Temp': '58°C', 'Load': '65%', 'Cooling': 'ONAN Active', 'DGA': 'Normal', 'Health': '97.8%' } },
  'TR-03': { id: 'TR-03', type: 'Power Transformer', status: 'Maintenance', params: { 'Voltage': '995 kV', 'Current': '1200 A', 'Oil Temp': '45°C', 'Load': '28%', 'Cooling': 'Reduced', 'DGA': 'Watch', 'Health': '89.1%' } },
  'CB-01': { id: 'CB-01', type: 'Circuit Breaker', status: 'Closed', params: { 'Rated': '1000 kV', 'Breaking': '63 kA', 'Operations': '1,247', 'Last Trip': 'None', 'Condition': 'Good' } },
  'CB-02': { id: 'CB-02', type: 'Circuit Breaker', status: 'Closed', params: { 'Rated': '1000 kV', 'Breaking': '63 kA', 'Operations': '892', 'Last Trip': '12 days ago', 'Condition': 'Good' } },
  'CB-03': { id: 'CB-03', type: 'Circuit Breaker', status: 'Open', params: { 'Rated': '1000 kV', 'Breaking': '63 kA', 'Operations': '2,103', 'Last Trip': '2 hrs ago', 'Condition': 'Check' } },
  'SA-01': { id: 'SA-01', type: 'Surge Arrester', status: 'Active', params: { 'Rating': '1000 kV', 'Leakage': '0.2 mA', 'Discharge Count': '3', 'Condition': 'Good' } },
  'SA-02': { id: 'SA-02', type: 'Surge Arrester', status: 'Active', params: { 'Rating': '1000 kV', 'Leakage': '0.15 mA', 'Discharge Count': '1', 'Condition': 'Good' } },
  'CAP-01': { id: 'CAP-01', type: 'Capacitor Bank', status: 'Online', params: { 'Capacity': '200 MVAr', 'Voltage': '1000 kV', 'Temperature': '35°C', 'Steps Active': '3/4' } },
};

interface InspectPanelProps {
  selectedId: string | null;
  onClose: () => void;
}

export default function InspectPanel({ selectedId, onClose }: InspectPanelProps) {
  const data = selectedId ? EQUIPMENT_DATA[selectedId] : null;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute top-4 right-4 w-72 panel-glow z-10"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{data.type}</p>
              <p className="text-sm font-display font-bold text-primary tracking-wider">{data.id}</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors p-1">
              <X size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className={`h-2 w-2 rounded-full ${
              data.status === 'Operational' || data.status === 'Active' || data.status === 'Closed' || data.status === 'Online'
                ? 'bg-primary pulse-glow'
                : data.status === 'Maintenance' || data.status === 'Check' || data.status === 'Open'
                  ? 'bg-yellow-500'
                  : 'bg-destructive'
            }`} />
            <span className="text-xs font-mono text-primary uppercase">{data.status}</span>
          </div>

          <div className="space-y-1.5">
            {Object.entries(data.params).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-1 border-b border-border/30">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">{key}</span>
                <span className="text-[11px] font-mono text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-border/30">
            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
              Last Updated: {new Date().toLocaleTimeString()} • Live
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

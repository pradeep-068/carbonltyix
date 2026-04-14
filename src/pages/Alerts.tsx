import DashboardLayout from '@/layouts/DashboardLayout';
import PageTitle from '@/components/PageTitle';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const allAlerts = [
  { id: 1, type: 'warning', message: 'Grid Sync latency above threshold (89ms)', time: '2 min ago', system: 'Grid Sync', severity: 'medium' },
  { id: 2, type: 'info', message: 'AI model retrained with latest sensor data', time: '15 min ago', system: 'AI Engine', severity: 'low' },
  { id: 3, type: 'success', message: 'Blockchain ledger verification complete', time: '32 min ago', system: 'Blockchain', severity: 'low' },
  { id: 4, type: 'danger', message: 'Temperature spike detected in Unit-03 (85°C)', time: '1 hr ago', system: 'IoT Sensors', severity: 'high' },
  { id: 5, type: 'warning', message: 'Carbon emission approaching daily target (92%)', time: '2 hr ago', system: 'Carbon Monitor', severity: 'medium' },
  { id: 6, type: 'danger', message: 'Circuit Breaker CB-02 fault detected', time: '3 hr ago', system: 'Equipment', severity: 'critical' },
  { id: 7, type: 'info', message: 'Scheduled maintenance window in 4 hours', time: '4 hr ago', system: 'Operations', severity: 'low' },
  { id: 8, type: 'success', message: 'All sensors recalibrated successfully', time: '6 hr ago', system: 'IoT Sensors', severity: 'low' },
];

const iconMap: Record<string, typeof AlertTriangle> = {
  warning: AlertTriangle,
  info: Info,
  danger: XCircle,
  success: CheckCircle,
};

const colorMap: Record<string, string> = {
  warning: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  info: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  danger: 'text-destructive bg-destructive/10 border-destructive/20',
  success: 'text-primary bg-primary/10 border-primary/20',
};

const Alerts = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? allAlerts :
    filter === 'critical' ? allAlerts.filter(a => a.type === 'danger') :
    allAlerts.filter(a => a.type === filter);

  return (
    <DashboardLayout title="Alerts" subtitle="">
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <PageTitle first="SYSTEM" highlight="ALERTS" subtitle="Real-time system notifications and warnings" />
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-destructive">{allAlerts.filter(a => a.type === 'danger').length} critical</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-yellow-500">{allAlerts.filter(a => a.type === 'warning').length} warnings</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-primary">{allAlerts.length} total</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
          {['all', 'critical', 'warning', 'info', 'success'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider border transition-all ${
                filter === f
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          {filtered.map(alert => {
            const Icon = iconMap[alert.type];
            const colors = colorMap[alert.type];
            return (
              <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${colors} transition-all`}>
                <Icon className="h-4 w-4 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-mono">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-muted-foreground">{alert.system}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">•</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{alert.time}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">•</span>
                    <span className={`text-[10px] font-mono uppercase ${
                      alert.severity === 'critical' ? 'text-destructive' :
                      alert.severity === 'high' ? 'text-destructive' :
                      alert.severity === 'medium' ? 'text-yellow-500' : 'text-muted-foreground'
                    }`}>{alert.severity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;

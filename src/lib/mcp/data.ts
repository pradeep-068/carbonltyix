// Static substation telemetry snapshot shared by the MCP tools.
// Pure data only — no env reads, no I/O (this module is import-safe).

export interface EquipmentRecord {
  id: string;
  type: string;
  status: string;
  health: number;
  params: Record<string, string>;
}

export const EQUIPMENT: EquipmentRecord[] = [
  { id: 'TR-01', type: 'Power Transformer', status: 'Operational', health: 98.2, params: { voltage: '1000 kV', current: '3200 A', oilTemp: '62°C', load: '72%', cooling: 'ONAN Active', dga: 'Normal' } },
  { id: 'TR-02', type: 'Power Transformer', status: 'Operational', health: 97.8, params: { voltage: '1000 kV', current: '2850 A', oilTemp: '58°C', load: '65%', cooling: 'ONAN Active', dga: 'Normal' } },
  { id: 'TR-03', type: 'Power Transformer', status: 'Maintenance', health: 89.1, params: { voltage: '995 kV', current: '1200 A', oilTemp: '45°C', load: '28%', cooling: 'Reduced', dga: 'Watch' } },
  { id: 'CB-01', type: 'Circuit Breaker', status: 'Closed', health: 96.0, params: { rated: '1000 kV', breaking: '63 kA', operations: '1247', lastTrip: 'None' } },
  { id: 'CB-02', type: 'Circuit Breaker', status: 'Closed', health: 95.4, params: { rated: '1000 kV', breaking: '63 kA', operations: '892', lastTrip: '12 days ago' } },
  { id: 'CB-03', type: 'Circuit Breaker', status: 'Open', health: 82.5, params: { rated: '1000 kV', breaking: '63 kA', operations: '2103', lastTrip: '2 hrs ago' } },
  { id: 'SA-01', type: 'Surge Arrester', status: 'Active', health: 99.0, params: { rating: '1000 kV', leakage: '0.2 mA', discharges: '3' } },
  { id: 'SA-02', type: 'Surge Arrester', status: 'Active', health: 99.3, params: { rating: '1000 kV', leakage: '0.15 mA', discharges: '1' } },
  { id: 'CAP-01', type: 'Capacitor Bank', status: 'Online', health: 94.7, params: { capacity: '200 MVAr', voltage: '1000 kV', temperature: '35°C', steps: '3/4' } },
];

export const GRID_STATUS = {
  substation: 'Substation Alpha',
  gridVoltageKv: 1000.0,
  frequencyHz: 50.0,
  currentLoadMw: 3200,
  peakLoadMw: 3450,
  transmissionEfficiencyPct: 98.2,
  activeSensors: 247,
  offlineSensors: 3,
  equipmentFaults: 1,
  totalUnits: 24,
};

export const CARBON_METRICS = {
  carbonRateTonnesPerHour: 12.4,
  renewableSharePct: 35,
  carbonScore: 72,
  reductionVsBaselinePct: 18.5,
  offsetsVerifiedOnLedger: true,
};

export interface AlertRecord {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  source: string;
  message: string;
  time: string;
}

export const ALERTS: AlertRecord[] = [
  { id: 'ALM-1041', severity: 'warning', source: 'CB-03', message: 'Breaker opened after fault current detection', time: '2 hrs ago' },
  { id: 'ALM-1039', severity: 'warning', source: 'Grid Sync', message: 'Synchronisation latency above 80 ms', time: '3 hrs ago' },
  { id: 'ALM-1032', severity: 'info', source: 'TR-03', message: 'Scheduled maintenance window active', time: '9 hrs ago' },
];

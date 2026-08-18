export type ScreenId = 'SYSTEM' | 'NODES' | 'SENSORS' | 'LOGS' | 'USER';

export type LogType = 'BOOT' | 'AUTH' | 'NET' | 'DATA' | 'WARN' | 'OK' | 'SYSTEM' | 'CMD' | 'ERROR';

export interface LogItem {
  id: string;
  time: string;
  type: LogType;
  text: string;
  subtext?: string;
}

export interface AutomationNode {
  id: string;
  name: string;
  layer: string;
  status: 'ACTIVE' | 'STANDBY' | 'SYNCING' | 'MAINTENANCE';
  latency: number; // ms
  throughput: number; // ops/sec
  memoryUsage: number; // percentage
  loadPercentage: number;
  uptime: string;
  description: string;
}

export interface SensorNode {
  id: string;
  code: string;
  region: string;
  location: string;
  status: 'ONLINE' | 'DEGRADED' | 'STANDBY';
  latency: number;
  jitter: number;
  packetLoss: number;
  throughput: string;
  coords: { x: number; y: number }; // percentage on map
}

export interface CommandItem {
  id: string;
  title: string;
  shortcut?: string;
  category: 'NAVIGATION' | 'ACTIONS' | 'SYSTEM' | 'NETWORK';
  action: () => void;
  description?: string;
}

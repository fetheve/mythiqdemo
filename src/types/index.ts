export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'supervisor' | 'engineer';
  avatar?: string;
  lastActive: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'sensor' | 'camera' | 'cnc' | 'plc' | 'gateway';
  status: 'online' | 'offline' | 'warning' | 'error';
  health: number;
  location: string;
  lastUpdate: string;
  firmware: string;
  connectivity: number;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  source: string;
  priority: number;
  acknowledged: boolean;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  oee: number;
  productivity: number;
  defectRate: number;
  status: 'operational' | 'maintenance' | 'offline';
  activeDevices: number;
  totalDevices: number;
}

export interface AIModel {
  id: string;
  name: string;
  type: 'vision' | 'predictive' | 'optimization' | 'anomaly';
  status: 'deployed' | 'training' | 'testing' | 'inactive';
  accuracy: number;
  version: string;
  deployment: string;
  lastTrained: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  triggers: number;
  actions: number;
  status: 'active' | 'inactive' | 'draft';
  lastRun: string;
  successRate: number;
}

export type NavigationItem = {
  id: string;
  name: string;
  icon: string;
  path: string;
  badge?: number;
};
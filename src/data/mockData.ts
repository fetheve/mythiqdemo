import { User, Device, Alert, Facility, AIModel, Workflow } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah.chen@mythiq.com',
  role: 'supervisor',
  avatar: '/images/sarah.jpg',
  lastActive: new Date().toISOString()
};

export const facilities: Facility[] = [
  {
    id: '1',
    name: 'Detroit Manufacturing',
    location: 'Detroit, MI',
    oee: 87.3,
    productivity: 94.2,
    defectRate: 2.1,
    status: 'operational',
    activeDevices: 47,
    totalDevices: 52
  },
  {
    id: '2',
    name: 'Austin Production',
    location: 'Austin, TX',
    oee: 91.7,
    productivity: 89.8,
    defectRate: 1.4,
    status: 'operational',
    activeDevices: 38,
    totalDevices: 41
  },
  {
    id: '3',
    name: 'Phoenix Assembly',
    location: 'Phoenix, AZ',
    oee: 76.4,
    productivity: 82.3,
    defectRate: 4.2,
    status: 'maintenance',
    activeDevices: 29,
    totalDevices: 35
  }
];

export const devices: Device[] = [
  {
    id: '1',
    name: 'Keyence CV-X450F',
    type: 'camera',
    status: 'online',
    health: 96,
    location: 'Line 1 - Station A',
    lastUpdate: '2 minutes ago',
    firmware: 'v2.4.1',
    connectivity: 98
  },
  {
    id: '2',
    name: 'CNC Mill #3',
    type: 'cnc',
    status: 'warning',
    health: 73,
    location: 'Line 2 - Bay C',
    lastUpdate: '5 minutes ago',
    firmware: 'v1.8.3',
    connectivity: 89
  },
  {
    id: '3',
    name: 'Edge Gateway A1',
    type: 'gateway',
    status: 'online',
    health: 94,
    location: 'Network Closet 1',
    lastUpdate: '1 minute ago',
    firmware: 'v3.1.0',
    connectivity: 100
  },
  {
    id: '4',
    name: 'Temp Sensor Array',
    type: 'sensor',
    status: 'online',
    health: 88,
    location: 'Line 1 - Environmental',
    lastUpdate: '3 minutes ago',
    firmware: 'v1.2.4',
    connectivity: 92
  },
  {
    id: '5',
    name: 'Rockwell PLC-5',
    type: 'plc',
    status: 'error',
    health: 34,
    location: 'Line 3 - Control Panel',
    lastUpdate: '15 minutes ago',
    firmware: 'v4.2.1',
    connectivity: 45
  },
  {
    id: '6',
    name: 'Veris Hawkeye H921',
    type: 'sensor',
    status: 'offline',
    health: 0,
    location: 'Line 2 - Power Monitoring',
    lastUpdate: 'Pending Installation',
    firmware: 'v1.0.0',
    connectivity: 0
  }
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Machine Failure Predicted',
    description: 'CNC Mill #3 showing anomalous vibration patterns. Predicted failure in 4-6 hours.',
    timestamp: '5 minutes ago',
    source: 'AI Predictive Model',
    priority: 1,
    acknowledged: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Quality Threshold Exceeded',
    description: 'Defect rate on Line 1 exceeded 3% threshold. Visual inspection recommended.',
    timestamp: '12 minutes ago',
    source: 'Vision System',
    priority: 2,
    acknowledged: false
  },
  {
    id: '3',
    type: 'critical',
    title: 'Device Offline',
    description: 'Rockwell PLC-5 has lost connectivity. Production line may be affected.',
    timestamp: '15 minutes ago',
    source: 'Device Manager',
    priority: 1,
    acknowledged: false
  },
  {
    id: '4',
    type: 'info',
    title: 'Model Update Available',
    description: 'New version of Defect Detection Model v2.1 ready for deployment.',
    timestamp: '1 hour ago',
    source: 'AI Manager',
    priority: 3,
    acknowledged: true
  }
];

export const aiModels: AIModel[] = [
  {
    id: '1',
    name: 'Defect Detection v2.0',
    type: 'vision',
    status: 'deployed',
    accuracy: 94.7,
    version: '2.0.3',
    deployment: 'Edge Device A1',
    lastTrained: '2 days ago'
  },
  {
    id: '2',
    name: 'Predictive Maintenance',
    type: 'predictive',
    status: 'deployed',
    accuracy: 88.2,
    version: '1.5.1',
    deployment: 'Cloud Cluster',
    lastTrained: '1 week ago'
  },
  {
    id: '3',
    name: 'Anomaly Detection',
    type: 'anomaly',
    status: 'training',
    accuracy: 91.3,
    version: '1.2.0-beta',
    deployment: 'Training Pipeline',
    lastTrained: '3 hours ago'
  },
  {
    id: '4',
    name: 'Production Optimization',
    type: 'optimization',
    status: 'testing',
    accuracy: 86.5,
    version: '0.9.2',
    deployment: 'Test Environment',
    lastTrained: '5 days ago'
  }
];

export const workflows: Workflow[] = [
  {
    id: '1',
    name: 'Quality Control Pipeline',
    description: 'Automated defect detection and quality assurance workflow',
    triggers: 3,
    actions: 7,
    status: 'active',
    lastRun: '5 minutes ago',
    successRate: 97.8
  },
  {
    id: '2',
    name: 'Maintenance Alert System',
    description: 'Predictive maintenance notifications and work order generation',
    triggers: 2,
    actions: 4,
    status: 'active',
    lastRun: '15 minutes ago',
    successRate: 94.2
  },
  {
    id: '3',
    name: 'Emergency Response',
    description: 'Critical system failure response and escalation procedures',
    triggers: 5,
    actions: 8,
    status: 'active',
    lastRun: '2 hours ago',
    successRate: 100.0
  },
  {
    id: '4',
    name: 'Resource Optimization',
    description: 'Dynamic task assignment and resource allocation',
    triggers: 4,
    actions: 6,
    status: 'draft',
    lastRun: 'Never',
    successRate: 0
  }
];
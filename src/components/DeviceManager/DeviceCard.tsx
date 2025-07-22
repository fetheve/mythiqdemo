import React from 'react';
import { 
  Camera, 
  HardDrive, 
  Cpu, 
  Radio, 
  Server,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  MoreVertical,
  Activity,
  Zap
} from 'lucide-react';
import { Device } from '../../types';

interface DeviceCardProps {
  device: Device;
}

export default function DeviceCard({ device }: DeviceCardProps) {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'camera':
        return Camera;
      case 'cnc':
        return HardDrive;
      case 'sensor':
        return Radio;
      case 'plc':
        return Cpu;
      case 'gateway':
        return Server;
      default:
        return HardDrive;
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'online':
        return { 
          statusClass: 'status-success', 
          icon: CheckCircle,
          glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]'
        };
      case 'warning':
        return { 
          statusClass: 'status-warning', 
          icon: AlertTriangle,
          glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]'
        };
      case 'error':
        return { 
          statusClass: 'status-error', 
          icon: AlertTriangle,
          glow: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.3)]'
        };
      case 'offline':
        return { 
          statusClass: 'bg-gray-500/10 text-gray-400 border-gray-500/20', 
          icon: Clock,
          glow: ''
        };
      default:
        return { 
          statusClass: 'bg-gray-500/10 text-gray-400 border-gray-500/20', 
          icon: Clock,
          glow: ''
        };
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'from-green-500 to-emerald-500';
    if (health >= 70) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const DeviceIcon = getDeviceIcon(device.type);
  const statusConfig = getStatusConfig(device.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`card card-interactive group ${statusConfig.glow}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="icon-container bg-gradient-to-r from-cyan-500 to-blue-500">
            <DeviceIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{device.name}</h3>
            <p className="text-gray-400 text-sm">{device.location}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`${statusConfig.statusClass} flex items-center space-x-1`}>
            <StatusIcon className="w-3 h-3" />
            <span className="capitalize">{device.status}</span>
          </div>
          <button className="btn btn-ghost p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-xl font-bold text-white mb-1">{device.health}%</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Health</div>
          <div className="progress-bar">
            <div 
              className={`progress-fill bg-gradient-to-r ${getHealthColor(device.health)}`}
              style={{ width: `${device.health}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-bold text-white mb-1">{device.connectivity}%</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Connectivity</div>
          <div className="progress-bar">
            <div 
              className="progress-fill bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: `${device.connectivity}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm font-medium text-white mb-1">{device.firmware}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Firmware</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm font-medium text-white mb-1">{device.lastUpdate}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Last Update</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Wifi className="w-4 h-4" />
            <span className="capitalize">{device.type} Device</span>
          </div>
          <div className="flex items-center space-x-1">
            <Activity className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">Active</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="btn btn-ghost btn-sm">
            <Zap className="w-4 h-4" />
            Monitor
          </button>
          <button className="btn btn-secondary btn-sm">
            <Settings className="w-4 h-4" />
            Configure
          </button>
        </div>
      </div>
    </div>
  );
}
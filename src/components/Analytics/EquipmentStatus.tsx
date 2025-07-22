import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Clock, Cpu, Activity } from 'lucide-react';

export default function EquipmentStatus() {
  const machines = [
    {
      id: 'CNC-12',
      name: 'CNC Mill #12',
      status: 'operational',
      oee: 82.5,
      lastEvent: 'Running smoothly',
      location: 'Line 1',
      uptime: '4h 23m'
    },
    {
      id: 'CNC-07',
      name: 'CNC Mill #07',
      status: 'warning',
      oee: 65.2,
      lastEvent: 'Speed drop 20% - Investigating',
      location: 'Line 2',
      uptime: '2h 15m'
    },
    {
      id: 'LASER-02',
      name: 'Laser Cutter #02',
      status: 'operational',
      oee: 91.3,
      lastEvent: 'Maintenance completed',
      location: 'Line 3',
      uptime: '6h 45m'
    },
    {
      id: 'PRESS-05',
      name: 'Hydraulic Press #05',
      status: 'down',
      oee: 0,
      lastEvent: 'Hydraulic system failure',
      location: 'Line 1',
      uptime: '0m'
    },
    {
      id: 'WELD-03',
      name: 'Welding Station #03',
      status: 'operational',
      oee: 78.9,
      lastEvent: 'Quality check passed',
      location: 'Line 2',
      uptime: '3h 12m'
    },
    {
      id: 'PACK-01',
      name: 'Packaging Line #01',
      status: 'warning',
      oee: 71.4,
      lastEvent: 'Conveyor belt adjustment needed',
      location: 'Line 4',
      uptime: '1h 55m'
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'operational':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bg: 'bg-green-500/10',
          border: 'border-green-500/20'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20'
        };
      case 'down':
        return {
          icon: XCircle,
          color: 'text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/20'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-400',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/20'
        };
    }
  };

  const statusCounts = {
    operational: machines.filter(m => m.status === 'operational').length,
    warning: machines.filter(m => m.status === 'warning').length,
    down: machines.filter(m => m.status === 'down').length
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Equipment Status</h3>
          <p className="text-gray-400">Real-time machine monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-teal-400" />
          <span className="text-sm text-gray-400">Live</span>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-400">{statusCounts.operational}</div>
          <div className="text-xs text-gray-400">Operational</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-amber-400">{statusCounts.warning}</div>
          <div className="text-xs text-gray-400">Warning</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-red-400">{statusCounts.down}</div>
          <div className="text-xs text-gray-400">Down</div>
        </div>
      </div>

      {/* Machine Grid */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {machines.map((machine) => {
          const config = getStatusConfig(machine.status);
          const StatusIcon = config.icon;
          
          return (
            <div
              key={machine.id}
              className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${config.bg} ${config.border}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${config.bg}`}>
                    <Cpu className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{machine.name}</h4>
                    <p className="text-gray-400 text-xs">{machine.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusIcon className={`w-4 h-4 ${config.color}`} />
                  <span className={`text-xs font-medium capitalize ${config.color}`}>
                    {machine.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">OEE</span>
                  <span className="text-white font-medium text-sm">{machine.oee}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      machine.oee >= 80 ? 'bg-green-500' :
                      machine.oee >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${machine.oee}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Uptime</span>
                  <span className="text-white font-medium text-sm">{machine.uptime}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-600">
                <p className="text-gray-300 text-xs">{machine.lastEvent}</p>
              </div>

              {/* Hover Tooltip */}
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 border border-gray-600 rounded-lg p-2 text-xs text-white z-10 pointer-events-none">
                <div className="font-medium mb-1">Last 3 Events:</div>
                <div className="space-y-1 text-gray-400">
                  <div>• {machine.lastEvent}</div>
                  <div>• Quality check completed</div>
                  <div>• Cycle time optimized</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Quick Actions</span>
          <div className="flex space-x-2">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors">
              Refresh
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-xs transition-colors">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
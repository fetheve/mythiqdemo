import React from 'react';
import { AlertTriangle, Clock, Bell, CheckCircle, X } from 'lucide-react';

export default function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'High defect rate on Line 3',
      description: 'Defect rate exceeded 5% threshold. Immediate attention required.',
      timestamp: '2 min ago',
      machine: 'CNC-07',
      priority: 1
    },
    {
      id: 2,
      type: 'warning',
      title: 'Machine 7 experiencing frequent microstops',
      description: 'Cycle time increased by 15%. Check for material flow issues.',
      timestamp: '8 min ago',
      machine: 'PRESS-05',
      priority: 2
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled maintenance reminder',
      description: 'Preventive maintenance due for Laser Cutter #02 in 2 hours.',
      timestamp: '15 min ago',
      machine: 'LASER-02',
      priority: 3
    },
    {
      id: 4,
      type: 'warning',
      title: 'Temperature spike detected',
      description: 'Hydraulic system temperature above normal range.',
      timestamp: '22 min ago',
      machine: 'WELD-03',
      priority: 2
    }
  ];

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          color: 'text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
          icon: AlertTriangle
        };
      case 'warning':
        return {
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          icon: AlertTriangle
        };
      case 'info':
        return {
          color: 'text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20',
          icon: Bell
        };
      default:
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/20',
          icon: Bell
        };
    }
  };

  const criticalCount = alerts.filter(alert => alert.type === 'critical').length;
  const warningCount = alerts.filter(alert => alert.type === 'warning').length;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Active Alerts</h3>
          <p className="text-gray-400">Prioritized system notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          {criticalCount > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {criticalCount} Critical
            </span>
          )}
          {warningCount > 0 && (
            <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {warningCount} Warning
            </span>
          )}
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-red-400">{criticalCount}</div>
          <div className="text-xs text-gray-400">Critical</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-amber-400">{warningCount}</div>
          <div className="text-xs text-gray-400">Warning</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-400">
            {alerts.filter(a => a.type === 'info').length}
          </div>
          <div className="text-xs text-gray-400">Info</div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.map((alert) => {
          const config = getAlertConfig(alert.type);
          const AlertIcon = config.icon;
          
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${config.bg} ${config.border}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
                  <AlertIcon className={`w-4 h-4 ${config.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white text-sm truncate pr-2">
                      {alert.title}
                    </h4>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded flex-shrink-0">
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                  
                  <p className="text-gray-300 text-xs mb-3 leading-relaxed">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">{alert.machine}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        alert.priority === 1 ? 'bg-red-400' :
                        alert.priority === 2 ? 'bg-amber-400' : 'bg-blue-400'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-3 border-t border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-2">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors">
                    View Details
                  </button>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-xs transition-colors">
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Alert Management</span>
          <div className="flex space-x-2">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors">
              Mark All Read
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
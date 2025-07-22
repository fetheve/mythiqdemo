import React from 'react';
import { AlertTriangle, Info, Clock, CheckCircle, X } from 'lucide-react';
import { Alert } from '../../types';

interface AlertsPanelProps {
  alerts: Alert[];
  showHeader?: boolean;
}

export default function AlertsPanel({ alerts, showHeader = false }: AlertsPanelProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return AlertTriangle;
      case 'warning':
        return AlertTriangle;
      case 'info':
        return Info;
      default:
        return Info;
    }
  };

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bgClass: 'bg-red-500/10 border-red-500/20 hover:bg-red-500/15',
          iconColor: 'text-red-400',
          glowClass: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
        };
      case 'warning':
        return {
          bgClass: 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15',
          iconColor: 'text-amber-400',
          glowClass: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
        };
      case 'info':
        return {
          bgClass: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15',
          iconColor: 'text-blue-400',
          glowClass: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
        };
      default:
        return {
          bgClass: 'bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/15',
          iconColor: 'text-gray-400',
          glowClass: ''
        };
    }
  };

  return (
    <div className="card">
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Alerts</h2>
          <div className="flex items-center space-x-2">
            <span className="status-info">{alerts.length} alerts</span>
            <button className="btn btn-ghost btn-sm">
              View All
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          const config = getAlertConfig(alert.type);
          
          return (
            <div
              key={alert.id}
              className={`
                p-4 rounded-xl border transition-all duration-300 group cursor-pointer
                ${config.bgClass} ${config.glowClass}
                ${alert.acknowledged ? 'opacity-60' : ''}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`icon-container-sm ${config.iconColor} bg-current/10 flex-shrink-0 mt-1`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white truncate pr-2">{alert.title}</h4>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {alert.acknowledged && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded">
                        <X className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">{alert.description}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">{alert.source}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        alert.priority === 1 ? 'bg-red-400' :
                        alert.priority === 2 ? 'bg-amber-400' : 'bg-blue-400'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-white mb-2">All Clear</h3>
          <p className="text-gray-400">No active alerts at this time</p>
        </div>
      )}
    </div>
  );
}
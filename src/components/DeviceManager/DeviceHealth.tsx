import React from 'react';
import { Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { Device } from '../../types';

interface DeviceHealthProps {
  devices: Device[];
}

export default function DeviceHealth({ devices }: DeviceHealthProps) {
  const averageHealth = devices.reduce((sum, device) => sum + device.health, 0) / devices.length;
  const healthyDevices = devices.filter(device => device.health >= 90).length;
  const criticalDevices = devices.filter(device => device.health < 50).length;

  return (
    <div className="space-y-6">
      {/* Overall Health */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Overall Device Health</h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-teal-400">{averageHealth.toFixed(1)}%</div>
          <div className="text-gray-400 text-sm mt-1">Average Health Score</div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-teal-400 to-emerald-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${averageHealth}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-700 rounded-lg">
            <div className="text-green-400 font-bold text-lg">{healthyDevices}</div>
            <div className="text-gray-400 text-xs">Healthy</div>
          </div>
          <div className="text-center p-3 bg-gray-700 rounded-lg">
            <div className="text-red-400 font-bold text-lg">{criticalDevices}</div>
            <div className="text-gray-400 text-xs">Critical</div>
          </div>
        </div>
      </div>

      {/* Health Trends */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Health Trends</h3>
        
        <div className="space-y-3">
          {[
            { label: 'Camera Systems', value: 96, trend: 2.1, color: 'bg-green-400' },
            { label: 'CNC Machines', value: 78, trend: -1.3, color: 'bg-amber-400' },
            { label: 'Sensors', value: 92, trend: 0.8, color: 'bg-green-400' },
            { label: 'PLCs', value: 65, trend: -5.2, color: 'bg-red-400' },
            { label: 'Gateways', value: 94, trend: 1.5, color: 'bg-green-400' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-white text-sm">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm font-medium">{item.value}%</span>
                <div className={`flex items-center space-x-1 text-xs ${
                  item.trend > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${item.trend < 0 ? 'transform rotate-180' : ''}`} />
                  <span>{Math.abs(item.trend)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Issues */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Critical Issues</h3>
        
        <div className="space-y-3">
          {[
            { device: 'Rockwell PLC-5', issue: 'Connection timeout', severity: 'critical' },
            { device: 'CNC Mill #3', issue: 'High vibration detected', severity: 'warning' },
            { device: 'Temp Sensor', issue: 'Calibration required', severity: 'warning' },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
              <AlertTriangle className={`w-4 h-4 ${
                item.severity === 'critical' ? 'text-red-400' : 'text-amber-400'
              }`} />
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{item.device}</div>
                <div className="text-gray-400 text-xs">{item.issue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}